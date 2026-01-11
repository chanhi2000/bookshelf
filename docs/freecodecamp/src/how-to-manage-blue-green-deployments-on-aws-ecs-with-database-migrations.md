---
lang: en-US
title: "How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide"
description: "Article(s) > How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Docker
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - docker
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide"
    - property: og:description
      content: "How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-blue-green-deployments-on-aws-ecs-with-database-migrations.html
prev: /devops/aws/articles/README.md
date: 2026-01-16
isOriginal: false
author:
  - name: Destiny Erhabor
    url : https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768497873258/be1ce2a3-c95f-488e-913a-a772007a0d2a.png
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide"
  desc="Blue-green deployments are celebrated for enabling zero-downtime releases and instant rollbacks. You deploy your new version (green) alongside the current one (blue), switch traffic over, and if something goes wrong, you switch back. Simple, right? N..."
  url="https://freecodecamp.org/news/how-to-manage-blue-green-deployments-on-aws-ecs-with-database-migrations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768497873258/be1ce2a3-c95f-488e-913a-a772007a0d2a.png"/>

Blue-green deployments are celebrated for enabling zero-downtime releases and instant rollbacks. You deploy your new version (green) alongside the current one (blue), switch traffic over, and if something goes wrong, you switch back. Simple, right?

Not quite. While blue-green deployments work beautifully for stateless applications, they become significantly more complex when you introduce databases and stateful services into the equation. The moment your blue and green environments need to share a database, you're facing a fundamental challenge: how do you evolve your schema and data without breaking either version?

In this article, we'll tackle the real-world complexities of implementing blue-green deployments on Amazon ECS when your application depends on shared state. You'll learn practical strategies for handling database migrations, managing sessions, and maintaining data consistency across application versions.

::: tip 💡 Complete Working Example

All code examples in this article are available in the [bluegreen-deployment-ecs (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs) [repository on GitHub. (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs) You can clone it and deploy the entire infrastructure to your AWS account.

:::

---

## The Problem with State in Blue-Green Deployments

The elegance of blue-green deployments starts to crumble when you consider databases. Here's why: your blue environment runs application version 1, your green environment runs version 2, but they both connect to the same RDS instance.

![Figure 1: The blue-green dilemma - both environments share the same database but expect different schemas](https://cdn.hashnode.com/res/hashnode/image/upload/v1768056130585/109ceff8-4500-45d7-aaa0-5e259b4a7b11.png)

Consider this scenario: you're adding a new feature that requires a new database column. Version 2 of your application expects this column to exist. You deploy green, run your migration to add the column, and switch traffic.

Everything works great until you need to rollback. Now version 1 is receiving traffic, but it doesn't know what to do with that new column. Worse, if your migration removed or renamed a column that version 1 depends on, your rollback will fail catastrophically.

Here are the specific challenges you'll face:

- **Schema versioning conflicts**: Your blue environment expects schema version N, while green expects version N+1. Any breaking schema change will cause one environment to fail.
- **Data inconsistencies**: If version 2 writes data in a new format that version 1 can't read, switching back to blue will result in errors or data corruption.
- **Irreversible migrations**: Some database changes are inherently destructive. Dropping a column, changing data types, or restructuring tables can't be easily undone.
- **Failed rollbacks**: The promise of instant rollback becomes hollow when your database has evolved beyond what the blue environment can handle.

Let's explore the strategies that solve these problems.

---

## Database Migration Strategies for Blue-Green

### Strategy 1: The Expand-Contract Pattern (Recommended)

The expand-contract pattern is the most practical approach for blue-green deployments with shared databases. It works by breaking schema changes into three phases, ensuring backwards compatibility throughout.

#### Phase 1: Expand

In this phase, you add new schema elements while keeping old ones intact. If you're renaming a column, add the new column without removing the old one. If you're changing table structure, create new tables alongside existing ones.

```sql
-- Example: Renaming 'user_name' to 'username'
-- Phase 1: Expand - Add new column
ALTER TABLE users ADD COLUMN username VARCHAR(255);

-- Populate new column from old column
UPDATE users SET username = user_name WHERE username IS NULL;
```

At this point, your database supports both the old schema (used by blue) and the new schema (used by green). Your application code needs to handle both as well.

#### Phase 2: Deploy

Now, deploy your green environment with code that uses the new schema. But this code should still write to both old and new columns to maintain compatibility.

```py
# Version 2 code - writes to both columns
def update_user(user_id, username):
    db.execute(
        "UPDATE users SET username = %s, user_name = %s WHERE id = %s",
        (username, username, user_id)
    )
```

Traffic shifts from blue to green. Both environments work because the database supports both schemas. If you need to rollback, blue still functions perfectly because the old columns are intact.

#### Phase 3: Contract

After you're confident green is stable and you've decommissioned blue, remove the old schema elements in a separate deployment.

```sql
-- Phase 3: Contract - Remove old column
ALTER TABLE users DROP COLUMN user_name;
```

Update your application code to stop writing to the old columns. This is now version 3, deployed as a standard release.

::: info When to use

This should be your default approach for most schema changes including adding/removing columns, renaming fields, changing constraints, and restructuring tables.

:::

### Strategy 2: Parallel Schemas or Databases

For major breaking changes where backwards compatibility is impractical, you might maintain entirely separate database versions. Version 1 connects to database A, version 2 connects to database B. This approach requires data synchronization between databases. AWS Database Migration Service (DMS) can replicate data in near real-time, or you can build custom replication logic using change data capture.

```py
# Configuration for version-specific database connections
DATABASE_CONFIG = {
    'v1': {
        'host': 'blue-db.cluster-xxxxx.us-east-1.rds.amazonaws.com',
        'database': 'app_v1'
    },
    'v2': {
        'host': 'green-db.cluster-yyyyy.us-east-1.rds.amazonaws.com',
        'database': 'app_v2'
    }
}
```

During the transition period, you run DMS to keep both databases synchronized, with the understanding that writes go to the active version's database.

The challenge is that you're now managing data synchronization, dealing with replication lag, and paying for two databases. Eventually, you need to consolidate back to one database, which requires another migration. This is expensive and complex, which is why it's the "nuclear option."

::: info When to use

Only for major architectural changes, complete data model redesigns, or when migrating between database types (for example, MySQL to PostgreSQL). If expand-contract can possibly work, use that instead.

:::

### Strategy 3: Feature Flags for Gradual Rollout

Feature flags allow you to decouple deployment from release. Both blue and green run the same codebase, but features are toggled on or off via configuration. This shifts the problem from schema compatibility to code-level compatibility.

```py
def create_user(user_data):
    config = get_feature_config()
    if config['use_new_user_schema']:
        return create_user_v2(user_data)
    else:
        return create_user_v1(user_data)
```

Instead of having two separate deployments (blue and green), you have ONE deployment with conditional logic. The "switch" from old to new behavior happens via configuration change, not infrastructure change. This is technically not pure blue-green, but it's a powerful hybrid approach.

#### How it works

Your application checks AWS AppConfig (or similar service) for feature flags before executing code paths. When a flag is off, it uses the old schema/logic. When on, it uses the new schema/logic. You can even enable features for a percentage of users (5% get new behavior, 95% get old behavior) for gradual rollout.

The tradeoff is that your codebase temporarily contains both old and new logic with conditional branches everywhere. This increases complexity and requires disciplined cleanup after the feature is fully released. However, you gain fine-grained control and can toggle features on/off instantly without deploying new infrastructure.

::: info When to use

For large features with uncertain stability, gradual rollouts to monitor impact, or when you want instant rollback capability without touching infrastructure. Also useful when combined with expand-contract for extra safety.

:::

---

## Handling Stateful Services in ECS

Beyond databases, several other stateful components require careful consideration during blue-green deployments.

### Session Management

It’s a good idea to store sessions in ElastiCache or DynamoDB rather than application memory:

```py
app.config['SESSION_TYPE'] = 'dynamodb'
app.config['SESSION_DYNAMODB'] = boto3.client('dynamodb')
```

### Shared Resources

Beyond database sessions, your application likely depends on other stateful components that need coordination during blue-green deployments:

#### 1. S3 buckets

If your application stores files or data in S3, schema changes to object metadata or file formats can cause compatibility issues between versions. To address this, you can enable S3 versioning to maintain multiple format versions simultaneously.

For example, if version 2 writes JSON files with a new structure, version 1 should still be able to read the old format. You can include a version prefix in object keys (like `v1/user-data.json` and `v2/user-data.json`) or embed version metadata in the objects themselves.

#### Message queues (SQS/SNS)

Messages sent by one version must be readable by the other during the transition. You can use versioned message schemas with a `schema_version` field in your message payload. Both blue and green should be able to parse messages from either version, even if they only produce messages in their preferred format. Consider using a schema registry or validation library to ensure compatibility.

#### Cache layers (ElastiCache/Redis)

Cached data structure changes can cause deserialization errors when switching between versions. Try versioning your cache keys by including the schema version: `CACHE_VERSION = 'v2'` and then `cache_key = f"user:{CACHE_VERSION}:{user_id}"`. This ensures blue and green maintain separate cache namespaces, preventing cross-contamination. When you fully migrate to green, you can flush the old cache keys or let them expire naturally.

```py
CACHE_VERSION = 'v2'
cache_key = f"user:{CACHE_VERSION}:{user_id}"
```

---

## Implementation: End-to-End Example

Let's walk through a complete blue-green deployment with ECS, handling a database schema change using the **expand-contract pattern**. We'll migrate from a single `address` text field to structured `street_address`, `city`, `state`, and `zip_code` fields.

![Figure 2: The three phases of expand-contract migration ensuring continuous compatibility](https://cdn.hashnode.com/res/hashnode/image/upload/v1768052075044/fdb732dd-cf3d-473f-a22c-f5ab98870625.png)

**Here’s the scenario:** You're running an e-commerce application on ECS. The current version (blue) stores customer addresses in a single address text field. Version 2 (green) splits this into structured fields: street_address, city, state, and zip_code.

### Architecture Setup

![Figure 3: Complete AWS architecture for blue-green ECS deployment with shared RDS database](https://cdn.hashnode.com/res/hashnode/image/upload/v1768087707691/ff19ce97-b745-4aa8-8b39-4d835fd781cd.png)

Your infrastructure includes:

- ECS cluster running Fargate tasks
- Application Load Balancer with two target groups (blue and green)
- RDS PostgreSQL database (shared between environments)
- CodeDeploy for managing traffic shifts
- Parameter Store for database connection strings

::: note 💡 Implementation Note

The complete Terraform code for this architecture is available in the [companion GitHub repository (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/tree/main/terraform).

:::

### Prerequisites

Before starting, make sure that you have the following tools installed and your AWS credentials properly configured:

```sh
# Required tools
aws --version      # AWS CLI
terraform --version # Terraform >= 1.0
docker --version   # Docker
psql --version     # PostgreSQL client

# Configure AWS credentials
aws configure
aws sts get-caller-identity  # Verify your identity
```

### Step 1: Deploy Infrastructure and Blue Environment

We’ll start by setting up the entire AWS infrastructure from scratch using Terraform, then deploying the initial version of our application (blue environment).

First, clone the repository and set up your environment:

```sh
# Clone the repository
git clone https://github.com/Caesarsage/bluegreen-deployment-ecs.git
cd bluegreen-deployment-ecs

# Create terraform variables
cd terraform
cat > terraform.tfvars <<EOF
aws_region         = "us-east-1"
project_name       = "ecommerce-bluegreen"
environment        = "production"
vpc_cidr           = "10.0.0.0/16"

# Database credentials (CHANGE THESE!)
db_username = "dbadmin"
db_password = "ChangeThisPassword123!"

# Container configuration
container_image = "PLACEHOLDER"  # Will update after building image
container_port  = 8080

# Scaling configuration
desired_count = 2
cpu           = "256"
memory        = "512"

# Notifications
notification_email = "your-email@example.com"
EOF
```

::: note Security Note

Never commit `terraform.tfvars` to Git. It's already in <VPIcon icon="iconfont icon-git"/>`.gitignore`.

:::

Next, initialize Terraform and create the ECR repository:

```sh
# Initialize Terraform
terraform init
terraform validate

# Create ECR repository
terraform apply -target=aws_ecr_repository.app

# Get ECR repository URL
export ECR_REPO=$(terraform output -raw ecr_repository_url)
echo "ECR Repository: $ECR_REPO"
```

We create the ECR repository first because we need somewhere to push our Docker image. Then we'll build the image, push it, and finally deploy the rest of the infrastructure that depends on that image existing.

Build and push the initial application like this:

```sh
cd ..  # Back to project root

# Set variables
export AWS_REGION=us-east-1
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
export ECR_REPOSITORY=ecommerce-bluegreen
export IMAGE_TAG=v1.0.0

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build the image
docker build --platform linux/amd64 -t $ECR_REPOSITORY:$IMAGE_TAG -f docker/Dockerfile .

# Tag and push to ECR
docker tag $ECR_REPOSITORY:$IMAGE_TAG \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG

# Update terraform.tfvars with the image URL
echo "container_image = \"$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG\"" >> terraform/terraform.tfvars
```

![Figure 4: ECR Private repository for Docker image](https://cdn.hashnode.com/res/hashnode/image/upload/v1768137809806/820d7005-b924-4224-9b58-de5701466c1f.png)

The [application code (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/tree/main/app) is a Flask application that handles both old and new schema formats based on the `APP_VERSION` environment variable.

Now deploy the complete infrastructure:

```sh
cd terraform
terraform apply  # Takes ~15-20 minutes

# Get outputs
export ALB_URL=$(terraform output -raw alb_url)
export TEST_URL=$(terraform output -raw test_url)
export DB_ENDPOINT=$(terraform output -raw db_endpoint)
export ECR_URL=$(terraform output -raw ecr_repository_url)
export BASTION_IP=$(terraform output -raw bastion_public_ip)

echo "Application URL: $ALB_URL"
echo "Test URL: $TEST_URL"
echo "Database Endpoint: $DB_ENDPOINT"
```

![Application Load Balancer with two target groups (blue and green)](https://cdn.hashnode.com/res/hashnode/image/upload/v1768141033921/07c2e9b9-c652-4cec-91ae-2de956d8655d.png)

![Figure 5: Application Load Balancer with two target groups (blue and green)](https://cdn.hashnode.com/res/hashnode/image/upload/v1768142296716/9963c779-e0a8-4418-8d69-9bc8fcbbc553.png)

The production listener (port 80) is what your users hit. The test listener (port 8080) lets you test the green environment before shifting production traffic to it. This is crucial for validation.

You can see the complete Terraform configuration in [`terraform` (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/tree/main/terraform).

### Step 2: Initialize Database Schema

Now you’ll need to initialize the database with the schema for version 1 (blue). We'll use Bastion for secure access:

```sh
# Copy the migration files to the bastion host from your local machine

scp -i ~/.ssh/id_rsa docker/init.sql ec2-user@$BASTION_IP:/tmp/
scp -i ~/.ssh/id_rsa migrations/*.sql ec2-user@$BASTION_IP:/tmp/

# Then SSH into it and run migrations
ssh -i ~/.ssh ec2-user@$BASTION_IP

# Inside the bastion:
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -f /tmp/init.sql

# Verify
psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "\d customers"

# Exit the container
exit
```

![Figure 6: Database schema - the customers table with the original columns](https://cdn.hashnode.com/res/hashnode/image/upload/v1768089062401/8f23655e-b50b-4b24-af98-b195e29da9c7.png)

### Step 3: Verify Blue Environment

We’ll want to test that everything works before we start the migration. This is your baseline: you want to confirm that the current system is healthy before introducing changes.

```sh
# Check health
curl $ALB_URL/health | jq

# Expected response:
# {
#   "status": "healthy",
#   "version": "blue",
#   "environment": "production",
#   "database": "connected",
#   "schema": "compatible"
# }

# Create a customer with the old schema (single address field)
curl -X POST $ALB_URL/api/customers \
    -H "Content-Type: application/json" \
    -d '{
      "name": "John Doe",
      "email": "john@example.com",
      "address": "123 Main St, New York, NY, 10001"
    }' | jq

# List customers
curl $ALB_URL/api/customers | jq
```

![Figure 7: Blue Environment Verification](https://cdn.hashnode.com/res/hashnode/image/upload/v1768138569485/b7455a6e-b101-4cdb-83b8-40e0dbafb0b0.png)

### Step 4: Expand Phase – Add New Columns

This is the first phase of expand-contract. We're adding the new columns WITHOUT removing the old one, creating a database schema that supports both blue and green simultaneously.

Run the expand migration ([`migrations/001_expand_address.sql` (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/blob/main/migrations/001_expand_address.sql)[) (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/blob/main/migrations/001_expand_address.sql):

```sql
-- Migration: 001_expand_address_fields.sql
BEGIN;

ALTER TABLE customers 
  ADD COLUMN street_address VARCHAR(255),
  ADD COLUMN city VARCHAR(100),
  ADD COLUMN state VARCHAR(2),
  ADD COLUMN zip_code VARCHAR(10);

-- Populate new columns from existing data
-- This uses a simple parsing strategy; yours might be more sophisticated

UPDATE customers 
SET 
  street_address = SPLIT_PART(address, ',', 1),
  city = TRIM(SPLIT_PART(address, ',', 2)),
  state = TRIM(SPLIT_PART(address, ',', 3)),
  zip_code = TRIM(SPLIT_PART(address, ',', 4))
WHERE address IS NOT NULL;

COMMIT;
```

::: critical Critical observation

We're NOT dropping the `address` column. It's still there. Blue continues reading and writing to it, completely unaware that new columns exist. This is what makes the migration safe – nothing breaks.

:::

```sh
# Then SSH into it and run migrations
ssh -i ~/.ssh ec2-user@$BASTION_IP

# Inside the bastion:
export DB_ENDPOINT = "" # from terraform output

psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -f /tmp/001_expand_address.sql

# Verify new columns exist
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -c "\d customers"

exit
```

![Figure 8: Database schema evolution - the customers table during expand phase with both old and new columns](https://cdn.hashnode.com/res/hashnode/image/upload/v1768089194050/e053dee3-382b-4ccd-a0e0-8c17003e9832.png)

::: info Verification

The `\d customers` command shows the table structure. You should see BOTH the old `address` column AND the new `street_address`, `city`, `state`, `zip_code` columns. This confirms the expand phase worked.

:::

The database now supports both old (blue) and new (green) schemas. Blue is still running and working perfectly, and nothing has changed from its perspective.

### Step 5: Build and Deploy Green Environment

Now we’ll build version 2 of our application that knows how to work with the new structured address fields, while maintaining backwards compatibility with the old schema.

Start by building version 2 with structured address support:

```sh
cd ..  # Back to project root

# Build new version
export IMAGE_TAG=v2.0.0

docker build --platform linux/amd64 -t $ECR_REPOSITORY:$IMAGE_TAG -f docker/Dockerfile .

docker tag $ECR_REPOSITORY:$IMAGE_TAG \
    $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG

docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
```

What’s different is that the v2 [application code (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/blob/main/app/models.py) now has logic that:

- **Reads** from the new structured columns (`street_address`, `city`, and so on)
- **Writes** to BOTH new columns AND the old `address` column
- Accepts API requests with structured address format

::: important Why write to both

This is crucial. Even though green prefers the new format, it maintains the old format, too. If you need to rollback to blue, all the data blue needs is there and up-to-date. Without this, rollback would be impossible: blue would see empty or stale `address` fields.

:::

Now create and register green task definition:

```sh :collapsed-lines
cd terraform

# Get necessary ARNs
EXECUTION_ROLE_ARN=$(terraform output -raw ecs_task_execution_role_arn)
TASK_ROLE_ARN=$(terraform output -raw ecs_task_role_arn)
DB_SECRET_ARN=$(terraform output -raw db_secret_arn)

# Create task definition
cat > task-def-green.json <<EOF
{
  "family": "ecommerce-bluegreen",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "taskRoleArn": "${TASK_ROLE_ARN}",
  "containerDefinitions": [{
    "name": "app",
    "image": "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}",
    "essential": true,
    "portMappings": [{
      "containerPort": 8080,
      "protocol": "tcp"
    }],
    "environment": [
      {"name": "APP_VERSION", "value": "green"},
      {"name": "ENVIRONMENT", "value": "production"},
      {"name": "AWS_REGION", "value": "${AWS_REGION}"},
      {"name": "DB_HOST", "value": "${DB_ENDPOINT}"},
      {"name": "DB_PORT", "value": "5432"},
      {"name": "DB_NAME", "value": "ecommerce"}
    ],
    "secrets": [
      {
        "name": "DB_USER",
        "valueFrom": "${DB_SECRET_ARN}:username::"
      },
      {
        "name": "DB_PASSWORD",
        "valueFrom": "${DB_SECRET_ARN}:password::"
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/ecommerce-bluegreen",
        "awslogs-region": "${AWS_REGION}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "healthCheck": {
      "command": ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"],
      "interval": 30,
      "timeout": 5,
      "retries": 3,
      "startPeriod": 60
    }
  }]
}
EOF

# Register the task definition
aws ecs register-task-definition --cli-input-json file://task-def-green.json
```

This JSON tells ECS everything about how to run your container:

- Which Docker image to use (the v2.0.0 we just built)
- How much CPU/memory to allocate (256 CPU units = 0.25 vCPU)
- Environment variables (notice `APP_VERSION` is set to "green")
- Secrets (database credentials pulled from AWS Secrets Manager)
- Health check configuration (curl the /health endpoint every 30 seconds)
- Logging configuration (send logs to CloudWatch)

::: important Key detail

The `APP_VERSION` environment variable is how the application knows whether to behave as blue or green. Same codebase, different behavior based on configuration.

:::

### Step 6: Execute Blue-Green Deployment

Alright, now it’s time to create AppSpec and trigger the deployment:

```sh :collapsed-lines
TASK_DEF_ARN=$(aws ecs describe-task-definition \
  --task-definition ecommerce-bluegreen \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

cat > appspec.json <<EOF
{
  "version": 0.0,
  "Resources": [{
    "TargetService": {
      "Type": "AWS::ECS::Service",
      "Properties": {
        "TaskDefinition": "${TASK_DEF_ARN}",
        "LoadBalancerInfo": {
          "ContainerName": "app",
          "ContainerPort": 8080
        }
      }
    }
  }]
}
EOF

# Deploy
APPSPEC=$(cat appspec.json | jq -c .)
aws deploy create-deployment \
  --application-name ecommerce-bluegreen \
  --deployment-group-name ecommerce-bluegreen-deployment-group \
  --deployment-config-name CodeDeployDefault.ECSLinear10PercentEvery3Minutes \
  --description "Blue-green deployment to structured address schema" \
  --cli-input-json "{
    \"revision\": {
      \"revisionType\": \"AppSpecContent\",
      \"appSpecContent\": {
        \"content\": $(echo \"$APPSPEC\" | jq -Rs .)
      }
    }
  }"

DEPLOYMENT_ID=$(aws deploy list-deployments \
    --application-name ecommerce-bluegreen \
    --deployment-group-name ecommerce-bluegreen-deployment-group \
    --query 'deployments[0]' --output text)
```

Monitor the deployment:

```sh
# Watch status
watch -n 10 "aws deploy get-deployment --deployment-id $DEPLOYMENT_ID \
    --query 'deploymentInfo.status' --output text"

# Monitor traffic distribution
while true; do
    echo "Production: $(curl -s $ALB_URL/health | jq -r '.version')"
    echo "Test: $(curl -s $TEST_URL/health | jq -r '.version')"
    sleep 30
done
```

The deployment shifts 10% of traffic every 3 minutes, completing in 30 minutes.

### Step 7: Validate Green Environment

After the deployment begins, you need to validate that the green environment is functioning correctly with the new structured address format before allowing production traffic to reach it.

The CodeBuild dashboard below shows the Traffic migration and Deployment status:

![Monitoring in CodeDeploy](https://cdn.hashnode.com/res/hashnode/image/upload/v1768093087711/fc1b869c-7fae-421e-8d98-45769300cb0a.png)

We can also test through the test listener (port 8080), which provides isolated access to green tasks:

```sh
# Test new structured address API
curl -X POST $TEST_URL/api/customers \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Jane Smith",
      "email": "jane@example.com",
      "address": {
        "street": "456 Oak Ave",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90001"
      }
    }' | jq

curl $ALB_URL/api/customers | jq
```

![Validate Green environment response](https://cdn.hashnode.com/res/hashnode/image/upload/v1768140730325/57c6a047-994f-4b5e-8e19-4d6fb25ad44e.png)

What you're validating:

- The green environment accepts the new structured address format
- Data is correctly written to both new columns (street_address, city, state, zip_code) and the old address column for backwards compatibility
- The API response matches expectations for the new schema
- Existing data from blue environment is still accessible and readable

If any of these tests fail, you can stop the deployment before production traffic reaches green, preventing customer impact.

### Step 8: Post-Deployment Validation

Once CodeDeploy completes the traffic shift, all production requests route to green. This is your opportunity to verify that the deployment was successful and that the new version is handling real production traffic correctly.

```sh
# Verify all production traffic goes to green
# Running this multiple times confirms consistent routing
for i in {1..10}; do
    curl -s $ALB_URL/health | jq -r '.version'
done
# Expected output: "green" for all 10 requests

# Test complete CRUD operations with the new API
# Create a customer with structured address
CUSTOMER_ID=$(curl -s -X POST $ALB_URL/api/customers \
    -H "Content-Type: application/json" \
    -d '{"name": "Test User", "email": "test@example.com",
         "address": {"street": "789 Test St", "city": "Test City", 
         "state": "TX", "zip": "75001"}}' | jq -r '.id')

# Read the customer back to verify data persistence
curl $ALB_URL/api/customers/$CUSTOMER_ID | jq

# Update the customer to test modification
curl -X PUT $ALB_URL/api/customers/$CUSTOMER_ID \
    -H "Content-Type: application/json" \
    -d '{"address": {"street": "999 Updated Ave", "city": "Test City", 
         "state": "TX", "zip": "75001"}}' | jq

# Delete the test customer for cleanup
curl -X DELETE $ALB_URL/api/customers/$CUSTOMER_ID
```

![Verify all production traffic goes to green](https://cdn.hashnode.com/res/hashnode/image/upload/v1768140850962/a31273e9-cbc1-4d09-9f6d-7248b402f712.png)

What you're validating:

- Traffic routing is 100% to green with no requests reaching blue
- Create operations work with the new structured address format
- Read operations return correct data with proper address structure
- Update operations successfully modify existing records
- Delete operations work without errors
- The application correctly writes to both new columns and old address column (enabling potential rollback)

Check your CloudWatch logs and metrics during this validation period for any unexpected errors, increased latency, or database connection issues.

### Step 9: Contract Phase (After 24-72 Hours)

This is the final phase of expand-contract. We're removing the old `address` column now that we're confident green is stable. This is the point of no return.

::: critical 

Only proceed after green has been stable for your confidence period!

:::

```sh
# Backup database first
aws rds create-db-snapshot \
    --db-instance-identifier ecommerce-bluegreen-db \
    --db-snapshot-identifier pre-contract-$(date +%Y%m%d-%H%M%S)

# Wait for snapshot
aws rds wait db-snapshot-completed \
    --db-snapshot-identifier pre-contract-$(date +%Y%m%d-%H%M%S)

# Run contract migration
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -f /tmp/002_contract_address.sql

# Verify old column is gone
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -c "\d customers"
```

The contract migration ([`migrations/002_contract_address.sql` (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/blob/main/migrations/002_contract_address.sql)) removes the old `address` column.

![d6f6f287-09e5-4693-a4e9-77c1d9080466](https://cdn.hashnode.com/res/hashnode/image/upload/v1768140955991/d6f6f287-09e5-4693-a4e9-77c1d9080466.png)

::: important Why wait 24-72 hours

You want to be absolutely certain green is stable before making irreversible changes. During this waiting period:

- All your monitoring should show green performing normally
- You've seen the system handle multiple daily traffic patterns (morning peak, evening peak, overnight)
- Weekly batch jobs have run successfully
- You've verified third-party integrations work
- No unusual errors or performance degradation

It’s important to snapshot first because once you drop that column, there's no undo button. The snapshot is your safety net. If you discover a critical issue after contracting, you can restore this snapshot and get back to a state where rollback is possible. Without it, you're gambling.

:::

**What the contract migration does:**

```sql
-- migrations/002_contract_address.sql
BEGIN;
ALTER TABLE customers DROP COLUMN address;
COMMIT;
```

It's simple but permanent. The old `address` column is gone. The Blue environment will no longer work with this database, as it expects that column to exist. This is fine because blue has been decommissioned (no traffic, tasks terminated).

::: note What to update

You should also deploy version 3 of your application that removes the dual-write logic. Version 2 (green) is still writing to both the new columns and the old `address` column. Version 3 can stop wasting cycles writing to a column that no longer exists.

:::

The contract migration ([`migrations/002_contract_address.sql` (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs/blob/main/migrations/002_contract_address.sql)) removes the old `address` column. Your migration is now complete!

---

## Rollback Strategies

### During Deployment (Safe Window)

Use this strategy when you detect issues **during the traffic shift**, before all traffic has moved to green. CodeDeploy is still managing the deployment, which means it can automatically revert traffic distribution to the previous state.

```sh
# Immediate rollback
aws deploy stop-deployment \
--deployment-id $DEPLOYMENT_ID \
--auto-rollback-enabled
```

You should use this strategy when you notice increased error rates, degraded performance, or functional issues during the canary or linear traffic shift. CodeDeploy automatically shifts all traffic back to blue, and green tasks are terminated. This is the safest and fastest rollback option.

This works because the database still contains the old `address` column (expand phase), so blue can function normally. No data has been lost or made incompatible.

### After Deployment (Before Contract)

Use this when the deployment completed successfully, but you discover issues hours or days later during the monitoring period, before you've run the contract migration. Both blue and green environments still exist, and the database supports both schemas.

```sh
# Manual listener update
aws elbv2 modify-listener \
--listener-arn $(terraform output -raw alb_listener_arn) \
--default-actions Type=forward,TargetGroupArn=$(terraform output -raw blue_target_group_arn)
```

Or use the provided script:

```sh
cd scripts
./rollback.sh
```

Use this when you discover bugs in green that weren't caught during initial testing, business metrics show unexpected changes (conversion rates drop, customer complaints increase), or third-party integration issues emerge.

This works because the database still has both old and new schema elements. Blue tasks still exist and can serve traffic immediately. Because green was writing to both old and new columns, blue sees all the latest data.

With this, the traffic immediately shifts from green back to blue. Green continues running for observability, but serves no traffic. You can debug green in place without customer impact.

### After Contract Phase

Use this as a **last resort** when you've already removed the old address column, and blue can no longer function with the current database schema. This is significantly more complex and time-consuming than the previous two strategies.

```sh
# Restore from snapshot
aws rds restore-db-instance-from-db-snapshot \
--db-instance-identifier ecommerce-bluegreen-db-restored \
--db-snapshot-identifier pre-contract-YYYYMMDD-HHMMSS
```

Only use this strategy when you discover a critical, production-breaking issue after the contract phase, and you have no other option but to return to the previous version.

::: important Why it's painful

- Database restore takes 10-30 minutes depending on size
- You lose all data written after the snapshot was taken
- Requires updating connection strings to point to the restored instance
- Need to re-deploy blue environment
- Must communicate downtime to users

:::

This is why you wait 24-72 hours before contracting, and take a snapshot immediately before the contract migration. The lengthy waiting period allows you to catch most issues while the safer rollback strategies are still available.

---

## Monitoring During Deployments

### Essential Metrics

During a blue-green deployment, you need to monitor both environments simultaneously to detect issues early and make informed decisions about proceeding or rolling back.For each target group (blue and green), track these CloudWatch metrics:

#### 1. TargetResponseTime

Measures latency from when the load balancer sends a request to when it receives a response. You're looking for sudden spikes or gradual degradation. Green should have similar response times to blue (within 10-20%). If green's latency is significantly higher, you may have performance regressions, inefficient queries with the new schema, or resource constraints.

#### 2. RequestCount

Shows traffic volume hitting each target group. During the deployment, you should see blue's count decreasing while green's increases proportionally. If the numbers don't add up (total requests drop significantly), users might be experiencing errors and not retrying. If green receives traffic but shows zero requests, health checks might be failing.

#### 3. HTTPCode_Target_5XX_Count

Server errors indicate application problems. Even a single 5XX error during deployment warrants investigation. Green should have zero 5XX errors during the initial traffic shift. Any errors could indicate incompatibility issues with the new schema, missing environment variables, or database connection problems.

#### 4. DatabaseConnections (from RDS metrics):

Shows active database connections from both environments. Watch for connection pool exhaustion, which manifests as a sudden spike or plateau at your max connections limit. If green uses more connections than blue did, you might have connection leaks or inefficient connection handling in the new code.

#### 5. CPUUtilization

Monitor both ECS task CPU and RDS CPU. Green tasks should use similar CPU to blue tasks for the same request volume. Higher CPU might indicate less efficient code or more complex queries. RDS CPU spikes during deployment often indicate poorly optimized new queries or missing indexes for the new schema.

::: info What to expect

- First 5-10 minutes: Green receives 10% traffic, metrics should closely match blue's baseline
- 15-20 minutes: Green at 30-50% traffic, both environments should show stable metrics
- 25-30 minutes: Green at 100% traffic, metrics should stabilize at historical levels
- Any divergence from these patterns warrants stopping the deployment and investigating

:::

::: note Custom application metrics

Beyond infrastructure metrics, monitor business-critical metrics like checkout completion rates, API success rates, and user sign-up flows. Sometimes technical metrics look fine but user-facing functionality is broken.

:::

---

## Best Practices

### Test Migrations in Staging

Always run your database migrations against a staging environment that mirrors production scale and complexity before touching production. Copy a recent production snapshot to staging and execute your expand migration there first.

**Why this matters**: Migrations that work fine on small datasets can timeout or lock tables on production-scale data. You might discover that adding an index to a 50-million-row table takes 2 hours, or that your column population query needs optimization.

::: info What to test

- Migration execution time (should complete in seconds/minutes, not hours)
- Table locks and their impact (can reads/writes continue during migration?)
- Query performance with new schema (are your indexes still effective?)
- Rollback procedures (can you undo the migration if needed?)

:::

### Use Migration Tools

Don't write raw SQL migrations manually. Use Flyway, Liquibase, Alembic (for Python), or your framework's built-in migration tools (Rails migrations, Django migrations, Entity Framework migrations).

**Why this matters**: Migration tools provide version tracking, rollback capabilities, checksums to prevent tampering, and a standardized way to manage schema changes across environments.

### Configure Health Checks Properly

Your health check endpoint should verify that the application can actually function, not just that the process is running. A comprehensive health check validates database connectivity, schema compatibility, and dependent service availability.

```py
@app.route('/health')
def health_check():
    checks = {
        'database': check_database(),
        'schema': check_schema_compatibility(),
        'cache': check_cache_connection()
    }

    if all(checks.values()):
        return jsonify(checks), 200
    else:
        return jsonify(checks), 503

def check_schema_compatibility():
    """Verify expected schema elements exist"""
    try:
        result = db.query("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'customers'
            AND column_name IN ('street_address', 'city', 'state', 'zip_code')
        """)
        return len(result) == 4
    except:
        return False
```

For ALB health checks specifically, make sure you configure appropriate thresholds in your target group settings. A healthy threshold of 2 means the target must pass 2 consecutive health checks before receiving traffic. An unhealthy threshold of 3 means it must fail 3 consecutive checks before being removed. Set your interval to 30 seconds and timeout to 5 seconds to balance responsiveness with stability.

```sh
# Terraform configuration for ALB health checks
resource "aws_lb_target_group" "green" {
  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
  }
}
```

This configuration ensures that ECS tasks aren't marked healthy prematurely (preventing traffic to broken tasks) while also not being overly sensitive to transient issues (preventing unnecessary task replacements).

### Plan the Contract Phase

The contract phase is irreversible, so treat it with appropriate caution. Wait a minimum of 24-72 hours after green deployment before removing old schema elements. This waiting period isn't arbitrary: it ensures you've observed the system under various conditions.

::: info What to verify before contracting

- Green has handled multiple daily traffic patterns (morning rush, evening peak, overnight batch jobs)
- All scheduled jobs and cron tasks have run successfully with the new schema
- Weekly reports or analytics pipelines have completed
- Third-party integrations (payment processors, shipping APIs, analytics tools) are working
- No unusual error patterns in logs
- Business metrics (conversions, sign-ups, purchases) remain stable
- Customer support hasn't reported related issues

:::

The pre-contract checklist:

```sh
# 1. Create a final snapshot
aws rds create-db-snapshot \
    --db-instance-identifier ecommerce-bluegreen-db \
    --db-snapshot-identifier pre-contract-$(date +%Y%m%d-%H%M%S)

# 2. Document current state
echo "Green tasks: $(aws ecs describe-services --cluster ecommerce --services ecommerce-green | jq '.services[0].runningCount')"
echo "Error rate: $(aws cloudwatch get-metric-statistics --namespace AWS/ApplicationELB --metric-name HTTPCode_Target_5XX_Count --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) --end-time $(date -u +%Y-%m-%dT%H:%M:%S) --period 3600 --statistics Sum)"

# 3. Notify team
echo "Running contract migration at $(date)"

# 4. Run migration
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -f migrations/002_contract_address.sql

# 5. Verify
psql -h $DB_ENDPOINT -U dbadmin -d ecommerce -c "\d customers"
```

### Version Your APIs

When changing data formats, maintain backward compatibility by supporting both old and new API versions simultaneously. This allows API consumers (mobile apps, third-party integrations, other services) to migrate at their own pace without coordinating releases.

```py
# Support both API versions during transition
@app.route('/api/v1/customers/<id>')
def get_customer_v1(id):
    customer = Customer.find(id)
    return jsonify({
        'id': customer.id,
        'name': customer.name,
        'address': customer.address  # Old format
    })

@app.route('/api/v2/customers/<id>')
def get_customer_v2(id):
    customer = Customer.find(id)
    return jsonify({
        'id': customer.id,
        'name': customer.name,
        'address': {  # New structured format
            'street': customer.street_address,
            'city': customer.city,
            'state': customer.state,
            'zip': customer.zip_code
        }
    })
```

To implement this, you can initially deploy both endpoints with blue-green. Then monitor usage of v1 endpoint over time. Once v1 traffic drops below 1% (meaning clients have migrated), deprecate it formally. Remove v1 endpoint in a subsequent release, not during the blue-green deployment itself.

Announce the new API version to consumers with a migration timeline. Give them 2-3 months to update their integrations. Send reminder emails at the halfway point and 2 weeks before v1 shutdown.

### Monitor Both Environments

During the transition period, both blue and green are production environments serving real traffic. Monitor them separately to detect version-specific issues.

Set up separate CloudWatch dashboards for blue and green target groups with the same metrics arranged identically. This makes it easy to spot differences at a glance. If green's response time is 200ms while blue's is 50ms, that's a red flag.

#### Alert on metric divergence

Create alarms that trigger when green's metrics deviate significantly from blue's baseline. For example, if green's error rate is more than 2x blue's historical average, trigger an alert. If green's database query time is 50% higher, investigate before shifting more traffic.

#### Log aggregation

Ensure logs from both environments are tagged with their version (`environment: blue` or `environment: green`) so you can filter and compare them. Use CloudWatch Insights queries to spot patterns.

---

## When NOT to Use Blue-Green

Blue-green isn't always the right choice. Avoid it when you have:

- **Very large database migrations**: If your migration takes hours or requires significant locks, use a traditional maintenance window.
- **Highly stateful applications**: Real-time collaboration tools or WebSocket applications with complex in-memory state may need rolling deployments instead.
- **Cost constraints**: Running two environments doubles costs. Consider canary deployments for cost-sensitive applications.
- **Complex data model redesigns**: Use the strangler fig pattern to gradually migrate functionality to a new service.

### Alternative Deployment Strategies

#### Canary Deployments

Route a small percentage (5-10%) to the new version:

```json
{
  "trafficRouting": {
    "type": "TimeBasedCanary",
    "timeBasedCanary": {
      "canaryPercentage": 10,
      "canaryInterval": 5
    }
  }
}
```

### Rolling Deployments

Gradually replace old tasks with new ones:

```json
{
  "deploymentConfiguration": {
    "maximumPercent": 200,
    "minimumHealthyPercent": 100
  }
}
```

---

## Cleanup

After you've successfully completed your blue-green deployment, validated the green environment, and run the contract phase, you need to clean up the AWS resources to avoid unnecessary costs and resource sprawl.

::: info What you're removing

- The entire infrastructure stack (VPC, subnets, NAT gateways, load balancer, ECS cluster, RDS database, and all associated resources)
- This is appropriate for a tutorial/testing scenario where you deployed everything from scratch

:::

::: important Important considerations before cleanup:

- Ensure you have backups if you need to reference any data later
- Export any logs or metrics you want to retain
- Document lessons learned from the deployment
- Verify no production traffic is still using these resources

```sh
cd terraform

# Terraform will prompt you to confirm with "yes"
# Review the destruction plan carefully before confirming
terraform destroy  # Takes ~10-15 minutes
```

:::

::: tip Partial cleanup

If you want to keep certain resources (like RDS snapshots for reference), you can remove them from Terraform state before destroying:

```sh
# Remove RDS from Terraform management before destroying
terraform state rm aws_db_instance.main
terraform destroy  # Now destroys everything except RDS
```

For production environments, you would NOT destroy everything. Instead, you'd decommission the blue environment specifically after confirming green is stable:

```sh
# Production scenario - remove only blue environment
terraform destroy -target=aws_ecs_service.blue
terraform destroy -target=aws_lb_target_group.blue
```

:::

---

## Conclusion

Blue-green deployments with databases require careful planning, but the expand-contract pattern makes it manageable.

Here are some key takeaways:

1. **Use expand-contract as default** – Maintains backwards compatibility and safe rollbacks.
2. **Externalize state** – Sessions, caches, and storage should use external services.
3. **Plan for three phases** – Don't rush to the contract phase.
4. **Test everything in staging** – Mirror production scale and complexity.
5. **Monitor aggressively** – Track technical and business metrics for both environments.
6. **Know when to use alternatives** – Blue-green isn't always the answer.
7. **Document rollback procedures** – Everyone should know the rollback process before deployment.

The expand-contract pattern requires more work upfront, but this investment pays dividends in reduced risk and maintained uptime. With the strategies and complete implementation provided here, you can successfully deploy even complex, stateful applications with confidence.

As always, I hope you enjoyed this guide and learned something. If you want to stay connected or see more hands-on DevOps content, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`destiny-erhabor`)](https://linkedin.com/in/destiny-erhabor).

::: info

For more practical hands-on Cloud/DevOps projects like this one, follow and star this repository:

<SiteInfo
  name="Caesarsage/Learn-DevOps-by-building"
  desc="DevOps Projects is a curated collection of hands-on projects designed to help engineers learn and grow through real-world DevOps challenges. Inspired by platforms like CloudAcademy, Darey.io, and m..."
  url="https://github.com/Caesarsage/Learn-DevOps-by-building/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/30a316e020e3b6a8b95c23eb216ec176ec74804b203e38cfba91c83007cc9138/Caesarsage/Learn-DevOps-by-building"/>

:::

::: info Further Resources

- Complete Code: [github.com/Caesarsage/bluegreen-deployment-ecs (<VPIcon icon="iconfont icon-github" />`Caesarsage/bluegreen-deployment-ecs`)](https://github.com/Caesarsage/bluegreen-deployment-ecs)
- Learn DevOps by Building: [GitHub repo (<VPIcon icon="iconfont icon-github" />`Caesarsage/Learn-DevOps-by-building`)](https://github.com/Caesarsage/Learn-DevOps-by-building)
- AWS ECS Blue/Green Documentation: [AWS Docs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html)
- AWS CodeDeploy for ECS: [AWS Docs](https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-steps-ecs.html)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manage Blue-Green Deployments on AWS ECS with Database Migrations: Complete Implementation Guide",
  "desc": "Blue-green deployments are celebrated for enabling zero-downtime releases and instant rollbacks. You deploy your new version (green) alongside the current one (blue), switch traffic over, and if something goes wrong, you switch back. Simple, right? N...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-blue-green-deployments-on-aws-ecs-with-database-migrations.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
