---
lang: en-US
title: "How to Migrate to S3 Native State Locking in Terraform"
description: "Article(s) > How to Migrate to S3 Native State Locking in Terraform"
icon: iconfont icon-terraform
category:
  - DevOps
  - Terraform
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - terraform
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Migrate to S3 Native State Locking in Terraform"
    - property: og:description
      content: "How to Migrate to S3 Native State Locking in Terraform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-migrate-to-s3-native-state-locking-in-terraform.html
prev: /devops/terraform/articles/README.md
date: 2026-05-08
isOriginal: false
author:
  - name: Tolani Akintayo
    url: https://freecodecamp.org/news/author/tolani-akintayo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9619ad45-15c5-4be7-9221-ed4b76bc2b24.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Terraform > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/terraform/articles/README.md",
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


[[toc]]

---

<SiteInfo
  name="How to Migrate to S3 Native State Locking in Terraform"
  desc="If you've been running Terraform on AWS for any length of time, you know the setup: an S3 bucket for state storage, a DynamoDB table for state locking, and a handful of IAM policies tying them togethe"
  url="https://freecodecamp.org/news/how-to-migrate-to-s3-native-state-locking-in-terraform"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9619ad45-15c5-4be7-9221-ed4b76bc2b24.png"/>

If you've been running Terraform on AWS for any length of time, you know the setup: an S3 bucket for state storage, a DynamoDB table for state locking, and a handful of IAM policies tying them together. It works. It has worked for years.

But it has always carried a cost that rarely gets discussed openly. That cost isn't just money, though a DynamoDB table with on-demand billing adds up across multiple teams and environments.

The real cost is complexity. Every new AWS environment needs both resources provisioned before Terraform can manage anything else. Every engineer who sets up their first Terraform backend has to understand why two completely different AWS services are responsible for what is logically one thing: storing and protecting state. And every incident involving a stuck lock has required someone to manually delete a record from DynamoDB to unblock the team.

In November 2024, AWS announced that S3 now supports native object locking for Terraform state files, meaning **DynamoDB is no longer required for state locking**. Terraform 1.10 added support for this feature, and it's now generally available.

In this tutorial, you'll learn:

- What S3 native locking is and how it works
- How to set it up from scratch if you're starting a new project
- How to migrate an existing S3 + DynamoDB setup to S3 native locking safely
- How to verify locking is working and handle edge cases

By the end, you'll have a simpler, cleaner Terraform backend with one fewer AWS resource to manage.

---

## What is Terraform State Locking?

Before looking at the new approach, it helps to understand what state locking is solving.

Terraform stores everything it knows about your infrastructure in a **state file** – a JSON document that maps your configuration to real AWS resources. When you run `terraform apply`, Terraform reads this file, calculates the difference between the current state and your configuration, and makes the necessary changes.

The problem arises when two engineers or two CI/CD pipelines run and try to apply changes at the same time. If both read the state file simultaneously, calculate changes independently, and both try to write back, you get a **race condition**. The second write overwrites changes from the first, and your state is now out of sync with reality. This is a serious problem that can cause resources to be untracked, doubled, or destroyed unexpectedly.

**State locking** solves this by creating a lock when any operation starts that could modify state. If a lock already exists, Terraform refuses to proceed and reports who holds the lock and when it was acquired. Only one operation can hold the lock at a time. When the operation completes, the lock is released.

```plaintext
Terraform Run A                 State File / Lock                Terraform Run B
(User 1)                         (S3/DynamoDB)                   (User 2)

   |                                   |                            |
   |------- 1. Acquire Lock ---------->|                            |
   |                                   |                            |
   |<------ 2. Lock Granted -----------|                            |
   |                                   |                            |
   |                                   |------- 3. Acquire Lock --->|
   |            [PROCESSING]           |                            |
   |      (Modifying Infrastructure)   |<------ 4. Lock Denied -----|
   |                                   |        (Wait / Retry)      |
   |                                   |                            |
   |------- 5. Release Lock ---------->|                            |
   |                                   |                            |
   |           [COMPLETED]             |<------ 6. Lock Granted ----|
   |                                   |                            |
   |                                   |       [PROCESSING]         |
   |                                   | (Modifying Infrastructure) |              
   |                                   |                            |
```
<!-- TODO: mermaid화-->

---

## What Is S3 Native State Locking?

Previously, Terraform's S3 backend used a DynamoDB table as the locking mechanism. When a lock was needed, Terraform wrote a record to DynamoDB with a `LockID` primary key. DynamoDB's conditional writes guaranteed that only one process could create that record, which is what made the locking atomic.

S3 native locking uses **S3 Object Lock** instead. S3 Object Lock is an S3 feature originally designed to enforce WORM (Write Once, Read Many) compliance for regulatory requirements. AWS extended this capability to support Terraform's state locking workflow.

When S3 native locking is enabled in your Terraform backend:

1. Terraform writes your state to an `.tfstate` object in S3 (as before)
2. To acquire a lock, Terraform uses **S3's conditional write operations** – specifically the `if-none-match` conditional header to create a lock file atomically
3. If the lock file already exists, S3 rejects the write, and Terraform reports that a lock is held
4. When the operation completes, Terraform deletes the lock file to release the lock.

The key difference from DynamoDB: the entire locking mechanism lives inside S3. No second service. No second set of IAM permissions. No second resource to provision.

**Note:** This feature requires Terraform version **1.10.0 or later** and an S3 bucket with **Object Lock enabled**. Object Lock must be enabled at bucket creation time. You can't enable it on an existing bucket through the console or CLI. But there is a supported workaround for existing buckets, which we'll cover in Part 2. ---

## How S3 Native Locking Compares to the S3 + DynamoDB Approach

| **Aspect** | **S3 + DynamoDB (Old)** | **S3 Native Locking (New)** |
| --- | --- | --- |
| **AWS services required** | S3 + DynamoDB | S3 only |
| **IAM permissions needed** | S3 + DynamoDB permissions | S3 permissions only |
| **Terraform version** | Any | 1.10.0 or later |
| **Setup complexity** | Two resources, two IAM scopes | One resource |
| **Stuck lock resolution** | Delete DynamoDB record | Delete S3 lock file |
| **Cost** | S3 storage + DynamoDB on-demand | S3 storage only |
| **Object Lock requirement** | Not required | Required on S3 bucket |
| **Locking mechanism** | DynamoDB conditional writes | S3 conditional writes (`if-none-match`) |
| **State versioning** | S3 Versioning (recommended) | S3 Versioning (required for full safety) |

The functional behavior from Terraform's perspective is identical. Locking works the same way. The lock information displayed when a lock is held has the same structure. The only difference is what happens under the hood.

---

## Prerequisites

Before you start, make sure you have the following in place:

- **Terraform 1.10.0 or later** installed. Check your version:

```sh
terraform version
```

If you need to upgrade, follow the [<VPIcon icon="iconfont icon-terraform"/>official upgrade guide](https://developer.hashicorp.com/terraform/install).

- **AWS CLI** installed and configured with credentials that have permission to create and manage S3 buckets.

```sh
aws --version
aws sts get-caller-identity   # confirm you're authenticated
```

- **IAM permissions** to perform the following S3 actions:
  - `s3:CreateBucket`
  - `s3:PutBucketVersioning`
  - `s3:PutBucketEncryption`
  - `s3:PutObjectLegalHold`
  - `s3:PutObjectRetention`
  - `s3:GetObject`
  - `s3:PutObject`
  - `s3:DeleteObject`
  - `s3:ListBucket`
- For the **migration path**: access to your existing Terraform project and the S3 bucket and DynamoDB table currently in use.

---

## Part 1: Fresh Setup – How to Configure S3 Native Locking from Scratch

Follow this section if you're starting a new Terraform project and want to use S3 native locking from the beginning.

### Step 1: Create the S3 Bucket with Versioning and Encryption

Object Lock **must be enabled at bucket creation time**. You can't add it afterward through the standard console flow. Create the bucket using the AWS CLI with Object Lock enabled:

```sh
aws s3api create-bucket \
--bucket your-project-terraform-state \
--region us-east-1 \
--object-lock-enabled-for-bucket
```

**Note:** For regions other than `us-east-1`, add the `--create-bucket-configuration` flag.

```sh
aws s3api create-bucket \
--bucket your-project-terraform-state \
--region eu-west-1 \
--create-bucket-configuration LocationConstraint=eu-west-1 \
--object-lock-enabled-for-bucket
```

Now enable versioning on the bucket. Versioning is required alongside Object Lock and allows Terraform to recover previous state versions if something goes wrong:

```sh
aws s3api put-bucket-versioning \
--bucket your-project-terraform-state \
--versioning-configuration Status=Enabled
```

Enable server-side encryption so your state files are encrypted at rest:

```sh
aws s3api put-bucket-encryption \
--bucket your-project-terraform-state \
--server-side-encryption-configuration '{
  "Rules": [
    {
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      },
      "BucketKeyEnabled": true
    }
  ]
}'
```

Block all public access to the bucket. A Terraform state file contains resource IDs, IP addresses, and potentially sensitive values. It should never be publicly accessible:

```sh
aws s3api put-public-access-block \
--bucket your-project-terraform-state \
--public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

Verify the bucket configuration:

```sh
# Confirm Object Lock is enabled
aws s3api get-object-lock-configuration \
--bucket your-project-terraform-state
 
# Confirm versioning is enabled
aws s3api get-bucket-versioning \
--bucket your-project-terraform-state
 
# Confirm encryption is configured
aws s3api get-bucket-encryption \
--bucket your-project-terraform-state
```

Expected output for the Object Lock check:

```json
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": "Enabled"
  }
}
```

![Terminal showing AWS CLI verification commands confirming S3 bucket is configured correctly with Object Lock, versioning, and encryption enabled](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/2b2e56cf-687f-4932-a61e-ed7cc33ea6f1.png)

### Step 2: Configure the Terraform Backend with Native Locking

In your Terraform project, create or update your <VPIcon icon="iconfont icon-terraform"/>`backend.tf` file:

```hcl title="backend.tf"
terraform {
  backend "s3" {
    bucket = "your-project-terraform-state"
    key    = "production/terraform.tfstate"
    region = "us-east-1"
 
    # Enable S3 native state locking
    # Requires Terraform 1.10.0+ and a bucket with Object Lock enabled
    use_lockfile = true
 
    # Encryption at rest
    encrypt = true
  }
}
```

The critical difference from the old configuration is the `use_lockfile = true` parameter. Notice what is **absent**: there's no `dynamodb_table` argument. No DynamoDB table. No second service.

Here's a direct comparison of the old and new configurations:

::: code-tabs#hcl

@tab:active Old configuration (S3 + DynamoDB)

```hcl
terraform {
  backend "s3" {
    bucket         = "your-project-terraform-state"
    key            = "production/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"   # this goes away
  }
}
```

@tab New configuration (S3 native locking)

```hcl
terraform {
  backend "s3" {
    bucket       = "your-project-terraform-state"
    key          = "production/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true   # this replaces dynamodb_table
  }
}
```

:::

### Step 3: Initialize and Verify

Run `terraform init` to initialize the backend:

```sh
terraform init
#
# Initializing the backend...
#  
# Successfully configured the backend "s3"! Terraform will automatically
# use this backend unless the backend configuration changes.
#  
# Initializing provider plugins...
#  
# Terraform has been successfully initialized!
```

Run a plan to confirm everything is working end-to-end:

```sh
terraform plan
```

If locking is working, you'll see a brief pause while Terraform acquires the lock before the plan output appears. You'll also see the lock information if you look at the S3 bucket – a `.tflock` file will appear temporarily alongside your state file during the operation and disappear when it completes.

---

## Part 2: Migration – How to Move from S3 + DynamoDB to S3 Native Locking

Follow this section if you have an **existing Terraform setup** using an S3 bucket and DynamoDB table for state locking, and you want to migrate to S3 native locking.

::: important

Migration requires a maintenance window or at minimum a period where no Terraform operations are running. You're changing the backend configuration, which means **all team members and CI/CD pipelines must stop running** `terraform plan` **or** `terraform apply` **during the migration**. The migration itself takes under 10 minutes.

:::

### Step 1: Verify Your Current Setup

Before making any changes, document your existing backend configuration and confirm the state file is accessible:

```sh
# Confirm your state file is in S3
aws s3 ls s3://your-existing-bucket/path/to/terraform.tfstate
 
# Confirm the DynamoDB table exists
aws dynamodb describe-table \
--table-name your-dynamodb-lock-table \
--query 'Table.TableStatus'
```

Check your current <VPIcon icon="iconfont icon-terraform"/>`backend.tf` and note the exact values:

```hcl title="backend.tf"
# Your current backend.tf - note these values before changing anything
terraform {
  backend "s3" {
    bucket         = "your-existing-bucket"       # note this
    key            = "path/to/terraform.tfstate"   # note this
    region         = "us-east-1"                   # note this
    encrypt        = true
    dynamodb_table = "your-dynamodb-lock-table"    # this will be removed
  }
}
```

Run one final plan to confirm the current state is clean and there are no unexpected changes pending:

```sh
terraform plan
```

If the plan shows no changes, you're in a safe state to proceed.

### Step 2: Enable Object Lock on the Existing S3 Bucket

This is the most important step in the migration. Object Lock can't normally be enabled on an existing bucket. It's a setting that must be configured at creation time.

But AWS provides a way to enable Object Lock on an existing bucket through a support request or through a direct API call that's not exposed in the standard console UI. AWS has officially documented this path for the Terraform migration use case.

Run the following AWS CLI command to enable Object Lock on your **existing** bucket:

```sh
aws s3api put-object-lock-configuration \
--bucket your-existing-bucket \
--object-lock-configuration '{"ObjectLockEnabled": "Enabled"}'
```

::: note

This command enables Object Lock in **governance mode with no default retention**, meaning it enables the locking capability without setting a default retention period on all objects. This is exactly what Terraform's native locking needs: the ability to create and delete lock files, not permanent object retention.

:::

Verify Object Lock is now enabled:

```sh
aws s3api get-object-lock-configuration \
--bucket your-existing-bucket
```

Expected output:

```json
{
  "ObjectLockConfiguration": {
    "ObjectLockEnabled": "Enabled"
  }
}
```

Also verify that versioning is already enabled (it should be if you are running a production Terraform setup):

```sh
aws s3api get-bucket-versioning \
--bucket your-existing-bucket
```

Expected output:

```json
{
  "Status": "Enabled"
}
```

If versioning isn't enabled, enable it before proceeding:

```sh
aws s3api put-bucket-versioning \
--bucket your-existing-bucket \
--versioning-configuration Status=Enabled
```

![Terminal output showing successful Object Lock enablement on an existing S3 bucket using the AWS CLI](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/cd17df01-3d0a-4f93-9250-3f51627e91c8.png)

### Step 3: Update the Terraform Backend Configuration

Update your <VPIcon icon="iconfont icon-terraform"/>`backend.tf` to remove the `dynamodb_table` argument and add `use_lockfile = true`:

```hcl title="backend.tf"
terraform {
  backend "s3" {
    bucket = "your-existing-bucket"
    key    = "path/to/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
 
    # Add this:
    use_lockfile = true
 
    # Remove this line entirely:
    # dynamodb_table = "your-dynamodb-lock-table"
  }
}
```

Your updated <VPIcon icon="iconfont icon-terraform"/>`backend.tf` should look like this:

```hcl title="backend.tf"
terraform {
  backend "s3" {
    bucket       = "your-existing-bucket"
    key          = "path/to/terraform.tfstate"
    region       = "us-east-1"
    encrypt      = true
    use_lockfile = true
  }
}
```

### Step 4: Reinitialize Terraform

Run `terraform init` with the `-reconfigure` flag. This flag tells Terraform that the backend configuration has changed intentionally and to reinitialize without prompting you to copy state (the state is already in the same bucket):

```sh
terraform init -reconfigure
#
# Initializing the backend...
#  
# Successfully configured the backend "s3"! Terraform will automatically
# use this backend unless the backend configuration changes.
#  
# Initializing provider plugins...
# - Reusing previous version of hashicorp/aws from the dependency lock file
#  
# Terraform has been successfully initialized!
```

::: critical If you see an error here

The most common cause is that Object Lock wasn't successfully enabled on the bucket. Re-run the verification from Step 2 before proceeding.

:::

### Step 5: Verify the Migration

Run a plan to confirm Terraform is working correctly with the new backend configuration:

```sh
terraform plan
```

The plan should:

- Complete successfully
- Show the same result as the plan you ran in Step 1 (no changes, or the same changes as before)
- NOT mention DynamoDB anywhere in its output

To confirm that locking is actually using S3 instead of DynamoDB, open a second terminal and run a plan while the first one is running. You should see the second terminal output a lock error that mentions S3, not DynamoDB:

```plaintext
╷
│ Error: Error acquiring the state lock
│
│Error message: operation error S3: PutObject, https response       error StatusCode: 409,
│ RequestID: ..., api error Conflict: Object lock already exists for this key.
│
│ Lock Info:
│   ID:        a1b2c3d4-e5f6-7890-abcd-ef1234567890
│   Path:      your-existing-bucket/path/to/terraform.tfstate.tflock
│   Operation: OperationTypePlan
│   Who:       user@hostname
│   Version:   1.10.0
│   Created:   2026-05-06 14:22:01 UTC
│   Info:
╵
```

The `Path` field shows `.tfstate.tflock`, a file in your S3 bucket, not a DynamoDB record. This confirms that locking is now handled entirely by S3.

![Two terminals showing concurrent terraform plan commands, the second one displays a lock error confirming S3 native locking is working](https://cdn.hashnode.com/uploads/covers/65a5bfab4c73b29396c0b895/e9abb703-af6e-429c-83bb-2ea2dac43a3a.png)

### Step 6: Clean Up the DynamoDB Table

Once you've confirmed the migration is working correctly and your team has run at least one successful `plan` and `apply` cycle using the new backend, you can remove the DynamoDB table.

**Wait at least 24-48 hours before deleting the DynamoDB table** if you have CI/CD pipelines or multiple team members. This gives time to catch any pipeline that wasn't updated with the new backend configuration.

When you're ready, delete the DynamoDB table:

```sh
aws dynamodb delete-table \
--table-name your-dynamodb-lock-table
```

Confirm the deletion:

```sh
aws dynamodb describe-table \
--table-name your-dynamodb-lock-table
#
# An error occurred (ResourceNotFoundException) when calling the DescribeTable operation:
# Requested resource not found
```

This error confirms that the table is gone. The migration is complete.

If you provisioned the DynamoDB table using Terraform (which is the recommended pattern), remove the resource from your Terraform configuration and run `terraform apply` to destroy it via Terraform rather than the CLI directly. This keeps your state clean:

```hcl title="backend.tf"
# Remove this entire block from your Terraform configuration:
resource "aws_dynamodb_table" "terraform_state_lock" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
 
  attribute {
    name = "LockID"
    type = "S"
  }
}
```

After removing the block, run:

```sh
terraform apply
```

Terraform will detect that the DynamoDB table resource has been removed from configuration and will destroy the table.

---

## How to Verify That Locking Is Working

After completing either the fresh setup or the migration, use this procedure to independently verify that locking is functioning correctly.

### Method 1: Observe the lock file during an operation

In one terminal, start a long-running plan against a configuration with many resources:

```sh
terraform plan
```

While it's running, in a second terminal, check for the lock file in S3:

```sh
aws s3 ls s3://your-bucket/path/to/ | grep tflock
```

You should see a file like:

```plaintext
2026-05-06 14:22:01        512 terraform.tfstate.tflock
```

After the plan completes, run the same command again. The `.tflock` file should be gone.

### Method 2: Read the lock file contents

While a plan is running, download and read the lock file to see its contents:

```sh
aws s3 cp \
s3://your-bucket/path/to/terraform.tfstate.tflock \
/tmp/current.lock && cat /tmp/current.lock
```

Expected output (formatted for readability):

```json
{
  "ID": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "Operation": "OperationTypePlan",
  "Info": "",
  "Who": "tolani@dev-machine",
  "Version": "1.10.0",
  "Created": "2026-05-06T14:22:01.123456789Z",
  "Path": "your-bucket/path/to/terraform.tfstate"
}
```

This is the same lock information that Terraform displays when a lock is held. It's now a JSON file in S3 rather than a record in DynamoDB.

---

## How to Handle a Stuck Lock

With the DynamoDB backend, resolving a stuck lock meant deleting a record from the DynamoDB table. With S3 native locking, it means deleting the `.tflock` file from S3. A lock can get stuck if:

- A `terraform apply` or `plan` process was killed mid-execution
- A CI/CD pipeline runner crashed during a Terraform operation
- A network interruption prevented the lock release from completing

Here's how you can check for a stuck lock:

```sh
aws s3 ls s3://your-bucket/path/to/ | grep tflock
```

If a `.tflock` file exists and no Terraform operation is currently running, it is a stuck lock.

You can also read the lock to understand who held it:

```sh
aws s3 cp \
s3://your-bucket/path/to/terraform.tfstate.tflock \
/tmp/stuck.lock && cat /tmp/stuck.lock
```

This tells you who (`Who` field) was running the operation, what operation it was (`Operation` field), and when it was acquired (`Created` field).

And you can force-unlock using Terraform like this:

```sh
terraform force-unlock LOCK-ID
```

Replace `LOCK-ID` with the `ID` value from the lock file contents. For example:

```sh
terraform force-unlock a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Terraform will confirm:

```plaintext
Do you really want to force-unlock?
  Terraform will remove the lock on the remote state.
  This will allow local Terraform commands to modify this state, even though it
  may be still be in use. Only 'yes' will be accepted to confirm.
 
  Enter a value: yes
 
Terraform state has been successfully unlocked!
```

An alternative is to delete the lock file directly via CLI. If `terraform force-unlock` doesn't work (for example, because you are running in a CI environment without Terraform available), delete the lock file directly:

```sh
aws s3 rm s3://your-bucket/path/to/terraform.tfstate.tflock
```

::: note

**Only delete the lock file if you are certain no Terraform operation is currently running.** Deleting a lock that is actively held by a running operation will allow a second concurrent operation to start, which is exactly the race condition locking is designed to prevent.

:::

---

## Rollback Plan: If Something Goes Wrong

If you encounter problems after migrating, you can roll back to the S3 + DynamoDB setup with these steps.

**Step 1: Stop all Terraform operations** in your team and CI/CD pipelines.

**Step 2: Recreate the DynamoDB table** if you already deleted it:

```sh
aws dynamodb create-table \
--table-name terraform-state-lock \
--attribute-definitions AttributeName=LockID,AttributeType=S \
--key-schema AttributeName=LockID,KeyType=HASH \
--billing-mode PAY_PER_REQUEST
```

**Step 3: Revert** <VPIcon icon="iconfont icon-terraform"/>`backend.tf` to the previous configuration:

```hcl title="backend.tf"
terraform {
  backend "s3" {
    bucket         = "your-existing-bucket"
    key            = "path/to/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"   # restored
    # Remove: use_lockfile = true
  }
}
```

**Step 4: Reinitialize:**

```sh
terraform init -reconfigure
```

**Step 5: Verify:**

```sh
terraform plan
```

The state file hasn't moved, so there's no data loss during a rollback. The only change is which locking mechanism Terraform uses.

::: note

Object Lock being enabled on the S3 bucket doesn't prevent the rollback. Object Lock and DynamoDB locking can coexist, Object Lock simply adds a capability to the bucket. Using `dynamodb_table` in your backend config tells Terraform to use DynamoDB regardless of whether Object Lock is enabled on the bucket.

:::

---

## Security Best Practices for Your State Bucket

Migrating to S3 native locking is a good opportunity to review the overall security configuration of your state bucket. Here are the practices every production Terraform state bucket should implement:

### Enable Versioning (Required)

Versioning is a hard requirement for S3 native locking to work safely. It ensures that if a state file is accidentally overwritten or corrupted, you can restore a previous version.

```sh
aws s3api put-bucket-versioning \
--bucket your-state-bucket \
--versioning-configuration Status=Enabled
```

### Block All Public Access (Non-Negotiable)

Your state file contains resource ARNs, IP addresses, and may contain sensitive values passed through Terraform variables. It must never be publicly accessible.

```sh
aws s3api put-public-access-block \
--bucket your-state-bucket \
--public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Enable Server-Side Encryption

Always encrypt state files at rest. AES256 is the minimum. If your organization requires KMS key management:

```sh
aws s3api put-bucket-encryption \
--bucket your-state-bucket \
--server-side-encryption-configuration '{
  "Rules": [
    {
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "arn:aws:kms:us-east-1:123456789012:key/your-kms-key-id"
      },
      "BucketKeyEnabled": true
    }
  ]
}'
```

### Apply Least-Privilege IAM Permissions

The role or user that Terraform uses to access the state bucket should have only the permissions it needs. Here's a minimal IAM policy for S3 native locking:

```json :collapsed-lines
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "TerraformStateAccess",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-state-bucket",
        "arn:aws:s3:::your-state-bucket/*"
      ]
    },
    {
      "Sid": "TerraformStateLocking",
      "Effect": "Allow",
      "Action": [
        "s3:GetObjectLegalHold",
        "s3:PutObjectLegalHold",
        "s3:GetObjectRetention",
        "s3:PutObjectRetention"
      ],
      "Resource": "arn:aws:s3:::your-state-bucket/*.tflock"
    }
  ]
}
```

Notice what is absent: there are no DynamoDB permissions. This is a cleaner, smaller permission set than the old approach required.

### Enable Access Logging

Log all access to your state bucket in CloudTrail or S3 server access logs. This gives you an audit trail of every time state was read, written, or locked:

```sh
aws s3api put-bucket-logging \
--bucket your-state-bucket \
--bucket-logging-status '{
  "LoggingEnabled": {
    "TargetBucket": "your-logging-bucket",
    "TargetPrefix": "terraform-state-access/"
  }
}'
```

---

## Conclusion

AWS S3 native state locking removes the need for a DynamoDB table from your Terraform backend setup. The result is simpler infrastructure, a smaller IAM permission surface, and one fewer service to provision, monitor, and pay for across every environment your team manages.

Here's a summary of what you accomplished:

- Understood what state locking is and why it's required for safe Terraform operations
- Compared S3 native locking to the existing S3 + DynamoDB approach
- Set up a fresh Terraform backend using S3 native locking with correct bucket configuration
- Migrated an existing backend from S3 + DynamoDB to S3 native locking safely
- Learned how to verify locking, handle stuck locks, and roll back if needed
- Applied security best practices to the state bucket

This pattern – using S3 native locking – is the recommended approach for all new Terraform projects on AWS going forward. If you're managing a large estate with multiple Terraform backends, consider automating the migration using a script or Terraform module that applies the pattern across all your state buckets.

::: info

If you are building or optimizing cloud infrastructure for a startup and want a complete reference for production-ready Terraform modules, CI/CD pipeline patterns, and infrastructure runbooks, check out [<VPIcon icon="fas fa-globe"/>The Startup DevOps Field Guide](https://coachli.co/tolani-akintayo/PR-H4oQS). It covers the full lifecycle of AWS infrastructure from initial setup to production reliability.

<SiteInfo
  name="Coachli: The Startup DevOps Field Guide"
  desc="The Startup DevOps Field Guide is a practical guide for engineers stepping into DevOps roles at startups. It covers real-world infrastructure, deployments, security, and cost management using tools like AWS, Terraform, Docker, and CI/CD all based on actual production scenarios.Built for first DevOps hires, junior to mid-level engineers, and developers transitioning into cloud roles, this guide helps you understand what really happens in production, avoid costly mistakes, and confidently build and manage reliable systems from day one.Inside, you’ll find:Real incident scenarios from startup environmentsStep-by-step guidance for production infrastructurePractical checklists you can reuse every monthLessons learned from failures, not just success stories&nbsp;Who This Is ForFirst DevOps hires at startupsJunior to mid-level engineers stepping into DevOps rolesDevelopers transitioning into cloud and infrastructureAnyone responsible for keeping production systems runningWhat You Walk Away WithA clear DevOps foundation for startup environmentsProduction-ready infrastructure practicesSecurity and reliability mindsetCost-awareness and operational disciplineA repeatable checklist for running systems with confidence"
  url="https://coachli.co/tolani-akintayo/product/the-startup-devops-field-guide?id=12108/"
  logo="https://coachli.co/tolani-akintayo/icon-ypah9l?b5c674151fc0e632"
  preview="https://coachliavatars.s3.eu-west-1.amazonaws.com/media-images/9d135b4e-386e-4f97-8449-14adba5d33d9.jpg"/>


:::

::: info References

<SiteInfo
  name="Backend Type: s3 | Terraform | HashiCorp Developer"
  desc="Terraform can store and lock state remotely in Amazon S3."
  url="https://developer.hashicorp.com/terraform/language/backend/s3#use_lockfile/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/terraform.jpg"/>

<SiteInfo
  name="Release v1.10.0 · hashicorp/terraform"
  desc="1.10.0 (November 27, 2024) NEW FEATURES: Ephemeral resources: Ephemeral resources are read anew during each phase of Terraform evaluation, and cannot be persisted to state storage. Ephemeral resou..."
  url="https://github.com/hashicorp/terraform/releases/tag/v1.10.0/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4a1630458fcaadb3fb70044d1b1b56eb7dc3a8e8281cd170fb0d20572fb29bb8/hashicorp/terraform/releases/tag/v1.10.0"/>

```component VPCard
{
  "title": "Locking objects with Object Lock - Amazon Simple Storage Service",
  "desc": "Prevent Amazon S3 objects from being deleted or overwritten for a fixed amount of time or indefinitely by using S3 Object Lock.",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "PutObjectLockConfiguration - Amazon Simple Storage Service",
  "desc": "Places an Object Lock configuration on the specified bucket. The rule specified in the Object Lock configuration will be applied by default to every new object placed in the specified bucket. For more information, see Locking Objects .",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObjectLockConfiguration.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "Add preconditions to S3 operations with conditional requests - Amazon Simple Storage Service",
  "desc": "conditional requests are included in header fields and test a precondition before doing some S3 operation.",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-requests.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

<SiteInfo
  name="State: Locking | Terraform | HashiCorp Developer"
  desc="Terraform stores state which caches the known state of the world the last time Terraform ran."
  url="https://developer.hashicorp.com/terraform/language/state/locking/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/terraform.jpg"/>

<SiteInfo
  name="terraform force-unlock command reference | Terraform | HashiCorp Developer"
  desc="The `terraform force-unlock` command unlocks the state for a configuration. It does not modify your infrastructure."
  url="https://developer.hashicorp.com/terraform/cli/commands/force-unlock/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/terraform.jpg"/>

```component VPCard
{
  "title": "Enabling versioning on buckets - Amazon Simple Storage Service",
  "desc": "Examples for how to use the console, AWS CLI, and AWS SDKs to manage versioning for Amazon S3.",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/manage-versioning-examples.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "Protecting data with server-side encryption - Amazon Simple Storage Service",
  "desc": "Learn how to protect data by using server-side encryption in Amazon S3.",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Migrate to S3 Native State Locking in Terraform",
  "desc": "If you've been running Terraform on AWS for any length of time, you know the setup: an S3 bucket for state storage, a DynamoDB table for state locking, and a handful of IAM policies tying them togethe",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-migrate-to-s3-native-state-locking-in-terraform.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
 