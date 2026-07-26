---
lang: en-US
title: "How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]"
description: "Article(s) > How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]"
icon: iconfont icon-k8s
category:
  - DevOps
  - Docker
  - Kubernetes
  - Amazon
  - AWS
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - k8s
  - kubernetes
  - amazon
  - aws
  - amazon-web-services
  - github
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]"
    - property: og:description
      content: "How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-devsecops-platform-from-homelab-to-aws-full-book/
prev: /devops/aws/articles/README.md
date: 2026-07-28
isOriginal: false
author:
  - name: Osomudeya Zudonu
    url: https://freecodecamp.org/news/author/Osomudeya/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f545c4cf-df83-4c56-a196-7b57458de9da.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]"
  desc="In this book, you'll build a fintech transaction ledger from scratch and progressively transform it into a production-ready DevSecOps platform. You'll also deploy it on AWS. The app processes credit a"
  url="https://freecodecamp.org/news/how-to-build-a-production-ready-devsecops-platform-from-homelab-to-aws-full-book"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f545c4cf-df83-4c56-a196-7b57458de9da.png"/>

In this book, you'll build a fintech transaction ledger from scratch and progressively transform it into a production-ready DevSecOps platform. You'll also deploy it on AWS.

The app processes credit and debit transactions, fires compliance alerts, and stores everything in a database. You'll build the infrastructure around it yourself: automation, scanning, policy enforcement, secrets management, threat detection, and observability.

By the time you're finished, you'll be able to talk through every decision in an interview because you made each one.

This guide doesn't hand you a pre-built solution. It makes you feel out. and understand each problem before introducing the tool that solves it.

All the code, manifests, scripts, and stage-by-stage READMEs live in the companion repository. Clone it before you start:

```sh
git clone https://github.com/Osomudeya/clearledger.git
cd clearledger
```

Everything in this book refers to files inside that repo.

::: note Prerequisites

You'll need these tools installed on your machine before Stage 0:

- **Multipass:** creates a lightweight Ubuntu VM so Kubernetes has enough resources
- **kubectl:** talks to your Kubernetes cluster from your terminal
- **Helm:** installs apps into Kubernetes
- **Docker Desktop:** builds container images
- **jq:** formats JSON output so it's readable

You'll also need free accounts on GitHub and Docker Hub.

And you should be comfortable with the following knowledge and skills:

- **Basic Linux command line:** navigating directories, reading files, running scripts
- **Git:** clone, commit, push
- What a container is and roughly how Docker builds one

You don't need prior Kubernetes, security, or cloud experience. This guide builds that from Stage 0. Your machine needs at least 24 GB of RAM, 6 CPU cores, and 80 GB of free disk space. See [How to Set Up Your Machine](#how-to-set-up-your-machine) for the exact install commands.

::: info

The companion repo is at [<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`](https://github.com/Osomudeya/clearledger). Star it, clone it, then continue.

<SiteInfo
  name="Osomudeya/clearledger"
  desc="a production-grade fintech DevSecOps lab. Eight stages from raw Kubernetes to full security automation. GitOps, Vault, Falco, Kyverno, Terraform. Built to get you hired."
  url="https://github.com/Osomudeya/clearledger/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a7154fb36e45b15c284ff9cc8b9518fedb42b8789c6a60c15dccc08c337a8831/Osomudeya/clearledger"/>

:::

---

## What You Are Building

ClearLedger is a fintech transaction ledger built with three FastAPI microservices, PostgreSQL, Redis, and a web frontend.

Users can register, sign in, record credit and debit transactions, view their account balance, and receive compliance alerts whenever a transaction exceeds a predefined threshold.

The application is intentionally simple. Its purpose isn't to teach fintech. It gives you a realistic system that you'll secure and operate like a production platform.

The project consists of four components:

- **auth-service:** Handles user registration, login, and JWT authentication.
- **ledger-service:** Processes transactions, maintains account balances, and stores transaction history.
- **notification-service:** Listens for large transactions through Redis and generates compliance alerts.
- **frontend:** A web interface for logging in, viewing balances, submitting transactions, and reviewing alerts.

By the end of this book, every one of these services will still exist. What changes is how they are built, deployed, secured, and operated.

The application is simply the vehicle. DevSecOps is the destination.

### How the Platform Evolves

You won't install every tool on day one. Instead, the platform grows the same way production systems usually do: a problem appears first, then a solution is introduced.

You'll begin with a manually deployed Kubernetes application. From there, each stage solves one real operational problem.

**Stage 0: Raw Kubernetes**

You'll deploy and run the application manually, which lets you understand the system before introducing automation.

**Stage 1: Continuous Integration**

Building container images becomes automatic whenever code is pushed, eliminating manual build steps.

**Stage 2: GitOps**

Deployments are no longer done with kubectl. Git becomes the single source of truth, preventing configuration drift.

**Stage 3: Security Gates**

Every commit passes through security scanning so vulnerable code, secrets, and misconfigurations are stopped before deployment.

**Stage 4: Admission Control**

Even if something bypasses the pipeline, Kubernetes policies prevent insecure workloads from entering the cluster.

**Stage 5: Secrets Management**

Application credentials move out of Kubernetes Secrets into Vault, removing sensitive data from Git and cluster storage.

**Stage 6: Runtime Security**

Falco continuously watches running containers and detects suspicious behavior after deployment.

**Stage 6.5 (Optional): Chaos Engineering**

Failures are introduced deliberately to verify that the platform can recover instead of simply detecting problems.

**Stage 7: Observability**

Metrics, logs, and dashboards provide visibility into the health, performance, and security of the platform.

**Stage 7.5 (Optional): OpenTelemetry**

Distributed tracing follows requests across every service, revealing how a single transaction moves through the system.

**Stage 8: AWS Migration**

The same architecture is deployed on AWS using EKS, ECR, RDS, and an Application Load Balancer without changing how the application itself works.

If you simply want to explore the application before touching Kubernetes, an optional Docker Compose stack lets you run everything locally on your machine.

The guiding principle of this book is simple: every stage makes you feel the problem before introducing the tool that solves it.

---

## How to Work Through This Lab

Throughout this process of understanding each problem before introducing the tool that solves it, three habits will carry you through every stage.

1. **Read first before you run:** The paragraphs before each command explain *why* you're running it. Skipping them means you can reproduce the steps but not explain them, and explaining them is what gets you hired. The commands are proof you understand.
2. **Choose with a reason:** Every tool here solves a specific problem. Why use Vault instead of Kubernetes Secrets? Why split code and manifests into two repos? Don't just follow the steps: ask *what breaks if we skip this?* If you understand the problem, you'll remember the solution.
3. **Go in order and verify every checkpoint:** Each stage depends on the one before it. When you hit an issue, read the error. Getting stuck and debugging is part of the learning: employers want to hear "I hit X error and fixed it by doing Y."

At every ✋ Hands-on checkpoint:

1. Run the command.
2. Compare your output with Expected.
3. If it doesn't match, fix it before continuing.
4. When `make check-N` passes: `make snapshot STAGE=N && make snapshots`. Only continue after you see `clearledger.stageN`.

Avoid these mistakes:

- Don't skip a checkpoint because it passed before.
- Don't run `make restore` without checking available snapshots first.
- Replace `your-username` with your real Docker Hub or GitHub username everywhere it appears.
- Run runner commands inside the VM (prompt shows `ubuntu@clearledger`), not on your Mac.

Take screenshots at each **portfolio checkpoint**. These moments become your evidence: proof that the platform runs, detects, blocks, syncs, and observes real activity.

---

## Tools You Will Use

Come back to the below table when a new name appears and you wonder *why now*. Each entry is one line: what it does and when it appears.

**On your laptop:**

- Multipass creates the Ubuntu VM.
- Docker builds images.
- `make` wraps long commands into `make setup` / `make check-N`.
- .<VPIcon icon="fas fa-folder-open"/>`/etc/hosts` entries like `clearledger.local` let your browser reach the cluster.

**The app:**

- Three Python APIs (auth, ledger, notifications) + a web frontend.
- Postgres stores data
- Redis lets ledger publish alerts without calling notification directly
- nginx ingress routes browser traffic to the right service.

| Tool | One-line role | Stage |
| --- | --- | --- |
| MicroK8s / kubectl | Kubernetes cluster inside the VM: `kubectl` talks to it. | 0 |
| `clearledger` (repo) | App code + CI workflow: what you build. | 1 |
| `clearledger-infra` (repo) | Kubernetes YAML only: what the cluster should run. CI updates it, ArgoCD deploys it. | 1 |
| GitHub Actions + self-hosted runner | Builds images and updates infra repo on every push. Runner lives in the VM to reach the local cluster. | 1 |
| ArgoCD | Watches `clearledger-infra`, syncs the cluster to match Git, reverts unauthorized changes. | 2 |
| Gitleaks | Blocks commits that contain secrets (API keys, tokens). | 3 |
| Semgrep | SAST: catches unsafe Python patterns (injection, hardcoded credentials). | 3 |
| Checkov | IaC scanning: misconfigs in Dockerfiles and Kubernetes YAML. | 3 |
| Trivy | Image scanning: known CVEs in pip/npm packages and the built container. | 3 |
| Syft + Grype | SBOM generation and vulnerability check on the artifact itself. | 3 |
| Cosign | Signs container images: Stage 4 rejects unsigned ones at deploy time. | 3 |
| Kyverno | Admission control: blocks non-compliant pods at the cluster gate (root containers, missing limits, unsigned images). | 4 |
| Vault | Stores credentials outside Git and etcd: injects them into pods via a sidecar at startup. | 5 |
| Falco | eBPF runtime detection: alerts when a shell starts or a sensitive file is read inside a running container. | 6 |
| Network policies | Kubernetes firewall between pods: limits blast radius if one service is compromised. | 6 |
| LitmusChaos | Kills pods deliberately to prove the app recovers (optional). | 6.5 |
| Prometheus / Grafana / Loki | Metrics, dashboards, and log search: turns security events into evidence. | 7 |
| OpenTelemetry + Tempo | Distributed traces: shows where one request spent its time across services (optional). | 7.5 |
| Terraform / EKS / ECR / RDS | Infrastructure as code for the AWS migration: same app, cloud-managed backing services. | 8 |

Each stage adds a new security layer. The tools aren't interchangeable: scanners check your code and images before deployment, ArgoCD keeps the cluster synced to Git, Vault handles secrets, Kyverno blocks unsafe workloads before they run, and Falco watches for suspicious behavior after they're running.

That's why the order matters: you're building defense in depth, one layer at a time.

---

## How to Choose Your Path

Pick one path from your host RAM before you provision a cluster. Switching mid-lab after OOM kills or disk pressure wastes a day, so choose upfront.

| Your situation | Path | What you get |
| --- | --- | --- |
| **8 GB RAM**, or unsure this laptop can carry the lab | **Docker Compose first** | The real app: register, post a transaction, see the compliance alert fire. Then decide on a cluster. `make integration-up` · [Local integration stack](#how-to-try-the-app-without-kubernetes) |
| **16 GB RAM** on the host | **Lite local cluster** (Stages 0–5) | **Running on one VM:** This setup includes Kubernetes, CI/CD, GitOps, security checks, admission control, and Vault. To use fewer resources, edit <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-dotenv"/>`setup-cluster.local.env` before running `make setup`. |
| **Under 16 GB** host RAM and you need Kubernetes, or you want all 8 stages | **Cloud VM** | Provision a remote machine (4–8 vCPU, 16–32 GB RAM), clone the repo, run the lab there, `make teardown` when done. Stages 6.5 / 7 / 7.5 (chaos + full observability) need 24 GB on the host, use this path if your laptop cannot spare that. |

The default path in this guide assumes 24 GB+ RAM and the full local VM (Before You Start). If that's not you, start from the row that matches your machine.

---

## How to Save Your Progress

**Mac + Multipass only:** `make snapshot` and `make restore` require Multipass. If you're using Linux without Multipass, skip snapshots and use Path B if something goes wrong.

This lab takes several days to complete.

Your source code lives on your computer, so rebuilding or deleting the VM doesn't delete your Git repository, commits, manifests, or configuration files.

The VM stores your running environment, including deployed pods, Vault secrets, Postgres data, and Grafana dashboards.

### Save Your Progress

After completing each stage, create a snapshot before moving on. For example:

```sh
make snapshot STAGE=7
make snapshots
```

Always run `make snapshots` to confirm the snapshot was created.

### Restore Your Progress

If the VM becomes unusable after a while, restore the latest working snapshot:

```sh
make snapshots
make restore STAGE=7

export KUBECONFIG=~/.kube/clearledger-config
make check-7
```

### What Happens If the VM Breaks?

You keep:

- Your Git repository
- Your commits
- .<VPIcon icon="iconfont icon-dotenv"/>`.env`
- .<VPIcon icon="iconfont icon-dotenv"/>`setup-cluster.local.env`
- `clearledger-infra` on GitHub

You lose anything stored inside the VM after your last snapshot, including:

- Running pods
- Vault secrets
- Postgres data
- Grafana and Loki data

That's why it's a good idea to create a snapshot after every completed stage.

#### Path A: You Have a Snapshot (Recommended)

Restore the latest working snapshot and continue from that stage.

```sh
make snapshots
make restore STAGE=6

export KUBECONFIG=~/.kube/clearledger-config
make check-6
```

#### Path B: No Snapshot

Rebuild the lab.

```sh
make teardown
make setup

export KUBECONFIG=~/.kube/clearledger-config
```

Your Git repositories are still intact, but the Kubernetes cluster starts empty. Continue the book from the stage you had reached and rebuild the platform from there.

If you run into problems such as disk space issues, failed snapshots, Mac sleep or restart problems, Vault authentication errors, or pods stuck in CrashLoopBackOff, see [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) for detailed recovery steps.

::: info Who This Is For

**Junior DevOps (0–2 yrs):** do every stage in order. Don't skip the pain point sections. Expect Stage 0–2 to take a full day each, Stages 3–7 half a day each, Stage 8 a few hours. That's normal, so don't rush.

**Mid-level DevOps (2–4 yrs):** skim Stages 0–2 to understand the app, focus time on Stages 3–7 where the security layers are.

**Interview preparation:** complete through Stage 4, then read <VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="fa-brands fa-markdown"/>`interview-prep.md`. The questions are based on exactly what's in this lab.

:::

---

## Table of Contents

- [How to Set Up Your Machine](#how-to-set-up-your-machine)
- [How to Start the Lab](#how-to-start-the-lab)
- [How to Manage Disk Space](#how-to-manage-disk-space)
- [How to Try the App Without Kubernetes](#how-to-try-the-app-without-kubernetes)
- [How to Configure Local Domain Names](#how-to-configure-local-domain-names)
- [Stage 0 — The Running System](#stage-0-the-running-system)
- [Stage 1 — CI Pipeline (GitHub Actions + Self-Hosted Runner)](#stage-1-ci-pipeline-github-actions-self-hosted-runner)
- [Stage 2 — GitOps with ArgoCD](#stage-2-gitops-with-argocd)
- [Stage 3 — Security Gates](#stage-3-security-gates)
- [Stage 4 — Admission Control (Kyverno)](#stage-4-admission-control-kyverno)
- [Stage 5: Secrets Management (Vault)](#stage-5-secrets-management-vault)
- [Stage 6 — Runtime Security (Falco)](#stage-6-runtime-security-falco)
- [Stage 6.5 — Chaos Engineering (Optional)](#stage-65-chaos-engineering-optional)
- [Stage 7 — Security Observability](#stage-7-security-observability)
- [Stage 7.5 — OpenTelemetry (Optional)](#stage-75-opentelemetry-optional)
- [Stage 8 — AWS Migration](#stage-8-aws-migration)
- [Troubleshooting (see troubleshooting.md)](#troubleshooting-see-troubleshootingmd)
- [Compliance Reference](#compliance-reference)
- [Interview Preparation](#interview-preparation)
- [AWS Cost Reference](#aws-cost-reference)

---

## How to Set Up Your Machine

Requirements are in Prerequisites above. Confirm 24 GB RAM, 6 CPU cores, and 80 GB free disk before installing.

### Install the Required Tools

| Tool | What it does | macOS | Linux | Windows |
| --- | --- | --- | --- | --- |
| Multipass | Creates lightweight Ubuntu VMs on your laptop | `brew install --cask multipass` | `sudo snap install multipass` | [<VPIcon icon="fas fa-globe"/>multipass.run/install](https://multipass.run/install) |
| kubectl | Talks to your Kubernetes cluster from your terminal | `brew install kubectl` | `sudo snap install kubectl --classic` | `winget install Kubernetes.kubectl` |
| Helm | Package manager for Kubernetes (like apt/brew but for cluster apps) | `brew install helm` | `sudo snap install helm --classic` | `winget install Helm.Helm` |
| Docker Desktop | Builds container images on your machine | [<VPIcon icon="fa-brands fa-docker"/>docker.com](https://docs.docker.com/desktop/) | [<VPIcon icon="fa-brands fa-docker"/>docker.com](https://docs.docker.com/engine/install/) | [<VPIcon icon="fa-brands fa-docker"/>docker.com](https://docs.docker.com/desktop/) |
| jq | Formats JSON output so you can read it | `brew install jq` | `sudo apt install jq` | `winget install jqlang.jq` |

::: note <VPIcon icon="fa-brands fa-windows"/>Windows users

Run all commands inside WSL2 Ubuntu. Don't use PowerShell for this lab because the setup uses `make` and Bash scripts.

:::

Verify everything before continuing:

```sh
multipass --version
kubectl version --client
helm version
docker --version
jq --version
```

If any command fails, install the missing tool before continuing.

---

## How to Start the Lab

The main lab path starts at [Stage 0: the Running System](#stage-0-the-running-system).

After you have run the setup once step by step, you can use this shortcut next time:

```sh
make setup
export KUBECONFIG=~/.kube/clearledger-config
kubectl get nodes
```

Expected: one node named `clearledger` with STATUS `Ready`.

`make setup` provisions the Multipass VM, installs MicroK8s, applies disk-safety caps, and updates <VPIcon icon="fas fa-folder-open"/>`/etc/hosts`. Takes 3–5 minutes.

---

## How to Manage Disk Space

The lab runs on a single-node MicroK8s VM with a fixed disk (80 GB by default). Over days or weeks (especially after CI builds, Helm upgrades, and Stage 7 observability) container images, logs, and journald can fill the root filesystem. Pods then fail with `Evicted`, `ImagePullBackOff`, or mysterious `Pending` states.

`make setup` applies preventive caps automatically (log rotation, image GC thresholds, journald cap). See [Disk health in troubleshooting.md (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) for the full table and recovery steps.

```sh
# Check disk health:
#
make doctor    # PASS / WARN / FAIL + PVC and Prometheus TSDB sizes
# Clean up unused files inside the VM without deleting app data:
#
make reclaim
```

If `make doctor` still reports FAIL after reclaim, you may need `make teardown && make setup` and restore from a snapshot. Full guidance: [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`. VM disk full (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md).

---

## How to Try the App Without Kubernetes

If your machine doesn't have enough resources for Kubernetes, you can run ClearLedger with Docker Compose.

```sh
docker compose -f docker-compose.integration.yml up --build -d
```

Open `http://localhost:3000`.

When you're ready, stop the stack and continue with Stage 0. 

```sh
docker compose -f docker-compose.integration.yml down
```

### How to Sign In for the First Time

First, you'll need to register. The database starts empty after each fresh `up` (or `down -v`). Use a real-looking email (Pydantic rejects `@*.local`), for example `test@clearledger.io` for an email and `SecurePass123` for a password.

Then sign in with the same credentials.

Wrong password shows *Incorrect email or password*. If you see a stale error, hard-refresh or run `localStorage.removeItem('cl_token')` in the browser console.

### How to Run the Demo Flow

First, register and sign in at `http://localhost:3000`. Submit a few credits and debits (for example, Salary +$5000, Rent −$1200).

Then confirm the balance updates and history lists entries.

Now submit a transaction **≥ $10,000**: the Alerts panel should show `LARGE_TRANSACTION`.

Here's an optional smoke test against the same base URL:

```sh
BASE_URL=http://localhost:3000 bash scripts/dast/smoke.sh
```

---

## How to Configure Local Domain Names

Add the ClearLedger hostnames to your hosts file.

### macOS or Linux with Multipass

Run:

```sh
sudo bash scripts/setup-hosts.sh
```

Or do it manually:

```sh
VMIP=$(multipass info clearledger | grep IPv4 | awk '{print $2}')

echo "$VMIP  clearledger.local argocd.local grafana.local vault.local falco.local litmus.local" | sudo tee -a /etc/hosts
```

Verify after Stage 0:

```sh
curl -s -o /dev/null -w "%{http_code}\n" http://clearledger.local/auth/health
```

Expected: `200`.

### WSL2

Find your WSL IP:

```sh
ip -4 addr show eth0 | grep inet
```

Use the IP shown (or `127.0.0.1` if it works on your machine), then add it to <VPIcon icon="fas fa-folder-open"/>`/etc/hosts`:

```sh
LAB_IP=<YOUR_IP>

echo "$LAB_IP  clearledger.local argocd.local grafana.local vault.local falco.local litmus.local" | sudo tee -a /etc/hosts
```

If you use Chrome or Edge on Windows instead of inside WSL, add the same line to:

`C:\Windows\System32\drivers\etc\hosts`

Verify:

```sh
curl http://clearledger.local/auth/health
```

---

## Stage 0 — The Running System

**Starting point:** Nothing is deployed yet, so you're about to build a Kubernetes cluster and deploy ClearLedger manually.

**Goal:** By the end of this stage, ClearLedger will be running on Kubernetes. You'll be able to register a user, submit transactions, and see compliance alerts, all deployed by hand, with no automation.

Every deployment, update, and fix is manual. That's intentional. Before automating a platform, you need to understand how it works without automation.

### 0.1: Provision the Cluster

Next you'll be creating a virtual machine on your laptop that runs its own Kubernetes cluster. Think of it as a miniature data center inside your computer.

Multipass creates lightweight Ubuntu VMs. MicroK8s is a minimal Kubernetes distribution that runs inside that VM. Together they give you a real cluster without needing cloud resources.

**Recommended: one command (do this):**

```sh
make setup
export KUBECONFIG=~/.kube/clearledger-config
kubectl get nodes
#
# NAME          STATUS   ROLES    AGE   VERSION
# clearledger   Ready    <none>   2m    v1.29.x
```

`make setup` runs <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`setup-cluster.sh` (VM + MicroK8s + disk-safety caps) and <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`setup-hosts.sh` (`/etc/hosts` entries). It takes 3–5 minutes.

Disk-safety (log rotation, image GC thresholds, journald cap) is configured automatically. See Disk health in [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) for more info.

If STATUS is `NotReady`, wait 60 seconds and try again.

Here's the manual setup (only if `make setup` failed and you need to debug step by step):

```sh
multipass launch \
--name clearledger \
--cpus 6 --memory 12G --disk 80G \
22.04
```

Get the VM IP (needed for <VPIcon icon="fas fa-folder-open"/>`/etc/hosts`):

```sh
multipass info clearledger | grep IPv4
```

Add hosts entries. See the [Domain Names](#how-to-configure-local-domain-names) section above, or run `sudo bash scripts/setup-hosts.sh`.

```sh
multipass shell clearledger
```

Inside the VM:

```sh
sudo snap install microk8s --classic --channel=1.29/stable
sudo usermod -aG microk8s ubuntu && newgrp microk8s
microk8s enable dns ingress storage helm3 rbac
echo "alias kubectl='microk8s kubectl'" >> ~/.bashrc
echo "alias helm='microk8s helm3'" >> ~/.bashrc
source ~/.bashrc
kubectl get nodes
exit   # back to your host machine
```

Connect kubectl from your host:

```sh
multipass exec clearledger -- microk8s config > ~/.kube/clearledger-config
export KUBECONFIG=~/.kube/clearledger-config
kubectl get nodes
```

### 0.2: Understand the Application Before Deploying it

Open these files before running a single `kubectl` command. Reading the code first builds context that makes everything else make sense.

| File | What it does |
| --- | --- |
| <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` | Register, login, verify JWT |
| <VPIcon icon="fas fa-folder-open"/>`app/ledger-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` | Transactions, balance, calls auth-service to verify every request |
| <VPIcon icon="fas fa-folder-open"/>`app/notification-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` | Subscribes to Redis, fires alerts when amount ≥ $10,000 |
| <VPIcon icon="fas fa-folder-open"/>`app/frontend/src/`<VPIcon icon="fa-brands fa-js"/>`app.js` | SPA: calls the same API as the curl commands |
| <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-docker"/>`Dockerfile` | Non-root user, pinned base image, HEALTHCHECK |

::: note

Notice this line in every Dockerfile: `USER appuser`. It means the image is designed to run as a normal user instead of root. The Kubernetes manifests also set `runAsNonRoot: true`. Later, in Stage 4, Kyverno enforces that rule and rejects pods that don't declare they run as non-root. Your app is prepared early so it passes that policy later.

:::

Also look at <VPIcon icon="fas fa-folder-open"/>`infra/manifests/auth-service/`<VPIcon icon="iconfont icon-yaml"/>`secret.yaml`. The database password is `changeme-stage0` encoded in base64. Decode it:

```sh
echo "Y2hhbmdlbWUtc3RhZ2Uw" | base64 -d
# changeme-stage0
```

That password is sitting in a YAML file anyone with repo access can read. base64 is encoding, not encryption. It's trivially reversible. Remember this moment. It's why Stage 5 exists.

### 0.3: Docker Hub Setup

You need a container registry: a place to store the built images so the cluster can pull them. Docker Hub is the simplest option. You'll replace it with a private registry (ECR) in Stage 8. Create four public repositories on Docker Hub (free account, hub.docker.com):

1. Go to <VPIcon icon="fa-brands fa-docker"/>`hub.docker.com`
2. Click **Create repository**
3. Choose your Docker Hub username as the namespace
4. Enter one repository name from the list below
5. Set visibility to **Public**
6. Click **Create**
7. Repeat for all four services

```plaintext
YOUR_USERNAME/clearledger-auth-service
YOUR_USERNAME/clearledger-ledger-service
YOUR_USERNAME/clearledger-notification-service
YOUR_USERNAME/clearledger-frontend
```

Next, generate an access token. Go to hub.docker.com, then Account Settings, Security, and New Access Token (Read/Write/Delete). Save it. You won't see it again.

![image screenshot guide describing where and how to create access token](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/85562991-e4e7-4d17-8d91-4c4ec2f60114.png)

![Image screenshot showing how to create access token](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ad8a99a9-c6e4-41ac-a1c0-6799f731782c.png)

```sh
docker login
# Username: your Docker Hub username
# Password: the access token (NOT your account password)
```

Build and push all four services:

```sh
# Replace your-username with your Docker Hub username, the same string everywhere in this lab
export DOCKER_USERNAME=your-username
echo "Using DOCKER_USERNAME=$DOCKER_USERNAME"
```

::: note ✋ Hands-on checkpoint: Docker Hub username

```sh
# Must print your real username, not the literal text "your-username"
echo "$DOCKER_USERNAME"
```

Expected: one line with your Docker Hub name (for example, `veeno-demo`). If you see `your-username` instead, stop and fix `export` before building.

:::

Build and push all four services:

```sh
docker build -t $DOCKER_USERNAME/clearledger-auth-service:v0.1.0 ./app/auth-service
docker build -t $DOCKER_USERNAME/clearledger-ledger-service:v0.1.0 ./app/ledger-service
docker build -t $DOCKER_USERNAME/clearledger-notification-service:v0.1.0 ./app/notification-service
docker build -t $DOCKER_USERNAME/clearledger-frontend:v0.1.0 ./app/frontend

# Push
#
docker push $DOCKER_USERNAME/clearledger-auth-service:v0.1.0
docker push $DOCKER_USERNAME/clearledger-ledger-service:v0.1.0
docker push $DOCKER_USERNAME/clearledger-notification-service:v0.1.0
docker push $DOCKER_USERNAME/clearledger-frontend:v0.1.0
```

::: note ✋ Hands-on checkpoint: images on Docker Hub

Open hub.docker.com and go to your profile, then **Repositories**. Then confirm that all four `clearledger-*` repos exist and each shows tag `v0.1.0`.

![screenshot image confirming what docker image repo looks like when done](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/fb07dc5f-9db2-4819-810c-89b76b01a0e1.png)

On your laptop, run:

```sh
docker pull $DOCKER_USERNAME/clearledger-auth-service:v0.1.0
```

Expected: `Status: Downloaded newer image` or `Image is up to date`, not `repository does not exist` or `denied`.

:::

### 0.4: Look at the Manifests Before Applying Them

Kubernetes uses **manifest** files (YAML) to describe the resources it should create. Instead of clicking buttons, you declare the desired state, and Kubernetes creates it.

Before deploying ClearLedger, take a quick look at these manifests:

- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/`<VPIcon icon="iconfont icon-yaml"/>`namespace.yaml`: Creates the `clearledger` namespace.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/postgres/`: Deploys PostgreSQL.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/redis/`<VPIcon icon="iconfont icon-yaml"/>`redis.yaml`: Deploys Redis.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/auth-service/`: Deploys the authentication service.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/ledger-service/`: Deploys the ledger service.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/notification-service/`: Deploys the notification service.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/frontend/`: Deploys the web application.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/`<VPIcon icon="iconfont icon-yaml"/>`ingress.yaml`: Makes the application available at `clearledger.local`.
- .<VPIcon icon="fas fa-folder-open"/>`infra/manifests/rbac/`<VPIcon icon="iconfont icon-yaml"/>`rbac.yaml`: Defines who may do what inside the cluster.

You don't need to understand every field yet. The goal is simply to see how the application is described before Kubernetes creates it.

You'll understand how Ingress routing and RBAC work in the two optional sections after §0.6. For now, just see how the app is described before Kubernetes creates it.

### 0.5: Deploy ClearLedger (Layer by Layer)

Deploy in **six layers**. Finish each layer before starting the next. Run `kubectl get pods -n clearledger` after layers 2, 3, and 6 to confirm progress.

Set a short path variable and confirm your username is still set:

```sh
export DOCKER_USERNAME=your-username   # skip if already set in §0.3
STAGE0=stages/stage-0-raw-kubernetes/infra/manifests
```

#### 0.5.1 — Layer 1: Namespace and RBAC

Nothing else can be created until the namespace exists. RBAC also must exist before workloads reference ServiceAccounts.

```sh
kubectl apply -f infra/manifests/namespace.yaml
kubectl apply -f infra/manifests/rbac/rbac.yaml
```

**Verify:**

```sh
kubectl get namespace clearledger
kubectl get serviceaccount -n clearledger
#
# auth-service, ledger-service, notification-service, clearledger-viewer
```

#### 0.5.2 — Layer 2: PostgreSQL

Database must be running before auth-service or ledger-service start. Both services connect to Postgres on startup to run migrations and serve requests, and they'll crash-loop if the database isn't there yet.

```sh
kubectl apply -f infra/manifests/postgres/postgres-secret.yaml
kubectl apply -f infra/manifests/postgres/postgres.yaml

kubectl wait --for=condition=ready pod -l app=postgres \
-n clearledger --timeout=120s
```

Expected after `kubectl apply`:

```plaintext
secret/postgres-secret created
persistentvolumeclaim/postgres-pvc created
statefulset.apps/postgres created
service/postgres created
```

Expected when `kubectl wait` succeeds: the command exits with no output (exit code 0). If it times out, see **If Postgres stays Pending** below before continuing.

**Verify:**

```sh
kubectl get pods -n clearledger -l app=postgres
kubectl get pvc -n clearledger
#
# NAME         READY   STATUS    RESTARTS   AGE
# postgres-0   1/1     Running   0          45s
# 
# NAME           STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS        AGE
# postgres-pvc   Bound    pvc-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   5Gi        RWO            microk8s-hostpath   45s
```

**If Postgres stays Pending** (`kubectl wait` times out, pod shows `0/1 Pending`, PVC shows `Pending`):

Postgres needs a **PersistentVolumeClaim**: disk space on the cluster. MicroK8s provides that through the `hostpath-storage` addon. If `make setup` was interrupted or you used manual setup without `microk8s enable storage`, the PVC has nothing to bind to and the pod never schedules.

Check the events: you'll usually see something like:

```plaintext
Warning  FailedScheduling  ...  pod has unbound immediate PersistentVolumeClaims
Normal   FailedBinding     ...  no persistent volumes available for this claim and no storage class is set
```

Fix it on the VM, then restart the postgres pod. Run this **from your host**: the same command on macOS, Linux, or Windows PowerShell (Multipass is installed on the host. It executes inside the VM for you):

```sh
# Enable storage (and ingress/rbac if make setup skipped them)
multipass exec clearledger -- microk8s enable storage ingress rbac

# Confirm a default StorageClass exists
kubectl get storageclass
# Expected: microk8s-hostpath (default)

# Kick the pod so it reschedules against the new storage class
kubectl delete pod postgres-0 -n clearledger

kubectl wait --for=condition=ready pod -l app=postgres \
-n clearledger --timeout=120s
kubectl get pods -n clearledger -l app=postgres
# Expected: postgres-0   1/1   Running
```

Don't continue to auth-service or ledger-service until Postgres is `Running`. They will crash-loop without a database.

#### 0.5.3 — Layer 3: Redis

**Why Redis is here (a quick scenario):** Imagine a customer posts a $15,000 debit. Ledger-service saves it to Postgres, then publishes a message to Redis: *"large transaction, user X, amount 15000."* Notification-service is listening on that channel. It picks up the message and records a compliance alert: the one you'll see in the UI later when you curl `/notifications/alerts`.

Ledger-service and notification-service don't call each other directly. Redis sits in the middle as a **message bus**: ledger publishes, notification subscribes. That's why Redis must be running before you deploy notification-service (and why you deploy it now, alongside Postgres, before the app layer).

![flow daigram image explaining how redis works](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/f099d734-8b73-483d-a28b-16cd7703703b.png)

```sh
kubectl apply -f infra/manifests/redis/redis.yaml
```

**Verify**:

```sh
kubectl get pods -n clearledger -l app=redis
#
# NAME                     READY   STATUS    RESTARTS   AGE
# redis-xxxxxxxxxx-xxxxx   1/1     Running   0          30s
```

#### 0.5.4 — Layer 4: Application secrets

Credentials live in Kubernetes Secrets for Stage 0 (Stage 5 moves them to Vault).

::: note Expected

AGE will differ, **DATA** counts must match

:::

```sh
kubectl apply -f infra/manifests/auth-service/secret.yaml
kubectl apply -f infra/manifests/ledger-service/secret.yaml
```

**Verify**:

```sh
kubectl get secrets -n clearledger | grep -E 'auth-service|ledger-service' 
#
# auth-service-secret     Opaque   2      64s
# ledger-service-secret   Opaque   1      8s
```

`auth-service-secret` holds two keys (`database_url`, `jwt_secret`). `ledger-service-secret` holds one (`database_url`). Stage 5 replaces these with Vault, for now they live in the cluster as Kubernetes Secrets.

#### 0.5.5 — Layer 5: Application workloads

You're about to start the four app services: auth, ledger, notification, and frontend. Postgres, Redis, and the Secrets from the last two layers are already in place. Now Kubernetes needs to pull your Docker Hub images and run them as pods.

**Two files per service (mostly):** A Deployment tells Kubernetes *which container image to run* and *how many copies*. A **Service** gives that app a stable name inside the cluster (for example, `auth-service` so ledger can find auth without knowing pod IP addresses). You apply the Deployment first, then the Service.

So why are we using the `sed` command below? The deployment YAML files in Git contain a placeholder: literally the text `DOCKER_USERNAME`, because everyone's Docker Hub username is different. You already set yours in §0.3 (`export DOCKER_USERNAME=YOUR_DOCKERHUB_USERNAME`). The `sed` line swaps that placeholder for your real username on the fly, as the manifest is sent to Kubernetes. You never edit the file in Git. If you skip `sed` and apply the raw file, Kubernetes tries to pull an image called `DOCKER_USERNAME/clearledger-auth-service`, which doesn't exist.

Why do we use the Stage 0 folder? This repo has more than one copy of the Kubernetes manifests. For this manual deployment, use <VPIcon icon="fas fa-folder-open"/>`stages/stage-0-raw-kubernetes/infra/manifests/`. Those files are prepared for Stage 0 and contain the `DOCKER_USERNAME` placeholder that the commands below replace. Don't use <VPIcon icon="fas fa-folder-open"/>`infra/manifests/` yet, as those files are for the GitOps stages later.

Deploy each service in order. Run these from the repo root with `DOCKER_USERNAME` still exported:

**1. auth-service**: login and registration

```sh
sed "s|DOCKER_USERNAME|${DOCKER_USERNAME}|g" \
"$STAGE0/auth-service/deployment.yaml" | kubectl apply -f -
kubectl apply -f infra/manifests/auth-service/service.yaml
```

**2. ledger-service**: transactions and balance (needs Postgres + the secret you created in §0.5.4)

```sh
sed "s|DOCKER_USERNAME|${DOCKER_USERNAME}|g" \
"$STAGE0/ledger-service/deployment.yaml" | kubectl apply -f -
kubectl apply -f infra/manifests/ledger-service/service.yaml
```

**3. notification-service**: listens on Redis for large-transaction alerts (no database secret in this one)

```sh
sed "s|DOCKER_USERNAME|${DOCKER_USERNAME}|g" \
"$STAGE0/notification-service/deployment.yaml" | kubectl apply -f -
kubectl apply -f infra/manifests/notification-service/service.yaml
```

**4. frontend**: the web UI (Deployment and Service are in one file here)

```sh
sed "s|DOCKER_USERNAME|${DOCKER_USERNAME}|g" \
"$STAGE0/frontend/deployment.yaml" | kubectl apply -f -
```

**Verify** (all app pods should reach `Running`: auth and ledger may take ~30s while they connect to Postgres):

```sh
kubectl get pods -n clearledger
#
# NAME                                      READY   STATUS    RESTARTS   AGE
# postgres-0                                1/1     Running   0          15m
# redis-xxxxxxxxxx-xxxxx                    1/1     Running   0          10m
# auth-service-xxxxxxxxxx-xxxxx             1/1     Running   0          45s
# auth-service-xxxxxxxxxx-xxxxx             1/1     Running   0          45s
# ledger-service-xxxxxxxxxx-xxxxx           1/1     Running   0          40s
# ledger-service-xxxxxxxxxx-xxxxx           1/1     Running   0          40s
# notification-service-xxxxxxxxxx-xxxxx     1/1     Running   0          35s
# frontend-xxxxxxxxxx-xxxxx                 1/1     Running   0          30s
```

::: note Expected

You should see Postgres and Redis from earlier layers plus new pods for each app (exact pod names vary)

:::

If auth-service or ledger-service is `CrashLoopBackOff`, check the logs:

```sh
kubectl logs -n clearledger deploy/auth-service --tail=20
```

::: info Common cause

you applied <VPIcon icon="fas fa-folder-open"/>`infra/manifests/*/deployment.yaml` instead of the Stage 0 files above: logs may show `DATABASE_URL is not set`. Re-run the `sed` + `kubectl apply` commands in this section.

:::

**✋ Hands-on checkpoint: workloads before ingress**

```sh
kubectl get deployment -n clearledger
kubectl get pods -n clearledger --field-selector=status.phase!=Running
```

::: note Expected

Four Deployments (`auth-service`, `ledger-service`, `notification-service`, `frontend`) with `READY` matching desired replicas (auth and ledger show `2/2`). The second command prints **nothing**: no pods stuck in Pending or CrashLoopBackOff.

:::

#### 0.5.6 — Layer 6: Ingress

Exposes the cluster to `http://clearledger.local`.

```sh
kubectl apply -f infra/manifests/ingress.yaml
# 
# Verify:
# 
kubectl get ingress -n clearledger
curl -s -o /dev/null -w "%{http_code}\n" http://clearledger.local/
#
# 200
```

#### 0.5.7: Watch until stable

Expected final state (press <kbd>Ctrl</kbd>+<kbd>C</kbd> to stop watching once all pods show `Running`):

```sh
kubectl get pods -n clearledger -w
#
# NAME                                  READY   STATUS    RESTARTS
# auth-service-xxx                      1/1     Running   0
# auth-service-yyy                      1/1     Running   0
# frontend-xxx                          1/1     Running   0
# ledger-service-xxx                    1/1     Running   0
# ledger-service-yyy                    1/1     Running   0
# notification-service-xxx              1/1     Running   0
# postgres-0                            1/1     Running   0
# redis-xxx                             1/1     Running   0
```

Pod stuck in `Pending` or `CrashLoopBackOff`? These two commands show you what went wrong:

```sh
kubectl describe pod POD_NAME -n clearledger
kubectl logs POD_NAME -n clearledger --previous
```

### 0.6: Verify the Running System

Use **one test account** for both browser and curl so nothing conflicts:

| Field | Value |
| --- | --- |
| Email | `test@clearledger.io` |
| Password | `SecurePass123` |

If you already registered in the browser with a **different** password, either sign in with that password or pick a new email: the curl commands below must use the **same** email and password you actually registered with.

#### Browser verification (recommended):

Open `http://clearledger.local` in your browser. You should see the ClearLedger login screen.

![clearledger login screen UI screenshot](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ba678edb-ed82-4063-b2e3-304bfe31e27c.png)

Click **Register** and create an account with `test@clearledger.io` / `SecurePass123` (same as the curl block below. Pydantic rejects obviously fake emails like `test@test.com`).

Sign in with that email and password. On first login the dashboard auto-seeds demo transactions. Wait a few seconds for them to appear:

![screenshot of clearledger UI after login](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/4bf4bd15-ad3b-466c-ba46-8539c2e1536c.png)

Look at the **Current Balance** card. It should show a dollar amount with a sparkline chart.

Look at **Transaction History**. You should see entries like "Salary (Acme Corp", "Rent) May 2026", and so on.

And look at the **Alerts** panel at the bottom. You should see `LARGE_TRANSACTION` alerts with a red badge. Two of the demo transactions exceed $10,000, which triggers the compliance alert automatically.

Then submit your own transaction over $10,000 and watch the alert count increase in real time.

**What to look for:**

- Balance updates immediately after each transaction
- Credits show as green `+$` amounts, debits show as red `−$` amounts
- The Alerts badge count increases when you submit a transaction ≥ $10,000
- Each alert shows the amount, direction, and timestamp

![screenshot of clearledger UI after login and making transactions](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/05690dde-58de-4453-9a3f-8eee09b33293.png)

**Take a screenshot of the dashboard showing transactions and at least one alert.** This is the first piece of your portfolio.

**Alternatively via curl** (same account: useful if the browser is not cooperating):

```sh
# Register (skip if you already registered in the browser with the same email)
curl -s -X POST http://clearledger.local/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@clearledger.io","password":"SecurePass123"}' | jq .
```

Expected: `{"user_id":"...","email":"test@clearledger.io"}`, or an error that the email is already registered (fine if you used the browser first).

```sh
# Login — save the token (must match the password you registered with)
TOKEN=$(curl -s -X POST http://clearledger.local/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@clearledger.io","password":"SecurePass123"}' \
| jq -r .access_token)
echo "Token: ${TOKEN:0:30}..."
```

If `TOKEN` is empty or login returns `401`, your browser password doesn't match: re-register with the table above or use your actual password in the `-d` JSON.

```sh
# Create a large transaction (triggers notification alert)
curl -s -X POST http://clearledger.local/ledger/transactions \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{"amount":15000,"direction":"debit","description":"Property payment"}' | jq .
```

Expected: a transaction object with `id`, `amount: 15000`, `direction: "debit"`:

```sh
# Check balance
curl -s http://clearledger.local/ledger/balance \
-H "Authorization: Bearer $TOKEN" | jq .
```

```sh
# Confirm the notification alert fired
curl -s http://clearledger.local/notifications/alerts | jq .
```

Expected (curl-only path, no browser demo seed): at least one alert for the $15,000 transaction, for example, `{"total":1,"alerts":[{"type":"LARGE_TRANSACTION","amount":15000,...}]}`. If you already used the browser, `total` may be **3 or more** (two demo alerts plus yours), that is also correct.

**If you see `{"detail":"Unauthorized"}`**: your token has expired. JWTs are short-lived for security. This is intentional. Re-run the login command above to get a fresh token, then retry the failed command.

This only affects the `$TOKEN` variable in your current terminal session. If you open a new terminal, you need to run the login command again because `$TOKEN` doesn't persist across sessions.

```sh
make check-0
```

### Understanding Ingress (Optional)

Read this after §0.6 if you want to understand how `clearledger.local` reaches your pods.

Your cluster runs four application services: frontend, auth-service, ledger-service, and notification-service. Each has an internal **Service** address inside the cluster, but none are reachable from your browser until an **Ingress** routes external traffic.

The Ingress is the front door. When a request hits `clearledger.local`, Kubernetes looks at the URL path and forwards to the right service. Requests to `/auth` go to auth-service, `/ledger` to ledger-service, `/notifications` to notification-service, and `/` to the frontend.

Open <VPIcon icon="fas fa-folder-open"/>`infra/manifests/`<VPIcon icon="iconfont icon-yaml"/>`ingress.yaml` and read the comments. The API paths use a **rewrite:** `/auth/login` becomes `/login` before it reaches auth-service, so backend routes stay simple.

You'll add more hostnames later (`grafana.local`, `argocd.local`, and so on): each gets its own Ingress manifest in a later stage. This file is only the ClearLedger app.

![flow diagram explaining ingress, how it works.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3307ca55-75d4-41be-a161-e741d2349b5e.png)

### Understanding RBAC (Optional)

Ingress controls traffic coming from outside the cluster. RBAC controls permissions inside the cluster.

This file creates identities and permissions for the `clearledger` namespace.

Open <VPIcon icon="fas fa-folder-open"/>`infra/manifests/rbac/`<VPIcon icon="iconfont icon-yaml"/>`rbac.yaml`. The comments at the top mirror this walkthrough.

A **ServiceAccount** is an identity for a pod. For example, `auth-service`, `ledger-service`, and `notification-service` each get their own identity.

A **Role** says what that identity is allowed to do. In your repo, the app roles are very limited: they can only `get` and `list` Kubernetes Endpoints. They can't read Secrets, delete pods, create resources, or access other namespaces.

A **RoleBinding** connects the identity to the permissions. Without the RoleBinding, the Role exists but no pod receives those permissions.

The `clearledger-viewer` ServiceAccount is for read-only debugging. It can inspect pods, services, endpoints, events, and configmaps, but it can't read Secrets.

The default ServiceAccount is bound to a role with zero permissions. That way, if a pod forgets to set `serviceAccountName`, it falls back to an identity that can do nothing.

The point is least privilege: even if a pod is compromised, Kubernetes doesn't hand it broad cluster access.

### 0.7: Why Manual Deploys Can't Be Trusted

In Stage 0, you built and deployed the app by hand. Now you'll make one small code change and deploy it again. This shows the problem with manual deployments: they're hard to track, hard to roll back, and hard to prove. Stages 1 and 2 fix that with CI and GitOps.

#### Step 1: Make a visible change.

Open <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` and find the `/health` endpoint. Change the return value so you can tell the new version is running:

```py title="app/auth-service/main.py"
# Before
return {"status": "ok", "service": settings.service_name}

# After — add a version field
return {"status": "ok", "service": settings.service_name, "version": "0.2.0"}
```

Save the file. This simulates a developer shipping a small fix.

#### Step 2: Build, push, and deploy by hand.

```sh
docker build -t $DOCKER_USERNAME/clearledger-auth-service:v0.2.0 ./app/auth-service

docker push $DOCKER_USERNAME/clearledger-auth-service:v0.2.0
kubectl set image deployment/auth-service \
auth-service=$DOCKER_USERNAME/clearledger-auth-service:v0.2.0 \
-n clearledger
```

Wait about 30 seconds for Kubernetes to pull the new image and restart the pods:

```sh
kubectl rollout status deployment/auth-service -n clearledger
```

#### Step 3: Verify your change is live.

```sh
curl -s http://clearledger.local/auth/health | jq .
```

Expected: `{"status":"ok","service":"auth-service","version":"0.2.0"}`

If you still see the old response without `"version"`, wait a few more seconds and retry. Kubernetes is still rolling out the new pods.

#### Step 4: Notice what manual deploy doesn't give you.

You deployed a change. It works. But think about what just happened:

- **Who deployed this?** There's no record. You ran `kubectl` from your laptop. If three people have cluster access, no one knows who changed what.
- **What changed?** The only evidence is the Docker Hub tag `v0.2.0`. Nothing links that tag to a specific commit or code review.
- **What if** `v0.2.0` **is broken?** You would need to remember the previous tag, then run `kubectl set image` again to roll back. What if you don't remember the tag? What if the previous image was deleted?
- **What if someone else runs** `kubectl apply` **with** `v0.1.0` **while you're pushing** `v0.2.0`**?** The cluster silently reverts to the old version. No error. No notification. You think your fix is live, but it's not.
- **Where is the audit trail?** Nowhere. In a regulated environment (banking, healthcare, government), you need proof of who deployed what and when. Right now you have nothing.

Manual deploys can work for a demo. But they don't hold up for a team or a regulated environment. Keep these gaps in mind. They're why the next stages exist.

#### Step 5: Revert your change before continuing.

Undo the health endpoint change in <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` (remove `"version": "0.2.0"`). Don't rebuild: the cluster will keep running `v0.2.0` for now, and Stage 1 will take over image management.

Stage 1 automates the build. Stage 2 fixes the deployment.

### What You Learned in Stage 0

- How to provision a local Kubernetes cluster with Multipass and MicroK8s
- How Kubernetes manifests describe the desired state of your system
- How an Ingress routes external traffic to internal services
- How to build, push, and deploy container images manually
- **Why manual deploys can't be trusted**: no audit trail, no rollback, no consistency

::: note What you can now put on your CV / say in an interview:

> Deployed a multi-service application to Kubernetes by hand: namespace, RBAC, a StatefulSet database, Deployments, Services, and path-based Ingress routing, and can explain why each layer deploys in that order.

:::

`make snapshot STAGE=0 && make snapshots`. Confirm `clearledger.stage0`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 1 — CI Pipeline (GitHub Actions + Self-Hosted Runner)

In Stage 0 you built and deployed by hand. Stage 1 automates the build: a `git push` runs a pipeline that builds images, scans them, pushes to Docker Hub, and records the new tag in `clearledger-infra`.

**Goal:** every push to GitHub automatically builds images, pushes them to Docker Hub, and updates image tags in `clearledger-infra`.

**Am I ready for Stage 1?**

Run these **yourself** before §1.1:

::: note Expected

health check green, `echo` prints your Docker Hub user, and curl prints `200`.

:::

```sh
make check-0
echo "$DOCKER_USERNAME"    # must not be empty or "your-username"
curl -s -o /dev/null -w "%{http_code}" http://clearledger.local/auth/health
```

What you'll need for this section:

- Docker Hub account with four clearledger- repositories (see QUICKSTART.md §1b)
- GitHub account: you can create repos and personal access tokens
- ~2–4 hours for runner install + first green pipeline (this is the hardest stage for beginners)
- Done when: make check-1 passes and you manually confirmed the five items in §1.7 below. Then save: make snapshot STAGE=1 → make snapshots (confirm clearledger.stage1).

### What You Need to Know First

In Stage 0, your laptop was the deployment system.

You typed `docker build`, `docker push`, and `kubectl set image` yourself. That worked for a demo, but it's not how teams should ship software.

Manual builds create too many unanswered questions:

- Did this image come from the latest code?
- Did someone build it from a dirty working tree?
- Did the build work the same way on another machine?
- Which commit produced the image currently running?
- Who pushed the image, and when?

**CI (Continuous Integration)** fixes the build side of that problem. It means that every time code is pushed, an automated system builds, checks, and packages it the same way.

Think of CI as a factory line:

![flow diagram explain gihub ci flow](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5a9a4283-a77c-493e-85c4-e457b6ab00c9.png)

```mermaid
flowchart TD
  A[Developer pushes code] --> B[GitHub detects the push]
  B --> C[GitHub Actions starts the pipeline]
  C --> D[Runner executes the jobs]
  D --> E[Docker images are built and pushed]
  E --> F[Infra manifests are updated with the new image tags  (in clearledger-infra — §1.3)]
```

The important idea is that the build no longer depends on your laptop. Your laptop writes code and the pipeline produces the release artifact.

A CI system has three parts:

1. **Pipeline host**: the control plane. It notices a push and decides which workflow to run. In this lab, that's **GitHub Actions**.
2. **Pipeline file**: the instructions. It's a YAML file at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml` that says what jobs to run.
3. **Runner**: the worker machine. It actually executes the commands in the pipeline.

GitHub Actions normally uses GitHub-hosted runners in the cloud. In this lab, that's not enough. Your Kubernetes cluster lives inside a local Multipass VM and GitHub's cloud runner can't reach it. You also need the runner inside the VM to build Docker images using the local Docker daemon.

So you install a self-hosted runner inside the VM. It connects outbound to GitHub, waits for work, then executes pipeline jobs locally where it can reach everything.

Two repos, `clearledger` (code + CI) and `clearledger-infra` (Kubernetes YAML only). You'll create the second in §1.3.

![flow chart demonstrating self hosted github flow](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/f7c69215-31c8-4806-b899-15caeace9485.png)

```plaintext
GitHub — clearledger (app repo)
  stores your code
  starts the workflow on git push
        ↓
Self-hosted runner (inside Multipass VM)
  builds Docker images
  pushes images to Docker Hub
  updates image tags in clearledger-infra  ← you create this in §1.3
        ↓
GitHub — clearledger-infra (infra repo)
  stores Kubernetes YAML with the new image tags
  ArgoCD watches this repo in Stage 2 (not yet)
```

For Stages 1–7, the lab uses <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml` with your self-hosted runner. It builds images, pushes them to Docker Hub, and updates `clearledger-infra`. Stage 8 adds a separate AWS workflow, <VPIcon icon="fas fa-folder-open"/>`.github/workflows/ci-aws.yaml`, which pushes to ECR instead. You don't need to configure the AWS workflow until you reach Stage 8.

### 1.1: Push the App Repo to GitHub (Not `clearledger-infra` Yet)

This step is **repo #1,** `clearledger` (application code + CI workflow). You're pushing the clone on your laptop: the same folder where you ran Stage 0 (`make setup`, `kubectl apply`, and so on).

`clearledger-infra` comes later in §1.3. That second repo holds Kubernetes manifests only. Don't create it here.

First, put the application repo somewhere GitHub Actions can see it.

Go to GitHub and then New Repository:

- Repository name: `clearledger` (exact name, not `clearledger-infra`)
- Visibility: **Public or Private**. Both work with the self-hosted runner and GitHub Actions. ArgoCD never reads this repo (see [Private repos: what syncs where](#private-repos-what-syncs-where) in §1.3).
- Do **not** initialize with a README or <VPIcon icon="iconfont icon-git"/>`.gitignore`

The repo already has those files locally. If GitHub creates its own, your first push may fail because the histories don't match.

Run from your **local `clearledger` project root** on your laptop (where <VPIcon icon="fas fa-folder-open"/>`app/`, <VPIcon icon="fas fa-folder-open"/>`infra/`, and <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml` live):

```sh
cd ~/Desktop/clearledger   # your clone path
git remote add origin https://github.com/YOUR_USERNAME/clearledger.git
git branch -M main
git push -u origin main
```

If `git remote add` fails because `origin` already exists:

```sh
git remote -v
git remote set-url origin https://github.com/YOUR_USERNAME/clearledger.git
git push -u origin main
```

Verify in the browser: `https://github.com/YOUR_USERNAME/clearledger`.

You should see <VPIcon icon="fas fa-folder-open"/>`app/`, <VPIcon icon="fas fa-folder-open"/>`infra/manifests/`, <VPIcon icon="fas fa-folder-open"/>`docs/`, and <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml`. That confirms GitHub can trigger the pipeline on your next push.

::: note What you proved

The **app repo** is on GitHub. CI will run from here. Deployment manifests for GitOps land in `clearledger-infra` in §1.3.

### 1.2: Install the Self-Hosted Runner Inside the VM.

:::

The workflow file tells GitHub *what* to run. The runner is *where* it runs.

This lab uses a self-hosted runner because your infrastructure is local. GitHub's cloud servers can't reach your MicroK8s cluster or Docker daemon inside the Multipass VM. The runner solves that by living inside the VM. It connects to GitHub to pick up jobs, then executes everything locally.

If the runner is missing or offline, the pipeline can't execute. The workflow may sit queued, or it may fail because no matching runner is available.

#### Step 1: Open GitHub’s runner setup page (keep this tab open)

GitHub gives you a full copy-paste install guide on one page. Use it: don’t hunt for URLs or tokens elsewhere.

1. Open `https://github.com/YOUR_USERNAME/clearledger`
2. Go to Settings, Actions, Runners, and New self-hosted runner
3. Select Linux and x64

The page title should look like: **Add new self-hosted runner · YOUR_USERNAME/clearledger**.

![](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/e0aa537c-a2b2-4ed7-8b48-f686a012ea8d.png)

That page has three sections you'll use:

| Section on GitHub | What to do with it |
| --- | --- |
| **Download** | Copy the `mkdir`, `curl`, and `tar` commands into the VM in Step 4 (same versions as below) |
| **Configure** | Copy the **token** from the `./config.sh ... --token ...` line: do **not** run GitHub’s `./ .sh` as-is |
| **Using your self-hosted runner** | Ignore for now, the lab workflow needs the `clearledger` label (Step 4) |

Scroll to **Configure**. You'll see something like:

```sh
./config.sh --url https://github.com/YOUR_USERNAME/clearledger --token AXXXXXXXXXXXXXXXXXXXXXXXXX
./run.sh
```

The token is the long string after `--token` (starts with `A`, about 26 characters). Copy only that string.

Keep this tab open until Step 4 finishes: the token expires in about **1 hour**. If it expires, click New self-hosted runner again for a fresh token.

#### Step 2: Enter the VM

```sh
multipass shell clearledger
```

After this command, your prompt should look like `ubuntu@clearledger:~$`. That means you are inside the Ubuntu VM. If your prompt still shows your Mac username or MacBook name, you're still on your host machine and the runner setup will fail.

Continue only when your prompt shows `ubuntu@clearledger`.

Everything from Step 3 onwards runs inside the VM, not on your Mac.

#### Step 3: Install Docker inside the VM

The runner will build Docker images. That means Docker must exist where the runner runs.

```sh
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker ubuntu
newgrp docker

docker --version
```

::: note Expected

Docker prints a version number (for example, `Docker version 29.x.x`).

:::

**Verify Docker works for the `ubuntu` user now**: the runner doesn't exist yet (Step 4 creates <VPIcon icon="fas fa-folder-open"/>`~/actions-runner`):

```sh
docker ps
```

Expected: a table header (CONTAINER ID, IMAGE, …), even if no containers are listed. **Not** `permission denied while trying to connect to the Docker API`.

If `docker ps` fails with permission denied, the `docker` group has not applied yet. Run `newgrp docker` again, or log out of the VM (`exit`) and `multipass shell clearledger` back in, then retry `docker ps`.

::: note What you proved

The VM can run Docker without Docker Desktop on your Mac. Continue to Step 4 to install the runner.

:::

#### Step 4: Install and register the runner

Still inside the VM (`ubuntu@clearledger` prompt):

**Download:** you can copy the commands from the **Download** section on GitHub’s runner page (Step 1), or run the block below. They should match. Paste into the VM, not your Mac.

**Configure:** use the lab command below, not GitHub’s `./config.sh` line. Paste your token from Step 1 and replace `YOUR_USERNAME`.

```sh
mkdir -p ~/actions-runner && cd ~/actions-runner
curl -o actions-runner-linux-x64-2.335.1.tar.gz -L \
https://github.com/actions/runner/releases/download/v2.335.1/actions-runner-linux-x64-2.335.1.tar.gz

tar xzf ./actions-runner-linux-x64-2.335.1.tar.gz

./config.sh \
--url https://github.com/YOUR_USERNAME/clearledger \
--token YOUR_RUNNER_TOKEN \
--name clearledger-runner \
--labels clearledger,self-hosted,linux \
--work _work \
--unattended

sudo ./svc.sh install
sudo ./svc.sh start
```

Do **not** run GitHub’s `./run.sh` for day-to-day use: the lab uses `sudo ./svc.sh` so the runner survives VM reboots. GitHub shows `./run.sh` for a quick test only.

Expected after `./config.sh`: `Runner successfully added` (or similar). If you see Invalid token or Expired token, go back to Step 1 in the browser and copy a fresh token.

The `clearledger` label is required GitHub’s default `./config.sh` on the setup page doesn't add it. The workflow uses:

![image showing where to add the label in github ui for the runner](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/f8fa25ff-81da-4759-b021-293c244add7c.png)

```yaml
runs-on: [self-hosted, clearledger]
```

GitHub schedules jobs by runner labels, not by runner name. A runner named `clearledger` without the `clearledger` label will stay online but jobs will remain queued with `Waiting for a runner to pick up this job`.

What those last two commands mean:

```plaintext
sudo ./svc.sh install
  Registers the runner with systemd inside the VM.
  Without this, `sudo ./svc.sh status` says: not installed.

sudo ./svc.sh start
  Starts the runner service in the background.
  After this, it keeps running even when you close the terminal.
```

Check it locally from the same folder, still inside the VM:

```sh
cd ~/actions-runner
sudo ./svc.sh status
```

Expected: the service is installed and running.

If `docker ps` worked in Step 3 but a CI job later fails with Docker socket permission denied, the runner probably started before the `docker` group applied. Restart it after Step 4 (only when <VPIcon icon="fas fa-folder-open"/>`~/actions-runner` exists):

```sh
cd ~/actions-runner
sudo ./svc.sh stop
sudo ./svc.sh start
docker ps    # must work without sudo
```

Or, if you started the runner manually with `./run.sh` instead of systemd:

```sh
cd ~/actions-runner
pkill -f "Runner.Listener|Runner.Worker|./run.sh" || true
nohup ./run.sh > _diag/manual-runner.log 2>&1 &
docker ps
```

If you see this:

```plaintext
not installed
```

then `sudo ./svc.sh install` didn't run successfully. Run:

```sh
cd ~/actions-runner
sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
```

If `install` fails, rerun `./config.sh` with a fresh GitHub runner token, then run the install/start commands again.

#### Step 5: Exit the VM

```sh
exit
```

#### Step 6: Verify the runner is connected

Go to github.com/YOUR_USERNAME/clearledger then to Settings, Actions, and Runners.

You should see `clearledger-runner` with a green dot and status **Idle**. Open the runner details and confirm the labels include:

![screenshot image of github ui shpwing runner status as "idle" green](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/f47d23ff-fecf-4789-b8ee-3be4191c1c3a.png)

```plaintext
self-hosted
Linux
X64
clearledger
```

If `clearledger` is missing, add it in the runner settings before rerunning the workflow. The runner name alone is not enough.

**✋ Hands-on checkpoint: runner ready for jobs**

Still on GitHub, Settings, Actions, and Runners, confirm:

| Field | Expected |
| --- | --- |
| Status | **Idle** (green) |
| Labels | includes **`self-hosted` and `clearledger`** |
| OS | Linux |

Then trigger a dry run from your laptop:

```sh
git commit --allow-empty -m "test: verify runner picks up jobs"
git push
```

Open `https://github.com/YOUR_USERNAME/clearledger/actions`. Within 30 seconds a workflow run should show Queued then In progress, not stuck on “Waiting for a runner.” If it waits more than 2 minutes, the labels are wrong. Edit the runner on GitHub and add `clearledger`.

```sh
# If it shows Offline:
#
multipass exec clearledger -- sudo systemctl status actions.runner.*.service
multipass exec clearledger -- journalctl -u actions.runner.*.service --lines=50
```

::: note What you proved

GitHub can now send work into your local lab environment.

:::

### 1.3: Create the Infra Repo on GitHub

Now separate **application code** from **deployment state**. Stage 1 introduces a second GitHub repository alongside the `clearledger` app repo you pushed in §1.1. You'll use two repositories for the rest of the lab:

| Repo | What lives there | Who changes it | Why it exists |
| --- | --- | --- | --- |
| `clearledger` | App source code, Dockerfiles, tests, <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml`, lab docs | You, the developer | This is where code changes start |
| `clearledger-infra` | Kubernetes manifests only: <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`, <VPIcon icon="iconfont icon-yaml"/>`service.yaml`, ingress, secrets templates | The CI pipeline, then ArgoCD reads it | This is the desired state of the cluster |

Think of `clearledger` as the question *“What is the application?”*. Python services, Dockerfiles, tests, and the CI workflow. Think of `clearledger-infra` as *“What exact version should be running in Kubernetes right now?”*. Deployments, Services, ingress rules, and the image tags that point at Docker Hub.

Teams split these on purpose. If you edit <VPIcon icon="fa-brands fa-markdown"/>`README.md` in `clearledger`, that is a documentation change. It shouldn't trigger a deployment.  
If you change `auth-service` code, the pipeline builds a new image (for example tag `abc123`) and, only after scans pass, records that tag in `clearledger-infra`:

```yaml
image: $DOCKER_USERNAME/clearledger-auth-service:abc123
```

That line is a deployment contract: Git now says the cluster *should* run `abc123`. In Stage 1, the cluster doesn't change yet (and you'll prove that in §1.6).  
In Stage 2, ArgoCD watches `clearledger-infra`, compares Git to what is running, and syncs the cluster when they differ. The app repo is where work begins. The infra repo is what production is supposed to look like.

#### Private repos: what syncs where

This lab uses two GitHub repos. `clearledger` is your main project repo: app code, CI pipeline, docs, policies, and lab files. This repo can be private.

`clearledger-infra` contains only Kubernetes manifests. ArgoCD watches this repo and uses it to deploy the app. For beginners, make this repo public so ArgoCD can read it without extra authentication.

The flow looks like this:

```mermaid
flowchart TD
  A[clearledger] --> B[app code + infra/manifests/]
  B --> C[CI copies infra/manifests/]
  C --> D[clearledger-infra<br/>Kubernetes manifests only]
  D --> E[ArgoCD syncs from this repo]
  E --> F[Kubernetes cluster]
```

![flow chart explain how both repos work](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/4aa15b2c-c746-4711-aa64-704a9d3eada2.png)

ArgoCD doesn't read the main `clearledger` repo. It only reads `clearledger-infra`. If `clearledger` is private, that is fine. If `clearledger-infra` is private, you must give ArgoCD GitHub credentials later. If you do not, ArgoCD may show `ComparisonError`.

Create the infra repo on GitHub:

1. Go to GitHub and then **New Repository**
2. Name it `clearledger-infra`
3. Choose **Public**
4. Don't add a README
5. Click **Create**

Later, the CI pipeline will update `clearledger-infra` automatically. In Stage 1, the pipeline doesn't run `kubectl apply` – it updates Git. In Stage 2, ArgoCD reads that Git repo and applies it to the cluster.

::: note Before pushing

Set your Docker Hub username in Kustomize (image tags are resolved here, not in deployment YAML):

```sh
# Replace YOUR_DOCKERHUB_USERNAME with the same value as $DOCKER_USERNAME from §0.3
sed -i.bak "s/YOUR_DOCKERHUB_USERNAME/${DOCKER_USERNAME}/g" infra/manifests/kustomization.yaml
rm -f infra/manifests/kustomization.yaml.bak
```

:::

Push only the Kubernetes manifests from <VPIcon icon="fas fa-folder-open"/>`infra/manifests/` (not everything under <VPIcon icon="fas fa-folder-open"/>`infra/`):

```sh
mkdir -p /tmp/clearledger-infra
cp -r infra/manifests /tmp/clearledger-infra/
cd /tmp/clearledger-infra
git init
git remote add origin https://github.com/YOUR_USERNAME/clearledger-infra.git
git add . && git commit -m "feat: initial manifests" && git push -u origin main
cd -
```

**✋ Hands-on checkpoint: infra repo on GitHub (do this before §1.4)**

On your laptop:

```sh
grep "docker.io/${DOCKER_USERNAME}/" infra/manifests/kustomization.yaml | wc -l
grep YOUR_DOCKERHUB_USERNAME infra/manifests/kustomization.yaml || echo "OK: placeholder replaced"
```

::: note Expected

First command prints `4` (four image lines). Second prints `OK: placeholder replaced`, not four lines still saying `YOUR_DOCKERHUB_USERNAME`.

:::

In the browser, open `https://github.com/YOUR_USERNAME/clearledger-infra/tree/main/manifests` and confirm **with your eyes**:

| File / folder | Must exist |
| --- | --- |
| <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` | Yes. Open it: `newName:` lines use **your** Docker Hub user |
| `auth-service/secret.yaml` | Yes. Stages 2–4 need this until Stage 5 |
| `ledger-service/secret.yaml` | Yes |
| `auth-service/deployment.yaml` | Yes. Open it: must contain `secretKeyRef`, **not** `vault.hashicorp.com` |
| `netpol/` | **No**. If present, delete the folder on GitHub before Stage 2 |
| `vault/` | **No**. Vault rotation is Stage 5 only |

**Which folders matter?** You only pushed <VPIcon icon="fas fa-folder-open"/>`infra/manifests/` to GitHub, that's correct. Everything else in this repo stays local for now.

Some manifests for later stages (network policies, Vault extras) live under <VPIcon icon="fas fa-folder-open"/>`infra/deferred-by-stage/` in the `clearledger` repo. You'll apply those by hand when you reach that stage. Do **not** copy that folder into `clearledger-infra`, or ArgoCD will deploy things too early.

You might notice <VPIcon icon="fas fa-folder-open"/>`stages/stage-1-ci-pipeline/` has no copy of the manifests. That is normal: the lab doesn't duplicate YAML there. The canonical copy is <VPIcon icon="fas fa-folder-open"/>`infra/manifests/` in this repo, and the live GitOps copy is `clearledger-infra` on GitHub.

::: note What you proved

Kubernetes config now has its own repo and Git history, separate from application code. CI will update `clearledger-infra` after each build, and your app repo stays for code and the pipeline file.

:::

### 1.4: Set up GitHub Secrets

Go to <VPIcon icon="iconfont icon-github"/>`github.com/YOUR_USERNAME/clearledger` and then Settings, Secrets and variables, Actions, and New repository secret.

The workflow needs credentials for Docker Hub, GitHub, and image signing:

- Docker Hub, so it can push images.
- GitHub, so it can push image tag updates into `clearledger-infra`.
- Cosign, so it can sign the images after pushing them.

Do **not** paste these values into YAML files. Store them as GitHub Actions secrets.

#### Secret 1, `DOCKER_USERNAME`

This is just your Docker Hub username.

Example:

```plaintext
veeno-demo
```

Get it from Docker Hub: hub.docker.com, profile menu, Account Settings.

#### Secret 2, `DOCKER_PASSWORD`

This should be a Docker Hub **access token**, not your normal Docker Hub password.

Create it here:

```plaintext
hub.docker.com
→ Account Settings
→ Security
→ New Access Token
→ Description: clearledger-github-actions
→ Access permissions: Read, Write, Delete or Read/Write
→ Generate
```

Copy the token immediately. Docker Hub only shows it once.

#### Secret 3, `INFRA_REPO_TOKEN`

This is a GitHub Personal Access Token (PAT). The pipeline uses it to push commits to the second repo, `clearledger-infra`.

Create it here:

```plaintext
GitHub profile settings
→ Settings
→ Developer settings
→ Personal access tokens
→ Tokens (classic)
→ Click "Generate new token"
→ Choose "Generate new token (classic)"
→ If GitHub asks for your password or 2FA, complete it
→ Note: clearledger-infra-ci
→ Expiration: choose a lab-friendly value
→ Select scope: repo
   This allows the pipeline to push to clearledger-infra.
→ Generate token
```

Copy the token immediately. GitHub only shows it once.

For this lab, `repo` scope is the simplest option. In production, you would use tighter permissions, such as a fine-grained token limited to only `clearledger-infra`.

![screenshot of docker ui showing where to set up PAT](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5a0d06bf-570a-4360-aadb-038b7ae7ed4e.png)

![screenshot of docker ui showing where to set up token scope](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/b9e7f0c8-882c-4d15-b67b-d2ff38289836.png)

#### Secrets 4 and 5, `COSIGN_PRIVATE_KEY` and `COSIGN_PASSWORD`

Cosign signs container images after the pipeline pushes them to Docker Hub. Later, Stage 4 uses the public key with Kyverno so the cluster can verify that images came from your trusted pipeline.

Generate the key pair on your host machine, not inside the Multipass VM:

```sh
# macOS: brew install cosign
# Linux/WSL2: curl -sSL -o cosign https://github.com/sigstore/cosign/releases/latest/download/cosign-linux-amd64 && chmod +x cosign && sudo mv cosign /usr/local/bin/
cosign generate-key-pair
```

This creates:

```sh
cosign.key   # private key — never commit this
cosign.pub   # public key — keep for later Kyverno verification
```

When Cosign asks for a password, enter one and save it in your password manager. If you already generated a key without a password, regenerate it with a password for this lab.

Add these five secrets to the `clearledger` repo, not `clearledger-infra`:

| Secret name | Value | Purpose |
| --- | --- | --- |
| `DOCKER_USERNAME` | Your Docker Hub username | Pipeline logs in to push images |
| `DOCKER_PASSWORD` | Your Docker Hub access token | Pipeline authenticates with Docker Hub |
| `INFRA_REPO_TOKEN` | The GitHub PAT from above | Pipeline pushes image tag updates to clearledger-infra |
| `COSIGN_PRIVATE_KEY` | Contents of <VPIcon icon="fas fa-key"/>`cosign.key` | Pipeline signs pushed container images |
| `COSIGN_PASSWORD` | Password used when creating the Cosign key | Unlocks the private key during signing |

![screenshot of github UI showing my repository secrets](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/638009a9-844b-4bcb-9701-6312ec18d5c6.png)

**Repository variables (not secrets)** (optional) toggles for later stages. Add under **Settings, Secrets and variables, Actions, Variables**:

| Variable | Stage 1 | When to enable |
| --- | --- | --- |
| `ENABLE_ARGOCD_SYNC` | Leave **unset** | **Stage 2** — after ArgoCD’s first sync is healthy (see [Enable CI → ArgoCD handoff](#how-to-enable-the-ci-to-argocd-handoff)) |
| `ENABLE_DAST` | Leave **unset** | **Stage 3** — after the app is live at `clearledger.local` (see [Enable DAST](#enable-dast-optional-after-stage-2)) |

Don't add either variable in Stage 1. If you set them now, CI will try to refresh ArgoCD or run ZAP before the cluster is ready, and the pipeline output gets harder to read. The guide calls out the exact moment to turn each one on – you only need to remember that both exist.

::: note What you proved

the pipeline can authenticate to external systems without hardcoding credentials in the repo.

:::

### 1.5: Understand the Pipeline Before Activating it

Don't treat the workflow file as magic. Open <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml` and read it before you run it.

The pipeline has two responsibilities:

1. Prove the code and images are safe enough to publish.
2. Update the infra repo with the new image tags.

Here's the security flow first:

```mermaid
flowchart TD
  A[Developer pushes code to GitHub] --> B[GitHub Actions starts workflow]
  B --> C[Self-hosted runner inside the Multipass VM picks up the job]
  C --> D[1. Scan secrets (Gitleaks)]
  D --> E[2. Run code security scans (Semgrep) + IaC scan (Checkov) — parallel]
  E --> F[3. Prepare scanners (install Trivy/Syft/Grype/Cosign once; refresh Trivy DB once)]
  F --> G[4. BUILD: docker build all four services (local tags only; nothing hits Docker Hub yet)]
  G --> H[5. SCAN: Trivy on all images; Syft + Grype SBOM on auth-service; upload evidence]
  H --> I[6. PUBLISH: push to Docker Hub + Cosign sign (only if scan passed)]
  I --> J[7. UPDATE MANIFESTS: commit new image tags to clearledger-infra]
```

![visual image of the cicd security flow pattern](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/0cea04bf-e166-4fd3-9eb5-1a664e427206.png)

#### Build, scan, publish (prod-style gates)

Real teams never push first and scan later. The pipeline separates three concerns into three jobs in <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml`:

| Job | What it does | If it fails… |
| --- | --- | --- |
| `build-images` | `docker build` all services with tag `${{ github.sha }}` | No registry pollution, images never left the runner |
| `scan-images` | Trivy (all 4 images); Syft + Grype (auth only) | Publish is skipped: bad images never reach Docker Hub |
| `publish-images` | Runs <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`ci-publish-image.sh` tag, push, Cosign sign | Only runs after scan passes |

You do **not** run <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`ci-publish-image.sh` yourself before pushing code. GitHub Actions checks out the repo and calls it inside `publish-images`.

**Why can `build-images` and `scan-images` be separate jobs?** Each job is a fresh checkout on GitHub-hosted runners. They don't share a disk. On **your** self-hosted runner, all three jobs run on the **same Multipass VM** and use the **same Docker engine**.

Job 1 runs `docker build` and leaves the images on that machine. Job 2 runs Trivy against those same local images: no upload, no download. Job 3 pushes to Docker Hub only if the scan passed.

That's a practical lab setup: one persistent build machine with Docker installed, like a dedicated CI worker in a real office. In **Stage 8 (AWS)**, the pipeline uses GitHub-hosted runners instead: there, `build-images` saves the images to a file (`images.tar`) and passes that file to the next job as a workflow artifact, because those runners are throwaway VMs with no shared Docker cache.

Then comes the GitOps handoff:

```mermaid
flowchart TD
  A[Secure images now exist in Docker Hub] --> B[Runner checks out clearledger-infra from GitHub]
  B --> C[Deployment YAML image tags are updated]
  C --> D[Runner commits and pushes back to clearledger-infra]
  D --> E[Stage 1 ends here]
```

![visual image of the cicd security flow pattern and github handoff journey](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3be226da-a7d5-4231-8110-c37f1b8bfdce.png)

::: info Here's how the image tag ties to your code:

every pipeline run is triggered by a git commit. GitHub gives that commit a unique ID called the **SHA** (a long hex string like `a1b2c3d4e5f6789…`). The workflow sets `IMAGE_TAG` to that SHA and uses it everywhere:

1. **Build:** `docker build -t clearledger-auth-service:a1b2c3d4…`
2. **Publish:** push to Docker Hub as `YOUR_DOCKERHUB_USERNAME/clearledger-auth-service:a1b2c3d4…`
3. **Update manifests:** `kustomize edit set image …:a1b2c3d4…` in `clearledger-infra`
4. **Commit message:** `ci: deploy a1b2c3d4… — all gates passed`

:::

If production is running `YOUR_DOCKERHUB_USERNAME/clearledger-auth-service:a1b2c3d4`, you can copy that `a1b2c3d4` tag, open GitHub, and instantly find the exact commit that built that image. There's no guessing and no wondering if `latest` changed. Every deployed image points back to one specific version of the code, making rollbacks and debugging much easier.

#### The Kustomize placeholder

.<VPIcon icon="fas fa-folder-open"/>`auth-service/`<VPIcon icon="iconfont icon-yaml"/>`deployment.yaml` uses a label instead of a real image address:

```yaml title="auth-service/deployment.yaml"
image: clearledger/auth-service:gitops
```

That label isn't on Docker Hub. It tells Kustomize where to substitute. The real address lives in <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml`:

```yaml title="auth-service/kustomization.yaml"
images:
  - name: clearledger/auth-service          # matches the label above
    newName: docker.io/YOUR_DOCKERHUB_USERNAME/clearledger-auth-service
    newTag: abc123def456…                   # real commit SHA — CI writes this
```

When ArgoCD deploys, `kustomize build` swaps the label for the full address.

You edit <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` once in §1.3 to set your Docker Hub username in `newName:`. After that, CI writes `newTag:` automatically on every green push. You never touch it by hand.

#### Stage 1: CI updates GitHub, not the cluster

After a green pipeline run, three things are true:

- New images exist on Docker Hub
- `clearledger-infra` on GitHub has new SHAs in <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml`
- Your Kubernetes cluster is **unchanged**. Still running whatever Stage 0 left there

CI never runs `kubectl apply`. It only commits to `clearledger-infra`. That's the whole Stage 1 lesson: build and scan are automated, but **deploy** is not: yet. Stage 2 installs ArgoCD, which reads `clearledger-infra` and updates the cluster for you.

**Kubernetes Checkov** runs in Stage 1 but does **not** block the pipeline. It uploads findings so you can see hardening work ahead. Stage 4 turns those kinds of rules into cluster enforcement with Kyverno.

Jobs run on your self-hosted runner (`runs-on: [self-hosted, clearledger]`). Both `ENABLE_ARGOCD_SYNC` and `ENABLE_DAST` are unset in Stage 1. See §1.4 for when each gets flipped.

If a job fails, start with [<VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) before editing the workflow.

#### Stage 1 security posture: what blocks vs what waits

Note that stage 1 is not “security off.” Some gates stop the pipeline while others run for evidence and tighten in later stages.

**Blocks the pipeline today:**

- Gitleaks (secrets in Git)
- Semgrep (SAST on Python)
- Checkov on Dockerfiles
- Trivy (fixable HIGH/CRITICAL CVEs in images)
- Grype on auth-service SBOM (fixable HIGH+)
- Manifest update to `clearledger-infra` (must succeed)

**Runs but doesn't block yet:**

- Checkov on Kubernetes manifests – enforced in **Stage 4** (Kyverno)
- Cosign sign + SLSA attest – enforced in **Stage 4** (unsigned images rejected)
- Syft SBOM generation – supply-chain evidence. You'll purposely break gates in **Stage 3.**
- ArgoCD refresh – **Stage 2** (`ENABLE_ARGOCD_SYNC=true`)
- DAST / ZAP – **Stage 3** (`ENABLE_DAST=true`)

**If you forget which stage fixes what**, search this guide for “Stage 1 security posture” or follow the stage order: Stage 3 breaks gates on purpose, Stage 4 connects Checkov findings to Kyverno, Stage 5 moves secrets off Git, Stage 6 adds runtime detection, Stage 7 adds monitoring dashboards.

Run `make check-3` and `make check-4` after those stages to confirm hardening landed.

**Design intent:** Stage 1 proves CI can build, scan, push, and update Git without you touching Docker manually. Later stages turn evidence into enforcement. The relaxations here are deliberate.

### 1.6: Activate the Pipeline

**Run this in the `clearledger` app repo, not `clearledger-infra`**.

§1.3 created `clearledger-infra` with only Kubernetes manifests. It has no <VPIcon icon="fas fa-folder-open"/>`.github/workflows/` and no pipeline. If your shell prompt says `clearledger-infra`, or you used <VPIcon icon="fas fa-folder-open"/>`/tmp/clearledger-infra`, you're in the wrong place.

```sh
cd /path/to/clearledger        # the app repo you pushed in §1.1
git remote -v                  # must show .../clearledger.git — NOT clearledger-infra
ls .github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml   # must exist before you commit
```

The pipeline file already lives at <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml`. Push any small change to `clearledger` on <VPIcon icon="fas fa-code-branch"/>`main`:

```sh
echo "# Pipeline activated $(date)" >> README.md
git add README.md
git commit -m "ci: activate GitHub Actions pipeline"
git push origin main
```

Watch the run at: `https://github.com/YOUR_USERNAME/clearledger/actions` (app repo Actions tab, not the infra repo).

When the pipeline succeeds, it updates `clearledger-infra` for you. You don't need to push anything to the infra repo by hand for this step.

Expected Output: all jobs green in about 8 minutes.

```plaintext
✓ Build + Scan auth-service
✓ Build + Scan ledger-service
✓ Build + Scan notification-service
✓ Build + Scan frontend
✓ Update manifests → GitHub
```

DAST and the ArgoCD refresh step show as **skipped**: this is expected, because Both toggles are unset until later (see §1.4).

::: note

This lab includes <VPIcon icon="iconfont icon-git"/>`.gitleaksignore` because some intentional demo secrets are already present in Git history. Gitleaks still runs normally. The ignore file only suppresses known lab fingerprints. Don't add new findings to it unless you've confirmed they're intentional test data.

:::

Click into the job logs and look for the story. Don't just wait for green:

- Docker login succeeded
- Each service image built and pushed to Docker Hub
- `clearledger-infra` was checked out
- Deployment YAMLs were updated with the new SHA tag
- A commit was pushed back to `clearledger-infra`

After the pipeline succeeds, open `https://github.com/YOUR_USERNAME/clearledger-infra` and look at the deployment manifests. The image tags should now use the current commit SHA.

Now check the cluster:

```sh
kubectl get deployment auth-service -n clearledger \
-o jsonpath='{.spec.template.spec.containers[0].image}' && echo
```

You may still see the old image. That's expected. This is the most important learning in Stage 1:

```plaintext
GitHub pipeline succeeded.
Docker Hub has new images.
clearledger-infra has new image tags.
The Kubernetes cluster did not update automatically.
```

That's not a failure. It's the deployment gap. Stage 1 automated the build, but no controller is watching the infra repo yet. Stage 2 installs ArgoCD to close that gap.

### 1.7 — Hands-on Checkpoint: Prove Stage 1 is Really Done

Don't rely on a green workflow badge alone. Run each check yourself:

#### 1. Infra repo still has app secrets (critical for Stage 2)

Open `https://github.com/YOUR_USERNAME/clearledger-infra/tree/main/manifests/auth-service`, <VPIcon icon="iconfont icon-yaml"/>`secret.yaml` must be visible.

On your laptop:

```sh
git clone --depth 1 https://github.com/YOUR_USERNAME/clearledger-infra.git /tmp/verify-infra
grep secretKeyRef /tmp/verify-infra/manifests/auth-service/deployment.yaml
grep secret.yaml /tmp/verify-infra/manifests/kustomization.yaml
rm -rf /tmp/verify-infra
```

Expected: `secretKeyRef` in deployment output. kustomization lists <VPIcon icon="fas fa-folder-open"/>`auth-service/`<VPIcon icon="iconfont icon-yaml"/>`secret.yaml` and <VPIcon icon="fas fa-folder-open"/>`ledger-service/`<VPIcon icon="iconfont icon-yaml"/>`secret.yaml`. If secrets are missing, re-push §1.3 manifests before Stage 2.

#### 2. Kustomize image tags updated by CI

```sh
git clone --depth 1 https://github.com/YOUR_USERNAME/clearledger-infra.git /tmp/verify-infra
grep newTag /tmp/verify-infra/manifests/kustomization.yaml
rm -rf /tmp/verify-infra
```

::: note Expected

`newTag` is a 40-character git SHA (or your commit hash), not still `v0.1.0` only: unless you haven't pushed since §0.3.

:::

#### 3. Docker Hub has signed images from this pipeline

Open hub.docker.com then `clearledger-auth-service` then **Tags**. The latest tag should match the SHA from step 2.

#### 4. (Cluster unchanged (deployment gap) intentional)

```sh
kubectl get deployment auth-service -n clearledger \
-o jsonpath='{.spec.template.spec.containers[0].image}' && echo
```

::: note Expected

Still your **Stage 0** tag (for example, `veeno-demo/clearledger-auth-service:v0.1.0`), not the new SHA. That proves CI didn't touch the cluster.

:::

#### 5. Runner still idle

GitHub, Settings, Actions, Runners, `clearledger-runner`, **Idle**.

```sh
make check-1
```

All five pass, onto Stage 2.

### What You Learned in Stage 1

- **CI removes your laptop from the build process.** Builds become repeatable, visible, and tied to Git commits.
- **A runner is the worker, not the pipeline itself.** GitHub schedules the job, the self-hosted runner executes it inside your VM.
- **Artifacts and desired state are different things.** Docker Hub stores built images. `clearledger-infra` on GitHub stores the Kubernetes manifests that say which image should run.
- **Good pipelines don't secretly mutate clusters.** This pipeline updates Git instead of running `kubectl`.
- **The gap that remains:** the infra repo changed, but the cluster didn't. Someone still has to apply the change manually. Stage 2 fixes that with GitOps.

::: note What you can now put on your CV / say in an interview

> Built a CI pipeline on a self-hosted GitHub Actions runner that builds and pushes container images on every push, and can debug a workflow that fails before any job is created.

:::

```sh
make snapshot STAGE=1 && make snapshots
```

Confirm `clearledger.stage1`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 2 — GitOps with ArgoCD

From this point on, Git is in charge. Whatever is written in the infrastructure repository is what should be running. If someone changes the cluster by hand, ArgoCD notices the difference and changes it back to match Git.

::: important Goal

Install ArgoCD so it watches `clearledger-infra` and deploys changes to the cluster. The CI pipeline only updates the Git repository, it never connects to Kubernetes or runs `kubectl` commands.

:::

Here's a more conversational, compressed version:

### Am I ready for Stage 2?

Before moving on, finish **§1.6**, then run:

```sh
make check-1

grep secretKeyRef infra/manifests/auth-service/deployment.yaml

grep vault.hashicorp infra/manifests/auth-service/deployment.yaml && echo "STOP: Vault annotations present" || echo "OK"
```

You should see:

- `check-1` passes
- `secretKeyRef` is present
- `OK` (no Vault annotations yet)

Quick checklist:

- `clearledger-infra` contains `auth-service/secret.yaml` and `ledger-service/secret.yaml`
- Your self-hosted runner is **Idle** with the `clearledger` label
- `ENABLE_ARGOCD_SYNC` isn't set yet (you'll enable it after installing ArgoCD)

You're done with Stage 2 when `make check-2` passes and `http://argocd.local` shows ArgoCD syncing `clearledger`.

Finally, save your progress:

```sh
make snapshot STAGE=2
make snapshots
```

Confirm that `clearledger.stage2` appears in the snapshot list.

### What You Need to Know First

**The gap from Stage 1:** CI already builds images and updates `clearledger-infra`. The cluster didn't change until someone ran `kubectl`. This stage closes that last step.

| Who | Job |
| --- | --- |
| **CI** (Stage 1) | Build → scan → push images → update image tags in `clearledger-infra` |
| **ArgoCD** (Stage 2) | Watch `clearledger-infra` → apply manifests → cluster runs what Git says |

```plaintext
push code → CI updates clearledger-infra → ArgoCD syncs cluster
```

### Pre-sync Checklist: Run Before `argocd app sync`

ArgoCD applies whatever is in `clearledger-infra`. Wrong content causes red pods. Re-run the §1.7 checkpoint table to confirm GitHub-side content is still correct, then verify the laptop side:

```sh
# Application manifest must point at YOUR infra repo
grep repoURL stages/stage-2-gitops/argocd/clearledger-app.yaml

# Stage 0 workloads still healthy before ArgoCD takes over
kubectl get pods -n clearledger
curl -s -o /dev/null -w "%{http_code}" http://clearledger.local/auth/health
```

Expected: `repoURL` contains your GitHub username, all app pods `Running`, curl `200`. Only when both pass should you install ArgoCD and sync below.

```sh
kubectl create namespace argocd 2>/dev/null || true
kubectl apply -n argocd --server-side --force-conflicts -f \
https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

kubectl wait --for=condition=ready pod \
-l app.kubernetes.io/name=argocd-server -n argocd --timeout=180s
```

**Why `--server-side --force-conflicts`?** Argo CD ships a very large `applicationsets.argoproj.io` CRD. A normal `kubectl apply` tries to stash the whole thing in an annotation, hits a 256 KiB limit, and errors with `metadata.annotations: Too long`. Server-side apply avoids that. It's [<VPIcon icon="iconfont icon-argocd"/>how Argo CD expects you to install](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/).

Get the admin password:

```sh
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d && echo
```

#### Configure Argo CD for your NGINX ingress

The browser talks HTTPS to ingress and ingress talks plain HTTP to the Argo CD server. Without this, the UI often breaks with `503` or `ERR_TOO_MANY_REDIRECTS` on live-update URLs (`/api/v1/stream/*`).

```sh
kubectl apply -f stages/stage-2-gitops/infra/argocd-cmd-params.yaml
kubectl apply -f stages/stage-2-gitops/infra/argocd-ingress.yaml
kubectl rollout restart deployment/argocd-server -n argocd
kubectl rollout status deployment/argocd-server -n argocd --timeout=180s
```

**Expected in `argocd-cmd-params-cm`:** `server.insecure: "true"`, `server.grpc.web: "true"`, `server.url: https://argocd.local`.

Open `https://argocd.local`. Login: `admin` and the password from above. Accept the self-signed certificate warning if the browser shows one.

::: note Expected

The Applications page loads. In the browser console (F12 Console), you shouldn't see `401` or `ERR_HTTP2_PROTOCOL_ERROR`. If the UI looks fine in a normal window, you're done: incognito isn't required.

:::

**If login fails with `401 Unauthorized`** (often after a config change or a bad earlier login), try a private/incognito window or clear site data for `argocd.local`, then log in again. Still stuck? See [troubleshooting.md. ArgoCD (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md).

Connect ArgoCD to the infra repo and apply the Application manifest:

#### 1. Edit <VPIcon icon="fas fa-folder-open"/> <VPIcon icon="fas fa-folder-open"/>`stages/stage-2-gitops/argocd/`<VPIcon icon="iconfont icon-yaml"/>`clearledger-app.yaml`

Set `spec.source.repoURL` to your infra repo (your GitHub username, not `git config user.name`).

![photo of manifest file pointing to what to change.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/56020fa9-77fa-4d60-bcc5-bbd06b6c809f.png)

#### 2. Connect ArgoCD to your infrastructure repository:

This gives ArgoCD permission to watch `clearledger-infra` for new commits. Whenever the deployment manifests change, ArgoCD will update the cluster automatically.

```sh
# macOS: brew install argocd
argocd login argocd.local --username admin --password YOUR_PASSWORD --insecure --grpc-web

# Public repo
argocd repo add https://github.com/YOUR_USERNAME/clearledger-infra.git --grpc-web

# Private repo — PAT from Stage 1 §1.4 (you saved it as GitHub secret INFRA_REPO_TOKEN)
export INFRA_REPO_TOKEN='ghp_...'   # paste here; GitHub only shows it once at creation
argocd repo add https://github.com/YOUR_USERNAME/clearledger-infra.git \
  --username git --password "$INFRA_REPO_TOKEN" --grpc-web
```

**Verify that Argo CD can reach the repo** (do this before applying the Application):

```sh
argocd repo list --grpc-web
```

Look for your `clearledger-infra` URL with **TYPE** `git` and connection Successful. If it shows Failed or the repo is missing, Argo CD can't sync. Fix credentials before Stage 4 or any stage that depends on GitOps.

After a VM restore or Argo CD reinstall, you may need to run `argocd repo add` again (credentials are stored in the cluster, not in Git).

#### 3. Apply and sync:

```sh
kubectl apply -f stages/stage-2-gitops/argocd/clearledger-app.yaml

argocd app sync clearledger --grpc-web
```

### How to Read the Argo CD UI

After sync, open the **clearledger** application in the tree view. Three badges at the top tell you almost everything:

![screenshot shwoing argocd UI](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/2db73788-ee70-450d-b5ed-00835d50d180.png)

**APP HEALTH: Healthy**. Kubernetes thinks the workloads are running. Pods are up (or still starting if it says Progressing).

**SYNC STATUS: Synced**: the cluster matches `clearledger-infra` on GitHub at the commit shown (for example, <VPIcon icon="fas fa-code-branch"/>`main (2c88aa1)`). Git is the source of truth and Argo CD applied it.

**LAST SYNC: Succeeded**: the most recent apply from Git worked. If this failed, click it for the error.

The resource tree below is the same app broken into pieces: namespace, secrets, services, deployments, ingress, and so on Green checkmarks = applied from Git. Click any box (for example, `deploy/auth-service`) then **Live Manifest** vs **Desired** to see what Argo CD thinks should run.

**Quick "is the app actually working?" test** (outside Argo CD):

```sh
curl -s -o /dev/null -w "%{http_code}\n" http://clearledger.local/auth/health
```

`200` = the app is reachable end-to-end, not only "green in Argo CD."

**When something is wrong:** HEALTH goes **Degraded** or **Progressing** for a long time, SYNC goes **OutOfSync**, and a resource in the tree turns **red**. Click that resource and then **Events** or **Logs**. The kubectl checks below double-check the same thing from the terminal.

Confirm ArgoCD is watching all workloads (not only ingress):

```sh
argocd app resources clearledger --grpc-web | grep Deployment
#
# apps    Deployment    clearledger    auth-service            No
# apps    Deployment    clearledger    frontend                No
# apps    Deployment    clearledger    ledger-service          No
# apps    Deployment    clearledger    notification-service  No
# apps    Deployment    clearledger    redis                   No
```

This command shows the Deployments that ArgoCD is managing for ClearLedger. You should see `auth-service`, `ledger-service`, `notification-service`, `frontend`, and `redis`. That means ArgoCD reads the full <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` from `clearledger-infra/manifests`, not just one file.

The last column is `ORPHANED`. `No` is good. It means ArgoCD knows this resource belongs to the ClearLedger app. You only need to worry if one of the Deployments is missing, or if ArgoCD shows `OutOfSync`, `Degraded`, or red resources in the UI.

**✋ Hands-on checkpoint: first sync healthy**

Run these four checks. Pass looks like this:

```sh
kubectl get pods -n clearledger
# Every app pod 1/1 Running (postgres/redis may show older RESTARTS from VM reboots — OK)

kubectl get application clearledger -n argocd \
  -o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
# sync=Synced health=Healthy

curl -s -o /dev/null -w "%{http_code}\n" http://clearledger.local/auth/health
# 200

kubectl logs -n clearledger deploy/auth-service --tail=5 2>/dev/null | head -3
# Lines like: GET /health HTTP/1.1" 200 OK
# Bad sign: DATABASE_URL is not set
```

If all four pass then, Stage 2 first sync is done. Continue to Enable CI, and ArgoCD handoff below, then `make check-2` and `make snapshot STAGE=2`.

### How to Enable the CI to ArgoCD Handoff

In Stage 1, the pipeline updated `clearledger-infra`, but it didn't update the cluster. That was intentional.

Now ArgoCD is installed, so you can let the pipeline tell ArgoCD to check for changes after each successful run.

In GitHub, open your `clearledger` repo and go to Settings, Secrets and variables, Actions, Variables, and then New repository variable.

Add:

| **Name** | **Value** |
| --- | --- |
| `ENABLE_ARGOCD_SYNC` | `true` |

From now on, a green pipeline does two things:

1. Updates `clearledger-infra` with the new image tag
2. Asks ArgoCD to sync the cluster

If the pipeline can't trigger ArgoCD immediately, that's usually okay. ArgoCD checks `clearledger-infra` on its own every few minutes, so it should still pick up the new Git change.

Leave `ENABLE_DAST` unset for now. You enable that in Stage 3 after the app is stable at `clearledger.local`.

### If the Argocd UI Shows Red Pods or "Progressing" (Read This Before the Screenshot)

This is a common first-sync surprise, not a broken install.

#### Why it happens in Stage 2

ArgoCD syncs whatever is in `clearledger-infra`. Deployments must use `secretKeyRef` (Stages 2–4), not Vault injection. If your infra repo has Vault annotations from an older lab copy, auth/ledger crash with `DATABASE_URL is not set` until Stage 5. Network policies belong to Stage 6. In the main `clearledger` repo, they live in <VPIcon icon="fas fa-folder-open"/>`infra/deferred-by-stage/stage-6-runtime-security/netpol/`, not in <VPIcon icon="fas fa-folder-open"/>`infra/manifests/`. Don't copy them into `clearledger-infra` during Stage 2. If <VPIcon icon="fas fa-folder-open"/>`manifests/netpol/` is still in your `clearledger-infra` repo on GitHub (from an older copy of the lab), ArgoCD will keep applying it. Those policies use **default-deny** and break DNS for new pods, so you see red **0/1** pods and **Progressing** health.

#### Fix for Stage 2

Do **both** steps. Deleting only in the cluster is not enough: ArgoCD recreates policies from Git on the next sync.

**Step 1: remove from `clearledger-infra` on GitHub**

Delete the folder <VPIcon icon="fas fa-folder-open"/>`manifests/netpol/` and commit: `chore: defer network policies to Stage 6`.

**Step 2: sync and restart**

```sh
argocd app sync clearledger --grpc-web
kubectl delete networkpolicy -n clearledger --all   # safe once Git no longer has netpol
kubectl rollout restart deployment/auth-service deployment/ledger-service -n clearledger
argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
```

Network policies stay in `clearledger` under <VPIcon icon="fas fa-folder-open"/>`infra/deferred-by-stage/` until you apply them in Stage 6. When that looks good, continue below.

When ArgoCD finishes syncing, open the `clearledger` app in the ArgoCD UI. You should see green `Healthy` and `Synced` badges. The app should point to your `clearledger-infra` repo, use the `manifests` path, and deploy into the `clearledger` namespace.

Then open the app tile. The resource tree should show your deployments, services, and ingress with no red resources.

You can confirm the same thing from the terminal:

```sh
argocd app get clearledger --grpc-web
```

Look for `Sync Status: Synced` and `Health Status: Healthy`.

### ArgoCD stuck OutOfSync

**Normal path:** CI copies full manifests + updates Kustomize tags, ArgoCD auto-syncs within ~3 minutes.

**If still OutOfSync after 10+ minutes:**

```sh
make fix-argocd
```

This re-syncs canonical manifests to `clearledger-infra` (Kustomize SHAs preserved), re-applies the Application, and triggers a hard refresh. **Don't `kubectl apply` deployments**: fix Git, let ArgoCD sync.

```sh
kubectl annotate application clearledger -n argocd 
argocd.argoproj.io/refresh=hard --overwrite

argocd app sync clearledger --grpc-web --prune

kubectl get application clearledger -n argocd -o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
```

**Take a screenshot of that view**: the app tile or the resource tree is fine. That’s your portfolio proof that GitOps is actually running.

### Prove ArgoCD Self-Healing

Now prove that Git is the source of truth.

In this demo, you'll change the running cluster by hand. You will **not** change Git. ArgoCD should notice that the cluster no longer matches `clearledger-infra`, then change it back.

Before you start, make sure the app is healthy and ArgoCD is managing the deployments:

```sh
argocd app resources clearledger --grpc-web | grep Deployment
```

Manually change the auth-service image in the cluster:

```sh
# Manually change the image in the cluster only (Git stays the same)
kubectl set image deployment/auth-service \
auth-service=$DOCKER_USERNAME/clearledger-auth-service:fake-tag \
-n clearledger
```

Check ArgoCD:

```sh
# ArgoCD should flip to OutOfSync within a minute or two
argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
```

Wait for ArgoCD to fix the cluster. The fake image tag may briefly cause an image pull error. That's expected in this demo.

```sh
# Wait for selfHeal (default sync interval is ~3 minutes)
sleep 180
```

Confirm the image was changed back to the Git version:

```sh
# Cluster image should match clearledger-infra again — Git was never edited
kubectl get deployment auth-service -n clearledger \
-o jsonpath='{.spec.template.spec.containers[0].image}'
```

If the image changed back, ArgoCD self-healing worked. You changed the cluster by hand, but ArgoCD restored it to match `clearledger-infra`.

That's GitOps: Git says what should run, and ArgoCD keeps the cluster matching Git.

```sh
make check-2
```

### How to Roll Back a Bad Deploy

You just proved that ArgoCD reverts unauthorized cluster changes. Now flip it: **what if you pushed a bad commit yourself?** GitOps rollback isn't a button. It's a Git operation. This section explains why, shows you both methods, and has you practice each one before you need them under pressure.

#### How you know you need to roll back

These symptoms appearing within minutes of a push to `clearledger-infra` point at a bad commit:

- Pods stuck in `CrashLoopBackOff` or `Error`. Check with `kubectl get pods -n clearledger`.
- `kubectl logs <pod> -n clearledger --previous` shows startup errors that weren't there before.
- ArgoCD health flips from `Healthy` to `Degraded` or stays on `Progressing`. Check with `argocd app get clearledger --grpc-web`.
- The app returns 5xx errors or login stops working. Check with `curl -I http://clearledger.local/health`.

If this happens right after a push, roll back first. Once the app is stable again, investigate the bad commit.

#### Why ArgoCD rollback isn't just a button

ArgoCD has a rollback button in the UI and an `argocd app rollback` command. Both work. But only if you understand the interaction with `selfHeal`.

Your Application (<VPIcon icon="fas fa-folder-open"/>`stages/stage-2-gitops/argocd/`<VPIcon icon="iconfont icon-yaml"/>`clearledger-app.yaml`) is configured with:

```yaml title="stages/stage-2-gitops/argocd/clearledger-app.yaml"
syncPolicy:
  automated:
    selfHeal: true
```

ArgoCD keeps the cluster matched to Git. In this lab, Git means `clearledger-infra`.

If someone changes the cluster by hand, ArgoCD treats that as drift and changes it back to match Git.

This also affects rollback. The ArgoCD UI rollback changes the cluster, but it doesn't change Git. If `clearledger-infra` still points to the bad version, and self-heal can bring the bad version back.

The safer GitOps rollback is to change Git with `git revert` in `clearledger-infra`. Then ArgoCD syncs the cluster to the reverted, good version.

If you need an emergency UI rollback, turn off auto-sync first, roll back in ArgoCD, then fix Git afterward.

#### Method 1: Git revert (preferred, always try this first)

This is the GitOps way. You don't touch the cluster. You change Git, and ArgoCD syncs the fix.

**When to use:** You have a few minutes and can identify the bad commit in `clearledger-infra`.

**How it works:**

```plaintext
---
title: How it works
---
flowchart TD
  A[Bad commit pushed to clearledger-infra] --> B[ArgoCD auto-synced it (cluster is now broken)]
  B --> C[You run: git revert <bad-commit> && git push]
  C --> D[ArgoCD auto-syncs the revert (cluster is fixed, selfHeal works with you)]
  D --> E[Git history shows the bad deploy AND the revert, full audit trail]
```

![demo showing how argocd works and the flow](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/2371fab2-b05d-4453-ac28-80465a95a88f.png)

**Step-by-step:**

```sh
# 1. Go to your clearledger-infra repo (wherever you cloned it)
cd ~/clearledger-infra  # adjust path if you cloned elsewhere
git pull                # make sure you are up to date

# 2. Find the bad commit
git log --oneline -10

# Output looks like:
# abc1234 update ledger-service image to v1.4.0   ← this broke prod
# def5678 update auth-service image to v1.3.1     ← was fine
# 9a1b2c3 add vault rotation cronjob

# 3. Revert it — this creates a NEW commit, it does not delete history
git revert abc1234 --no-edit

# 4. Push — ArgoCD picks it up automatically within ~3 minutes
git push

# 5. Confirm the cluster recovered
kubectl get pods -n clearledger
argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
# Expected: Sync Status: Synced, Health Status: Healthy
```

This method is preferred because it fixes the source of truth: `clearledger-infra`.

After you push the revert, ArgoCD sees the new Git state and syncs the cluster to it. Nothing fights you because Git and the cluster are supposed to match.

It also leaves a clear history. Git shows the bad deploy, the revert, who made both changes, and when they happened. That's easier to debug, easier to review, and better for compliance.

#### Method 2: Emergency ArgoCD rollback (when the cluster is on fire)

Use this if the cluster is broken right now and you don't have time to push a Git fix. It pins the cluster to a previous known good deployment immediately. You'll still fix Git afterward. This isn't a permanent fix.

::: info When to use

Incident in progress. Pods are crashing, users are affected, and you need the cluster back to a known good state in under 30 seconds.

:::

::: note Before you start

Confirm your ArgoCD CLI session is still valid. If it expired, re-login first: an expired session will silently fail every command below.

```sh
argocd account get-user-info --grpc-web
# If you see "Unauthenticated", re-login:
ARGOCD_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d)

argocd login argocd.local --username admin --password "$ARGOCD_PASSWORD" \
--insecure --grpc-web
```

:::

**Step 1: Disable auto-sync** (critical). Skip this and selfHeal will undo your rollback within 3 minutes.

```sh
argocd app set clearledger --sync-policy none --grpc-web
# Confirm: automated sync is now off
argocd app get clearledger --grpc-web | grep "Sync Policy"
# Expected: Sync Policy: <none>
```

**Step 2: Find the last known-good deployment ID**

```sh
argocd app history clearledger --grpc-web

# Output looks like:
# ID   DATE                           REVISION
# 9    2026-06-05 10:12:00 +0000 UTC  abc1234  ← bad deploy (current)
# 8    2026-06-04 14:46:06 +0000 UTC  def5678  ← known good
# 7    2026-06-01 20:53:19 +0000 UTC  9a1b2c3

# Or check via kubectl (no argocd CLI needed):
kubectl get application clearledger -n argocd \
-o jsonpath='{range .status.history[*]}{.id}{"\t"}{.deployedAt}{"\t"}{.revision}{"\n"}{end}'
```

Use the ID (the number on the left), not the SHA.

**Step 3: Roll back to the good ID**

```sh
argocd app rollback clearledger 8 --grpc-web
```

**Step 4: Confirm the cluster is stable**

```sh
kubectl get pods -n clearledger
# All pods should be Running

argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
# Sync Status:   OutOfSync  ← expected — cluster is at rev 8, Git is still at the bad HEAD
# Health Status: Healthy    ← this is what matters right now
```

`OutOfSync` is correct and expected at this point. The cluster is running the old good revision. Git still has the bad commit. You'll fix that next.

**Step 5: Fix Git (don't leave it broken)**

```sh
cd ~/clearledger-infra
git pull
git revert <bad-commit-sha> --no-edit
git push
```

**Step 6: Re-enable auto-sync**

```sh
argocd app set clearledger \
  --sync-policy automated \
  --self-heal \
  --auto-prune \
  --grpc-web

# Trigger an immediate sync so you do not wait for the next auto-check
argocd app sync clearledger --grpc-web

# Confirm everything is clean
argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
# Expected: Sync Status: Synced, Health Status: Healthy
```

**Never leave auto-sync disabled longer than the incident.** It's your drift-detection and tamper-evidence mechanism: without it, unauthorized `kubectl` changes go undetected. Re-enable it the moment you push the Git fix.

#### Practise the rollback now (before you need it under pressure)

Don't wait for a real incident to run this for the first time. The steps below simulate a bad image tag deploy and walk you through Method 1 (the preferred path).

**Step 1: Push a bad image tag to** `clearledger-infra`

```sh
cd ~/clearledger-infra
git pull

# Edit manifests/notification-service/deployment.yaml
# Change the image tag to a tag that does not exist, e.g.:
#   image: docker.io/$DOCKER_USERNAME/clearledger-notification-service:broken-tag

# Commit and push it
git add manifests/notification-service/deployment.yaml
git commit -m "test: simulate bad deploy with nonexistent image tag"
git push
```

**Step 2: Watch ArgoCD sync the bad state**

```sh
# Give ArgoCD ~3 minutes to pick it up, or trigger immediately:
argocd app sync clearledger --grpc-web

# Watch the notification-service pod fail
kubectl get pods -n clearledger -w
# You will see: notification-service pod stuck in ImagePullBackOff or ErrImagePull
```

**Step 3: Roll back using Method 1**

```sh
cd ~/clearledger-infra

# Revert the bad commit
git revert HEAD --no-edit
git push

# ArgoCD will auto-sync — or trigger it:
argocd app sync clearledger --grpc-web

# Watch pods recover
kubectl get pods -n clearledger -w
# notification-service should return to Running
```

**Step 4: Verify**

```sh
argocd app get clearledger --grpc-web | grep -E "Sync Status|Health Status"
# Expected: Sync Status: Synced, Health Status: Healthy

kubectl get pods -n clearledger
# All pods Running, no ImagePullBackOff
```

You have now practised a rollback end-to-end. The `git revert` commit is permanently in the infra repo's history: a real audit record of a simulated recovery.

#### Quick reference

**Use Method 1 (git revert) when:**

- A bad image tag or manifest was pushed to `clearledger-infra` and you have a few minutes
- Any config change in the infra repo caused pods to break
- This is almost always the right answer. It's fast, safe, and leaves a clean audit trail.

**Use Method 2 (emergency ArgoCD rollback) when:**

- The cluster is broken right now, users are affected, and you need it stable in under 30 seconds
- You're not yet sure which commit caused the problem and need time to investigate: roll back to stabilise, then use `git log` to find the culprit, then fix forward with Method 1

**Neither method applies** when a pod is crashing but nothing was pushed to the infra repo recently. This isn't a rollback problem. Check `kubectl logs`, Vault connectivity, and network policies instead.

`revisionHistoryLimit: 10` in <VPIcon icon="fas fa-folder-open"/>`stages/stage-2-gitops/argocd/`<VPIcon icon="iconfont icon-yaml"/>`clearledger-app.yaml` means ArgoCD always has 10 previous deployments available for emergency rollback. Increase it if your release cadence is high.

### What You Learned in Stage 2

- What GitOps means: Git is the single source of truth, and a tool enforces it
- What ArgoCD does: watches Git, compares it to the cluster, corrects drift automatically
- How the full flow works now: push code, CI builds image, CI updates infra repo, and ArgoCD syncs cluster.
- No one runs `kubectl` to deploy anymore. The pipeline updates Git, ArgoCD does the rest.
- **How to roll back safely:** `git revert` in the infra repo is the correct answer, while ArgoCD emergency rollback is the break-glass option. You must disable auto-sync first or selfHeal will silently undo it.

::: note What you can now put on your CV / say in an interview

> Implemented GitOps with ArgoCD so cluster state is driven from Git, with drift detection, auto-sync, and a Git-based rollback of a bad deploy.

:::

`make snapshot STAGE=2 && make snapshots`. Confirm `clearledger.stage2`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 3 — Security Gates

Every push runs security checks. Some failures stop the pipeline right away. Others you learn from now and enforce in the cluster later (Stage 4).

::: important Goal

Understand six scanners: what each one looks at, what it catches, and how to read a failure. You'll break each gate on purpose (§3.4) so a failed CI job isn't a surprise.

:::

**Ready for Stage 3?**

- `make check-2` passes
- `ENABLE_ARGOCD_SYNC=true` on GitHub (you set this in Stage 2)
- `ENABLE_DAST` still **unset** (turn on later in this stage if you want)
- Argo CD at `http://argocd.local` shows **Synced**
- Optional: skim [Stage 1 security posture](#stage-1-security-posture-what-blocks-vs-what-waits). Stage 1 already ran many of these tools

**Done when:** `make check-3` passes and you triggered each gate once (§3.4). Then `make snapshot STAGE=3` and `make snapshots`.

### What You Need to Know First

One tool isn't enough. Each scanner guards a different layer:

- **Gitleaks**: secrets in code or Git history (API keys, tokens)
- **Semgrep (SAST)**: bugs in your Python/JS source (injection, unsafe patterns)
- **Trivy (SCA + images)**: finds known security vulnerabilities (called CVEs) in your Python/Node.js packages and Docker images. A CVE (Common Vulnerabilities and Exposures) is a publicly tracked software security flaw with a unique identifier.
- **Checkov (IaC)**: misconfigurations in Dockerfiles, Kubernetes manifests, and Stage 8 Terraform.
- **Cosign**: proves images were built and signed by your pipeline

What blocks CI today: secrets, bad code (SAST), vulnerable images, Dockerfile issues on production images.

What waits for later: Some Kubernetes issues are only reported in Stage 1. They show you what still needs hardening. In Stage 4, Kyverno turns the important rules into real cluster enforcement, so unsafe workloads are blocked before they run.

When you `git commit`, hooks on your laptop can scan first (pre-commit). When you `git push`, GitHub Actions scans again on the runner. Same idea twice: catch mistakes before they waste a 10-minute pipeline. Pre-commit is optional to install, as CI always runs on push either way.

### Enable DAST (Optional After Stage 2)

DAST (Dynamic Application Security Testing) scans the **running** app at `http://clearledger.local`. It was off in Stages 1–2 on purpose: Stage 1 never deployed to the cluster, and Stage 2 was about getting GitOps healthy first.

If `make check-2` passes and `curl http://clearledger.local/auth/health` returns `200`, you can turn DAST on:

Go to GitHub and into your `clearledger` repo. Then go to **Settings, Secrets and variables, Actions, Variables**, and **New repository variable**:

| Name | Value |
| --- | --- |
| `ENABLE_DAST` | `true` |

Push a small commit (or re-run the last workflow on <VPIcon icon="fas fa-code-branch"/>`main`). The **DAST (OWASP ZAP + fintech API tests)** job should run instead of **skipped**. A failed ZAP scan is a real finding to investigate. Skipped before this step only means the toggle was off.

### 3.1: Install Pre-commit Hooks

```sh
# macOS (Homebrew — avoids PEP 668 "externally-managed-environment" from pip3):
brew install pre-commit

# Linux/WSL2:
# sudo apt install -y pre-commit
# or: python3 -m pip install --user pre-commit

pre-commit install
pre-commit run --all-files
```

If a hook fails, read the error first. Gitleaks and Ruff should pass before you commit. Some YAML or Terraform hook issues may come from later-stage files. If that happens, continue with the stage instructions and use [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) for Gitleaks or CI scanner failures.

Test it catches secrets locally before CI does:

```sh
echo 'AWS_SECRET = "'$(printf '%s%s' 'AKIA' 'IOSFODNN7EXAMPLE')'"' >> app/auth-service/main.py
git add app/auth-service/main.py && git commit -m "test"

# Gitleaks fires and blocks the commit — see "What you should see" below

git restore --staged app/auth-service/main.py

git checkout app/auth-service/main.py
```

The commit was blocked before it even reached Git. If the pre-commit hook wasn't installed, that fake AWS key would be in your Git history permanently (even if you delete the line later, Git remembers).

**If you already did Cosign in Stage 1,** that counts. Stage 3 doesn't require regenerating keys. Confirm that <VPIcon icon="fas fa-folder-open"/>`infra/cosign.pub` exists and GitHub has `COSIGN_PRIVATE_KEY` + `COSIGN_PASSWORD`. Stage 4 turns signing into **enforcement** at the cluster gate.

**✋ Hands-on checkpoint: pre-commit actually blocks a secret**

Installed-but-not-wired is the classic silent failure. Prove the hooks fire:

```sh
echo 'AWS_SECRET='"$(printf '%s%s' 'AKIA' 'IOSFODNN7EXAMPLE')" > leak-test.env

git add leak-test.env

pre-commit run --all-files; echo "exit=$?"

git reset leak-test.env >/dev/null; rm -f leak-test.env
```

::: note Expected

The secret-scanning hook **fails** the run (`exit=1`) and flags `leak-test.env`. If `exit=0`, your hooks are installed but not catching anything: re-run `pre-commit install` and confirm <VPIcon icon="fas fa-folder-open"/>`.git/hooks/pre-commit` exists.

:::

If you skip this, commits sail through unscanned and you'll believe Stage 3 is protecting you when it's not.

### 3.2: Generate Cosign Keys

If you created Cosign keys in Stage 1 (§1.4), skip generation: go straight to inserting `cosign.pub` into the Kyverno policy and adding the GitHub secrets below.

**Cosign** signs your Docker images with a cryptographic key. When you deploy to the cluster, Kyverno (Stage 4) can verify the signature and reject any image that wasn't signed by your pipeline. This prevents someone from pushing a malicious image to your Docker Hub and having the cluster run it.

```sh
# macOS: brew install cosign

# Linux/WSL2: curl -O -L https://github.com/sigstore/cosign/releases/download/v2.2.4/cosign-linux-amd64 && chmod +x cosign-linux-amd64 && sudo mv cosign-linux-amd64 /usr/local/bin/cosign

cosign generate-key-pair   # enter a password when prompted
```

This creates two files: <VPIcon icon="fas fa-key"/>`cosign.key` (private, used by the pipeline to sign) and `cosign.pub` (public, used by Kyverno to verify).

Insert your public key into the Kyverno policy (replace the placeholder block in <VPIcon icon="fas fa-folder-open"/>`infra/policies/require-signed-images.yaml` with the contents of `cosign.pub`).

Add secrets to GitHub (github.com/YOUR_USERNAME/clearledger → Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `COSIGN_PRIVATE_KEY` | Contents of <VPIcon icon="fas fa-key"/>`cosign.key` |
| `COSIGN_PASSWORD` | The password you entered when generating keys |

**✋ Hands-on checkpoint: Cosign keys are ready**

Stage 4 uses `cosign.pub` to verify signed images. Before you continue, confirm the key files exist and the private key isn't tracked by Git:

```sh
test -f cosign.key && echo "private key present"
test -f cosign.pub && echo "public key present"
grep -q "BEGIN PUBLIC KEY" cosign.pub && echo "public key valid"
git check-ignore cosign.key && echo "private key correctly ignored"
```

::: note Expected

all four lines should print.

:::

If `git check-ignore cosign.key` prints nothing, add <VPIcon icon="fas fa-key"/>`cosign.key` to <VPIcon icon="iconfont icon-git"/>`.gitignore` before committing anything. The private key must stay out of Git.

Don't skip this check. Stage 4 needs the public key for the Kyverno image-signing policy, and the private key must remain local.

### 3.3: Activate the Full Security Pipeline

The security gates are already in <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yaml`. Push any change to trigger the full pipeline:

```sh
git add . && git commit -m "ci: full DevSecOps pipeline" && git push origin main
```

### 3.4: Break Each Gate on Purpose

For each gate, you'll want to break something on purpose, read how the tool reports it, revert, and confirm green again. Try the local command first, then push once if you want a screenshot on GitHub Actions.

```sh
# 1. Break it   2. Run locally or push   3. Read the failure
# 4. git checkout -- path/to/file   5. pre-commit run --all-files (optional)   6. git push
```

Start with **Gate 1** end-to-end before the others.

#### Gate 1: Gitleaks (secrets)

**Inject:** hardcoded AWS key in any Python file.

The goal is to prove the secret scanner works.

This command adds a fake AWS-looking key to <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py`:

```sh
echo 'AWS_KEY = "'$(printf '%s%s' 'AKIA' 'IOSFODNN7EXAMPLE')'"' >> app/auth-service/main.py

git add app/auth-service/main.py && git commit -m "test: trigger gitleaks"
# pre-commit blocks this commit locally — that is the test.
# For a CI screenshot only: git commit --no-verify -m "test: trigger gitleaks" && git push
#
# 🔑 Secrets scan (Gitleaks)...............................................Failed
# - hook id: gitleaks
# - exit code: 1
# 
# Finding:     AWS_KEY = "REDACTED"
# RuleID:      aws-access-token
# File:        app/auth-service/main.py
# Line:        316
```

::: note Expected

The commit should fail. Gitleaks should report one secret finding in <VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py`.

:::

That failure is good. It means the local pre-commit hook caught the secret before it reached Git.

**Revert:**

```sh
git restore --staged app/auth-service/main.py 2>/dev/null
git checkout app/auth-service/main.py
pre-commit run gitleaks --all-files   # → Passed
```

#### Gate 2: Semgrep (SAST)

**Local dry-run** (no repo change):

```sh
python3 -m venv /tmp/sec-gates-venv && /tmp/sec-gates-venv/bin/pip install semgrep
cat > /tmp/semgrep-bad.py << 'EOF'
import subprocess
from fastapi import Request
def bad(request: Request):
    subprocess.run(request.query_params.get("cmd"), shell=True)
EOF
/tmp/sec-gates-venv/bin/semgrep \
--config=p/python --config=p/security-audit --config=p/owasp-top-ten --error \
/tmp/semgrep-bad.py
```

**Break CI**: add a temporary file Semgrep will scan, commit, and push:

```sh
cat > app/auth-service/gate_test_semgrep.py << 'EOF'
import subprocess
from fastapi import Request
def bad(request: Request):
    subprocess.run(request.query_params.get("cmd"), shell=True)
EOF

git add app/auth-service/gate_test_semgrep.py && git commit -m "test: trigger semgrep" && git push
```

::: note Expected result

Semgrep reports `subprocess-shell-true` as `Blocking`. The `SAST (Semgrep)` job turns red, and the image build jobs don't run.

:::

**Revert:**

```sh
rm -f app/auth-service/gate_test_semgrep.py
git add -A && git commit -m "revert: semgrep gate test" && git push
```

#### Gate 3: Checkov (IaC / Dockerfile)

Checkov scans Dockerfiles and Kubernetes manifests for unsafe configuration.

First, run a local demo. This removes the `HEALTHCHECK` from a copied Dockerfile and shows how Checkov reports it:

```sh
python3 -m venv /tmp/sec-gates-venv && /tmp/sec-gates-venv/bin/pip install checkov
sed '/^HEALTHCHECK/,+1d' app/auth-service/Dockerfile > /tmp/Dockerfile-nohc
mkdir -p /tmp/checkov-demo/app/auth-service
cp /tmp/Dockerfile-nohc /tmp/checkov-demo/app/auth-service/Dockerfile
/tmp/sec-gates-venv/bin/checkov --directory /tmp/checkov-demo --framework dockerfile
```

Now trigger a Checkov finding in CI by exposing SSH port `22` in the auth-service Dockerfile:

```sh
echo 'EXPOSE 22' >> app/auth-service/Dockerfile
git add app/auth-service/Dockerfile && git commit -m "test: trigger checkov" && git push
```

::: note Expected result

The Checkov log or artifact should show `CKV_DOCKER_1`, which means an SSH port was exposed.

:::

The `IaC Scan (Checkov)` job may or may not turn red, depending on the severity Checkov assigns. That's okay for this exercise. The goal is to find and understand the Checkov result.

If you need a screenshot of a failed GitHub Actions job, use Gate 1, Gate 2, or Gate 4. Those are designed to turn the workflow red. Checkov is mainly for reading the finding, so it may stay green.

**Revert:**

```sh
git checkout app/auth-service/Dockerfile
git commit -am "revert: checkov gate test" && git push
```

#### Gate 4: Trivy (image CVEs)

**Local dry-run**: scan an old base image (no build):

```sh
trivy image --exit-code 1 --severity CRITICAL,HIGH --ignore-unfixed python:3.8-slim
```

**Break CI**: pin an old base in the Dockerfile, push, wait for `Scan images`:

```sh
sed -i.bak 's/FROM python:3.13-slim/FROM python:3.8-slim/' app/auth-service/Dockerfile
git add app/auth-service/Dockerfile && git commit -m "test: trigger trivy" && git push
```

**Pass:** `Scan images` → **Trivy scan all images** exits 1 with a CVE table (`HIGH` / `CRITICAL`). `Publish images` and `Update Manifests` are skipped.

**Revert:**

```sh
git checkout app/auth-service/Dockerfile
git commit -am "revert: trivy gate test" && git push
```

### 3.5: When a Scan Fails on a CVE You Didn't Inject

§3.4 is deliberate. This section is for the other case where you push normal code, but the image scan fails because a new vulnerability was found.  
That's normal. CVE databases update all the time. Don't weaken the scan. Fix the vulnerable package or image.

First, find the real CVE. In GitHub Actions, open **Scan images** then go to **Trivy scan all images** and look for the table with:

- Package
- CVE
- Installed version
- Fixed version You can also download the artifact:

**Ignore this red herring** at the bottom of the log:

```plaintext
Version 0.71.2 of Trivy is now available
Error: Process completed with exit code 1.
```

The version notice doesn't fail the job. A fixable HIGH/CRITICAL CVE does. Don't add `--skip-version-check` to “fix” it.

**Instead, fix it with:**

- **pip package**: bump to the Fixed Version in `requirements.txt` (example: `python-multipart==0.0.30` for CVE-2026-53539). Apply the same bump to sibling services if they share that pin.
- **OS package**: newer base image or a targeted `apt`/`apk` upgrade in the Dockerfile.
- **No stable fix yet** documented exception only: add the CVE to `.trivyignore` and `.grype.yaml` with a comment (see `CVE-2026-7210`).

Don't remove `--exit-code 1`, lower the severity rule, or disable scanning. For help, see [Trivy version notice (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md#trivy-version-x-is-now-available-notice-not-a-scan-failure) and [Trivy blocks Python service images (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md).

### Finish Stage 3

For screenshots, use one clear failed gate:

- Gitleaks: `Secrets Scan`
- Semgrep: `SAST`
- Trivy: `Scan images`
- Checkov: look for `CKV_*` in the log or artifact. The job may stay green

After each test in §3.4, undo the test change, push the revert, and confirm the workflow is green again. One red GitHub Actions screenshot is enough for your portfolio.

**Run the stage check:**

```sh
make check-3   # must end: All checks passed. Ready for the next stage.
```

::: note Expected

```plaintext
All checks passed. Ready for the next stage.
```

:::

You should also have triggered at least one gate in §3.4. A local Gitleaks failure counts.

`ENABLE_DAST=true` is optional. You only need it if you want to run ZAP later.

**Not required yet:** Checkov blocking Kubernetes manifests or Cosign blocking deployments. Stage 4 turns those into cluster enforcement with Kyverno.

Next, save your progress:

```sh
make snapshot STAGE=3 && make snapshots
```

---

## Stage 4 — Admission Control (Kyverno)

Even if CI passes, the cluster can still refuse.

CI scans your code and images before they reach GitOps, but it can't watch everything that happens inside the cluster. Someone with `kubectl` access could apply a manifest directly.

A Helm chart you install might create pods that violate your security standards. Those paths never hit the pipeline, which is why Stage 4 adds admission control: a checkpoint built into Kubernetes itself.

Every time something tries to create or update a resource, the request passes through admission webhooks before it takes effect. If a webhook rejects the request, the resource is never created.

**Kyverno** is a Kubernetes-native policy engine that uses those webhooks. You write policies as YAML files (not application code), and Kyverno enforces them on every matching resource in the cluster, for example, rejecting any pod that runs as root or requiring CPU and memory limits on every container.

The difference from CI is timing: CI scans *before* code ships, while Kyverno enforces at the *cluster gate*. Together they give you two layers of defense.

Your goal in this stage is to install Kyverno, apply the policies in <VPIcon icon="fas fa-folder-open"/>`infra/policies/`, and prove in §4.4 that non-compliant pods are denied before the container runtime ever sees them.

Before you start, make sure the foundation from earlier stages is still solid: `make check-3` should pass (pre-commit hooks and CI security gates are active), <VPIcon icon="fas fa-folder-open"/>`infra/cosign.pub` should exist from Stage 3, and ArgoCD should still be syncing so the app responds at `http://clearledger.local`. If any of those are red, fix them first: Kyverno sits on top of a healthy cluster, not a broken one.

You're done with Stage 4 when all three break-it scenarios in §4.4 are denied and `make check-4` passes.

**What changes from Stage 3 is enforcement, not scanning.** In CI, Checkov reported Kubernetes misconfigurations but didn't block the pipeline. Kyverno now stops those same classes of problems at the cluster gate.

Cosign has been signing your images since Stage 1. Kyverno now *requires* that signature before a ClearLedger image can deploy. This is where [Stage 1 evidence becomes enforcement](#stage-1-security-posture-what-blocks-vs-what-waits). See that section if you want the full map of what blocked in Stage 1 versus what waited for Stage 4. Start with §4.1 to install Kyverno. If the install, policies, break-it scenarios, or `make check-4` fail, read [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) and **Stage 4: Admission Control (Kyverno)** before changing Helm values or policy YAML.

### What Kyverno Enforces

All policy files live in <VPIcon icon="fas fa-folder-open"/>`infra/policies/`. Kyverno itself is installed via Helm using <VPIcon icon="fas fa-folder-open"/>`stages/stage-4-admission-control/infra/kyverno/`<VPIcon icon="iconfont icon-yaml"/>`values.yaml`.

| Policy | What it enforces | Framework |
| --- | --- | --- |
| `disallow-root-containers` | `runAsNonRoot: true` | CIS K8s 5.2.6 |
| `require-resource-limits` | CPU/memory requests and limits | CIS K8s 5.2.4 |
| `disallow-privilege-escalation` | `allowPrivilegeEscalation: false` | CIS K8s 5.2.5 |
| `drop-all-capabilities` | `capabilities.drop: [ALL]` | CIS K8s 5.2.7 |
| `require-signed-images` | Cosign signature on ClearLedger images | SLSA Level 2 |

### Platform Stability: From Stage 4 Onward

From Stage 4 on, you're running more controllers on a single-node VM. Kyverno, storage provisioners, and later Prometheus and Loki. A pod can show `Running` while it's actually crash-looping in the background.

When platform pods (Kyverno controllers, `hostpath-provisioner`, the Prometheus operator, and similar) accumulate high `RESTARTS`, the API server starts timing out, `kubectl` feels flaky, and you can waste days debugging the wrong component because the app pods look fine.

After every stage from here on, give the cluster about ten minutes to settle, then run the stage health check:

```sh
bash scripts/health-check.sh <stage>    # for example, 4, 7, 7.5
# or the Makefile shortcut:
make check-4
```

The script ends with a Platform stability section that flags pods with suspicious restart counts. You can also scan the worst offenders yourself. This lists the fifteen pods with the highest restart counts cluster-wide, which is useful when something feels slow but you're not sure which namespace is struggling:

```sh
kubectl get pods -A --sort-by='.status.containerStatuses[0].restartCount' \
-o custom-columns='NS:.metadata.namespace,NAME:.metadata.name,RESTARTS:.status.containerStatuses[0].restartCount' \
| tail -15
```

**The gate:** Kyverno controllers and other platform pods should show **RESTARTS under 5** after the stage settles. If any platform pod is climbing past 10, stop and fix it with the documented Helm values or [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md). Don't `kubectl patch` around it and move on. A stable platform layer is a prerequisite for every stage that follows.

### 4.1: Install Kyverno

```sh
helm repo add kyverno https://kyverno.github.io/kyverno/
helm repo update

helm upgrade --install kyverno kyverno/kyverno \
--version 3.2.8 \
--namespace kyverno \
--create-namespace \
-f stages/stage-4-admission-control/infra/kyverno/values.yaml \
--wait --timeout=600s
```

The values file does three important things for the lab:

1. **Disables cleanup CronJobs**: older Kyverno charts pull `bitnami/kubectl`, which was removed from Docker Hub and causes `ImagePullBackOff` on cleanup pods.
2. **Points Helm hooks at** `bitnamilegacy/kubectl`, so future `helm uninstall` doesn't hang on a missing image.
3. **Extends liveness probe timeouts**: the default `timeoutSeconds: 5, failureThreshold: 2` is too tight for a loaded single-node VM. Under CPU pressure, the health endpoint can take >5s to respond, which triggers a restart cascade that saturates the node and makes the API server intermittently unreachable. The values file sets `timeoutSeconds: 30, failureThreshold: 5` so Kyverno survives load spikes without crash-looping.

**What you should see:**

```plaintext
Release "kyverno" does not exist. Installing it now.
NAME: kyverno
NAMESPACE: kyverno
STATUS: deployed
...
Kyverno version: v1.12.6
```

Verify all four controllers are running (first pull can take several minutes on a slow connection):

```sh
kubectl get pods -n kyverno
#
# NAME                                             READY   STATUS    RESTARTS   AGE
# kyverno-admission-controller-bd685cd4b-f6kl6     1/1     Running   0          2m
# kyverno-background-controller-66fcfc6d87-59wgt   1/1     Running   0          2m
# kyverno-cleanup-controller-5c5bf8bc6b-7kspq      1/1     Running   0          2m
# kyverno-reports-controller-5cdd6f4c48-qf5wc      1/1     Running   0          2m
```

If pods stay in `ContainerCreating` for a long time, the node is still pulling images from `ghcr.io/kyverno`. Wait. Don't start a second Helm install on top of a partial one.

#### Stability gate: Kyverno install only (before §4.2):

Before continuing, make sure the Kyverno pods are healthy:

```sh
kubectl get pods -n kyverno
```

::: note Expected

the Kyverno controller pods show `1/1 Running`, with low restart counts such as `0`, `1`, or `2`, and the restart count isn't increasing.

:::

Don't run `make check-4` yet. That check also looks for the policies you apply later in §4.3, so it may fail at this point even if Kyverno installed correctly.

### 4.2: Confirm your Cosign Public Key is in the Policy

Stage 3 created <VPIcon icon="fas fa-folder-open"/>`infra/cosign.pub`. Kyverno uses that same key to verify image signatures when a pod is created. The policy file ships with a placeholder. You must replace it with your key before applying policies in §4.3.

#### Step 1: Show your key (run from the repo root on the VM)

```sh
cd ~/clearledger    # or wherever you cloned the repo
cat infra/cosign.pub
```

You should see three lines: `-----BEGIN PUBLIC KEY-----`, a long base64 line, and `-----END PUBLIC KEY-----`. Copy that whole block (you'll paste it in the next step).

#### Step 2: Paste the key into the policy

Open <VPIcon icon="fas fa-folder-open"/>`infra/policies/`<VPIcon icon="iconfont icon-yaml"/>`require-signed-images.yaml` in your editor (`nano`, `vim`, or VS Code).

Find this line:

```yaml
                      PASTE_YOUR_COSIGN_PUBLIC_KEY_HERE
```

Delete **only** that placeholder line and paste the three lines from `cosign.pub` in its place. The result should look like this (your base64 line will differ):

```yaml
                - keys:
                    publicKeys: |-
                      -----BEGIN PUBLIC KEY-----
                     JFkwEwYHKoZIzj0CAQYIKoFIzj0DAQcDQgZEI...
                      -----END PUBLIC KEY-----
```

Save the file. Keep the pasted key indented under `publicKeys: |-`. The `BEGIN PUBLIC KEY` and `END PUBLIC KEY` lines should have spaces before them, just like the base64 line between them.

#### Step 3: Verify (three quick checks)

Run these one at a time from the repo root:

```sh
# Check A — placeholder must be gone
grep PASTE_YOUR_COSIGN_PUBLIC_KEY_HERE infra/policies/require-signed-images.yaml \
&& echo "❌ FAIL: placeholder still in file — edit and save again" \
|| echo "✓ OK: placeholder removed"
```

```sh
# Check B — key block must be present exactly once
grep -c "BEGIN PUBLIC KEY" infra/policies/require-signed-images.yaml
```

Expected output for Check B: `1` (if you see `0`, the key was not pasted. If `2`, you pasted it twice).

```sh
# Check C — policy key must match cosign.pub byte-for-byte
diff infra/cosign.pub \
<(sed -n '/-----BEGIN PUBLIC KEY-----/,/-----END PUBLIC KEY-----/p' \
infra/policies/require-signed-images.yaml | sed 's/^[[:space:]]*//')
```

Expected output for Check C: **nothing**. No diff lines means the keys match. If `diff` prints differences, open the policy file and fix the paste.

If all three passed, continue to §4.3. **If you skip this**, Scenario 3 in §4.4 fails in a confusing way: unsigned images may slip through, or signed pods may be rejected because Kyverno is checking against the wrong key.

### 4.3: Apply the Five Core Policies

Now you'll apply the five policies that map to CIS controls. Don't apply <VPIcon icon="iconfont icon-yaml"/>`verify-slsa-provenance.yaml` yet. It's an optional SLSA attestation policy (Audit mode) for a later enhancement.

Stage 4 applies <VPIcon icon="fas fa-folder-open"/>`infra/policies/`<VPIcon icon="iconfont icon-yaml"/>`require-signed-images.yaml`. This policy uses `failurePolicy: Fail`, so if Kyverno can't verify an image signature, the pod is blocked instead of allowed. The ECR policy with `failurePolicy: Ignore` is for Stage 8, not this step.

![screenshot image showing infra policy Yaml file failurePolicy as "Fail"](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/67a638f5-65b8-41d2-be68-babe6c7b8c99.png)

```sh
kubectl apply \
-f infra/policies/disallow-root.yaml \
-f infra/policies/disallow-privilege-escalation.yaml \
-f infra/policies/drop-all-capabilities.yaml \
-f infra/policies/require-resource-limits.yaml \
-f infra/policies/require-signed-images.yaml
```

Wait a few seconds, then confirm all policies show `READY: True` and `VALIDATE ACTION: Enforce`:

```sh
kubectl get clusterpolicy
#
# NAME                            ADMISSION   BACKGROUND   VALIDATE ACTION   READY   AGE
# disallow-privilege-escalation   true        true         Enforce           True    10s
# disallow-root-containers        true        true         Enforce           True    10s
# drop-all-capabilities           true        true         Enforce           True    10s
# require-resource-limits         true        true         Enforce           True    10s
# require-signed-images           true        false        Enforce           True    10s
```

If `READY` stays empty, check Kyverno logs:

```sh
kubectl logs -n kyverno \
-l app.kubernetes.io/component=admission-controller \
--tail=50
```

### 4.4: Breaking it on Purpose

Now you'll test the policies by trying to create bad pods.

These pods are supposed to fail. That's the point.

CI tools like Checkov warn you in a report. Kyverno goes further: it blocks unsafe pods before Kubernetes runs them.

For each test, read the error message, as it should tell you which policy blocked the pod and what field was wrong. That error message is your proof that admission control is working.

| Scenario | What you simulate | Policy under test | Success looks like |
| --- | --- | --- | --- |
| 1 | Attacker applies a bare pod (no hardening) | Root, caps, privilege, limits | Four policies fire, pod `NotFound` |
| 2 | Developer fixes securityContext but forgets limits | Resource limits only | One policy fires, pod `NotFound` |
| 3 | Attacker pushes unsigned image to Docker Hub | Cosign signature | `require-signed-images` denies, pod `NotFound` |

#### Scenario 1: root container (no securityContext)

**What you're simulating:** Someone with `kubectl` access bypasses CI and applies a minimal pod: no `securityContext`, no resource limits.

This is exactly what Stage 1 Checkov flagged as evidence. Stage 4 now blocks it.

**What's wrong with this manifest:** The container has only a name and image. It will run as root by default, keep all Linux capabilities, and has no CPU/memory bounds.

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: root-test
  namespace: clearledger
spec:
  containers:
    - name: test
      image: nginx:alpine
EOF
```

**What you should see:**

```yaml :collapsed-lines
Error from server: error when creating "STDIN": admission webhook "validate.kyverno.svc-fail" denied the request:

resource Pod/clearledger/root-test was blocked due to the following policies

disallow-privilege-escalation:
  check-allowPrivilegeEscalation: 'validation error: allowPrivilegeEscalation must
    be set to false. rule check-allowPrivilegeEscalation failed at path /spec/containers/0/securityContext/'
disallow-root-containers:
  check-runAsNonRoot: |-
    validation error: Root containers are blocked in the clearledger namespace. Set securityContext.runAsNonRoot: true on the pod or container.
    . rule check-runAsNonRoot failed at path /spec/containers/0/securityContext/
drop-all-capabilities:
  check-capabilities: 'validation error: All containers must drop ALL capabilities.
    rule check-capabilities failed at path /spec/containers/0/securityContext/'
require-resource-limits:
  check-resources: 'validation error: Resource requests and limits are required for
    all containers. rule check-resources failed at path /spec/containers/0/resources/limits/'
```

**How to read this output:**

The important line is:

```plaintext
resource Pod/clearledger/root-test was blocked due to the following policies
```

That means Kyverno stopped the pod before it was created.

Under that line, Kyverno lists every policy the pod failed. For example:

```plaintext
disallow-root-containers:
  check-runAsNonRoot:
```

This means the pod failed the `disallow-root-containers` policy, specifically the `check-runAsNonRoot` rule. The fix is also shown in the message:

```plaintext
Set securityContext.runAsNonRoot: true
```

The same pattern applies to the other policies:

- `disallow-privilege-escalation` means the pod didn't set `allowPrivilegeEscalation: false`
- `drop-all-capabilities` means the pod didn't drop Linux capabilities with `capabilities.drop: [ALL]`
- `require-resource-limits` means the pod didn't set CPU and memory requests/limits

The `path` part tells you where Kubernetes expected the missing setting. For example, `/spec/containers/0/securityContext/` means: look inside the pod spec, then the first container, then its `securityContext`.

And `/spec/containers/0/resources/limits/` means: look inside the first container's resource limits.

So this one bad pod failed four controls at once. That's the lesson: Kyverno doesn't just say "no." It tells you which policy failed and where to fix the YAML.

**Verify enforcement worked:**

```sh
kubectl get pod root-test -n clearledger
# Error from server (NotFound): pods "root-test" not found
```

If you see a pod in `Running` or `Pending`, policies aren't enforcing: re-check that `kubectl get clusterpolicy` shows all five `READY: True`.

**Take a screenshot.** This is portfolio evidence for CIS Kubernetes Benchmark 5.2.6: enforced, not just configured.

#### Scenario 2: missing resource limits

**What you're simulating:** A developer who read the securityContext requirements and fixed root/caps/privilege. But skipped resource limits.

This is common in real teams: “we hardened the container” but forgot CPU/memory bounds.

**What's wrong with this manifest:** `securityContext` is correct, but there's no `resources.requests` or `resources.limits`. A container without limits can starve other workloads on the node.

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: nolimits-test
  namespace: clearledger
spec:
  containers:
    - name: test
      image: nginx:alpine
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        allowPrivilegeEscalation: false
        capabilities:
          drop: [ALL]
EOF
```

**What you should see:**

```plaintext
Error from server: error when creating "STDIN": admission webhook "validate.kyverno.svc-fail" denied the request:

resource Pod/clearledger/nolimits-test was blocked due to the following policies

require-resource-limits:
  check-resources: 'validation error: Resource requests and limits are required for
    all containers. rule check-resources failed at path /spec/containers/0/resources/limits/'
```

**Key observation:** Only one policy fires this time: the securityContext fields satisfied the other four rules. Kyverno evaluates rules independently. Each container property is a separate gate.

**Verify:**

```sh
kubectl get pod nolimits-test -n clearledger
# Error from server (NotFound): pods "nolimits-test" not found
```

#### Scenario 3: unsigned ClearLedger image

**What you're simulating:** A supply-chain attack: someone pushes a malicious image to Docker Hub under your repo name (`clearledger-auth-service`) without going through your signed CI pipeline. Stage 3 made Cosign signing possible, while Stage 4 makes it mandatory at the cluster gate.

**Why this setup is needed:** Kyverno checks image signatures against the image in Docker Hub, not against images on your laptop. The test image tag must exist in Docker Hub first.

If you use a fake tag like `:unsigned` that was never pushed, Kubernetes may fail later with `ImagePullBackOff`. That only means the image can't be pulled; it doesn't prove Kyverno blocked an unsigned image.

#### Step 1: push a deliberately unsigned test image (one-time):

```sh
export DOCKER_USERNAME=your-dockerhub-username

docker pull nginx:alpine
docker tag nginx:alpine ${DOCKER_USERNAME}/clearledger-auth-service:unsigned-test
docker push ${DOCKER_USERNAME}/clearledger-auth-service:unsigned-test

# Must fail — proves the image has no Cosign signature from your pipeline key:
cosign verify --key infra/cosign.pub \
  index.docker.io/${DOCKER_USERNAME}/clearledger-auth-service:unsigned-test
# Error: no signatures found
```

#### Step 2: try to deploy it with a compliant pod spec:

The pod manifest is fully hardened (securityContext + limits) so only the signature policy can fail. Use `index.docker.io/` in the image URL: on Kyverno 1.12, `docker.io/...` may not trigger `verifyImages` matching.

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: unsigned-test
  namespace: clearledger
spec:
  containers:
    - name: test
      image: index.docker.io/${DOCKER_USERNAME}/clearledger-auth-service:unsigned-test
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        allowPrivilegeEscalation: false
        capabilities:
          drop: [ALL]
      resources:
        requests:
          memory: "64Mi"
          cpu: "50m"
        limits:
          memory: "128Mi"
          cpu: "200m"
EOF
```

**What you should see:**

```plaintext
Error from server: error when creating "STDIN": admission webhook "mutate.kyverno.svc-fail" denied the request:

resource Pod/clearledger/unsigned-test was blocked due to the following policies

require-signed-images:
  verify-cosign-signature: 'failed to verify image index.docker.io/veeno-demo/clearledger-auth-service:unsigned-test:
    .attestors[0].entries[0].keys: no signatures found'
```

**How to read this output:**

- Note the webhook name is `mutate.kyverno.svc-fail`, not `validate`: image verification runs in Kyverno’s mutate pass (digest + signature check) before the pod is admitted.
- `no signatures found` means Kyverno reached Docker Hub, found the image, and confirmed it was **not** signed with your <VPIcon icon="fas fa-folder-open"/>`infra/cosign.pub` key.
- The pod never exists: the attacker can't get a shell even if the image is pullable.

**Verify:**

```sh
kubectl get pod unsigned-test -n clearledger
# Error from server (NotFound): pods "unsigned-test" not found
```

**What you should NOT see** (these mean the test didn't prove signature enforcement):

| Symptom | What went wrong |
| --- | --- |
| Pod created, then `ImagePullBackOff` | Tag does not exist on Docker Hub, complete Step 1 first |
| Pod created and `Running` | Image used `docker.io/...` instead of `index.docker.io/...` |
| No `require-signed-images` in the error | Policy not applied, or `cosign.pub` not embedded in the policy YAML |

#### Contrast: signed image is allowed:

The previous test used an unsigned image, so Kyverno blocked it.

Your real ClearLedger images should be signed by the CI pipeline. If the pod also follows the security rules, Kyverno allows it to run.

You can check the image currently used by `auth-service`:

```sh
# Your deployed tag (signed in CI) should start if spec is compliant:
kubectl get deployment auth-service -n clearledger \
-o jsonpath='{.spec.template.spec.containers[0].image}'
#
# docker.io/veeno-demo/clearledger-auth-service:v0.1.0
```

Pods that were already running before the policies were applied will keep running. The important test is what happens when Kubernetes creates a new pod. New pods using signed ClearLedger images should pass Kyverno verification.

Take a screenshot of the Scenario 3 denial. It proves the cluster blocks unsigned images, not just that CI signs images.

### 4.5: Verify ClearLedger Still Works

Kyverno enforces on new pod creation. Existing deployments that already passed admission (or were synced before policies existed) keep running. Confirm your app pods are healthy:

```sh
kubectl get pods -n clearledger
#
# NAME                                    READY   STATUS    RESTARTS   AGE
# auth-service-...                        1/1     Running   0          ...
# frontend-...                            1/1     Running   0          ...
# ledger-service-...                      1/1     Running   0          ...
# notification-service-...                1/1     Running   0          ...
# postgres-0                              1/1     Running   0          ...
# redis-...                               1/1     Running   0          ...
```

If ingress is configured:

```sh
curl -s http://clearledger.local/auth/health | jq .
#
# {"status": "ok", "service": "auth-service"}
```

ArgoCD should still show **Synced** and **Healthy**: GitOps and admission control work together, not against each other.

### 4.6: Policy Exceptions (When a Legitimate Workload Needs a Bypass)

Kyverno blocks every pod that violates a policy. But what happens when a legitimate workload needs to bypass a specific rule?

PostgreSQL is the example. The official Postgres Alpine image uses a specific internal user (UID 70) to manage its data directory. The `disallow-root-containers` policy requires every pod to set `runAsNonRoot: true`.

Postgres does set that. But if Kyverno is configured to also check specific UID ranges, or if the pod's security context doesn't satisfy the rule for any reason, Kyverno blocks it. The database can't start, and the entire application fails.

You can't weaken the policy cluster-wide to accommodate one database. That would let every pod bypass the rule. Instead, you create a **PolicyException**: a targeted exemption for exactly the pods that need it.

Open <VPIcon icon="fas fa-folder-open"/>`infra/policies/exceptions/`<VPIcon icon="iconfont icon-yaml"/>`postgres-root-exception.yaml` and read the comments. Here's what each section does:

**The `spec.exceptions` block** identifies which policy and rule to bypass:

```yaml title="infra/policies/exceptions/postgres-root-exception.yaml"
exceptions:
  - policyName: disallow-root-containers
    ruleNames:
      - check-runAsNonRoot
```

This says: "skip only the `check-runAsNonRoot` rule from the `disallow-root-containers` policy." Every other rule in that policy (and every other policy in the cluster) still enforces normally.

**The `spec.match` block** limits which resources get the exception:

```yaml
match:
  any:
    - resources:
        kinds:
          - Pod
        namespaces:
          - clearledger
        names:
          - postgres-*
```

Only pods named `postgres-*` (matching `postgres-0`, `postgres-1`, and so on), only in the `clearledger` namespace, only for the `Pod` resource kind. Everything else in the cluster still follows the strict policy.

**The annotations** are documentation for your team and auditors:

```yaml
annotations:
  reason: "Postgres alpine image requires UID 70 for data directory ownership"
  approved-by: "platform-team"
  review-date: "2026-01-01"
```

These have no technical effect: Kyverno ignores them. They exist so that six months from now, when someone asks "why does Postgres bypass this rule?", the answer is right there in the file.

::: important The rules for safe exceptions:

1. **Scope narrowly**: target the exact resource that needs it, nothing more
2. **Commit to Git**: the exception is reviewed in a pull request, tracked in version history, and auditable
3. **Never weaken the policy itself**: the rule stays strict for everything else
4. **Review periodically**: exceptions should be temporary if possible, and re-evaluated on a schedule

:::

Apply the exception **only if** Kyverno blocks your Postgres pods:

```sh
kubectl apply -f infra/policies/exceptions/postgres-root-exception.yaml
```

Verify Kyverno still blocks other non-compliant pods (same denial as Scenario 1):

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: another-root-test
  namespace: clearledger
spec:
  containers:
    - name: test
      image: nginx:alpine
EOF
```

### 4.7: CIS Benchmark Evidence `kube-bench`)

You already installed Kyverno and proved it blocks unsafe pods.

This step is different. `kube-bench` doesn't block pods and doesn't change the cluster. It only checks the Kubernetes node against the CIS benchmark and saves evidence.

Think of the difference like this:

| Tool | What it checks | Question it answers |
| --- | --- | --- |
| Kyverno | Pods and workloads | "Is this pod allowed to run?" |
| kube-bench | Kubernetes node settings | "Is this Kubernetes node hardened?" |

Both are useful, but only Kyverno blocks workloads in this lab.

Run kube-bench:

```sh
bash stages/stage-4-admission-control/scripts/run-kube-bench.sh
```

The script runs kube-bench as a Kubernetes Job and saves the report here:

```plaintext
stages/stage-4-admission-control/scripts/kube-bench-report.json
```

It also compares the result against this baseline:

```plaintext
stages/stage-4-admission-control/scripts/kube-bench-baseline.json
```

On MicroK8s, you'll see many `FAIL` and `WARN` lines. That's expected. The lab isn't asking you to fix every CIS warning on a single-node local VM.

What matters is the final result.

Pass looks like this:

```plaintext
kube-bench: 1 FAIL control(s) present (documented in baseline — no regressions).
kube-bench: no regressions vs baseline.
```

That means the known MicroK8s issues are documented, and your cluster didn't get worse.

If you see `REGRESSION` or `make check-4` fails on kube-bench, stop and investigate before Stage 5. Optional: confirm the report file exists:

```sh
ls -la stages/stage-4-admission-control/scripts/kube-bench-report.json
```

In production, you would either fix the CIS failures or document approved exceptions. In this lab, the baseline records the expected MicroK8s state.

### 4.8: Health Check

```sh
make check-4
#
# ▶ Stage 4 — Admission Control (Kyverno)
#   ✓ Kyverno is running
#   ✓ Policy disallow-root-containers — Enforce mode
#   ✓ Policy require-resource-limits — Enforce mode
#   ✓ Policy require-signed-images — Enforce mode
#   ✓ Policy disallow-privilege-escalation — Enforce mode
#   ✓ Policy drop-all-capabilities — Enforce mode
#   ✓ Kyverno correctly rejects pods without securityContext
#   ✓ kube-bench baseline exists (...)
#
# All checks passed. Ready for the next stage.
```

If kube-bench reports regressions, run the script manually and update the baseline after reviewing. That diff is audit evidence.

If Kyverno install, policies, break-it scenarios, or `make check-4` fail, see [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`. Stage 4 (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md).

### Stage 4 Complete: Done Checklist (Move to Stage 5)

You're **done with Stage 4** when all of these are true:

| # | Check | How to verify |
| --- | --- | --- |
| 1 | Kyverno running | `kubectl get pods -n kyverno` — four controllers `Running` |
| 2 | Policies applied | `kubectl get clusterpolicy` — five policies, `READY: True`, `Enforce` |
| 3 | Root pod blocked | Scenario 1 denial in terminal (screenshot for portfolio) |
| 4 | Unsigned image blocked | Scenario 3 denial — push `unsigned-test` tag first, use `index.docker.io/` |
| 5 | App still healthy | `kubectl get pods -n clearledger` — all app pods `Running` |
| 6 | Health check green | `make check-4` ends with `All checks passed. Ready for the next stage.` |

::: note Portfolio screenshots (optional)

root-pod denial (§4.4 Scenario 1), unsigned-image denial (§4.4 Scenario 3), and `kubectl get clusterpolicy` showing five `Enforce` policies.

:::

Not yet: SLSA attestation (optional), Vault secrets (Stage 5), network policies (Stage 6). Passwords still live in Kubernetes Secrets. Stage 5 moves them into Vault.

### What You Learned in Stage 4

- The difference between CI scanning (before merge) and admission control (at the cluster gate)
- What Kyverno is: a policy engine that intercepts every Kubernetes API request
- That enforcement means the bad resource never exists, not "we detected it after the fact"
- How to read a Kyverno denial: policy name → rule name → JSON path that failed
- How to write and apply cluster-wide security policies as YAML
- How to scope a PolicyException without weakening the policy for everyone else
- That operational issues (Helm, image pulls, registry URL format) affect whether controls actually fire
- **Why both CI and admission control are needed:** CI catches problems in your code while Kyverno catches everything else that touches the cluster
- **Evidence beats configuration:** a policy file in Git means nothing: the break-it denials are proof CIS controls are enforced, not just documented.

::: note What you can now put on your CV / say in an interview:

> Enforced admission control with Kyverno: blocking root containers, privilege escalation, unsigned images, and missing resource limits at deploy time: mapped to CIS Kubernetes benchmarks.

:::

`make snapshot STAGE=4 && make snapshots`. Confirm `clearledger.stage4`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 5: Secrets Management (Vault)

By the end of this stage, sensitive values no longer live in Git or in etcd-backed Kubernetes Secrets: Vault holds them centrally and injects them into pods only when they start.

**Your goal:** remove `auth-service-secret` and `ledger-service-secret` from the cluster.

Login and API calls must still work because Vault injects credentials at pod startup. That's the moment secrets management clicks.

**Before you start**, confirm Stage 4 is solid: `make check-4` passes, all five Kyverno policies are enforcing, and the app responds at `http://clearledger.local`. Fix any crash-looping pods before installing Vault.

### What Changes in This Stage

Right now, database passwords and JWT keys sit in <VPIcon icon="iconfont icon-yaml"/>`secret.yaml` files on GitHub and in Kubernetes Secrets inside the cluster. In Stage 5 you move those values into **HashiCorp Vault** and teach the app to read them a different way.

When an auth or ledger pod starts, the **Vault agent injector** adds a small sidecar container. That sidecar logs into Vault using the pod’s own service account, fetches the password and JWT, and writes them as files under `/vault/secrets/`.

Your app already knows how to read those paths. It's the same data that used to arrive via `secretKeyRef`, just delivered at runtime instead of pulled from a Kubernetes Secret object.

Once migration is complete, sensitive values live in **Vault** (the long-term store) and briefly on the **pod filesystem** while the container runs. They're not in Git anymore. You remove <VPIcon icon="iconfont icon-yaml"/>`secret.yaml` from `clearledger-infra` and ArgoCD syncs deployments that point at Vault instead.

To load Vault the first time, you copy a template to a local <VPIcon icon="iconfont icon-dotenv"/>`.env` file (§5.1). That file is gitignored. You run <VPIcon icon="iconfont icon-shell"/>`seed-vault-secrets.sh` once to copy those values into Vault.

Real secret values aren't written into committed scripts. The scripts read secrets from your local <VPIcon icon="iconfont icon-dotenv"/>`.env` file or from your terminal, so passwords and tokens stay out of Git.

### Do the Steps in This Order

Each step depends on the one before it. Skipping ahead is the most common way to get red auth/ledger pods that look like a broken app but really mean “Vault is not ready yet.”

1. **§5.1**: copy <VPIcon icon="fas fa-folder-open"/>`stages/stage-5-secrets-management/`<VPIcon icon="iconfont icon-dotenv"/>`.env.example` to <VPIcon icon="iconfont icon-dotenv"/>`.env`, then fill it with your cluster passwords
2. **§5.2**: install Vault and the agent injector with Helm
3. **§5.3**. Run <VPIcon icon="iconfont icon-shell"/>`setup.sh`, then <VPIcon icon="iconfont icon-shell"/>`seed-vault-secrets.sh` (passwords now live in Vault)
4. **§5.4**: push Vault-enabled deployments to `clearledger-infra`. Let ArgoCD sync.
5. **§5.5**. Wait for **2/2** pods (app + Vault sidecar), then delete the old Kubernetes Secrets
6. **§5.5b**: ArgoCD **Synced / Healthy** (after secret delete. OutOfSync before delete is normal)
7. **§5.6**. Confirm login works and credentials appear under `/vault/secrets/` inside the pod

Start at **§5.1**. If anything fails, read <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md.` before changing manifests.

### 5.1: Create <VPIcon icon="iconfont icon-dotenv"/>`.env` (Local Only, Never Commit)

This file holds two things: a dev Vault root token for Helm (§5.2), and the passwords you'll load into Vault in §5.3. It stays on your machine only. Never commit it. The `SEED_*` values must match what the app uses today so login still works after you delete Kubernetes Secrets later.

Two different files. **Don't mix them up:**

| File | What it is |
| --- | --- |
| <VPIcon icon="fas fa-folder-open"/>`stages/stage-5-secrets-management/`<VPIcon icon="iconfont icon-dotenv"/>`.env.example` | Blank template in the repo (empty fields). Copy this in step 1. |
| <VPIcon icon="fas fa-folder-open"/>`stages/stage-5-secrets-management/`<VPIcon icon="iconfont icon-dotenv"/>`.env` | Your real file (gitignored). You create it and fill it in steps 2–3. |

The sample block at the bottom of this section is only a picture of what a completed <VPIcon icon="iconfont icon-dotenv"/>`.env` looks like: don't copy those placeholder passwords unless they happen to match your cluster.

#### Step 1: copy the template to <VPIcon icon="iconfont icon-dotenv"/>`.env`

```sh
cp stages/stage-5-secrets-management/.env.example \
stages/stage-5-secrets-management/.env
```

That gives you a file with empty `VAULT_TOKEN=` and `SEED_*=` lines. Open it in your editor for steps 2–3.

#### Step 2: read the current passwords from the cluster

Run these from the repo root. Each command prints one value: copy the output into <VPIcon icon="iconfont icon-dotenv"/>`.env` in step 3.

```sh
# → paste as SEED_AUTH_DATABASE_URL
kubectl get secret auth-service-secret -n clearledger \
-o jsonpath='{.data.database_url}' | base64 -d; echo

# → paste as SEED_AUTH_JWT_SECRET
kubectl get secret auth-service-secret -n clearledger \
-o jsonpath='{.data.jwt_secret}' | base64 -d; echo

# → paste as SEED_LEDGER_DATABASE_URL
kubectl get secret ledger-service-secret -n clearledger \
-o jsonpath='{.data.database_url}' | base64 -d; echo
```

#### Step 3: fill in <VPIcon icon="iconfont icon-dotenv"/>`.env`

| Variable | What to put |
| --- | --- |
| `VAULT_TOKEN` | Any dev-only string you choose (for example, `my-dev-root-token`): same value in §5.2 Helm install |
| `SEED_AUTH_DATABASE_URL` | Output of first command above |
| `SEED_AUTH_JWT_SECRET` | Output of second command |
| `SEED_LEDGER_DATABASE_URL` | Output of third command |

**Sample only: shape of a completed** <VPIcon icon="iconfont icon-dotenv"/>`.env` (use your kubectl output from step 2, not these example strings unless they match):

```sh title=".env"
VAULT_TOKEN=my-dev-root-token
SEED_AUTH_DATABASE_URL=postgresql://clearledger:changeme-stage0@postgres:5432/clearledger
SEED_AUTH_JWT_SECRET=stage0-jwt-secret-change-in-production
SEED_LEDGER_DATABASE_URL=postgresql://clearledger:changeme-stage0@postgres:5432/clearledger
```

If `auth-service-secret` is already deleted (you skipped ahead: recover like this):

```sh
# Database URL from Postgres bootstrap secret (lab default password is often changeme-stage0)
PG_PASS=$(kubectl get secret postgres-secret -n clearledger \
-o jsonpath='{.data.password}' | base64 -d)
echo "postgresql://clearledger:${PG_PASS}@postgres:5432/clearledger"
# Use that line for both SEED_AUTH_DATABASE_URL and SEED_LEDGER_DATABASE_URL

# JWT: same value you used at Stage 0, or read from Vault if you already seeded:
kubectl exec -n vault vault-0 -- vault kv get -field=jwt_secret clearledger/auth-service 2>/dev/null \
|| echo "(set SEED_AUTH_JWT_SECRET manually — must match tokens already issued)"
```

Continue to **§5.2** once <VPIcon icon="iconfont icon-dotenv"/>`.env` has all four variables set.

### 5.2: Install Vault and the Agent Injector

```sh
set -a && source stages/stage-5-secrets-management/.env && set +a

helm repo add hashicorp https://helm.releases.hashicorp.com && helm repo update

# First install:
helm install vault hashicorp/vault \
--namespace vault --create-namespace \
--set server.dev.enabled=true \
--set server.dev.devRootToken="${VAULT_TOKEN}" \
--set ui.enabled=true \
--set injector.enabled=true
#
# If helm install fails with "cannot re-use a name", use upgrade instead:
# helm upgrade --install vault hashicorp/vault \
#   --namespace vault --create-namespace \
#   --set server.dev.enabled=true \
#   --set server.dev.devRootToken="${VAULT_TOKEN}" \
#   --set ui.enabled=true \
#   --set injector.enabled=true

kubectl wait --for=condition=ready pod \
-l app.kubernetes.io/name=vault -n vault --timeout=120s
kubectl wait --for=condition=ready pod \
-l app.kubernetes.io/name=vault-agent-injector -n vault --timeout=120s

kubectl apply -f stages/stage-5-secrets-management/infra/vault-ingress.yaml
```

Open `http://vault.local` in your browser. Log in with the value you set as `VAULT_TOKEN` in <VPIcon icon="fas fa-folder-open"/>`stages/stage-5-secrets-management/`<VPIcon icon="iconfont icon-dotenv"/>`.env`. For example, if your <VPIcon icon="iconfont icon-dotenv"/>`.env` has `VAULT_TOKEN=my-dev-root-token`, use `my-dev-root-token` as the Vault login token.

![screenshot showing vault UI](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/8a2b0002-2ee3-4b04-89f0-e43da18fc9b9.png)

![screenshot showing vault UI](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ec5fdb0b-7258-4e41-aeb5-adaa8754dbf2.png)

**Verify: list Vault pods:**

```sh
kubectl get pods -n vault
#
# NAME                                   READY   STATUS    RESTARTS   AGE
# vault-0                                1/1     Running   0          1m
# vault-agent-injector-8d6b668b4-xxxxx   1/1     Running   0          1m
```

**If `helm install` fails with “cannot re-use a name”**: Vault is already installed. Use the `helm upgrade --install` block above.

### 5.3: Configure Vault (Platform + Seed KV)

Run both scripts in order. Each reads `VAULT_TOKEN` from your <VPIcon icon="iconfont icon-dotenv"/>`.env`.

```sh
bash stages/stage-5-secrets-management/infra/vault/setup.sh
bash stages/stage-5-secrets-management/infra/vault/seed-vault-secrets.sh
```

.<VPIcon icon="iconfont icon-shell"/>`setup.sh`: prepares Vault for the cluster: Kubernetes auth, the KV secret store, policies, and roles so auth/ledger pods *can* fetch secrets later. It doesn't write your database passwords yet and nothing goes to Git.

.<VPIcon icon="iconfont icon-shell"/>`seed-vault-secrets.sh`: takes the `SEED_*` lines from <VPIcon icon="iconfont icon-dotenv"/>`.env` and stores them in Vault at `clearledger/data/auth-service` and `clearledger/data/ledger-service`. It doesn't echo those values to the terminal.

Re-running either script is safe for the lab.

**Expected, <VPIcon icon="iconfont icon-shell"/>`setup.sh` (tail):**

```plaintext
==> Enabling Kubernetes auth method...
==> Configuring Kubernetes auth...
==> Enabling KV secrets engine...
==> Creating Vault policies...
==> Creating Kubernetes auth roles...
==> Applying RBAC + ServiceAccounts...

✓ Vault platform setup complete (no secrets written yet).
  Next: bash stages/stage-5-secrets-management/infra/vault/seed-vault-secrets.sh
```

**Expected, <VPIcon icon="iconfont icon-shell"/>`seed-vault-secrets.sh`:**

```plaintext
==> Logging into Vault...
==> Writing secrets to Vault KV (values are not printed)...
======== Secret Path ========
clearledger/data/auth-service
======= Metadata =======
Key                Value
---              -----
created_time       2026-06-01T15:31:53.538991153Z
version            1
✓ Secrets stored at clearledger/data/auth-service and clearledger/data/ledger-service
```

**Verify metadata only** (no secret values printed):

```sh
kubectl exec -n vault vault-0 -- vault kv metadata get clearledger/auth-service
#
# Key                     Value
# ---                   -----
# cas_required            false
# created_time            2026-06-01T15:31:53.538991153Z
# current_version         1
# delete_version_after    0s
# max_versions            0
# oldest_version          0
# updated_time            2026-06-01T15:31:53.538991153Z
```

### 5.4: GitOps: Update `clearledger-infra` (Fixes ArgoCD OutOfSync)

ArgoCD deploys from your `clearledger-infra` GitHub repo, not from the main `clearledger` app repo where you're working now. You edit manifests here first, then copy the same changes to `clearledger-infra` so ArgoCD can sync them. Work slowly and verify after each sub-step.

#### 5.4a. Update manifests in the app repo (`clearledger`)

```sh
cp stages/stage-5-secrets-management/infra/manifests/auth-service/deployment.yaml \
  infra/manifests/auth-service/deployment.yaml

cp stages/stage-5-secrets-management/infra/manifests/ledger-service/deployment.yaml \
infra/manifests/ledger-service/deployment.yaml\

mkdir -p infra/manifests/vault

cp infra/deferred-by-stage/stage-5-secrets-management/vault/rotation-cronjob.yaml \
infra/manifests/vault/rotation-cronjob.yaml

rm -f infra/manifests/auth-service/secret.yaml infra/manifests/ledger-service/secret.yaml
```

#### 5.4b. Edit <VPIcon icon="fas fa-folder-open"/>`infra/manifests/`<VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` by hand

Open the file in your editor. In the `resources:` list:

- **Remove** the app secret entries: delete these two lines, or comment them out with `#` (both work, as Kustomize ignores `#` lines):

```yaml
- auth-service/secret.yaml
- ledger-service/secret.yaml
```

- **Add** this line (with the other resources):

```yaml
- vault/rotation-cronjob.yaml
```

Leave <VPIcon icon="fas fa-folder-open"/>`postgres/`<VPIcon icon="iconfont icon-yaml"/>`postgres-secret.yaml`, that is Postgres bootstrap only, not app credentials.

Save. Verify:

```sh
# Active (uncommented) app secret lines must be gone — postgres-secret is OK
grep -E '^[[:space:]]*-[[:space:]]+(auth-service|ledger-service)/secret.yaml' \
infra/manifests/kustomization.yaml && echo "STOP: app secrets still active" || echo "OK"

grep vault/rotation-cronjob.yaml infra/manifests/kustomization.yaml
grep vault.hashicorp infra/manifests/auth-service/deployment.yaml | head -1
kustomize build infra/manifests >/dev/null && echo "OK: kustomize build"
```

Expected: `OK`, rotation cronjob listed, first line shows `vault.hashicorp.com/agent-inject`, kustomize build succeeds.

Commit in the **app** repo when ready: `git add infra/manifests && git commit -m "feat(stage-5): Vault deployments in canonical manifests"`.

#### 5.4c. Push the same changes to `clearledger-infra`

```sh
git clone https://github.com/YOUR_USERNAME/clearledger-infra.git /tmp/clearledger-infra
```

If clone fails with `destination path '/tmp/clearledger-infra' already exists` (you cloned in §1.3 or an earlier step), reuse that folder. Don't clone again:

```sh
cd /tmp/clearledger-infra && git pull && cd -
```

Or start fresh: `rm -rf /tmp/clearledger-infra` then run `git clone` again.

**Run the `cp` commands from the main `clearledger` app repo**, not from <VPIcon icon="fas fa-folder-open"/>`/tmp/clearledger-infra`. Your shell prompt should say `clearledger`, not `clearledger-infra`. The source path <VPIcon icon="fas fa-folder-open"/>`infra/manifests/...` only exists in the app repo.

```sh :collapsed-lines
cd ~/clearledger    # main app repo — adjust path if yours differs

cp infra/manifests/auth-service/deployment.yaml /tmp/clearledger-infra/manifests/auth-service/
cp infra/manifests/ledger-service/deployment.yaml /tmp/clearledger-infra/manifests/ledger-service/
mkdir -p /tmp/clearledger-infra/manifests/vault
cp infra/manifests/vault/rotation-cronjob.yaml /tmp/clearledger-infra/manifests/vault/
cp infra/manifests/kustomization.yaml /tmp/clearledger-infra/manifests/kustomization.yaml
rm -f /tmp/clearledger-infra/manifests/auth-service/secret.yaml
rm -f /tmp/clearledger-infra/manifests/ledger-service/secret.yaml

cd /tmp/clearledger-infra
git add -A
git status
git commit -m "feat(stage-5): Vault injection; remove app secrets from GitOps"
git push
cd -
```

**✋ Hands-on checkpoint. Stage 5 GitOps landed**

```sh
git clone --depth 1 https://github.com/YOUR_USERNAME/clearledger-infra.git /tmp/verify-s5
test ! -f /tmp/verify-s5/manifests/auth-service/secret.yaml && echo "OK: app secret removed from Git"
grep vault.hashicorp /tmp/verify-s5/manifests/auth-service/deployment.yaml | head -1
grep vault/rotation-cronjob.yaml /tmp/verify-s5/manifests/kustomization.yaml
rm -rf /tmp/verify-s5
```

Expected: `OK`, Vault annotation present, rotation job in kustomization.

**Expected, `git status` before commit (step 5.4c):**

```plaintext
modified:   manifests/auth-service/deployment.yaml
modified:   manifests/ledger-service/deployment.yaml
modified:   manifests/kustomization.yaml
new file:   manifests/vault/rotation-cronjob.yaml
deleted:    manifests/auth-service/secret.yaml
deleted:    manifests/ledger-service/secret.yaml
```

After `git push`, ArgoCD will roll out Vault-enabled deployments automatically. **Continue to §5.5**. Don't expect **Synced** yet, as app secrets are still in the cluster until you delete them there.

**Common rollout failures:**

| Symptom | Fix |
| --- | --- |
| `Duplicate value: "vault-secrets"` | Do **not** declare a `vault-secrets` volume in <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`: the injector creates it |
| `Service appeared 2 times` | Keep `Service` only in `service.yaml`, not at the bottom of <VPIcon icon="iconfont icon-yaml"/>`deployment.yaml` |
| Kyverno `containers/0` `runAsNonRoot` | Add `runAsNonRoot: true` on the **app** container `securityContext`, not only on `spec.securityContext` |
| Pods stuck `1/1` (no sidecar) | Confirm `injector.enabled=true` and deployment has `vault.hashicorp.com/agent-inject: "true"` |
| `permission denied` in vault-agent-init | Run <VPIcon icon="iconfont icon-shell"/>`setup.sh` : K8s auth role not bound to service account |
| ArgoCD **Sync failed** on `CronJob/vault-secret-rotation` | Kyverno blocked the job: <VPIcon icon="fas fa-folder-open"/>`infra/manifests/vault/`<VPIcon icon="iconfont icon-yaml"/>`rotation-cronjob.yaml` must include `runAsNonRoot`, `allowPrivilegeEscalation: false`, `capabilities.drop: [ALL]`, and CPU/memory limits. Push fix to `clearledger-infra`. |

### 5.5: Wait for Vault-injected Pods, Then Delete K8s App Secrets

**Wait until auth/ledger show Vault sidecars** (`READY 2/2` = app + vault-agent):

```sh
kubectl get pods -n clearledger -l app=auth-service
kubectl get pods -n clearledger -l app=ledger-service
#
# NAME                            READY   STATUS    RESTARTS   AGE
# auth-service-5756d9fcb9-bmdlr   2/2     Running   0          2m
# auth-service-5756d9fcb9-jtgss   2/2     Running   0          2m
```

Inspect sidecar pulled secrets (init container logs):

```sh
kubectl logs -n clearledger \
$(kubectl get pod -n clearledger -l app=auth-service -o name | head -1) \
-c vault-agent-init
# ... Authentication successful, rendering templates ...
```

**Only after pods are 2/2**, delete app Secrets:

```sh
kubectl delete secret auth-service-secret ledger-service-secret -n clearledger
```

**Expected: secrets remaining:**

```sh
kubectl get secret -n clearledger
#
# NAME              TYPE     DATA   AGE
# postgres-secret   Opaque   2      6d
```

`postgres-secret` is Postgres bootstrap only, not app credentials. That stays until you harden Postgres separately.

If delete says `NotFound`: secrets were already removed. Continue to §5.6.

### 5.5b: ArgoCD Should Be Synced After Secret Delete

Run this after §5.5, not right after §5.4. Before you delete app Secrets, OutOfSync is normal. Git no longer lists `auth-service-secret` / `ledger-service-secret`, but they still exist in the cluster until you delete them in the step above.

```sh
kubectl get application clearledger -n argocd \
-o jsonpath='sync={.status.sync.status} health={.status.health.status}{"\n"}'
```

**Before secret delete:** expect `sync=OutOfSync health=Healthy` or `Progressing` while Vault pods roll out. That's fine if auth/ledger are **2/2**.

**After secret delete**, hard-refresh and sync if still OutOfSync:

```sh
kubectl annotate application clearledger -n argocd argocd.argoproj.io/refresh=hard --overwrite
argocd app sync clearledger --grpc-web --prune
```

If sync says **another operation is already in progress**, wait a minute: ArgoCD auto-sync is already running.

Wait until:

```sh
kubectl get application clearledger -n argocd \
-o jsonpath='{.status.sync.status} {.status.health.status}{"\n"}'
#
# Synced Healthy
```

Don't update app deployments with `kubectl apply` after ArgoCD is managing them. ArgoCD keeps the cluster matched to `clearledger-infra`. If you change a deployment by hand, ArgoCD may revert it. For Stage 5, update the manifests in Git and let ArgoCD sync the Vault-enabled deployments.

### 5.6: Login and Injected Files

```sh
kubectl exec -n clearledger \
$(kubectl get pod -n clearledger -l app=auth-service -o name | head -1) \
-c auth-service -- ls /vault/secrets/
```

```plaintext
database_url
jwt_secret
```

```sh
curl -s -X POST http://clearledger.local/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test@clearledger.io","password":"SecurePass123"}' | jq .
#
# {
#   "access_token": "<jwt-returned-by-auth-service>",
#   "token_type": "bearer"
# }
```

**Take a screenshot:** working login JSON + `kubectl get secret -n clearledger` showing no `auth-service-secret` / `ledger-service-secret`.

### 5.7: Health Check

```sh
make check-5
```

**What you should see:**

> `make check-5` re-runs Stage 4 checks first, that is expected. Look for the Stage 5 block below to confirm Vault is working.

```plaintext
▶ Stage 4: Admission Control (Kyverno)
  ✓ Kyverno is running
  ✓ Policy disallow-root-containers — Enforce mode
  ...
  ✓ kube-bench matches baseline (no new FAIL regressions)

▶ Stage 5: Secrets Management (Vault)
  ✓ Vault pod is running
  ✓ Vault agent injector is running
  ✓ Vault is unsealed
  ✓ Vault Kubernetes auth method is enabled
  ✓ auth-service-secret removed — Vault is the secret source
  ✓ Vault injected /vault/secrets/database_url into auth-service

All checks passed. Ready for the next stage.
```

If Vault injection or ArgoCD sync fails, see <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`.

### Stage 5 is Done: Checklist Before Moving to Stage 6

| # | Check | How to verify |
| --- | --- | --- |
| 1 | Secrets in Vault only | `vault kv metadata get clearledger/auth-service` shows `current_version >= 1` |
| 2 | No app secrets in infra Git | <VPIcon icon="iconfont icon-yaml"/>`secret.yaml` absent from `clearledger-infra/manifests/auth-service/` and `ledger-service/` |
| 3 | ArgoCD synced | `Synced Healthy` on Application `clearledger` |
| 4 | K8s app secrets deleted | `kubectl get secret -n clearledger` no auth/ledger app secrets |
| 5 | Injection works | Auth pods `2/2`; `ls /vault/secrets/` shows `database_url`, `jwt_secret` |
| 6 | App works | Login curl returns `access_token` |
| 7 | Health check | `make check-5` ends with `All checks passed. Ready for the next stage.` |

Stage 5 moves app credentials out of Git and Kubernetes Secrets. It doesn't make Vault production-grade yet. This lab still uses Vault dev mode, not HA or auto-unseal.

Also, a running pod can still read the files under `/vault/secrets/` because the app needs those credentials to work. That's normal. Stage 6 adds Falco so you can detect suspicious runtime access.

### What You Learned in Stage 5

- Kubernetes Secrets aren't enough for real secret management.
- Vault now stores the app credentials.
- <VPIcon icon="iconfont icon-dotenv"/>`.env` was only used locally to load the first secrets into Vault. It's never committed.
- Vault injects secrets into the pod when the app starts.
- `clearledger-infra` must stop storing <VPIcon icon="iconfont icon-yaml"/>`secret.yaml`, because ArgoCD deploys from that repo.
- The order matters: install Vault, seed secrets, update GitOps, wait for healthy pods, then delete old Kubernetes Secrets.

**What you can now say in an interview:**

> I replaced Kubernetes Secrets with HashiCorp Vault agent injection, removed app credentials from Git and Kubernetes Secrets, and verified the app still worked after Vault injected the credentials at runtime.

Save your progress:

```sh
make snapshot STAGE=5 && make snapshots
```

Confirm `clearledger.stage5` appears in the snapshot list.

---

## Stage 6 — Runtime Security (Falco)

Stages 1–5 secured what gets deployed and how secrets are stored. Stage 6 watches what happens inside running containers after they start.

Your goal is to learn what runtime security catches and why it matters, then prove it by triggering a Falco alert and reading it the way an on-call engineer would.

CI, Kyverno, and Vault all act before or at pod startup. Falco fills the gap they leave open. It watches what running software actually does inside the container. That's the layer incident response and forensics care about, not just another chart to install.

**Before you start Stage 6:**

- `make check-5` passes
- Login and transactions still work at `http://clearledger.local`
- Platform pods have low restart counts

You're done with Stage 6 when:

- You trigger at least one Falco alert
- You apply the network policies
- `make check-6` passes

Then save your VM:

```sh
make snapshot STAGE=6
make snapshots
```

### Do the Steps in This Order

Each step depends on the one before it. Don't run `make check-6` until §6.4. It checks network policies you haven't applied yet.

1. **§6.1:** `bash stages/stage-6-runtime-security/scripts/`<VPIcon icon="iconfont icon-shell"/>`install-falco.sh`. Confirm `falco-*` pods `2/2 Running` and custom rules loaded.
2. **§6.2:** `make demo-6`: read `✓ Runtime detection confirmed` in the terminal
3. **§6.3** (optional) manual break-it scenarios (skip if `make demo-6` already worked)
4. **§6.4:** `kubectl apply -f infra/deferred-by-stage/stage-6-runtime-security/netpol/network-policies.yaml`. Confirm `curl http://clearledger.local/` returns 200.5. **§6.6:** `make check-6`

Start at **§6.1**. If anything fails, see <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`.

::: note Optional reading

[How Stage 6 fits the full stack](#how-stage-6-fits-the-full-stack-optional-reading): why Falco and netpol exist and how they differ from Stages 3–5.

:::

### If You Get Stuck in Stage 6

Stage 6 has three jobs:

1. Install Falco
2. Trigger one test alert
3. Apply network policies

Don't worry about every row in the Falco UI. The UI may show noise. You pass the Falco part when you can find one alert from your demo, either in the terminal or in the UI.

For the portfolio screenshot, open:

`http://falco.local`

Login:

- Username: `admin`
- Password: `admin`

Take a screenshot only after your demo alert appears.

**Common stuck points**

| You think… | What is actually true |
| --- | --- |
| “The UI shows 200+ Critical alerts, maybe I broke something” | No. `postgres-0` reads <VPIcon icon="fas fa-folder-open"/>`/etc/passwd` on a loop and Falco flags it. Ignore those rows. |
| “I can't find my demo alert” | Search the UI with **Cmd+F →** `Shell Spawned`, or use the **terminal grep** in step 4 above. If grep shows `auth-service` + `id && exit`, you passed. |
| “`make check-6` failed on NetworkPolicy” | You ran the check **before §6.4**. Apply netpol first, then re-run. |
| “§6.3 vs §6.2 — which do I run?” | Run `make demo-6` **(§6.2)** only. §6.3 is the same attacks as manual commands. Skip it if demo-6 already worked. |
| “What is Shell Spawned?” | Falco saw a `sh` **process start** inside `auth-service`. That's suspicious in production. In the lab, **you** caused it on purpose. See §6.2. |
| “Scenario 4 hangs or exit 137” | Old `wget` command + **Terminating** pod. Skip Scenario 4 or use the **python3** command in §6.4. Checkpoint + `make check-6` is enough. |

### 6.1: Install Falco and Falcosidekick UI

```sh
bash stages/stage-6-runtime-security/scripts/install-falco.sh
```

This runs `helm upgrade --install` with `modern_ebpf`, enables Falcosidekick + Web UI, enables the **k8s-metacollector** (`collectors.kubernetes.enabled: true`) so custom rules can match `k8smeta.ns.name = clearledger`, loads rules from <VPIcon icon="fas fa-folder-open"/>`infra/falco/clearledger-rules-content.yaml`, applies the rules ConfigMap and ingress.

If Falco is already installed, the script is safe to re-run (upgrade).

**Verify Falco pods:**

```sh
kubectl get pods -n falco
#
# NAME                                      READY   STATUS    RESTARTS   AGE
# falco-w4fh6                               2/2     Running   0          2m
# falco-falcosidekick-...                   1/1     Running   0          2m
# falco-falcosidekick-ui-...                1/1     Running   0          2m
# falco-falcosidekick-ui-redis-0            1/1     Running   0          2m
```

The Falco DaemonSet should show **2/2 Running**. Sidekick, UI, and Redis pods should each show **1/1 Running**. Pod name suffixes on your cluster will differ from the example.

Open `http://falco.local`. You'll see the Falcosidekick UI. Log in with the chart defaults:

| Field | Value |
| --- | --- |
| **Login** | `admin` |
| **Password** | `admin` |

To read the credentials from the cluster instead of trusting the lab defaults:

```sh
kubectl get secret falco-falcosidekick-ui -n falco \
-o jsonpath='{.data.FALCOSIDEKICK_UI_USER}' | base64 -d && echo
#
# admin:admin
```

![Screenshot fo Falco UI](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/eeac67ee-182a-403d-806d-328e1fdcd8b7.png)

#### Falcosidekick UI: quick orientation

After login you land on the **Events** tab. The table can look busy before you run any demo, which is normal.

- **Rule**: detection name (what fired)
- **Priority**: **Critical** / **Warning** / **Notice** (focus on Critical and Warning for this lab)
- **Output**: pod name, file, or command details
- **Tags**: look for `clearledger` on lab alerts

**Background noise you can ignore:** Notice rows from ArgoCD. **Critical** **Sensitive File Read** rows from `postgres-0` reading <VPIcon icon="fas fa-folder-open"/>`/etc/passwd` (repeats every few seconds). Your demo alert is different. See §6.2. **Verify custom rules loaded** (do this before §6.2):

```sh
kubectl get pods -n falco                                    # Falco pod 2/2 Running
kubectl get configmap clearledger-falco-rules -n falco
kubectl logs -n falco -l app.kubernetes.io/name=falco -c falco --tail=200 \
| grep 'rules.d/clearledger_rules'
#
# clearledger_rules.yaml | schema validation: ok
```

An empty grep with `--tail=30` alone isn't a failure. Use `--tail=200`. If you see `LOAD_ERR_COMPILE_CONDITION`, see <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`.

If rules didn't load, §6.2 and §6.3 will look like they passed when nothing fired.

### 6.2: Guided Demo (`make demo-6`)

Run this **after** §6.1 (Falco installed, rules verified, UI opens at `http://falco.local`).

```sh
make demo-6
# or:
bash stages/stage-6-runtime-security/scripts/demo-falco-alerts.sh
```

#### What the demo script does

The demo proves Falco can detect suspicious activity inside a running container.

The script checks that Falco is running, opens `http://falco.local`, and waits while you log in with:

- Username: `admin`
- Password: `admin`

Then it runs this test command inside the `auth-service` container:

```sh
kubectl exec -n clearledger \
auth-service-<pod-suffix> \
-c auth-service -- /bin/sh -c 'id && exit'
```

The script picks the real pod name for you.

**Non-interactive** (CI or no Enter prompts): `SKIP_PROMPT=1 make demo-6`.

This starts a shell inside the app container. That's suspicious in production because app containers should run the app, not open shells. Falco should detect it and create an alert called:

`Shell Spawned in ClearLedger Container`

When the script prints:

```plaintext
✓ Runtime detection confirmed
```

refresh the Falco UI.

Look for a **Critical** alert with:

- Rule: `Shell Spawned in ClearLedger Container`
- Pod: `auth-service-...`
- Command: `sh -c id && exit`

Ignore alerts from `postgres-0`, especially `Sensitive File Read`. Those are background noise for this lab.

If the UI is noisy, search the page for `Shell Spawned` or check from the terminal:

```sh
kubectl logs -n falco -l app.kubernetes.io/name=falco -c falco --tail=500 \
| grep 'Shell Spawned'
```

For your screenshot, capture the `Shell Spawned` alert for `auth-service`.

### 6.3: Break-it Scenarios (Manual, Optional)

These are the same detections as §6.2, but you run each command yourself. Skip this section if you already completed `make demo-6`.

| Rule name | You trigger it by… |
| --- | --- |
| **Shell Spawned in ClearLedger Container** | Scenario 1 — `kubectl exec … /bin/sh` |
| **Sensitive File Read in ClearLedger** | Scenario 2 — `cat /etc/passwd` |
| **Package Manager / Outbound connection** | Scenario 3 — `wget` or `curl` |

After each command, refresh `http://falco.local` or use the find methods in §6.2. #### Scenario 1 – Shell in a running pod (command injection simulation):

```sh
kubectl exec -n clearledger \
$(kubectl get pod -n clearledger -l app=auth-service -o name | head -1) \
-c auth-service -- /bin/sh -c "id && exit"
```

**Expected in Falco UI / logs** (within ~10 seconds):

```plaintext
CRITICAL: Shell spawned in ClearLedger container
  user=... container=auth-service pod=auth-service-... cmd=sh -c id && exit
```

**What this means:** Stage 4 allowed the pod (it is compliant). Stage 6 detected *behavior inside* the pod: exactly what an attacker would do after command injection.

**If you see no alert:** confirm the exec used `-c auth-service` (not the vault-agent sidecar), rules show `schema validation: ok`, and the pod image name contains `clearledger`.

#### Scenario 2 – Read a sensitive file (reconnaissance):

```sh
kubectl exec -n clearledger \
$(kubectl get pod -n clearledger -l app=auth-service -o name | head -1) \
-c auth-service -- cat /etc/passwd
#
# CRITICAL: Sensitive file read in ClearLedger
#   file=/etc/passwd container=auth-service pod=auth-service-...
```

#### Scenario 3 – Download tool at runtime (optional):

```sh
kubectl exec -n clearledger \
$(kubectl get pod -n clearledger -l app=auth-service -o name | head -1) \
-c auth-service -- sh -c "wget -q ifconfig.me -O - 2>/dev/null || true"
```

May fire Package manager executed and/or Unexpected outbound connection (WARNING).

Take screenshots of Scenarios 1 and 2: portfolio evidence for runtime detection.

### 6.4: Apply Network Policies (Zero-trust Segmentation)

Network policies are firewall rules between pods. Apply them after the Falco demo.

`make check-6` checks for these policies, so run it only after this section. The `default-deny-all` policy blocks traffic by default.

The `allow-*` policies open only the paths ClearLedger needs to work. Falco detects suspicious behavior. Network policies limit where a pod can connect.

**Apply:**

```sh
kubectl apply -f infra/deferred-by-stage/stage-6-runtime-security/netpol/network-policies.yaml
kubectl get networkpolicy -n clearledger
```

:: note Expected

Seven policies: `default-deny-all` plus six `allow-*` (`auth-service`, `ledger-service`, `notification-service`, `postgres`, `redis`, `frontend`).

:::

Verify the app still works:

```sh
curl -s http://clearledger.local/auth/health | jq .
#
# {"status":"ok","service":"auth-service"}

curl -s http://clearledger.local/notifications/health | jq .
#
# {"status":"ok",...}
```

**Checkpoint (required)**: proves netpol didn't break the real app:

```sh
kubectl get networkpolicy -n clearledger
curl -s -o /dev/null -w "%{http_code}\n" http://clearledger.local/
kubectl get pods -n clearledger --field-selector=status.phase!=Running
```

| Result | Meaning |
| --- | --- |
| Seven policies listed | Netpol applied |
| `200` from curl | Users can still reach the app through ingress |
| Third command prints **nothing** | No crashed pods |

If auth or ledger start restarting after netpol, egress rules are too strict. See <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`.

#### Scenario 4 – blocked cross-service traffic (optional)

Skip if the checkpoint passed and you plan to run `make check-6`. This proves ledger can't call notification directly (no allow rule for that path). Failure to connect is success.

**Don't use the old `wget` one-liner**: the ledger image has no `wget`/`curl`, and `head -1` can pick a Terminating pod (exec hangs or exit **137**).

```sh
LEDGER_POD=$(kubectl get pods -n clearledger -l app=ledger-service --no-headers \
| awk '$2=="2/2" && $3=="Running" {print $1; exit}')

echo "Using pod: $LEDGER_POD"

kubectl exec -n clearledger "$LEDGER_POD" -c ledger-service -- python3 -c "
import urllib.request
try:
    urllib.request.urlopen('http://notification-service/', timeout=5)
    print('UNEXPECTED: connection succeeded')
except Exception as e:
    print('BLOCKED (expected):', e)
"
#
# BLOCKED (expected): <urlopen error timed out>
```

or `Connection refused`, **not** `UNEXPECTED: connection succeeded`.

### 6.6: Health Check

Run this **after §6.4** (network policies). It confirms Falco, custom rules, and netpol are installed. It does **not** prove an alert fired (that is §6.2).

```sh
make check-6
```

**What you should see:**

```plaintext
▶ Stage 6 — Runtime Security (Falco)
  ✓ Falco DaemonSet: 1/1 nodes
  ✓ ClearLedger custom Falco rules ConfigMap exists
  ✓ NetworkPolicy default-deny-all exists
  ✓ NetworkPolicy allow-auth-service exists
  ✓ NetworkPolicy allow-ledger-service exists
  ✓ NetworkPolicy allow-notification-service exists
  ✓ auth-service reachable after network policies
  ✓ notification-service reachable after network policies

All checks passed. Ready for the next stage.
```

### How Stage 6 fits the full stack (optional reading)

Each stage guards a different point in the lifecycle. Stages 1 through 5 work before or during pod startup. Stage 6 watches what happens inside a container that is already running.

- **In Stage 3,** CI catches bad code and images on `git push`.
- **Stage 4,** Kyverno blocks bad pods at admission.
- **Stage 5,** Vault injects secrets at startup.
- **Stage 6,** Falco watches syscalls after the pod is running (shell spawns, sensitive file reads).
- **Stage 6,** Network policies filter pod-to-pod traffic.

They answer three different questions: Kyverno asks whether this pod may be created. Falco asks what the pod is doing right now. Network policies ask who the pod may talk to.

Falco doesn't replace CI or Kyverno. If you skip Stages 3–5, Falco can still alert, but you already shipped vulnerable code and secrets in Git.

### Stage 6 is Complete. Proceed to Stage 6.5 or 7.

| # | Check | How to verify |
| --- | --- | --- |
| 1 | Falco running | `kubectl get pods -n falco` — DaemonSet `2/2` |
| 2 | Custom rules loaded | `kubectl logs -n falco -l app.kubernetes.io/name=falco -c falco --tail=200 |
| 3 | Shell alert fired **and you read it** | `make demo-6` → Critical row with `cmd=sh -c id && exit`, pod `auth-service-…` — §6.2 |
| 4 | Network policies applied | `kubectl get networkpolicy -n clearledger` — §6.4 |
| 5 | App still healthy | `curl` auth + notification health return 200 |
| 6 | Health check | `make check-6` green — §6.6 |

**Portfolio screenshots (optional):** shell-in-container alert · sensitive-file read alert in Falco UI.

What comes next: Stage 6 gives you Falco alerts and basic network policies. You can refine the network policies later. Stage 6.5 is optional chaos testing with Litmus, and Stage 7 adds Grafana dashboards so you can see security events over time.

### What You Learned in Stage 6

- What runtime security catches that CI and admission control can't: threats inside running containers
- What Falco is: eBPF syscall monitoring with custom YAML rules
- What network policies are: Kubernetes firewall rules between pods
- How to trigger and interpret alerts: incident response skills
- **The full stack:** code scanning, admission control, secrets management, runtime detection which leads to (next) observability

::: note What you can now put on your CV / say in an interview:

> Deployed Falco for runtime threat detection with custom rules, and can trigger and read an alert for a shell-in-container or sensitive-file read the way an on-call engineer would.

:::

`make snapshot STAGE=6 && make snapshots`. Confirm `clearledger.stage6`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 6.5 — Chaos Engineering (Optional)

**Most learners skip this.** If Stage 6 is done and `make check-6` passes, jump straight to [Stage 7](#stage-7-security-observability). Nothing in Stages 7–8 requires Litmus.

**If you want chaos/resilience (~1 hour):** LitmusChaos deletes one `auth-service` pod and proves `/auth/health` stays **200** while Kubernetes replaces it.

### Do the Steps in This Order

| Step | Section | What you do |
| --- | --- | --- |
| 1 | [§6.5.0](#650-before-you-start-auth-pods-must-be-22) | `make fix-65-prereqs` — auth pods **2/2 Ready** |
| 2 | [§6.5.1](#651-install-litmuschaos-operator-ui-cluster-connection) | `bash ...install-litmus.sh` — UI shows **Active 1** |
| 3 | [§6.5.2](#652-run-your-first-experiment-pod-delete) | UI: Pod-delete experiment + `curl` stays 200 |
| 4 | [§6.5.7](#657-health-check) | `make check-65`, snapshot |

::: note Optional

[§6.5.3](#653-same-experiment-from-the-terminal-make-demo-65-optional): same test via `make demo-65` (terminal path) instead of the UI wizard.

:::

### 6.5.0: Before You Start (Auth Pods Must be 2/2)

Chaos deletes pods. If replacements fail to start, you debug CrashLoopBackOff instead of learning resilience.

```sh
export GITHUB_OWNER=YOUR_GITHUB_USERNAME   # required — without this, fix-argocd breaks ArgoCD repoURL
make fix-65-prereqs
kubectl get pods -n clearledger -l app=auth-service
```

**Pass:** two pods, both **2/2 Ready**. Don't install Litmus until this is true.

**If something fails:**

| Symptom | Fix |
| --- | --- |
| ArgoCD **ComparisonError** after `fix-65-prereqs` | `kubectl apply -f stages/stage-2-gitops/argocd/clearledger-app.yaml` |
| Auth **Init:0/1**, Vault `permission denied` | Re-run Stage 5 <VPIcon icon="iconfont icon-shell"/>`setup.sh` + <VPIcon icon="iconfont icon-shell"/>`seed-vault-secrets.sh`, delete auth/ledger pods |
| Auth **1/2** or postgres timeout | `make fix-65-prereqs` again (adds netpol + startup probes) |

### 6.5.1: Install LitmusChaos (Operator, UI, Cluster Connection)

```sh
bash stages/stage-6.5-chaos-engineering/scripts/install-litmus.sh
kubectl get pods -n litmus
open http://litmus.local    # login: admin / litmus
```

**Pass before §6.5.2:** Overview shows Infrastructures: Active 1 (not 0, not Pending).

**Verify pods:**

```sh
kubectl get pods -n litmus
#
# litmus-core, chaos frontend/server, mongodb, subscriber — all Running
```

#### If Overview shows 0 infrastructures or PENDING

The UI is empty until a subscriber agent connects your cluster:

```sh
export LITMUS_PASSWORD='litmus'   # only if you changed the default
bash stages/stage-6.5-chaos-engineering/scripts/connect-litmus-infra.sh
```

Hard-refresh the browser. Start at `http://litmus.local` only, not old `/account/.../settings` bookmarks.

![screenshot showing litmus ui](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/69212567-ae17-4f8f-b60d-7c3aac1592b8.png)

![screenshot showing litmus ui](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/66cfe3f9-99b5-4c1b-bfed-aa90fbcca2e8.png)

#### UI navigation (click order for §6.5.2)

1. **Overview**: Confirm **Active 1**
2. **ChaosHubs**, **Pod Delete**, **Launch Experiment**
3. **Chaos Experiments**: watch **Running to Completed**

Left nav: **Overview**, **Environments**, **ChaosHub**, **Chaos Experiments**. Skip **Resilience Probes** and deep **Settings** URLs for this lab.

### 6.5.2: Run Your First Experiment (Pod Delete)

::: important Goal

Kill one `auth-service` pod and prove `/auth/health` stays **200**.

:::

**Before you click Run in the UI**, open two terminals:

```sh
# Terminal A — watch pods
kubectl get pods -n clearledger -l app=auth-service -w

# Terminal B — watch health every 5 seconds
while true; do
  date +%H:%M:%S
  curl -s -o /dev/null -w "health=%{http_code}\n" http://clearledger.local/auth/health
  sleep 5
done
```

**In the UI (`http://litmus.local`)**: Left nav → ChaosHubs → Pod Delete card → Launch Experiment.

![screenshot showing litmus ui](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ca183e75-6680-4743-9ffe-03a144e09e13.png)

::: note Litmus UI note

ChaosCenter labels change between versions (for example, “Tune fault”, “Target selection”, “Chaos Experiment”). Match fields by **concept**, not exact button text. Accept wizard defaults unless the table below lists a value.

:::

In the Litmus UI, open:

`ChaosHubs` → `Pod Delete` → `Launch Experiment`

This opens the experiment wizard. Use these values when the wizard asks for them:

- Infrastructure: `clearledger-cluster` and it must be `Active`
- Namespace: `clearledger`
- Target label: `app=auth-service`
- Target kind: `Deployment`
- Pods affected: `50%`
- Duration: `30` seconds
- Fault/experiment name: `pod-delete`

Finish the wizard with Save or Create, then click Run. Don't choose **Schedule**.

**What success looks like:**

| Where | Good sign |
| --- | --- |
| Terminal A | One pod **Terminating**, then back to **2/2 Ready** |
| Terminal B | `health=200` even while one pod is down |
| Litmus UI | Experiment **Running → Completed** |

**Prefer terminal over UI?** Skip the wizard and run [§6.5.3](#653-same-experiment-from-the-terminal-make-demo-65-optional) (`make demo-65`) instead.

### 6.5.3 — Same experiment from the terminal (`make demo-65`) — optional

Use this if you want to run the pod-delete test without clicking through the Litmus UI.

Make sure auth pods are healthy first:

```sh
make fix-65-prereqs
```

Then run the demo:

```sh
make demo-65
```

The script applies the `auth-service-pod-delete` ChaosEngine in the `litmus` namespace. Litmus deletes one `auth-service` pod, Kubernetes replaces it, and the script checks that `/auth/health` keeps returning `200`.

After it finishes, verify the result:

```sh
kubectl get chaosresult -n litmus
kubectl get pods -n clearledger -l app=auth-service
```

You passed if the script ends with `PASS`, the `ChaosResult` is `Completed / Pass`, and two `auth-service` pods are running again.

You can also see the run in the Litmus UI: **Chaos Experiments** → refresh → open the latest run.

If new auth pods get stuck in `Init:0/1`, re-apply the Stage 6 network policies:

```sh
kubectl apply -f infra/deferred-by-stage/stage-6-runtime-security/netpol/network-policies.yaml
```

### 6.5.3a: Real Output Examples (Verified on the Lab Cluster)

These samples were captured from a working cluster after `make fix-65-prereqs`, `make connect-litmus`, and `make demo-65`.

#### `make check-65`

```plaintext
▶ Stage 6.5 — Chaos Engineering (LitmusChaos)
  ✓ litmus namespace exists
  ✓ litmus-admin ServiceAccount exists in litmus
  ✓ pod-delete ChaosExperiment installed in litmus
  ✓ Litmus chaos operator is running
  ✓ Litmus ChaosCenter reachable at http://litmus.local
  ✓ Litmus subscriber running (UI connected to cluster)
  ✓ auth-service healthy (baseline before chaos)
  ✓ auth-service has 2/2 Ready replicas (stable for chaos)
  ✓ allow-postgres NetworkPolicy exists (Stage 6 fix)

All checks passed. Ready for the next stage.
```

#### `make demo-65` captured from a real run (2026-06-01)

```plaintext
Stage 6.5 — auth-service pod-delete

Preflight: 2 auth-service pods Running

Applying ChaosEngine auth-service-pod-delete (namespace litmus)

Watching http://clearledger.local/auth/health

  10s  health=200  pods=2
  20s  health=200  pods=1
  30s  health=200  pods=1
  40s  health=200  pods=2
  50s  health=200  pods=2
  60s  health=200  pods=2

Result:
  ChaosResult: Completed / Pass
  Recovery:    2 auth-service pod(s) Running
  Health:      6/6 checks returned 200

PASS
```

If health lines show `000`, run `bash scripts/setup-hosts.sh` on your Mac and re-run. The script also tries `multipass exec clearledger -- curl` when the VM is present.

#### Terminal B (health loop, expected output)

```plaintext
22:05:01
health=200
22:05:06
health=200
22:05:11
health=200
```

Pod count may show **1** while the replacement pod is starting, which is expected.

#### Terminal A during chaos

```sh
kubectl get pods -w
#
# NAME                            READY   STATUS        RESTARTS   AGE
# auth-service-84cc988c4d-hdb45   2/2     Running       0          67m
# auth-service-84cc988c4d-b59sj   2/2     Terminating   0          15m    ← killed
# auth-service-84cc988c4d-dxz9q   0/2     Pending       0          0s     ← replacement
# auth-service-84cc988c4d-dxz9q   0/2     Init:0/1      0          2s
# auth-service-84cc988c4d-dxz9q   2/2     Running       0          90s
```

#### After demo: verify

```sh
kubectl get chaosresult -n litmus
#
# auth-service-pod-delete-pod-delete   Completed   Pass

kubectl get pods -n clearledger -l app=auth-service
#
# auth-service-84cc988c4d-xxxxx   2/2   Running
# auth-service-84cc988c4d-yyyyy   2/2   Running

kubectl get cm subscriber-config -n litmus -o jsonpath='{.data.IS_INFRA_CONFIRMED}'
#
# true
```

#### Subscriber connected (infrastructure Active in UI)

```plaintext
kubectl logs -n litmus -l app.kubernetes.io/name=subscriber --tail=3
level=info msg="AgentID: a63c2a2c-... has been confirmed"
level=info msg="Server connection established, Listening...."
```

### 6.5.4: Understand the YAML Files (Read Before Running)

Each file is a `ChaosEngine`: a request to Litmus: “run experiment X against app Y for Z seconds.”

#### <VPIcon icon="iconfont icon-yaml"/>`litmus-install.yaml`

This creates the `litmus` namespace only. Platform workloads live here, separate from `clearledger` app pods.

#### <VPIcon icon="iconfont icon-yaml"/>`litmus-rbac.yaml`

| Resource | What it does |
| --- | --- |
| `ServiceAccount litmus-admin` (namespace `litmus`) | Identity for Litmus runner pods |
| `ClusterRoleBinding → cluster-admin` | Allows deleting pods / injecting faults in `clearledger` (lab simplification. Production would use least-privilege) |

#### <VPIcon icon="iconfont icon-yaml"/>`auth-service-pod-delete.yaml` (Experiment 1: used by demo)

```yaml title="auth-service-pod-delete.yaml"
metadata:
  namespace: litmus          # engine lives here (Kyverno-safe)
spec:
  appinfo:
    appns: clearledger       # target app namespace
    applabel: app=auth-service
    appkind: deployment
  experiments:
    - name: pod-delete
      spec:
        components:
          env:
            - name: PODS_AFFECTED_PERC
              value: "50"    # 50% of 2 replicas = 1 pod killed
            - name: TOTAL_CHAOS_DURATION
              value: "30"    # chaos window in seconds
```

What happens when applied:

1. Operator reads `ChaosEngine` and creates `auth-service-pod-delete-runner` pod in `litmus`
2. Runner selects one `auth-service` pod in `clearledger` and sends SIGTERM / delete
3. Kubernetes Deployment controller sees 1/2 replicas and schedules a replacement pod
4. Service routes traffic to the **surviving** replica during recovery
5. `ChaosResult` CR records pass/fail from Litmus’s perspective

#### <VPIcon icon="iconfont icon-yaml"/>`ledger-service-network-latency.yaml` (Experiment 2 — manual)

Adds **2000 ms** network latency to `ledger-service` pods for 60 seconds. Proves timeouts return **503** instead of hanging the UI.

#### <VPIcon icon="iconfont icon-yaml"/>`notification-service-memory-hog.yaml` (Experiment 3 — manual)

Fills **80%** of pod memory limit for 60 seconds. Proves OOMKill + restart behavior.

::: warning Never apply all three at once.

Run one experiment, verify recovery, then the next.

:::

### 6.5.5: After the Demo, What to Look For (Do Not Skip)

**1. During chaos: availability**

| Signal | Good | Bad |
| --- | --- | --- |
| `curl http://clearledger.local/auth/health` | **200** while one pod is down | 502/503/timeout |
| `kubectl get pods -l app=auth-service` | 1 Running + 1 Init/Pending (replacement starting) | 0 Running |

**2. After chaos: recovery**

| Signal | Good | Bad |
| --- | --- | --- |
| Pod count | 2/2 **Ready** (may take 1–2 min — Vault agent init) | Stuck at 1 replica |
| Events | `Killing` then `Scheduled` / `Started` on new pod | Repeated CrashLoopBackOff |
| ArgoCD | Synced | — |

**3. Litmus `ChaosResult` verdict**

```sh
kubectl get chaosresult -n litmus
```

::: inof Your pass criteria:

- `/auth/health` returned **200** at least once during the chaos window
- A pod was **Killed** (see events)
- Deployment returned to **2 replicas**

:::

### 6.5.6 Manual Experiments (After Experiment 1 Succeeds)

Wait until both auth-service pods show **2/2 Ready**, then run **one** experiment at a time:

```sh
# Experiment 2 — 2s network latency on ledger-service (60s)
kubectl delete chaosengine ledger-service-network-latency -n litmus --ignore-not-found
kubectl apply -f stages/stage-6.5-chaos-engineering/infra/chaos/ledger-service-network-latency.yaml

# Experiment 3 — memory pressure on notification-service (60s)
kubectl delete chaosengine notification-service-memory-hog -n litmus --ignore-not-found
kubectl apply -f stages/stage-6.5-chaos-engineering/infra/chaos/notification-service-memory-hog.yaml
```

| Experiment | File | What to verify |
| :--- | :---: | :--- |
| **Pod delete** | <VPIcon icon="iconfont icon-yaml"/>`auth-service-pod-delete.yaml` | Health 200 during kill, 2 replicas after |
| **Network latency** | <VPIcon icon="iconfont icon-yaml"/>`ledger-service-network-latency.yaml` | API returns 503/timeout, not infinite hang |
| **Memory hog** | <VPIcon icon="iconfont icon-yaml"/>`notification-service-memory-hog.yaml` | Pod OOMKills and restarts, Redis subscription recovers |

Clean up an experiment:

```sh
kubectl delete chaosengine auth-service-pod-delete -n litmus
```

### 6.5.7: Health Check

```sh
make check-65
```

::: note Expected

See full sample in [§6.5.3a](#653a-real-output-examples-verified-on-the-lab-cluster) (`make check-65` block). Minimum:

```plaintext
▶ Stage 6.5 Chaos Engineering (LitmusChaos)
  ✓ Litmus subscriber running (UI connected to cluster)
  ✓ auth-service has 2/2 Ready replicas (stable for chaos)
  ...
All checks passed. Ready for the next stage.
```

:::

### Stage 6.5 Complete: Checklist

| # | Check | How to verify |
| --- | --- | --- |
| 1 | Litmus operator running | `kubectl get pods -n litmus` — `litmus-*` Running |
| 2 | Experiments installed | `kubectl get chaosexperiment pod-delete -n litmus` |
| 3 | Pod-delete demo run | `make demo-65` health 200 during chaos |
| 4 | Recovery observed | 2 auth-service replicas Ready. Killing/Scheduled events |
| 5 | Evidence saved | Terminal output from `run-chaos.sh` (DORA artifact) |
| 6 | Health check | `make check-65` green |
| 7 | UI infrastructure connected | Overview → **Active: 1** (§6.5.2) |

::: info What You Learned in Stage 6.5

- **Detection ≠ resilience**: Falco alerts don't prove HA
- **Replicas + Services + probes**: why `replicas: 2` isn't cosmetic
- **ChaosEngine YAML**: declarative failure injection as code
- **Platform vs app namespaces**: Kyverno blocks chaos runners in `clearledger`, engines run in `litmus`
- **MTTR**: time from pod kill to 2/2 Ready again (Stage 7 graphs this)

:::

::: note What you can now put on your CV / say in an interview

> Ran chaos experiments with LitmusChaos (pod-delete, network latency, memory pressure) to prove the system recovers, and can distinguish detection from resilience.

:::

`make snapshot STAGE=65 && make snapshots`. Confirm `clearledger.stage65`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 7 — Security Observability

Security you can't measure, you can't prove.

The goal here is to understand how metrics, logs, and dashboards fit together. Then prove it by running commands in the terminal, watching the same events appear in Grafana, and explaining what each panel means.

This stage is not “install Grafana and move on.” Stage 7 isn't complete until your dashboards show real Kyverno violations and Falco alerts that you triggered in §7.4: plus portfolio screenshots (§7.6). `make check-7` only proves the stack is up; it does not prove you can detect security events.

**Before you start:** `make check-6` should pass (Stage 6.5 is optional. Skip is fine). Check the VM is not overloaded: `multipass exec clearledger -- uptime`. If you ran Stage 6.5, do [§7.0](#70-free-node-resources-scale-down-litmus) first to scale Litmus down. Plan about half a day. This is the heaviest stage on a single-node VM.

You'll be done when §7.6 is complete: dashboards show your Kyverno denial and Falco alert, not empty panels. Then `make check-7` (§7.7), `make snapshot STAGE=7`, and `make snapshots` (confirm `clearledger.stage7`).

**Already installed?** If `kubectl get pods -n monitoring` shows Grafana **3/3** and Loki **1/1**, skip §7.1. Start at §7.2 (verify the stack), then §7.4 (hands-on lab).

### What You Need to Know First

Up to now, each stage had its own window into the cluster. Stage 3 gave you CI scan results in GitHub Actions. Stage 4 showed Kyverno blocking a bad deploy in the terminal. Stage 6 gave you Falco alerts in its UI, and you could always run `kubectl logs` on a pod. Those views are useful, but they are scattered.

Stage 7 brings them together in one place: **Grafana**. Instead of jumping between five different tools, you open a dashboard and see whether security events, policy violations, and app health are happening over time.

#### The three tools you're installing

**Prometheus** collects numbers from the cluster: things like “how many Kyverno denials in the last hour” or “how many HTTP requests per second.” It checks those numbers every 15–30 seconds and keeps a history you can graph.

**Loki** collects log lines: the same kind of text you see from `kubectl logs`, but from many pods at once. Falco alerts, failed login attempts, and application errors all land here so you can search them later.

**Grafana** is the web UI where charts and tables pull data from Prometheus and Loki. This is what you would show an auditor: not a one-off terminal screenshot, but proof that you can find and measure events after they happen.

Prometheus doesn't magically know what to collect. ServiceMonitors and PodMonitors are small config objects that point it at the right targets.  
If Kyverno has no monitor, the Kyverno dashboard stays empty even when Kyverno is working fine. The same applies to application request rates. Those panels stay blank until §7.5, when metrics-enabled images are deployed through GitOps.

Logs follow a similar path. **Promtail** reads container logs and sends them to Loki. If Loki isn't running, Grafana log panels show “No data” even though `kubectl logs` still works on individual pods.

#### How this connects to what you already built

When you blocked a bad `kubectl apply` in Stage 4, Kyverno recorded that denial. In Stage 7, that shows up on the **Kyverno Policy Violations** dashboard (via Prometheus).

When you triggered a shell inside a pod in Stage 6, Falco wrote an alert. In Stage 7, that appears on the **Security Event Timeline** (via Loki).

When ClearLedger handles HTTP traffic or a failed login, those events feed the **Service Health** dashboards (Loki and Prometheus together).

Vault (Stage 5) and network policies (Stage 6) don't always have their own panel, but they still matter: fewer secrets in Git and blocked pod traffic show up indirectly in a healthier, quieter cluster.

#### What you'll do in this stage

You'll run a command in the terminal (for example, a Kyverno violation or a Falco trigger) and then wait a short time while Prometheus or Loki ingests the event. Within about 15–90 seconds, the matching Grafana panel should update.

That's the whole point of observability for security: the terminal proves the event happened once, while the dashboard proves you can **detect and measure** it later without being logged into the cluster at that exact moment.

### 7.0: Free Node Resources (Scale Down Litmus)

Stage 6.5 is complete. You don't need the Litmus UI, MongoDB, or chaos operator running while Prometheus, Loki, and Grafana start. They compete for the same CPUs on a single-node lab VM (6 by default, see <VPIcon icon="fas fa-folder-open"/>`scripts/`<VPIcon icon="iconfont icon-shell"/>`setup-cluster.sh`).

Scaling Litmus to zero frees ~500–800MB RAM and reduces CPU churn before the observability install.

```sh
kubectl scale deployment,statefulset -n litmus --replicas=0 --all
kubectl get pods -n litmus
# Expected: no Running pods (Succeeded job pods from chaos experiments are OK)
multipass exec clearledger -- uptime
# Expected: load average (1m) ideally below ~8 before continuing
```

You can scale Litmus back up later if you want to re-run chaos experiments (`bash stages/stage-6.5-chaos-engineering/scripts/install-litmus.sh`). For Stages 7–7.5, keep it scaled down.

### 7.1: Install the Observability Stack

**This is safe to run more than once.** The script checks what's already installed. If Grafana, Prometheus, and Loki are healthy, it skips the heavy install and only updates dashboards and scrape configs. Running it again after a partial failure won't duplicate or break a working stack.

Only add `FORCE=1` if something is genuinely stuck, for example you edited the Helm values files and need a full reinstall, or Loki keeps crashing in a restart loop:

```sh
FORCE=1 bash stages/stage-7-observability/scripts/install-observability.sh
```

On a first-time install, use the plain command in Step 1 below. Don't use `FORCE=1` unless the troubleshooting section tells you to.

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

work as written

```sh
FORCE=1
```

@tab <VPIcon icon="fa-brands fa-windows"/>

doesn't use that syntax.

**Native Windows PowerShell** 

Run the lab inside **WSL2 Ubuntu** (recommended), or set the variable first: 

```powershell
$env:FORCE=1; bash stages/stage-7-observability/scripts/install-observability.sh
```

:::

**Step 1: install** (wait until the script prints `✓ Stage 7 installed.`):

```sh
bash stages/stage-7-observability/scripts/install-observability.sh
```

#### If you see “Waiting for Falco” during the Stage 7 install, that's expected.

You already installed Falco in Stage 6. Stage 7 is not adding a second Falco. It is making sure the existing Falco setup can feed logs and metrics into the observability stack.

The flow is:

- Falco still runs in the `falco` namespace.
- Promtail sends Falco logs to Loki.
- Grafana reads those logs from Loki.
- The Security Event Timeline dashboard shows the Falco alerts.

Right after install, the Grafana panels may be empty. That's normal. You need to trigger a new alert in §7.4 before the dashboard has something fresh to show.

**Step 2. Check pods** (run this after Step 1 finishes):

```sh
kubectl get pods -n monitoring
#
# NAME                                              READY   STATUS    RESTARTS   AGE
# kube-prometheus-stack-grafana-....                3/3     Running   0          5m
# kube-prometheus-stack-prometheus-....             2/2     Running   0          5m
# loki-0                                            1/1     Running   0          5m
# loki-promtail-....                                1/1     Running   0          5m
```

Grafana must show **3/3** Ready (not 2/3). Loki must show **1/1**. If pods are still `Pending` or `ContainerCreating`, wait a few minutes and run `kubectl get pods -n monitoring` again.

**Expected – Loki healthy:**

```sh
kubectl exec -n monitoring loki-0 -- wget -qO- http://127.0.0.1:3100/ready
#
# ready
```

**Expected – Grafana can reach Loki (same path log panels use):**

```sh
kubectl exec -n monitoring deploy/kube-prometheus-stack-grafana -c grafana -- \
wget -qO- --timeout=5 http://loki:3100/ready
#
# ready
```

**Expected – Grafana UI reachable:**

```sh
curl -sI http://grafana.local | head -n 1
#
# HTTP/1.1 302 Found
```

Log into **`http://grafana.local`:** `admin` / `admin123`

Empty panels right after install are **normal**. You haven't generated events yet. Continue to §7.2–§7.4. If Helm fails: wait 30s, then `FORCE=1 bash stages/stage-7-observability/scripts/install-observability.sh`. See <VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`. Stage 7.

::: note ✋ Hands-on checkpoint: confirm Loki and dashboards are ready

Before you open Grafana, confirm the logging stack and dashboards actually installed.

:::

On a single-node VM, Grafana can look fine while Loki is crash-looping or the ClearLedger dashboards never loaded. If you skip this check, you may spend the rest of Stage 7 debugging empty panels.

**Run:**

```sh
kubectl get pods -n monitoring
kubectl get pods -n monitoring -l app.kubernetes.io/name=loki \
-o jsonpath='{.items[*].status.containerStatuses[*].restartCount}{"\n"}'
kubectl get configmap -n monitoring -l clearledger_dashboard=1 --no-headers | wc -l
```

**Expected:**

- All monitoring pods are `Running`
- Grafana shows `3/3` Ready
- Loki shows `1/1` Ready
- Loki restart count is `0`, or low and not climbing
- The dashboard count is `6`

If Loki keeps restarting or the dashboard count is `0`, stop here and fix the install before continuing. Empty Grafana panels usually mean Loki or the dashboards are missing, not that the security events failed.

### 7.2: Verify Prometheus, Loki, and Grafana (before opening dashboards)

Run these three checks so you know which layer is broken if a panel is empty.

#### Check 1: Prometheus has Kyverno metrics

```sh
kubectl exec -n monitoring deploy/kube-prometheus-stack-grafana -c grafana -- \
wget -qO- 'http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/query?query=kyverno_admission_requests_total' 2>/dev/null \
| head -c 400
```

(Prometheus runs as a StatefulSet pod, not a Deployment. This query goes through Grafana to the Prometheus Service.)

::: note Expected

JSON with `"status":"success"` and a `"metric"` block (values may be `0` until you trigger a violation in §7.4).

If you see `"status":"success"` but `"result":[]`, Prometheus is up but Kyverno hasn't recorded admissions yet. That's fine before the lab.

:::

#### Check 2: Loki has Falco logs

```sh
kubectl exec -n monitoring loki-0 -- wget -qO- \
'http://127.0.0.1:3100/loki/api/v1/labels' 2>/dev/null | head -c 300
```

::: note Expected

JSON listing labels such as `"namespace"` (and after Falco events, you'll see `"falco"` in label values).

:::

Quick log search (may return empty lines until §7.4 Exercise B):

```sh
kubectl exec -n monitoring loki-0 -- wget -qO- \
'http://127.0.0.1:3100/loki/api/v1/query?query=%7Bnamespace%3D%22falco%22%7D&limit=3' 2>/dev/null \
| head -c 500
```

::: note Expected

`"status":"success"`. `"result":[]` means no Falco lines in Loki yet, not a broken Loki.

:::

#### Check 3: Grafana imported ClearLedger dashboards

```sh
curl -s -u admin:admin123 'http://grafana.local/api/search?tag=clearledger' | jq -r '.[].title'
#
# ClearLedger - Compliance Posture
# ClearLedger - DORA Metrics
# ClearLedger - Kubernetes Audit Log Analysis
# ClearLedger - Kyverno Policy Violations
# ClearLedger - Security Event Timeline
# ClearLedger - Service Health + Auth Security
```

Or in the UI: go to **Dashboards** then filter tag `clearledger`. You should see exactly these six (no missing names).

### 7.3: Your First 10 Minutes in Grafana

This section is only a tour. You're not proving anything yet.

**Rule for all of Stage 7:** an empty panel usually means no events have happened in the selected time range, not that Grafana is broken. You create the real events in §7.4. #### Step 1: Open Grafana

Go to `http://grafana.local` and log in:

- Username: `admin`
- Password: `admin123`

#### Step 2: Set the Time Range

In the top-right corner, choose **Last 15 minutes**.

Keep this setting for all of Stage 7. Wider ranges like **Last 24 hours** can overload Loki on a single-node lab VM.

#### Step 3: Open Dashboards One at a Time

Open one dashboard, look around, then move to the next. Don't open all six at once.

1. [<VPIcon icon="fas fa-globe"/>Kyverno Policy Violations](http://grafana.local/d/clearledger-kyverno-violations): policy blocks from Stage 4.2. [<VPIcon icon="fas fa-globe"/>Security Event Timeline](http://grafana.local/d/clearledger-security-events): Falco alerts from Stage 6. You may see old `postgres` noise in the log table.
3. [<VPIcon icon="fas fa-globe"/>Service Health + Auth](http://grafana.local/d/clearledger-service-health): app traffic and login attempts.
4. [<VPIcon icon="fas fa-globe"/>Compliance Posture](http://grafana.local/d/clearledger-compliance): summary view for auditors. Skim it and come back after §7.4.5. [<VPIcon icon="fas fa-globe"/>Audit Log Analysis](http://grafana.local/d/clearledger-audit-logs): empty on MicroK8s by design (audit pipeline not enabled by default).
6. [<VPIcon icon="fas fa-globe"/>DORA Metrics](http://grafana.local/d/clearledger-dora-metrics): deploy-frequency charts. Needs multiple CI runs to accumulate data. May show blank on first look. Optional.

Use the short dashboard links in this guide. Avoid old bookmarked URLs with long random slugs.

You can also find them in Grafana: go to **Dashboards** then search tag `clearledger`.

#### Step 4: How to Read What You See

Grafana panels pull data from two places:

- **Prometheus** shows numbers over time, like Kyverno violation counts and request rates
- **Loki** shows log lines, like Falco alerts and auth-service messages

A big number panel asks: did this count go above zero?

A line chart asks: was there a spike after I ran something?

A logs panel shows the actual text, like rule names, `CRITICAL`, or `Failed login attempt`.

If only log panels show `connection refused`, check Loki again in §7.1. If number panels work but log panels fail, the problem is likely Loki, not Grafana itself.

#### Step 5: Move On

Open dashboards 1–3, then continue to §7.4. That's where you'll run commands in the terminal and watch the panels update with real security events.

### 7.4: Hands-on Lab: Terminal → Dashboard Proof

This is the core learning section. For each exercise: run the command, wait, then confirm in Grafana.

::: note Timing

Wait **30–90 seconds** after each command for Prometheus scrape and Loki ingestion.

:::

### Two Ways to Do This Lab

#### Option 1: follow the exercises below (recommended for learning)

Run each command yourself, then check Grafana. That's Exercise A, B, and C.

#### Option 2: use the guided script

The script runs the same steps and pauses so you can check Grafana between them:

```sh
bash stages/stage-7-observability/scripts/generate-dashboard-data.sh
```

Or:

```sh
make demo-7
```

Both commands do the same thing. The script will say things like “Press Enter after you checked the Kyverno dashboard.” Switch to Grafana, look at the panel, then come back and press Enter.

**Want it to run without pauses?** (faster, less hand-holding)

```sh
SKIP_PROMPT=1 make demo-7
```

Use Option 1 if you want to understand each step. Use Option 2 if you want a walkthrough. Use `SKIP_PROMPT=1` if you just want the data generated quickly.

#### Exercise A: Kyverno block → Prometheus → Kyverno dashboard

**Terminal**: apply a pod that violates Stage 4 policy (runs as root):

```sh
cat <<'YAML' | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: stage7-kyverno-lab
  namespace: clearledger
spec:
  containers:
    - name: test
      image: nginx:alpine
YAML
```

**How to know it worked:**

You're testing whether Kyverno **blocks** a deliberately bad pod. Success means the pod **never gets created**.

**Pass. You should see:**

- The terminal prints `Error from server` and `denied the request`
- The exact policy names in the error don't matter. Your output might list one rule or several (`disallow-root-containers`, `require-resource-limits`, `drop-all-capabilities`, …). More lines just means more rules failed, that's still a pass.
- The pod name never shows up in the cluster:

```sh
kubectl get pods -n clearledger | grep stage7-kyverno-lab
```

::: note Expected

no output.

:::

**If it fails: stop and fix Stage 4 first**

- The command ends quietly with `created` (no error)
- `kubectl get pods -n clearledger` shows `stage7-kyverno-lab`

That means Kyverno let a root pod through. Run `make check-4` before continuing Stage 7. **Example of a passing terminal** (yours may list more policies):

```plaintext
Error from server: error when creating "STDIN": admission webhook "validate.kyverno.svc" denied the request:
policy disallow-root-containers/validate-run-as-non-root fail: Running as root is not allowed
```

**Confirm Prometheus saw it** (optional but useful if Grafana is empty):

```sh
kubectl exec -n monitoring deploy/kube-prometheus-stack-grafana -c grafana -- \
wget -qO- 'http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/query?query=kyverno_admission_requests_total{request_allowed="false"}' 2>/dev/null \
| grep -o '"value":[[^]]*]' | head -3
```

::: note Expected

A `"value"` entry with a recent Unix timestamp and a number **greater than 0** (for example `"value":[..., "1"]`). If you see this, Kyverno and Prometheus are working even when Grafana panels say **No data**.

:::

**Grafana**: open [<VPIcon icon="fas fa-globe"/>Kyverno Policy Violations](http://grafana.local/d/clearledger-kyverno-violations?from=now-15m&to=now).

![screenshot of Kyverno Policy Violations](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/7f5cf039-f2de-41d6-b71e-f5af2fc3ccab.png)

**What you're proving:** the terminal denial showed up in Grafana. You don't need every panel to light up. You need **one clear sign** that Kyverno blocks are being counted.

**Step 1: quick sanity check (top row, left to right)**

1. **Policy Violations (time range)**: big number. Pass: shows 1 or more. Fail: says No data.
2. **Violations (time range)**: same idea, second counter. Pass: 1 or more.
3. **Active Kyverno Rules** — usually 18. If this number shows up, Grafana can talk to Prometheus. That is good even when the first two panels are still empty.

**Step 2: if the top two numbers work, skim the charts**

- **Violation Rate by Resource Kind** (middle chart): look for a bump labeled Pod around the time you ran `kubectl apply`.
- **Top Blocked Resource Types** (bottom-left table): look for a Pod row.
- **Violations by Namespace (trend)** (bottom-right chart): look for a bump for clearledger.

Charts can lag. A big number > 0 in Step 1 is enough to move on. The charts are bonus proof for §7.6 screenshots.

**If the top two panels say "No data" but the terminal denial worked:**

This is common. Those panels count **new** denials during the time range, not the total ever recorded. One denial sometimes lands in Prometheus before Grafana's counter moves.

Try this:

1. Run the same `kubectl apply` command again (denied again, that is expected).
2. Wait 60 seconds.
3. Click Refresh (circular arrow, top-right).

After a second denial you should see 2 in the top stat panels. Screenshot that for §7.6. **Still empty? Use Explore as backup proof:**

1. Grafana left menu → Explore
2. Datasource: Prometheus
3. Paste: `sum(kyverno_admission_requests_total{request_allowed="false"})`
4. Click Run query

**Pass:** the result is 1 or 2. A screenshot of the terminal denial plus Explore showing a number > 0 counts as portfolio proof even if the dashboard stats stay slow.

#### Exercise B: Falco shell → Loki → Security Event Timeline

**What you're doing (same idea as Exercise A):**

- **Exercise A:** you did something bad, Kyverno blocked it, and the Grafana **Kyverno** dashboard updated.
- **Exercise B:** you do something suspicious inside a running pod, Falco detects it, and Grafana **Security Event Timeline** updates.

You already did this in Stage 6 (`make demo-6`). Here you do it again and prove the alert shows up in Grafana, not only in `http://falco.local`.

**The story in one line:** pretend you're an attacker who got shell access inside `auth-service`: Falco should scream, and the scream should appear on the timeline dashboard.

**Step 1: trigger the alert (terminal way)**

You're pretending an attacker got into `auth-service` and ran a quick command (`id`) to see who they're logged in as. That's suspicious. Falco is supposed to catch it.

The block below is three commands in order. Copy-paste the whole block:

```sh
AUTH_POD=$(kubectl get pod -n clearledger -l app=auth-service \
  --field-selector=status.phase=Running -o jsonpath='{.items[0].metadata.name}')
echo "Using pod: $AUTH_POD"
kubectl exec -n clearledger "$AUTH_POD" -c auth-service -- /bin/sh -c 'id && exit'
```

What each line does:

1. **Line 1**: finds the name of a running `auth-service` pod and saves it in `AUTH_POD`.
2. **Line 2**: prints that name so you can see it worked (not empty).
3. **Line 3**: runs `/bin/sh -c 'id && exit'` **inside** that pod. This is the fake “attack.” Falco watches for shells like this.

**Pass: you only need these two lines in the output:**

```plaintext
Using pod: auth-service-77b7d9cd99-xxxxx
uid=1000 gid=1000 groups=1000
```

- First line: a real pod name (not blank).
- Second line: the `id` command ran inside the container.

That's Step 1 done. The pod is still running. You didn't break anything.

**Fail: stop and fix before Step 2:**

- `error: Internal error` or `container not found`
- `Using pod:` with nothing after it

Run `kubectl get pods -n clearledger -l app=auth-service` and retry when one pod shows **Running**.

**Step 2: Confirm Falco saw it (terminal, right away)**

The Falco log is one long JSON line. Don't try to read the whole thing. Run:

```sh
kubectl logs -n falco -l app.kubernetes.io/name=falco --tail=50 | grep -i 'Shell spawned'
```

**Pass. You should see one short phrase somewhere in the line:**

```plaintext
Shell spawned in ClearLedger container ... pod=auth-service-... cmd=sh -c id && exit
```

Or the rule name:

```plaintext
"rule":"Shell Spawned in ClearLedger Container"
```

**That one grep hit means Exercise B worked in the terminal.** Screenshot this line for your portfolio.

**Ignore:**

- `Defaulted container "falco" out of: ...`: normal kubectl noise
- Lines about `postgres-0` and <VPIcon icon="fas fa-folder-open"/>`/etc/passwd`: background noise from Stage 6, not your test
- The rest of the JSON (`output_fields`, `k8smeta`, and so on). You don't need to parse it

**If grep prints nothing:** run Step 1 again, wait 5 seconds, then re-run the grep.

**Step 3: Confirm Loki stored it (wait ~60 seconds first)**

The story so far:

- **Step 1**: you triggered the alert inside `auth-service`
- **Step 2**: Falco wrote the alert to its own logs ✓

**Step 3 asks:** did that log line make it into **Loki** which is Grafana's log database?

Falco doesn't talk to Grafana directly. Promtail copies Falco's logs into Loki. That copy takes 60–90 seconds. Wait after Step 1, then run this check.

**What this command does:**

"Search Loki for Falco logs that contain `Shell spawned`, then show only lines that also mention `auth-service`."

```sh
kubectl exec -n monitoring loki-0 -- wget -qO- \
'http://127.0.0.1:3100/loki/api/v1/query?query=%7Bnamespace%3D%22falco%22%2Ccontainer%3D%22falco%22%7D%20%7C%3D%20%22Shell%20spawned%22&limit=3' 2>/dev/null \
| grep -i 'auth-service'
```

**Pass:** you see a line with both `auth-service` and `Shell spawned`. That means Loki has your alert and Grafana can show it.

**Fail (misleading pass):** you grep for `ClearLedger` alone and get a hit from `postgres-0` reading <VPIcon icon="fas fa-folder-open"/>`/etc/passwd`. That's background noise from Stage 6, not your shell test. Always look for `auth-service`.

**Empty output?** That's OK. If Step 2 passed, **continue to Step 4**. Promtail may still be catching up, or the JSON is too long for this quick grep. Grafana often shows the alert even when this command prints nothing.

**Step 4: open Grafana**

Open [<VPIcon icon="fas fa-globe"/>Security Event Timeline](http://grafana.local/d/clearledger-security-events?from=now-1h&to=now).

![screenshot of security timeline dashboard](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/c8f78ce4-8857-485b-9e4a-77c83bb95bd9.png)

This is the right dashboard. The title at the top should say **ClearLedger - Security Event Timeline.**

**Before you look at panels:**

1. Time range: **Last 1 hour** (top-right)
2. Auto-refresh: Off
3. Re-run Step 1 if your shell command was more than a few minutes ago
4. Wait 90 seconds, then click Refresh

**What you'll probably see (and this is normal):**

- **CRITICAL Alerts (1h)**: a big number like **1.08 K**. That is mostly `postgres-0` reading <VPIcon icon="fas fa-folder-open"/>`/etc/passwd` on a loop (Stage 6 background noise). It does **not** mean you failed.
- **Alerts by Rule Name** (pie chart): dominated by **Sensitive File Read in ClearLedger**. Also normal.
- **Recent CRITICAL / WARNING Events**: lots of Postgres rows. Your shell alert is in there, but buried.

![anothre screenshot showing security even timeline grafana dashboard](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/577e14fa-205d-462a-beb2-7a6a08514295.png)

![](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/e3a363af-676b-47a6-a61a-fe5ee8b7c130.png)

The top timeline (**Falco Alerts by Priority - Timeline**) may say **No data**. That's a known quirk. Don't panic, just use the log panel and browser search instead.

**How to find _your_ alert (on this dashboard):**

1. Stay on **ClearLedger - Security Event Timeline** — not Explore, not Tempo.
2. Click inside **Recent CRITICAL / WARNING Events** (the log list on the right).
3. Press <kbd>⌘</kbd>+<kbd>F</kbd> (<VPIcon icon="iconfont icon-macos"/>) or <kbd>Ctrl</kbd>+<kbd>F</kbd> (<VPIcon icon="fa-brands fa-windows"/>/<VPIcon icon="fa-brands fa-linux"/>).
4. Search for `auth-service` or `Shell spawned`.

If the search finds a row mentioning your pod and **Shell spawned**, screenshot it.

**Wrong place (common mistake):** Grafana **Explore** with datasource **Tempo** showing `ledger-service` traces. That's **Stage 7.5** (OpenTelemetry), not Exercise B. Tempo shows request traces, not Falco security alerts.

**Pass for Exercise B (pick one):**

1. **Best:** Step 2 terminal grep shows `Shell spawned` **and** the **Security Event Timeline** log search finds `auth-service` / `Shell spawned` — screenshot both.
2. **Also fine:** Step 2 grep screenshot **plus** the **Security Event Timeline** dashboard with **CRITICAL Alerts (1h)** showing a number (proves that Falco → Loki → Grafana works, even if your shell row is buried in postgres noise).
3. **Fallback (only if the dashboard search fails):** Step 2 grep **plus** Grafana **Explore** with datasource **Loki** (not Tempo):
    - Left menu, go to **Explore**
    - Top-left datasource dropdown: choose **Loki**
    - Query: `{namespace="falco", container="falco"} |= "Shell spawned"`
    - Click **Run query**
    - Look for a line with `auth-service`

Screenshot for §7.6.

#### Exercise C: Failed login, Loki, and Service Health

**The story:** someone is guessing passwords on your login API.  
You send ten bad login attempts from the terminal. `auth-service` writes `Failed login attempt` to its logs. Grafana **Service Health + Auth Security** should show the count go up.

Same pattern as A and B: terminal action, then logs, then dashboard.

**Step 1: send bad login attempts (terminal)**

Copy-paste the whole block:

```sh
for i in $(seq 1 10); do
  curl -s http://clearledger.local/auth/health >/dev/null
  curl -s -X POST http://clearledger.local/auth/login \
    -H 'Content-Type: application/json' \
    -d '{"email":"lab-attacker@evil.com","password":"wrong"}' >/dev/null
done
echo "done"
```

**Pass:** the only output you need is:

```plaintext
done
```

No output from the `curl` lines is normal. The loop hits `/auth/health` (keeps the app warm) and `/auth/login` with a wrong password ten times.

**Fail:** `curl: (6) Could not resolve host`. Run `bash scripts/setup-hosts.sh` on your Mac. `curl: (7) Failed to connect`. Check `kubectl get pods -n clearledger -l app=auth-service`.

**Step 2: Confirm auth-service logged it**

```sh
kubectl logs -n clearledger -l app=auth-service --tail=30 | grep -i 'Failed login' | tail -3
```

**Pass. You should see lines like:**

```plaintext
Failed login attempt for email: lab-attacker@evil.com
```

You may see several lines (one per failed attempt). One line is enough. Screenshot this for your portfolio.

**If grep prints nothing:** wait 10 seconds and run again. If still empty, check the auth pod is Running: `kubectl get pods -n clearledger -l app=auth-service`.

**Step 3: open Grafana (wait ~60 seconds after Step 1)**

Open [Service Health + Auth Security](http://grafana.local/d/clearledger-service-health?from=now-1h&to=now).

**This is the right dashboard.** The title should say **ClearLedger - Service Health + Auth Security**.

1. Time range: **Last 1 hour**
2. Auto-refresh: **Off**
3. Click **Refresh** once

![screenshot showing Service Health + Auth Security grafana dashboard](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/a6df00f0-3f4a-4951-ab5f-3efb498beaa1.png)

What to check (only these matter for Exercise C):

1. **Failed Login Attempts (1h)**: big number. **Pass:** **> 0**. This is your main proof.
2. **Failed Login Log Stream**: log lines in the panel. **Pass:** lines with `Failed login attempt` or `lab-attacker@evil.com`. Use **Cmd+F** inside the panel if needed.

Panels you can ignore if empty:

- **Successful Logins**: fine at **0** (you only sent bad passwords)
- **Request Rate by Service**: may be empty until §7.5 metrics images. Not required for Exercise C.

You pass Exercise C when you have **two screenshots:**

**Screenshot 1 (required):** your Step 2 terminal output showing `Failed login attempt for lab-attacker@evil.com`. This proves the app logged the bad logins.

**Screenshot 2 (pick one of these):**

- **Option A:** the **Failed Login Attempts (1h)** panel showing a number greater than zero (for example **10**). This proves Grafana counted the failures.
- **Option B:** the **Failed Login Log Stream** panel showing a line with `lab-attacker@evil.com`. Use this if the big number panel is still empty but the log stream has your email.

You need Screenshot 1 and either Option A or Option B. That's enough for §7.6.

#### Exercise D: Compliance dashboard (the auditor summary)

**What you're doing:** open one dashboard that rolls up Exercises A, B, and C. This is the “show the auditor” view: admission control + runtime detection + application security in one screen.

**When:** only after you finished A, B, and C.

**Step 1: open the dashboard**

[<VPIcon icon="fas fa-globe"/>Compliance Posture](http://grafana.local/d/clearledger-compliance?from=now-1h&to=now)

![screenshot of grafana Compliance Posture dashboard](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/060714bc-c7c3-4d53-ad0e-d6d642970550.png)

Set **Last 1 hour**, auto-refresh **Off**, click **Refresh**.

**Step 2: Check the top row stats**

| Stat on dashboard | Came from | Pass |
| --- | --- | --- |
| **Policy Violations** | Exercise A (Kyverno) | **> 0** |
| **Runtime Threats** | Exercise B (Falco) | **> 0** (postgres noise counts — that is OK) |
| **Failed Auth Attempts** | Exercise C (bad logins) | **> 0** |

![screenshot of grafana Compliance Posture dashboard](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ba6d0d41-bc88-4d8b-a93b-a1b78f99f4da.png)

All three don't need to be huge numbers. They just need to be **above zero** after your tests.

**If one stat is still 0:** re-run that exercise (A, B, or C), wait 90 seconds, refresh. Policy Violations may need a second Kyverno denial like Exercise A.

This is screenshot #3 for §7.6: the single frame that proves defense-in-depth.

::: note ✋ Hands-on checkpoint: are you actually done with Stage 7?

Installing Grafana isn't the goal. Detection is: you triggered real events and can see them on dashboards.

:::

::: note Optional terminal check (proves Grafana is wired up):

```sh
curl -s -u admin:admin123 'http://grafana.local/api/search?tag=clearledger' | jq -r '.[].title'

curl -s -u admin:admin123 'http://grafana.local/api/datasources' | jq -r '.[].name'
```

First command, you should see six dashboard names:

- ClearLedger - Kyverno Policy Violations
- ClearLedger - Security Event Timeline
- ClearLedger - Service Health + Auth Security
- ClearLedger - Compliance Posture
- ClearLedger - Kubernetes Audit Log Analysis
- ClearLedger - DORA Metrics

Second command, you should see at least:

- Prometheus
- Loki

:::

**What does NOT mean you're done:**

`make check-7` only checks that monitoring pods are running. Green output there does **not** replace §7.4. **What DOES mean you are done:**

You ran Exercises A, B, and C in §7.4 and saved the §7.6 screenshots:

1. Kyverno denial (terminal + dashboard)
2. Falco shell alert (terminal + Security Event Timeline)
3. Failed logins (terminal + Service Health)
4. Compliance Posture summary (all three stats above zero)

If you have those four screenshots, Stage 7 is complete.

### 7.5: Fill in the Request Rate Chart (Optional)

**This is not required for Stage 7.** Exercises A–C and §7.6 screenshots don't need this section. Skip it if you're happy moving on.

Also, this is not the same as Stage 7.5 (OpenTelemetry/Tempo). This subsection is only about the **Request Rate by Service** chart on the Service Health dashboard.

#### What this section is for:

On Service Health + Auth Security, the Failed Login panels work from logs (Loki). The Request Rate by Service chart needs something different: app pods must expose a `/metrics` endpoint so Prometheus can scrape request counts.

The code is already in the repo (`app/*/prom_metrics.py`). Prometheus is already configured to scrape it (`clearledger-podmonitor.yaml`). The usual problem: your cluster is still running older images from before that code was in your build.

#### Step 1: check if you already have metrics (30 seconds)

Run this first. If it passes, skip the rest of §7.5.

```sh
kubectl exec -n monitoring deploy/kube-prometheus-stack-grafana -c grafana -- \
wget -qO- 'http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/query?query=http_requests_total' 2>/dev/null \
| grep -o '"__name__":"http_requests_total"' | head -1
```

**Pass:** prints `"__name__":"http_requests_total"`. Open Service Health, refresh, and the Request Rate by Service chart should already have lines.

**No output:** continue to Step 2.

#### Step 2: deploy images that expose `/metrics`

Pick one path.

**Path A: GitOps (if you have been using CI/CD since Stage 1–2)**

1. Push a commit to <VPIcon icon="fas fa-code-branch"/>`main` on your app repo.
2. Wait for CI to build new images and update `clearledger-infra`.
3. Wait for ArgoCD to show **Synced** and **Healthy** on the clearledger app.
4. Go to Step 3.
**Path B: lab shortcut (faster, local only)**

```sh
export DOCKER_USERNAME=your-dockerhub-user
bash stages/stage-7-observability/scripts/build-metrics-images.sh
```

This builds, pushes, and rolls out metrics-enabled images for all three services.

**Heads-up:** ArgoCD self-heal may revert these image tags within a few minutes if `clearledger-infra` still points at older tags. That's fine for a quick lab demo. For a lasting fix, use Path A or update the infra repo (see §2 rollback notes).

#### Step 3: verify metrics landed (~60 seconds after rollout)

```sh
kubectl exec -n clearledger deploy/auth-service -c auth-service -- \
  wget -qO- http://127.0.0.1:8000/metrics 2>/dev/null | head -5
```

**Pass:** lines starting with `# HELP` or `http_requests_total`.

Then confirm Prometheus sees them:

```sh
kubectl exec -n monitoring deploy/kube-prometheus-stack-grafana -c grafana -- \
wget -qO- 'http://kube-prometheus-stack-prometheus.monitoring:9090/api/v1/query?query=http_requests_total' 2>/dev/null \
| grep -o '"__name__":"http_requests_total"' | head -1
```

**Pass:** `"__name__":"http_requests_total"`

Generate a little traffic (re-run the Exercise C curl loop or hit `http://clearledger.local/auth/health` a few times), wait 60 seconds, then open **Service Health + Auth Security** and refresh. **Request Rate by Service** should show lines for `auth-service`, `ledger-service`, or `notification-service`.

#### When to stop:

- **Request Rate still empty but Failed Login panels work?** You're done with Stage 7. Request Rate is a nice-to-have.
- **Prometheus query passes but chart empty?** Widen time range to **Last 1 hour**, generate traffic, wait 60s, refresh.

### 7.6: Wrap up Stage 7 (Screenshots + Done Check)

You're almost done. This section is just about saving proof, then moving on.

#### Are you actually finished?

Opening Grafana and seeing six dashboards isn't enough. `make check-7` passing isn't enough either. That only proves pods are running.

You're done when you ran §7.4, waited for the panels to update, and saved three screenshots from your cluster.

If the panels are empty or only show old Postgres noise, go back to §7.4 first.

**Before each screenshot:** set time range to **Last 15 minutes** (or **Last 1 hour** for Exercise B). Include the time picker and panel titles in the frame.

**Screenshot 1: Falco alert (Exercise B)**

Open [<VPIcon icon="fas fa-globe"/>Security Event Timeline](http://grafana.local/d/clearledger-security-events).

Capture **Recent CRITICAL / WARNING Events** with a row that mentions `Shell spawned` or `auth-service`. If postgres rows bury it, use Cmd+F inside the log panel, that still counts.

**Screenshot 2: Kyverno denial (Exercise A)**

Open [<VPIcon icon="fas fa-globe"/>Kyverno Policy Violations](http://grafana.local/d/clearledger-kyverno-violations).

Capture **Policy Violations (time range)** or **Violations (time range)** showing a number of 1 or more.

**Screenshot 3: Compliance summary (Exercise D)**

Open [<VPIcon icon="fas fa-globe"/>Compliance Posture](http://grafana.local/d/clearledger-compliance).

Capture the top row with all three stats above zero: **Policy Violations**, **Runtime Threats**, and **Failed Auth Attempts**.

**Screenshot 4 (optional): Failed logins (Exercise C)**

Open [<VPIcon icon="fas fa-globe"/>Service Health + Auth Security](http://grafana.local/d/clearledger-service-health).

Capture **Failed Login Attempts (1h)** above zero, or **Failed Login Log Stream** showing `lab-attacker@evil.com`.

Save files somewhere sensible, like <VPIcon icon="fas fa-folder-open"/>`docs/evidence/`<VPIcon icon="fas fa-file-image"/>`stage-7-screenshot-1-falco.png`. Name them so you know what each proves.

**Final check:** run `make check-7` (§7.7), save your VM, and you can claim Stage 7.

### 7.7: Verify

```sh
make check-7
#
# ▶ Stage 7 — Observability (Grafana + Prometheus + Loki)
#   ✓ Prometheus is running
#   ✓ Grafana reachable (http://grafana.local or in-cluster health OK)
#   ✓ Loki pod is running (0 restarts)
#   ✓ Loki reachable from Grafana (http://loki:3100/ready)
#   ✓ ClearLedger alerting rules exist
#   ✓ ClearLedger dashboards imported (6 found)
```

Warnings about Loki restarts or missing dashboards: fix with §7.1 before claiming Stage 7 complete.

**Save your VM** after §7.6 and `make check-7`. See the block at the end of Stage 7 below.

### 7.8: What Broke (Lab Notes + Interview Talking Points)

**The stack in one sentence:** Prometheus stores numbers (metrics), Loki stores log lines, and Grafana displays both visually. Nothing appears until something actually happens in the cluster.

#### What tripped you up in the lab

1. **Empty dashboards right after install:** Normal. Grafana doesn't create events. You trigger them in §7.4 (Kyverno denial, Falco shell, failed logins).
2. **Loki slow or refresh stuck on “Cancel”:** Falco logs are huge. **Last 24 hours** overloads a small cluster. Use **Last 1 hour**, one dashboard at a time, and wait ~10 seconds.
3. `make check-7` passed but panels still empty *(lab checklist only, not an interview topic)*: The health check confirms Prometheus/Loki/Grafana pods are up. It does **not** mean events exist. You still need §7.4 + §7.6 before you snapshot and move on.

#### If someone asks about this in an interview

**Empty dashboards?** Grafana only shows what already happened. No event in the time range means an empty panel. That's normal until you trigger something.

**Loki slow on a small cluster?** Falco logs are huge. We kept time ranges short (15 minutes, not 24 hours) and opened one dashboard at a time. Same trade-off you would make in prod on limited hardware.

**How did you prove it worked?** I ran the attacks myself: denied a bad pod, spawned a shell in a running container, and sent failed logins. Then I checked Grafana and screenshot the matching panels. Terminal action first, dashboard proof second.

**Short version you can say out loud:**

> "I connected Kyverno and Falco into Grafana. To prove it, I triggered a policy block and a runtime alert, then showed both on security dashboards. On a single-node lab, Loki got slow with wide time ranges, so we kept queries tight."

Pipeline problems from earlier stages (Trivy, Kyverno, image tags, and so on) are in <VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` — not something you need to rehearse for Stage 7.

### 7.9: If Panels Look Wrong After a Repo Update

Re-apply dashboards, then generate real events (§7.4, not fake data):

```sh
bash stages/stage-7-observability/scripts/install-observability.sh
# Then run Exercises A–C from §7.4 (Kyverno denial, Falco shell, failed logins)
```

Open Grafana at **Last 1 hour**, wait ~30–60s after each exercise, and refresh once. The §7.4 exercises cover expected appearance for each dashboard.

### What You Learned in Stage 7

- **Prometheus** proves countable security events (Kyverno denials, HTTP rates)
- **Loki** proves forensic detail (Falco JSON, auth log lines)
- **Grafana** is the narrative layer, not a second install step after the lab
- You can trace: terminal action, backend signal, panel update
- ServiceMonitors / PodMonitors are what connect Stages 4–6 to charts
- Empty dashboards mean “no events yet” or “wrong time range”, not “broken security”
- Compliance posture is how you answer an auditor in one screen
- Network policies must explicitly allow the `monitoring` namespace to reach app pods on port 8000, otherwise PodMonitor scrapes silently fail with `context deadline exceeded`
- Kubernetes Audit Log dashboard is empty on MicroK8s by design: the API server audit pipeline (audit-policy → file → Promtail → Loki) isn't enabled by default
- Request Rate requires the full chain: app image with `/metrics`, PodMonitor, and network policy: any one missing means the panel stays empty

::: note What you can now put on your CV / say in an interview:

> Built security observability with Prometheus, Loki, and Grafana (dashboards correlating Kyverno violations, Falco alerts, and DORA metrics) and can prove a security event end-to-end from terminal to dashboard.

:::

#### Stage 7 done checklist:

- `make check-7` → 6/6 ✓ (Stage 6.5 Litmus failure is expected: scaled down for memory)
- `http://grafana.local/d/clearledger-kyverno-violations`. Violations stat > 0
- `http://grafana.local/d/clearledger-security-events`. CRITICAL Falco alert visible
- `http://grafana.local/d/clearledger-compliance`. Policy Violations + Runtime Threats + Failed Auth Attempts all > 0
- `http://grafana.local/d/clearledger-service-health`. Failed Login Attempts > 0. Request Rate > 0 only if you did §7.5
- Portfolio screenshots 1–3 saved

`make snapshot STAGE=7 && make snapshots`. Confirm `clearledger.stage7`. **Don't skip this**. Stage 7 is heavy, and disk pressure is common. See [How to Save Your Progress](#how-to-save-your-progress).

After a Mac reboot or sleep, auth/ledger pods may show **Unknown** or **Init:0/1** even though the cluster is up (see [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`) Mac reboot (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md)).

---

## Stage 7.5 — OpenTelemetry (Optional)

**You can skip this whole stage.** Stage 7 (metrics + logs) is enough to finish the homelab and move to Stage 8. Only do Stage 7.5 if you want distributed traces for your portfolio or interviews, and your VM has spare RAM (about 1.5 Gi free).

### What You Are Adding

Stage 7 answers: *did something happen?* (Kyverno blocked a pod, Falco saw a shell, or login failed.)

Traces answer: *what steps ran on this one request, and how long did each take?*

- **Metrics**: how many requests, how many errors
- **Logs**: what the app printed in its log file, (such as errors, warnings, login failures)
- **Traces**: ledger-service called auth-service (12ms), then Postgres (8ms)

In this stage, you send one real transaction, then open that request in Grafana Explore (Tempo). You'll see each step listed with its timing: ledger-service, auth-service, Postgres.

### Before You Start

1. Finish Stage 7: §7.4 exercises done, §7.6 screenshots saved, `SKIP_CHAOS_CHECK=1 make check-7` passes.
2. Check VM memory: `multipass exec clearledger -- free -h` , want about 1.5 Gi free.
3. If you ran Stage 6.5 Litmus, scale it down first (§7.0).

You're done when you see the full request trace in Grafana Explore (Tempo datasource) and `make check-75` passes. Then `make snapshot STAGE=75`.

### Ignore This Warning in App Logs

Since Stage 7 you may see:

```plaintext
WARNING: Transient error StatusCode.UNAVAILABLE encountered while exporting traces
```

That is harmless. The apps are already set up to send trace data, but the receiver isn't installed until §7.5.3. Your apps still work fine, the trace data just gets thrown away. Installing the collector in §7.5.3 makes the warning go away.

### How Tracing is Wired

1. Your apps send trace data when a request runs
2. OTel Collector receives it (port 4317) and passes it along
3. Grafana Tempo stores it
4. Grafana Explore (Tempo selected) is where you look at one request step by step

Apps talk to the collector only, not to Tempo directly. That way you can change where traces are stored later without rebuilding the apps.

### 7.5.1: Check Memory and Load

Tempo needs ~300MB. Confirm headroom before installing:

```sh
multipass exec clearledger -- free -h    # want ~1.5Gi available
multipass exec clearledger -- uptime      # load should be reasonable for your CPU count
SKIP_CHAOS_CHECK=1 bash scripts/health-check.sh 7
```

If Litmus is still running from Stage 6.5, scale it down first (§7.0):

```sh
kubectl get pods -n litmus --field-selector=status.phase=Running
# Expected: no resources found
```

### 7.5.2: Install Grafana Tempo

Tempo is the trace storage backend. Install it into the `monitoring` namespace next to Prometheus and Loki:

```sh
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

helm install tempo grafana/tempo \
--namespace monitoring \
--set tempo.storage.trace.backend=local \
--set tempo.storage.trace.local.path=/var/tempo \
--set persistence.enabled=true \
--set persistence.size=5Gi \
--wait
```

**Verify Tempo is running:**

```sh
kubectl get pods -n monitoring -l app.kubernetes.io/name=tempo
#
# tempo-0   1/1   Running
```

```sh
kubectl exec -n monitoring tempo-0 -- wget -qO- http://localhost:3200/ready
# 
# ready
```

### 7.5.3: Deploy OTel Collector and Wire Grafana

This applies the OTel Collector (receives spans from app pods) and registers Tempo as a Grafana datasource automatically via the sidecar:

```sh
kubectl apply -f stages/stage-7.5-opentelemetry/infra/otel/otel-collector.yaml
kubectl apply -f stages/stage-7.5-opentelemetry/infra/otel/grafana-datasource-tempo.yaml
```

**Verify the collector is running:**

```sh
kubectl get pods -n monitoring -l app=otel-collector
# 
# otel-collector-xxxxx   1/1   Running
```

**Verify the collector started (not trace receipt yet):**

Apps push spans to the collector over OTLP: the collector doesn't scrape pods. At this step you're only confirming that it's listening.

```sh
kubectl logs -n monitoring deploy/otel-collector --tail=15
#
#   Starting GRPC server ... endpoint: 0.0.0.0:4317
#   Starting HTTP server ... endpoint: 0.0.0.0:4318
#   Everything is ready. Begin running and processing data.
# No crash loops or repeated errors.
```

Proof that traces are actually flowing comes later: after you generate traffic in §7.5.6, check collector logs for span export lines from the `debug` exporter, then confirm the trace in Grafana Tempo (§7.5.7).

### 7.5.4: Enable Prometheus Remote Write Receiver

The OTel Collector also forwards OTel metrics to Prometheus via remote write. Prometheus needs to accept them:

```sh
helm upgrade kube-prometheus-stack prometheus-community/kube-prometheus-stack \
--namespace monitoring \
-f stages/stage-7-observability/infra/helm/kube-prometheus-stack-values.yaml \
--wait
```

This applies the `enableRemoteWriteReceiver: true` setting added to the Helm values in Stage 7.5. Wait for Prometheus to restart (about 60 seconds).

### 7.5.5: Verify App Pods Connect to the Collector

The deployments in `clearledger-infra` already have `OTEL_EXPORTER_OTLP_ENDPOINT` set. Once the collector is running, the pods auto-connect.

Confirm that the OTEL warnings are gone:

```sh
kubectl logs -n clearledger deploy/ledger-service -c ledger-service --tail=20 2>/dev/null \
| grep -v "opentelemetry\|otlp\|Transient" | tail -10
#
# only INFO request logs, no WARNING: Transient error
```

If warnings persist, the network policy may not have port 4317 egress. Apply the latest policies:

```sh
kubectl apply -f infra/deferred-by-stage/stage-6-runtime-security/netpol/network-policies.yaml
```

### 7.5.6: Generate a Trace

Now create a transaction and watch it flow through the system:

```sh
# Step 1: register (skip if already registered)
curl -s -X POST http://clearledger.local/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"trace-demo@clearledger.io","password":"TracePass123"}' | python3 -m json.tool

# Step 2: login and grab the token
TOKEN=$(curl -s -X POST http://clearledger.local/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"trace-demo@clearledger.io","password":"TracePass123"}' \
| python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
echo "Token acquired: ${TOKEN:0:20}..."

# Step 3: create a transaction (this is the request you will trace)
curl -s -X POST http://clearledger.local/ledger/transactions \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{"amount": 5000, "direction": "credit"}' | python3 -m json.tool
```

**Verify the collector received spans:**

```sh
kubectl logs -n monitoring deploy/otel-collector --tail=30 \
| grep -iE "Traces|spans|ResourceSpans" || echo "No span lines yet — see §7.5.5 (OTEL env / netpol)"
# Expected after a successful transaction: debug exporter lines mentioning exported traces/spans
```

### 7.5.7: View the Trace in Grafana

Open `http://grafana.local` and go to the left sidebar **Explore** (compass icon).

#### Step 1: Select Tempo and open Search

At the top of the query pane:

1. Datasource dropdown (orange **T** logo) → **Tempo**
2. Query row labeled A (Tempo) → three tabs: Search | TraceQL | Service Graph
3. Click **Search**. This shows dropdown filters. **TraceQL** is a text box only. If you land there with nothing typed you get `0 series returned`.

![screenshot of grafana showing tempo and ledger service](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/b005b7ed-ad35-4c2f-8ca4-7d685717754f.png)

#### Step 2: Filter by service

In the **Search** tab:

- **Service Name** → type or select `ledger-service`
- Leave Span Name, Status, Duration, and Tags empty for now
- Grafana shows the query it will run: `{resource.service.name="ledger-service"}`

Set the time range (top-right clock icon) to **Last 15 minutes** so your §7.5.6 transaction is included.

#### Step 3: Run the query

Grafana Explore has **no “Run query” button**: results appear automatically after selecting a service. If the table stays empty, use the **blue refresh button** top-right of the pane.

#### Step 4: Open the trace waterfall

Below the query editor, find **Table - Traces**. You should see at least one row like:

| Column | Example |
| --- | --- |
| Trace ID | `5730edf3…` (blue link) |
| Start time | when you ran the `curl` |
| Service | `ledger-service` |
| Name | `POST /transactions` |
| Duration | ~200ms (yours may differ) |

![screenshot of grafana showing tempo and ledger service and query result](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ac4aad25-4ca4-4ffc-9fb6-25c30f0214bd.png)

**Click the Trace ID link.** The right panel opens the trace detail view.

![screenshot of grafana showing tempo and ledger service and query results](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/d3c15dc0-e4b3-49e4-93e6-28b49feab6eb.png)

#### What the trace detail view shows

Header: `ledger-service: POST /transactions`

- **Trace ID**: unique ID for this request
- **Duration**: total end-to-end time
- **Services**: `2` (`ledger-service` and `auth-service` for a normal transaction)

Expand spans in the timeline:

```plaintext
ledger-service   POST /transactions          (~total duration)
  ├── auth-service   GET /verify             ← JWT check over HTTP
  ├── ledger-service INSERT / sqlalchemy    ← Postgres write
  └── (optional) redis PUBLISH              ← only if amount ≥ notification threshold
```

![trace transaction flow](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/0b69babc-90c6-4cdc-a0bf-bad012854a36.jpg)

**Reading the trace detail screen:**

![Tempo trace detail: ledger-service transaction with auth-service verify step.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3a72b4a4-2243-403d-9f03-ebc3b22e5337.png)

Each row is one step in the request (Grafana calls it a *span*). The colored bar on the right shows **how long that step took**. That's the *span bar*. A longer bar = more time spent on that step.

Click a row or its bar to open the details panel on the right. You'll see two kinds of metadata:

- **Span attributes**: what happened in *this step*.  

::: tips Examples

HTTP method (`POST`, `GET`), status code (`200`), or SQL text on a database step. In your trace you might see `asgi.event.type: http.request` on the FastAPI receive step.

:::

- **Resource attributes**: *where* the step ran.  

::: tips Examples

`service.name: ledger-service`, `k8s.cluster.name: clearledger`, `deployment.environment: production`.

:::

Quick mental model: span attributes = what the step did. Resource attributes = which service produced it.

**Connecting traces to logs:** once you have a step selected, the Logs tab will take you straight to the matching Loki log lines for that pod at the same moment in time.

**Screenshot this trace detail view**: portfolio proof for Stage 7.5.

#### TraceQL alternative

If you prefer the text box, Switch to the **TraceQL** tab, and paste:

![screenshot showing direction for where traceql button is](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/679d687d-1a2e-474b-8f7e-672f3ab2eb2b.png)

```traceql
{ resource.service.name = "ledger-service" }
```

#### If the table is empty

**If TraceQL says** `0 series returned`: Use the **Search** tab instead, or paste the TraceQL query from above into the TraceQL tab.

**If search tab has no rows:** Widen the time range to **Last 15 minutes**, re-run the transaction curl from §7.5.6, wait a few seconds, and refresh.

**If grafana can't connect to Tempo:** The datasource URL needs port **3200**. Re-apply the datasource and restart Grafana:

```sh
kubectl apply -f stages/stage-7.5-opentelemetry/infra/otel/grafana-datasource-tempo.yaml
kubectl rollout restart deployment/kube-prometheus-stack-grafana -n monitoring
```

**If collector logs show no trace data:** Work through §7.5.5: usually the OTEL environment variables or network policy blocking port 4317.

### 7.5.7b: Understand When a Trace Happens

You ran one curl command in §7.5.6. Grafana shows every place that single request traveled.

Think of it like tracking a package:

1. **You** sent `POST /transactions` to **ledger-service**
2. **ledger-service** asked **auth-service**: "is this user logged in?"
3. **ledger-service** saved the row to the **database**
4. **redis** only runs if the amount is **big** (10,000 or more)

Each of those is a row you see in the Tempo detail screen. You're not looking at four separate requests. It's **one** request with multiple stops.

::: important Why do I see both ledger-service and auth-service?

Because ledger had to call auth before it could save the transaction. Grafana groups those stops into one trip so you can see the full path, not just the first hop.

:::

::: important Why did my demo have no Redis row?

You used `"amount": 5000`. The app only talks to Redis when the amount is 10,000 or higher. So seeing ledger + auth + database but no Redis is correct.

:::

Want to see Redis? Run §7.5.6 again with `"amount": 15000` and search Tempo again.

**Optional: connect it to the code**

Open <VPIcon icon="fas fa-folder-open"/>`app/ledger-service/`<VPIcon icon="fa-brands fa-python"/>`main.py`, find `create_transaction`, and read top to bottom. The Tempo rows follow that function in order: check the user, save to the database, and maybe notify Redis.

**Optional: same request, three tools**

At the time you ran the curl:

- **Tempo** (this stage): which services ran and how long each took
- **Loki** (Stage 7): what the apps wrote in their log files
- **Prometheus** (Stage 7): how many requests happened around that time

Same moment, three different views. You already used Loki and Prometheus in Stage 7.

### 7.5.8: Verify

```sh
make check-75
#
# ▶ Stage 7.5 — OpenTelemetry (Distributed Tracing)
#   ✓ OTel Collector is running (1 replica(s))
#   ✓ Grafana Tempo datasource ConfigMap exists
#   ✓ Tempo is running
#   ✓ auth-service has OTEL_EXPORTER_OTLP_ENDPOINT set
```

**If you see a warning instead:**

```plaintext
⚠ OTel env vars not found on auth-service, redeploy with updated manifests
```

`check-75` looks for `OTEL_EXPORTER_OTLP_ENDPOINT` in the deployment manifest. Older Stage 5 manifests may not list it even though tracing works: the Python apps default to `http://otel-collector.monitoring.svc.cluster.local:4317` when the env var is missing.

You can proceed if collector logs show spans and Tempo shows your trace. To clear the warning, apply only the app deployments (not the whole kustomize tree: Kyverno may block redis/postgres patches):

```sh
kubectl apply -f infra/manifests/auth-service/deployment.yaml
kubectl apply -f infra/manifests/ledger-service/deployment.yaml
kubectl rollout restart deployment/auth-service deployment/ledger-service -n clearledger
make check-75
```

**Save your VM** after `make check-75`. See the block at the end of Stage 7.5 below.

### What You Learned

Stage 7 gave you metrics (how busy?) and logs (what was printed?). Stage 7.5 adds traces (for one slow request, which step took the time?).

In the lab you proved it with one `POST /transactions` curl. In production the idea is the same: a user hits an API, the request crosses multiple services, and you need to see that full path in one place.

#### If someone asks in an interview:

::: details Why traces at all?

Metrics might tell you p99 latency doubled. Logs might show an error on one pod. Traces tell you *which downstream call* in the chain caused the delay, auth, database, cache, or third-party API, without guessing.

:::

::: details How did you implement it?

We instrumented the services with OpenTelemetry, sent telemetry to a collector, and stored traces in Grafana Tempo. Apps talk to the collector, not directly to the backend, so we can change storage later without redeploying every service.

:::

::: details What would you do in an incident?

Find a slow or failing trace ID (from logs, metrics, or an alert), open it in Tempo, walk the call chain service by service, see where time stacked up, then jump to logs for that service at the same timestamp. That's faster than tailing logs on five pods and hoping they line up.

:::

**Short version you can say out loud:**

> "We use the three pillars together: Prometheus for rates and errors, Loki for log detail, and Tempo for request-level debugging across microservices. When latency spikes, I start from a trace, identify the slow hop, often a database or downstream API, and correlate back to logs and metrics for that service."

`make check-75 && make snapshot STAGE=75 && make snapshots`. Confirm `clearledger.stage75`. See [How to Save Your Progress](#how-to-save-your-progress).

---

## Stage 8 — AWS Migration

Your goal here is to run the same ClearLedger app on AWS instead of your laptop VM.

You're not rewriting the application. Stages 0–7 built containers on Kubernetes with GitOps, Kyverno, secrets, and observability. Stage 8 changes where it runs. You keep the same images, the same ArgoCD workflow, and the same security policies. Only the cloud services underneath change (MicroK8s → EKS, Vault → Secrets Manager, and so on).

- **Homelab:** MicroK8s, Postgres in a pod, dev Vault, Docker Hub, `clearledger.local`
- **AWS:** EKS, RDS, Secrets Manager, ECR, ALB hostname

**Am I ready for Stage 8?**

- Homelab complete through Stage 7 (Stage 7.5 optional)
- make check-7 passes (and make check-75 if you did traces)
- AWS account with billing alerts enabled. make aws-up creates billable resources
- Skim §8.2 so you know what make aws-up does (even if you use the quick path)

**Done when** the app is reachable on the AWS ALB, ArgoCD syncing, and you run `make aws-down` when finished to stop charges.

### What `make aws-up` Gives You

This is a **demo stack**: production-*shaped*, but not production-*ready*. It has HTTP only (no TLS cert).

Stage 7 observability is installed automatically. CI still runs Gitleaks, Semgrep, Checkov, Trivy, and Cosign.

For real production, you would add HTTPS (see [<VPIcon icon="iconfont icon-yaml"/>`ingress-aws-https.example.yaml` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/stages/stage-8-aws-migration/manifests/ingress-aws-https.example.yaml)), staging before promote, and alert routing. Those are documented but not applied by the spinup script.

**GitOps rule:** after bootstrap, don't `kubectl apply` app Deployments by hand. ArgoCD owns the cluster (Stage 2). Push manifest changes to Git and let ArgoCD sync.

### Secrets on AWS

On the homelab, Vault wrote secret files into the pod. On AWS, secrets live in **AWS Secrets Manager** (created by Terraform). Your app still needs them as environment variables like `DATABASE_URL`.

**ESO (default in this lab)**: the simple mental model:

1. Terraform stores the real password in AWS Secrets Manager (for example `clearledger/auth-service`)
2. External Secrets Operator (ESO) watches that AWS secret
3. ESO copies it into a normal Kubernetes Secret inside the cluster (for example `auth-service-secret`)
4. Your deployment reads `DATABASE_URL` from that Kubernetes Secret, same as Stage 0, but the values come from AWS instead of a YAML file in Git

You never put passwords in Git. ESO keeps the Kubernetes Secret in sync with Secrets Manager.

**CSI (optional, §8.5 exercise)**: same AWS secrets but different delivery: mounted as **files** at <VPIcon icon="fas fa-folder-open"/>`/mnt/secrets/*` instead of env vars. This is closer to how Vault worked on the homelab.

**IRSA**: how ESO is allowed to read Secrets Manager without storing AWS access keys in the cluster. AWS trusts a Kubernetes service account instead.

IRSA lets AWS trust a Kubernetes ServiceAccount, no `AWS_ACCESS_KEY_ID` in Git or in the cluster.

Details here: [<VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/docs/`<VPIcon icon="fa-brands fa-markdown"/>`secrets-patterns.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/tree/main/stages/stage-8-aws-migration/docs).

### 8.1: Two Ways Through Stage 8

**Quick path (~45–60 min):** edit <VPIcon icon="fas fa-folder-open"/>`terraform/`<VPIcon icon="iconfont icon-terraform"/>`secrets.tf` (replace `CHANGE_ME_BEFORE_APPLY`), then:

```sh
make aws-up    # runs stages/stage-8-aws-migration/scripts/aws-spinup.sh
make aws-down  # destroys billable resources when you are done
```

Read §8.2 afterward so you know what ran.

**Manual path (§8.3):** run Terraform, ECR push, ArgoCD, Kyverno, ESO, and deploy yourself. Use this when learning, interviewing, or debugging a failed spinup.

Don't skip §8.2–§8.5 if you only ran `make aws-up`. Otherwise you won't know what Terraform, ESO, or ArgoCD each did.

Before your first Stage 8 push, read [§8: CI routing and `CLEARLEDGER_CI_TARGET`](#ci-routing-stages-17-vs-stage-8) and set `CLEARLEDGER_CI_TARGET=aws` only after Terraform succeeds, not while you are still on Stages 1–7.

### 8.2: What `make aws-up` Runs

The spinup script runs 15 steps in order:

**Setup (1–6)**: Check tools and AWS login; `terraform apply` (VPC, EKS, RDS, ECR, Secrets Manager, GuardDuty, CloudTrail, IAM), confirm security services, build and push images to ECR, patch <VPIcon icon="fas fa-folder-open"/>`manifests/`<VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` with your registry and git SHA, and configure `kubectl` for EKS.

**Platform (7–12)**: install ArgoCD; Kyverno + cluster policies, Falco, External Secrets Operator + IRSA service accounts, CSI secrets driver, and Stage 7 observability stack.

**Deploy (13–15)**: ArgoCD app `clearledger-aws` syncs <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/manifests/`, wait for ALB hostname, and print URL and tear-down reminder.

After the script finishes, open the printed `http://<alb-dns>/` in your browser (ClearLedger login UI), or follow [§8.3. When to open what](#when-to-open-what-checkpoint-map) for Argo CD and Grafana port-forwards.

Default app deploy uses ESO for secrets. CSI is also installed so you can try file mounts in §8.5 without extra setup.

**Terraform layout**: there's no <VPIcon icon="iconfont icon-terraform"/>`terraform.tf` file. The `terraform {}` block (version, providers, optional S3 backend) is at the top of <VPIcon icon="iconfont icon-terraform"/>`main.tf`. Resources are split by topic: <VPIcon icon="iconfont icon-terraform"/>`vpc.tf`, `eks.tf`, <VPIcon icon="iconfont icon-terraform"/>`rds.tf`, <VPIcon icon="iconfont icon-terraform"/>`ecr.tf`, <VPIcon icon="iconfont icon-terraform"/>`alb.tf`, <VPIcon icon="iconfont icon-terraform"/>`iam.tf`, <VPIcon icon="iconfont icon-terraform"/>`secrets.tf`, <VPIcon icon="iconfont icon-terraform"/>`security.tf`.

Run all commands from <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/terraform/`.

### 8.3: Manual Walkthrough

Go to **Before you start** in this section and run the manual steps from **Step A** yourself at least once instead of `make aws-up`. Paths are from the repo root.

Commands install things, while UIs prove they work. Homelab Stages 2 and 7 already taught you to open Argo CD and Grafana in a browser. Stage 8 is the same idea.

But on AWS there's no `clearledger.local` or `grafana.local` in <VPIcon icon="fas fa-folder-open"/>`/etc/hosts`. You use port-forward for control-plane UIs and the public ALB hostname for the app.

#### When to open what (checkpoint map)

`make aws-up` runs fifteen steps. You don't need every UI open at once, just know when to look and what success looks like as the script moves along.

First, Terraform builds the AWS foundation. When step 2 finishes, open the **AWS Console** and confirm the cluster, registry, and database exist before any pods run: EKS `clearledger` is **Active**, ECR has four repos including `frontend` (empty is fine for now), and RDS `clearledger-postgres` is **Available**.

See [AWS Console (after step 2)](#aws-console-after-step-2) for the walkthrough.

Next come container images. After step 4, or after CI — AWS (ECR + OIDC) goes green in GitHub Actions, check ECR: each repo should list your git SHA tag. That's what ArgoCD will pull when the app deploys.

Around step 7 the script installs Argo CD. Port-forward to the UI and confirm the login page loads. You won't see the app yet. You're only checking that GitOps is reachable. Details: [Argo CD UI](#step-13-watch-argocd-sync-ui-cli).

Step 12 adds observability. Port-forward to Grafana, log in, and confirm the six ClearLedger dashboards are listed. Panels can stay empty until you generate events. This is the same as Stage 7 on the homelab.

Step 13 applies the `clearledger-aws` app. Go back to Argo CD → **Applications** → `clearledger-aws`. You want Synced, Healthy, and running pods for auth, ledger, and notification.

Step 14 exposes the app on a public URL. Open `http://<alb-dns>/` in your browser: you should see the same ClearLedger login UI as homelab `clearledger.local`, served from the ALB with no <VPIcon icon="fas fa-folder-open"/>`/etc/hosts` entry.  
Use `/auth/health` and the other health URLs when you want a quick API check from the terminal.

See [ALB — first time the app is public](#step-15-open-the-app-in-your-browser).

If you want extra confirmation, the optional check is **EC2 → Load Balancers →** `clearledger`: status **Active**, with healthy targets for frontend and the API services.

On AWS the app is four services behind one ALB: the frontend at `/` (login, dashboard, transactions) and the three APIs at `/auth`, `/ledger`, and `/notifications`.

Your portfolio screenshot for Stage 8 is the ALB URL showing the UI, like `http://clearledger-xxxxxxxxxx.eu-west-1.elb.amazonaws.com` with the ClearLedger login or dashboard visible.

![screenshot of clearledger ui with ALB Url](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/411a7ae0-8e7e-4a19-9267-e207f78ece93.png)

For Argo CD and Grafana, keep a dedicated terminal running `kubectl port-forward` while the browser tab is open. <kbd>Ctrl</kbd>+<kbd>C</kbd> closes the tunnel.

#### Before you start

**Step A: set real passwords in** <VPIcon icon="iconfont icon-terraform"/>`secrets.tf`

Open <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/terraform/`<VPIcon icon="iconfont icon-terraform"/>`secrets.tf` and search for the literal text `CHANGE_ME_BEFORE_APPLY`. It appears four times in the file (Postgres password, JWT secret, and two database URLs). Replace every occurrence:

- **Postgres password**: pick a strong password (same value in all three places that reference it)
- **JWT secret**: run `openssl rand -base64 64` and paste the output

`make aws-up` will **refuse to run** if any `CHANGE_ME_BEFORE_APPLY` text is still in that file.

**Step B: terminal checks**

```sh
aws sts get-caller-identity
terraform --version

# REQUIRED before first terraform apply; GitHub Actions OIDC (ci-aws.yaml) reads this at apply time:
cp stages/stage-8-aws-migration/terraform/terraform.tfvars.example \
   stages/stage-8-aws-migration/terraform/terraform.tfvars
# Edit terraform.tfvars: github_owner = "YOUR_GITHUB_USERNAME"   # your GitHub user or org, not a placeholder

terraform -chdir=stages/stage-8-aws-migration/terraform validate
# Fails with "Set github_owner in terraform.tfvars" until you replace YOUR_GITHUB_USERNAME
```

**Don't run `terraform apply` until `github_owner` is set.** If you apply with the placeholder, AWS creates IAM role `clearledger-github-actions-ecr` with trust `repo:YOUR_GITHUB_USERNAME/...`. CI then fails at **Publish images → ECR** with `Not authorized to perform sts:AssumeRoleWithWebIdentity`.

Fix: edit `terraform.tfvars` → `terraform apply` again → verify with `aws iam get-role` below then **Re-run failed jobs** on the failed Actions run (not the full pipeline).

#### Steps 1–2: Terraform

```sh
cd stages/stage-8-aws-migration/terraform
terraform init -upgrade
terraform apply

# Save outputs:
terraform output -raw ecr_registry_url
terraform output -raw github_actions_ecr_role_arn
terraform output -raw eso_role_arn
terraform output -raw auth_service_irsa_role_arn
terraform output -raw kubeconfig_command
cd ../../..
```

#### AWS Console after step 2. Confirm Terraform created resources before you touch the cluster:

1. **EKS** → Clusters → `clearledger` → **Status: Active**, **3 nodes**
2. **ECR** → Repositories → `clearledger/auth-service`, `ledger-service`, `notification-service`, `frontend` (0 images until step 4 or CI)
3. **RDS** → Databases → `clearledger-postgres` → **Available**

**Verify GitHub can push to ECR (only if you plan to use AWS CI later)**

GitHub Actions needs permission to push images to your AWS account. Terraform creates an IAM role for that, but only if you set your real GitHub username in `terraform.tfvars` before `terraform apply`.

Check it worked:

```sh
aws iam get-role --role-name clearledger-github-actions-ecr \
--query 'Role.AssumeRolePolicyDocument.Statement[0].Condition.StringEquals."token.actions.githubusercontent.com:sub"' \
--output text
```

**Good:** `repo:your-real-username/clearledger:environment:production`

**Bad:** `repo:YOUR_GITHUB_USERNAME/clearledger:...` you forgot to edit `terraform.tfvars`.

Fix the file, run `terraform apply` again, then in GitHub go to Actions and then the failed CI, AWS (ECR + OIDC) run → click Re-run failed jobs. That retries only the push step. You don't need to rebuild and rescan everything.

Skip this whole block if you are only using `make aws-up` for now and not enabling AWS CI yet.

**When do ECR repos appear?**

During `terraform apply` **(step 2)**, not when you `docker push`. Terraform creates **empty** image repositories: `clearledger/auth-service`, `ledger-service`, `notification-service`, and `frontend`, so seeing 0 images right after apply is normal.

Images land later in step 4 (manual `docker push`) or when GitHub Actions CI succeeds.

**Set your AWS CLI region to** `eu-west-1`

Everything in this lab lives in eu-west-1 (Ireland). If your CLI defaults to `us-east-1`, commands will say resources are missing even though they exist:

```sh
aws configure set region eu-west-1
aws configure get region   # expect: eu-west-1
```

#### Steps 3–4: Security services + ECR images

```sh :collapsed-lines
AWS_REGION=eu-west-1   # or rely on aws configure set region above

# Step 3: verify security services (must pass --region eu-west-1)
aws guardduty list-detectors --region "${AWS_REGION}"
# Expect: DetectorIds: ["<id>"]  — empty [] means wrong region, not "not created"

aws cloudtrail get-trail-status --name clearledger-trail --region "${AWS_REGION}"
# Expect: IsLogging: true
# Error "Unknown trail ... us-east-1" → you forgot --region eu-west-1

# Step 4: build and push images to the ECR repos Terraform already created
ECR_REGISTRY=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw ecr_registry_url)
AUTH_ECR=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw auth_service_ecr_url)
LEDGER_ECR=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw ledger_service_ecr_url)
NOTIFY_ECR=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw notification_service_ecr_url)
TAG=$(git rev-parse --short HEAD)

aws ecr get-login-password --region "${AWS_REGION}" \
  | docker login --username AWS --password-stdin "${ECR_REGISTRY}"

docker build -t "${AUTH_ECR}:${TAG}" app/auth-service && docker push "${AUTH_ECR}:${TAG}"
docker build -t "${LEDGER_ECR}:${TAG}" app/ledger-service && docker push "${LEDGER_ECR}:${TAG}"
docker build -t "${NOTIFY_ECR}:${TAG}" app/notification-service && docker push "${NOTIFY_ECR}:${TAG}"

# Confirm images landed (optional)
aws ecr describe-images --repository-name clearledger/auth-service --region "${AWS_REGION}" \
  --query 'imageDetails[*].imageTags' --output table
```

**ECR console (after step 4 or green CI)**: open each repository and go. tothe Images tab. You should see tags matching your git commit SHA. If repos are empty, ArgoCD will show `ImagePullBackOff` later.

**GitHub Actions (if using CI instead of manual push)**: repo → Actions → workflow CI. AWS (ECR + OIDC).

If all jobs are green, publish the images. ECR succeeded. This is the supply-chain proof before deploy.

#### Step 5: GitOps source of truth

Patch placeholders in <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` (same `sed` as <VPIcon icon="iconfont icon-shell"/>`aws-spinup.sh` step 5):

```sh
AWS_REGION=eu-west-1
ECR_REGISTRY=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw ecr_registry_url)
TAG=$(git rev-parse --short HEAD)
KUST=stages/stage-8-aws-migration/manifests/kustomization.yaml

sed -i.bak \
-e "s|REPLACE_ECR_REGISTRY|${ECR_REGISTRY}|g" \
-e "s|REPLACE_IMAGE_TAG|${TAG}|g" \
"${KUST}"
rm -f "${KUST}.bak"

# Region in ESO + CSI manifests (only if not eu-west-1)
if [[ "${AWS_REGION}" != "eu-west-1" ]]; then
sed -i.bak "s|region: eu-west-1|region: ${AWS_REGION}|g" \
stages/stage-8-aws-migration/manifests/external-secrets.yaml \
stages/stage-8-aws-migration/manifests/csi/auth-service-spc.yaml \
stages/stage-8-aws-migration/manifests/csi/ledger-service-spc.yaml
rm -f stages/stage-8-aws-migration/manifests/external-secrets.yaml.bak \
stages/stage-8-aws-migration/manifests/csi/*.bak 2>/dev/null || true
fi

# Verify before commit
grep -E 'newName:|newTag:' "${KUST}"
# Expect: YOUR_AWS_ACCOUNT.dkr.ecr.eu-west-1.amazonaws.com/clearledger/... and your git SHA

git add stages/stage-8-aws-migration/manifests/kustomization.yaml
git commit -m "stage8: ECR images ${TAG}"
git push
```

Also fix the ArgoCD Application repo URL once (replace with your GitHub username):

```sh
# Example: YOUR_GITHUB_USERNAME/clearledger — check: git remote get-url origin
sed -i.bak 's|YOUR_GITHUB_USERNAME|YOUR_ACTUAL_GITHUB_USER|g' \
stages/stage-8-aws-migration/argocd/clearledger-aws-app.yaml
rm -f stages/stage-8-aws-migration/argocd/clearledger-aws-app.yaml.bak
```

#### Step 6: Cluster access + Terraform outputs

Run from the repo root. Set the CLI region first (EKS and IAM outputs are regional), then kubeconfig, then export IRSA role ARNs: steps 9–10 need them.

```sh
aws configure set region eu-west-1

eval "$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw kubeconfig_command)"
kubectl get nodes

export AWS_REGION=eu-west-1
export ESO_ROLE_ARN=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw eso_role_arn)
export FALCO_ROLE_ARN=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw falco_role_arn)
export REPLACE_AUTH_IRSA_ROLE_ARN=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw auth_service_irsa_role_arn)
export REPLACE_LEDGER_IRSA_ROLE_ARN=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw ledger_service_irsa_role_arn)
export REPLACE_NOTIFICATION_IRSA_ROLE_ARN=$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw notification_service_irsa_role_arn)

# Sanity check (all should print ARNs, not empty)
echo "ESO:      ${ESO_ROLE_ARN}"
echo "Falco:    ${FALCO_ROLE_ARN}"
echo "Auth IRSA: ${REPLACE_AUTH_IRSA_ROLE_ARN}"
```

#### Steps 7–12: Platform stack on the cluster

You finished steps 1–6 (AWS exists, images in ECR, `kubectl` works). Now for steps 7-12 you'll install the platform stack, the same components as <VPIcon icon="iconfont icon-shell"/>`aws-spinup.sh`, but you run the commands from the sections below, not the script.

For each step, run the Install code block, then run the Verify block right under it. Don't move to the next step until you see Running pods (or a ClusterPolicy list). “Command finished with no output” isn't enough.

| Step | Namespace | What you are installing | Rough pod count |
| --- | --- | --- | --- |
| 7 | `argocd` | GitOps controller | ~7 pods |
| 8 | `kyverno` | Admission policies | ~4 pods + ClusterPolicies |
| 9 | `falco` | Runtime detection | 1 DaemonSet pod **per node** (3 on this cluster) |
| 10 | `external-secrets` + `clearledger` | ESO + IRSA ServiceAccounts | ~3 ESO pods + 3 ServiceAccounts |
| 11 | `kube-system` + `clearledger` | CSI driver + AWS provider | 3 driver + 3 provider (one per node) |
| 12 | `monitoring` | Prometheus, Grafana, Loki | ~10+ pods |

Steps 13–15 (deploy app, wait for ALB, verify UI) come after step 12 below.

#### Step 7: ArgoCD

```sh
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd --server-side --force-conflicts \
-f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl rollout status deployment/argocd-server -n argocd --timeout=180s
```

**Verify what got created:**

```sh
kubectl get pods -n argocd
kubectl get svc -n argocd
kubectl get deploy -n argocd
```

::: note Expected

`argocd-server`, `argocd-repo-server`, `argocd-application-controller`, and so on: most pods **Running** **1/1** or **2/2**. `argocd-server` Service exposes port 443. **UI (optional now, required after step 13):** new terminal, leave running. Use any free local port (`8081` if `8080` is in use):

```sh
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Or if 8080 is taken:
# kubectl port-forward svc/argocd-server -n argocd 8081:443
# https://localhost:8080 (or 8081)  user: admin
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath='{.data.password}' | base64 -d; echo
```

Applications list is empty until step 13. That's normal.

:::

#### Step 8: Kyverno + policies

`cosign.pub` / <VPIcon icon="fas fa-folder-open"/>`infra/cosign.pub` are gitignored (private key must never commit; public key is learner-specific).  
The repo ships example keys in <VPIcon icon="iconfont icon-yaml"/>`require-signed-images.yaml` / <VPIcon icon="iconfont icon-yaml"/>`require-signed-images-ecr.yaml`.  
If you regenerated keys in Stage 3, sync your local public key into policies before apply:

```sh
# infra/cosign.pub exists locally but is gitignored — safe to copy into committed policy YAMLs
bash scripts/embed-cosign-pub-in-policies.sh
diff infra/cosign.pub <(grep -A3 'BEGIN PUBLIC KEY' infra/policies/require-signed-images-ecr.yaml | grep -v publicKeys)
```

```sh
helm repo add kyverno https://kyverno.github.io/kyverno/ --force-update
helm upgrade --install kyverno kyverno/kyverno \
--namespace kyverno --create-namespace \
-f stages/stage-4-admission-control/infra/kyverno/values.yaml \
--set admissionController.replicas=1 \
--wait --timeout=180s
kubectl apply -f infra/policies/
```

**Verify:**

```sh
kubectl get pods -n kyverno
kubectl get clusterpolicy
kubectl get clusterpolicy require-signed-images-ecr -o jsonpath='{.spec.rules[0].verifyImages[0].attestors[0].entries[0].keys.publicKeys}' | head -3
```

::: note Expected

admission-controller, background-controller, cleanup-controller, reports-controller pods Running.

`kubectl get clusterpolicy` lists 6+ policies including `require-signed-images-ecr`, `disallow-root-containers`, and so on. The `publicKeys` output must show `-----BEGIN PUBLIC KEY-----`, not `PASTE_YOUR_COSIGN_PUBLIC_KEY_HERE` (Kyverno treats a placeholder as a file path and blocks all deploys).

`require-signed-images-ecr` defaults to Audit until CI Cosign-signs ECR images (`COSIGN_PRIVATE_KEY` + `COSIGN_PASSWORD` in GitHub). Unsigned images still deploy. Signed-image enforcement is optional later.

If `verify-slsa-provenance` fails to apply (Audit + `mutateDigest`), set `mutateDigest: false` in that file, or skip it. It's optional for Stage 8.

:::

#### Step 9: Falco

```sh
helm repo add falcosecurity https://falcosecurity.github.io/charts --force-update
helm upgrade --install falco falcosecurity/falco \
--namespace falco --create-namespace \
-f stages/stage-6-runtime-security/infra/falco/helm-values.yaml \
--set driver.kind=modern_ebpf \
--set "serviceAccount.annotations.eks.amazonaws.com/role-arn=${FALCO_ROLE_ARN}" \
--wait --timeout=300s
```

**Verify:**

```sh
kubectl get pods -n falco -o wide
kubectl get daemonset -n falco
kubectl get sa falco -n falco -o jsonpath='{.metadata.annotations.eks.amazonaws.com/role-arn}'; echo
```

::: note Expected

Falco DaemonSet with DESIRED = number of nodes (3). Each pod **Running**. ServiceAccount annotation shows your `FALCO_ROLE_ARN`.

:::

#### Step 10: External Secrets Operator + IRSA ServiceAccounts

```sh
helm repo add external-secrets https://charts.external-secrets.io --force-update
helm upgrade --install external-secrets external-secrets/external-secrets \
--namespace external-secrets --create-namespace \
--set "serviceAccount.annotations.eks.amazonaws.com/role-arn=${ESO_ROLE_ARN}" \
--wait --timeout=180s
kubectl apply -f stages/stage-8-aws-migration/manifests/resources/namespace.yaml
envsubst < stages/stage-8-aws-migration/manifests/clearledger-serviceaccounts.yaml | kubectl apply -f -
```

**Verify:**

```sh
kubectl get pods -n external-secrets
kubectl get sa -n external-secrets external-secrets -o jsonpath='{.metadata.annotations.eks.amazonaws.com/role-arn}'; echo
kubectl get sa -n clearledger
```

::: note Expected

`external-secrets` deployment **Running** (often 3 containers / 1 pod). Three ServiceAccounts in `clearledger`: `auth-service`, `ledger-service`, `notification-service`: each with an `eks.amazonaws.com/role-arn` annotation. No app pods yet (ArgoCD deploys those in step 13).

:::

**Step 11: CSI driver + SecretProviderClasses**

```sh
bash stages/stage-8-aws-migration/scripts/install-csi-secrets.sh
```

**Verify:**

```sh
kubectl get pods -n kube-system | grep -E 'secrets-store|provider-aws'
kubectl get secretproviderclass -n clearledger
helm list -n kube-system | grep -E 'csi-secrets|secrets-provider'
```

::: note Expected

CSI driver pods **3/3 Running** (one per node). AWS provider pods **1/1 Running** per node. Two `SecretProviderClass` objects in `clearledger`. Helm shows `csi-secrets-store` and/or `secrets-provider-aws` **deployed**.

If Helm reports `meta.helm.sh/release-name` conflicts, re-run the script. It installs the AWS provider without duplicating the driver chart.

:::

#### Step 12: Observability

```sh
bash stages/stage-7-observability/scripts/install-observability.sh
```

**Verify:**

```sh
kubectl get pods -n monitoring
kubectl get svc -n monitoring | grep -E 'grafana|prometheus|loki'
kubectl get configmap -n monitoring -l grafana_dashboard=1 --no-headers | wc -l
```

::: note Expected

Grafana **3/3 Running**, Prometheus and Loki pods **Running**. ConfigMap count for dashboards is **6** (ClearLedger dashboards). Script prints `http://grafana.local`: on EKS use port-forward instead:

```sh
# New terminal — keep running
kubectl port-forward -n monitoring svc/kube-prometheus-stack-grafana 3000:80
# http://localhost:3000  admin / admin123
# http://localhost:3000/dashboards?tag=clearledger
```

Panels may show **No data** until you trigger events (§7.4 exercises work on this cluster too).

:::

**Platform stack summary**: quick sanity check before step 13:

```sh
for ns in argocd kyverno falco external-secrets monitoring clearledger; do
  echo "=== ${ns} ==="
  kubectl get pods -n "${ns}" --no-headers 2>/dev/null | awk '{print $3}' | sort | uniq -c || echo "(no pods yet)"
done
kubectl get clusterpolicy --no-headers | wc -l | xargs echo "ClusterPolicies:"
kubectl get secretproviderclass -n clearledger --no-headers | wc -l | xargs echo "SecretProviderClasses:"
```

::: note Expected

Every namespace shows only `Running` (or `Completed` for jobs). `clearledger` may be empty until ArgoCD syncs. ClusterPolicies ≥ 6. SecretProviderClasses = 2. **EKS API timeout on namespace create?** You may see `Unexpected error when reading response body` / `context deadline exceeded` and still get `namespace/argocd created`. That's a **transient client timeout** talking to the EKS API (first request, slow network, or control plane catching up), not a failed create. Confirm with `kubectl get namespace argocd` and continue. If commands keep timing out, retry once or run `kubectl cluster-info` to verify connectivity.

:::

#### Steps 13–14: Deploy via ArgoCD + see the ALB

The app YAMLs under <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/manifests/` aren't applied by hand. Step 13 tells Argo CD to sync Git. Argo CD then creates Deployments, Services, Ingress, and the rest.

**Repo access first**

If your GitHub repo is private, add a PAT in Argo CD → Settings → Repositories. If you made the repo public, refresh the app, `ComparisonError: authentication required` should clear.

**If sync still fails**, check the usual causes:

- `external-secrets.io/v1beta1` **not found**, your cluster has a newer ESO API. Push `external-secrets.yaml` with `apiVersion: external-secrets.io/v1`.
- **Kyverno complains about** `PASTE_YOUR_COSIGN_PUBLIC_KEY_HERE` , run `bash scripts/embed-cosign-pub-in-policies.sh`, then `kubectl apply -f infra/policies/`.
- **`SecretSyncedError` on auth, `database_url` or `jwt_secret` not found** — the AWS secret `clearledger/auth-service` must contain both keys (Terraform writes them in `secrets.tf`). Re-run `terraform apply` after fixing `CHANGE_ME_BEFORE_APPLY` values, or check the secret in the AWS console.
- **Pods stuck `Pending` or “too many pods”** the lab nodes are small. Scale the node group in Terraform or lower replica counts in the manifests.

Register the app:

```sh
kubectl apply -f stages/stage-8-aws-migration/argocd/clearledger-aws-app.yaml
```

Watch Argo CD until `clearledger-aws` is **Synced** and **Healthy**. That's when app pods appear in `clearledger`.

#### Step 13: Watch ArgoCD sync (UI + CLI)

Open the Argo CD browser tab you kept open (port-forward from step 7).

```plaintext
https://localhost:8080        ← or 8081 if 8080 was busy
```

Click `clearledger-aws`. Wait for **Healthy + Synced** (2–5 minutes on first deploy). You can watch the same info from the terminal without touching the browser:

```sh
kubectl get application clearledger-aws -n argocd -w
# Ctrl-C when HEALTH STATUS shows Healthy
```

While that's settling, watch pods start up in a second terminal:

```sh
kubectl get pods -n clearledger -w
# All pods should reach 1/1 Running within 2 minutes
# Ctrl-C when everything is Running
```

#### Step 14: Get your public app URL (ALB)

AWS takes 2–5 minutes after ArgoCD syncs to provision the load balancer.  
Run this and wait until the ADDRESS column fills in:

```sh
kubectl get ingress clearledger-ingress -n clearledger -w
# ADDRESS is empty at first, then shows something like:
# clearledger-xxxxxxxxxx.eu-west-1.elb.amazonaws.com
# Ctrl-C once the hostname appears
```

Export the URL for the steps below:

```sh
export ALB_DNS=$(kubectl get ingress clearledger-ingress -n clearledger \
-o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo "Your app is live at: http://${ALB_DNS}"
```

**Still empty after 10 minutes?** See [troubleshooting.md (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) for ALB/ingress recovery steps.

#### Step 15: Open the app in your browser

Paste the ALB root URL into your browser. No DNS entry, port-forward, or VPN:

```plaintext
http://clearledger-xxxxxxxxxx.eu-west-1.elb.amazonaws.com/
```

You should see the ClearLedger login screen (same SPA as homelab `clearledger.local`). Register or log in, submit a transaction, and confirm the dashboard loads. That's your Stage 8 portfolio screenshot.

**Quick API health checks** (terminal or browser):

```sh
curl -fsS "http://${ALB_DNS}/auth/health" && echo
curl -fsS "http://${ALB_DNS}/ledger/health" && echo
curl -fsS "http://${ALB_DNS}/notifications/health" && echo
```

Each should return JSON like `{"status":"ok","service":"auth-service"}`.

#### Step 16: Verify in the AWS Console (optional but recommended)

This is what the deployed stack looks like from AWS side:

| Console location | What to look for |
| --- | --- |
| **EC2 → Load Balancers** | A load balancer named `clearledger-…` with state **Active** |
| **EC2 → Target Groups** | Two or three target groups, all targets showing **healthy** |
| **ECR → Repositories** | `clearledger/auth-service`, `clearledger/ledger-service`, `clearledger/notification-service`, `clearledger/frontend` — each with a recently pushed image tag |
| **EKS → Clusters → clearledger → Workloads** | Your pods shown as Running in the `clearledger` namespace |
| **Secrets Manager** | `clearledger/auth-service`, `clearledger/ledger-service`, `clearledger/postgres` — all present |

**502/503 from the ALB?** The load balancer is up but the pods aren't healthy yet, or the secrets haven't synced. Check: `kubectl get pods -n clearledger` (all `1/1 Running`?) and `kubectl get externalsecret -n clearledger` (both `SecretSynced True`?).

::: note ✋ Hands-on checkpoint: app is publicly reachable

```sh
# All three must print {"status":"ok",...}
curl -fsS "http://${ALB_DNS}/auth/health"         && echo
curl -fsS "http://${ALB_DNS}/ledger/health"        && echo
curl -fsS "http://${ALB_DNS}/notifications/health" && echo

# All pods Running
kubectl get pods -n clearledger

# Nothing printed here = all pods Running (non-Running pods would show)
kubectl get pods -n clearledger --field-selector=status.phase!=Running
```

`ImagePullBackOff` in the pod list means ECR images aren't there yet. Check GitHub Actions and re-run the workflow. A `502` from the health URL means the pod isn't ready yet. Wait 30 seconds and retry.

:::

### 8.4: Verify ESO (Default Secret Path)

After Argo CD syncs, confirm External Secrets Operator copied values from AWS Secrets Manager into normal Kubernetes Secrets:

```sh
kubectl get externalsecret,secret -n clearledger
kubectl describe externalsecret auth-service-secret -n clearledger | grep -A6 "Conditions:"
kubectl get pods -n clearledger -l app=auth-service
kubectl exec -n clearledger deploy/auth-service -c auth-service -- env | grep DATABASE_URL
```

#### Command 1: ExternalSecrets + Secrets

You should see two ExternalSecrets and two matching Secrets (auth has 2 keys, ledger has 1):

```plaintext
NAME                                                     STORE                 REFRESH INTERVAL   STATUS         READY
externalsecret.external-secrets.io/auth-service-secret   aws-secrets-manager   1h                 SecretSynced   True
externalsecret.external-secrets.io/ledger-service-secret aws-secrets-manager   1h                 SecretSynced   True

NAME                         TYPE     DATA   AGE
secret/auth-service-secret   Opaque   2      3m
secret/ledger-service-secret Opaque   1      3m
```

`STATUS` must be **SecretSynced** and **READY** must be **True**. If you see `SecretSyncedError`, stop here and fix IRSA before §8.5.

#### Command 2: describe auth ExternalSecret

Look for `Reason: SecretSynced` and `Status: True`:

```plaintext
  Conditions:
    Last Transition Time:   2026-07-10T22:15:00Z
    Message:                Secret was synced
    Reason:                 SecretSynced
    Status:                 True
    Type:                   Ready
```

#### Command 3: auth pods running

```plaintext
NAME                            READY   STATUS    RESTARTS   AGE
auth-service-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
auth-service-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
```

Both replicas **1/1 Running**. If pods are `CrashLoopBackOff` or `CreateContainerConfigError`, the K8s Secret may be missing or empty.

#### Command 4: DATABASE_URL is an env var (ESO path), not a file path

```plaintext
DATABASE_URL=postgresql://clearledger:*****@clearledger-postgres.xxxxx.eu-west-1.rds.amazonaws.com:5432/clearledger
```

Good: a `postgresql://...` connection string (password shown as `*****` or your real password).

Bad for this section: <VPIcon icon="fas fa-folder-open"/>`/mnt/secrets/database_url` that means CSI file mounts (§8.5), not the default ESO env-var path.

You can also spot-check the secret exists without printing values:

```sh
kubectl get secret auth-service-secret -n clearledger -o jsonpath='{.data}' | grep -o 'database_url\|jwt_secret'
# Expect: database_url and jwt_secret (two keys)
```

If `SecretSynced=False`, check ESO logs and IRSA:

```sh
kubectl logs -n external-secrets deploy/external-secrets -c external-secrets | tail -30
kubectl get sa auth-service -n clearledger -o yaml | grep role-arn
```

::: note ✋ Hands-on checkpoint. External Secrets actually synced from AWS

```sh
kubectl get externalsecret -n clearledger
kubectl get secret -n clearledger
```

Expected: `auth-service-secret` and `ledger-service-secret` each show `SecretSynced` / Ready `True`. The matching Kubernetes Secrets exist in `clearledger`. A `SecretSyncedError` means IRSA/IAM can't reach Secrets Manager: fix the role binding before §8.5. If you skip this, §8.5 (CSI driver) builds on working secret access, and a silent IAM failure here surfaces as an unrelated-looking pod error two sections later.

:::

### 8.5: Hands-on, CSI Driver (File Mounts)

The default pods already use ESO: secrets arrive as environment variables from a Kubernetes Secret object. This exercise switches `auth-service` to the CSI path instead: secrets are mounted as plain files under <VPIcon icon="fas fa-folder-open"/>`/mnt/secrets/`, and the app reads them from disk. It's the same code path the homelab uses with Vault (`DATABASE_URL_FILE` / `JWT_SECRET_FILE`).

CSI was already installed at spinup step 11, so there's nothing extra to install.

#### Step 1: Confirm CSI is running

```sh
kubectl get pods -n kube-system -l app=secrets-store-csi-driver
kubectl get secretproviderclass -n clearledger
```

You should see one CSI driver pod per node, and two `SecretProviderClass` objects: one for auth-service and one for ledger-service.

#### Step 2: swap the deployment in Git

Open <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/manifests/kustomization.yaml` and change one line:

```yaml
# Before
  - deployments/auth-service.yaml

# After
  - deployments/auth-service-csi.yaml
```

Commit and push, then sync:

```sh
argocd app sync clearledger-aws
kubectl rollout status deployment/auth-service -n clearledger
```

ArgoCD will roll out a new auth-service pod with the CSI volume attached.

#### Step 3: Confirm the files are there

```sh
# Find the new pod
kubectl get pod -n clearledger -l secrets=csi

# List the mounted secret files
kubectl exec -n clearledger deploy/auth-service -- ls /mnt/secrets

# Check the database URL was written correctly
kubectl exec -n clearledger deploy/auth-service -- cat /mnt/secrets/database_url

# Confirm the service is still healthy
curl -s "http://$(kubectl get ingress clearledger-ingress -n clearledger \
-o jsonpath='{.status.loadBalancer.ingress[0].hostname}')/auth/health"
```

You should see `database_url` and `jwt_secret` listed as files, and the health check should return `{"status":"ok"}`.

**ESO vs CSI: what actually changed?**

Both paths read the same passwords from AWS Secrets Manager. Only the delivery method changes.

**ESO (default, what you verified in §8.4)**

Think of ESO as a copy clerk that runs in the cluster:

1. ESO has its own AWS permission (IAM role).
2. It reads `clearledger/auth-service` from Secrets Manager.
3. It copies the values into a normal Kubernetes Secret named `auth-service-secret`.
4. The auth pod reads `DATABASE_URL` and `JWT_SECRET` as **environment variables.**

The password lives briefly inside the cluster as a Kubernetes Secret object.

**CSI (this exercise, file mounts)**

Think of CSI as the pod picking up secrets itself when it starts:

1. The auth-service pod has its own AWS permission (IRSA on its ServiceAccount).
2. When the pod starts, the CSI driver asks Secrets Manager for the values.
3. They appear as files under <VPIcon icon="fas fa-folder-open"/>`/mnt/secrets/` (`database_url`, `jwt_secret`).
4. The pod is told `DATABASE_URL_FILE=/mnt/secrets/database_url` , it reads from disk, not from a copied K8s Secret.

No Kubernetes Secret copy is created for those values on this path.

**Why does the same app code work for both?**

<VPIcon icon="fas fa-folder-open"/>`app/auth-service/`<VPIcon icon="fa-brands fa-python"/>`main.py` uses a small helper `_read_secret()`:

- If `DATABASE_URL_FILE` points to a file that exists → read the file (CSI or homelab Vault).
- Otherwise → read `DATABASE_URL` directly (ESO / Stage 0–4).

Same image, same code: you only change which deployment YAML Argo CD syncs.

**To switch back to ESO:** in <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml`, change <VPIcon icon="iconfont icon-yaml"/>`auth-service-csi.yaml` back to <VPIcon icon="iconfont icon-yaml"/>`auth-service.yaml`, commit, push, and `argocd app sync clearledger-aws`.

**Terraform** provisions all the AWS resources (VPC, EKS, RDS, ECR, Secrets Manager, and IAM roles) from `.tf` files in <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/terraform/`.

### Two OIDC Ideas in Stage 8

Stage 8 uses OIDC in two different places. They sound similar, but they solve different problems.

**GitHub Actions OIDC** lets the CI pipeline push images to ECR without storing long-lived AWS keys in GitHub. When a job runs, GitHub mints a short-lived token that proves the job's identity. AWS trusts that token and hands back temporary credentials: enough to push images and nothing else.

**IRSA** does the same thing, but for pods running inside EKS. Instead of a GitHub token, the pod presents its Kubernetes ServiceAccount token. AWS trusts the EKS cluster's OIDC provider, verifies the token, and returns temporary credentials scoped to exactly what that pod needs.

It helps to see what each one says:

```plaintext
GitHub Actions OIDC:
  Pipeline says → "I am a job in the production environment of YOUR_USERNAME/clearledger"
  AWS replies   → "Here are credentials to push to ECR, valid for one hour"

IRSA:
  Pod says   → "I am the auth-service ServiceAccount in the clearledger namespace"
  AWS replies → "Here are credentials to read only the auth-service secret, valid for one hour"
```

![Image flow diagram showing difference between OIDC and IRSA](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/ac83e9bf-dbfd-42b3-bba8-0bbf327b03c5.png)

The key is what is *not* stored anywhere:

```plaintext
No AWS_ACCESS_KEY_ID in GitHub Secrets
No AWS_SECRET_ACCESS_KEY in GitHub Secrets
No AWS keys inside Kubernetes Secrets
```

Terraform creates the role `clearledger-github-actions-ecr` and wires up the trust policies for both. The pipeline in <VPIcon icon="fas fa-folder-open"/>`.github/workflows/ci-aws.yaml` assumes that role, pushes images to ECR, and updates <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml`. ArgoCD picks up the change and deploys the new images.

### CI Routing: Stages 1–7 vs Stage 8

The repo ships two workflow files. You don't need both running at the same time.

.<VPIcon icon="iconfont icon-yaml"/>`ci.yaml` is the homelab pipeline from Stages 1–7. It runs on your self-hosted Multipass VM, pushes images to Docker Hub, and updates your `clearledger-infra` GitOps repo. This is the default: nothing to configure.

.<VPIcon icon="iconfont icon-yaml"/>`ci-aws.yaml` is the AWS pipeline for Stage 8. It runs on GitHub-hosted `ubuntu-latest` runners, pushes images to ECR, and updates <VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` directly in this repo. It only activates when you set the repo variable `CLEARLEDGER_CI_TARGET=aws`.

**If you're on Stages 1–7, do nothing.** The `CLEARLEDGER_CI_TARGET` variable is unset by default, so every push runs <VPIcon icon="iconfont icon-yaml"/>`ci.yaml` on your self-hosted runner as normal. The AWS workflow file exists in the repo but its jobs are skipped.

**Do not set** `CLEARLEDGER_CI_TARGET=aws` **until your EKS cluster is running.**

If you set it early, `ci.yaml` stops running on push (no more Docker Hub builds), and `ci-aws.yaml` will fail immediately because there's no ECR, no OIDC role, and no AWS infrastructure yet. If you accidentally set it, delete the variable: GitHub → repo **Settings** → **Secrets and variables** → **Actions** → **Variables** → delete `CLEARLEDGER_CI_TARGET`.

**Enabling AWS CI (do this after `terraform apply` completes)**

You need three repository variables and one secret in a `production` environment.

First, set the variables: replace `YOUR_USERNAME` with your GitHub username:

```sh
gh variable set CLEARLEDGER_CI_TARGET --body aws --repo YOUR_USERNAME/clearledger

gh variable set AWS_ACCOUNT_ID --body "$(aws sts get-caller-identity --query Account --output text)" --repo YOUR_USERNAME/clearledger

gh variable set AWS_REGION --body eu-west-1 --repo YOUR_USERNAME/clearledger
```

Then create the `production` environment and add the OIDC role ARN as a secret:

```sh
# Create the environment first, gh secret set returns 404 if it does not exist
gh api --method PUT "repos/YOUR_USERNAME/clearledger/environments/production"
gh secret set AWS_ACTIONS_ROLE_ARN \
--env production \
--body "$(terraform -chdir=stages/stage-8-aws-migration/terraform output -raw github_actions_ecr_role_arn)" \
--repo YOUR_USERNAME/clearledger
```

::: note

GitHub blocks secret names that start with `GITHUB_`. Use `AWS_ACTIONS_ROLE_ARN`, not `GITHUB_ACTIONS_ROLE_ARN`.

:::

Also make sure `github_owner` is set correctly in `terraform.tfvars` (see `terraform.tfvars.example`) before running `terraform apply`. This wires up the OIDC trust policy so AWS will accept tokens from your specific GitHub account.

Once `CLEARLEDGER_CI_TARGET=aws` is set, every push to <VPIcon icon="fas fa-code-branch"/>`main` runs the AWS pipeline: Gitleaks → Semgrep → Checkov → build → Trivy scan → ECR push → kustomization update. The homelab `ci.yaml` is skipped.

**If CI fails at the ECR push step:**

The most common failure is `Not authorized to perform sts:AssumeRoleWithWebIdentity`. This means the IAM role trust policy still has a placeholder `YOUR_GITHUB_USERNAME` in the `:sub` condition. Fix it by setting `github_owner` in `terraform.tfvars` and running `terraform apply` again, then re-run only the failed job (not the whole pipeline: the earlier scan steps already passed).

```mermaid
flowchart TD
  A[GitHub] --> B[Actions]
  B --> C[failed run] 
  C --> D[Re-run failed jobs]
```

If you see `404` when running `gh secret set`, the `production` environment doesn't exist yet. Run the `gh api --method PUT` command above first.

**Re-run after fixing OIDC:** failed jobs only, not the full pipeline. Earlier gates (Gitleaks, build, scan) already passed, and their artifacts are still in the workflow run. Use Re-run all jobs only if you changed app code or want a clean scan from scratch.

### Production Hardening Checklist

The lab architecture is production-style, but a real production setup needs extra guardrails. Add these before you describe it as production-ready.

#### 1. Protect the main branches

Protect both GitHub repos:

```plaintext
github.com/YOUR_GITHUB_USERNAME/clearledger
github.com/YOUR_GITHUB_USERNAME/clearledger-infra
```

Go to each repo:

```plaintext
Settings
→ Rules
→ Rulesets
→ New ruleset
→ Branch targeting: main
```

Enable:

```plaintext
Require a pull request before merging
Require approvals
Require status checks to pass
Require branches to be up to date before merging
Block force pushes
Block branch deletion
```

Why this matters: nobody should push straight to the code repo or the GitOps repo in production. A bad direct push to `clearledger-infra` is a direct deployment request.

#### 2. Use GitHub Environments with approvals

Create a protected environment:

```plaintext
clearledger repo
→ Settings
→ Environments
→ New environment
→ Name: production
→ Required reviewers: add yourself or the team
→ Deployment branches: main only
```

The AWS workflow uses:

```yaml
environment: production
```

That means GitHub pauses the AWS deployment until an approved reviewer allows it. This creates a real promotion gate instead of "every push deploys to prod."

#### 3. Prefer fine-grained tokens or a GitHub App

For the basic lab, `INFRA_REPO_TOKEN` can be a classic PAT. For production, tighten it.

Better option:

```plaintext
Fine-grained personal access token
→ Repository access: only YOUR_GITHUB_USERNAME/clearledger-infra
→ Permissions:
   Contents: Read and write
   Metadata: Read
```

Best option for teams: use a GitHub App installed only on `clearledger-infra`, with permission to write contents. That gives better audit logs and easier rotation than a personal token.

Store `INFRA_REPO_TOKEN` as a production environment secret, not a general repository secret:

```plaintext
clearledger
→ Settings
→ Environments
→ production
→ Environment secrets
→ INFRA_REPO_TOKEN
```

#### 4. Lock AWS OIDC to the production environment

This isn't a shell command. It's a trust rule Terraform writes into AWS when you run `terraform apply`.

In <VPIcon icon="iconfont icon-terraform"/>`iam.tf`, the IAM role `clearledger-github-actions-ecr` only accepts GitHub tokens whose subject claim matches:

```plaintext
repo:YOUR_GITHUB_USERNAME/clearledger:environment:production
```

Only GitHub Actions jobs running in the `production` environment of your `clearledger` repo can assume the ECR push role. A random branch, fork, or workflow without that environment can't get AWS credentials.

**What you do:**

1. Set `github_owner` in `terraform.tfvars`, then `terraform apply` (Stage 8 step 2).
2. On GitHub: **Settings → Environments → production.** Create it if missing, and add protection rules if you want.
3. Add environment secret `AWS_ACTIONS_ROLE_ARN` = `terraform output -raw github_actions_ecr_role_arn`.
4. `ci-aws.yaml` already sets `environment: production` on the ECR jobs, that is what makes GitHub mint a matching token.

::: note Verify the rule exists (optional)

```sh
aws iam get-role --role-name clearledger-github-actions-ecr \
--query 'Role.AssumeRolePolicyDocument.Statement[0].Condition.StringEquals."token.actions.githubusercontent.com:sub"' \
--output text
#
# repo:your-username/clearledger:environment:production
```

:::

On the manual Stage 8 path you can skip GitHub CI entirely, this lock only matters when you enable CI, AWS (ECR + OIDC).

#### 5. Staging before production (promote, don't rebuild)

**Lab flow:** push to <VPIcon icon="fas fa-code-branch"/>`main` → `ci-aws.yaml` builds and scans → CI updates <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/manifests/`<VPIcon icon="iconfont icon-yaml"/>`kustomization.yaml` with the new image tag → Argo CD syncs `clearledger-aws`.

Homelab Stages 1–7 still use `clearledger-infra` and Docker Hub. Stage 8 AWS uses the in-repo kustomize path.

Real production adds a staging step in the middle: build the image once, deploy that same tag or digest to staging, run smoke tests or get manual approval, then promote to production, without building again.

Why? Because, if you rebuild for prod, you might ship different code than what passed staging. The safe pattern is one artifact, tested once, promoted twice.

```mermaid
flowchart TD
  A[Build once (one image SHA)] --> B[deploy to staging]
  B --> C[test / approve]
  C --> D[deploy the same SHA to production]
```

#### 6. Use private networking where possible

For production AWS:

```plaintext
- EKS nodes in private subnets
- RDS in private subnets
- Private EKS API endpoint, or restricted public endpoint
- Security groups scoped to required ports only
- ALB public only if the app is public
- No SSH-based deployment path
```

The pipeline should talk to AWS APIs through IAM/OIDC and deploy through GitOps. It shouldn't SSH into EC2 instances.

#### 7. Store Terraform state remotely

Local Terraform state is fine for a lab. Production should use encrypted remote state:

```plaintext
- S3 bucket for terraform.tfstate
- DynamoDB table for state locking
- SSE encryption enabled
- Bucket versioning enabled
- Public access blocked
```

The Terraform backend block is already included in <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/terraform/`<VPIcon icon="iconfont icon-terraform"/>`main.tf` as a commented template.  
Uncomment it after you create the S3 bucket and DynamoDB lock table.

#### Production-ready summary:

```plaintext
- CI builds and proves the artifact.
- GitHub Environments approve production.
- OIDC gives short-lived AWS credentials.
- ECR stores immutable images.
- kustomization.yaml (Stage 8 path) records desired state.
- ArgoCD clearledger-aws deploys from Git.
- No SSH. No static AWS keys. No direct kubectl from CI.
```

Open the URL. ClearLedger is running on AWS. Same architecture, same security layers, just new infrastructure.

![screenshot of clearledger UI running on EKS with ALB URL](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3e6a283d-add1-467b-83da-97c1915f0b92.png)

**Destroy when done.** This stops all charges:

```sh
make aws-down
```

See <VPIcon icon="fas fa-folder-open"/>`stages/stage-8-aws-migration/`<VPIcon icon="fa-brands fa-markdown"/>`README.md` for the full walkthrough and cost reference.

### What You Learned in Stage 8

- That containerized applications are portable: the same code runs on your laptop and on AWS
- What Terraform does: declares infrastructure as code so environments are reproducible
- What changes in a cloud migration (managed services, IAM, networking) and what does not (application code, CI logic, security policies)
- Three AWS secret delivery paths: ESO (default), CSI file mounts (§8.5), vs Vault on homelab
- AWS-specific security services: GuardDuty (threat detection), CloudTrail (API audit), GitHub Actions OIDC (pipeline AWS auth without long-lived keys), and IRSA (pod-level IAM without long-lived credentials)

::: note What you can now put on your CV / say in an interview:

> Migrated the same architecture to AWS (EKS, ECR, RDS, ALB, with secrets via External Secrets Operator and IRSA) provisioned by Terraform, without rewriting the application.

:::

**When you're done on AWS, tear down to stop charges:**

```sh
make aws-down
```

Your homelab VM is separate. If you plan to return to it, you should already have a snapshot from Stage 7 (`make snapshots` to confirm). See [Saving your progress](#how-to-save-your-progress).

---

## Troubleshooting (See [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md))

**Pod stuck in Pending:**

```sh
kubectl describe pod POD_NAME -n clearledger
# Insufficient memory/cpu → reduce resource requests
# Image pull error → check Docker Hub repo name and credentials
```

**Kyverno blocking a deployment:**

```sh
kubectl get events -n clearledger --sort-by='.lastTimestamp' | tail -10
kubectl get policyreport -n clearledger -o yaml
```

**Vault agent not injecting secrets:**

```sh
kubectl logs POD_NAME -n clearledger -c vault-agent-init
kubectl exec -n vault vault-0 -- vault read auth/kubernetes/role/auth-service
```

**Falco not firing alerts:**

```sh
kubectl logs -n falco daemonset/falco | grep -i error | tail -20
```

**ArgoCD shows OutOfSync:**

```sh
argocd app sync clearledger --force
argocd app get clearledger
kubectl get events -n clearledger --sort-by='.lastTimestamp'
```

**clearledger.local not resolving:**

```sh
multipass info clearledger | grep IPv4
grep clearledger /etc/hosts
# If the IP changed, update /etc/hosts
```

**VM disk full or pods Evicted (disk pressure):**

```sh
make doctor     # PASS / WARN / FAIL + PVC and Prometheus TSDB sizes
make reclaim    # safe reclaim — unused images + journald only (not PVCs)
```

If still FAIL after reclaim, tear down and recreate: `make teardown && make setup`. Full guidance: [<VPIcon icon="fa-brands fa-markdown"/>`troubleshooting.md`: disk health (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md) and [VM disk full (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/troubleshooting.md).

---

## Compliance Reference

Every control maps to at least one framework. Full mapping: [<VPIcon icon="fas fa-folder-open"/>`docs/compliance-mapping.md`](compliance-mapping.md).

| Control | Tool | Stage | PCI-DSS | SOC2 | CIS K8s |
| --- | --- | --- | --- | --- | --- |
| Secrets detection | Gitleaks | 3 | 6.2 | CC8.1 | — |
| SAST | Semgrep | 3 | 6.3.2 | CC7.1 | — |
| Dependency scan | Trivy SCA | 3 | 6.3.3 | CC7.1 | — |
| IaC scan | Checkov | 3 | 6.3.1 | CC6.1 | — |
| Image signing | Cosign | 3 | 6.3 | CC6.1 | — |
| SBOM generation | Syft | 3 | 6.3.3 | CC6.1 | — |
| Non-root containers | Kyverno | 4 | 6.5 | CC6.3 | 5.2.6 |
| Resource limits | Kyverno | 4 | — | A1.1 | 5.2.4 |
| No privilege escalation | Kyverno | 4 | 6.5 | CC6.3 | 5.2.5 |
| Secrets management | Vault | 5 | 3.5 | CC6.1 | — |
| Runtime detection | Falco | 6 | 10.7 | CC7.2 | — |
| Network segmentation | NetworkPolicy | 6 | 1.3 | CC6.6 | 5.3.2 |
| Security observability | Grafana | 7 | 10.6 | CC7.2 | — |
| DORA metrics | ArgoCD + Grafana | 7 | — | — | — |
| Account threat detection | GuardDuty | 8 | 10.6 | CC7.2 | — |
| API audit trail | CloudTrail | 8 | 10.2 | CC7.3 | — |

**EU DORA (Digital Operational Resilience Act):** applies to EU financial entities since January 2025. ClearLedger maps to all five DORA pillars. Full mapping in [<VPIcon icon="fas fa-folder-open"/>`docs/compliance-mapping.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/compliance-mapping.md).

---

## Interview Preparation

Full weak/strong answers: [<VPIcon icon="fas fa-folder-open"/>`docs/interview-prep.md` (<VPIcon icon="iconfont icon-github"/>`Osomudeya/clearledger`)](https://github.com/Osomudeya/clearledger/blob/main/docs/interview-prep.md)

Practice these as you finish each stage:

**Stage 0:** How does traffic reach your services in Kubernetes? What breaks first when deployment is manual?

**Stage 1:** How do you prove what image is deployed for a given commit? What stops a developer bypassing CI?

**Stage 2:** What does GitOps mean mechanically? How do you prove drift is corrected automatically?

**Stage 3:** Difference between SAST, IaC scanning, and image scanning? Where do you draw the line for fail-on severity?

**Stage 4:** What is admission control and why is it different from CI? How would you safely introduce a policy exception?

**Stage 5:** Why are Kubernetes Secrets not "secret management"? How do you rotate secrets with minimal downtime risk?

**Stage 6:** What does runtime detection catch that CI and admission can't? What is your first response to a shell-spawn alert?

**Stage 7:** What's the difference between a dashboard and an alert? How do you produce audit evidence, not just claims?

**Stage 8:** What actually changes when you move to EKS? What shouldn't change? How does IRSA reduce risk?

---

## AWS Cost Reference

Default Stage 8 sizes (eu-west-1, approximate):

| Resource | Monthly (8h/day) | Monthly (24/7) |
| --- | --- | --- |
| EKS control plane | ~$24 | ~$73 |
| 3× t3.medium nodes | ~$30 | ~$92 |
| NAT Gateway | ~$11 | ~$33 |
| RDS db.t3.micro | ~$4 | ~$13 |
| ALB | ~$2 | ~$6 |
| GuardDuty + CloudTrail | ~$2 | ~$5 |
| **Total estimate** | **~$73** | **~$222** |

Always destroy when not in use:

```sh
make aws-down
```

---

## Conclusion

You've now built a fintech application and layered eight security and reliability controls on top of it: all from a laptop.

You started with raw Kubernetes and manual deploys in Stage 0. You added a CI pipeline that builds, scans, and signs images automatically in Stage 1. You connected Git to the cluster with ArgoCD in Stage 2. You gated every push with SAST, IaC, and image scanning in Stage 3. You blocked bad workloads at the cluster boundary with Kyverno in Stage 4. You moved credentials out of Git and Kubernetes secrets into Vault in Stage 5. You added runtime threat detection with Falco and network segmentation in Stage 6. You built observability dashboards that produce audit evidence in Stage 7. And you migrated the whole thing to AWS in Stage 8. None of these stages is a toy exercise. Each one represents a real problem that real teams hit in production. You felt the pain, then built the solution. That's the difference between reading about DevSecOps and being able to do it.

Take your screenshots, update your CV with the specific tools and outcomes, and use the interview prep section when you need to talk through the decisions you made. You built every one of them.

::: About Author

If you found this guide helpful, share it with someone breaking into DevOps or DevSecOps and* [connect on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`osomudeya-zudonu-17290b124`)](https://linkedin.com/in/osomudeya-zudonu-17290b124).

I also post DevOps walkthroughs and interview tips for getting hired; follow or [<VPIcon icon="fas fa-globe"/>subscribe there](https://osomudeya.kit.com/23db7ca59f) *if you want more.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Ready DevSecOps Platform from Homelab to AWS [Full Book]",
  "desc": "In this book, you'll build a fintech transaction ledger from scratch and progressively transform it into a production-ready DevSecOps platform. You'll also deploy it on AWS. The app processes credit a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-devsecops-platform-from-homelab-to-aws-full-book/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
