---
lang: en-US
title: "The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit"
description: "Article(s) > The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit"
icon: fa-brands fa-aws
category:
  - Python
  - DevOps
  - Amazon
  - AWS
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit"
    - property: og:description
      content: "The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-aws-finops-guide-for-series-a-startups.html
prev: /devops/aws/articles/README.md
date: 2026-06-03
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4bbaeaf-810e-4ebb-9c81-d2183cac6df6.png
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

[[toc]]

---

<SiteInfo
  name="The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit"
  desc="You raised your Series A. Engineering hired fast. Features shipped faster. And somewhere between month six and month twelve, someone forwarded you an AWS Cost Explorer screenshot with a line that only"
  url="https://freecodecamp.org/news/the-aws-finops-guide-for-series-a-startups"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4bbaeaf-810e-4ebb-9c81-d2183cac6df6.png"/>

You raised your Series A. Engineering hired fast. Features shipped faster. And somewhere between month six and month twelve, someone forwarded you an AWS Cost Explorer screenshot with a line that only goes up.

That line isn't random. It follows a pattern. The same eight patterns, at the same growth stage, at almost every company I've audited.

This guide names all eight, shows you exactly where to look, and gives you the fix for each one. By the time you finish reading, you'll know which leaks are draining your runway — and what to do about them this week.

---

## Who This Guide Is For

This guide is written for engineers, CTOs, and technical co-founders at Series A companies — typically 15 to 80 engineers, AWS bills between \\(20,000 and \\)150,000 per month, and a finance team that has recently started paying attention to the infrastructure line.

You don't need a dedicated FinOps team. You need one engineer, one afternoon per week, and the eight patterns in this guide.

**What you should have before starting:**

- AWS account access with Cost Explorer enabled
- AWS CLI v2 configured (`aws configure`)
- Basic familiarity with EC2, RDS, EBS, and S3
- A Cost Explorer bookmark — you will use it constantly

**Estimated time to complete all fixes:** 8–20 engineering hours spread across two sprints. The reading takes around 20 minutes. The highest-ROI fix (Pattern 3) takes about 30 minutes.

---

## Before You Start: Establish Your Baseline

Don't skip this step. Optimization without a baseline is just guessing. Run this command before touching anything:

```sh
# Pull last month's AWS cost breakdown by service
# This becomes your before number — save it somewhere
aws ce get-cost-and-usage \
--time-period Start=\((date -d 'last month' +%Y-%m-01),End=\)(date +%Y-%m-01) \
--granularity MONTHLY \
--group-by Type=DIMENSION,Key=SERVICE \
--metrics UnblendedCost \
--query 'ResultsByTime[0].Groups[*].{Service:Keys[0],Cost:Metrics.UnblendedCost.Amount}' \
--output table | sort -k3 -rn
```

Then screenshot the output. Name the file <VPIcon icon="fas fa-file-image"/>`aws-baseline-YYYY-MM.png`. You'll compare against this after each fix to verify actual savings.

The typical breakdown at Series A looks like this:

| AWS Service | % of Bill | Waste Potential |
| --- | --- | --- |
| EC2 (compute) | 45–55% | High |
| Data Transfer | 15–20% | Very High |
| RDS | 10–15% | Medium |
| EBS | 8–12% | Medium |
| CloudWatch | 3–6% | Medium |
| Load Balancers | 3–5% | Low |

Now let's go through each pattern.

---

## Pattern 1: The New Hire Experiment Tax

Every engineering hire needs a development environment. This is expected. What's not expected is what happens after the feature ships: nothing.

The environment keeps running. At \\(0.192/hour for an m5.xlarge, a forgotten dev environment costs \\)138/month. Ten engineers who each forgot one environment is $1,380/month — for infrastructure that's doing precisely nothing.

This pattern accelerates after a Series A because hiring moves fast. A new engineer joins on Monday, spins up an EC2, an RDS, and a namespace in the dev cluster, ships the feature by Friday, and moves to the next ticket. The environment isn't on anyone's radar. There's no off-boarding process for dev resources.

**What the waste looks like:**

```text
Dev environment for Alice (feature/payment-flow):
  EC2 m5.xlarge — last CPU activity: 23 days ago
  RDS db.t3.medium — last connection: 19 days ago
  EKS namespace — last pod scheduled: 15 days ago
  Monthly cost: $187
  Status: running
```

**Finding it:**

```sh
# Find EC2 instances with average CPU below 5% for the last 14 days
# These are idle instances — candidates for shutdown or termination
aws cloudwatch get-metric-statistics \
--namespace AWS/EC2 \
--metric-name CPUUtilization \
--period 1209600 \
--statistics Average \
--start-time $(date -d '14 days ago' --iso-8601=seconds) \
--end-time $(date --iso-8601=seconds) \
--dimensions Name=InstanceId,Value=YOUR_INSTANCE_ID \
--query 'Datapoints[*].{Average:Average}' \
--output table
```

### The Fix — an Automatic Idle Instance Stopper:

The Lambda below runs every night at 22:00. It checks every EC2 instance tagged `Environment=dev` for CPU utilisation over the past seven days. Any instance averaging below 5% gets stopped automatically. An SNS notification goes to the engineer's email before the stop happens, giving them a chance to override it by adding a `KeepAlive=true` tag.

```py :collapsed-lines title="idle_environment_stopper.py"
# Deploy as a Lambda function triggered by EventBridge on schedule: cron(0 22 * * ? *)
# This stops idle dev environments before they run through the night and weekend

import boto3
from datetime import datetime, timedelta, timezone

ec2 = boto3.client('ec2')
cloudwatch = boto3.client('cloudwatch')
sns = boto3.client('sns')

IDLE_CPU_THRESHOLD = 5.0      # Stop instances below this average CPU %
IDLE_DAYS = 7                  # Look back 7 days of CloudWatch data
SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:YOUR_ACCOUNT:dev-environment-alerts'

def get_average_cpu(instance_id):
    """Return the 7-day average CPU utilisation for an EC2 instance."""
    response = cloudwatch.get_metric_statistics(
        Namespace='AWS/EC2',
        MetricName='CPUUtilization',
        Dimensions=[{'Name': 'InstanceId', 'Value': instance_id}],
        StartTime=datetime.now(timezone.utc) - timedelta(days=IDLE_DAYS),
        EndTime=datetime.now(timezone.utc),
        Period=604800,  # One 7-day period
        Statistics=['Average']
    )
    datapoints = response.get('Datapoints', [])
    return datapoints[0]['Average'] if datapoints else 0.0

def lambda_handler(event, context):
    """Stop idle dev instances and notify their owners."""
    
    # Find all running dev instances
    response = ec2.describe_instances(
        Filters=[
            {'Name': 'instance-state-name', 'Values': ['running']},
            {'Name': 'tag:Environment', 'Values': ['dev', 'development']},
        ]
    )

    stopped = []
    skipped = []

    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            tags = {t['Key']: t['Value'] for t in instance.get('Tags', [])}

            # Skip instances explicitly marked to keep alive
            if tags.get('KeepAlive', '').lower() == 'true':
                skipped.append(instance_id)
                continue

            avg_cpu = get_average_cpu(instance_id)

            if avg_cpu < IDLE_CPU_THRESHOLD:
                # Notify the owner before stopping
                owner = tags.get('Owner', 'unknown')
                sns.publish(
                    TopicArn=SNS_TOPIC_ARN,
                    Subject=f'Dev environment stopped: {instance_id}',
                    Message=(
                        f'Instance {instance_id} (Owner: {owner}) had {avg_cpu:.1f}% average CPU '
                        f'over {IDLE_DAYS} days and has been stopped.\n\n'
                        f'To prevent this, add the tag: KeepAlive=true\n'
                        f'To restart: aws ec2 start-instances --instance-ids {instance_id}'
                    )
                )
                ec2.stop_instances(InstanceIds=[instance_id])
                stopped.append({'id': instance_id, 'owner': owner, 'avg_cpu': avg_cpu})

    print(f"Stopped {len(stopped)} idle instances. Skipped {len(skipped)} keep-alive instances.")
    return {'stopped': stopped, 'skipped': skipped}
```

::: note Monthly savings

\\(1,000–\\)2,000 depending on team size and how long the pattern has been running.

:::

---

## Pattern 2: Staging Environment Proliferation

Staging starts as one environment. Then the frontend team needs their own because the backend team keeps breaking theirs. Then the ML team needs isolated compute. Then QA needs a stable environment for integration tests.

Before anyone noticed, you have four staging environments running 24/7 — each one idle for 16 hours of every day.

The waste isn't in the existence of the environments. It's in the schedule. Staging environments don't need to run at 3am.

**What the waste looks like:**

```text
staging-frontend:   $250/month   Used: Mon-Fri 09:00-18:00
staging-backend:    $250/month   Used: Mon-Fri 09:00-18:00
staging-ml:         $250/month   Used: Mon-Fri 10:00-17:00
staging-qa:         $250/month   Used: Mon-Fri 09:00-17:00
Total:            $1,000/month   Running: 24 hours/day, 7 days/week
Actual usage:        ~35%        You are paying 100%
```

**Finding it:**

```sh
# Find EKS node groups tagged as staging with their current status
aws eks list-nodegroups --cluster-name your-cluster-name --output table

# Check EC2 instances tagged staging and their launch time
# Any instance running > 30 days with no weekend stop schedule is a candidate
aws ec2 describe-instances \
--filters "Name=tag:Environment,Values=staging" "Name=instance-state-name,Values=running" \
--query 'Reservations[*].Instances[*].{ID:InstanceId,Type:InstanceType,Launch:LaunchTime}' \
--output table
```

### The Fix — Scheduled Start and Stop with AWS Instance Scheduler:

```sh
# Option 1: Tag-based scheduling with AWS Instance Scheduler (CloudFormation solution)
# Add these tags to your staging EC2 instances and RDS clusters:
# Schedule: office-hours
# This starts instances at 08:00 and stops them at 20:00 Mon-Fri
# Weekend: completely off

# Option 2: Quick Lambda-based solution — stop all staging at 20:00 weekdays
aws events put-rule \
--schedule-expression "cron(0 20 ? * MON-FRI *)" \
--name stop-staging-environments \
--state ENABLED

# The stop Lambda — same pattern as Pattern 1 but targets staging tag
# Add a corresponding start rule at 07:30 Mon-Fri
```

### Consolidation in Addition to Scheduling

If frontend and backend share a database schema, consolidate them into one shared staging environment with namespace-level isolation. The combined cost is lower than two separate environments:

```yaml
# One shared staging cluster with namespace isolation
# frontend-staging and backend-staging share nodes via Karpenter
# but are isolated by namespace-level network policies
apiVersion: v1
kind: Namespace
metadata:
  name: staging-frontend
  labels:
    environment: staging
    team: frontend
---
apiVersion: v1
kind: Namespace
metadata:
  name: staging-backend
  labels:
    environment: staging
    team: backend
```

**The math:**

| Scenario | Monthly cost |
| --- | --- |
| Before: 4 environments, always on | $1,000 |
| After: 2 consolidated environments, office hours only | $290 |
| Monthly savings | $710 |

---

## Pattern 3: The NAT Gateway Tax

NAT Gateway is the most consistently underestimated line item on every AWS bill I've audited. It charges $0.045 per GB of data processed — and in EKS clusters, a staggering amount of traffic flows through it by default.

Every pod that pulls a container image from ECR goes through NAT Gateway. Every Lambda that writes to S3 goes through NAT Gateway. Every service that polls SQS, queries DynamoDB, or calls the Secrets Manager API goes through NAT Gateway — unless you have configured VPC endpoints.

VPC endpoints create a private connection between your VPC and the AWS service. Traffic routes through the AWS backbone instead of NAT Gateway. The data transfer becomes free.

**What the waste looks like:**

```sh
# Run this to see your current NAT Gateway data processing bill
aws ce get-cost-and-usage \
--time-period Start=\((date -d 'last month' +%Y-%m-01),End=\)(date +%Y-%m-01) \
--granularity MONTHLY \
--filter '{
"Dimensions": {
    "Key": "USAGE_TYPE",
    "Values": ["NatGateway-Bytes", "NatGateway-Hours"]
}
}' \
--metrics UnblendedCost \
--query 'ResultsByTime[0].Total.UnblendedCost.Amount' \
--output text
```

If this number is above \\(200, you have a NAT Gateway problem. At most Series A companies running EKS, it is between \\)800 and $6,000. ### The Fix — VPC Endpoints for the Four Highest-traffic AWS Services:

```sh
# Get your VPC ID and route table ID first
VPC_ID=$(aws ec2 describe-vpcs \
--filters "Name=tag:Name,Values=your-vpc-name" \
--query 'Vpcs[0].VpcId' --output text)

ROUTE_TABLE_ID=$(aws ec2 describe-route-tables \
--filters "Name=vpc-id,Values=$VPC_ID" "Name=association.main,Values=true" \
--query 'RouteTables[0].RouteTableId' --output text)

# S3 gateway endpoint — free to create, eliminates all S3 NAT charges
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--service-name com.amazonaws.us-east-1.s3 \
--route-table-ids $ROUTE_TABLE_ID

# DynamoDB gateway endpoint — also free
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--service-name com.amazonaws.us-east-1.dynamodb \
--route-table-ids $ROUTE_TABLE_ID

# ECR API endpoint — eliminates NAT charges on every container pull
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--vpc-endpoint-type Interface \
--service-name com.amazonaws.us-east-1.ecr.api \
--subnet-ids $(aws ec2 describe-subnets \
--filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:Tier,Values=private" \
--query 'Subnets[*].SubnetId' --output text)

# ECR Docker endpoint — required alongside ECR API for image pulls
aws ec2 create-vpc-endpoint \
--vpc-id $VPC_ID \
--vpc-endpoint-type Interface \
--service-name com.amazonaws.us-east-1.ecr.dkr \
--subnet-ids $(aws ec2 describe-subnets \
--filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:Tier,Values=private" \
--query 'Subnets[*].SubnetId' --output text)
```

When explaining this to your CFO, call it the NAT tax. They understand taxes. "We're paying a $0.045/GB tax on internal network traffic that we can eliminate in 30 minutes" lands better than "data processing bytes."

::: note Monthly savings

\\(2,000–\\)8,000 depending on your container pull frequency and S3 usage.

:::

---

## Pattern 4: The Savings Plan Timing Mistake

A Savings Plan is a commitment to spend a fixed dollar amount per hour on AWS compute for one or three years in exchange for a 30–70% discount. The math is attractive. The timing is where teams go wrong.

When the bill gets large, the instinct is to commit. Buy the Savings Plan, reduce the bill, show the CFO. The problem: if you haven't rightsized first, you're committing to pay for waste at a discount. When you rightsize later, your actual spend drops below your commitment — and you pay for compute you're not using.

**What wrong order looks like:**

```text
Step 1: AWS bill is $100,000/month
Step 2: Buy $70,000/hour Savings Plan commitment
Step 3: Rightsize instances — actual spend drops to $60,000
Step 4: Savings Plan covers \(70,000 but you only use \)60,000
Step 5: You pay $28,000/month for compute you do not use
         (Savings Plan discount applied to the overage)
         
Net result: You locked in waste for 12 months
```

**What right order looks like:**

```text
Step 1: Rightsize instances — spend drops from \(100,000 to \)60,000
Step 2: Add Spot for staging — spend drops from \(60,000 to \)45,000
Step 3: Migrate compatible workloads to Graviton — spend drops to $36,000
Step 4: NOW buy a Savings Plan covering $25,000/month (70% of steady-state)
Step 5: Effective monthly cost: \(12,500 for committed + \)11,000 on-demand = $23,500

Net result: $76,500/month saved versus the original bill
```

How to check what you should commit to:

```sh
# View your last 30 days of EC2 On-Demand spend
# This is your rightsized baseline — what you actually use after optimisation
aws ce get-cost-and-usage \
--time-period Start=\((date -d '30 days ago' +%Y-%m-%d),End=\)(date +%Y-%m-%d) \
--granularity DAILY \
--filter '{
  "And": [
    {"Dimensions": {"Key": "SERVICE", "Values": ["Amazon Elastic Compute Cloud - Compute"]}},
      {"Dimensions": {"Key": "PURCHASE_TYPE", "Values": ["On-Demand"]}}
  ]
}' \
--metrics UnblendedCost \
--query 'ResultsByTime[*].{Date:TimePeriod.Start,Cost:Total.UnblendedCost.Amount}' \
--output table

# Get AWS's own Savings Plan recommendation based on your usage
aws savingsplans get-savings-plans-purchase-recommendation \
--savings-plans-type COMPUTE_SP \
--term-in-years ONE_YEAR \
--payment-option NO_UPFRONT \
--lookback-period-in-days THIRTY_DAYS
```

As a rule, commit to 60–70% of your steady-state On-Demand spend after optimisation. Leave 30–40% flexible. Never commit on the unoptimised baseline.

::: note Monthly savings

\\(5,000–\\)15,000 depending on compute spend. This is the pattern with the highest single-action ROI when sequenced correctly.

:::

---

## Pattern 5: Cross-AZ Data Transfer

AWS charges \\(0.01 per GB in each direction when data crosses an Availability Zone boundary. \\)0.01 sounds negligible. It's not — because AZ boundaries are crossed constantly in distributed systems, and the charge is bidirectional.

The most common scenario: your application pods are scheduled across multiple AZs (as they should be for resilience), but your database is pinned to one AZ. Every database query from a pod in a different AZ costs \\(0.01/GB going to the database and \\)0.01/GB coming back. At 100GB of database traffic per day, that's \\(60/month. At 1TB per day, it is \\)600/month.

**What the waste looks like:**

```sh
# Check current cross-AZ data transfer charges
aws ce get-cost-and-usage \
--time-period Start=\((date -d 'last month' +%Y-%m-01),End=\)(date +%Y-%m-01) \
--granularity MONTHLY \
--filter '{"Dimensions": {"Key": "USAGE_TYPE", "Values": ["DataTransfer-Regional-Bytes"]}}'  \
--metrics UnblendedCost \
--query 'ResultsByTime[0].Total.UnblendedCost.Amount' \
--output text
```

How to find which pods are causing the cross-AZ traffic:

```sh
# Check which AZ your database RDS instance is in
aws rds describe-db-instances \
--query 'DBInstances[*].{ID:DBInstanceIdentifier,AZ:AvailabilityZone}' \
--output table

# Check which AZs your application pods are running in
kubectl get pods -o wide -n production | awk '{print $7}' | sort | uniq -c
```

If your RDS is in `us-east-1a` and 60% of your pods are in `us-east-1b` and `us-east-1c`, you have a cross-AZ traffic problem.

### The Fix — Topology-aware Routing

```yaml title="topology-aware-routing.yaml"
# This tells Kubernetes to prefer scheduling pods in the same AZ
# as the node making the request — keeping traffic local

apiVersion: v1
kind: Service
metadata:
  name: payment-api
  namespace: production
  annotations:
    # Route traffic to pods in the same AZ as the caller when possible
    service.kubernetes.io/topology-mode: "Auto"
spec:
  selector:
    app: payment-api
  ports:
  - port: 8080
    targetPort: 8080
```

```yaml title="topology-aware-routing.yaml"
# For pods themselves — spread across AZs but prefer local
# topologySpreadConstraints ensures even distribution
# while topology-aware routing keeps traffic within AZs

spec:
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: payment-api
```

For database traffic specifically, consider migrating from single-AZ RDS to Aurora, which handles AZ routing internally. Your application connects to one endpoint and Aurora routes internally — no cross-AZ charge from the application layer.

::: note Monthly savings

\\(500–\\)6,000 depending on database query volume and AZ distribution of your pods.

:::

---

## Pattern 6: The gp2 Volume Trap

In 2014, AWS launched gp2 EBS volumes. In 2020, they launched gp3 — cheaper, faster, and with better baseline performance. In 2026, most Series A companies are still running gp2. The difference: gp2 costs \\(0.10/GB/month and provides 3 IOPS per GB (100 IOPS minimum). gp3 costs \\)0.08/GB/month and provides 3,000 IOPS baseline regardless of size. gp3 is 20% cheaper and 10x faster on IOPS for most volume sizes. The migration is online — it runs while the volume is attached and in use.

**Finding all your gp2 volumes:**

```sh
# List every gp2 volume in your account with its size and monthly cost
aws ec2 describe-volumes \
  --filters Name=volume-type,Values=gp2 \
  --query 'Volumes[*].{
    ID:VolumeId,
    Size:Size,
    State:State,
    MonthlyCost_USD:Size
  }' \
  --output table

# Count the total: number of volumes and combined GB
aws ec2 describe-volumes \
  --filters Name=volume-type,Values=gp2 \
  --query 'length(Volumes)' --output text

aws ec2 describe-volumes \
  --filters Name=volume-type,Values=gp2 \
  --query 'sum(Volumes[*].Size)' --output text
```

### The Fix — Migrate All gp2 to gp3 in One Script

```sh
#!/bin/bash
# migrate_gp2_to_gp3.sh
# Migrates all gp2 volumes to gp3. Online operation — no downtime.
# Each modification runs asynchronously; the volume stays available throughout.

echo "Starting gp2 to gp3 migration..."

# Get all gp2 volume IDs
VOLUMES=$(aws ec2 describe-volumes \
  --filters Name=volume-type,Values=gp2 \
  --query 'Volumes[*].VolumeId' \
  --output text)

COUNT=0
for VOL_ID in $VOLUMES; do
  echo "Migrating $VOL_ID to gp3..."
  aws ec2 modify-volume \
    --volume-id $VOL_ID \
    --volume-type gp3 \
    --no-cli-pager
  COUNT=$((COUNT + 1))
done

echo "Migration initiated for $COUNT volumes."
echo "Modifications run online — no downtime. Monitor progress:"
echo "aws ec2 describe-volumes-modifications --query 'VolumesModifications[*].{ID:VolumeId,State:ModificationState}'"
```

**Verify completion:**

```sh
# Check that no gp2 volumes remain
aws ec2 describe-volumes \
--filters Name=volume-type,Values=gp2 \
--query 'length(Volumes)' \
--output text
#
# 0
```

::: note Monthly savings

20% of your total EBS spend. At \\(10,000/month in EBS, that's \\)2,000 saved for 30 minutes of work.

:::

---

## Pattern 7: The Infinite Log Trap

CloudWatch log groups have a default retention policy of "Never expire." Every log group created without an explicit retention setting accumulates logs indefinitely. For a busy Series A company, this means you're storing debug logs from 2022 that nobody has opened since the sprint review they were created for.

The cost compounds quietly. CloudWatch charges \\(0.03/GB/month for log storage and \\)0.50/GB for log ingestion. A cluster generating 50GB of logs per day ingests \\(25/day — \\)750/month — and then stores those logs forever at an increasing monthly cost.

**Finding log groups with no retention policy:**

```sh
# List all log groups with their retention settings
# Any group showing "retentionInDays: null" is infinite — it never expires
aws logs describe-log-groups \
--query 'logGroups[*].{Name:logGroupName,RetentionDays:retentionInDays,StoredBytes:storedBytes}' \
--output table | grep -E "(None|null)"

# Count how many log groups have no retention set
aws logs describe-log-groups \
--query 'length(logGroups[?retentionInDays==`null`])' \
--output text
```

### The Fix — Set Retention Policies in Bulk

Different log types have different compliance requirements. Debug logs don't need to be kept. Audit logs might need 365 days. The table below gives sensible defaults:

| Log Type | Recommended Retention | Reason |
| --- | --- | --- |
| Application debug logs | 14 days | Only useful for active debugging |
| Application error logs | 90 days | Post-incident investigation window |
| Access logs | 30 days | Security review window |
| CloudTrail audit logs | 365 days | SOC2 evidence requirement |
| VPC Flow Logs | 90 days | Security investigation window |

```sh
#!/bin/bash
# set_log_retention.sh
# Sets 30-day retention on all log groups that have no policy set
# Adjust the retention period per log group type as needed

echo "Setting retention policies on log groups with no expiry..."

# Get all log groups with no retention
aws logs describe-log-groups \
  --query 'logGroups[?retentionInDays==`null`].logGroupName' \
  --output text | tr '\t' '\n' | while read LOG_GROUP; do

  # Skip CloudTrail logs — these need longer retention for SOC2
  if echo "$LOG_GROUP" | grep -qi "cloudtrail"; then
    echo "Skipping CloudTrail log group: $LOG_GROUP"
    aws logs put-retention-policy \
      --log-group-name "$LOG_GROUP" \
      --retention-in-days 365
    continue
  fi

  # Set 30-day retention on all other log groups
  echo "Setting 30-day retention on: $LOG_GROUP"
  aws logs put-retention-policy \
    --log-group-name "$LOG_GROUP" \
    --retention-in-days 30
done

echo "Done. Logs older than their retention period will be deleted automatically by CloudWatch."
```

::: note Monthly savings

\\(500–\\)2,000 on storage costs. The ingestion cost reduction kicks in immediately when noisy debug logging is reduced. The storage cost reduction compounds over 30–90 days as old logs expire.

:::

---

## Pattern 8: The Orphaned Resource Collector

Every departed engineer leaves a trail. An EBS volume attached to a terminated instance. An Elastic IP allocated but not associated. A load balancer fronting a service that was deprecated in Q3. Old snapshots from an RDS instance that was replaced. None of these are intentional, but all of them are billed.

The fix is a weekly audit. Not a manual investigation — an automated script that runs every Sunday night, finds orphaned resources, and sends a Slack message with a list of candidates for deletion.

**Finding the orphans:**

```sh
# Unattached EBS volumes — you are paying for storage with nothing in it
aws ec2 describe-volumes \
--filters Name=status,Values=available \
--query 'Volumes[*].{
  ID:VolumeId,
  Size:Size,
  Created:CreateTime,
  MonthlyCost:Size
}' \
--output table

# Unassociated Elastic IPs — $3.60/month each when not attached to a running instance
aws ec2 describe-addresses \
--query 'Addresses[?AssociationId==`null`].[PublicIp,AllocationId]' \
--output table

# Old snapshots — created more than 90 days ago, no longer needed
aws ec2 describe-snapshots \
--owner-ids self \
--query "Snapshots[?StartTime<='$(date -d '90 days ago' --iso-8601=seconds)'].[SnapshotId,StartTime,VolumeSize]" \
--output table

# Idle load balancers — active but routing zero traffic
aws elbv2 describe-load-balancers \
--query 'LoadBalancers[*].{ARN:LoadBalancerArn,DNS:DNSName,State:State.Code}' \
--output table
```

**The weekly cleanup Lambda:**

```py :collapsed-lines title="orphan_resource_reporter.py"
# Runs every Sunday at 20:00 via EventBridge
# Reports orphaned resources to Slack — does NOT auto-delete
# Deletion requires a human decision. The Lambda surfaces the candidates.

import boto3
import json
import urllib.request
from datetime import datetime, timedelta, timezone

SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'

def get_orphaned_resources():
    """Collect all orphaned AWS resources and their estimated monthly costs."""
    ec2 = boto3.client('ec2')
    elbv2 = boto3.client('elbv2')
    report = {'total_monthly_waste': 0, 'resources': []}

    # Unattached EBS volumes ($0.08/GB/month for gp3)
    volumes = ec2.describe_volumes(
        Filters=[{'Name': 'status', 'Values': ['available']}]
    )['Volumes']
    for vol in volumes:
        monthly_cost = round(vol['Size'] * 0.08, 2)
        report['resources'].append({
            'type': 'Unattached EBS Volume',
            'id': vol['VolumeId'],
            'detail': f"{vol['Size']}GB {vol['VolumeType']}",
            'monthly_cost': monthly_cost
        })
        report['total_monthly_waste'] += monthly_cost

    # Unassociated Elastic IPs ($3.60/month each)
    addresses = ec2.describe_addresses()['Addresses']
    for addr in addresses:
        if 'AssociationId' not in addr:
            report['resources'].append({
                'type': 'Unassociated Elastic IP',
                'id': addr['AllocationId'],
                'detail': addr['PublicIp'],
                'monthly_cost': 3.60
            })
            report['total_monthly_waste'] += 3.60

    # Snapshots older than 90 days
    cutoff = (datetime.now(timezone.utc) - timedelta(days=90)).isoformat()
    snapshots = ec2.describe_snapshots(OwnerIds=['self'])['Snapshots']
    old_snapshots = [s for s in snapshots if s['StartTime'].isoformat() < cutoff]
    for snap in old_snapshots:
        monthly_cost = round(snap.get('VolumeSize', 0) * 0.05, 2)
        report['resources'].append({
            'type': 'Old Snapshot (90+ days)',
            'id': snap['SnapshotId'],
            'detail': f"Created {snap['StartTime'].strftime('%Y-%m-%d')}",
            'monthly_cost': monthly_cost
        })
        report['total_monthly_waste'] += monthly_cost

    return report

def post_to_slack(report):
    """Send the orphaned resource report to Slack."""
    resource_lines = '\n'.join([
        f"• {r['type']} `{r['id']}` — {r['detail']} — *${r['monthly_cost']}/month*"
        for r in report['resources']
    ])

    message = {
        'text': (
            f":money_with_wings: *Weekly Orphaned Resource Report*\n\n"
            f"Found *{len(report['resources'])} orphaned resources* "
            f"costing *${report['total_monthly_waste']:.2f}/month*\n\n"
            f"{resource_lines}\n\n"
            f"Review and delete resources that are no longer needed."
        )
    }
    
    req = urllib.request.Request(
        SLACK_WEBHOOK_URL,
        data=json.dumps(message).encode(),
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)

def lambda_handler(event, context):
    report = get_orphaned_resources()
    post_to_slack(report)
    return {
        'resources_found': len(report['resources']),
        'monthly_waste': report['total_monthly_waste']
    }
```

::: note Monthly savings

\\(500–\\)2,000. Every departed engineer typically leaves \\(50–\\)200 in orphaned resources. At a team of 30 with 30% annual turnover, that compounds quickly.

:::

---

## The Full Savings Summary

| Pattern | Monthly Saving | Time to Fix | Difficulty |
| --- | --- | --- | --- |
| 1. New hire experiment tax | \\(1,000–\\)2,000 | 2 hours (Lambda) | Medium |
| 2. Staging proliferation | \\(600–\\)800 | 3 hours (scheduling) | Low |
| 3. NAT Gateway tax | \\(2,000–\\)8,000 | 30 minutes | Low |
| 4. Savings Plan timing | \\(5,000–\\)15,000 | One decision | Low |
| 5. Cross-AZ data transfer | \\(500–\\)6,000 | 2 hours | Medium |
| 6. gp2 volume trap | \\(1,000–\\)5,000 | 30 minutes (script) | Low |
| 7. Infinite log trap | \\(500–\\)2,000 | 1 hour (script) | Low |
| 8. Orphaned resources | \\(500–\\)2,000 | 2 hours (Lambda) | Low |
| **Total potential** | **\\(11,100–\\)40,800/month** |  |  |

---

## What to Do This Week

Don't fix all eight this week. Prioritise by ROI per hour of engineering time:

**Day 1 (30 minutes):** Pattern 3 — NAT Gateway endpoints. Highest ROI per minute of any fix in this guide. One command creates the S3 endpoint. Done.

**Day 2 (30 minutes):** Pattern 6 — gp2 to gp3 migration. Run the script. Check the output. Done.

**Day 3 (1 hour):** Pattern 7 — log retention policies. Run the bulk retention script. Done.

**Day 4 (2 hours):** Patterns 1 and 8 — deploy both Lambdas. They run automatically from here.

**Next sprint:** Pattern 2 (staging schedule), Pattern 5 (topology-aware routing), and Pattern 4 (run the rightsizing cycle first, then evaluate Savings Plans).

Open Cost Explorer after each fix. Compare against your baseline screenshot from the start of this guide. The line should start going down.

::: info Resources

- [<VPIcon icon="fas fa-globe"/>FinOps Foundation Framework](https://finops.org/framework/) — The practitioner framework this guide contributes to, covering Inform, Optimize, and Operate phases of cloud cost management
- [<VPIcon icon="fa-brands fa-aws"/>AWS Cost Explorer API Reference](https://docs.aws.amazon.com/cost-management/latest/APIReference/API_GetCostAndUsage.html) — Full reference for the `get-cost-and-usage` command used throughout this guide
- [<VPIcon icon="fa-brands fa-aws"/>AWS Compute Optimizer](https://aws.amazon.com/compute-optimizer/) — AWS's own rightsizing recommendation service, used alongside the patterns in this guide for EC2 and EBS recommendations
- [<VPIcon icon="fa-brands fa-aws"/>AWS VPC Endpoints Documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html) — Complete list of available VPC endpoints for Pattern 3
- [<VPIcon icon="fa-brands fa-aws"/>AWS Instance Scheduler Solution](https://aws.amazon.com/solutions/implementations/instance-scheduler-on-aws/) — The AWS-maintained CloudFormation solution for Pattern 2 environment scheduling
- [<VPIcon icon="fas fa-globe"/>Karpenter Documentation](https://karpenter.sh/docs/) — For teams ready to go beyond these 8 patterns into dynamic node provisioning and Spot diversification
- [<VPIcon icon="fas fa-globe"/>FinOps Foundation Asset Library](https://finops.org/resources/) — The community asset library where practical scripts like the ones in this guide are contributed and maintained by practitioners

:::

::: info About Author

[Ayobami Adejumo (<VPIcon icon="iconfont icon-github"/>`aayostem`)](https://github.com/aayostem) is a senior platform engineer and FinOps specialist. He has audited AWS infrastructure for 30+ Series A companies and contributes practical tooling to the FinOps Foundation Asset Library.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The AWS FinOps Guide for Series A Startups: The 8 Cost Patterns That Appear After Product-Market Fit",
  "desc": "You raised your Series A. Engineering hired fast. Features shipped faster. And somewhere between month six and month twelve, someone forwarded you an AWS Cost Explorer screenshot with a line that only",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-aws-finops-guide-for-series-a-startups.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
