---
lang: en-US
title: "How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]"
description: "Article(s) > How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]"
icon: fa-brands fa-aws
category:
  - Python
  - DevOps
  - Kubernetes
  - Amazon
  - AWS
  - Terraform
  - AI
  - LLM
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
  - tf
  - terraform
  - hcl
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]"
    - property: og:description
      content: "How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-govern-ai-generated-infrastructure-with-policy-as-code-and-opa-full-handbook.html
prev: /devops/aws/articles/README.md
date: 2026-09-29
isOriginal: false
author:
  - name: Kayode Adeniyi
    url: https://freecodecamp.org/news/author/mkbadeniyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4208eef0-1dac-4b7d-89d7-28622a4d7825.png
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
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
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
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]"
  desc="Modern models generate syntactically correct code nearly 100% of the time. Veracode's 2026 report puts it plainly: ”Syntax is effectively solved.” That reads like a milestone, but it's the reason you "
  url="https://freecodecamp.org/news/how-to-govern-ai-generated-infrastructure-with-policy-as-code-and-opa-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4208eef0-1dac-4b7d-89d7-28622a4d7825.png"/>

Modern models generate syntactically correct code nearly 100% of the time. Veracode's 2026 report puts it plainly: "Syntax is effectively solved."

That reads like a milestone, but it's the reason you have a problem.

The [<VPIcon icon="fas fa-globe"/>same report](https://veracode.com/blog/2026-genai-code-security-report-ai-risk/) tested more than a hundred models and found the average security pass rate at 56%, "barely changed from 55% in the first report", with roughly 44% of generation tasks introducing a risky vulnerability.

Functional correctness and security turn out to be separate problems, and only one of them is close to solved.

That result is neither an outlier nor new. At IEEE Security and Privacy in 2022, a team at NYU Tandon ran GitHub Copilot through 89 security-relevant scenarios, generated 1,689 programs, and found [<VPIcon icon="iconfont icon-arxiv"/>roughly 40% of them vulnerable](https://arxiv.org/html/2108.09293) to something on MITRE's CWE Top 25. The paper was later selected as a *Communications of the ACM* research highlight.

In November 2024, Georgetown's Center for Security and Emerging Technology [<VPIcon icon="fas fa-globe"/>evaluated five LLMs](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/) and reported that almost half the snippets they produced contained bugs that could lead to exploitation. Four years, four independent teams, four methodologies, and the same answer each time.

At ACM CCS in 2023, Neil Perry, Megha Srivastava, Deepak Kumar, and Dan Boneh at Stanford [<VPIcon icon="iconfont icon-arxiv"/>put the developers into the experiment](https://arxiv.org/html/2211.03622): 47 participants, five security-related programming tasks, three languages, with 33 given an AI assistant and 14 not. The assisted group wrote significantly less secure code, and was *more* likely to believe the code it wrote was secure.

It's a small study, and it explains why the problem doesn't correct itself: the mechanism that would normally catch this (a developer looking harder at code that worries them) is the exact mechanism the tooling switches off.

Those studies all measure application code. But infrastructure code is the harder case, because a bad security group never fails: it works exactly as written, serving traffic to whoever asks, and the only thing that objects is a person reading a diff.

I can't review that volume by reading it, and neither can anybody else. What I can do is write the rules down in a form a computer checks on every change, which is what Policy as Code means.

In this handbook, I walk you through building that check. We'll point it at a real vulnerable repository, watch the obvious version of it clear five of the nine violations sitting in front of it, and then fix it.

::: info

By the end, you'll know how to:

- Write a Rego policy against the JSON that `terraform show -json` produces.
- Test a policy the way you test application code, with fixtures and a coverage report.
- Build a command-line gate with an exit-code contract that a CI pipeline can trust.
- Block non-compliant workloads at Kubernetes admission time using CEL.
- Have a model write a policy and let `opa check` and your own tests decide whether to keep it.
- Authorise an AI agent's tool calls from the same policy engine.

:::

::: note Prerequisites

You need:

- A terminal and a working `python3` (3.10 or newer).
- `jq`, for reading JSON at the command line.
- About 700 MB of disk, because the AWS Terraform provider is large.
- An Anthropic API key, but only for Step 7. Every other step runs offline.

```sh
mkdir policy-lab && cd policy-lab
python3 -m venv .venv
source .venv/bin/activate
pip install anthropic

curl -L -o opa https://openpolicyagent.org/downloads/v1.20.2/opa_darwin_arm64_static
chmod +x opa && sudo mv opa /usr/local/bin/

curl -L -o tf.zip https://releases.hashicorp.com/terraform/1.14.2/terraform_1.14.2_darwin_arm64.zip
unzip tf.zip && sudo mv terraform /usr/local/bin/
```

On Windows, activate the environment with `.venv\Scripts\activate`, and swap the two download URLs for `opa_windows_amd64.exe` and `terraform_1.14.2_windows_amd64.zip`.

I ran everything below on **OPA 1.20.2**, **Terraform 1.14.2,** and **AWS provider 6.x**, on macOS. The policy syntax is stable across OPA 1.x.

If you're on OPA 0.x, every rule here needs `import rego.v1` added at the top, and I would upgrade instead. The violation counts depend on the AWS provider version only through the shape of the plan JSON, which has been stable since provider 5. 

:::

::: important Key Terms in Plain English

- **Policy as Code**: a rule your organisation has already agreed on, written as a program that takes a proposed change and returns a decision.
- **Rego**: the query language Open Policy Agent evaluates. It's declarative: a rule body is a list of conditions that must all hold.
- **Plan JSON**: the machine-readable description of what Terraform is about to do, produced by `terraform show -json`. This is what the policy reads, so your `.tf` files never reach it.
- **Admission control**: the point inside the Kubernetes API server where an object can be rejected before it's stored.
- **CEL**: Common Expression Language, the small expression language Kubernetes evaluates natively inside the API server, with no webhook to deploy.
- **False clearance**: a resource the policy passed that it should have failed. Nobody ever notices one, so it goes unmeasured unless you go looking for it.

![Diagram titled "Three decision points, three chances to say no", with three rows. The plan time row runs from terraform plan JSON to policy_gate.py to merge or block the PR. The admission time row runs from kubectl apply to ValidatingAdmissionPolicy to admit or reject the Pod. The call time row runs from agent picks a tool to the agent.authz decision to allow, deny or ask a human. Arrows point left to right from ingredient to product, and a caption reads one decision per boundary: CEL inside the API server, Rego either side.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/70640afe-46a8-4e6c-8953-3f97ed98254a.png)

The same judgement happens in three places, and only the middle one is specific to Kubernetes.

:::

---

## Step 1: Fetch Real Infrastructure to Test Against

I didn't want to invent a vulnerable Terraform file, because inventing one means inventing the bug, and then the policy only catches the bug I planted. So I went looking for code somebody else had written and published.

[TerraGoat (<VPIcon icon="iconfont icon-github"/>`bridgecrewio/terragoat`)](https://github.com/bridgecrewio/terragoat) is a deliberately vulnerable Terraform repository published by Bridgecrew. Fetch its EC2 module at a pinned commit:

```sh
SHA=729f8da62c6a85ce4af5ad3d123de97776d954c4
curl -s "https://raw.githubusercontent.com/bridgecrewio/terragoat/$SHA/terraform/aws/ec2.tf" \
  | sed -n '77,96p'
```

```hcl :collapsed-lines
resource "aws_security_group" "web-node" {
  # security group is open to the world in SSH port
  name        = "${local.resource_prefix.value}-sg"
  description = "${local.resource_prefix.value} Security Group"
  vpc_id      = aws_vpc.web_vpc.id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }
```

The comment on line two is TerraGoat's own, and port 22 open to the world is the finding it points at.

TerraGoat's module won't initialise on modern Terraform, because it still declares `type = "string"` in quotes, which Terraform 0.12 deprecated and 1.x rejects. So I lifted the resource into a minimal module of my own, replacing only the two references to TerraGoat's internal locals.

Create `main.tf`:

```hcl :collapsed-lines title="main.tf"
terraform {
  required_version = "&gt;= 1.9"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~&gt; 6.0"
    }
  }
}

# Mock credentials. This configuration is only ever planned, never applied,
# so the provider must not try to reach AWS.
provider "aws" {
  region                      = "us-west-2"
  access_key                  = "mock"
  secret_key                  = "mock"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  skip_region_validation      = true
}

resource "aws_vpc" "web_vpc" {
  cidr_block = "10.0.0.0/16"
}

# Verbatim from bridgecrewio/terragoat, terraform/aws/ec2.tf, commit 729f8da.
# Only the two references to TerraGoat's own locals are replaced with literals.
resource "aws_security_group" "web-node" {
  name        = "terragoat-sg"
  description = "terragoat Security Group"
  vpc_id      = aws_vpc.web_vpc.id

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = [
    "0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = [
    "0.0.0.0/0"]
  }
  depends_on = [aws_vpc.web_vpc]
  tags = {
    git_commit           = "d68d2897add9bc2203a5ed0632a5cdd8ff8cefb0"
    git_file             = "terraform/aws/ec2.tf"
    git_last_modified_at = "2020-06-16 14:46:24"
    git_org              = "bridgecrewio"
    git_repo             = "terragoat"
  }
}
```

Produce the plan JSON:

```sh
terraform init
terraform plan -out=tfplan.binary
terraform show -json tfplan.binary &gt; plan.json
```

The mock credentials matter: `terraform plan` on a create-only configuration never calls AWS, so with `skip_credentials_validation` and its three siblings the provider won't try to authenticate, and nothing is ever applied.

---

## Step 2: Write the Tests Before the Policy

The rule I wanted was: *no security group may expose an administrative port to the public internet.*

That sounds like one line of code, and the tests are where I pin down why it's not. Create <VPIcon icon="fas fa-folder-open"/>`policy/network_test.rego`:

```rego :collapsed-lines title="policy/network_test.rego"
package terraform.network_test

import data.terraform.network

plan(resources) := {"resource_changes": resources}

security_group(ingress) := {
  "address": "aws_security_group.web",
  "type": "aws_security_group",
  "change": {"actions": ["create"], "after": {"ingress": [ingress]}},
}

test_denies_ssh_open_to_the_world if {
  fixture := plan([security_group({
    "from_port": 22,
    "to_port": 22,
    "protocol": "tcp",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 1 with input as fixture
}

# A from_port equality check would miss this. The range check does not.
test_denies_wide_open_port_range if {
  fixture := plan([security_group({
    "from_port": 0,
    "to_port": 65535,
    "protocol": "tcp",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 4 with input as fixture
}

test_denies_ipv6_route_to_the_world if {
  fixture := plan([security_group({
    "from_port": 22,
    "to_port": 22,
    "protocol": "tcp",
    "ipv6_cidr_blocks": ["::/0"],
  })])

  count(network.deny) == 1 with input as fixture
}

test_denies_standalone_ingress_rule if {
  fixture := plan([{
    "address": "aws_vpc_security_group_ingress_rule.ssh",
    "type": "aws_vpc_security_group_ingress_rule",
    "change": {"actions": ["create"], "after": {
      "from_port": 22,
      "to_port": 22,
      "ip_protocol": "tcp",
      "cidr_ipv4": "0.0.0.0/0",
      "cidr_ipv6": null,
    }},
  }])

  count(network.deny) == 1 with input as fixture
}

test_denies_deprecated_standalone_rule if {
  fixture := plan([{
    "address": "aws_security_group_rule.ssh",
    "type": "aws_security_group_rule",
    "change": {"actions": ["create"], "after": {
      "type": "ingress",
      "from_port": 22,
      "to_port": 22,
      "cidr_blocks": ["0.0.0.0/0"],
    }},
  }])

  count(network.deny) == 1 with input as fixture
}

test_allows_ssh_from_a_private_range if {
  fixture := plan([security_group({
    "from_port": 22,
    "to_port": 22,
    "protocol": "tcp",
    "cidr_blocks": ["10.0.0.0/8"],
  })])

  count(network.deny) == 0 with input as fixture
}

test_allows_https_from_the_world if {
  fixture := plan([security_group({
    "from_port": 443,
    "to_port": 443,
    "protocol": "tcp",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 0 with input as fixture
}

# An all-protocols rule opens every port, whatever its port fields say.
# The first version of this test asserted the opposite and hid the bug.
test_denies_all_protocols_rule_open_to_the_world if {
  fixture := plan([security_group({
    "from_port": 0,
    "to_port": 0,
    "protocol": "-1",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 4 with input as fixture
}

# Ports the policy cannot read are reported, never passed.
test_reports_a_world_open_rule_with_unreadable_ports if {
  fixture := plan([security_group({
    "from_port": 22,
    "to_port": null,
    "protocol": "tcp",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 1 with input as fixture
}

test_reports_string_ports if {
  fixture := plan([security_group({
    "from_port": "22",
    "to_port": "22",
    "protocol": "tcp",
    "cidr_blocks": ["0.0.0.0/0"],
  })])

  count(network.deny) == 1 with input as fixture
}

# Unreadable ports on a rule that is not open to the world stay quiet.
test_ignores_unreadable_ports_on_a_private_range if {
  fixture := plan([security_group({
    "from_port": 22,
    "to_port": null,
    "protocol": "tcp",
    "cidr_blocks": ["10.0.0.0/8"],
  })])

  count(network.deny) == 0 with input as fixture
}

# `considered` drives the gate's pass-or-vacuous decision, so it needs
# tests of its own even though it takes no part in the judgement.
test_considers_every_ingress_bearing_type if {
  fixture := plan([
    security_group({}),
    {"address": "aws_vpc_security_group_ingress_rule.a", "type": "aws_vpc_security_group_ingress_rule", "change": {"actions": ["create"], "after": {}}},
    {"address": "aws_security_group_rule.b", "type": "aws_security_group_rule", "change": {"actions": ["create"], "after": {}}},
  ])

  count(network.considered) == 3 with input as fixture
}

test_does_not_consider_unrelated_types if {
  fixture := plan([{
    "address": "aws_vpc.main",
    "type": "aws_vpc",
    "change": {"actions": ["create"], "after": {}},
  }])

  count(network.considered) == 0 with input as fixture
}
```

Here's what that file encodes:

1. `with input as fixture` swaps in a fake plan for one expression, which is how a policy is tested without a cloud account.
2. `test_denies_wide_open_port_range` expects **four** violations, one per administrative port, because an ingress rule describes a range. A `0-65535` rule opens SSH exactly as wide as an explicit port 22 rule while sailing past an equality check.
3. Three tests cover three *other* shapes Terraform uses for the same idea: the IPv6 field, the modern standalone `aws_vpc_security_group_ingress_rule`, and the deprecated `aws_security_group_rule`. I didn't write these first, and Step 9 explains where they came from.
4. The two `test_allows_` cases matter as much as the denials. A policy that rejects everything passes every deny test and is worthless.
5. The last three tests arrived after the policy was already "finished", and Step 9 explains where they came from. An all-protocols rule opens every port whatever its port fields say, and a rule whose ports the policy can't read has to be reported.

---

## Step 3: Write the Policy Until the Tests Pass

Terraform describes ingress in four shapes, so the policy normalises all four into one set and then judges that set once. Create <VPIcon icon="fas fa-folder-open"/>`policy/network.rego`:

```rego :collapsed-lines title="policy/network.rego"
# METADATA
# title: No admin port is reachable from the public internet
# description: |
#   Terraform describes ingress in four different shapes. Each one is
#   normalised into a single `exposures` set first, so the judgement below
#   is written once and a new shape only costs one more helper rule.
#
#   Two things here are deliberate rather than incidental. An all-protocols
#   rule covers every port whatever its port fields say, and a rule whose
#   ports this policy cannot read is reported rather than passed.
package terraform.network

admin_ports := {22, 3389, 3306, 5432}

public_cidrs := {"0.0.0.0/0", "::/0"}

# The AWS provider writes from_port 0 and to_port 0 for an all-protocols
# rule, which opens every port, so the port fields cannot be read literally.
all_protocols := {"-1", "all"}

# Shape 1 and 2: inline ingress blocks, IPv4 and IPv6.
exposures contains exposure if {
  some resource in input.resource_changes
  resource.type == "aws_security_group"
  some ingress in resource.change.after.ingress
  some field in ["cidr_blocks", "ipv6_cidr_blocks"]
  some cidr in object.get(ingress, field, [])
  exposure := {
    "address": resource.address,
    "protocol": object.get(ingress, "protocol", ""),
    "from_port": object.get(ingress, "from_port", null),
    "to_port": object.get(ingress, "to_port", null),
    "cidr": cidr,
  }
}

# Shape 3: the standalone rule the AWS provider has recommended since v5.
exposures contains exposure if {
  some resource in input.resource_changes
  resource.type == "aws_vpc_security_group_ingress_rule"
  some field in ["cidr_ipv4", "cidr_ipv6"]
  cidr := object.get(resource.change.after, field, null)
  is_string(cidr)
  exposure := {
    "address": resource.address,
    "protocol": object.get(resource.change.after, "ip_protocol", ""),
    "from_port": object.get(resource.change.after, "from_port", null),
    "to_port": object.get(resource.change.after, "to_port", null),
    "cidr": cidr,
  }
}

# Shape 4: the deprecated standalone rule, still in most existing estates.
exposures contains exposure if {
  some resource in input.resource_changes
  resource.type == "aws_security_group_rule"
  resource.change.after.type == "ingress"
  some cidr in object.get(resource.change.after, "cidr_blocks", [])
  exposure := {
    "address": resource.address,
    "protocol": object.get(resource.change.after, "protocol", ""),
    "from_port": object.get(resource.change.after, "from_port", null),
    "to_port": object.get(resource.change.after, "to_port", null),
    "cidr": cidr,
  }
}

# The ports a rule really covers. Undefined when the policy cannot tell.
covered_ports(exposure) := [0, 65535] if {
  exposure.protocol in all_protocols
}

covered_ports(exposure) := [exposure.from_port, exposure.to_port] if {
  not exposure.protocol in all_protocols
  is_number(exposure.from_port)
  is_number(exposure.to_port)
}

deny contains msg if {
  some exposure in exposures
  exposure.cidr in public_cidrs

  # A rule covers a port if that port falls inside [from_port, to_port].
  range := covered_ports(exposure)
  some port in admin_ports
  port &gt;= range[0]
  port &lt;= range[1]

  msg := sprintf(
    "%s: ingress rule exposes port %d to %s",
    [exposure.address, port, exposure.cidr],
  )
}

# A rule open to the world whose ports this policy cannot read is reported.
# Passing it would be the policy guessing in the permissive direction.
deny contains msg if {
  some exposure in exposures
  exposure.cidr in public_cidrs
  not covered_ports(exposure)

  msg := sprintf(
    "%s: ingress rule to %s has ports this policy cannot evaluate (%v to %v)",
    [exposure.address, exposure.cidr, exposure.from_port, exposure.to_port],
  )
}

# Addresses this policy knows how to inspect. The gate uses this to tell
# "nothing violated" apart from "nothing examined".
considered contains resource.address if {
  some resource in input.resource_changes
  resource.type in {
    "aws_security_group",
    "aws_vpc_security_group_ingress_rule",
    "aws_security_group_rule",
  }
}
```

Reading that from the top:

1. A rule body in Rego is a conjunction. Every line must hold, and `some ... in` lines iterate, so OPA explores every combination of resource, ingress rule, field, and port.
2. Three separate `exposures` rules define one set between them, which Rego calls an incremental definition. Adding a fifth shape later costs one more block and changes nothing below it.
3. `object.get(ingress, field, [])` returns an empty list when a field is absent, so an IPv4-only rule doesn't error when the policy looks for `ipv6_cidr_blocks`.
4. `covered_ports` is the safety valve here, because an all-protocols rule reports `0` to `0` in the plan while opening every port, so the port fields can't be read literally, and a rule whose ports are null or strings leaves the function undefined, which the second `deny` rule turns into a violation.
5. `considered` isn't part of the judgement. It records which resources this policy can speak about at all, which Step 5 uses to avoid reporting a pass it hasn't earned.

Run it:

```sh
opa test policy
opa check --strict policy
opa fmt --diff policy
#
# PASS: 20/20
```

Add `-v` to `opa test` for a line per test.

`opa check --strict` catches unsafe variables and shadowed imports, while `opa fmt --diff` prints nothing when the formatting is already canonical. OPA formats Rego with tabs. Both belong in CI, ahead of everything else.

The second policy is ownership tagging, so create <VPIcon icon="fas fa-folder-open"/>`policy/tags.rego`:

```rego :collapsed-lines title="policy/tags.rego"
# METADATA
# title: Every managed resource carries ownership tags
# description: |
#   Terraform emits `tags: null` for a resource with no tags at all, so a
#   policy that reaches into `after.tags` skips exactly the resources with
#   the worst tagging. `tags_of` coerces that null to an empty object.
package terraform.tags

required_tags := {"owner", "cost-center", "data-classification"}

# Resource types that genuinely cannot carry tags.
untaggable := {"aws_iam_policy_attachment", "aws_route_table_association"}

in_scope contains resource if {
  some resource in input.resource_changes
  some action in resource.change.actions
  action in {"create", "update"}
  not resource.type in untaggable
}

tags_of(resource) := tags if {
  tags := resource.change.after.tags
  is_object(tags)
} else := {}

deny contains msg if {
  some resource in in_scope
  some tag in required_tags
  value := object.get(tags_of(resource), tag, "")
  trim_space(value) == ""
  msg := sprintf("%s: missing required tag %q", [resource.address, tag])
}

considered contains resource.address if {
  some resource in in_scope
}
```

Here's why those two lines look the way they do:

1. `trim_space(value) == ""` does the check. It has to, because in Rego only `false` and undefined are falsy, so an empty string is truthy. A bare existence check happily accepts `owner = ""`, which is compliance theatre of exactly the kind a tagging policy exists to stop.
2. `tags_of`, with its `else := {}` branch, is the fix for a bug I wrote and only found in Step 9.

---

## Step 4: Point It at the Real Plan

Evaluate one package against the TerraGoat plan:

```sh
opa eval --data policy --input plan.json --format pretty 'data.terraform.network.deny'
#
# [
#   "aws_security_group.web-node: ingress rule exposes port 22 to 0.0.0.0/0"
# ]
```

The policy reports one violation, and stays quiet about port 80. It's open to the world in the same resource, because a public web server is the point of a public web server. A check that flags both is a check people learn to ignore.

Running one command per package doesn't scale, and Rego can aggregate across a namespace in a single query:

```sh
opa eval --data policy --input plan.json --format pretty \
'union({v | v := data.terraform[_].deny})'
#
# [
#   "aws_security_group.web-node: ingress rule exposes port 22 to 0.0.0.0/0",
#   "aws_security_group.web-node: missing required tag \"cost-center\"",
#   "aws_security_group.web-node: missing required tag \"data-classification\"",
#   "aws_security_group.web-node: missing required tag \"owner\"",
#   "aws_vpc.web_vpc: missing required tag \"cost-center\"",
#   "aws_vpc.web_vpc: missing required tag \"data-classification\"",
#   "aws_vpc.web_vpc: missing required tag \"owner\""
# ]
```

`{v | v := data.terraform[_].deny}` is a comprehension that collects the `deny` set from every package under `data.terraform`, and `union` flattens them. Drop a new policy file into that namespace and it's picked up with no change to the command.

---

## Step 5: Turn the Verdict into an Exit Code

A CI gate communicates through its exit status, and conflating two kinds of failure into one code is how a broken pipeline passes for a month. This tool uses the following:

| Code | Verdict | Meaning |
| --- | --- | --- |
| 0 | pass | policies ran, examined resources, found nothing |
| 1 | fail | policies ran and found violations |
| 2 | vacuous | policies ran but examined nothing, so the result means nothing |
| 2 | broken | the tool or its input is unusable |

The fourth row is the one most gates get wrong. If a plan contains no resource any policy knows about, reporting a pass claims an assurance the run can't give. It gets its own verdict name and it doesn't exit 0. Create <VPIcon icon="fa-brands fa-python"/>`policy_gate.py`:

```py :collapsed-lines title="policy_gate.py"
"""Evaluate a Terraform plan against a directory of Rego policies."""

import argparse
import json
import pathlib
import shutil
import subprocess
import sys

PASS, FAIL, BROKEN = 0, 1, 2

DENY_QUERY = "union({v | v := data.terraform[_].deny})"
CONSIDERED_QUERY = "union({v | v := data.terraform[_].considered})"


def die(message: str) -&gt; None:
    print(f"policy-gate: {message}", file=sys.stderr)
    sys.exit(BROKEN)


def load_plan(path: pathlib.Path) -&gt; dict:
    try:
        text = path.read_text()
    except OSError as exc:
        die(f"cannot read {path}: {exc.strerror}")
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        die(f"{path}:{exc.lineno}:{exc.colno}: invalid JSON: {exc.msg}")


def query(opa: str, policy_dirs: list[pathlib.Path], plan: pathlib.Path, expr: str) -&gt; list:
    command = [opa, "eval", "--input", str(plan), "--format", "raw"]
    for directory in policy_dirs:
        command += ["--data", str(directory)]
    command.append(expr)

    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        die(f"opa failed: {result.stderr.strip() or result.stdout.strip()}")
    values = json.loads(result.stdout)
    # A rule that yields anything but strings is a policy bug, and sorting a
    # mixed list would surface it as an unrelated TypeError.
    for value in values:
        if not isinstance(value, str):
            die(f"{expr} produced a {type(value).__name__}; "
                "deny and considered rules must yield strings")
    return values


def main() -&gt; int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--plan", required=True, type=pathlib.Path,
                        help="JSON from `terraform show -json`")
    parser.add_argument("--policy", required=True, nargs="+", type=pathlib.Path,
                        help="one or more directories of .rego files")
    parser.add_argument("--opa", default="opa", help="path to the opa binary")
    args = parser.parse_args()

    if shutil.which(args.opa) is None:
        die(f"{args.opa} is not on PATH")
    for directory in args.policy:
        if not directory.is_dir():
            die(f"{directory} is not a directory")

    plan = load_plan(args.plan)
    if "resource_changes" not in plan:
        die(f"{args.plan} has no resource_changes key; is it a Terraform plan?")

    considered = query(args.opa, args.policy, args.plan, CONSIDERED_QUERY)
    if not considered:
        # Reporting a pass here would claim an assurance the run cannot give.
        print(f"VACUOUS: no policy examined any of the "
              f"{len(plan['resource_changes'])} planned resource(s)", file=sys.stderr)
        return BROKEN

    violations = sorted(query(args.opa, args.policy, args.plan, DENY_QUERY))
    if violations:
        print(f"FAIL: {len(violations)} violation(s) "
              f"across {len(considered)} examined resource(s)", file=sys.stderr)
        for violation in violations:
            print(f"  - {violation}", file=sys.stderr)
        return FAIL

    print(f"PASS: {len(considered)} resource(s) examined, no violations")
    return PASS


if __name__ == "__main__":
    sys.exit(main())
```

Here's what the script does:

1. `argparse` marks `--plan` and `--policy` as `required=True`, and `--policy` takes `nargs="+"`, so an empty policy list raises an error at parse time.
2. `load_plan` reports the line and column of a JSON syntax error, because `json.JSONDecodeError` carries `lineno` and `colno` and a gate that says only "invalid JSON" wastes somebody's afternoon.
3. Every failure path routes through `die`, which always exits 2, because a missing `opa`, an unreadable file, and a plan with no `resource_changes` key are all failures of the tool itself.
4. The `considered` query runs *before* the `deny` query. If nothing was examined, the run ends at `VACUOUS` and never gets the chance to print a pass.
5. Violations are sorted, so the same plan produces byte-identical output on every run and a diff of two CI logs means something.

![Terminal window titled policy-lab. Running opa test policy reports PASS colon 20 slash 20. Running python3 policy_gate.py with the TerraGoat plan prints FAIL colon 7 violations across 2 examined resources, listing one ingress rule exposing port 22 to 0.0.0.0/0 on aws_security_group.web-node and six missing required tags across aws_security_group.web-node and aws_vpc.web_vpc. echo dollar question mark returns 1.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/8d6be1c9-d9ca-4379-8773-3e083cbe9475.png)

Seven violations across the two resources in this plan, and an exit code CI can act on.

![Terminal window titled policy-lab. Running python3 policy_gate.py against an empty plan prints VACUOUS colon no policy examined any of the 0 planned resources, and echo dollar question mark returns 2, not 0.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/d0d457fc-a7f4-4f7f-8a13-c0bc352f9ed6.png)

The same tool on an empty plan, where a gate answering "pass" would be lying.

The GitHub Actions workflow tests the policies before it uses them to judge anything:

```yaml
name: policy

on: [pull_request]

jobs:
  policy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Install OPA
        run: |
          curl -L -o /usr/local/bin/opa \
            https://openpolicyagent.org/downloads/v1.20.2/opa_linux_amd64_static
          chmod +x /usr/local/bin/opa

      # The policies are code. Lint and test them before trusting them.
      - name: Check policy syntax
        run: opa check --strict policy

      - name: Verify formatting
        run: opa fmt --fail --diff policy

      - name: Test policies
        run: opa test policy --verbose --coverage --format json &gt; coverage.json

      # Only now does anything get judged.
      - name: Evaluate Terraform plan
        run: python3 policy_gate.py --plan plan.json --policy policy
```

Roll this out with the gate reporting only, for a fortnight, before you let it block. A policy that looks obviously correct will fail on something structural in your real estate, and you would rather find that out from a log line than from a blocked release.

---

## Step 6: Enforce at Admission Time

The gate in Step 5 checks what you intended to deploy. It doesn't see a `kubectl apply` from somebody's laptop, a vendor's Helm chart, or an operator creating Pods on its own schedule. For those, you need admission control, and Kubernetes now has it built in.

`ValidatingAdmissionPolicy` has been generally available since **v1.30**, evaluating CEL inside the API server with no webhook to deploy or keep alive:

```yaml :collapsed-lines
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicy
metadata:
  name: require-trusted-registry
spec:
  failurePolicy: Fail
  matchConstraints:
    resourceRules:
      - apiGroups: [""]
        apiVersions: ["v1"]
        operations: ["CREATE", "UPDATE"]
        resources: ["pods"]
  variables:
    # A Pod has three container lists. A policy that reads only
    # spec.containers is bypassed by moving the image to an initContainer.
    - name: allImages
      expression: &gt;-
        object.spec.containers.map(c, c.image) +
        object.spec.?initContainers.orValue([]).map(c, c.image) +
        object.spec.?ephemeralContainers.orValue([]).map(c, c.image)
  validations:
    - expression: &gt;-
        variables.allImages.all(i, i.startsWith('registry.internal.example.com/'))
      messageExpression: &gt;-
        'images must come from registry.internal.example.com: ' +
        variables.allImages.filter(i,
          !i.startsWith('registry.internal.example.com/')).join(', ')
      reason: Forbidden
```

The policy does nothing until a binding activates it, which is what lets you pilot on one namespace:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingAdmissionPolicyBinding
metadata:
  name: require-trusted-registry-binding
spec:
  policyName: require-trusted-registry
  validationActions: ["Deny"]
  matchResources:
    namespaceSelector:
      matchLabels:
        policy.example.com/enforce: "true"
```

Set `validationActions: ["Warn", "Audit"]`, label one namespace, watch for a week, and then switch to `["Deny"]` and widen the selector.

The `initContainers` handling matters, because it's the most common way an image-provenance policy gets bypassed, and the `?` optional-field syntax with `.orValue([])` is how you read a list that may be absent without the whole expression erroring.

I couldn't apply these two manifests, because I had no cluster to hand. They're checked against the v1 reference schema, and no real API server has admitted them, so treat them as a starting point and roll them out in `Warn` mode (which you should be doing anyway).

Two other engines are in wide production use, starting with [<VPIcon icon="fas fa-globe"/>Kyverno](https://kyverno.io/). It **graduated in the CNCF in March 2026** with production use at Bloomberg, Coinbase, Deutsche Telekom, LinkedIn, and Spotify. Its policies are written in YAML, so a platform team needs no new language, and it handles generation, image-signature verification, and cleanup that built-in policies leave alone.

[<VPIcon icon="fas fa-globe"/>OPA Gatekeeper](https://open-policy-agent.github.io/gatekeeper/) is the right answer when you want one Rego codebase covering Kubernetes *and* Terraform *and* CI, which is the position this tutorial builds toward. Mutation is now built in too: `MutatingAdmissionPolicy` became stable in **v1.36**.

---

## Step 7: Let a Model Write the Policy

Policies are tedious, and models are good at tedious. So the obvious move is to have the model write them.

There's a catch that you can measure yourself in about a minute, and I do exactly that at the end of this step: a great deal of the Rego in public training data is **Rego v0**, the dialect that stopped parsing when OPA 1.0 shipped in January 2025. A model reaching for the most common pattern it has seen reaches for a dialect the current parser rejects.

A 2025 preprint from a group at the University of Calabria, [<VPIcon icon="iconfont icon-arxiv"/>ARPaCCino](https://arxiv.org/html/2507.10584), reports the same effect on a Terraform case study: asked for Rego with no tools, Qwen3-30B and GPT-4o each produced 0 of 5 syntactically correct policies. Adding retrieval over the OPA documentation changed nothing. Giving the model a loop that could run `opa check` and read the errors took those to 4 of 5 and 5 of 5. Those counts come from one small case study, so treat the direction as the durable part of the result.

A feedback loop is what fixed it, and **the loop costs nothing**, because you already built it out of `opa check --strict`, `opa fmt`, and `opa test`.

So build the loop with one inversion that makes it trustworthy. **I write the tests, and the model writes the policy.** Test fixtures are concrete and cheap to review, since you read a JSON blob and say "yes, that should be rejected" in three seconds. Rego with nested comprehensions takes real effort to read and is easy to misread. Put the human where review is cheap, and let the machine work where its output can be checked mechanically.

Create <VPIcon icon="fa-brands fa-python"/>`policy_forge.py`:

```py :collapsed-lines title="policy_forge.py"
"""Generate a Rego policy from a rule in English, and keep it only if the toolchain agrees."""

import argparse
import pathlib
import re
import subprocess
import sys
import tempfile

WRITTEN, REJECTED, BROKEN = 0, 1, 2

SYSTEM = """You write Open Policy Agent policies in Rego v1 (OPA 1.0+).

Rules:
- Use `if` on every rule body and `contains` for multi-value rules.
- Do not emit `import rego.v1`; it is redundant on OPA 1.0+.
- The input is the JSON from `terraform show -json`.
- Return one ```rego block and nothing else."""


def extract_rego(reply: str) -&gt; str:
    blocks = re.findall(r"```rego\n(.*?)```", reply, re.DOTALL)
    if not blocks:
        raise ValueError("model returned no rego block")
    if len(blocks) &gt; 1:
        raise ValueError(f"model returned {len(blocks)} rego blocks; expected one")
    return blocks[0]


def verify(opa: str, policy: str, tests: pathlib.Path) -&gt; tuple[bool, str]:
    with tempfile.TemporaryDirectory() as tmp:
        bundle = pathlib.Path(tmp)
        # The tests keep their own name; the policy gets one that cannot
        # collide with it, whatever the caller named the test file.
        (bundle / "candidate_policy.rego").write_text(policy)
        (bundle / tests.name).write_text(tests.read_text())

        for command in ([opa, "check", "--strict"], [opa, "test"]):
            result = subprocess.run(command + [str(bundle)], capture_output=True, text=True)
            if result.returncode != 0:
                return False, (result.stdout + result.stderr).strip()
    return True, "opa check and opa test both passed"


def forge(rule: str, tests: pathlib.Path, ask, opa: str, attempts: int) -&gt; str:
    transcript = [{
        "role": "user",
        "content": (
            f"Write a Rego policy for this rule:\n\n{rule}\n\n"
            f"It must satisfy these tests:\n\n```rego\n{tests.read_text()}```"
        ),
    }]

    for attempt in range(1, attempts + 1):
        reply = ask(transcript)
        policy = extract_rego(reply)
        ok, output = verify(opa, policy, tests)
        headline = next(iter(output.splitlines()), "no output from the toolchain")
        print(f"attempt {attempt}: {'PASS' if ok else 'FAIL'} - {headline}", file=sys.stderr)
        if ok:
            return policy
        transcript += [
            {"role": "assistant", "content": reply},
            {"role": "user", "content": f"The toolchain rejected that:\n\n{output}\n\nFix it."},
        ]

    raise RuntimeError(f"no policy survived {attempts} attempts")


def claude(model: str):
    import anthropic

    client = anthropic.Anthropic()

    def ask(transcript: list[dict]) -&gt; str:
        response = client.messages.create(
            model=model,
            max_tokens=16000,
            system=[{
                "type": "text",
                "text": SYSTEM,
                "cache_control": {"type": "ephemeral"},
            }],
            thinking={"type": "adaptive"},
            messages=transcript,
        )
        return "".join(b.text for b in response.content if b.type == "text")

    return ask


def main() -&gt; int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--rule", required=True, help="the policy, in one English sentence")
    parser.add_argument("--tests", required=True, type=pathlib.Path,
                        help="a _test.rego file you wrote by hand")
    parser.add_argument("--out", required=True, type=pathlib.Path,
                        help="where to write the policy, only if it passes")
    parser.add_argument("--model", default="claude-opus-5")
    parser.add_argument("--attempts", type=int, default=4)
    parser.add_argument("--opa", default="opa")
    args = parser.parse_args()

    if args.attempts &lt; 1:
        print("policy-forge: --attempts must be at least 1", file=sys.stderr)
        return BROKEN
    if not args.tests.is_file():
        print(f"policy-forge: {args.tests} does not exist", file=sys.stderr)
        return BROKEN

    try:
        policy = forge(args.rule, args.tests, claude(args.model), args.opa, args.attempts)
    except RuntimeError as exc:
        print(f"policy-forge: {exc}; nothing written", file=sys.stderr)
        return REJECTED
    except ValueError as exc:
        print(f"policy-forge: {exc}", file=sys.stderr)
        return BROKEN

    args.out.write_text(policy)
    print(f"policy-forge: verified policy written to {args.out}", file=sys.stderr)
    return WRITTEN


if __name__ == "__main__":
    sys.exit(main())
```

```sh
export ANTHROPIC_API_KEY=...
python3 policy_forge.py \
  --rule "No security group may expose an administrative port to the public internet." \
  --tests policy/network_test.rego \
  --out policy/generated.rego
```

Here's what the loop guarantees:

1. **Verification runs as a subprocess:** the model is never asked whether its policy is correct. `opa check` and `opa test` decide, and their exit codes are the only evidence the loop accepts.
2. **Failures go back as raw tool output, never summarised:** compiler errors and test failures are the highest-signal feedback a model can receive, and paraphrasing throws away the part that helps.
3. **Nothing reaches disk until it passes:** `forge` either returns a verified policy or raises, so there's no path where an unverified policy lands in the repository just because the retry budget ran out.

I drove the loop with a scripted model so the result is reproducible without an API key. The three replies were a realistic v0-syntax policy, a realistic-but-wrong v1 policy, and the policy from Step 3:

```plaintext
attempt 1: FAIL - 2 errors occurred during loading:
attempt 2: FAIL - policy/network_test.rego:63:
attempt 3: PASS - opa check and opa test both passed
```

Attempt 1 was Rego v0, the `deny[msg] { ... }` form, which stopped parsing when OPA 1.0 shipped in January 2025. And it's overwhelmingly what public training data contains. `opa check --strict` rejected it before it reached a test.

Attempt 2 was valid Rego v1. It would have passed review from most engineers, and it still scored only **4 of 8** on the suite. This is because it compared `ingress.from_port` against `admin_ports` directly, ignored the range, and read only `cidr_blocks`. `opa check` had no complaint, because the code was perfectly well-formed.

**A well-formed policy can still be the wrong policy, and the only thing in this loop that knows what you wanted is the test suite you wrote.**

A repair loop isn't monotonic, because each attempt is a fresh generation conditioned on an error message, with nothing carrying forward what already worked, so attempt four can lose a property attempt three had. Nothing in this design detects that, because the only thing being checked is the test suite you wrote.

Cap the retries, keep the suite growing, and treat every generated policy as a pull request that somebody approves before it merges.

---

## Step 8: Govern the Agent Itself

An AI agent is also an actor, and it calls tools, so every tool call becomes an authorisation decision that something has to make.

The industry converged on this quickly: Amazon Bedrock AgentCore Policy reached general availability in March 2026, evaluating agent tool calls at the gateway in [<VPIcon icon="fas fa-globe"/>Cedar](https://cedarpolicy.com/). The common open-source pattern is an OPA sidecar in front of an MCP tool gateway.

Research is pushing the same boundary harder: a 2026 preprint from the University of Washington group behind Defects4J, [<VPIcon icon="iconfont icon-arxiv"/>Solver-Aided Verification of Policy Compliance in Tool-Augmented LLM Agents](https://arxiv.org/html/2603.20449) (Winston, Winston, and Just), compiles natural-language policies into SMT constraints and blocks non-compliant calls with the Z3 solver.

They share one claim: **a policy in the system prompt isn't enforcement.** Enforcement is an interceptor sitting in the call path that can return "no" and stop the call from happening.

Create <VPIcon icon="fas fa-folder-open"/>`agent/authz.rego`:

```rego :collapsed-lines title="agent/authz.rego"
# METADATA
# title: Agent tool-call authorisation
# description: |
#   Evaluated once per tool call, before the tool runs. The decision has
#   three values rather than two, because an agent worth deploying will
#   sometimes need to do something that a human, not the policy, should
#   approve.
package agent.authz

tool_grants := {
  "support": {"search_orders", "read_customer", "issue_refund"},
  "analytics": {"search_orders", "run_query"},
}

write_tools := {"issue_refund", "run_query"}

refund_ceiling_cents := 10000

# An unmapped role, an unknown tool or a malformed input all land here.
default decision := {"effect": "deny", "reasons": ["no matching grant"]}

decision := {"effect": effect_for(reasons), "reasons": reasons} if {
  count(granted) &gt; 0
  reasons := escalations
}

granted contains role if {
  some role in input.agent.roles
  input.tool in object.get(tool_grants, role, set())
}

effect_for(reasons) := "allow" if count(reasons) == 0

effect_for(reasons) := "require_approval" if count(reasons) &gt; 0

escalations contains reason if {
  input.tool in write_tools
  not input.session.human_in_loop
  reason := sprintf("%q writes state and the session is unattended", [input.tool])
}

# A refund with no readable amount cannot be checked against the ceiling,
# so it escalates. Silence here would clear the exact call an attacker
# would craft.
escalations contains reason if {
  input.tool == "issue_refund"
  not positive_amount
  reason := "refund amount is missing, unreadable, or not positive"
}

# A negative amount is a charge wearing a refund's name.
positive_amount if {
  amount := object.get(input, ["arguments", "amount_cents"], null)
  is_number(amount)
  amount &gt; 0
}

escalations contains reason if {
  input.tool == "issue_refund"
  amount := object.get(input, ["arguments", "amount_cents"], null)
  is_number(amount)
  amount &gt; refund_ceiling_cents
  reason := sprintf(
    "refund of %d cents exceeds the %d cent ceiling",
    [amount, refund_ceiling_cents],
  )
}

# Keyword matching is a coarse guard, and it is here to show the shape of an
# argument-level rule. Anything holding real data wants a SQL parser: this
# catches `DROP TABLE` and misses a statement that spells it another way.
destructive_sql := `(?i)\b(drop|truncate|delete|alter|grant|revoke)\b`

escalations contains reason if {
  input.tool == "run_query"
  regex.match(destructive_sql, object.get(input, ["arguments", "statement"], ""))
  reason := "statement contains a destructive SQL keyword"
}
```

The decision vocabulary is closed, and I'll state it plainly here:

| Effect | What the caller does |
| --- | --- |
| allow | run the tool |
| require_approval | pause, show the reasons to a human, run only on approval |
| deny | refuse, and don't offer an approval path |

Here's why the policy is shaped that way:

1. `default decision` **is deny:** an unrecognised tool, a role you forgot to map, or a malformed input all end up there. A policy that defaults to allow fails open on exactly the inputs nobody anticipated, which is the set an attacker picks from.
2. **Three values:** binary authorisation forces a choice between blocking useful work and permitting dangerous work, and the third value is what makes a high-autonomy agent tolerable.
3. **Reasons come back as a set:** every applicable reason is collected. When somebody gets an approval prompt at three in the morning, "refund of 250000 cents exceeds the 10000 cent ceiling" tells them what to do. "Policy violation" does not.
4. **Arguments are inspected too:** `issue_refund` is routine at £5 and serious at £2,500, so tool-name granularity is far too coarse for agents, given that the agent chooses the arguments.

Fifteen tests cover the decision table, including an agent with an empty role list, a refund with no amount at all, and a query that hides `DROP` behind a newline:

```sh
opa test agent -v
#
# PASS: 15/15
```

Serve it and try a call:

```sh
opa run --server --addr localhost:8181 agent/
```

```sh
curl -s localhost:8181/v1/data/agent/authz/decision \
-d '{"input":{"agent":{"roles":["support"]},"tool":"issue_refund",
    "arguments":{"amount_cents":250000},"session":{"human_in_loop":true}}}' | jq .result
#
# {
#   "effect": "require_approval",
#   "reasons": [
#     "refund of 250000 cents exceeds the 10000 cent ceiling"
#   ]
# }
```

The policy is inert until something refuses to proceed on its answer. That's the client:

```py :collapsed-lines
import json
import urllib.request

OPA_URL = "http://localhost:8181/v1/data/agent/authz/decision"


class PolicyDenied(Exception):
    pass


class ApprovalRequired(Exception):
    pass


def authorize(agent, tool, arguments, session):
    payload = json.dumps({"input": {
        "agent": agent, "tool": tool,
        "arguments": arguments, "session": session,
    }}).encode()
    req = urllib.request.Request(
        OPA_URL, data=payload, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=2) as resp:
        body = json.load(resp)

    # OPA returns {} with a 200 when a query matches nothing. Fail closed.
    decision = body.get("result", {"effect": "deny", "reasons": ["policy unavailable"]})

    if decision["effect"] == "deny":
        raise PolicyDenied("; ".join(decision["reasons"]))
    if decision["effect"] == "require_approval":
        raise ApprovalRequired("; ".join(decision["reasons"]))
    return decision
#
# search_orders    -&gt; ALLOWED
# issue_refund     -&gt; NEEDS APPROVAL (refund of 250000 cents exceeds the 10000 cent ceiling)
# delete_account   -&gt; DENIED (no matching grant)
```

Note `body.get("result", ...)`: OPA returns `{}` with a 200 status when a query matches nothing, so a bare `body["result"]` raises `KeyError`, and depending on how your agent framework handles exceptions that may fail *open*. Every layer defaults to deny, including the parsing.

Call `authorize()` from your framework's tool-execution hook, before the tool function runs. It's about fifteen lines, and it turns a system prompt's polite suggestions into an actual boundary.

---

## Step 9: What I Got Wrong

Steps 2 and 3 show the finished policies. I reached for something simpler first (the version most tutorials stop at), and the gap between that and what you have just read is the most useful thing here.

### The Tagging Policy Skipped the Worst Resources

My naïve `in_scope` rule ended with `resource.change.after.tags`, which reads as "only resources that have tags".

What it actually does is worse than that, because Terraform emits `tags: null` for a resource with **no tags at all**, and an undefined lookup makes the rule body fail, so the resource drops out of scope entirely.

The TerraGoat plan has two resources: the security group carries five `git_*` tags and no ownership tags, while the VPC carries nothing at all.

```sh
jq -r '.resource_changes[] | "\(.address): tags=\(.change.after.tags | type)"' plan.json
#
# aws_security_group.web-node: tags=object
# aws_vpc.web_vpc: tags=null
```

```sh
opa eval --data naive  --input plan.json --format pretty 'count(data.terraform.tags.deny)'
opa eval --data policy --input plan.json --format pretty 'count(data.terraform.tags.deny)'
#
# 3
# 6
```

The three it missed were all on the completely untagged resource, so the policy flagged the resource with some tags and silently cleared the one with none.

`tags_of` with its `else := {}` branch is the fix, and it's three lines.

### The Network Policy Read One of Four Shapes

My naïve network policy read `aws_security_group` and `cidr_blocks`, which is what every tutorial shows, but Terraform has four ways to express the same ingress rule.

![Diagram titled "Four ways Terraform describes one ingress rule". Four boxes are shown. Top left, aws_security_group.ingress[].cidr_blocks, filled pale blue and labelled read. The other three are outlined in red with red hatching and labelled not read: aws_security_group.ingress[].ipv6_cidr_blocks, aws_vpc_security_group_ingress_rule.cidr_ipv4, and the deprecated aws_security_group_rule. A key states that solid blue fill means the policy looks here and red hatch means it does not.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/ab61d36d-78bf-45f7-a073-e7013216e3e1.png)

One rule, four encodings, and the naïve policy read only the top-left one.

I planned a second real configuration with three security groups that open SSH to the world using the shapes the policy didn't read. Both versions are in `code/`, so this reproduces:

```sh
opa eval --data naive --input plan-evasion.json \
--format pretty 'data.terraform.network.deny'
#
# []
```

That is three publicly reachable SSH ports, zero violations, and a gate that would have printed `PASS` and exited 0. ### A Test That Was Holding a Hole Open

The port range had a second problem, and my own test suite was protecting it. I had written a case called `test_tolerates_null_ports`, asserting that an ingress rule with `protocol: "-1"` produced no violations, on the reasoning that a comparison against a null port shouldn't crash the policy.

An all-protocols rule opens every port, and the AWS provider records it as `from_port: 0` and `to_port: 0`. The the range check read it literally as the single port zero, so the most permissive rule in AWS scored clean.

The plan is in `code/plan-all-protocols.json`, and it's one resource:

```sh
jq -c '.resource_changes[] | select(.type=="aws_security_group")
       | .change.after.ingress[0] | {protocol,from_port,to_port,cidr_blocks}' \
   plan-all-protocols.json
opa eval --data naive --input plan-all-protocols.json \
--format pretty 'data.terraform.network.deny'
#
# {"protocol":"-1","from_port":0,"to_port":0,"cidr_blocks":["0.0.0.0/0"]}
# []
```

Every protocol and every port, open to the whole internet, and a test I wrote on purpose certified it as fine. The fix is `covered_ports`, which maps an all-protocols rule onto the full range and goes undefined for ports it can't read, with a second `deny` rule that reports the undefined case. That test is gone and four took its place:

```sh
opa eval --data policy --input plan-all-protocols.json --format pretty 'data.terraform.network.deny'
#
# [
#   "aws_security_group.wide_open: ingress rule exposes port 22 to 0.0.0.0/0",
#   "aws_security_group.wide_open: ingress rule exposes port 3306 to 0.0.0.0/0",
#   "aws_security_group.wide_open: ingress rule exposes port 3389 to 0.0.0.0/0",
#   "aws_security_group.wide_open: ingress rule exposes port 5432 to 0.0.0.0/0"
# ]
```

Step 7 argues that the test suite is the only artifact in the loop that knows what you wanted. This is the cost of that property: a test that's wrong is a specification that's wrong, and nothing downstream of it will argue.

### What the Numbers Actually Were

![orizontal bar chart titled "The naive policy missed 5 of the 9 violations present", showing violations found as a fraction of violations present on two real Terraform plans. For evasion plan open ports the naive policy scores 0.000 in red hatching and the hardened policy scores 1.000 in blue hatching. For terragoat plan missing tags the naive policy scores 0.500 in red and the hardened policy scores 1.000 in blue. For terragoat plan open ports both score 1.000, drawn in grey.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/ce90751d-1eb9-45d1-8514-6481d9b3612d.png)

Both versions score 1.000 on the plan I designed the policy against. The gap only appears on the plan I did not.

Across both real plans, **the naïve policies found 4 of the 9 violations present**. They scored 1.000 on the TerraGoat security group, which is the case I had in mind while writing them, and 0.000 and 0.500 on the two cases I did not.

### The Part That Genuinely Surprised Me

I assumed test coverage would have caught this, and it doesn't. I reconstructed the naïve tagging policy with the two tests I originally wrote for it:

```sh
opa test . --coverage --format json | jq '{overall: .coverage}'
#
# {
#   "overall": 100
# }
```

**The naïve policy scored 100% coverage, passed 2 of 2 tests, and cleared a resource that carried no tags at all.**

Coverage measures which lines of a policy your tests executed, and says nothing at all about which shapes of input you failed to imagine. For policy code, this is the entire failure mode. Coverage is worth reporting, and the evidence that a policy actually works comes from running it against infrastructure you didn't write.

---

## Limits of the Check

Here's what this gate still can't do, because its false clearances matter more than its catches.

### 1. Unknown Values Are Invisible

Terraform marks anything it can't resolve until apply time as unknown, which appears as `null` in the plan JSON alongside an `after_unknown` map. A policy reading `change.after.some_field` doesn't fire when that field is unknown.

This bites hardest on cross-resource rules, where "every bucket has a public access block" is genuinely hard at plan time, because the block references a bucket ID that's usually `(known after apply)`.

### 2. It Sees the Plan, and Only the Plan

Anything applied outside the pipeline, changed in a console, or drifted since creation stays invisible to it. Plan-time checks and admission-time checks have *different* blind spots, and both leave work for a periodic scan of deployed state.

### 3. Coverage of Controls Isn't Measurable from Inside

A hundred green checks say nothing about the rules nobody wrote. Keep the mapping from your control requirements to your policy files somewhere explicit and audit it on a schedule, because the gate can't tell you what it was never asked.

### 4. The CIDR List is an Exact Match

`public_cidrs` holds `0.0.0.0/0` and `::/0` and nothing else, so a rule opening `0.0.0.0/1` reaches half the internet and passes. Widening it means deciding which prefix lengths count as public and carving out RFC 1918 space, and that decision belongs to your organisation.

### 5. Four Shapes is What I Found

The `exposures` set covers the four encodings I went looking for, and AWS offers more. Security group references (`security_groups`), prefix lists, and `self` rules are all ways to reach a port that this policy doesn't model, and it never sees them. I would expect a fifth shape to turn up the first time this runs against a large estate.

### 6. Regulatory Dates Move

If you're building toward the EU AI Act, the Digital Omnibus published in July 2026 pushed Annex III high-risk obligations from 2 August 2026 to **2 December 2027**, and Annex I obligations to 2 August 2028, while the Article 50 transparency duties kept their original 2 August 2026 date.

Encode the controls, and look the dates up in the [official timeline](https://artificialintelligenceact.eu/implementation-timeline/) every time you need one, including when a blog post from last quarter tells you otherwise (this one included).

---

## Conclusion

Models produce infrastructure code that parses almost every time, is secure about 56% of the time, and arrives faster than anybody can read it. Manual review stopped being a real control somewhere in that gap. The rules were always meant to be executable, and the volume is what finally forced the issue.

In this tutorial, you:

- Pulled a real vulnerable security group from TerraGoat at commit `729f8da` and planned it with Terraform 1.14.2.
- Wrote 20 policy tests covering four Terraform encodings of one ingress rule, and got them to pass on OPA 1.20.2.
- Caught 7 real violations in the TerraGoat plan, while correctly ignoring port 80.
- Built a gate with a four-verdict contract that exits 2 when it examined nothing.
- Watched the naïve version find 4 of 9 violations while reporting 100% test coverage, and hardened it to find 9 of 9.
- Wired a generation loop where `opa check` and your own tests decide what reaches disk.
- Authorised agent tool calls from the same engine, with 15 tests and a default of deny.

My policies handled the cases I wrote them for and missed two I hadn't imagined, and every signal available to me (tests passing, coverage at 100%, and a clean `opa check`) agreed they were fine. The one thing that disagreed was infrastructure somebody else had written. Point your policies at code you didn't write, early, and keep the failures.

All the code, the policies, the plan JSON, and the scripts that build the figures are in the `code/` directory alongside this handbook. The figures regenerate with `python3 build/make_images.py` and `python3 build/make_terminals.py`. The terminal screenshots re-run their commands at build time, so they can't drift from the truth.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Govern AI-Generated Infrastructure with Policy as Code and OPA [Full Handbook]",
  "desc": "Modern models generate syntactically correct code nearly 100% of the time. Veracode's 2026 report puts it plainly: ”Syntax is effectively solved.” That reads like a milestone, but it's the reason you ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-govern-ai-generated-infrastructure-with-policy-as-code-and-opa-full-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
