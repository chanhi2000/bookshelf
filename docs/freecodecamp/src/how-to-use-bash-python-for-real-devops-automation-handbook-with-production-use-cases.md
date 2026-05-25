---
lang: en-US
title: "How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases"
description: "Article(s) > How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - DevOps
  - Amazon
  - AWS
  - Kubernetes
  - Terraform
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - devops
  - amazon
  - aws
  - amazon-web-services
  - k8s
  - kubernetes
  - tf
  - terraform
  - hcl
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases"
    - property: og:description
      content: "How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-bash-python-for-real-devops-automation-handbook-with-production-use-cases.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-05-28
isOriginal: false
author:
  - name: Osomudeya Zudonu
    url: https://freecodecamp.org/news/author/Osomudeya/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/73f2a745-c1b5-4cbb-8f97-2ba6c5230592.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
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
  name="How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases"
  desc="Automation scripts often validate process completion instead of system health. A Kubernetes pod can be running while the application inside it can't authenticate to the database. A Terraform deploymen"
  url="https://freecodecamp.org/news/how-to-use-bash-python-for-real-devops-automation-handbook-with-production-use-cases"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/73f2a745-c1b5-4cbb-8f97-2ba6c5230592.png"/>

Automation scripts often validate process completion instead of system health.

A Kubernetes pod can be running while the application inside it can't authenticate to the database. A Terraform deployment can return clean while someone has manually changed infrastructure in the cloud console. A canary rollout can show zero errors while users wait five seconds for every request.

The problem isn't the tooling. The problem is that the system can look healthy when it really is not.

This handbook walks through five production-style automation scenarios using Bash and Python for:

- Detecting abnormal AWS spend before the monthly invoice arrives
- Correlating logs across multiple services using trace IDs
- Finding infrastructure drift outside Terraform
- Validating secret rotation at the application level
- Automatically rolling back slow deployments before users complain

By the end of this handbook, you'll be able to build small scripts that help you notice when something is wrong in a system, even when the tools say everything is fine.

The scripts are intentionally small. The important part is the operational thinking behind them like what signal the script measures, what failure mode it can detect, and what assumptions the platform is making underneath.

Each use case includes a runnable demo environment, the complete script, a breakdown of the system behaviour involved, and an intentional failure you can trigger yourself.

If you're new to this workflow, start with use case 1 and work forward. The later sections build on the same pattern: automation is useful when it verifies reality, not just process completion.

---

## Prerequisites

Before you start, set up the following:

- **Python 3.8 or higher** – check with `python3 --version`
- **A Python virtual environment** – create one before installing anything:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-linux"/>

```sh
python3 -m venv venv
source venv/bin/activate  
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

This keeps your installed packages isolated from your system Python and prevents permission errors on shared machines.

- **pip** – Python's package installer, included with Python
- **AWS CLI** configured with a working profile – a free-tier AWS account is enough for use cases 1, 3, and 4. Verify it's working with:

```sh
aws sts get-caller-identity
```

- **Docker and Docker Compose**: needed for use cases 2, 4, and 5
- **Kind** (Kubernetes in Docker): a way to run Kubernetes locally for use cases 4 and 5. Install with `brew install kind` on macOS, or follow the [<VPIcon icon="fas fa-globe"/>Kind quick start guide](https://kind.sigs.k8s.io/docs/user/quick-start/)
- **kubectl**: the command-line tool for talking to a Kubernetes cluster. After installing Kind, run `kind create cluster` and kubectl is configured automatically
- **Helm**: a package manager for Kubernetes, needed for use case 5. Install with `brew install helm` or the [<VPIcon icon="iconfont icon-helm"/>Helm install guide](https://helm.sh/docs/intro/install/)
- **Terraform** – needed for use case 3. Install with `brew install terraform` on macOS or follow the [<VPIcon icon="iconfont icon-terraform"/>Terraform install guide](https://developer.hashicorp.com/terraform/install). Check with `terraform version`.
- **bc**: a calculator utility used by the canary watch scripts for floating-point comparison. Install with `brew install bc` on macOS or `apt install bc` on Ubuntu. Run `bc --version` to confirm it is available before starting use case 5.

### Knowledge and Skills

- You should be comfortable reading Python and Bash scripts without needing to write them from scratch.
- You should have basic Linux terminal comfort – navigating directories, running scripts, reading output, and so on.
- You should know what Kubernetes pods and deployments are at a basic level – you don't need deep Kubernetes expertise, as use cases 4 and 5 will introduce the Kubernetes concepts they rely on as they go.
- Familiarity with AWS basics such as what EC2, IAM, and Secrets Manager will help with use cases 1, 3, and 4, while use case 2 runs entirely on your local machine and requires no AWS knowledge at all.
- For use case 3, knowing what Terraform is and what a state file does will help. You don't need to write any Terraform, but understanding that Terraform tracks and what it created is the foundation of the whole use case.

### AWS IAM Permissions Required

The scripts in this article make real AWS API calls. Your IAM user or role needs the following minimum permissions. (If you see an `AccessDenied` error, this is the first place to look.):

| Use Case | Required IAM Permission |
| --- | --- |
| 1 - Cost Anomaly Detection | `ce:GetCostAndUsage` |
| 3 - Drift Detection | `ec2:DescribeSecurityGroups` |
| 4 - Secrets Rotation | `secretsmanager:GetSecretValue`, `secretsmanager:PutSecretValue` |

If you're using a fresh AWS free-tier account with `AdministratorAccess` attached, these permissions are already included and you can skip this step.

If you're on a restricted IAM user, here's how to add them. In the AWS Console, go to IAM, click Users, then click your username. Under the Permissions tab, click Add permissions, then Create inline policy.

Switch to the JSON tab and paste a policy document granting the permissions in the table above, then save it.

If your company manages AWS through an organization and you don't have permission to edit your own IAM policies, ask your administrator to add these permissions to your role.

### Companion GitHub Repository

::: info

All demo projects live at:

<SiteInfo
  name="Osomudeya/devops-scripting-labs"
  desc="Contribute to Osomudeya/devops-scripting-labs development by creating an account on GitHub."
  url="https://github.com/Osomudeya/devops-scripting-labs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cee79d5ac3c94a1e6448dc084ba113ae9556fbd93d25488b224dcbea9b6aa6ed/Osomudeya/devops-scripting-labs"/>

:::

Each use case has its own numbered folder with the complete script, supporting files, a <VPIcon icon="iconfont icon-shell"/>`setup.sh` to prepare the environment, and a <VPIcon icon="iconfont icon-shell"/>`break_it.sh` that injects the specific failure each use case is built around.

Clone the repo before starting:

```sh
git clone https://github.com/irvingtalks/devops-scripting-labs
cd devops-scripting-labs
```

Before running any use case, check that you have everything installed:

```sh
./preflight.sh
```

This checks for every tool the lab needs like Python, AWS CLI, Docker, Kind, Helm, Terraform, and `bc` and tells you exactly what's missing with the install command for each one.

---

## Use Case 1 - Cost Anomaly Detection

**Environment:** AWS Cost Explorer API (read-only, available in all accounts) **Language:** Python

### The Production Problem

A junior engineer is testing a Kubernetes configuration. They spin up a managed node group in AWS (a set of EC2 virtual machines that the Kubernetes cluster uses to run workloads) and configure the cluster autoscaler, which is the Kubernetes component responsible for adding more machines when the cluster needs more capacity. The test goes well, and on Friday afternoon, they forget to tear the environment down.

Over the weekend, the autoscaler keeps provisioning new nodes because the test workloads are still running and requesting resources. By Monday morning you have a node group that has been quietly growing for two and a half days, and nobody noticed until the invoice landed three weeks later.

The script in this use case exists because your AWS bill isn't just a monthly number. It's a time series, and you can monitor it the same way you monitor application metrics. Check it daily, know your baseline, and you catch this kind of event in hours instead of weeks.

### What's Actually Happening at the System Level

**What this is not:** This isn't a finance dashboard. It's an operational anomaly detector and the signal it monitors is cost. But the thing it's actually detecting is unexpected infrastructure behavior such as resources left running, autoscaler events, and forgotten environments.

AWS Cost Explorer is a service that stores your billing data and exposes it through an API, and when you call it, you're running a query against your account's billing records by specifying the time range, the granularity, and how you want results grouped.

One thing to know before you start investigating any flagged cost is that AWS decides which service category to put a charge under, not you. An EBS snapshot copy running across regions might appear under the EC2 line item rather than data transfer, which means a spike in EC2 spend doesn't necessarily mean something went wrong with your EC2 instances. The script flags the spike correctly, but investigating it means asking *"what changed in my infrastructure on this date"* rather than *"what is running in EC2 right now."*

The billing label is a starting point, not a diagnosis.

### Set Up the Demo Environment

Navigate to <VPIcon icon="fas fa-folder-open"/>`01-cost-anomaly/` in the [companion repo (<VPIcon icon="iconfont icon-github"/>`Osomudeya/devops-scripting-labs`)](https://github.com/Osomudeya/devops-scripting-labs). No cluster setup is needed for this use case because the script runs against your AWS account directly, and the only dependency is boto3:

```sh
cd 01-cost-anomaly
pip install boto3
```

Before running against your real account, make sure your AWS credentials are configured. The script uses whatever credentials the AWS CLI is set up with. If you haven't done this yet:

```sh
aws configure
```

This will ask for your AWS Access Key ID, Secret Access Key, default region (use `us-east-1` if unsure), and output format (type `json`). You can find your access keys in the AWS Console under IAM → Users → your username → Security credentials → Create access key.

Your account needs the `ce:GetCostAndUsage` permission also, if you're on a fresh account with AdministratorAccess that's already included.

If you have an AWS account with a few weeks of billing history, you can run the script directly against your real data:

```sh
python detect_cost_anomaly.py
```

Two things to know before running against a real account. First, Cost Explorer data has a 24-hour lag. This means spend from today won't appear until tomorrow, so the script automatically excludes the most recent day to avoid incomplete results.

Second, the script uses unblended costs, which is what you actually pay on a single-account setup. Blended costs are a weighted average used in multi-account organisations sharing reserved capacity and will give different numbers.

If you have a new account or prefer not to use real billing data, the script includes a `--sample` flag that uses built-in data and calls no AWS APIs at all.  
Run this first to see what the output looks like before reading the code:

```sh
python detect_cost_anomaly.py --sample
```

### The Script

```py :collapsed-lines title="detect_cost_anomaly.py"
#!/usr/bin/env python3
# detect_cost_anomaly.py — Use Case 1: Cost Anomaly Detection
# Full explanation of every function is in the article.

import statistics
import sys
from datetime import datetime, timedelta

import boto3

def build_sample_data(days=30):
    """Synthetic Cost Explorer rows for the last `days` (ending yesterday).

    The EC2 spike is placed on yesterday (device local date) so sample output
    always matches the same window as live Cost Explorer mode.
    """
    last_day = datetime.today().date() - timedelta(days=1)
    first_day = last_day - timedelta(days=days - 1)
    anomaly_day_index = days - 1
    results = []
    for i in range(days):
        day = first_day + timedelta(days=i)
        d = i + 1
        results.append(
            {
                "TimePeriod": {
                    "Start": str(day),
                    "End": str(day + timedelta(days=1)),
                },
                "Groups": [
                    {
                        "Keys": ["Amazon EC2"],
                        "Metrics": {
                            "UnblendedCost": {
                                "Amount": str(
                                    round(
                                        18.50
                                        if i == anomaly_day_index
                                        else 1.10 + (d % 3) * 0.10,
                                        2,
                                    )
                                )
                            }
                        },
                    },
                    {
                        "Keys": ["Amazon S3"],
                        "Metrics": {
                            "UnblendedCost": {
                                "Amount": str(round(0.04 + (d % 5) * 0.01, 2))
                            }
                        },
                    },
                    {
                        "Keys": ["Amazon RDS"],
                        "Metrics": {
                            "UnblendedCost": {
                                "Amount": str(round(0.85 + (d % 4) * 0.05, 2))
                            }
                        },
                    },
                ],
            }
        )
    return results, str(last_day)


def get_daily_costs(days=30):
    ce = boto3.client("ce", region_name="us-east-1")
    end = datetime.today().date() - timedelta(days=1)
    start = end - timedelta(days=days)
    response = ce.get_cost_and_usage(
        TimePeriod={"Start": str(start), "End": str(end)},
        Granularity="DAILY",
        Metrics=["UnblendedCost"],
        GroupBy=[{"Type": "DIMENSION", "Key": "SERVICE"}],
    )
    return response["ResultsByTime"]


def build_service_timeseries(results):
    services = {}
    for day in results:
        date_str = day["TimePeriod"]["Start"]
        for group in day["Groups"]:
            service = group["Keys"][0]
            cost = float(group["Metrics"]["UnblendedCost"]["Amount"])
            if service not in services:
                services[service] = []
            services[service].append({"date": date_str, "cost": cost})
    return services


def detect_anomalies(services, baseline_days=7, multiplier=2.0, recent_days=None):
    """Flag days where cost exceeds prior `baseline_days` average + 2σ.

    Uses a rolling baseline (each day vs the previous week). If `recent_days`
    is set, only returns anomalies on or after today - recent_days.
    """
    cutoff = None
    if recent_days is not None:
        cutoff = datetime.today().date() - timedelta(days=recent_days)

    anomalies = []
    for service, daily in services.items():
        if len(daily) < baseline_days + 1:
            continue
        for i in range(baseline_days, len(daily)):
            day = daily[i]
            day_date = datetime.strptime(day["date"], "%Y-%m-%d").date()
            if cutoff is not None and day_date < cutoff:
                continue
            baseline_costs = [d["cost"] for d in daily[i - baseline_days : i]]
            avg = statistics.mean(baseline_costs)
            if avg < 0.01:
                continue
            try:
                std = statistics.stdev(baseline_costs)
            except statistics.StatisticsError:
                continue
            threshold = avg + (multiplier * std)
            if day["cost"] > threshold:
                anomalies.append(
                    {
                        "service": service,
                        "date": day["date"],
                        "actual": round(day["cost"], 4),
                        "baseline_avg": round(avg, 4),
                        "threshold": round(threshold, 4),
                        "pct_above": round(((day["cost"] - avg) / avg) * 100, 1),
                    }
                )
    return sorted(anomalies, key=lambda x: x["date"])


def parse_args(argv):
    use_sample = "--sample" in argv
    recent_days = None
    for arg in argv[1:]:
        if arg.startswith("--recent-days="):
            recent_days = int(arg.split("=", 1)[1])
    return use_sample, recent_days


def run(use_sample=False, recent_days=None):
    if use_sample:
        results, anomaly_date = build_sample_data()
        print("Running against sample data (--sample mode).")
        print(
            f"This data represents 30 days of billing ending yesterday, "
            f"with a realistic EC2 anomaly on {anomaly_date}.\n"
        )
    else:
        print("Fetching 30 days of daily AWS costs by service...")
        print("Note: today is excluded — Cost Explorer has a 24-hour billing lag.\n")
        results = get_daily_costs(days=30)

    if recent_days is not None:
        since = datetime.today().date() - timedelta(days=recent_days)
        print(
            f"Checking for spikes in the last {recent_days} days only "
            f"(on or after {since}), each vs its prior 7-day average.\n"
        )

    services = build_service_timeseries(results)
    anomalies = detect_anomalies(services, recent_days=recent_days)

    if not anomalies:
        print("No anomalies detected.")
        print("\nNote: this script flags statistical outliers against your own baseline.")
        print("A consistently elevated spend level will not trigger — only sudden increases.")
        return

    print(f"{'=' * 60}")
    print(f"ANOMALIES DETECTED: {len(anomalies)}")
    print(f"{'=' * 60}\n")

    for a in anomalies:
        print(f"Service:      {a['service']}")
        print(f"Date:         {a['date']}")
        print(f"Actual cost:  ${a['actual']}")
        print(f"Baseline avg: ${a['baseline_avg']} (prior 7-day average)")
        print(f"Threshold:    ${a['threshold']}")
        print(f"Overage:      {a['pct_above']}% above baseline")
        print()

    print("=" * 60)
    print("A note on AWS cost attribution:")
    print("The service label in Cost Explorer is assigned by AWS, not by the resource")
    print("that caused the cost. An EC2 spike may be caused by EBS snapshot copies,")
    print("cross-region data transfer, or autoscaling events that AWS categorizes under")
    print("EC2 in billing — not a running EC2 instance you can find in the console.")
    print()
    print("Before investigating the flagged service directly, ask:")
    print("What changed in my infrastructure on or before the flagged date?")
    print("Work backward from the operational change, not forward from the billing label.")


if __name__ == "__main__":
    use_sample, recent_days = parse_args(sys.argv)
    run(use_sample=use_sample, recent_days=recent_days)
```

### How the Script Works

`get_daily_costs` pulls your AWS billing data for the last 30 days.

`build_service_timeseries` takes the raw data from AWS and reorganises it. AWS groups the data by day first, then by service. This function flips that around so each service has its own list of daily costs, which is what the detection step needs to work with.

`detect_anomalies` is where the actual check happens. For each service, it compares each day's spend to the 7 days right before it. If yesterday cost dramatically more than the week before, the script flags it. That's all it does.

`--recent-days=7` means *"only show me anomalies from the last 7 days."* The script still fetches 30 days of data because it needs that history to calculate the comparison, but the results are filtered to the window you care about. This is good for a quick Monday morning check.

`--sample` runs without touching your AWS account at all. It uses built-in fake billing data with a spike baked into yesterday's date so the detection always fires. Use this first to see what the output looks like before connecting it to real data.

### What the Output Looks Like

Running `--sample` (the spike date will show as yesterday's actual date, not a fixed value):

```plaintext :collapsed-lines title="output"
Running against sample data (--sample mode).
30 days of billing ending yesterday, with an EC2 spike on 2026-05-14. ============================================================
ANOMALIES DETECTED: 1
============================================================

Service:      Amazon EC2
Date:         2026-05-14
Actual cost:  $18.5
Baseline avg: $1.2143 (prior 7-day average)
Threshold:    $1.3939
Overage:      1423.4% above baseline

============================================================
A note on AWS cost attribution:
The service label in Cost Explorer is assigned by AWS, not by the resource
that caused the cost. An EC2 spike may be caused by EBS snapshot copies,
cross-region data transfer, or autoscaling events that AWS categorizes under
EC2 in billing - not a running EC2 instance you can find in the console.

Before investigating the flagged service directly, ask:
What changed in my infrastructure on or before the flagged date?
Work backward from the operational change, not forward from the billing label.
```

Your numbers will differ slightly from the above because the sample data generates dates from today dynamically. The spike always shows up on yesterday and the surrounding baseline numbers shift depending on the day you run it.

### The Decision the Script Can't Make for You

The anomaly is on the EC2 line, and the instinct is to go look at running EC2 instances. But as the output warns, the attribution is AWS's choice, not yours.

Before opening the EC2 console, check your deployment history for that date. What was deployed? Was a new environment created? Did an autoscaler event run? Start from the operational change and follow the thread to the billing data, because starting from the billing label and working backward is slower and frequently misleading.

### Break it On Purpose

```sh
# See the spike immediately with no AWS account needed
python detect_cost_anomaly.py --sample

# Run against your real account
python detect_cost_anomaly.py

# Only show anomalies from the last 7 days, good for a quick this-week check
python detect_cost_anomaly.py --recent-days=7

# Combine both flags - sample data filtered to the last 7 days
python detect_cost_anomaly.py --sample --recent-days=7
```

**If your real account returns "No anomalies detected" that's not a failure.** It means your spend has been consistent. A clean account returns clean output. The script is doing exactly what it should.

When a real event happens on your account such as an autoscaler left running, a forgotten environment or an unexpected data transfer, this is what catches it before the invoice does.

---

## Use Case 2 – Log Correlation Across Services

**Environment:** Fully local – Docker Compose, three Python services  
**Language:** Python

### The Production Problem

A user reports that their payment failed. You open your logging tool and search. The auth service logged a successful authentication. The ledger service logged a successful transaction but the notification service which should have sent a payment confirmation email has logged nothing at all.

Two services reported success while one service stay silent. The payment still failed, and you have three logs and no clear answer about where the chain broke.

### What's Actually Happening at the System Level

**What this is not:** This isn't a guide to installing a log aggregation tool. It's about the data structure that makes log correlation possible in the first place and what happens when that structure breaks on one service's error path.

In a system with a single service, debugging is simple: one service, one log file, one timeline. But when a user request passes through multiple services, you need a way to link all the logs together. That link is called a trace ID.

Think of it like a ticket number at a government office. When you walk in, you get a number, say, A247. Every desk that handles your case writes A247 on your file. If something goes wrong, the manager pulls every record with A247 and sees exactly what happened, in order, across every desk. That is a trace ID. One number, shared across every service that touched the request.

In the demo, when a payment comes in, the auth service creates a unique ID for it. Every log line that auth, ledger, and notification write for that payment includes the same ID. When something breaks, you run <VPIcon icon="fa-brands fa-python"/>`correlate.py` with that ID and it finds every related log line across all three services and sorts them by time:

```sh
python correlate.py pay-abc123
```

Here's what those logs look like. Notice that every line has the same `trace_id`:

```json
{"timestamp": "2026-05-01T14:23:01.234Z", "trace_id": "pay-abc123", "service": "auth", "event": "user_authenticated", "level": "INFO", "user_id": "u_789", "duration_ms": 12}
{"timestamp": "2026-05-01T14:23:01.891Z", "trace_id": "pay-abc123", "service": "ledger", "event": "transaction_recorded", "level": "INFO", "amount": 50.0, "currency": "USD"}
{"timestamp": "2026-05-01T14:23:02.103Z", "trace_id": "pay-abc123", "service": "notification", "event": "email_queued", "level": "INFO", "recipient": "user@example.com"}
```

Now here's what breaks it. The notification service hits a timeout connecting to the email provider. The developer who wrote the error handler forgot to include the trace ID, so instead of a proper log line, it writes this:

```plaintext
2026-05-01T14:23:02.415Z ERROR Connection timeout to email provider smtp.example.com:587
```

The error happened, the log line exists. But because it has no `trace_id`, <VPIcon icon="fa-brands fa-python"/>`correlate.py` can't find it.

The notification still appears in the timeline, and you can see `email_send_attempt` – but `email_queued` never follows it.

```plaintext
Timeline — 5 events across 3 service(s):

  [2026-05-15T21:59:00.605307+00:00] [AUTH] [INFO] payment_request_received
  [2026-05-15T21:59:00.606008+00:00] [AUTH] [INFO] user_authenticated
  [2026-05-15T21:59:00.617331+00:00] [LEDGER] [INFO] transaction_recorded
  [2026-05-15T21:59:00.630313+00:00] [NOTIFICATION] [INFO] email_send_attempt
  [2026-05-15T21:59:00.685182+00:00] [AUTH] [INFO] payment_complete
```

The attempt is there but the failure is not. The developer just forgot one field.

![log correlation attempt terminal output - ERROR Connection timeout](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/22b7d7b0-8ae5-4573-bcb0-faaf5d807e8a.png)

### Set Up the Demo Environment

Navigate to <VPIcon icon="fas fa-folder-open"/>`02-log-correlation/` and start the three services:

```sh
cd 02-log-correlation
docker compose up -d
```

This starts the auth, ledger, and notification services. Trigger a payment request to generate some logs:

```sh
./trigger_request.sh
```

![trigger_request.sh terminal output - also showing the traceid](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/06977757-e7fd-43c3-aaca-dbc6d17c951a.png)

The script prints the trace ID it used. Copy the ID and Run the correlation script against it now, before we break anything, to see the full working path:

```sh
python correlate.py pay-5831e1bf
```

You should see something like this (your trace ID will be different but the structure is the same):

```plaintext :collapsed-lines
Loading logs from ./logs/...
Loaded 6 structured log lines.

============================================================
Trace ID: pay-5831e1bf
============================================================

Timeline - 6 events across 3 service(s):

  [2026-05-15T21:42:28.079046+00:00] [AUTH] [INFO] payment_request_received
    service: auth
    user_id: u_789
    amount: 50.0
  [2026-05-15T21:42:28.080718+00:00] [AUTH] [INFO] user_authenticated
    service: auth
    user_id: u_789
    duration_ms: 12
  [2026-05-15T21:42:28.145528+00:00] [LEDGER] [INFO] transaction_recorded
    service: ledger
    user_id: u_789
    amount: 50.0
    currency: USD
  [2026-05-15T21:42:28.210088+00:00] [NOTIFICATION] [INFO] email_send_attempt
    service: notification
    recipient: user@example.com
  [2026-05-15T21:42:28.347893+00:00] [NOTIFICATION] [INFO] email_queued
    service: notification
    recipient: user@example.com
    amount: 50.0
  [2026-05-15T21:42:28.378402+00:00] [AUTH] [INFO] payment_complete
    service: auth
    user_id: u_789
    amount: 50.0
```

![terminal output showing the full payment journey](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/26a0b226-4e3d-4967-a7c6-6d367409fb1d.png)

That's the full payment journey with auth, ledger, notification in the exact order it happened. Now let's look at how the script works.

### The Script

```py :collapsed-lines title="correlate.py"
import json
import os
import sys

SERVICES = ["auth", "ledger", "notification"]
LOG_DIR = "./logs"


def load_logs(log_dir):
    """
    Read each service's log file and parse every line as JSON.
    Lines that fail JSON parsing are printed as warnings.
    They are not silently dropped - a plain-text error line in a service
    that should emit structured logs is itself evidence worth seeing.
    """
    all_lines = []

    for service in SERVICES:
        log_file = os.path.join(log_dir, f"{service}.log")

        if not os.path.exists(log_file):
            print(f"  WARNING: No log file for '{service}' at {log_file}")
            continue

        with open(log_file) as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                try:
                    parsed = json.loads(line)
                    parsed["_source"] = service
                    all_lines.append(parsed)
                except json.JSONDecodeError:
                    # This line exists in the log but cannot be correlated.
                    print(f"  WARNING: {service}.log line {line_num} is not structured JSON:")
                    print(f"           {line[:100]}")
                    print(f"           This line will NOT appear in any trace-based search.")

    return all_lines


def correlate(trace_id, all_lines):
    """
    Find every log line with this trace_id and sort by timestamp.
    The sorted result is the reconstructed timeline of the request.
    """
    matched = [line for line in all_lines if line.get("trace_id") == trace_id]
    matched.sort(key=lambda x: x.get("timestamp", ""))
    return matched


def find_missing_services(matched):
    """
    Check which services produced zero trace-tagged lines for this request.
    A missing service is not just an absence - it is a signal.
    Either the request never reached that service, or an error path swallowed
    the trace ID. Both are worth investigating.
    """
    services_seen = {line["_source"] for line in matched}
    return [s for s in SERVICES if s not in services_seen]


def print_timeline(trace_id, matched, missing):
    print(f"\n{'=' * 60}")
    print(f"Trace ID: {trace_id}")
    print(f"{'=' * 60}")

    if not matched:
        print("\nNo structured log lines found with this trace ID.")
        print("Either the trace ID is wrong, or no service emitted")
        print("a structured log line for this request.")
        return

    services_count = len({line["_source"] for line in matched})
    print(f"\nTimeline - {len(matched)} events across {services_count} service(s):\n")

    for line in matched:
        ts = line.get("timestamp", "unknown")
        service = line.get("_source", "unknown").upper()
        event = line.get("event", "unknown event")
        level = line.get("level", "INFO")
        extras = {k: v for k, v in line.items()
                  if k not in ("timestamp", "trace_id", "event", "level", "_source")}

        print(f"  [{ts}] [{service}] [{level}] {event}")
        for k, v in extras.items():
            print(f"    {k}: {v}")

    if missing:
        print(f"\n{'=' * 60}")
        print("MISSING TELEMETRY")
        print(f"{'=' * 60}")
        print(f"These services produced no trace-tagged events for trace {trace_id}:\n")
        for s in missing:
            print(f"  - {s}")
        print()
        print("This means one of three things:")
        print("  1. The request never reached this service.")
        print("  2. The service received it but an error path swallowed the trace ID,")
        print("     leaving a plain-text log line that trace correlation cannot find.")
        print("  3. This service's log file was not included in this run.")
        print()
        print("Check the raw log file for a plain-text error line around the same timestamp.")
        print("If one exists, that is your root cause - and a structured logging gap to fix.")


def run(trace_id):
    print(f"Loading logs from {LOG_DIR}/...")
    all_lines = load_logs(LOG_DIR)
    print(f"Loaded {len(all_lines)} structured log lines.\n")

    matched = correlate(trace_id, all_lines)
    missing = find_missing_services(matched)
    print_timeline(trace_id, matched, missing)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python correlate.py <trace_id>")
        print("Example: python correlate.py pay-abc123")
        sys.exit(1)
    run(sys.argv[1])
```

### How the Script Works

`load_logs` reads log files from each service. Each line should be JSON. If a line isn't JSON, it prints a warning that usually means an error log is missing a trace ID and can't be tracked.

`correlate` finds all logs that match the given trace ID and sorts them by time. This rebuilds the full request flow across services.

`find_missing_services` checks which services have no logs for that trace ID. This tells you where the request stopped or where the trace ID was lost.

`print_timeline` displays the full request timeline in order. It also shows which services are missing if something didn't log correctly.

One thing worth knowing for when you use this in a real Kubernetes environment:  
in Kubernetes, `kubectl logs` only shows the current running container.  
If a pod restarts, you can use this:

```sh
kubectl logs <pod-name> --previous
```

But this only works for the last restart. Older logs are gone unless you use a logging system like Loki or CloudWatch.

### What the Output Looks Like After Breaking it

The point of this section is to show you what happens when a service fails silently, – when the error exists in the logs but the script can't find it because the developer forgot one field.

.<VPIcon icon="iconfont icon-shell"/>`break_it.sh` forces the notification service to fail when it tries to send an email, and because the error handler was written without a trace ID, the failure gets logged as plain text with no way to tie it back to the original request.

Run it:

```sh
./break_it.sh
```

Then trigger a new request:

```sh
./trigger_request.sh
```

Copy the trace ID it prints, then correlate it:

```sh
python correlate.py pay-xxxxxxxx
```

Here is what you'll see:

```plaintext
Loading logs from ./logs/...
  WARNING: notification.log line 10 is not structured JSON:
           2026-05-15T21:59:00.681583+00:00 ERROR Connection timeout to email
           provider http://mock-email:80/ after 0.001s - failed to send
           confirmation to user@example.com
           This line will NOT appear in any trace-based search.
Loaded 29 structured log lines.

============================================================
Trace ID: pay-6cf69a8c
============================================================

Timeline - 5 events across 3 service(s):

  [2026-05-15T21:59:00.605307+00:00] [AUTH] [INFO] payment_request_received
  [2026-05-15T21:59:00.606008+00:00] [AUTH] [INFO] user_authenticated
  [2026-05-15T21:59:00.617331+00:00] [LEDGER] [INFO] transaction_recorded
  [2026-05-15T21:59:00.630313+00:00] [NOTIFICATION] [INFO] email_send_attempt
  [2026-05-15T21:59:00.685182+00:00] [AUTH] [INFO] payment_complete
```

Look at this carefully. The notification is in the timeline, and it logged `email_send_attempt`. But `email_queued` is missing, which means the email never actually sent and the error that explains why isn't in the timeline at all. It's hiding in the WARNING at the very top, where the script told you it found a line it couldn't parse.

That's the problem: where the attempt is visible but the failure is invisible.

Run `cat logs/notification.log` and scroll to the bottom:

```plaintext title="logs/notification.log"
{"timestamp": "2026-05-15T21:59:00.630313+00:00", "trace_id": "pay-6cf69a8c",
 "service": "notification", "event": "email_send_attempt", ...}
2026-05-15T21:59:00.681583+00:00 ERROR Connection timeout to email provider
http://mock-email:80/ after 0.001s - failed to send confirmation to user@example.com
```

Two lines to note: the first has a trace ID, which the script found and showed in the timeline. The second doesn't – the script flagged it as a warning and skipped it. The error happened 0.075 seconds after the attempt. The log file has both lines. The timeline only has one.

That is what *"invisible failure"* looks like in production. The payment went through. The confirmation email never sent. The error is sitting right there in the log file, `Connection timeout to email provider after 0.001s` but in the correlation output above, the timeline shows `email_send_attempt` and then jumps straight to `payment_complete` with nothing in between: no error, no failure, no gap. It looks like everything worked.

The fix is in <VPIcon icon="fas fa-folder-open"/>`02-log-correlation/services/notification/`<VPIcon icon="fa-brands fa-python"/>`main.py`. Here's the broken error handler:

```py title="02-log-correlation/services/notification/main.py"
except httpx.TimeoutException:
    emit_plain(f"Connection timeout to email provider {EMAIL_PROVIDER_URL}")
    return {"status": "ok"}
```

And here's the fixed version. The only change is passing `req.trace_id` into `emit` instead of calling `emit_plain`:

```py title="02-log-correlation/services/notification/main.py"
except httpx.TimeoutException:
    emit(req.trace_id, "email_timeout", level="ERROR",
         provider=EMAIL_PROVIDER_URL)
    return {"status": "ok"}
```

Once that change is made, the timeout error shows up in the timeline like everything else:

```plaintext
  [2026-05-15T21:59:00.681583+00:00] [NOTIFICATION] [ERROR] email_timeout
    provider: http://mock-email:80/
```

One command, one trace ID, the full picture.

### The Decision the Script Can't Make For You

The correlation script identifies notification as the gap. When you check the raw `notification.log`, you find the plain-text timeout error, that the request reached the service, that authentication and transaction recording both succeeded, but that the email failed.

Whether a notification failure is a payment failure depends entirely on how your system was designed. If notification is a soft dependency, this error shouldn't have surfaced to the user as a payment failure, and something else in your system design is wrong. If it's a hard dependency, the transaction itself should have rolled back. The script found where things broke, but the right response depends on the design.

### Break it On Purpose

1. Run `./break_it.sh` – this switches the notification service to a mode where its error handler drops the trace ID
2. Run `./trigger_request.sh` to generate a new payment request and get a new trace ID
3. Run `python correlate.py <new trace ID>` – the notification will be missing from the timeline
4. Run `cat logs/notification.log` – the timeout error is right there, without a trace ID, invisible to the script

---

## Use Case 3 - Infrastructure Drift Detection

**Environment:** AWS free tier (one security group) + Terraform  
**Language:** Python

### The Production Problem

Your Terraform plan shows no changes. Your deployment is behaving differently than it did yesterday, and when you ask around, someone eventually remembers: a colleague made a quick manual change to a security group in the AWS console last week to unblock a staging test. They meant to go back and apply it through Terraform but they forgot.

Your Terraform state file and your actual AWS infrastructure have been quietly disagreeing ever since. Not that anything broke loudly or an alert fired. Terraform wouldn't even know unless someone ran `terraform plan` to check, and in this scenario, nobody did.

This is called infrastructure drift, and it's far more common than most teams want to admit.

### What's Actually Happening at the System Level

**What this is not:** This isn't the same as running `terraform plan`. A plan shows you what Terraform *would* change. This script shows you what has *already* changed in AWS without Terraform knowing.

The script itself doesn't run any Terraform commands. It reads the state file Terraform already produced. In the demo, Terraform creates that file. In a real environment, it already exists from your normal workflow.

Think of Terraform's state file as a receipt. When Terraform creates a security group, it writes down exactly what it created, the rules, the ports, the CIDRs. That receipt is the state file.

The script compares that receipt against what AWS actually has right now. If someone went into the AWS console and added a rule that isn't on the receipt, the script flags it as drift.

The blind spot is that, if someone creates a completely new security group in the console and never uses Terraform at all, there's no receipt for it. The script can't compare something it has never seen. It returns clean, and that group sits in your account undetected.

The demo shows both. First you break a known resource. Then the `--invisible` scenario creates a new one outside Terraform entirely, and the script returns clean even though your account now has an extra security group.

### Set Up the Demo Environment

Navigate to <VPIcon icon="fas fa-folder-open"/>`03-drift-detection/` in the companion repo:

```sh
cd 03-drift-detection
pip install -r requirements.txt
```

Run setup. This uses real Terraform, not a mock:

```sh
./setup.sh
```

This runs `terraform init` and `terraform apply`, which creates a real AWS security group:

![screenshot of AWS dashboard showing security group created](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/d5617704-d04e-40cc-8ca9-aa9d6b806e5e.png)

It also writes a genuine `terraform.tfstate` file. Open it in any text editor if you want to see what Terraform actually produces. It's JSON, it's readable, and it's the real thing.

![screenshot of IDE folder structure showing terraform.tfstate file being created](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3ea8e237-a1d7-43bc-be3d-50dcb6ff4b76.png)

Once setup completes, run the script:

```sh
python detect_drift.py terraform.tfstate
```

You should see something like this, but your actual security group ID will be different:

```plaintext
Loading Terraform state from: terraform.tfstate

Checking: sg-0a1b2c3d4e5f6a7b8

  OK - No drift detected.
```

The lab is alive and both sides of the contract match. Now let's look at what the script is doing.

### The Script

::: info Code Files

<SiteInfo
  name="Osomudeya/devops-scripting-labs"
  desc="Contribute to Osomudeya/devops-scripting-labs development by creating an account on GitHub."
  url="https://github.com/Osomudeya/devops-scripting-labs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cee79d5ac3c94a1e6448dc084ba113ae9556fbd93d25488b224dcbea9b6aa6ed/Osomudeya/devops-scripting-labs"/>

:::

```py :collapsed-lines title="detect_drift.py"
import boto3
import json
import sys


def load_tfstate(path):
    """
    The Terraform state file is plain JSON - open it in any text editor
    and you will see a 'resources' array listing everything Terraform knows about.
    This function reads that file and returns the parsed contents.
    """
    with open(path) as f:
        return json.load(f)


def get_security_groups_from_state(tfstate):
    """
    Walk through the resources array and collect every security group entry.
    Each resource has a 'type', a 'name', and an 'instances' array holding
    the attribute values Terraform recorded when it last ran.
    We extract the resource ID and the ingress (inbound) rules.
    """
    resources = {}
    for resource in tfstate.get("resources", []):
        if resource["type"] == "aws_security_group":
            for instance in resource.get("instances", []):
                sg_id = instance["attributes"]["id"]
                resources[sg_id] = {
                    "ingress": instance["attributes"].get("ingress", [])
                }
    return resources


def get_security_group_from_aws(sg_id):
    """
    Call the AWS EC2 API to fetch the live current state of this security group.
    Under the hood, boto3 constructs an authenticated HTTPS request, signs it with
    your AWS credentials, sends it to the EC2 API endpoint in your configured region,
    and parses the response. The response contains far more data than we need -
    we extract only the inbound rules.
    """
    ec2 = boto3.client("ec2")
    response = ec2.describe_security_groups(GroupIds=[sg_id])
    sg = response["SecurityGroups"][0]
    return {"ingress": sg.get("IpPermissions", [])}


def normalize_state_rules(rules):
    """
    Terraform stores ingress rules in its own format.
    We normalize them into a set of tuples for easy comparison.
    Each tuple is: (from_port, to_port, protocol, cidr_block)
    """
    normalized = set()
    for rule in rules:
        for cidr in rule.get("cidr_blocks", []):
            normalized.add((
                rule.get("from_port", 0),
                rule.get("to_port", 0),
                rule.get("protocol", "-1"),
                cidr
            ))
    return normalized


def normalize_aws_rules(rules):
    """
    AWS returns ingress rules in a different format from Terraform's.
    We normalize them into the same tuple shape so the comparison works.
    """
    normalized = set()
    for rule in rules:
        from_port = rule.get("FromPort", 0)
        to_port = rule.get("ToPort", 0)
        protocol = rule.get("IpProtocol", "-1")
        for ip_range in rule.get("IpRanges", []):
            normalized.add((from_port, to_port, protocol, ip_range["CidrIp"]))
    return normalized


def detect_drift(tfstate_path):
    print(f"Loading Terraform state from: {tfstate_path}")
    tfstate = load_tfstate(tfstate_path)
    state_sgs = get_security_groups_from_state(tfstate)

    if not state_sgs:
        print("No security groups found in state file. Nothing to compare.")
        return

    drift_found = False

    for sg_id, state_data in state_sgs.items():
        print(f"\nChecking: {sg_id}")

        try:
            aws_data = get_security_group_from_aws(sg_id)
        except Exception as e:
            print(f"  ERROR: Could not fetch {sg_id} from AWS - {e}")
            print(f"  Check your IAM permissions: ec2:DescribeSecurityGroups is required.")
            continue

        state_rules = normalize_state_rules(state_data["ingress"])
        aws_rules = normalize_aws_rules(aws_data["ingress"])

        # Rules in AWS that Terraform does not know about (manual additions)
        added_in_aws = aws_rules - state_rules
        # Rules Terraform expects that no longer exist in AWS (manual deletions)
        removed_from_aws = state_rules - aws_rules

        if added_in_aws:
            drift_found = True
            print("  DRIFT - Rules present in AWS but missing from state file:")
            for rule in added_in_aws:
                print(f"    Port {rule[0]}-{rule[1]} | Protocol: {rule[2]} | CIDR: {rule[3]}")

        if removed_from_aws:
            drift_found = True
            print("  DRIFT - Rules in state file but removed from AWS:")
            for rule in removed_from_aws:
                print(f"    Port {rule[0]}-{rule[1]} | Protocol: {rule[2]} | CIDR: {rule[3]}")

        if not added_in_aws and not removed_from_aws:
            print("  OK - No drift detected.")

    print("\n" + "=" * 60)
    if drift_found:
        print("Drift detected. See above for details.")
    else:
        print("No drift detected in monitored resources.")

    print("\nIMPORTANT: This script only checks resources tracked in your state file.")
    print("Resources created manually in AWS without Terraform are invisible to this check.")
    print("A clean output here does not mean your AWS account is clean - it means")
    print("the resources you are watching match what Terraform last recorded.")


if __name__ == "__main__":
    tfstate_path = sys.argv[1] if len(sys.argv) > 1 else "terraform.tfstate"
    detect_drift(tfstate_path)
```

### How the Script Works

`load_tfstate` opens `terraform.tfstate` and reads it. Run `cat terraform.tfstate` after setup and you'll see that it's just a text file and everything Terraform knows about your infrastructure is stored in there.

`get_security_groups_from_state` pulls out every security group from that file, the ID AWS assigned it, and the inbound rules Terraform last recorded. These are the expected values.

`get_security_group_from_aws` calls the AWS API and fetches the same security group's current inbound rules. These are the actual values. The script now has two versions of the same thing.

`normalize_state_rules` and `normalize_aws_rules` exist because Terraform and AWS store the same rule in slightly different formats. These two functions convert both into the same format so the comparison works.

The comparison is the last step. Rules in AWS but not in the state file were added manually. Rules in the state file but not in AWS were deleted manually. The script prints both.

### What the Output Looks Like

A clean run with no drift:

```plaintext
Loading Terraform state from: terraform.tfstate

Checking: sg-0a1b2c3d4e5f6a7b8

  OK - No drift detected.

============================================================
No drift detected in monitored resources.

IMPORTANT: This script only checks resources tracked in your state file.
Resources created manually in AWS without Terraform are invisible to this check.
A clean output here does not mean your AWS account is clean - it means
the resources you are watching match what Terraform last recorded.
```

After injecting drift:

![screenshot of AWS dashboard showing security group inbound rule created](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/61ae6f66-36e4-4e03-8e76-f250e2489dab.png)

```plaintext
Loading Terraform state from: terraform.tfstate

Checking: sg-0a1b2c3d4e5f6a7b8

  DRIFT - Rules present in AWS but missing from state file:
    Port 22-22 | Protocol: tcp | CIDR: 0.0.0.0/0

============================================================
Drift detected. See above for details.
```

![screenshot of terminal output after injecting drift showing "drift detected"](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5744ac0c-2e4f-4015-9b72-a1fa7084587e.png)

### The Decision the Script Can't Make For You

The script finds drift, an inbound rule that Terraform doesn't know about. The instinct is to revert it immediately by running `terraform apply`, but before doing that, ask one question: was this change an emergency hotfix? Someone may have manually opened a port at 2am to restore a broken service while a proper fix was being prepared. And if you revert it automatically, you might undo something that was deliberately placed there to keep a service running.

Drift detection tells you that things are different. It doesn't tell you which version is correct, and investigating that is the work that comes after the script runs.

### Break it On Purpose

1. Run `./break_it.sh`. This adds an SSH inbound rule (port 22) directly via the AWS CLI, simulating a manual console change.
2. Run `python detect_drift.py terraform.tfstate`. The drift appears in the output.
3. Run `./break_it.sh --invisible` to create a brand new security group that's not in the state file at all, then run the script again. It returns clean even though a new resource exists in your account, making the coverage gap visible.
4. Run `./teardown.sh`. When finished, this runs `terraform destroy` to delete the security group and clean up all AWS resources. No charges will remain after this.

---

## Use Case 4 - Secrets Rotation with Zero Downtime

**Environment:** AWS Secrets Manager + local Kind cluster  
**Language:** Python

### The Production Problem

**The goal of this use case:** Kubernetes says a pod is healthy, but your users are getting database errors. The script catches that gap before the users are affected by running one extra check that Kubernetes never runs.

You rotate your database credentials. The pod restarts. `kubectl get pods` shows Running. Ten minutes later, users can't log in.

The rotation worked, but the problem is that Kubernetes checked whether the HTTP server was alive, not whether it could authenticate with the database. Those are two different things.

### What's Actually Happening

**What this is not:** This isn't about how to store secrets in Kubernetes. It's about what happens after the secret is rotated.

When a pod is already running, it holds a pool of open database connections that were authenticated before the rotation happened. Those connections stay alive after the password changes because they were authenticated before the change and the database does not kick them out. But when the pool needs to open a new connection, it uses the current environment credentials, which still have the old password. That new connection fails immediately.

Meanwhile, Kubernetes sees the pod responding to HTTP and marks it Running, so your users are hitting the failures with no indication from the cluster that anything is wrong.

### What the `/healthz/db` Endpoint Does

`/healthz` returns 200 if the HTTP server is alive. That is all Kubernetes checks.

`/healthz/db` opens a fresh database connection using the current credentials and runs `SELECT 1`. If that fails after a rotation, the pod is Running but can't serve database requests. The rotation script calls this endpoint as its final step – the check Kubernetes never runs.

Here's what that looks like in the demo FastAPI application ([code files (<VPIcon icon="iconfont icon-github"/>`Osomudeya/devops-scripting-labs`)](https://github.com/Osomudeya/devops-scripting-labs)):

```py :collapsed-lines titl=e"app.py"
# app.py (relevant section)
import os
import asyncpg
from fastapi import FastAPI, HTTPException

app = FastAPI()

DB_HOST = os.environ.get("DB_HOST", "postgres")
DB_PORT = int(os.environ.get("DB_PORT", "5432"))
DB_NAME = os.environ.get("DB_NAME", "appdb")
DB_USERNAME = os.environ.get("DB_USERNAME", "appuser")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "")

@app.get("/healthz")
async def healthz():
    # Always returns 200 if the HTTP server is alive.
    # This is all the Kubernetes readiness probe checks.
    return {"status": "ok"}

@app.get("/healthz/db")
async def healthz_db():
    # Opens a fresh connection using the current environment credentials.
    # If the password was rotated and this pod has not restarted yet,
    # the environment still has the old password - this connection fails.
    # /healthz above would still return 200. Your users would see errors.
    try:
        conn = await asyncpg.connect(
            host=DB_HOST, port=DB_PORT,
            database=DB_NAME, user=DB_USERNAME, password=DB_PASSWORD,
        )
        await conn.execute("SELECT 1")
        await conn.close()
        return {"status": "ok", "db": "authenticated"}

    except asyncpg.InvalidPasswordError:
        raise HTTPException(
            status_code=503,
            detail=(
                f"Authentication failed for '{DB_USERNAME}'. "
                "Password may have been rotated. "
                "Readiness probe does not check this."
            )
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {str(e)}")
```

The difference between these two endpoints is the entire lesson of this use case.

### Set Up the Demo Environment

Navigate to <VPIcon icon="fas fa-folder-open"/>`04-secrets-rotation/` and run the setup script:

```sh
cd 04-secrets-rotation
./setup.sh
```

This starts a Kind cluster, deploys real PostgreSQL with the `appuser` account already created, deploys the demo FastAPI app connected to it, and creates an initial secret in AWS Secrets Manager.

Once setup completes, install the dependencies:

```sh
pip install boto3 kubernetes
```

Before running the rotation, confirm everything is running:

```sh
kubectl get pods
```

You should see `myapp` and `postgres` pods both in the Running state. If any pod shows Pending or Error, wait 30 seconds and check again. PostgreSQL takes a moment to finish initialising.

You can also verify that the secret was created in AWS. In the console, go to AWS Secrets Manager and look for `myapp/db-credentials`:

![screenshot showing AWS secret created](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/c5d481f7-c938-43f8-91ec-09640c137897.png)

If you prefer the CLI:

```sh
aws secretsmanager get-secret-value --secret-id myapp/db-credentials
```

Once both pods are Running and the secret exists, run the rotation to see the full path:

```sh
python rotate_secret.py
```

**If Step 6 shows FAILED on this first clean run**, it's almost always a timing issue: the app pod restarted successfully but `/healthz/db` ran before the new pod finished establishing its first database connection. Wait 20 seconds and run `python rotate_secret.py` again. If it fails repeatedly, run `kubectl logs deployment/myapp` to see what the app is reporting.

You should see all six steps complete cleanly, ending with:

```plaintext
Rotation complete. Credential verified at the application level.
  AWS Secrets Manager: updated
  PostgreSQL:          updated (ALTER USER)
  Kubernetes Secret:   updated
  Application pod:     restarted, authenticated
```

The lab is alive and the full rotation chain works end to end. Now let's look at what the script is doing.

### The Script 

::: info Code Files

<SiteInfo
  name="Osomudeya/devops-scripting-labs"
  desc="Contribute to Osomudeya/devops-scripting-labs development by creating an account on GitHub."
  url="https://github.com/Osomudeya/devops-scripting-labs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cee79d5ac3c94a1e6448dc084ba113ae9556fbd93d25488b224dcbea9b6aa6ed/Osomudeya/devops-scripting-labs"/>

:::

```py :collapsed-lines title="rotate_secret.py"
import boto3
import base64
import json
import subprocess
import sys
from kubernetes import client, config


def get_current_secret(secret_name):
    """
    Fetch the current credential from AWS Secrets Manager.
    The secret is stored as a JSON string with 'username' and 'password' fields.
    """
    sm = boto3.client("secretsmanager")
    response = sm.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])


def rotate_in_aws(secret_name, username, new_password):
    """
    Write the new credential to AWS Secrets Manager.
    put_secret_value creates a new version - the previous version is
    not deleted immediately, giving you a short rollback window.
    """
    sm = boto3.client("secretsmanager")
    new_value = json.dumps({"username": username, "password": new_password})
    sm.put_secret_value(SecretId=secret_name, SecretString=new_value)
    print("  [AWS] Secret updated in Secrets Manager.")


def update_kubernetes_secret(namespace, k8s_secret_name, username, new_password):
    """
    Patch the Kubernetes Secret object with the new credential values.
    Kubernetes requires secret data to be base64-encoded - this is encoding,
    not encryption. Anyone with access to the Secret object can decode the values.
    Real encryption at rest requires separate etcd encryption configuration.
    """
    config.load_kube_config()
    v1 = client.CoreV1Api()

    secret_data = {
        "username": base64.b64encode(username.encode()).decode(),
        "password": base64.b64encode(new_password.encode()).decode()
    }

    v1.patch_namespaced_secret(
        name=k8s_secret_name,
        namespace=namespace,
        body={"data": secret_data}
    )
    print(f"  [K8s] Kubernetes Secret '{k8s_secret_name}' updated.")


def rolling_restart(namespace, deployment_name):
    """
    Trigger a rolling restart of the deployment.
    Rolling restart means Kubernetes creates one new pod, waits for it to pass
    its readiness probe, then terminates one old pod - and repeats until all
    pods have been replaced. Availability is preserved throughout.
    This is very different from deleting all pods at once.
    """
    result = subprocess.run(
        ["kubectl", "rollout", "restart",
         f"deployment/{deployment_name}", "-n", namespace],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise RuntimeError(f"Rolling restart failed: {result.stderr}")
    print(f"  [K8s] Rolling restart triggered for '{deployment_name}'.")


def wait_for_rollout(namespace, deployment_name, timeout=120):
    """
    Block until the rolling restart finishes or times out.
    'Finished' means all new pods are Running and their readiness probes passed.
    This does NOT mean the application can authenticate with the new credential.
    That is what verify_credential checks next.
    """
    print(f"  [K8s] Waiting for rollout (timeout: {timeout}s)...")
    result = subprocess.run(
        ["kubectl", "rollout", "status",
         f"deployment/{deployment_name}",
         "-n", namespace,
         f"--timeout={timeout}s"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        raise RuntimeError(f"Rollout did not complete: {result.stderr}")
    print("  [K8s] Rollout complete. All pods report Ready.")


def verify_credential(namespace, deployment_name):
    """
    This is the check the readiness probe does not make.
    We exec into the running pod and call /healthz/db - an endpoint that
    makes an actual authenticated query to the database.
    If this passes: the credential is working at the application level.
    If this fails after the readiness probe passed: the contract mismatch is confirmed.
    The pod is Running. The application cannot serve database requests.
    """
    print("  [Verify] Running post-rotation credential check...")

    result = subprocess.run(
        ["kubectl", "get", "pods", "-n", namespace,
         "-l", f"app={deployment_name}",
         "-o", "jsonpath={.items[0].metadata.name}"],
        capture_output=True, text=True
    )
    pod_name = result.stdout.strip()

    if not pod_name:
        print("  [Verify] ERROR: No running pod found for this deployment.")
        return False

    verify = subprocess.run(
        ["kubectl", "exec", pod_name, "-n", namespace,
         "--", "curl", "-sf", "http://localhost:8000/healthz/db"],
        capture_output=True, text=True
    )

    if verify.returncode != 0:
        print("  [Verify] FAILED - Pod is Running but database authentication failed.")
        print("           The readiness probe validated HTTP reachability.")
        print("           The application cannot authenticate with the new credential.")
        print("           These are two different contracts. Only one was checked automatically.")
        return False

    print("  [Verify] PASSED - Application confirmed it can authenticate with the new credential.")
    return True


def rotate(secret_name, new_password, namespace, k8s_secret_name, deployment_name):
    print("\n[Step 1/6] Reading current secret from AWS Secrets Manager...")
    current = get_current_secret(secret_name)
    username = current["username"]

    print("[Step 2/6] Updating AWS Secrets Manager...")
    rotate_in_aws(secret_name, username, new_password)

    print("[Step 3/6] Rotating password at the database level (ALTER USER)...")
    rotate_postgres_password(namespace, new_password)

    print("[Step 4/6] Updating Kubernetes Secret object...")
    update_kubernetes_secret(namespace, k8s_secret_name, username, new_password)

    print("[Step 5/6] Triggering rolling restart...")
    rolling_restart(namespace, deployment_name)
    wait_for_rollout(namespace, deployment_name)

    print("[Step 6/6] Verifying the new credential works at the application level...")
    success = verify_credential(namespace, deployment_name)

    print("\n" + "=" * 60)
    if success:
        print("Rotation complete. Credential verified at the application level.")
    else:
        print("Rotation incomplete. Readiness probe passed but credential verification failed.")
        print("Recommended action: force-restart all pods to flush the connection pool,")
        print("or investigate the database session timeout configuration.")
        sys.exit(1)


if __name__ == "__main__":
    import secrets as _secrets
    rotate(
        secret_name="myapp/db-credentials",
        new_password=_secrets.token_urlsafe(16),
        namespace="default",
        k8s_secret_name="db-credentials",
        deployment_name="myapp"
    )
```

### How the Script Works

`get_current_secret` reads the current credential from AWS Secrets Manager so the script knows the username before it generates a new password.

`rotate_in_aws` writes the new credential to Secrets Manager. It creates a new version rather than overwriting the old one, so you have a short window to roll back if something goes wrong.

`_pg_password_literal` and `rotate_postgres_password` handle the step that most rotation scripts skip, which is actually changing the password inside PostgreSQL. This is done by running `ALTER USER appuser PASSWORD '...'` directly on the live PostgreSQL pod. Before this step, the database still accepts the old password. After this step, it does not.

`update_kubernetes_secret` writes the new password into the Kubernetes Secret so that any new pod that starts will get the new credential from the beginning.

`rolling_restart` and `wait_for_rollout` restart the application pods one at a time so the deployment stays available throughout. When this step completes, all pods are Running and their readiness probes have passed – but keep in mind that "Running" only means `/healthz` returned 200, which is exactly the problem this use case is about.

`verify_credential` is the extra step Kubernetes never runs. It reaches inside the new pod and calls `/healthz/db`, which opens a real database connection with the credentials in the pod's current environment. If this passes, the rotation is genuinely complete. If this fails after the readiness probe passed, you have confirmed the gap: the pod looks healthy but can't serve database requests.

### What the Output Looks Like

Successful rotation:

```plaintext
[Step 1/6] Reading current secret from AWS Secrets Manager...
[Step 2/6] Updating AWS Secrets Manager...
  [AWS] Secrets Manager updated.
[Step 3/6] Rotating password at the database level (ALTER USER)...
  [DB]  Running ALTER USER on PostgreSQL...
  [DB]  Password changed at the database level.
        New connections now require the new password.
        Existing pool connections remain valid until they close.
[Step 4/6] Updating Kubernetes Secret object...
  [K8s] Kubernetes Secret 'db-credentials' updated.
[Step 5/6] Triggering rolling restart...
  [K8s] Rolling restart triggered for 'myapp'.
  [K8s] Waiting for rollout (timeout: 120s)...
  [K8s] Rollout complete. All pods report Ready.
[Step 6/6] Verifying the new credential works at the application level...
  [Verify] Running post-rotation credential check...
  [Verify] PASSED - Application confirmed it can authenticate with the new credential.

============================================================
Rotation complete. Credential verified at the application level.
  AWS Secrets Manager: updated
  PostgreSQL:          updated (ALTER USER)
  Kubernetes Secret:   updated
  Application pod:     restarted, authenticated
```

The lab is alive and the full rotation chain works end to end.

Before you break anything, confirm the pod is healthy:

```sh
kubectl get pods
```

You should see `myapp` in Running state. That is the baseline: everything working as expected. Now let's break it.

![terminal screenshot showing output of 'kubectl get pods"](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/caabd892-562a-40f4-81c1-2c59fd15240b.png)

### Break it On Purpose

#### Step 1: Desync the DB

```sh
./break_it.sh
```

This runs `ALTER USER` directly on PostgreSQL with a wrong password. The K8s Secret still has the old password, so the pod's environment and the database are now out of sync.

#### Step 2: Check what Kubernetes sees

```sh
kubectl exec deployment/myapp -- curl -s http://localhost:8000/healthz
```

You will see `{"status":"ok"}`. The pod is still showing Ready in `kubectl get pods`. Kubernetes has no idea anything is wrong – that's the contract gap made visible in your terminal.

#### Step 3: Check what your users experience

```sh
kubectl exec deployment/myapp -- curl -s http://localhost:8000/healthz/db
```

You'll see a `503` error. Fresh database connections are failing. Your users are already seeing this.

#### Step 4: See the mixed pattern (optional)

```sh
./load_test.sh
```

Some requests succeed because they hit old pool connections that were authenticated before the break. Some fail because they need a fresh connection. The pod looks healthy, but half your traffic is failing.

#### Step 5: Run the rotation script

```sh
python rotate_secret.py
```

This time, Step 6 catches the failure. Here's what you'll see:

```plaintext
[Step 5/6] Triggering rolling restart...
  [K8s] Rollout complete. All pods report Ready.
[Step 6/6] Verifying the new credential works at the application level...
  [Verify] Running post-rotation credential check...
  [Verify] FAILED - Pod is Running but database authentication failed.
           The readiness probe validated HTTP reachability.
           The application cannot authenticate with the new credential.
           These are two different contracts. Only one was checked automatically.

============================================================
Rotation incomplete. Readiness probe passed but credential verification failed.
```

The pod is Running and shows Ready in `kubectl get pods`. The rotation script says the credential is broken. That's the contract gap visible in your terminal, caught before your users hit it.

::: important The lesson

`/healthz` tells you the HTTP server is alive. `/healthz/db` tells you the application can actually connect to the database. Kubernetes only checks the first one unless you add a database probe. The rotation script adds that check at the end of every rotation so you catch the failure before your users do.

:::

### The Decision the Script Can't Make For You

The verification failed, the pod is Running, and requests to the database are failing. You have two options:

1. force-restart all pods at once to flush the connection pool (which is faster but causes a brief capacity reduction), or
2. wait for old sessions to expire naturally (which avoids downtime but leaves requests failing intermittently until the pool cycles).

The script found the problem, but deciding what to do next belongs to an engineer who knows the system.

### Teardown

```sh
./teardown.sh
```

---

## Use Case 5 - Automated Canary Rollback Trigger

**Environment:** Fully local – Kind, Prometheus via Helm  
**Language:** Bash

### What This Use Case Does and Why it Matters

This use case runs a script that watches your new deployment and automatically rolls it back if something goes wrong, before your users flood your support queue.

This matters in production because, when you ship a new version, you don't send all traffic to it immediately. You send a small slice, say 20% to the new version while 80% still goes to the old one. If the new version is broken, only 20% of users are affected and you can roll back before the damage spreads. But the rollback only works if you're watching the right things.

**The takehome:** Two scripts watch the same failing canary. One reports everything is fine. The other fires the rollback. The only difference is what they measure. Your automation is only as good as what it watches.

**What to watch for:** <VPIcon icon="iconfont icon-shell"/>`canary_watch_v1.sh` watches errors only and stays silent while the canary is slow. <VPIcon icon="iconfont icon-shell"/>`canary_watch_v2.sh` watches errors AND response time and fires the rollback. The difference between them is the lesson.

**What this is not:** This isn't a guide to canary deployments. It's about what your monitoring misses when it only watches one signal.

### How it Works

Three things run in the cluster: the stable app (three pods, handles most traffic), the canary app (one pod, handles a small slice), and Prometheus (collects response times and error counts from both every 15 seconds).

The watch script asks Prometheus every 15 seconds: *"Is the canary behaving normally?"* If the answer is no for three checks in a row, it rolls back the canary automatically.

The question is that what does *"behaving normally"* mean? That is the entire use case.

![terminal screenshot showing output result of 'kubectl get pods"](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/204f992e-44c2-4404-a6ff-f2279ea23aeb.png)

### Set Up the Demo Environment

Navigate to <VPIcon icon="fas fa-folder-open"/>`05-canary-rollback/` and run:

```sh
cd 05-canary-rollback
./setup.sh
```

Setup takes a few minutes. It installs Prometheus, deploys both versions of the demo app, and starts a load generator pod that sends continuous traffic to both so Prometheus always has data.

When setup finishes, confirm everything is running:

```sh
kubectl get pods
# 
# NAME                                                   READY   STATUS    RESTARTS   AGE
# load-generator-68c59698b7-kws2l                        1/1     Running   0          4m54s
# myapp-canary-6d6979c66f-g9lgw                          1/1     Running   0          32s
# myapp-stable-6bcf994fc4-b4k9l                          1/1     Running   0          4m55s
# myapp-stable-6bcf994fc4-ndhxc                          1/1     Running   0          4m55s
# myapp-stable-6bcf994fc4-z97kx                          1/1     Running   0          4m55s
# prometheus-kube-prometheus-operator-59b847d96c-mp72s   1/1     Running   0          5m58s
# prometheus-prometheus-kube-prometheus-prometheus-0     2/2     Running   0          5m1s
```

Three stable pods, one canary pod, one load generator, Prometheus running. The lab is alive.

**Wait 60 seconds before running anything else.** Prometheus needs time to scrape the first metrics from the pods. If you skip this, the watch scripts return empty data with no explanation.

### Three Terminal Windows

You need three separate command prompts running at the same time.

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>

open Terminal and press <kbd>⌘</kbd>+<kbd>T</kbd> twice. You now have three tabs, each an independent terminal.  

@tab <VPIcon icon="fa-brands fa-linux"/>

press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> in most terminal apps, or right-click and choose "Open new tab."

:::

Label them Terminal 1 for the watch script, Terminal 2 for injecting failures, Terminal 3 for watching latency.

### The Scripts

#### Version 1

watches errors only ([code here (<VPIcon icon="iconfont icon-github"/>`Osomudeya/devops-scripting-labs.git`)](https://github.com/Osomudeya/devops-scripting-labs.git))

```sh :collapsed-lines title="canary_watch_v1.sh"
#!/usr/bin/env bash
PROMETHEUS="http://localhost:9090"
DEPLOYMENT="myapp-canary"
NAMESPACE="default"
ERROR_THRESHOLD="0.05"
CHECK_INTERVAL=15
STRIKE_LIMIT=3

strikes=0

echo "Canary monitor running (v1 - error rate only)."
echo "Rollback triggers if error rate exceeds \({ERROR_THRESHOLD} for \){STRIKE_LIMIT} checks."
echo ""

while true; do
    ts=$(date '+%Y-%m-%dT%H:%M:%S')

    error_query='sum(rate(http_requests_total{app="myapp-canary",status=~"5.."}[1m])) / sum(rate(http_requests_total{app="myapp-canary"}[1m]))'

    error_rate=\((curl -sf "\){PROMETHEUS}/api/v1/query" \
        --data-urlencode "query=${error_query}" | \
        python3 -c "
import sys, json
d = json.load(sys.stdin)
result = d['data']['result']
print(result[0]['value'][1] if result else '0')
" 2>/dev/null)

    error_rate=${error_rate:-0}
    above=\((echo "\)error_rate > $ERROR_THRESHOLD" | bc -l)

    echo "[\(ts] error_rate=\){error_rate} | threshold=\({ERROR_THRESHOLD} | breach=\)([ "$above" = "1" ] && echo YES || echo NO)"

    if [ "$above" = "1" ]; then
        strikes=$((strikes + 1))
        echo "  Strike \({strikes}/\){STRIKE_LIMIT}"
        if [ "\(strikes" -ge "\)STRIKE_LIMIT" ]; then
            echo "  ROLLBACK TRIGGERED"
            kubectl rollout undo deployment/"\({DEPLOYMENT}" -n "\){NAMESPACE}"
            exit 0
        fi
    else
        strikes=0
    fi

    sleep "${CHECK_INTERVAL}"
done
```

#### Version 2: watches error rate AND response time

```sh :collapsed-lines title="canary_watch_v2.sh"
#!/usr/bin/env bash
PROMETHEUS="http://localhost:9090"
DEPLOYMENT="myapp-canary"
NAMESPACE="default"
ERROR_THRESHOLD="0.05"
LATENCY_THRESHOLD="2.0"
CHECK_INTERVAL=15
STRIKE_LIMIT=3

strikes=0

echo "Canary monitor running (v2 - error rate + P99 latency)."
echo "Error threshold: \({ERROR_THRESHOLD} | Latency P99 threshold: \){LATENCY_THRESHOLD}s"
echo ""

while true; do
    ts=$(date '+%Y-%m-%dT%H:%M:%S')

    error_query='sum(rate(http_requests_total{app="myapp-canary",status=~"5.."}[1m])) / sum(rate(http_requests_total{app="myapp-canary"}[1m]))'
    error_rate=\((curl -sf "\){PROMETHEUS}/api/v1/query" \
        --data-urlencode "query=${error_query}" | \
        python3 -c "
import sys, json
d = json.load(sys.stdin)
result = d['data']['result']
print(result[0]['value'][1] if result else '0')
" 2>/dev/null)

    latency_query='histogram_quantile(0.99, sum(rate(http_request_duration_seconds_bucket{app="myapp-canary"}[1m])) by (le))'
    latency=\((curl -sf "\){PROMETHEUS}/api/v1/query" \
        --data-urlencode "query=${latency_query}" | \
        python3 -c "
import sys, json
d = json.load(sys.stdin)
result = d['data']['result']
print(result[0]['value'][1] if result else '0')
" 2>/dev/null)

    error_rate=${error_rate:-0}
    latency=${latency:-0}

    error_breach=\((echo "\)error_rate > $ERROR_THRESHOLD" | bc -l)
    latency_breach=\((echo "\)latency > $LATENCY_THRESHOLD" | bc -l)

    triggered_by=""
    [ "\(error_breach" = "1" ] && triggered_by="error_rate(\){error_rate})"
    [ "\(latency_breach" = "1" ] && triggered_by="\){triggered_by:+\({triggered_by}, }latency_p99(\){latency}s)"

    echo "[\(ts] error_rate=\){error_rate} | latency_p99=\({latency}s | breach=\){triggered_by:-none}"

    if [ "\(error_breach" = "1" ] || [ "\)latency_breach" = "1" ]; then
        strikes=$((strikes + 1))
        echo "  Strike \({strikes}/\){STRIKE_LIMIT} | Triggered by: ${triggered_by}"
        if [ "\(strikes" -ge "\)STRIKE_LIMIT" ]; then
            echo ""
            echo "  ROLLBACK TRIGGERED"
            echo "  Signal: ${triggered_by}"
            kubectl rollout undo deployment/"\({DEPLOYMENT}" -n "\){NAMESPACE}"
            exit 0
        fi
    else
        strikes=0
    fi

    sleep "${CHECK_INTERVAL}"
done
```

### How the Scripts Work

The `error rate query` asks Prometheus: *"What fraction of requests to the canary returned an error in the last minute?"* A result of `0.0` means no errors. A result of `0.06` means 6% of requests are failing, above the 5% threshold. You see this in the output as:

```plaintext
error_rate=0.06 | threshold=0.05 | breach=YES
```

The `latency query` asks: *"How slow is the slowest 1% of requests to the canary right now?"* A result of `5.234` means 1 in every 100 requests is taking over 5 seconds. You see this as:

```plaintext
latency_p99=5.234s | breach=latency_p99(5.234s)
```

V1 only runs the first query. V2 runs both. Same canary, same problem, different answers.

The three-strike rule means a single bad check doesn't trigger a rollback – three in a row does. The tradeoff is 45 seconds (three checks at 15 seconds each) of exposure before the rollback fires.

When three strikes hit, the watch script itself runs:

```sh
kubectl rollout undo deployment/myapp-canary -n default
```

That one line is what triggers the rollback. It lives inside <VPIcon icon="iconfont icon-shell"/>`canary_watch_v2.sh` and runs automatically – you don't have to do anything. The script detects, decides, and acts.

### Break it On Purpose

**In Terminal 1**, start the v1 monitor:

```sh
./canary_watch_v1.sh
```

You will see this repeating every 15 seconds:

```plaintext
Canary monitor running (v1 - error rate only).
Rollback triggers if error rate exceeds 0.05 for 3 checks.

[2026-05-17T11:53:12] error_rate=0 | threshold=0.05 | breach=NO
[2026-05-17T11:53:27] error_rate=0 | threshold=0.05 | breach=NO
[2026-05-17T11:53:42] error_rate=0 | threshold=0.05 | breach=NO
```

`breach=NO` means the canary looks healthy. Leave this running and move to Terminal 2. **In Terminal 2**, inject latency into the canary:

```sh
./break_it.sh
```

This makes every request to the canary take 5 seconds. Requests still return 200 – no errors, just slowness. You will see:

```plaintext
Injecting latency into the canary deployment...
deployment "myapp-canary" successfully rolled out
Latency injection is active.

The canary pod is Running and passing its readiness probe.
Every request to the canary now takes 5 seconds.
Error rate: 0%   |   P99 latency: ~5s
```

Now look back at Terminal 1. The v1 monitor keeps printing `breach=NO`. The canary is taking 5 seconds per request and your monitoring says everything is fine. That's the failure.

**In Terminal 3**, see what your users are actually experiencing:

```sh
./check_latency.sh
#
# TIMESTAMP                   STABLE (ms)   CANARY (ms)   STATUS
# ---------                 ----------- ----------- ------
# 2026-05-17T11:55:14         18ms          5008ms        CANARY DEGRADED
# 2026-05-17T11:55:20         7ms           5008ms        CANARY DEGRADED
# 2026-05-17T11:55:27         6ms           5008ms        CANARY DEGRADED
```

Stable is responding in 6–18 milliseconds. Canary is taking over 5 seconds. Users on the canary are waiting 5 seconds for every page load. The v1 monitor in Terminal 1 still says `breach=NO`.

This is the lesson: the monitoring and the user experience are completely disconnected. The script isn't broken. It's watching the wrong thing.

Now let's see the fix. Press <kbd>Ctrl</kbd>+<kbd>C</kbd> in Terminal 1 to stop v1. Start v2 in the same terminal:

```sh
./canary_watch_v2.sh
```

In Terminal 2, re-inject the latency:

```sh
./break_it.sh
```

Watch Terminal 1. V2 catches the latency and fires the rollback after three strikes:

```plaintext
Canary monitor running (v2 - error rate + P99 latency).
Error threshold: 0.05 | Latency P99 threshold: 2.0s

[2026-05-15T14:30:00] error_rate=0.0 | latency_p99=0.082s | breach=none
[2026-05-15T14:30:15] error_rate=0.0 | latency_p99=5.234s | breach=latency_p99(5.234s)
  Strike 1/3 | Triggered by: latency_p99(5.234s)
[2026-05-15T14:30:30] error_rate=0.0 | latency_p99=5.891s | breach=latency_p99(5.891s)
  Strike 2/3 | Triggered by: latency_p99(5.891s)
[2026-05-15T14:30:45] error_rate=0.0 | latency_p99=6.102s | breach=latency_p99(6.102s)
  Strike 3/3 | Triggered by: latency_p99(6.102s)

  ROLLBACK TRIGGERED
  Signal: latency_p99(6.102s)

deployment.apps/myapp-canary rolled back
```

The error rate never moved from 0. V2 rolled back anyway because latency crossed the threshold. That's the difference one extra measurement makes.

After the rollback, confirm the canary is dormant but not deleted:

```sh
kubectl rollout history deployment/myapp-canary -n default
#
# REVISION  CHANGE-CAUSE
# 1         <none>
# 2         <none>
```

Two revisions. The rollback scaled revision 2 down to zero and restored revision 1. Nothing was deleted, and you can re-deploy if you decide the rollback was a false alarm.

### The Decision the Script Can't Make For You

V2 rolled back based on latency with zero errors. Before re-deploying, ask if the latency was a real regression in the new code, or a temporary spike, like a database cache warming up on first use? Both produce the same signal. Only you know which is more likely given what changed.

False positive rollbacks slow down deployments and erode confidence in automation. The right thresholds depend on your users and your system.  
What the script enforces is whatever you configure.

### Teardown

```sh
./teardown.sh
```

---

## What You Can Do Now

Each use case in this handbook was a script solving a specific problem the standard tooling wasn't catching. Here's where you land:

You can catch AWS cost spikes before the invoice and you know that the service label is AWS's attribution, not a pointer to what actually caused the cost. Start from what changed operationally, not from the billing label.

You can reconstruct the full timeline of any failed request across multiple services from a single trace ID, and you know that a missing service in that timeline is evidence, not just an absence.

You can detect infrastructure drift by comparing what Terraform believes against what AWS actually contains, and you know that a clean result means the resources Terraform manages are in sync, not that your entire AWS account is clean.

You can validate a secret rotation at the application level, not just at the infrastructure level, and you know the difference between a readiness probe passing and the application actually being able to connect to the database.

You can build a canary rollback trigger that watches the right signals, and you know why watching only error rates can leave a slow, broken deployment running while users wait.

The pattern across all five use cases is the same: the standard tooling reported everything as fine while something was actually broken. The cost script returned clean, the pod showed Running, and the canary showed zero errors – not because the tools were wrong but because they were only checking what was easy to check. These scripts check what the standard tooling skips.

::: info GitHub repo

<SiteInfo
  name="Osomudeya/devops-scripting-labs"
  desc="Contribute to Osomudeya/devops-scripting-labs development by creating an account on GitHub."
  url="https://github.com/Osomudeya/devops-scripting-labs/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f6e34f84baf227b8a4304dd7b07fb208722acfcb976f208b00c5d715ebd2020c/Osomudeya/devops-scripting-labs"/>

:::

I write about DevOps weekly, covering real systems, interview, CV tips and tricks, and real incidents – [<VPIcon icon="fas fa-globe"/>Join the newsletter](https://osomudeya.kit.com/23db7ca59f).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Bash & Python for Real DevOps Automation – Full Handbook with 5 Production Use Cases",
  "desc": "Automation scripts often validate process completion instead of system health. A Kubernetes pod can be running while the application inside it can't authenticate to the database. A Terraform deploymen",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-bash-python-for-real-devops-automation-handbook-with-production-use-cases.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
