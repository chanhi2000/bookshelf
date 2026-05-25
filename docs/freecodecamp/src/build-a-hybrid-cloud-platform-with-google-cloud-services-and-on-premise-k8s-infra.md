---
lang: en-US
title: "How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure"
description: "Article(s) > How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure"
icon: iconfont icon-terraform
category:
  - Python
  - DevOps
  - Kubernetes
  - Google
  - Google Cloud
  - Terraform
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - k8s
  - kubernetes
  - google
  - gcp
  - google-cloud-platform
  - tf
  - terraform
  - hcl
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure"
    - property: og:description
      content: "How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-hybrid-cloud-platform-with-google-cloud-services-and-on-premise-k8s-infra.html
prev: /programming/go/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Shubham Katara
    url: https://freecodecamp.org/news/author/katara/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a86db163-f513-48bd-8194-18c6cb894615.png
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
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
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
  name="How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure"
  desc="In this article, you'll learn how to design and build a secure, scalable hybrid cloud platform that connects your on‑premises Kubernetes infrastructure to Google Cloud Platform. This allows on‑prem ap"
  url="https://freecodecamp.org/news/build-a-hybrid-cloud-platform-with-google-cloud-services-and-on-premise-k8s-infra"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a86db163-f513-48bd-8194-18c6cb894615.png"/>

In this article, you'll learn how to design and build a secure, scalable hybrid cloud platform that connects your on‑premises Kubernetes infrastructure to Google Cloud Platform. This allows on‑prem apps can consume cloud services (notably GPUs) without brittle long‑lived keys, manual credential management, or risky network patterns.

Who this is for:

- Platform engineers, SREs, and security-focused cloud architects who operate mixed on‑prem and cloud Kubernetes estates.
- Teams that need scalable, auditable access from on‑prem workloads to GCP resources (especially GPU instances) while minimizing operational overhead and blast radius.

What you’ll get from this guide:

- The motivation and economics behind a hybrid approach (why GPUs often push workloads to the cloud).
- Common pitfalls with service account keys and how “accidental air gaps” occur in real environments.
- A practical, end‑to‑end pattern that uses Workload Identity Federation to give on‑prem pods short‑lived, auditable access to GCP without embedding keys.

What’s included:

- Conceptual explanations, security tradeoffs, and operational best practices.
- Concrete examples and Kubernetes/Terraform artifacts (linked in the GitHub repo at the end of this article) so you can reproduce the setup in your environment.

Read on for the theory, then follow the hands‑on sections to provision GCP resources, configure federation, enforce policies with CEL and Kyverno, and validate secure, scalable GPU access from your on‑prem Kubernetes clusters.

::: note

Kubernetes and Terraform artifacts are linked in the GitHub repo at the end of this article.

:::

::: note Prerequisites

Before following along, you'll need:

- A Kubernetes cluster that is **not** GKE (on-premises, bare-metal, or a virtual cluster)
- A Google Cloud project with the following APIs enabled: IAM, Security Token Service (STS), and Workload Identity
- [<VPIcon icon="iconfont icon-terraform"/>Terraform](https://developer.hashicorp.com/terraform/install) installed and configured
- [<VPIcon icon="fas fa-globe"/>Kyverno](https://kyverno.io/docs/installation/) installed in your cluster
- Python 3 with `google-cloud-secret-manager` and `google-cloud-aiplatform` libraries (for the verification steps. Code available in the github repository.)
- `kubectl` access to your cluster

:::

::: important Why Hybrid Cloud Matters

If everything goes right, a hybrid cloud platform lets your on-premises and cloud workloads talk to each other as if they were part of the same network.

There are many practical reasons to run a hybrid cloud setup:

- **Offloading analytics to BigQuery:** You keep your analytics apps on-prem for data sovereignty, but pipe large datasets into BigQuery for world-class processing power — without buying extra servers.
- **Creating a unified network with Cloud Interconnect:** Using Cloud Interconnect or Cloud VPN, your on-premises datacenter becomes an extension of the Google Cloud Platform (GCP) Virtual Private Cloud (VPC). Your on-prem invoice apps can talk to cloud-based user services with low latency and no public internet exposure.
- **Cost-effective scalability via Cloud Storage:** You can use cloud storage as a backend for local apps, storing logs, backups, and historical data while paying only for what you use.
- **Event-driven syncing with Pub/Sub:** When something happens on-prem, a message through Cloud Pub/Sub lets cloud services react instantly — no manual polling required.

:::

## The Economics of Hybrid: GPUs Changed Everything

Before diving into the technical problem, it's worth understanding why hybrid clouds matter more than ever.

Your organization, like most enterprises, has made significant investments in on-premises datacenters. Servers are bought. Racks are filled. Network infrastructure is paid for. The marginal cost of running one more workload is essentially zero.

Then came the AI wave.

Suddenly every team needs Graphics Processing Units (GPUs). Not one or two — dozens of A100s for training, fleets of inference endpoints, vector databases that need to sit close to the models. GPUs are scarce. Lead times for on-prem GPU hardware stretch into months. Cloud providers have them available in minutes.

The architecture that actually makes economic sense looks like this:

- **The on-prem datacenter handles the bulk of compute** — web servers, business logic, databases, batch processing. This is commodity compute you've already paid for.
- **The cloud handles what's scarce** — GPU-accelerated inference, model training, AI/ML endpoints. You pay per request, scale on demand, and don't wait six months for hardware.

The cloud isn't a full migration destination — it's an extension for capabilities you can't easily build on-prem.

But those on-prem workloads need to authenticate to cloud services. Every API call from the datacenter to a Vertex AI endpoint, every request to a GPU-powered inference service, every write to Cloud Storage for model artifacts — all of it needs credentials. That's the problem this article solves.

---

## Why Service Account Keys Fail at Scale

Here's a scenario that plays out in thousands of enterprises daily.

A development team needs their on-prem application to write to Google Cloud Storage. The "obvious" solution? Generate a GCP service account key, base64 encode it, store it in a Kubernetes Secret, and mount it in the pod:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gcp-credentials
type: Opaque
data:
  key.json: eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6…
```

This works. It also introduces serious problems:

- **Never expires.** That key is valid until someone remembers to rotate it (they won't) or it gets compromised (it will).
- **Can be exfiltrated trivially.** Anyone with read access to that namespace can run `kubectl get secret -o yaml` and walk away with permanent GCP access.
- **Has no audit trail for the actual workload.** GCP sees "service-account-xyz accessed this bucket" — not "pod frontend-abc-123 in namespace production."
- **Scales terribly.** 50 teams × 3 environments × 4 GCP projects = 600 keys to track, rotate, and hope haven't been committed to git.

Security teams know this. That's why many organizations have done the only sensible thing: they have disabled service account key generation entirely.

---

## How the Accidental Air Gap Happens

When you disable key generation, you haven't solved the hybrid cloud platform problem — you've just made it someone else's problem. That someone is usually a platform team staring at a Jira ticket that says "cannot access GCP from on-prem, P1, blocking release."

The result? Your "hybrid cloud platform" isn't hybrid at all. It's two disconnected systems.

Teams resort to building intermediary services, API gateways that proxy requests, or finding creative ways to get keys anyway. None of this is a platform. It's duct tape.

---

## How Workload Identity Federation Bridges the Gap

Every Kubernetes cluster already issues cryptographically signed identity tokens to every pod. And Google Cloud has a service specifically designed to trust those tokens.

This is **Workload Identity Federation** — and combined with OpenID Connect (OIDC), it's the missing piece that makes hybrid platforms actually work.

The service is quite well named because of the word Federation. it means GCP doesn't store your identity — it agrees to trust identities issued by another system, as long as they can be cryptographically verified. This all works with a very well orchestrated set of steps in the following order:

1. Pod presents its Kubernetes-issued JWT to GCP's STS endpoint.
2. STS verifies the signature against your cluster's public JWKS.
3. STS checks the JWT's claims against the Workload Identity Pool's rules (audience, issuer, CEL conditions).
4. STS returns a short-lived Google access token (typically 1 hour) that the pod uses for API calls.

It is also worth mentioning that Workload Identity Federation is not Kubernetes specific. It works with AWS IAM, Azure AD, GitHub Actions OIDC, and any OIDC-compliant identity provider.

---

## How Kubernetes Identity Works

Every pod with a ServiceAccount gets a JSON Web Token (JWT) automatically mounted at <VPIcon icon="fas fa-folder-open"/>`/run/secrets/kubernetes.io/serviceaccount/token`. This isn't just an opaque blob — it's a signed assertion of identity:

```json
{
  "iss": "https://kubernetes.default.svc.cluster.local",
  "sub": "system:serviceaccount:production:backend-api",
  "aud": ["https://iam.googleapis.com/..."],
  "kubernetes.io": {
    "namespace": "production",
    "serviceaccount": {
      "name": "backend-api"
    }
  },
  "exp": 1735689600
}
```

In a JWT, claims are just the key-value pairs inside the token's payload — each one is a claim the issuer is making about the subject. Think of them as facts the token is asserting, signed cryptographically so the verifier can trust them.

The critical insight: this token is created by a set of JSON Web Key Set (JWKS) and is verifiable by anyone who has your cluster's public keys, exposed via the JSON Web Key Set (JWKS) endpoint:

```sh
kubectl get --raw /openid/v1/jwks
```

Google Cloud's Security Token Service (STS) can validate these tokens. No keys are exchanged. No secrets are stored. Just cryptographic proof of identity.

---

## How to Prepare Google Cloud Platform resources

The Workload Identity Pool is a trust boundary — a declaration that says "I accept identities from external sources." The OIDC Provider configures how to validate those identities.

```hcl
resource "google_iam_workload_identity_pool" "pool" {
  workload_identity_pool_id = "hybrid-platform-pool"
  project                   = "my-project"
}

resource "google_iam_workload_identity_pool_provider" "k8s_provider" {
  project                            = "my-project"
  workload_identity_pool_id          = google_iam_workload_identity_pool.pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "on-prem-cluster"

  attribute_mapping = {
    "google.subject"      = "assertion.sub"
    "attribute.namespace" = "assertion['kubernetes.io']['namespace']"
  }

  attribute_condition = "attribute.namespace in [\"production\", \"staging\"]"

  oidc {
    issuer_uri = "https://kubernetes.default.svc.cluster.local"
    jwks_json  = file("jwks.json")  # Your cluster's public keys
  }
}
```

Two things to note here:

1. `attribute_mapping` extracts claims from the Kubernetes JWT and makes them available as GCP attributes. By using `assertion['kubernetes.io']['namespace']`, the namespace is pulled out so you can use it for access control.
2. `attribute_condition` is where security policy lives. More on this in the next section.

---

## How to Use CEL for Fine-Grained Access Control

The `attribute_condition` field uses Common Expression Language (CEL). This single line of policy can replace dozens of Identity and Access Management (IAM) bindings:

```plaintext
attribute.namespace in ["production", "staging"]
```

With this condition, a pod in the `kube-system` namespace cannot authenticate to GCP at all — the token exchange is rejected before IAM is even consulted.

You can get more sophisticated:

```plaintext
// Only production namespace, and only specific service accounts
attribute.namespace == "production" &&
  attribute.service_account in ["payment-processor", "order-service"]

// Allow staging, but only during business hours
attribute.namespace == "staging" &&
  request.time.getHours("America/New_York") >= 9 &&
  request.time.getHours("America/New_York") < 17
```

This is defense in depth. Even if someone creates a rogue ServiceAccount or has `kubectl` access, they cannot authenticate to GCP unless the CEL condition passes. The security boundary is enforced by Google's infrastructure, not by hoping developers follow policy.

---

## How to Inject Credentials Automatically with Kyverno

Having a working identity federation is only half the battle. Your customers and developers shouldn't need to understand OIDC, STS, or credential configuration files. They should deploy their app and have it work.

Before we get to the automation, it's worth pausing on what a *credential configuration file* actually is — because the name is a little misleading.

A credential configuration file (sometimes called an "external account config" or "ADC config") is a small JSON document that tells Google's client libraries **how to obtain** a credential at runtime. It is **not** itself a credential. You'll see the actual file later in this article — it contains no secrets. Just metadata: the Workload Identity Pool audience, the STS token-exchange endpoint, the source token type, and the path on the pod's filesystem where the real (short-lived) Kubernetes ServiceAccount token lives.

Compare that to a traditional service account key:

|  | Service Account Key (`key.json`) | Credential Config (`credential-configuration.json`) |
| --- | --- | --- |
| What's inside the file | An RSA private key that *is* the credential | Instructions for exchanging an external token |
| Lifetime of the secret material | Forever, until manually rotated | Source token rotates automatically (~1h TTL) |
| If the file leaks | Long-lived access to a GCP service account | Useless on its own — points to a token only the pod can read |
| Identity model | Impersonates a GCP service account directly | Federates an external identity into GCP via STS |
| Who handles rotation | A human (or no one) | The Kubernetes API server, transparently |

Both files end up referenced by `GOOGLE_APPLICATION_CREDENTIALS` and look interchangeable from the application's point of view — but only one of them is dangerous to lose. The credential config file is safe to ship in a ConfigMap precisely because there's nothing to steal.

Having this file in the ConfigMap is half the solution. It actually needs to end up in the workload pods that need access to GCP services. This is where Kyverno comes in. A single ClusterPolicy automatically injects everything a pod needs:

```yaml :collapsed-lines
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: workload-identity-federation
spec:
  rules:
    - name: inject-gcp-credentials
      match:
        any:
          - resources:
              kinds:
                - Deployment
              selector:
                matchLabels:
                  workload-identity-federation: "enabled"
      mutate:
        patchStrategicMerge:
          spec:
            template:
              spec:
                volumes:
                  - name: workload-identity-credential-configuration
                    configMap:
                      name: workload-identity-federation-config
                containers:
                  - (name): "*"
                    volumeMounts:
                      - name: workload-identity-credential-configuration
                        mountPath: /etc/workload-identity
                        readOnly: true
                    env:
                      - name: GOOGLE_APPLICATION_CREDENTIALS
                        value: "/etc/workload-identity/credential-configuration.json"
```

The above cluster policy does three things:

1. Mounts the configmap inside the containers in the deployment at `/etc/workload-identity`.
2. Injects an environment variable called `GOOGLE_APPLICATION_CREDENTIALS` that points to the absolute path of the credential config file.

From a developer's perspective, this is their entire integration:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    workload-identity-federation: "enabled" # That's it.
spec:
  # ... normal deployment spec
```

The credential configuration file (created by Terraform as a ConfigMap) tells Google's client libraries how to exchange tokens:

```json
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/providers/PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
  "token_url": "https://sts.googleapis.com/v1/token",
  "credential_source": {
    "file": "/run/secrets/kubernetes.io/serviceaccount/token"
  }
}
```

This JSON file is a credential configuration for Google's Workload Identity Federation. It instructs Google Cloud client libraries to obtain cloud access tokens by exchanging a Kubernetes ServiceAccount token (located at <VPIcon icon="fas fa-folder-open"/>`/run/secrets/kubernetes.io/serviceaccount/token`) for a Google Cloud access token, using an external identity provider configured via a Workload Identity Pool. This allows workloads running outside of GCP, such as on-premises Kubernetes clusters, to authenticate to Google Cloud services without needing to manage long-lived service account keys.

Every Google Cloud SDK and client library understands this format. Python, Go, Java, and Node.js all just work.

---

## How to Grant IAM Permissions to Federated Identities

The service account token that has been trusted by the STS service, also known as a federated identity, need permissions to access resources. You bind IAM roles to the identity pool attributes:

```hcl
resource "google_project_iam_member" "secret_access" {
  for_each = toset(["production", "staging"])
  project  = "my-project"
  role     = "roles/secretmanager.secretAccessor"
  member   = "principalSet://iam.googleapis.com/projects/\({PROJECT_NUMBER}/locations/global/workloadIdentityPools/\){POOL_ID}/attribute.namespace/${each.value}"
}
```

This grants Secret Manager access to all pods authenticated from the `production` or `staging` namespaces. The `principalSet` syntax allows matching on attributes. You can also restrict to specific service accounts:

```plaintext
member = "principal://iam.googleapis.com/.../subject/system:serviceaccount:production:payment-processor"
```

---

## How to Verify the Setup

You can verify the setup with a simple Python script that lists secrets from Secret Manager. This runs inside a pod on your on-premises cluster:

```py :collapsed-lines
# list_secrets.py - running on-prem, accessing GCP Secret Manager
from google.cloud import secretmanager

def list_secrets(project_id: str):
    """
    List all secrets in a GCP project.

    No credentials are passed explicitly. The google-cloud-secret-manager
    library automatically:
    1. Reads GOOGLE_APPLICATION_CREDENTIALS env var (set by Kyverno)
    2. Loads the credential configuration JSON
    3. Reads the K8s ServiceAccount token from /run/secrets/...
    4. Exchanges it for a GCP access token via STS
    5. Uses that token to call the Secret Manager API
    """
    client = secretmanager.SecretManagerServiceClient()
    parent = f"projects/{project_id}"

    print(f"Secrets in {project_id}:")
    print("-" * 40)

    for secret in client.list_secrets(request={"parent": parent}):
        secret_name = secret.name.split("/")[-1]
        print(f"  - {secret_name}")

    print("-" * 40)
    print("Authentication: Workload Identity Federation")
    print("Credentials: None stored, token exchanged at runtime")

if __name__ == "__main__":
    list_secrets("my-project-id")
```

Run this inside your labeled pod:

```sh
kubectl exec -it my-app-xyz -- python list_secrets.py
#
# Secrets in my-project-id:
# ----------------------------------------
#   - database-password
#   - api-key-stripe
#   - oauth-client-secret
#   - ml-model-api-key
# ----------------------------------------
# Authentication: Workload Identity Federation
# Credentials: None stored, token exchanged at runtime
```

No service account key. No secret mounted. Just a Kubernetes ServiceAccount token exchanged for GCP credentials at runtime.

This same pattern works for any GCP service — Secret Manager, Cloud Storage, BigQuery, Pub/Sub, and Vertex AI.

---

## How to Connect On-Prem Apps to Cloud GPUs

Consider a typical flow: an on-prem order processing service needs to call a Vertex AI endpoint for fraud detection. The model runs on GPUs in Google Cloud (you can spin up A100s in minutes, not months). The application logic stays on-prem (you've already paid for that compute).

With the IAM bindings in place, any pod in the allowed namespaces can call Vertex AI:

```py :collapsed-lines title="fraud_detector.py"
# running on-prem, calling cloud GPUs
from google.cloud import aiplatform

def check_fraud(transaction: dict) -> float:
    """
    Call a Vertex AI endpoint for fraud detection.

    The model runs on A100 GPUs in Google Cloud.
    This code runs on-prem in the datacenter.

    Authentication is automatic:
    1. Kyverno injected GOOGLE_APPLICATION_CREDENTIALS
    2. The aiplatform SDK reads the credential config
    3. K8s SA token is exchanged for GCP token via STS
    4. Request is authenticated to Vertex AI
    """
    endpoint = aiplatform.Endpoint(
        endpoint_name="projects/my-project/locations/us-central1/endpoints/fraud-model"
    )
    prediction = endpoint.predict(instances=[transaction])
    return prediction.predictions[0]["fraud_score"]


def generate_embeddings(texts: list[str]) -> list[list[float]]:
    """
    Generate text embeddings using a cloud-hosted model.

    Embedding models are GPU-intensive. Running them on-prem
    would require dedicated hardware. In the cloud, you pay per request.
    """
    from vertexai.language_models import TextEmbeddingModel

    model = TextEmbeddingModel.from_pretrained("text-embedding-004")
    embeddings = model.get_embeddings(texts)
    return [e.values for e in embeddings]
```

The developer doesn't think about authentication at all. They add the label to their deployment, and their on-prem pod can call:

- **Vertex AI endpoints** for ML inference on cloud GPUs
- **Cloud Storage** for model artifacts and training data
- **BigQuery** for feature stores and analytics
- **Pub/Sub** for event streaming between environments
- **Secret Manager** for API keys and configuration

This is the hybrid platform working as intended.

---

## How to Scale GPU Access with CEL Conditions

CEL conditions become especially powerful when you want to restrict GPU access to specific namespaces. For example, to allow only ML-related namespaces to access Vertex AI:

```plaintext
attribute.namespace in ["ml-inference", "ml-training", "data-science"] &&
  attribute.service_account.startsWith("ml-")
```

You can also grant different access levels per namespace:

```hcl
# ML inference namespace gets prediction access
resource "google_project_iam_member" "ml_inference" {
  project = "my-project"
  role    = "roles/aiplatform.user"
  member  = "principalSet://iam.googleapis.com/.../attribute.namespace/ml-inference"
}

# Data science namespace gets full Vertex AI access (for experimentation)
resource "google_project_iam_member" "data_science" {
  project = "my-project"
  role    = "roles/aiplatform.admin"
  member  = "principalSet://iam.googleapis.com/.../attribute.namespace/data-science"
}
```

The on-prem application teams don't need to know or care about GCP IAM. They deploy to the right namespace, add a label, and the platform handles the rest.

---

## The Security Properties Compared

Here's a side-by-side comparison of the two authentication approaches:

| Property | Service Account Keys | Workload Identity Federation |
| --- | --- | --- |
| Credential lifetime | Until manually rotated (often years) | Short-lived (1 hour for GCP tokens) |
| Exfiltration risk | High — static key can be copied anywhere | Low — token expires quickly |
| Audit trail | Service account name only | Namespace + service account name |
| Key management overhead | 600+ keys at scale | Zero keys to manage |
| Security policy enforcement | Manual / trust-based | Enforced by GCP infrastructure via CEL |
| Developer experience | Copy key, create secret, mount volume | Add one label to the deployment |

The short-lived nature of tokens deserves emphasis. Even in a worst-case scenario where a token is somehow exfiltrated, it expires. Kubernetes ServiceAccount tokens have a configurable lifetime, and the GCP access tokens issued by STS are valid for one hour. A service account key, by contrast, remains valid until someone explicitly rotates it — often years.

---

## The Complete Infrastructure as Code Layout

The entire solution is codified in Terraform, managing both GCP and Kubernetes resources:

```sh title="file structure"
workload-identity-federation/
├── providers.tf      # Google + Kubernetes providers
├── locals.tf         # Configuration (namespaces, project ID, etc.)
├── gcp.tf            # Identity pool, provider, IAM bindings
└── kubernetes.tf     # ConfigMap with credential configuration
```

A single `terraform apply`:

1. Creates the Workload Identity Pool in GCP
2. Configures the OIDC provider with your cluster's JWKS
3. Sets up IAM bindings for allowed namespaces
4. Creates ConfigMaps in each namespace with the credential configuration

Combined with the Kyverno policy, you get a fully automated pipeline:

```plaintext
New namespace added to allowed list
        │
        ▼
Terraform creates ConfigMap in that namespace
        │
        ▼
Developer deploys with label
        │
        ▼
Kyverno injects credentials automatically
        │
        ▼
Pod authenticates to GCP via OIDC
        │
        ▼
Application accesses GCP services
```
<!-- TODO: mermaid화-->

No tickets. No key requests. No secrets to manage.

---

## How to Run a Proof of Concept with vCluster

To validate this works outside GKE, you can set up a demonstration using [<VPIcon icon="fas fa-globe"/>vCluster](https://vcluster.com/) — a virtual Kubernetes cluster that runs inside another Kubernetes cluster. This proves the solution works for any cluster. You can setup vCluster in Docker using [<VPIcon icon="iconfont icon-github"/>`loft-sh/vind`](https://github.com/loft-sh/vind/blob/main/docs/getting-started.md)

```yaml title="vcluster.yaml"
experimental:
  docker:
    nodes:
      - name: worker-1
      - name: worker-2
deploy:
  cni:
    flannel:
      enabled: true
controlPlane:
  distro:
    k8s:
      version: "v1.35.0"
```

```sh
vcluster create hybrid --driver docker -f vcluster.yaml
kubectl get nodes
# 
# hybrid-control-plane   Ready    control-plane   14d   v1.34.0   192.168.107.2   <none>        Debian GNU/Linux 12 (bookworm)   7.0.5-orbstack-00330-ge3df4e19b0a0-dirty   containerd://2.1.3
# hybrid-worker          Ready    <none>          14d   v1.34.0   192.168.107.3   <none>        Debian GNU/Linux 12 (bookworm)   7.0.5-orbstack-00330-ge3df4e19b0a0-dirty   containerd://2.1.3
# hybrid-worker2         Ready    <none>          14d   v1.34.0   192.168.107.4   <none>        Debian GNU/Linux 12 (bookworm)   7.0.5-orbstack-00330-ge3df4e19b0a0-dirty   containerd://2.1.3
```

Inside the vCluster, deploy a simple test deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gcp-test
  labels:
    workload-identity-federation: "enabled"
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gcp-test
  template:
    metadata:
      labels:
        app: gcp-test
    spec:
      containers:
        - name: test
          image: google/cloud-sdk:slim
          command: ["sleep", "infinity"]
```

Exec into the pod and verify:

```sh
kubectl exec -it gcp-test-xxx -- bash

# Inside the pod:

gcloud auth login --cred-file=GOOGLE_APPLICATION_CREDENTIALS
#
# Authenticated with external account credentials for: [principal://iam.googleapis.com/...]

gcloud secrets list --project=my-project
#
# NAME                 CREATED
# database-password    2024-01-15T10:30:00Z
# api-key              2024-01-14T09:15:00Z
```

No keys. No secrets mounted. Just identity federation working as designed.

---

## Common Issues and How to Solve Them

### How to Handle JWKS Retrieval for Air-Gapped Clusters

If your cluster's OIDC discovery endpoint isn't publicly reachable (most on-prem clusters aren't), you need to manually export the JWKS and upload it to GCP:

```sh
kubectl get --raw /openid/v1/jwks > jwks.json
```

This file must be updated if the cluster's signing keys rotate. Set up a periodic job that checks for key changes and updates the Terraform configuration.

### How to Fix Issuer URL Mismatches

The `iss` claim in the Kubernetes token must exactly match the issuer URL configured in the OIDC provider. For clusters using internal DNS:

```plaintext
issuer_uri = "https://kubernetes.default.svc.cluster.local"
```

This URL doesn't need to be reachable from GCP — the JWKS file provides the validation keys. But it must match what's in the token exactly.

### How to Debug Token Exchange Failures

When authentication fails, the error messages can be cryptic. Common causes and fixes:

| Error | Likely Cause | Fix |
| --- | --- | --- |
| `invalid_grant` | Issuer URL mismatch | Check `iss` claim in JWT against configured `issuer_uri` |
| `audience mismatch` | Wrong `audience` in credential config | Regenerate the credential configuration JSON via Terraform |
| `CEL condition failed` | Namespace not in allowed list | Add namespace to `attribute_condition` and re-apply |
| `JWKS validation failed` | Signing keys have rotated | Re-export JWKS and update Terraform config |

---

## Conclusion

After implementing this setup, on-premises workloads authenticate to Google Cloud exactly like GKE workloads do — without a single long-lived credential. The security team is happy (no keys to audit), developers are happy (just add a label), and the platform team is happy (no more credential management tickets).

Here's what you accomplished in this tutorial:

1. /Understood why service account keys fail at scale and the security risks they introduce
2. Created a Workload Identity Pool and OIDC provider in GCP to trust your cluster's token issuer
3. Used CEL conditions to enforce fine-grained, namespace-level access policies
4. Automated credential injection into pods using a Kyverno ClusterPolicy
5. Bound IAM roles to federated identity attributes — no long-lived keys anywhere
6. Verified the setup by calling GCP APIs (Secret Manager, Vertex AI) from an on-prem pod
7. Proved the solution works on any Kubernetes cluster using vCluster

The technologies used here aren't new. OIDC has been in Kubernetes since version 1.20. Workload Identity Federation has been in GCP for years. Kyverno and Terraform are mature tools. What this tutorial puts together is an end-to-end solution that developers can adopt with minimal effort.

If your organization has disabled service account keys (or should), this is the path forward. Your on-prem and cloud clusters can finally be what they were always meant to be: secure extensions of each other.

::: info

The complete implementation is available as a Terraform module with Kyverno policies:

<SiteInfo
  name="shkatara/hybrid-platform-gcp-workload-identity-federation"
  desc="Contribute to shkatara/hybrid-platform-gcp-workload-identity-federation development by creating an account on GitHub."
  url="https://github.com/shkatara/hybrid-platform-gcp-workload-identity-federation/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2fc2979f2b32588e4aba633bfebb9b80e481c4766096d6cb1766ad69cfbc361e/shkatara/hybrid-platform-gcp-workload-identity-federation"/>

:::

::: info About Author

If this helps, you can follow me on [<VPIcon icon="fa-brands fa-linkedin"/>`shubhamkatara`](https://linkedin.com/in/shubhamkatara/), [<VPIcon icon="fa-brands fa-youtube"/>@kubesimplify](https://youtube.com/@kubesimplify), [`/company/kubesimplify`](https://linkedin.com/company/kubesimplify/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Hybrid Cloud Platform with Google Cloud Services and On-Premise Kubernetes Infrastructure",
  "desc": "In this article, you'll learn how to design and build a secure, scalable hybrid cloud platform that connects your on‑premises Kubernetes infrastructure to Google Cloud Platform. This allows on‑prem ap",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-hybrid-cloud-platform-with-google-cloud-services-and-on-premise-k8s-infra.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
