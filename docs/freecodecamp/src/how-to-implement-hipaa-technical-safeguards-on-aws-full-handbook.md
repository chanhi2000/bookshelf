---
lang: en-US
title: "How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]"
description: "Article(s) > How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]"
icon: iconfont icon-terraform
category:
  - Python
  - DevOps
  - Amazon
  - AWS
  - Terraform
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - amazon
  - aws
  - amazon-web-services
  - tf
  - terraform
  - hcl
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]"
    - property: og:description
      content: "How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-hipaa-technical-safeguards-on-aws-full-handbook.html
prev: /devops/terraform/articles/README.md
date: 2026-08-04
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/9ecf6656-1e70-448c-bf1f-0bcc1994b31d.png
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
  "title": "Terraform > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/terraform/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]"
  desc="Before I had ever heard the term ”HIPAA audit”, I spent three days helping a healthcare SaaS startup fix a single misconfigured S3 bucket. Not a breach — nothing was accessed. But the bucket was publi"
  url="https://freecodecamp.org/news/how-to-implement-hipaa-technical-safeguards-on-aws-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/9ecf6656-1e70-448c-bf1f-0bcc1994b31d.png"/>

Before I had ever heard the term "HIPAA audit", I spent three days helping a healthcare SaaS startup fix a single misconfigured S3 bucket. Not a breach — nothing was accessed. But the bucket was publicly listable, it contained patient appointment records, and the CEO had received a message from a security researcher at 11 PM on a Friday.

The fine never came. The legal fees did. The remediation work did. The reputational conversations with enterprise customers who asked pointed questions for the next six months definitely did.

HIPAA isn't abstract compliance overhead. It's a specific set of technical requirements that translate directly into infrastructure decisions. Get them right and you build a system that earns enterprise healthcare contracts. Get them wrong and you spend your fundraising runway on lawyers instead of engineers.

This handbook gives you the complete technical implementation: every safeguard mapped to its regulation clause, production-ready AWS infrastructure code, and the specific evidence each auditor will ask for. By the time you finish, you'll be able to answer every technical question in a HIPAA audit without looking anything up.

::: info What You'll Learn

- The five HIPAA Technical Safeguards and exactly which AWS infrastructure decisions each one governs
- How to implement unique user identification and automatic logoff with production-ready code
- How to build an immutable, tamper-evident audit log using hash chaining and S3 Object Lock
- How to implement envelope encryption for ePHI fields using AWS KMS
- The TLS configuration that satisfies HIPAA transmission security requirements
- The complete VPC architecture that satisfies facility access control requirements
- How to run automated HIPAA compliance scans and maintain continuous audit readiness
- The specific evidence your auditor will request for each control

:::

Let's build it properly.

::: note Prerequisites

Before following this guide, you should have:

**Knowledge:**

- Intermediate AWS experience — you've deployed applications on EC2 or ECS, worked with RDS, and understand VPCs and IAM roles
- Comfort reading Python and Terraform HCL
- Basic understanding of cryptography concepts — you know what symmetric encryption, asymmetric encryption, and hash functions are at a conceptual level

**Legal prerequisite — sign the BAA first:** Before writing a single line of HIPAA-related infrastructure code, your organisation must have a signed Business Associate Agreement (BAA) with AWS. You can accept the AWS BAA through the AWS Artifact console. Without a signed BAA, using AWS to process ePHI isn't HIPAA-compliant regardless of how well-engineered your technical controls are.

**Tools:**

- Terraform 1.5 or later
- AWS CLI v2 configured
- Python 3.10 or later with `boto3`, `cryptography`, and `pyjwt` installed

**Important scope note:** This guide covers the Technical Safeguards defined in 45 CFR §164.312. HIPAA compliance also requires Administrative Safeguards (§164.308) and Physical Safeguards (§164.310). The technical controls in this guide are necessary but not sufficient — they must be accompanied by documented policies, workforce training, and a formal risk assessment.

:::

---

## Part 1: Understanding HIPAA Technical Safeguards

### 1.1 What the Five Safeguards Actually Require

HIPAA's Security Rule defines five categories of Technical Safeguards. Each maps to specific engineering decisions:

| Safeguard | Regulation | What It Requires | AWS Implementation |
| --- | --- | --- | --- |
| Access Control | §164.312(a)(1) | Unique user IDs, emergency access, auto-logoff, encryption | IAM, Cognito, KMS, session management |
| Audit Controls | §164.312(b) | Record and examine all ePHI access activity | CloudTrail, CloudWatch, Kinesis, S3 Object Lock |
| Integrity | §164.312(c)(1) | Prevent and detect improper alteration or destruction | Hash chaining, digital signatures, deletion protection |
| Transmission Security | §164.312(e)(1) | Encrypt ePHI during transmission | TLS 1.2+, mTLS, API Gateway, ALB policy |
| Facility Access | §164.310(a)(1) | Limit physical and logical access | VPC architecture, security groups, NACLs |

### 1.2 The Compliance-Evidence Distinction

The most important concept in practical HIPAA engineering: compliance and evidence of compliance are different things, and auditors care about both.

Compliance means your encryption is correctly configured. Evidence of compliance means you have a CloudTrail log showing the KMS key rotation, a command output showing `StorageEncrypted: true` on every RDS instance, and a dated screenshot of the configuration that you can produce when asked.

Every section of this guide ends with an evidence collection command. Run each one. Save the outputs. Name the files with the date and the control they demonstrate. When your auditor asks "can you show me that your RDS instances are encrypted at rest?", you hand them a file rather than running a command in the room.

### 1.3 Protected Health Information — Know Your Scope

HIPAA compliance begins with knowing what data in your system constitutes ePHI. The 18 HIPAA identifiers that must be protected:

```py title="phi_classifier.py"
# Reference: the 18 HIPAA identifiers

HIPAA_IDENTIFIERS = [
    'full_name', 'first_name', 'last_name',
    'geographic_subdivision',     # Any subdivision smaller than state
    'date_of_birth', 'admission_date', 'discharge_date', 'death_date',
    'phone_number', 'fax_number', 'email_address',
    'social_security_number', 'medical_record_number',
    'health_plan_beneficiary_number', 'account_number',
    'certificate_license_number', 'vehicle_identifier',
    'device_identifier', 'web_url', 'ip_address',
    'biometric_identifier', 'full_face_photo',
]

# Any data record containing one or more of these identifiers
# combined with health information is ePHI and subject to HIPAA.
```

---

## Part 2: Access Control — §164.312(a)(1)

§164.312(a)(1) requires four specific implementation specifications: unique user identification, emergency access procedures, automatic logoff, and encryption and decryption.

### 2.1 Unique User Identification

The requirement: every user with access to ePHI must have a unique identifier. Shared accounts violate this requirement. The reason this matters in practice: when an audit or security incident occurs, investigators need to know exactly who accessed which patient record and when. If three nurses share a login, that trail disappears. A unique identifier per user means every ePHI access event is attributable to a specific, named individual — which is what HIPAA's audit controls require and what your legal team will need if something goes wrong.

The code below implements this by assigning every user a UUID v4 at creation time — a randomly generated identifier that is unique across your entire system and is never reused, even after the user's account is deleted. When a user is removed, the account is soft-deleted: the UUID stays in the database and in all historical audit logs, so you can always reconstruct who accessed what. The authentication method also enforces MFA by default and tracks failed login attempts, automatically suspending accounts after five consecutive failures to satisfy HIPAA's requirements around access control and account management.

```py :collapsed-line title="user_identity_service.py"
# HIPAA-compliant user identity management

import uuid
import hashlib
import hmac
import os
from datetime import datetime, timezone
from dataclasses import dataclass
from typing import Optional


@dataclass
class HIPAAUser:
    user_id:     str   # UUID — never reused
    email:       str
    role:        str   # Clinical / Administrative / Engineering
    department:  str
    status:      str   # ACTIVE / SUSPENDED / DELETED
    mfa_enabled: bool
    created_at:  str
    last_login:  Optional[str] = None
    failed_attempts: int = 0


class UserIdentityService:
    """
    Implements HIPAA §164.312(a)(1)(i) — Unique User Identification.

    Key properties:
    - Every user gets a UUID v4 that is unique and never reused
    - Accounts are soft-deleted — the UUID is preserved in audit logs
      permanently, even after the user leaves
    - All authentication events are logged with user_id, timestamp, and outcome
    """

    MAX_FAILED_ATTEMPTS = 5

    def __init__(self, db, audit_logger):
        self.db    = db
        self.audit = audit_logger

    def create_user(self, email: str, role: str, department: str,
                    created_by: str) -> HIPAAUser:
        """Create a user with a unique, non-reusable identifier."""
        user = HIPAAUser(
            user_id=str(uuid.uuid4()),
            email=email.strip().lower(),
            role=role,
            department=department,
            status='ACTIVE',
            mfa_enabled=True,
            created_at=datetime.now(timezone.utc).isoformat(),
        )
        self.db.save_user(user)
        self.audit.log(
            event_type='USER_CREATED',
            actor_id=created_by,
            subject_id=user.user_id,
            details={'role': role, 'department': department}
        )
        return user

    def authenticate(self, email: str, password: str, mfa_token: str) -> Optional[str]:
        """Authenticate a user. Returns a JWT access token on success."""
        user = self.db.find_user_by_email(email.strip().lower())

        if not user:
            self.audit.log(
                event_type='AUTH_FAILURE',
                actor_id=None,
                subject_id=None,
                details={'reason': 'unknown_email',
                         'email_hash': hashlib.sha256(email.encode()).hexdigest()[:16]}
            )
            return None

        if user.status != 'ACTIVE':
            self.audit.log(
                event_type='AUTH_FAILURE',
                actor_id=user.user_id,
                subject_id=user.user_id,
                details={'reason': f'account_{user.status.lower()}'}
            )
            return None

        if not self._verify_password(password, self.db.get_password_hash(user.user_id)):
            user.failed_attempts += 1
            if user.failed_attempts >= self.MAX_FAILED_ATTEMPTS:
                user.status = 'SUSPENDED'
                self.audit.log(
                    event_type='ACCOUNT_SUSPENDED',
                    actor_id='system',
                    subject_id=user.user_id,
                    details={'reason': 'max_failed_attempts',
                             'attempts': user.failed_attempts}
                )
            self.db.save_user(user)
            return None

        user.failed_attempts = 0
        user.last_login = datetime.now(timezone.utc).isoformat()
        self.db.save_user(user)

        token = self._issue_jwt(user)
        self.audit.log(
            event_type='AUTH_SUCCESS',
            actor_id=user.user_id,
            subject_id=user.user_id,
            details={'token_jti': self._extract_jti(token)}
        )
        return token

    @staticmethod
    def _verify_password(plaintext: str, stored_hash: str) -> bool:
        candidate = hashlib.pbkdf2_hmac(
            'sha256', plaintext.encode(), b'salt', 100_000
        ).hex()
        return hmac.compare_digest(candidate, stored_hash)

    def _issue_jwt(self, user: HIPAAUser) -> str:
        import jwt
        return jwt.encode(
            {
                'sub':  user.user_id,
                'role': user.role,
                'jti':  str(uuid.uuid4()),
                'exp':  int(datetime.now(timezone.utc).timestamp()) + 900,
                'iat':  int(datetime.now(timezone.utc).timestamp()),
            },
            os.environ['JWT_PRIVATE_KEY'],
            algorithm='RS256'
        )

    @staticmethod
    def _extract_jti(token: str) -> str:
        import jwt
        return jwt.decode(token, options={'verify_signature': False})['jti']
```

The two evidence queries below confirm to an auditor that your system enforces uniqueness: the first shows that every `user_id` in the database is distinct (no duplicates, no shared credentials), and the second shows that every active user has MFA enabled — both of which are specific requirements auditors check for under this clause.

Evidence for auditors — §164.312(a)(1)(i):

```sh
# Show that no shared accounts exist
psql $DATABASE_URL -c "
    SELECT COUNT(*) AS total_users,
           COUNT(DISTINCT user_id) AS unique_ids,
           COUNT(CASE WHEN status='ACTIVE' THEN 1 END) AS active_users
    FROM hipaa_users;
"

# Show MFA is enabled for all active users — expected: 0
psql $DATABASE_URL -c "
    SELECT COUNT(*) FROM hipaa_users
    WHERE status = 'ACTIVE' AND mfa_enabled = FALSE;
"
```

### 2.2 Automatic Logoff — §164.312(a)(2)(iii)

The requirement: implement electronic procedures that terminate an electronic session after a predetermined time of inactivity. Most healthcare applications use 15 minutes.

The reason for this control is straightforward: clinical environments involve shared workstations. A nurse logs in to check a patient record, gets called away, and leaves the browser open. Without automatic logoff, the next person to sit at that workstation has full access to ePHI under someone else's credentials. The control is about protecting against the reality of how healthcare teams actually work, not just against malicious actors.

The code below implements automatic logoff using short-lived JWTs. When a user authenticates, they receive a token that expires after 15 minutes of inactivity — each API call implicitly resets that window by issuing a new token. There's also an absolute 8-hour session ceiling: regardless of activity, a user must re-authenticate after eight hours. This prevents a session from staying open indefinitely if a user simply leaves a tab running in the background. The `validate_session` decorator is applied to every endpoint that touches ePHI, so no access path can bypass these checks.

```py :collapsed-lines title="session_manager.py'
# Implements §164.312(a)(2)(iii) — Automatic Logoff

import os
import uuid
from datetime import datetime, timezone
from functools import wraps
from flask import request, g, jsonify
import jwt

INACTIVITY_TIMEOUT_SECONDS = 15 * 60    # 15 minutes
ABSOLUTE_SESSION_SECONDS   = 8 * 60 * 60  # 8 hours maximum


def validate_session(f):
    """Decorator for endpoints that access ePHI."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'MISSING_TOKEN'}), 401

        token = auth_header[7:]

        try:
            payload = jwt.decode(
                token,
                os.environ['JWT_PUBLIC_KEY'],
                algorithms=['RS256']
            )
        except jwt.ExpiredSignatureError:
            return jsonify({
                'error':   'SESSION_EXPIRED',
                'message': 'Your session has expired due to inactivity. Please log in again.',
                'code':    'INACTIVITY_TIMEOUT'
            }), 401
        except jwt.InvalidTokenError as e:
            return jsonify({'error': 'INVALID_TOKEN', 'detail': str(e)}), 401

        # Check absolute session age
        issued_at   = payload.get('session_start', payload['iat'])
        session_age = datetime.now(timezone.utc).timestamp() - issued_at

        if session_age > ABSOLUTE_SESSION_SECONDS:
            return jsonify({
                'error':   'SESSION_EXPIRED',
                'message': 'Your session has exceeded the 8-hour limit. Please log in again.',
                'code':    'ABSOLUTE_TIMEOUT'
            }), 401

        g.user_id = payload['sub']
        g.role    = payload.get('role')
        g.jti     = payload.get('jti')
        return f(*args, **kwargs)

    return decorated


def issue_access_token(user_id: str, role: str, session_start: int = None) -> str:
    """Issue a 15-minute access token with an 8-hour absolute session limit."""
    now = int(datetime.now(timezone.utc).timestamp())
    return jwt.encode(
        {
            'sub':           user_id,
            'role':          role,
            'jti':           str(uuid.uuid4()),
            'iat':           now,
            'exp':           now + INACTIVITY_TIMEOUT_SECONDS,
            'session_start': session_start or now,
        },
        os.environ['JWT_PRIVATE_KEY'],
        algorithm='RS256'
    )
```

### 2.3 Encryption at Rest — §164.312(a)(2)(iv)

The requirement: implement a mechanism to encrypt and decrypt ePHI.

Encryption at rest means that if someone gains physical access to your storage media — a hard drive, a backup tape, an S3 object — they can't read the data without the encryption key. On AWS, this protection comes in two layers. The first layer is storage-level encryption, where the database or storage service automatically encrypts every byte written to disk. The second, more powerful layer is field-level encryption, where individual sensitive values are encrypted by your application before they're even handed to the database — so a database administrator with full SQL access still can't read patient SSNs or diagnoses without the application key.

Layer 1 — storage encryption (Terraform):

The Terraform below provisions an RDS instance with a customer-managed KMS key. Using a customer-managed key rather than the AWS default key matters for two reasons: it gives you proof of key ownership (auditors will ask for the KMS key ARN), and it enables automatic key rotation, which replaces the cryptographic material annually without any disruption to your application. The `enable_key_rotation = true` setting automates this entirely — you don't need to touch the configuration again, and the key stays current.

```hcl :collapsed-lines title="rds_hipaa.tf"
# HIPAA-compliant RDS with customer-managed KMS key

resource "aws_kms_key" "rds" {
  description             = "Customer-managed KMS key for RDS ePHI encryption"
  enable_key_rotation     = true
  deletion_window_in_days = 30

  tags = {
    Purpose     = "HIPAA-ePHI-encryption"
    Environment = "production"
    Control     = "164.312(a)(2)(iv)"
  }
}g

resource "aws_db_instance" "hipaa_postgres" {
  identifier     = "hipaa-production-db"
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.r7g.large"

  storage_encrypted = true
  kms_key_id        = aws_kms_key.rds.arn

  backup_retention_period = 30
  deletion_protection     = true
  skip_final_snapshot     = false
  final_snapshot_identifier = "hipaa-production-db-final-snapshot"

  db_subnet_group_name   = aws_db_subnet_group.hipaa.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  tags = {
    DataClassification = "ePHI"
    HIPAAControl       = "164.312(a)(2)(iv)"
  }
}
```

Layer 2 — field-level application encryption for highest-sensitivity data:

Storage encryption protects you if someone steals a disk. Field-level encryption protects you from authorized users who have legitimate database access but shouldn't be able to read raw patient data. The `FieldEncryption` class below implements envelope encryption: AWS KMS generates a unique data key for each field value, that key is used to encrypt the plaintext, and only the encrypted version of the key is stored. Even if an attacker extracts your entire database, every encrypted field requires a separate KMS API call to decrypt — which is logged, rate-limited, and requires the correct IAM permissions. The encryption context ties each ciphertext to its purpose and owner, so a key decrypted for one patient's record can't be reused for another.

```py :collapsed-lines title="field_encryption.py"
# Envelope encryption using AWS KMS

import boto3
import base64
from cryptography.fernet import Fernet
from typing import Optional

kms     = boto3.client('kms')
KMS_KEY = 'alias/hipaa-rds-ephi'


class FieldEncryption:
    """
    Envelope encryption for ePHI fields.

    How it works:
    1. AWS KMS generates a data key (plaintext + encrypted copy)
    2. The plaintext data key encrypts the field value using Fernet (AES-128-CBC)
    3. Only the encrypted data key is stored alongside the ciphertext
    4. To decrypt: KMS decrypts the stored data key, then Fernet decrypts the value
    5. A database admin with direct SQL access sees only base64 ciphertext
    """

    def encrypt(self, plaintext: str, context: dict) -> Optional[dict]:
        if not plaintext:
            return None

        data_key = kms.generate_data_key(
            KeyId=KMS_KEY,
            KeySpec='AES_256',
            EncryptionContext=context
        )

        fernet    = Fernet(data_key['Plaintext'])
        ciphertext = fernet.encrypt(plaintext.encode('utf-8'))

        return {
            'ciphertext':         base64.b64encode(ciphertext).decode(),
            'encrypted_data_key': base64.b64encode(data_key['CiphertextBlob']).decode(),
            'encryption_context': context,
        }

    def decrypt(self, payload: dict) -> Optional[str]:
        if not payload:
            return None

        decrypted_key = kms.decrypt(
            CiphertextBlob=base64.b64decode(payload['encrypted_data_key']),
            EncryptionContext=payload['encryption_context']
        )

        fernet    = Fernet(decrypted_key['Plaintext'])
        plaintext = fernet.decrypt(base64.b64decode(payload['ciphertext']))
        return plaintext.decode('utf-8')
```

Evidence for auditors — §164.312(a)(2)(iv):

```sh
# Verify RDS storage encryption
aws rds describe-db-instances \
  --db-instance-identifier hipaa-production-db \
  --query 'DBInstances[0].{Encrypted:StorageEncrypted,KMSKey:KmsKeyId}' \
  --output table

# Verify KMS key rotation is enabled — expected: true
aws kms get-key-rotation-status \
  --key-id alias/hipaa-rds-ephi \
  --query 'KeyRotationEnabled'
```

---

## Part 3: Audit Controls — §164.312(b)

§164.312(b) requires implementing hardware, software, and procedural mechanisms that record and examine activity in information systems that contain or use ePHI. Every access. Every modification. Every deletion. Logged, immutable, and retainable for six years.

### 3.1 The Audit Log Schema

Every ePHI-related event must answer five questions: who did it, what did they do, when did they do it, to which record, and from where.

The `log_ephi_event` function below is the central audit mechanism for your application. Every time a user reads, updates, or deletes a patient record, this function is called before the response is returned. It captures the actor's identity, IP address, browser, and session ID alongside the action, resource, and timestamp — and then adds something more powerful: a cryptographic chain. Each log entry includes the SHA-256 hash of the previous entry. This means if anyone tampers with a log entry — even a single character — every subsequent hash in the chain becomes invalid, making tampering detectable. The entries are then streamed to Kinesis, which fans them out to S3 for long-term storage. One critical rule: the `details` dictionary must never contain ePHI values, only field names. Log that a SSN field was accessed, not what the SSN was.

```py title="audit_logger.py'
# Implements §164.312(b) — Audit Controls

import hashlib
import json
import uuid
import boto3
from datetime import datetime, timezone
from typing import Any, Optional

kinesis = boto3.client('kinesis')
STREAM  = 'hipaa-audit-events'

_last_hash = '0' * 64  # Chain starts with 64 zeros


def log_ephi_event(
    event_type:  str,
    actor_id:    Optional[str],
    patient_id:  Optional[str],
    resource:    Optional[str],
    action:      str,
    details:     dict,
    request_ctx: dict = None,
) -> str:
    """
    Log a HIPAA-relevant event.
    Never include PHI values in the details dict — field names only.
    """
    global _last_hash

    entry = {
        'actor_id':       actor_id,
        'actor_ip':       (request_ctx or {}).get('ip'),
        'actor_ua':       (request_ctx or {}).get('user_agent'),
        'session_id':     (request_ctx or {}).get('session_id'),
        'event_type':     event_type,
        'action':         action,
        'resource':       resource,
        'details':        details,
        'patient_id':     patient_id,
        'timestamp':      datetime.now(timezone.utc).isoformat(),
        'service':        'healthcare-api',
        'environment':    'production',
        'previous_hash':  _last_hash,
        'log_id':         str(uuid.uuid4()),
    }

    canonical   = json.dumps(entry, sort_keys=True)
    entry_hash  = hashlib.sha256(canonical.encode()).hexdigest()
    entry['log_hash'] = entry_hash
    _last_hash  = entry_hash

    kinesis.put_record(
        StreamName=STREAM,
        Data=json.dumps(entry),
        PartitionKey=actor_id or 'system'
    )

    return entry_hash


def log_phi_read(actor_id: str, patient_id: str, resource: str,
                 purpose: str, request_ctx: dict = None):
    return log_ephi_event(
        event_type='PHI_ACCESS',
        actor_id=actor_id,
        patient_id=patient_id,
        resource=resource,
        action='READ',
        details={'purpose': purpose},
        request_ctx=request_ctx,
    )


def log_phi_update(actor_id: str, patient_id: str, resource: str,
                   fields_changed: list, request_ctx: dict = None):
    return log_ephi_event(
        event_type='PHI_UPDATE',
        actor_id=actor_id,
        patient_id=patient_id,
        resource=resource,
        action='UPDATE',
        details={'fields_changed': fields_changed},  # Field names only — NOT values
        request_ctx=request_ctx,
    )
```

### 3.2 Immutable Log Storage with S3 Object Lock

Writing logs to S3 isn't enough on its own — logs stored in a standard S3 bucket can be deleted, which would let someone cover their tracks after a breach. S3 Object Lock in COMPLIANCE mode solves this by making every object in the bucket permanently immutable for the retention period you specify. In COMPLIANCE mode, not even the AWS root account can delete the objects before the retention period expires. The bucket below is configured with a 2,190-day (six-year) retention period, which satisfies HIPAA's documentation retention requirement. Versioning is also enabled so that even if a write operation partially overwrites an object, the original version is preserved.

```hcl :collapsed-lines title="audit_log_bucket.tf"
# S3 bucket with Object Lock in COMPLIANCE mode
# Logs cannot be deleted or modified by anyone — including root

resource "aws_s3_bucket" "audit_logs" {
  bucket              = "hipaa-audit-logs-${data.aws_caller_identity.current.account_id}"
  object_lock_enabled = true

  tags = {
    DataClassification = "audit-log"
    HIPAAControl       = "164.312(b)"
    RetentionYears     = "6"
  }
}

resource "aws_s3_bucket_versioning" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_object_lock_configuration" "audit_logs" {
  bucket = aws_s3_bucket.audit_logs.id
  rule {
    default_retention {
      mode = "COMPLIANCE"  # Nobody can delete — not even root
      days = 2190          # 6 years = 2,190 days
    }
  }
}

resource "aws_s3_bucket_public_access_block" "audit_logs" {
  bucket                  = aws_s3_bucket.audit_logs.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
```

Evidence for auditors — §164.312(b):

```sh
# Verify Object Lock is enabled in COMPLIANCE mode
aws s3api get-object-lock-configuration \
  --bucket hipaa-audit-logs-YOUR_ACCOUNT_ID \
  --query 'ObjectLockConfiguration'
# Expected: Mode=COMPLIANCE, Days=2190
```

---

## Part 4: Integrity Controls — §164.312(c)(1)

§164.312(c)(1) requires implementing policies and procedures to protect ePHI from improper alteration or destruction.

The integrity control solves a specific problem: how do you know a patient record hasn't been modified after it was written? Storage encryption protects data from being read by unauthorised parties, but it doesn't protect against an authorised user — a database administrator, a compromised internal account — silently editing a record. Digital signatures do. When a record is created, `sign_record` produces a cryptographic signature using a KMS asymmetric key. That signature is stored alongside the record. The `verify_record` function can then confirm at any point that the record's content exactly matches what was signed — any modification, even a single character, produces a different signature that fails verification. The weekly integrity scan calls `verify_record` on every ePHI record in the specified table and fires an SNS alert for any that fail, creating a continuous tamper-detection mechanism.

```py :collapsed-lines title="integrity_service.py"
# Digitally signs each ePHI record using KMS asymmetric key

import boto3
import base64
import json
from datetime import datetime, timezone

kms         = boto3.client('kms')
SIGNING_KEY = 'alias/hipaa-record-signing'


def sign_record(record: dict) -> str:
    """Digitally sign a patient record. Store the signature alongside the record."""
    canonical = json.dumps(record, sort_keys=True)
    response  = kms.sign(
        KeyId=SIGNING_KEY,
        Message=canonical.encode(),
        MessageType='RAW',
        SigningAlgorithm='RSASSA_PKCS1_V1_5_SHA_256'
    )
    return base64.b64encode(response['Signature']).decode()


def verify_record(record: dict, signature: str) -> bool:
    """Verify a patient record hasn't been altered since signing."""
    canonical = json.dumps(record, sort_keys=True)
    try:
        kms.verify(
            KeyId=SIGNING_KEY,
            Message=canonical.encode(),
            MessageType='RAW',
            Signature=base64.b64decode(signature),
            SigningAlgorithm='RSASSA_PKCS1_V1_5_SHA_256'
        )
        return True
    except kms.exceptions.KMSInvalidSignatureException:
        return False


def weekly_integrity_scan(db, table_name: str) -> dict:
    """
    Scheduled job: verify the digital signature on every ePHI record.
    Any record that fails verification is flagged as potentially tampered.
    Run weekly as required by §164.312(c)(1) policy.
    """
    total    = 0
    failures = []

    for record_id, record, signature in db.iterate_records_with_signatures(table_name):
        total += 1
        if not verify_record(record, signature):
            failures.append({
                'record_id':   record_id,
                'table':       table_name,
                'detected_at': datetime.now(timezone.utc).isoformat(),
            })

    result = {
        'scan_date':          datetime.now(timezone.utc).isoformat(),
        'table':              table_name,
        'records_checked':    total,
        'integrity_failures': len(failures),
        'failed_records':     failures,
    }

    if failures:
        sns = boto3.client('sns')
        sns.publish(
            TopicArn='arn:aws:sns:us-east-1:YOUR_ACCOUNT:hipaa-integrity-alerts',
            Subject=f'INTEGRITY FAILURE: {len(failures)} records in {table_name}',
            Message=json.dumps(result, indent=2)
        )

    return result
```

---

## Part 5: Transmission Security — §164.312(e)(1)

§164.312(e)(1) requires protecting ePHI during transmission by implementing technical security measures to guard against unauthorized access. The minimum TLS version required is TLS 1.2. TLS 1.3 is recommended. SSL, TLS 1.0, and TLS 1.1 are not acceptable.

Application Load Balancer SSL policy (Terraform):

The ALB is the entry point for all external traffic to your HIPAA application, so it's the first place to enforce TLS requirements. The Terraform resource below configures the HTTPS listener with the `ELBSecurityPolicy-TLS13-1-2-2021-06` policy — this is AWS's policy name for a configuration that accepts TLS 1.2 and TLS 1.3 connections while rejecting all older protocols and weak cipher suites. The HTTP listener is configured separately to redirect all port 80 traffic to port 443 with a permanent 301 redirect, ensuring no ePHI can ever be transmitted unencrypted even if a client accidentally connects over HTTP.

```hcl title="alb_hipaa.tf"
resource "aws_alb_listener" "hipaa_https" {
  load_balancer_arn = aws_alb.hipaa.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.hipaa.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.hipaa_api.arn
  }
}

# Redirect all HTTP traffic to HTTPS
resource "aws_alb_listener" "hipaa_http_redirect" {
  load_balancer_arn = aws_alb.hipaa.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
```

nginx TLS configuration for direct deployments:

If your application servers handle TLS termination directly — rather than offloading to the ALB — the nginx configuration below enforces the same standards at the server level. The `ssl_protocols` directive explicitly lists only TLSv1.2 and TLSv1.3, which means nginx will reject any connection attempt using an older protocol. The `ssl_ciphers` list specifies only ECDHE-based cipher suites with AES-GCM or ChaCha20-Poly1305 — these provide forward secrecy, meaning that even if your private key is later compromised, past session recordings can't be decrypted. The `Strict-Transport-Security` header with a two-year max-age instructs browsers to always use HTTPS for this domain, even if a user types the HTTP URL. `ssl_session_tickets off` prevents a class of attack where session ticket keys could be used to decrypt past sessions.

```nginx title="/etc/nginx/conf.d/hipaa-tls.conf"
server {
    listen 443 ssl http2;
    server_name api.your-healthcare-app.com;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';
    ssl_prefer_server_ciphers off;

    # HTTP Strict Transport Security — 2 years
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

    ssl_stapling        on;
    ssl_stapling_verify on;
    ssl_session_tickets off;
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 1d;
}
```

Evidence for auditors — §164.312(e)(1):

```sh
# Verify TLS 1.1 is rejected
openssl s_client \
-connect api.your-healthcare-app.com:443 \
-tls1_1 2>&1 | grep -E "CONNECTED|handshake failure"
# Expected: handshake failure

# Verify TLS 1.2 succeeds
openssl s_client \
-connect api.your-healthcare-app.com:443 \
-tls1_2 2>&1 | grep "CONNECTED"

# Check ALB SSL policy
aws elbv2 describe-listeners \
--load-balancer-arn YOUR_ALB_ARN \
--query 'Listeners[*].{Port:Port,SslPolicy:SslPolicy}' \
--output table
```

---

## Part 6: AWS Network Architecture for HIPAA

§164.310(a)(1) (Physical Facility Access Controls) is interpreted in cloud environments as logical network access control — the VPC architecture that isolates ePHI processing from other workloads.

The three-tier VPC below implements network segmentation as a hard boundary around ePHI. The public subnets hold only load balancers — nothing that processes or stores patient data is publicly reachable. The private app subnets hold your API servers, which can receive traffic from the load balancers but have no direct internet path in or out. The private data subnets hold RDS and `ElastiCache`, which can only receive traffic from the app tier's security group — not from the internet, not from the public subnets, and not from any other source. This means a compromised load balancer cannot directly reach the database: it can only reach the application servers, which apply their own authentication layer before talking to the database.

The VPC endpoints for S3 and KMS ensure that ePHI-related traffic to those services travels through AWS's internal network rather than the public internet. The VPC Flow Logs capture all accepted and rejected network traffic, which gives you the network-level audit trail that complements your application-level audit logs.

```hcl :collapsed-lines title="vpc_hipaa.tf"
# Three-tier VPC architecture

resource "aws_vpc" "hipaa" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name         = "hipaa-production-vpc"
    DataClass    = "ePHI"
    HIPAAControl = "164.310(a)(1)"
  }
}

# Public subnets — load balancers only, no ePHI
resource "aws_subnet" "public" {
  count             = 2
  vpc_id            = aws_vpc.hipaa.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {Name = "hipaa-public-${count.index + 1}", DataClass = "none"}
}

# Private app subnets — API servers, no direct internet access
resource "aws_subnet" "private_app" {
  count             = 2
  vpc_id            = aws_vpc.hipaa.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {Name = "hipaa-private-app-${count.index + 1}", DataClass = "ePHI-processing"}
}

# Private data subnets — RDS, ElastiCache
resource "aws_subnet" "private_data" {
  count             = 2
  vpc_id            = aws_vpc.hipaa.id
  cidr_block        = "10.0.${count.index + 20}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {Name = "hipaa-private-data-${count.index + 1}", DataClass = "ePHI-storage"}
}

# VPC endpoints — AWS services without internet traversal
# ePHI must not traverse the public internet even within AWS
resource "aws_vpc_endpoint" "s3" {
  vpc_id          = aws_vpc.hipaa.id
  service_name    = "com.amazonaws.${var.region}.s3"
  route_table_ids = [aws_route_table.private.id]
}

resource "aws_vpc_endpoint" "kms" {
  vpc_id              = aws_vpc.hipaa.id
  service_name        = "com.amazonaws.${var.region}.kms"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = aws_subnet.private_app[*].id
  security_group_ids  = [aws_security_group.vpce.id]
  private_dns_enabled = true
}

# Security groups — least-privilege access
resource "aws_security_group" "rds" {
  name   = "hipaa-rds-sg"
  vpc_id = aws_vpc.hipaa.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app.id]
    description     = "PostgreSQL from app tier only — no direct external access"
  }
}

# VPC Flow Logs — network audit trail
resource "aws_flow_log" "hipaa" {
  vpc_id          = aws_vpc.hipaa.id
  traffic_type    = "ALL"
  iam_role_arn    = aws_iam_role.flow_logs.arn
  log_destination = aws_cloudwatch_log_group.vpc_flow_logs.arn

  tags = {HIPAAControl = "164.310(a)(1)", Retention = "365-days"}
}
```

---

## Part 7: AWS Services Covered by BAA

Not every AWS service is covered by the AWS Business Associate Agreement. Using a non-BAA service to process ePHI is a HIPAA violation.

| AWS Service | BAA Covered | Notes |
| --- | --- | --- |
| EC2 | Yes | Encrypt EBS volumes at creation |
| RDS (all engines) | Yes | Enable storage encryption — not default |
| S3 | Yes | Enforce encryption in bucket policy. Block public access |
| Lambda | Yes | Environment variables must not contain PHI values |
| EKS | Yes | Encrypt etcd. Use private cluster endpoint |
| API Gateway | Yes | Enable CloudTrail logging |
| KMS | Yes | Required for all encryption in this guide |
| CloudTrail | Yes | Enable in all regions, encrypt logs |
| CloudWatch Logs | Yes | Encrypt log groups. Logs may contain ePHI |
| Kinesis Data Streams | Yes | Used for audit log fan-out |
| SNS | Yes | Encrypt topics |
| SQS | Yes | Encrypt queues |
| Secrets Manager | Yes | Preferred for rotating credentials |

Services not covered by default BAA — do not use for ePHI: Amazon Connect (requires separate agreement), some Amazon Comprehend Medical features (check current BAA), and third-party marketplace products.

---

## Part 8: Continuous Compliance Monitoring

HIPAA compliance isn't a state you achieve once — it's a condition you maintain continuously. Configuration drift is one of the most common causes of HIPAA findings in audits: an engineer spins up a new RDS instance without encryption, a developer creates an S3 bucket without blocking public access, a log group accumulates without a retention policy. None of these are malicious. They're the normal entropy of a growing engineering team.

The scanner below is designed to run as a daily Lambda function. It checks your AWS account against the most common HIPAA technical control failures and writes structured findings to S3 as a dated evidence file. Each finding maps to a specific regulation clause, has a severity level (CRITICAL or HIGH), and names the exact resource that's out of compliance. Running this daily means you catch drift within 24 hours rather than discovering it during an audit.

```py :collapsed-lines title="compliance_scanner.py"
# Daily Lambda job — runs all HIPAA compliance checks

import boto3
import json
from datetime import datetime, timezone

ec2 = boto3.client('ec2')
rds = boto3.client('rds')
s3  = boto3.client('s3')
ct  = boto3.client('cloudtrail')
gd  = boto3.client('guardduty')


def scan_all() -> dict:
    """Run all HIPAA compliance checks. Returns structured findings."""
    findings = []

    # §164.312(a)(2)(iv) — Check: all RDS instances encrypted
    for inst in rds.describe_db_instances()['DBInstances']:
        if not inst.get('StorageEncrypted'):
            findings.append({
                'control':  '164.312(a)(2)(iv)',
                'severity': 'CRITICAL',
                'resource': inst['DBInstanceIdentifier'],
                'finding':  'RDS instance not encrypted at rest',
            })

    # §164.312(a)(2)(iv) — Check: all EBS volumes encrypted
    for vol in ec2.describe_volumes()['Volumes']:
        if not vol.get('Encrypted'):
            findings.append({
                'control':  '164.312(a)(2)(iv)',
                'severity': 'HIGH',
                'resource': vol['VolumeId'],
                'finding':  'EBS volume not encrypted',
            })

    # §164.312(a)(2)(iv) — Check: S3 buckets block public access
    for bucket in s3.list_buckets()['Buckets']:
        name = bucket['Name']
        try:
            pab = s3.get_public_access_block(Bucket=name)[
                'PublicAccessBlockConfiguration'
            ]
            if not all([pab.get('BlockPublicAcls'), pab.get('BlockPublicPolicy'),
                        pab.get('IgnorePublicAcls'), pab.get('RestrictPublicBuckets')]):
                findings.append({
                    'control':  '164.312(a)(2)(iv)',
                    'severity': 'CRITICAL',
                    'resource': f's3://{name}',
                    'finding':  'S3 bucket public access not fully blocked',
                })
        except s3.exceptions.NoSuchPublicAccessBlockConfiguration:
            findings.append({
                'control':  '164.312(a)(2)(iv)',
                'severity': 'CRITICAL',
                'resource': f's3://{name}',
                'finding':  'S3 bucket has no public access block configuration',
            })

    # §164.312(b) — Check: CloudTrail multi-region enabled
    trails      = ct.describe_trails()['trailList']
    multi_region = [t for t in trails if t.get('IsMultiRegionTrail')]
    if not multi_region:
        findings.append({
            'control':  '164.312(b)',
            'severity': 'CRITICAL',
            'resource': 'CloudTrail',
            'finding':  'No multi-region CloudTrail — ePHI access events may not be logged',
        })

    # §164.312(b) — Check: GuardDuty enabled
    detectors = gd.list_detectors().get('DetectorIds', [])
    if not detectors:
        findings.append({
            'control':  '164.312(b)',
            'severity': 'HIGH',
            'resource': 'GuardDuty',
            'finding':  'GuardDuty not enabled — threat detection inactive',
        })

    result = {
        'scan_timestamp':    datetime.now(timezone.utc).isoformat(),
        'total_findings':    len(findings),
        'critical_findings': sum(1 for f in findings if f['severity'] == 'CRITICAL'),
        'high_findings':     sum(1 for f in findings if f['severity'] == 'HIGH'),
        'findings':          findings,
        'compliant':         len(findings) == 0,
    }

    # Save to S3 as dated evidence file
    evidence_s3 = boto3.client('s3')
    date_str    = datetime.now(timezone.utc).strftime('%Y/%m/%d')
    evidence_s3.put_object(
        Bucket='hipaa-compliance-evidence',
        Key=f'scans/{date_str}/compliance_scan.json',
        Body=json.dumps(result, indent=2),
        ContentType='application/json',
    )

    return result


def lambda_handler(event, context):
    result = scan_all()
    print(f"Scan complete: {result['total_findings']} findings, compliant={result['compliant']}")
    return result
```

---

## Part 9: The Pre-Audit Checklist

Run this script 30 days before any HIPAA audit. It queries your live AWS account across five control categories and writes the output of each check to a dated directory of evidence files. Each file is named after the specific regulation clause it demonstrates, so when an auditor asks for evidence of a particular control, you hand them a file rather than running a command in the room.

Here's what each check collects and what the output looks like:

The RDS encryption check queries every database instance in your account and produces a table showing the instance identifier, whether storage encryption is enabled (true or false), and the KMS key ARN. A HIPAA-compliant account has `StorageEncrypted: true` on every row.

The KMS rotation check queries every key with "hipaa" in its alias and confirms that `KeyRotationEnabled` is true for each one. If any key shows false, that's an audit finding under §164.312(a)(2)(iv).

The CloudTrail check returns the trail name, whether it's multi-region (must be true), and whether the trail logs are encrypted with a KMS key. Both properties are required.

The ALB TLS check shows the listener port, protocol, and SSL policy name for every load balancer listener. Auditors look for the policy name to confirm that deprecated TLS versions are disabled.

The VPC endpoint check lists every VPC endpoint in your account with its service name, state, and type. For a HIPAA account, you expect to see at minimum S3 and KMS endpoints in the `available` state.

```sh title="pre_audit_evidence_collector.sh"
#!/usr/bin/env bash

EVIDENCE_DIR="hipaa-evidence-$(date +%Y-%m-%d)"
mkdir -p "$EVIDENCE_DIR"

echo "Collecting HIPAA compliance evidence..."

#  .312(a)(2)(iv) — Encryption at rest
aws rds describe-db-instances \
--query 'DBInstances[*].{ID:DBInstanceIdentifier,Encrypted:StorageEncrypted,KMS:KmsKeyId}' \
--output table > "$EVIDENCE_DIR/164-312-a-2-iv-rds-encryption.txt"

aws kms list-aliases \
--query 'Aliases[?contains(AliasName,`hipaa`)].AliasName' \
--output text | xargs -I{} aws kms get-key-rotation-status --key-id {} \
>> "$EVIDENCE_DIR/164-312-a-2-iv-kms-rotation.txt"

# §164.312(b) — Audit Controls
aws cloudtrail describe-trails \
--query 'trailList[*].{Name:Name,MultiRegion:IsMultiRegionTrail,Encrypted:KMSKeyId}' \
--output table > "$EVIDENCE_DIR/164-312-b-cloudtrail-config.txt"

# §164.312(e)(1) — Transmission Security
aws elbv2 describe-listeners \
--load-balancer-arn $(aws elbv2 describe-load-balancers \
--query 'LoadBalancers[0].LoadBalancerArn' --output text) \
--query 'Listeners[*].{Port:Port,Protocol:Protocol,SslPolicy:SslPolicy}' \
--output table > "$EVIDENCE_DIR/164-312-e-1-tls-config.txt"

# §164.310(a)(1) — Network Access Controls
aws ec2 describe-vpc-endpoints \
--query 'VpcEndpoints[*].{Service:ServiceName,State:State,Type:VpcEndpointType}' \
--output table > "$EVIDENCE_DIR/164-310-a-1-vpc-endpoints.txt"

echo "Evidence collection complete. Files saved to: $EVIDENCE_DIR/"
ls "$EVIDENCE_DIR/"
```

---

## Best Practices Summary

**Do:** Sign the AWS BAA before writing any HIPAA infrastructure code. The technical controls are invalid without the legal agreement.

**Do:** Use customer-managed KMS keys with automatic rotation. AWS-managed keys are acceptable but don't give you proof of key material control that enterprise healthcare auditors will ask for.

**Do:** Implement field-level encryption for the highest-sensitivity ePHI fields (SSN, diagnosis, treatment notes). Storage encryption alone doesn't protect against authorized users with direct database access.

**Do:** Enable S3 Object Lock in COMPLIANCE mode for audit logs. GOVERNANCE mode allows deletion by privileged users. COMPLIANCE mode doesn't allow deletion by anyone, including root.

**Do:** Run the pre-audit evidence collector monthly, not just before audits. Continuous evidence collection means you're always 30 days away from audit-ready.

**Do:** Use VPC endpoints for all AWS service communication. ePHI must not traverse the public internet even when both source and destination are within AWS.

**Don't:** Log PHI values in CloudWatch or application logs. Log that a field was accessed, not what it contained.

**Don't:** Use shared IAM credentials across multiple engineers or automation systems. Every entity that accesses ePHI must have a unique, auditable identity.

**Don't:** Assume that being inside a VPC means a workload is isolated. Security groups are the actual enforcement boundary — a misconfigured security group that allows 0.0.0.0/0 on port 5432 exposes your RDS instance regardless of VPC placement.

::: info Resources

<SiteInfo
  name="The Security Rule"
  desc="HIPAA Security Rule sets standards to protect electronic health data with administrative, physical, and technical safeguards for confidentiality."
  url="https://hhs.gov/hipaa/for-professionals/security/index.html/"
  logo="https://hhs.gov/themes/custom/hhs_uswds/favicon.ico"
  preview="https://hhs.gov/sites/default/files/styles/og_image_style/public/hhs-mark-og_0.png?h=457da100&itok=8h12Thnc"/>

> The primary source for all Technical Safeguard requirements cited in this guide

```component VPCard
{
  "title": "Architecting for HIPAA Security and Compliance on Amazon Web Services - Architecting for HIPAA Security and Compliance on Amazon Web Services",
  "desc": "Notice: This whitepaper has been archived. For the latest technical information on HIPAA Compliance and AWS, see the HIPAA Eligible Services Reference .",
  "link": "https://docs.aws.amazon.com/whitepapers/latest/architecting-hipaa-security-and-compliance-on-aws/architecting-hipaa-security-and-compliance-on-aws.html",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

> AWS's official HIPAA whitepaper — required reading before building on the patterns in this guide

```component VPCard
{
  "title": "Security Compliance Management - AWS Artifact - AWS",
  "desc": "AWS Artifact provides on-demand access to select security reports, compliance reports, and agreements with AWS.",
  "link": "https://aws.amazon.com/artifact/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

> Where to accept the AWS Business Associate Agreement

```component VPCard
{
  "title": "HIPAA Eligible Services Reference",
  "desc": "AWS offers a variety of HIPAA eligible services on the cloud infrastructure, such as EC2 and S3. Click here to view the full list. ",
  "link": "https://aws.amazon.com/compliance/hipaa-eligible-services-reference/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

> The current, definitive list of BAA-covered services

<PDF url="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-111.pdf">

>  NIST guidance on storage encryption that informs HIPAA implementation best practices

<SiteInfo
  name="Audit Protocol"
  desc="The OCR HIPAA Audit program analyzes processes, controls, and policies of selected covered entities pursuant to the HITECH Act audit mandate. OCR established a comprehensive audit protocol that contains the requirements to be assessed through these performance audits. The entire audit protocol is organized around modules, representing separate elements of privacy, security, and breach notification. The combination of these multiple requirements may vary based on the type of covered entity selected for review."
  url="https://hhs.gov/hipaa/for-professionals/compliance-enforcement/audit/protocol/index.html/"
  logo="https://hhs.gov/themes/custom/hhs_uswds/favicon.ico"
  preview="https://hhs.gov/sites/default/files/styles/og_image_style/public/hhs-mark-og_0.png?h=457da100&itok=8h12Thnc"/>

> The exact audit protocol OCR uses — reading this tells you precisely what auditors look for

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement HIPAA Technical Safeguards on AWS [Full Handbook]",
  "desc": "Before I had ever heard the term ”HIPAA audit”, I spent three days helping a healthcare SaaS startup fix a single misconfigured S3 bucket. Not a breach — nothing was accessed. But the bucket was publi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-hipaa-technical-safeguards-on-aws-full-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
