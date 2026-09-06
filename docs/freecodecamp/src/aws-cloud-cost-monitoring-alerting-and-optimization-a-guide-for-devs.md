---
lang: en-US
title: "AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs"
description: "Article(s) > AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs"
icon: fa-brands fa-aws
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
      content: "Article(s) > AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs"
    - property: og:description
      content: "AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/aws-cloud-cost-monitoring-alerting-and-optimization-a-guide-for-devs.html
prev: /devops/aws/articles/README.md
date: 2026-09-08
isOriginal: false
author:
  - name: Ayobami Adejumo
    url: https://freecodecamp.org/news/author/aayostem/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/01c5b407-d719-404c-a207-495ae6dcaa53.png
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
  name="AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs"
  desc="There's a common conversation that happens in engineering teams every month. Someone forwards a screenshot of the AWS bill. The number is higher than last month. Everyone nods and agrees it should be "
  url="https://freecodecamp.org/news/aws-cloud-cost-monitoring-alerting-and-optimization-a-guide-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/01c5b407-d719-404c-a207-495ae6dcaa53.png"/>

There's a common conversation that happens in engineering teams every month. Someone forwards a screenshot of the AWS bill. The number is higher than last month. Everyone nods and agrees it should be lower. Nothing specific gets decided, and the cycle repeats.

This guide is designed to end that cycle by replacing it with something more useful: a systematic, service-by-service approach to knowing exactly what you're spending, why you're spending it, catching problems before they become invoices, and reducing costs without guesswork.

It's organised as a reference you can return to. Each part is complete on its own: you can go straight to the RDS section if that's your current problem, or follow the guide start to finish if you're building a FinOps practice from scratch. Every command is runnable, and every script is deployable.

::: info What You'll Learn

- How to set up Cost and Usage Report querying with Athena, the foundation of all serious cost analysis
- The five dashboards every engineering team needs, built with queries you can run today
- A three-tier alerting strategy that catches cost spikes without creating alert fatigue
- Service-specific optimisation playbooks for EC2, S3, Lambda, RDS, DynamoDB, and data transfer
- A concrete 30-day sprint that produces measurable savings in the first month

:::

Let's build this from the ground up.

::: note Prerequisites

Before following this guide, you should have:

**Knowledge:**

- Working familiarity with AWS services: EC2, S3, RDS, Lambda, and VPC
- Comfort reading Python and SQL
- Basic understanding of how IAM policies and roles work

**Access:**

- AWS account with billing access. The IAM user or role you work with needs `ce:GetCostAndUsage`, `ec2:Describe*`, `rds:Describe*`, and `s3:GetBucketLifecycleConfiguration` permissions.
- AWS CLI v2 configured
- Athena access (for the CUR queries in Part 1)

**Setup:**

- Enable Cost Explorer if it isn't already. It's free and required for most commands in this guide:

```sh
aws ce enable-cost-explorer --region us-east-1
```

- The Cost and Usage Report (CUR) should be configured and exporting to an S3 bucket. If it isn't yet, the [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>AWS CUR setup guide](https://docs.aws.amazon.com/cur/latest/userguide/cur-create.html) walks through the process. Give the report 24 hours after setup to generate the first data file.

:::

---

## Part 1: Monitoring — Know Where Every Dollar Goes

### 1.1 The Cost and Usage Report — Your Source of Truth

Cost Explorer shows you service-level totals. It's useful for trends, but it isn't sufficient for root cause analysis. When you need to know which specific resource is responsible for a $12,000/month line item, you need the Cost and Usage Report queried through Athena.

Create the Athena table over your CUR data:

```sql
-- Run this once in Athena after your CUR starts generating data
-- Replace 'your-cur-bucket' and 'your-prefix' with your actual values
CREATE EXTERNAL TABLE IF NOT EXISTS cur_database.billing (
    bill_billing_period_start_date  STRING,
    bill_payer_account_id           STRING,
    line_item_usage_start_date      STRING,
    line_item_resource_id           STRING,
    line_item_usage_type            STRING,
    line_item_usage_amount          DOUBLE,
    line_item_unblended_cost        DOUBLE,
    product_servicecode             STRING,
    product_instance_type           STRING,
    product_region                  STRING,
    resource_tags_user_environment  STRING,
    resource_tags_user_team         STRING,
    resource_tags_user_service      STRING,
    resource_tags_user_owner        STRING
)
PARTITIONED BY (year STRING, month STRING)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
LOCATION 's3://your-cur-bucket/your-prefix/'
TBLPROPERTIES ('skip.header.line.count'='1');

MSCK REPAIR TABLE cur_database.billing;
```

Here are the three queries you should run on day one:

```sql :collapsed-lines
-- Query 1: Top 20 resources by cost this month
-- Run this first. It tells you where to focus.
SELECT
    line_item_resource_id,
    product_servicecode,
    resource_tags_user_team     AS team,
    resource_tags_user_service  AS service,
    SUM(line_item_unblended_cost) AS total_cost_usd
FROM cur_database.billing
WHERE line_item_usage_start_date >= DATE_FORMAT(
    DATE_TRUNC('month', CURRENT_DATE), '%Y-%m-%d'
)
  AND line_item_unblended_cost > 0
GROUP BY 1, 2, 3, 4
ORDER BY total_cost_usd DESC
LIMIT 20;

-- Query 2: Week-over-week cost growth by service
-- Identifies which services are growing fastest — these need investigation
WITH weekly AS (
    SELECT
        DATE_TRUNC('week', CAST(line_item_usage_start_date AS DATE)) AS week,
        product_servicecode,
        SUM(line_item_unblended_cost) AS cost
    FROM cur_database.billing
    WHERE line_item_usage_start_date >=
          DATE_FORMAT(DATE_ADD('day', -42, CURRENT_DATE), '%Y-%m-%d')
    GROUP BY 1, 2
)
SELECT
    curr.product_servicecode AS service,
    ROUND(prev.cost, 2)      AS prev_week_cost,
    ROUND(curr.cost, 2)      AS curr_week_cost,
    ROUND(
        100.0 * (curr.cost - prev.cost) / NULLIF(prev.cost, 0),
        1
    ) AS pct_change
FROM weekly curr
JOIN weekly prev
  ON curr.product_servicecode = prev.product_servicecode
  AND curr.week = DATE_ADD('week', 1, prev.week)
WHERE curr.week = DATE_TRUNC('week', CURRENT_DATE)
  AND ABS((curr.cost - prev.cost) / NULLIF(prev.cost, 0)) > 0.20
ORDER BY pct_change DESC;

-- Query 3: Resources running with no usage (candidates for shutdown)
-- Finds resources that incurred cost but had zero usage quantity
-- in the past 7 days — strong signal for idle or orphaned resources
SELECT
    line_item_resource_id,
    product_servicecode,
    resource_tags_user_owner    AS owner,
    resource_tags_user_team     AS team,
    SUM(line_item_unblended_cost) AS cost_past_7_days
FROM cur_database.billing
WHERE line_item_usage_start_date >=
      DATE_FORMAT(DATE_ADD('day', -7, CURRENT_DATE), '%Y-%m-%d')
  AND line_item_usage_amount = 0
  AND line_item_unblended_cost > 5
GROUP BY 1, 2, 3, 4
ORDER BY cost_past_7_days DESC
LIMIT 30;
```

### 1.2 The Five Essential Cost Dashboards

These five views cover the monitoring needs of most engineering teams. Each is built from queries you can run immediately, no third-party tool required.

#### Dashboard 1: Executive Summary (for weekly leadership updates)

```py :collapsed-lines title="executive_summary.py"
import boto3
from datetime import datetime, timedelta

ce = boto3.client('ce')


def weekly_summary():
    today     = datetime.now()
    start_mtd = today.replace(day=1).strftime('%Y-%m-%d')
    today_str = today.strftime('%Y-%m-%d')

    # Month-to-date spend
    mtd = ce.get_cost_and_usage(
        TimePeriod={'Start': start_mtd, 'End': today_str},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost']
    )
    mtd_spend = float(
        mtd['ResultsByTime'][0]['Total']['UnblendedCost']['Amount']
    )

    # End-of-month forecast
    forecast = ce.get_cost_forecast(
        TimePeriod={
            'Start': today_str,
            'End':   (today.replace(day=28) + timedelta(days=4)).replace(day=1).strftime('%Y-%m-%d'),
        },
        Metric='UNBLENDED_COST',
        Granularity='MONTHLY'
    )
    eom_forecast = float(forecast['Total']['Amount']) + mtd_spend

    # Top 5 services
    by_service = ce.get_cost_and_usage(
        TimePeriod={'Start': start_mtd, 'End': today_str},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost'],
        GroupBy=[{'Type': 'DIMENSION', 'Key': 'SERVICE'}]
    )
    services = sorted(
        [
            (g['Keys'][0], float(g['Metrics']['UnblendedCost']['Amount']))
            for g in by_service['ResultsByTime'][0]['Groups']
        ],
        key=lambda x: x[1],
        reverse=True
    )[:5]

    print(f"\n{'─'*48}")
    print(f"  AWS Cost Summary — {today.strftime('%B %Y')}")
    print(f"{'─'*48}")
    print(f"  Month-to-date:     ${mtd_spend:>12,.2f}")
    print(f"  End-of-month est:  ${eom_forecast:>12,.2f}")
    print(f"\n  Top 5 Services:")
    for name, cost in services:
        short = name.replace('Amazon ', '').replace('AWS ', '')
        print(f"    {short:<32} ${cost:>9,.2f}")
    print(f"{'─'*48}\n")


weekly_summary()
```

#### Dashboard 2: Team Cost Breakdown (for engineering leads)

```py :collapsed-lines title="team_breakdown.py"
import boto3
from datetime import datetime

ce = boto3.client('ce')


def team_breakdown():
    start = datetime.now().replace(day=1).strftime('%Y-%m-%d')
    end   = datetime.now().strftime('%Y-%m-%d')

    response = ce.get_cost_and_usage(
        TimePeriod={'Start': start, 'End': end},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost'],
        GroupBy=[
            {'Type': 'TAG',       'Key': 'Team'},
            {'Type': 'DIMENSION', 'Key': 'SERVICE'},
        ]
    )

    by_team = {}
    for group in response['ResultsByTime'][0].get('Groups', []):
        team_raw = group['Keys'][0]
        team     = team_raw.replace('Team$', '') if team_raw else 'untagged'
        service  = group['Keys'][1]
        cost     = float(group['Metrics']['UnblendedCost']['Amount'])

        if team not in by_team:
            by_team[team] = {'total': 0.0, 'by_service': {}}
        by_team[team]['total'] += cost
        by_team[team]['by_service'][service] = (
            by_team[team]['by_service'].get(service, 0.0) + cost
        )

    total_bill = sum(d['total'] for d in by_team.values())

    print(f"\n{'─'*58}")
    print(f"  Team Cost Breakdown — MTD {datetime.now().strftime('%Y-%m-%d')}")
    print(f"  Total: ${total_bill:,.2f}")
    print(f"{'─'*58}")

    for team, data in sorted(by_team.items(), key=lambda x: x[1]['total'], reverse=True):
        pct = (data['total'] / total_bill * 100) if total_bill else 0
        print(f"\n  {team:<20}  ${data['total']:>10,.2f}  ({pct:.1f}%)")
        top3 = sorted(data['by_service'].items(), key=lambda x: x[1], reverse=True)[:3]
        for svc, cost in top3:
            short = svc.replace('Amazon ', '').replace('AWS ', '')
            print(f"    └─ {short:<30} ${cost:>8,.2f}")

    print()


team_breakdown()
```

#### Dashboard 3: Waste Detection (for weekly cleanup reviews):

```py
# waste_detector.py
import boto3
from datetime import datetime, timezone, timedelta

ec2  = boto3.client('ec2')
elbv2 = boto3.client('elbv2')
cw   = boto3.client('cloudwatch')


def detect_waste():
    report = {'items': [], 'total_monthly_waste': 0.0}

    # Unattached EBS volumes
    for vol in ec2.describe_volumes(
        Filters=[{'Name': 'status', 'Values': ['available']}]
    )['Volumes']:
        age  = (datetime.now(timezone.utc) - vol['CreateTime']).days
        cost = round(vol['Size'] * 0.08, 2)
        tags = {t['Key']: t['Value'] for t in vol.get('Tags', [])}
        report['items'].append({
            'type':         'Unattached EBS Volume',
            'id':           vol['VolumeId'],
            'detail':       f"{vol['Size']}GB — {age} days old",
            'owner':        tags.get('Owner', '—'),
            'monthly_cost': cost,
        })
        report['total_monthly_waste'] += cost

    # Unassociated Elastic IPs
    for addr in ec2.describe_addresses()['Addresses']:
        if 'AssociationId' not in addr:
            report['items'].append({
                'type':         'Unassociated Elastic IP',
                'id':           addr.get('AllocationId', ''),
                'detail':       addr['PublicIp'],
                'owner':        '—',
                'monthly_cost': 3.60,
            })
            report['total_monthly_waste'] += 3.60

    # Idle load balancers (fewer than 100 requests in 7 days)
    for lb in elbv2.describe_load_balancers()['LoadBalancers']:
        metrics = cw.get_metric_statistics(
            Namespace='AWS/ApplicationELB',
            MetricName='RequestCount',
            Dimensions=[{'Name': 'LoadBalancer',
                         'Value': lb['LoadBalancerArn'].split(':loadbalancer/')[-1]}],
            StartTime=datetime.now() - timedelta(days=7),
            EndTime=datetime.now(),
            Period=604800,
            Statistics=['Sum']
        )['Datapoints']
        total_requests = metrics[0]['Sum'] if metrics else 0

        if total_requests < 100:
            report['items'].append({
                'type':         'Idle Load Balancer',
                'id':           lb['LoadBalancerName'],
                'detail':       f"{int(total_requests)} requests in 7 days",
                'owner':        '—',
                'monthly_cost': 22.0,
            })
            report['total_monthly_waste'] += 22.0

    print(f"\n  Waste Detection Report — {datetime.now().strftime('%Y-%m-%d')}")
    print(f"  Estimated monthly waste: ${report['total_monthly_waste']:.2f}\n")

    for item in sorted(report['items'], key=lambda x: x['monthly_cost'], reverse=True)[:20]:
        print(f"  [{item['type']}]")
        print(f"    ID:     {item['id']}")
        print(f"    Detail: {item['detail']}")
        print(f"    Owner:  {item['owner']}")
        print(f"    Cost:   ${item['monthly_cost']:.2f}/month\n")

    return report


detect_waste()
```

### 1.3 Tagging Strategy — The Foundation of All Attribution

Every cost attribution model depends on tags. Teams that skip tagging build dashboards that show totals without explanations. The discipline is in making tagging structural rather than procedural: enforced by infrastructure code, not by reminders in Confluence.

Required tag set:

```hcl title="terraform/variables.tf"
variable "mandatory_tags" {
  description = "Tags applied to every resource in this account"
  type        = map(string)

  validation {
    condition = alltrue([
      contains(keys(var.mandatory_tags), "Environment"),
      contains(keys(var.mandatory_tags), "Team"),
      contains(keys(var.mandatory_tags), "Owner"),
      contains(keys(var.mandatory_tags), "Service"),
    ])
    error_message = "mandatory_tags must include Environment, Team, Owner, and Service."
  }
}

locals {
  common_tags = merge(var.mandatory_tags, {
    ManagedBy    = "terraform"
    LastModified = timestamp()
  })
}

resource "aws_instance" "api_server" {
  ami           = data.aws_ami.amazon_linux_2023.id
  instance_type = "t3.medium"
  tags          = merge(local.common_tags, {Name = "api-server-${var.environment}"})
}
```

Find and report untagged resources weekly:

```sh title="find_untagged.sh"
#!/usr/bin/env bash

echo "Untagged EC2 instances (missing Team tag):"
aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[?!not_null(Tags[?Key=='Team'].Value|[0])].[InstanceId,InstanceType,LaunchTime]" \
  --output table

echo "Untagged RDS instances:"
aws rds describe-db-instances \
  --query "DBInstances[?!not_null(TagList[?Key=='Team'].Value|[0])].DBInstanceIdentifier" \
  --output table
```

---

## Part 2: Alerting — Catch Spikes Before They Become Invoices

The typical discovery timeline without proactive alerting: a cost spike happens on the 5th, the monthly invoice arrives on the 20th, someone notices on the 22nd, investigation begins on the 23rd, and two weeks of billed waste can't be recovered. With proactive alerting, discovery happens within hours.

### 2.1 The Three-Tier Alert Structure

Alert fatigue is as damaging as no alerting. The three-tier model keeps signal high by routing different severity levels to different channels with different response expectations.

```py title="alert_router.py"
import boto3
import json
import urllib.request
from enum import Enum

SLACK_INFO_WEBHOOK  = 'https://hooks.slack.com/services/INFO/WEBHOOK'
SLACK_ALERT_WEBHOOK = 'https://hooks.slack.com/services/ALERT/WEBHOOK'
SNS_CRITICAL_TOPIC  = 'arn:aws:sns:us-east-1:YOUR_ACCOUNT:cost-critical'


class AlertTier(Enum):
    INFO     = 1
    WARNING  = 2
    CRITICAL = 3


def route_alert(tier: AlertTier, subject: str, message: str):
    """Send an alert to the appropriate channel for its severity tier."""
    icons   = {AlertTier.INFO: ':information_source:',
               AlertTier.WARNING: ':warning:', AlertTier.CRITICAL: ':rotating_light:'}
    payload = {'text': f"{icons[tier]} *{subject}*\n{message}"}

    if tier == AlertTier.INFO:
        _post_slack(SLACK_INFO_WEBHOOK, payload)
    elif tier == AlertTier.WARNING:
        _post_slack(SLACK_ALERT_WEBHOOK, payload)
        _send_sns(SNS_CRITICAL_TOPIC, subject, f"WARNING: {message}")
    elif tier == AlertTier.CRITICAL:
        _post_slack(SLACK_ALERT_WEBHOOK, payload)
        _send_sns(SNS_CRITICAL_TOPIC, subject, f"CRITICAL: {message}")


def _post_slack(webhook: str, payload: dict):
    req = urllib.request.Request(
        webhook,
        data=json.dumps(payload).encode(),
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)


def _send_sns(topic_arn: str, subject: str, message: str):
    sns = boto3.client('sns')
    sns.publish(TopicArn=topic_arn, Subject=subject[:100], Message=message)
```

The three tiers and what they respond to: Tier 1 INFO goes to a Slack informational channel for daily cost summaries, weekly trend reports, and tag compliance updates. No action required.

Tier 2 WARNING goes to a Slack alert channel plus email for budget above 75% utilisation, 25% week-over-week increases, and expiring Savings Plans. Acknowledge within 24 hours.

Tier 3 CRITICAL goes to PagerDuty plus SMS for budget above 90% utilisation, 100% increase in 24 hours, crypto mining detected, and projected overspend above 120% of plan. Investigate within 1 hour.

### 2.2 Real-Time Budget Monitor

AWS Budgets sends alerts once daily by default. A daily window means a cost spike that begins at 08:00 isn't caught until the next day's alert fires. The Lambda below runs hourly and checks both absolute budget utilisation and hour-over-hour rate of change.

```py :collapsed-lines title="budget_monitor.py"
# Lambda triggered by EventBridge every hour

import boto3
from datetime import datetime, timedelta
from alert_router import route_alert, AlertTier

ce      = boto3.client('ce')
budgets = boto3.client('budgets', region_name='us-east-1')
ACCOUNT_ID  = boto3.client('sts').get_caller_identity()['Account']
BUDGET_NAME = 'monthly-infrastructure'


def get_mtd_spend() -> float:
    start = datetime.now().replace(day=1).strftime('%Y-%m-%d')
    end   = datetime.now().strftime('%Y-%m-%d')
    r = ce.get_cost_and_usage(
        TimePeriod={'Start': start, 'End': end},
        Granularity='MONTHLY',
        Metrics=['UnblendedCost']
    )
    return float(r['ResultsByTime'][0]['Total']['UnblendedCost']['Amount'])


def get_budget_limit() -> float:
    r = budgets.describe_budget(AccountId=ACCOUNT_ID, BudgetName=BUDGET_NAME)
    return float(r['Budget']['BudgetLimit']['Amount'])


def get_hourly_costs(hours: int = 4) -> list:
    """Return hourly cost totals for the last N hours."""
    end   = datetime.now()
    start = end - timedelta(hours=hours)
    r = ce.get_cost_and_usage(
        TimePeriod={'Start': start.strftime('%Y-%m-%d'), 'End': end.strftime('%Y-%m-%d')},
        Granularity='HOURLY',
        Metrics=['UnblendedCost']
    )
    return [
        float(period['Total']['UnblendedCost']['Amount'])
        for period in r['ResultsByTime']
    ]


def lambda_handler(event, context):
    mtd_spend    = get_mtd_spend()
    budget_limit = get_budget_limit()
    utilisation  = mtd_spend / budget_limit * 100

    days_elapsed  = datetime.now().day
    projected_eom = (mtd_spend / days_elapsed) * 30
    projected_pct = projected_eom / budget_limit * 100

    if utilisation >= 90:
        route_alert(
            AlertTier.CRITICAL,
            f'Budget at {utilisation:.0f}%',
            f'MTD spend ${mtd_spend:,.2f} is {utilisation:.0f}% of ${budget_limit:,.0f} budget. '
            f'Projected EOM: ${projected_eom:,.2f}.'
        )
    elif utilisation >= 75:
        route_alert(
            AlertTier.WARNING,
            f'Budget at {utilisation:.0f}%',
            f'MTD spend ${mtd_spend:,.2f} is {utilisation:.0f}% of ${budget_limit:,.0f} budget. '
            f'Projected EOM: ${projected_eom:,.2f}.'
        )

    # Check hourly spike
    hourly = get_hourly_costs(hours=4)
    if len(hourly) >= 2:
        last_hour = hourly[-1]
        prev_avg  = sum(hourly[:-1]) / len(hourly[:-1])
        if prev_avg > 0.10 and last_hour > prev_avg * 1.5:
            route_alert(
                AlertTier.WARNING,
                'Hourly cost spike detected',
                f'Last hour: ${last_hour:.2f} vs prior 3-hour avg ${prev_avg:.2f} '
                f'(+{(last_hour/prev_avg - 1)*100:.0f}%)'
            )

    return {
        'mtd_spend':       round(mtd_spend, 2),
        'utilisation_pct': round(utilisation, 1),
        'projected_eom':   round(projected_eom, 2),
    }
```

---

## Part 3: Optimisation by Service

### 3.1 EC2 — Seven Levers in Priority Order

EC2 is the largest line item in most AWS accounts and the one with the most optimisation options. Work through these levers in order, as each one lowers the baseline that the next lever acts on.

Lever 1: Find truly idle instances (CPU below 1% for 14 days).

```py title="ec2_idle_finder.py"
import boto3
from datetime import datetime, timedelta

ec2 = boto3.client('ec2')
cw  = boto3.client('cloudwatch')


def find_idle_instances(avg_cpu_threshold: float = 1.0, days: int = 14):
    instances = [
        inst
        for r in ec2.describe_instances(
            Filters=[{'Name': 'instance-state-name', 'Values': ['running']}]
        )['Reservations']
        for inst in r['Instances']
    ]

    idle = []
    for inst in instances:
        iid   = inst['InstanceId']
        stats = cw.get_metric_statistics(
            Namespace='AWS/EC2',
            MetricName='CPUUtilization',
            Dimensions=[{'Name': 'InstanceId', 'Value': iid}],
            StartTime=datetime.utcnow() - timedelta(days=days),
            EndTime=datetime.utcnow(),
            Period=days * 86400,
            Statistics=['Average']
        )['Datapoints']

        avg_cpu = stats[0]['Average'] if stats else 0.0
        if avg_cpu < avg_cpu_threshold:
            tags = {t['Key']: t['Value'] for t in inst.get('Tags', [])}
            idle.append({
                'instance_id':   iid,
                'instance_type': inst['InstanceType'],
                'avg_cpu':       round(avg_cpu, 2),
                'environment':   tags.get('Environment', '—'),
                'owner':         tags.get('Owner', '—'),
            })

    return sorted(idle, key=lambda x: x['avg_cpu'])


for inst in find_idle_instances():
    print(f"  {inst['instance_id']}  {inst['instance_type']}  "
          f"{inst['avg_cpu']}% CPU  env:{inst['environment']}  owner:{inst['owner']}")
```

Lever 2: Right-size over-provisioned instances (CPU below 20%, sustained).

Use the same script with `avg_cpu_threshold=20.0`. These are right-sizing candidates, not shutdown candidates.

Lever 3: Schedule dev and staging shutdowns using EventBridge rules on `AutoShutdown=true` tagged instances.

Lever 4: Purchase Savings Plans only after completing levers 1–3. Lever 5: Migrate to Graviton (20% cheaper, same performance for most workloads).

Lever 6: Use Spot for fault-tolerant batch and development workloads.

Lever 7: Migrate containerised workloads to EKS with Karpenter for automatic bin-packing.

Spot savings estimate:

```py title="spot_price_analyser.py"
import boto3

ec2 = boto3.client('ec2')


def spot_savings_estimate(instance_type: str) -> dict:
    spot_history = ec2.describe_spot_price_history(
        InstanceTypes=[instance_type],
        ProductDescriptions=['Linux/UNIX'],
        MaxResults=1
    )['SpotPriceHistory']
    spot_price = float(spot_history[0]['SpotPrice']) if spot_history else 0

    on_demand_approx = {
        't3.medium': 0.0416, 'm5.large': 0.096,
        'c5.xlarge': 0.17,   'r5.2xlarge': 0.504,
    }
    od_price    = on_demand_approx.get(instance_type, 0)
    savings_pct = ((od_price - spot_price) / od_price * 100) if od_price else 0

    return {
        'instance_type': instance_type,
        'spot_price':    round(spot_price, 4),
        'on_demand':     od_price,
        'savings_pct':   round(savings_pct, 1),
        'monthly_spot':  round(spot_price * 730, 2),
        'monthly_od':    round(od_price * 730, 2),
    }


for itype in ['t3.medium', 'm5.large', 'c5.xlarge']:
    r = spot_savings_estimate(itype)
    print(f"  {r['instance_type']:<15} Spot: ${r['spot_price']}/hr  "
          f"OD: ${r['on_demand']}/hr  Savings: {r['savings_pct']}%")
```

### 3.2 S3 — Lifecycle Policies and Storage Class Selection

S3 optimisation has two components: moving infrequently accessed data to cheaper storage classes via lifecycle policies, and eliminating waste patterns like incomplete multipart uploads.

```py
# s3_lifecycle_applier.py
import boto3

s3 = boto3.client('s3')

LOG_POLICY = {
    'Rules': [{
        'ID': 'standard-tiering',
        'Status': 'Enabled',
        'Filter': {'Prefix': ''},
        'Transitions': [
            {'Days': 30,  'StorageClass': 'STANDARD_IA'},
            {'Days': 90,  'StorageClass': 'GLACIER_IR'},
            {'Days': 365, 'StorageClass': 'DEEP_ARCHIVE'},
        ],
        'Expiration': {'Days': 2555},
        'AbortIncompleteMultipartUpload': {'DaysAfterInitiation': 7},
    }]
}

TEMP_POLICY = {
    'Rules': [{
        'ID': 'temp-data-retention',
        'Status': 'Enabled',
        'Filter': {'Prefix': ''},
        'Expiration': {'Days': 30},
        'AbortIncompleteMultipartUpload': {'DaysAfterInitiation': 1},
    }]
}

for bucket in s3.list_buckets()['Buckets']:
    name = bucket['Name']
    try:
        s3.get_bucket_lifecycle_configuration(Bucket=name)
        print(f"  {name} — policy already exists, skipping")
    except s3.exceptions.ClientError:
        policy = TEMP_POLICY if any(k in name for k in ['temp', 'build', 'cache']) else LOG_POLICY
        s3.put_bucket_lifecycle_configuration(
            Bucket=name, LifecycleConfiguration=policy
        )
        print(f"  {name} — applied {'TEMP' if policy is TEMP_POLICY else 'LOG'} policy")
```

### 3.3 RDS — Five Optimisation Levels

| Level | Action | Typical Saving | Risk |
| --- | --- | --- | --- |
| 1 | Delete unused read replicas | 30–50% of replica cost | Low |
| 2 | Reduce backup retention to compliance minimum | 20–30% of storage cost | Low |
| 3 | Right-size instance class (CPU below 20% sustained) | 20–40% of compute | Medium |
| 4 | Purchase Reserved Instances for production | 30–60% of compute | Low |
| 5 | Migrate variable-load DBs to Aurora Serverless v2 | 40–70% total | High effort |

Find over-provisioned RDS instances:

```py title="rds_rightsizer.py"
import boto3
from datetime import datetime, timedelta

rds = boto3.client('rds')
cw  = boto3.client('cloudwatch')


def find_oversized_rds():
    instances  = rds.describe_db_instances()['DBInstances']
    candidates = []

    for inst in instances:
        iid    = inst['DBInstanceIdentifier']
        iclass = inst['DBInstanceClass']

        stats = cw.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='CPUUtilization',
            Dimensions=[{'Name': 'DBInstanceIdentifier', 'Value': iid}],
            StartTime=datetime.utcnow() - timedelta(days=14),
            EndTime=datetime.utcnow(),
            Period=1209600,
            Statistics=['Average', 'Maximum']
        )['Datapoints']

        if not stats:
            continue

        avg_cpu = stats[0]['Average']
        max_cpu = stats[0]['Maximum']

        if avg_cpu < 20 and max_cpu < 50:
            candidates.append({
                'id':       iid,
                'class':    iclass,
                'avg_cpu':  round(avg_cpu, 1),
                'max_cpu':  round(max_cpu, 1),
                'engine':   inst['Engine'],
            })

    return candidates


for c in find_oversized_rds():
    print(f"  {c['id']}  {c['class']}  avg:{c['avg_cpu']}%  max:{c['max_cpu']}%  engine:{c['engine']}")
```

### 3.4 DynamoDB — On-Demand vs Provisioned Decision

On-demand is convenient but can be 3–5× more expensive than provisioned for predictable workloads. Provisioned with auto-scaling covers most cases at significantly lower cost.

```py title="dynamodb_mode_advisor.py"
import boto3
from datetime import datetime, timedelta

dynamodb = boto3.client('dynamodb')
cw       = boto3.client('cloudwatch')


def analyse_table_billing(table_name: str) -> dict:
    table = dynamodb.describe_table(TableName=table_name)['Table']
    mode  = table.get('BillingModeSummary', {}).get('BillingMode', 'PROVISIONED')

    stats = {}
    for metric in ['ConsumedReadCapacityUnits', 'ConsumedWriteCapacityUnits']:
        data = cw.get_metric_statistics(
            Namespace='AWS/DynamoDB',
            MetricName=metric,
            Dimensions=[{'Name': 'TableName', 'Value': table_name}],
            StartTime=datetime.utcnow() - timedelta(days=30),
            EndTime=datetime.utcnow(),
            Period=86400,
            Statistics=['Average', 'Maximum']
        )['Datapoints']
        if data:
            avg  = sum(d['Average'] for d in data) / len(data)
            peak = max(d['Maximum'] for d in data)
            stats[metric] = {'avg': round(avg, 1), 'peak': round(peak, 1)}

    if mode == 'PAY_PER_REQUEST':
        avg_rcu = stats.get('ConsumedReadCapacityUnits', {}).get('avg', 0)
        avg_wcu = stats.get('ConsumedWriteCapacityUnits', {}).get('avg', 0)

        if avg_rcu > 2000 or avg_wcu > 500:
            return {
                'table':          table_name,
                'current_mode':   'PAY_PER_REQUEST',
                'recommendation': 'Switch to PROVISIONED with auto-scaling',
                'reason': f'Avg {avg_rcu:.0f} RCU/s and {avg_wcu:.0f} WCU/s — predictable pattern',
            }

    return {'table': table_name, 'current_mode': mode, 'recommendation': 'No change needed'}


for table in dynamodb.list_tables()['TableNames']:
    r = analyse_table_billing(table)
    if r['recommendation'] != 'No change needed':
        print(f"  {r['table']}: {r['recommendation']}")
```

### 3.5 Data Transfer — The Three Main Waste Patterns

Data transfer charges are often the most confusing line item on an AWS bill. Here are the the three main patterns and their fixes:

Cross-AZ traffic (most common, most fixable): services in different AZs incur $0.01/GB in each direction. The fix is to use topology-aware routing on Kubernetes Services or ensure your application tier and database tier use the same AZ placement.

NAT Gateway charges for internal AWS traffic: S3, ECR, DynamoDB, and SQS traffic that routes through NAT Gateway incurs $0.045/GB. The fix: VPC endpoints eliminate this entirely.

Inter-region replication that compliance doesn't require: audit your S3 replication rules quarterly against actual compliance requirements.

```sh
# Find S3 buckets with active replication
for bucket in $(aws s3api list-buckets --query 'Buckets[*].Name' --output text); do
    result=$(aws s3api get-bucket-replication --bucket "$bucket" 2>&1)
    if ! echo "$result" | grep -q "ReplicationConfigurationNotFoundError"; then
        echo "  $bucket — replication active, verify compliance requirement"
    fi
done
```

---

## Part 4: The 30-Day Optimisation Sprint

This sprint produces measurable savings in the first month. It's designed for a single engineer with two to four hours per week of dedicated FinOps time.

Week 1 – Visibility: enable CUR, set up the Athena table, run the three day-one queries, screenshot the results as your baseline, tag 100% of running EC2 and RDS instances, and identify your top three cost drivers with a documented hypothesis for each.

Week 2 – Quick wins: deploy the orphaned resource reporter Lambda, apply S3 lifecycle policies to your three largest buckets, run the idle instance finder and stop anything below 1% average CPU with no owner objection, and add VPC endpoints for S3, ECR, and DynamoDB.

Week 3 – Right-sizing: run the EC2 rightsizing analyser, downsize the three highest-confidence candidates (non-production first), run the RDS rightsizing script, and find read replicas serving minimal traffic and decommission them.

Week 4 – Alerting and automation: deploy the hourly budget monitor Lambda, configure the three-tier alert routing, set up the weekly waste reporter, add the Infracost GitHub Action to your infrastructure repository, and schedule a monthly 30-minute FinOps review meeting.

Expected outcome after 30 days: 15–25% reduction in monthly AWS spend, documented evidence of every change, and a recurring process that prevents the same waste from accumulating again.

---

## Best Practices Summary

✅ **Do:** Set up CUR + Athena before any other monitoring. Cost Explorer is a starting point, while CUR is the source of truth.

✅ **Do:** Enforce tagging in Terraform or CloudFormation. Process-based tagging decays, but infrastructure-enforced tagging is permanent.

✅ **Do:** Run the idle instance finder and waste reporter weekly. Waste accumulates continuously. A weekly report keeps the pile small.

✅ **Do:** Use the three-tier alert model. One alert channel with everything in it creates fatigue and gets muted.

✅ **Do:** Work through the EC2 optimisation levers in order. Right-sizing before Savings Plans prevents locking in waste at a discount.

✅ **Do:** Check DynamoDB billing mode against actual usage patterns quarterly.

❌ **Don't:** Delete untagged resources without investigation. Untagged doesn't mean unused, it means unclaimed.

❌ **Don't:** Apply aggressive S3 lifecycle policies without auditing access patterns first. Glacier retrieval fees can exceed Standard storage costs if data is accessed more frequently than expected.

❌ **Don't:** Run the waste reporter Lambda with auto-deletion enabled on its first deployment. Run in report-only mode for two weeks to validate the output before adding deletion logic.

::: info Resources

- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**AWS Cost and Usage Report Data Dictionary**](https://docs.aws.amazon.com/cur/latest/userguide/data-dictionary.html): Column reference for all CUR Athena queries in this guide
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**AWS Cost Explorer API Reference**](https://docs.aws.amazon.com/cost-management/latest/APIReference/): Full reference for the Python boto3 cost queries
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**AWS Compute Optimizer**](https://aws.amazon.com/compute-optimizer/): ML-powered right-sizing recommendations, useful as a cross-check against the manual analyser scripts
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**Amazon DynamoDB Pricing**](https://aws.amazon.com/dynamodb/pricing/): The definitive reference for the provisioned vs on-demand cost calculation in Section 3.4
- [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>**AWS Instance Scheduler**](https://aws.amazon.com/solutions/implementations/instance-scheduler-on-aws/): The official AWS solution for tag-based EC2 and RDS scheduling
- [**FinOps Foundation Framework**](https://finops.org/framework/): The practitioner framework that defines the Inform, Optimise, Operate cycle this guide implements
- [**Companion Repository** (<VPIcon icon="iconfont icon-github"/>`aayostem/platform-toolkit`)](https://github.com/aayostem/platform-toolkit): All scripts, Lambda functions, and Terraform modules from this guide

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "AWS Cloud Cost Monitoring, Alerting, and Optimization: A Guide for Devs",
  "desc": "There's a common conversation that happens in engineering teams every month. Someone forwards a screenshot of the AWS bill. The number is higher than last month. Everyone nods and agrees it should be ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/aws-cloud-cost-monitoring-alerting-and-optimization-a-guide-for-devs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
