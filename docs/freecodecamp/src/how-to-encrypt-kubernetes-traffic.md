---
lang: en-US
title: "How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS"
description: "Article(s) > How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS"
    - property: og:description
      content: "How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-encrypt-kubernetes-traffic.html
prev: /devops/k8s/articles/README.md
date: 2026-05-21
isOriginal: false
author:
  - name: Destiny Erhabor
    url: https://freecodecamp.org/news/author/CaesarSage/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/c1cf9847-fa0f-49f3-93f4-3c5c1e8ac4c0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS"
  desc="Most engineers assume their Kubernetes cluster encrypts all of its traffic. It doesn't. The commands you run with kubectl are encrypted — your client and the API server speak TLS. The API server talki"
  url="https://freecodecamp.org/news/how-to-encrypt-kubernetes-traffic"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/c1cf9847-fa0f-49f3-93f4-3c5c1e8ac4c0.png"/>

Most engineers assume their Kubernetes cluster encrypts all of its traffic. It doesn't. The commands you run with `kubectl` are encrypted — your client and the API server speak TLS. The API server talking to etcd is usually encrypted too, depending on how the cluster was provisioned.

But traffic between your pods? Plaintext by default. Ingress traffic from the internet to your services? Only encrypted if you explicitly configure TLS. And certificates for internal services? You have to provision those yourself.

This is not a Kubernetes oversight. It's a deliberate design choice — Kubernetes provides the primitives and leaves the implementation to you. The problem is that certificate management is notoriously painful. Certificates expire. Provisioning them manually doesn't scale. Forgetting to rotate them causes outages.

cert-manager solves this. It runs as a controller inside your cluster, watches for `Certificate` resources, requests certificates from configured issuers, stores them in Kubernetes Secrets, and rotates them automatically before they expire. You declare what you want, cert-manager makes it happen and keeps it that way.

In this article you'll work through how cert-manager's core model works, automate public Ingress TLS using Let's Encrypt, set up an internal Certificate Authority for service-to-service encryption, and understand how certificate rotation works so outages caused by expired certificates become a thing of the past.

::: note Prerequisites

- A kind cluster with the nginx Ingress controller installed
- Helm 3 installed
- A domain name with DNS you control — needed for the Let's Encrypt demo
- Basic understanding of TLS: you know what a certificate, a private key, and a CA are

:::

::: info

All demo files are in the [DevOps-Cloud-Projects GitHub repository (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/k8/security/cert-manager).

:::

---

## What Is and Isn't Encrypted in Kubernetes?

Before installing anything, it's worth being precise about what the cluster already protects and what it leaves open.

| Traffic path | Encrypted by default? | Notes |
| --- | --- | --- |
| `kubectl` → API server | Yes | TLS with the cluster CA |
| API server → etcd | Usually | Depends on cluster provisioner — verify with your setup |
| API server → kubelet | Yes | TLS, but kubelet cert verification depends on configuration |
| Pod → Pod (same cluster) | **No** | Plaintext unless you add a service mesh or mTLS |
| Internet → Ingress | **No** | Opt-in — requires TLS configuration on the Ingress resource |
| Pod → Kubernetes API | Yes | Via the service account token and cluster CA |

The two gaps that matter most in practice are pod-to-pod traffic and Ingress TLS. This article covers both Ingress TLS with Let's Encrypt and internal service-to-service encryption using a private CA.

---

## How cert-manager Works

cert-manager is a Kubernetes operator. It extends the Kubernetes API with custom resources that represent certificate requests and their configuration. When you create a `Certificate` resource, cert-manager's controller picks it up, requests a certificate from the configured issuer, and stores the resulting certificate and private key in a Kubernetes Secret. When the certificate approaches its expiry, cert-manager renews it automatically.

This model means your application doesn't know or care about certificate management. It reads a Secret. cert-manager keeps that Secret fresh.

### The Four Core Resources

cert-manager introduces four custom resources that you'll use regularly:

| Resource | What it represents |
| --- | --- |
| `Issuer` | A certificate authority or ACME account — namespace-scoped |
| `ClusterIssuer` | Same as Issuer, but available cluster-wide |
| `Certificate` | A request for a certificate — describes what you want |
| `CertificateRequest` | An individual signing request — created automatically by cert-manager, rarely touched directly |

In practice you'll mostly deal with `ClusterIssuer` and `Certificate`. The `ClusterIssuer` defines where certificates come from. The `Certificate` defines what certificate you want and where to store it.

### Issuers and ClusterIssuers

An `Issuer` can only issue certificates within its own namespace. A `ClusterIssuer` can issue certificates in any namespace. For shared infrastructure like Let's Encrypt, you almost always want a `ClusterIssuer`. For application-specific internal CAs, an `Issuer` scoped to that application's namespace is the safer choice.

cert-manager supports several issuer types. The three you'll encounter most often are:

**ACME** — for public certificates from Let's Encrypt or any ACME-compatible CA. Ownership of the domain is proven via an HTTP-01 or DNS-01 challenge.

**CA** — for internal certificates signed by a CA whose private key is stored in a Kubernetes Secret. Used for service-to-service TLS within the cluster.

**Self-signed** — generates self-signed certificates. Rarely useful on its own, but essential as the bootstrap step when creating an internal CA.

### The Certificate Lifecycle

When you create a `Certificate` resource, cert-manager follows this sequence:

1. Creates a `CertificateRequest` with a CSR (Certificate Signing Request)
2. Passes the CSR to the configured issuer
3. For ACME issuers: creates a `Challenge` resource and fulfils it (more on this below)
4. Receives the signed certificate from the issuer
5. Stores the certificate and private key in the Kubernetes Secret named in `spec.secretName`
6. Monitors the certificate's expiry — by default, renews when 2/3 of the validity period has elapsed

Your application mounts the Secret. cert-manager updates it silently. Most applications that watch for file changes will pick up the new certificate without a restart.

### ACME Challenges: HTTP-01 vs DNS-01

Let's Encrypt needs proof that you control the domain before it issues a certificate. ACME defines two challenge types for this.

**HTTP-01** works by having cert-manager create a temporary HTTP endpoint at `http://<your-domain>/.well-known/acme-challenge/<token>`. Let's Encrypt sends a request to that URL. If the response matches the expected token, the challenge passes. This requires your cluster to be reachable from the internet on port 80. **DNS-01** works by having cert-manager create a temporary DNS TXT record at `_acme-challenge.<your-domain>`. Let's Encrypt checks for that record. This doesn't require inbound HTTP access, which makes it the right choice for private clusters, and it's the only way to get wildcard certificates (`*.example.com`).

The trade-off: HTTP-01 is simpler to set up but only works for single domains and requires internet-accessible infrastructure. DNS-01 requires API access to your DNS provider but works for internal clusters and wildcards.

---

## Demo 1 — Install cert-manager and Issue a Certificate Using Pebble and Let's Encrypt

Pebble is Let's Encrypt's local ACME test server. It runs inside your cluster, issues certificates using the same ACME protocol as Let's Encrypt, and requires no public domain or internet access. Using Pebble lets you test the full cert-manager flow — challenge, issuance, renewal — on a plain kind cluster.

Once you understand the flow locally, switching to real Let's Encrypt is a one-line change: replace the ClusterIssuer server URL and point a DNS record at a publicly reachable cluster. The rest of the configuration is identical.

You'll install cert-manager, create a `ClusterIssuer` for Let's Encrypt, deploy a sample application with an Ingress, and watch a real certificate be issued and stored automatically.

### Step 1: Install cert-manager

cert-manager is now distributed via OCI Helm charts from `quay.io/jetstack`. The `--set crds.enabled=true` flag installs the Custom Resource Definitions as part of the chart:

```sh
helm upgrade cert-manager oci://quay.io/jetstack/charts/cert-manager \
--install \
--create-namespace \
--namespace cert-manager \
--set crds.enabled=true \
--version v1.17.0 \
--wait
```

You also need the nginx Ingress controller — cert-manager routes HTTP-01 challenges through it. The `controller.service.type=ClusterIP` override is for kind specifically: the default `LoadBalancer` Service never gets an `EXTERNAL-IP` on kind (there's no cloud LB), which makes `--wait` hang forever. On a real cluster, drop the override and keep `LoadBalancer`.

```sh
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx \
--namespace ingress-nginx \
--create-namespace \
--set controller.service.type=ClusterIP \
--wait
```

Confirm all four components are running:

```sh
kubectl get pods -n cert-manager
kubectl get pods -n ingress-nginx
#
# NAME                                       READY   STATUS    RESTARTS   AGE
# cert-manager-76f84784c8-r4fx4              1/1     Running   0          6m45s
# cert-manager-cainjector-66fbf49587-gv25n   1/1     Running   0          6m45s
# cert-manager-webhook-577fddf86-l5wj4       1/1     Running   0          6m45s
# 
# NAME                                        READY   STATUS    RESTARTS   AGE
# ingress-nginx-controller-6c7cd85885-h7zgx   1/1     Running   0          3m34s
```

::: note `kind`-specific gotcha

remove the nginx admission webhook now. On kind, the nginx admission webhook serves with a self-signed certificate that the Kubernetes API server cannot verify. The first time you try to create *any* Ingress resource you'll see `failed calling webhook "validate.nginx.ingress.kubernetes.io": ... x509: certificate signed by unknown authority`. Delete the webhook up front so the rest of the demo doesn't trip over it:

```sh
kubectl delete validatingwebhookconfiguration ingress-nginx-admission
```

:::

### Step 2: Install Pebble

Pebble is the local ACME test server, distributed by the JupyterHub project. It ships with a companion CoreDNS deployment (`pebble-coredns`) that Pebble uses to resolve names during ACME validation.

```sh
helm install pebble pebble \
--repo https://jupyterhub.github.io/helm-chart/ \
--namespace pebble \
--create-namespace \
--wait
```

Confirm both pods are running:

```sh
kubectl get pods -n pebble
#
# NAME                              READY   STATUS    RESTARTS   AGE
# pebble-8d8d49d64-lz8ck            1/1     Running   0          36s
# pebble-coredns-7fb5c7cbf4-4jw9h   1/1     Running   0          36s
```

### Step 3: Wire up DNS for the fake hostname

We're going to issue a cert for `echo.pebble.local`. That hostname is fake — it doesn't exist in any real DNS — so we have to teach **two** independent resolvers about it before issuance will work:

| Resolver | Used by | What we need it to do |
| --- | --- | --- |
| `pebble-coredns` (in the `pebble` namespace) | Pebble itself, when it makes the HTTP-01 validation request | Resolve `echo.pebble.local` → ingress-nginx ClusterIP |
| Cluster CoreDNS (`kube-system`) | cert-manager's HTTP-01 **self-check** before reporting the challenge ready | Forward `pebble.local` lookups to `pebble-coredns` |

If you skip either layer, the Order will go to `invalid` state with a DNS lookup failure.

First grab the two IPs you'll need:

```sh
NGINX_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller \
-o jsonpath='{.spec.clusterIP}')
PEBBLE_DNS_IP=$(kubectl get svc pebble-coredns -n pebble \
-o jsonpath='{.spec.clusterIP}')
echo "NGINX_IP=\(NGINX_IP  PEBBLE_DNS_IP=\)PEBBLE_DNS_IP"
```

**Patch** `pebble-coredns` to answer for `*.pebble.local` with the ingress controller's IP. The CoreDNS `template` plugin parses unreliably when the whole block is collapsed onto one line, so apply a real multi-line ConfigMap:

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: pebble-coredns
  namespace: pebble
data:
  Corefile: |
    .:8053 {
      errors
      health
      ready
      template ANY ANY pebble.local {
        answer "{{ .Name }} 60 IN A ${NGINX_IP}"
      }
      forward . /etc/resolv.conf
      cache 2
      reload
    }
EOF

kubectl rollout restart deploy/pebble-coredns -n pebble
kubectl rollout status deploy/pebble-coredns -n pebble
```

Verify it answers correctly:

```sh
kubectl run dnstest --rm -it --restart=Never --image=busybox -- \
  nslookup echo.pebble.local ${PEBBLE_DNS_IP}
```

You should see `Address: <NGINX_IP>` in the response. If you get `SERVFAIL`, check `kubectl logs -n pebble deploy/pebble-coredns` — a parser error like `not a TTL: "}"` means the template block collapsed onto one line again.

**Patch the cluster CoreDNS** so cert-manager's self-check can resolve the same name. Add a stub zone that forwards `pebble.local` to `pebble-coredns`:

```sh
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        cache 30
        loop
        reload
        loadbalance
    }
    pebble.local:53 {
        forward . ${PEBBLE_DNS_IP}
    }
EOF

kubectl rollout restart deploy/coredns -n kube-system
kubectl rollout status deploy/coredns -n kube-system
```

Verify the cluster resolver now answers for `echo.pebble.local` (without specifying a server — it'll use the default kube-dns):

```sh
kubectl run dnstest --rm -it --restart=Never --image=busybox -- \
nslookup echo.pebble.local
```

Both `Server: 10.96.0.10` and `Address: <NGINX_IP>` should appear.

### Step 4: Fetch the Pebble CA and create the ClusterIssuer

Pebble signs its certificates with a self-signed root that lives in the `pebble` ConfigMap under `root-cert.pem`. cert-manager needs to trust this CA to talk to Pebble's ACME directory, so we pass it as a base64-encoded `caBundle` in the ClusterIssuer:

```sh
kubectl get configmap pebble -n pebble \
-o jsonpath='{.data.root-cert.pem}' > pebble-ca.crt

head -1 pebble-ca.crt   # should print -----BEGIN CERTIFICATE-----

CA_BUNDLE=$(base64 -i pebble-ca.crt | tr -d '\n')
echo "CA_BUNDLE length: ${#CA_BUNDLE}"   # ~1600 chars, one continuous line
```

Create the ClusterIssuer using the heredoc — the `${CA_BUNDLE}` shell variable gets substituted into the YAML before kubectl reads it:

```sh
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: pebble
spec:
  acme:
    server: https://pebble.pebble.svc.cluster.local/dir
    email: test@example.com
    privateKeySecretRef:
      name: pebble-account-key
    caBundle: ${CA_BUNDLE}
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
EOF
```

Check the issuer is ready:

```sh
kubectl get clusterissuer pebble
#
# NAME     READY   AGE
# pebble   True    5s
```

If `READY` stays `False`, the two most common causes are a malformed caBundle (verify it's a single unbroken base64 line with no newlines) or Pebble being unreachable from the `cert-manager` namespace. To check reachability:

```sh
kubectl run test-curl --rm -it --restart=Never \
--image=curlimages/curl:latest \
--namespace cert-manager -- \
curl -k https://pebble.pebble.svc.cluster.local/dir
```

If that returns JSON, Pebble is reachable.

### Step 5: Deploy a sample application

```yaml title="echo-app.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: echo
  template:
    metadata:
      labels:
        app: echo
    spec:
      containers:
        - name: echo
          image: ealen/echo-server:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: echo
  namespace: default
spec:
  selector:
    app: echo
  ports:
    - port: 80
      targetPort: 80
```

```sh
kubectl apply -f echo-app.yaml
```

Verify the resources came up:

```sh
kubectl get deploy,pod,svc -n default
#
# NAME                   READY   UP-TO-DATE   AVAILABLE   AGE
# deployment.apps/echo   1/1     1            1           32s
# 
# NAME                        READY   STATUS    RESTARTS   AGE
# pod/echo-5665fbcfdd-mbgxj   1/1     Running   0          36s
# 
# NAME                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
# service/echo         ClusterIP   10.96.103.114   <none>        80/TCP    40s
# service/kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP   32m
```

### Step 6: Create an Ingress with TLS

The `cert-manager.io/cluster-issuer: pebble` annotation tells cert-manager to automatically create a `Certificate` resource for this Ingress, using the issuer we just created. The hostname `echo.pebble.local` doesn't need to resolve externally — we taught both DNS resolvers about it in Step 3.

```yaml title="echo-ingress.yaml"
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: echo
  namespace: default
  annotations:
    cert-manager.io/cluster-issuer: pebble
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - echo.pebble.local
      secretName: echo-tls     # cert-manager will create this Secret
  rules:
    - host: echo.pebble.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: echo
                port:
                  number: 80
```

```sh
kubectl apply -f echo-ingress.yaml
```

### Step 7: Watch the certificate being issued

```sh
# Watch the Certificate resource (Ctrl-C once Ready=True)
kubectl get certificate echo-tls -n default -w
#
# NAME       READY   SECRET     AGE
# echo-tls   False   echo-tls   5s
# echo-tls   True    echo-tls   28s
```

When `READY` becomes `True`, the certificate has been issued and stored in the `echo-tls` Secret. The full chain — CertificateRequest → Order → Challenge → solver pod → Secret — happens in well under a minute on a healthy cluster:

```sh
kubectl get certificate,certificaterequest,order,challenge -n default
#
# NAME                                   READY   SECRET     AGE
# certificate.cert-manager.io/echo-tls   True    echo-tls   81s
# 
# NAME                                            APPROVED   DENIED   READY   ISSUER   AGE
# certificaterequest.cert-manager.io/echo-tls-1   True                True    pebble   81s
# 
# NAME                                               STATE   AGE
# order.acme.cert-manager.io/echo-tls-1-1824732543   valid   81s
```

(Challenges are deleted automatically once an Order completes, so `kubectl get challenge -n default` typically shows nothing at this point — that's success, not failure.)

If `READY` stays `False` for more than a minute, see the troubleshooting tips at the end of this section.

Inspect the issued certificate to confirm Pebble signed it:

```sh
kubectl get secret echo-tls -n default -o jsonpath='{.data.tls.crt}' | \
  base64 -d | openssl x509 -noout -issuer -subject -dates
#
# issuer=CN=Pebble Intermediate CA 05478c
# subject=
# notBefore=May 17 19:09:22 2026 GMT
# notAfter=Aug 15 19:09:21 2026 GMT
```

Issuer is Pebble's intermediate CA — proof the full ACME flow worked end-to-end. The cert is valid for 90 days, and cert-manager will renew it automatically at day 60. Hit the ingress over HTTPS from inside the cluster to confirm everything is wired together:

```sh
kubectl run curltest --rm -it --restart=Never --image=curlimages/curl -- \
curl -sk https://echo.pebble.local/
```

The echo server should return a JSON blob — note the `"x-forwarded-proto":"https"` field, which proves the request came through nginx over TLS.

**Troubleshooting if the cert never goes Ready:**

- `kubectl describe order -n default` — look for "DNS problem" or "Connection refused" in the events.
- `kubectl logs -n pebble deploy/pebble --tail=50` — Pebble logs the exact URL it tried to fetch during validation and any errors.
- If the Order is stuck pending with no events: cert-manager hasn't reconciled yet. Wait 30s.
- If the Order is `invalid`: one of the two DNS layers (Step 3) is misconfigured. Re-run both `nslookup` checks.
- If the Ingress apply itself failed with an x509 webhook error: you skipped the `kubectl delete validatingwebhookconfiguration ingress-nginx-admission` step in Step 1.

### Step 8: Switch to Let's Encrypt staging (real public domain)

Pebble proved the flow works locally. Now move to a publicly-reachable domain pointed at a publicly-reachable cluster. The DNS gymnastics from Step 3 go away — the domain is real, so both resolvers find it without intervention.

Use Let's Encrypt **staging** first. It speaks the same ACME protocol as production but with generous rate limits, so failed attempts during testing won't lock you out:

```yaml title="clusterissuer-staging.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-staging-account-key
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
```

```sh
kubectl apply -f clusterissuer-staging.yaml

# Point the Ingress at staging and the real hostname, then force re-issuance
kubectl annotate ingress echo \
cert-manager.io/cluster-issuer=letsencrypt-staging --overwrite -n default
kubectl delete secret echo-tls -n default
```

The new cert's issuer will look something like `(STAGING) Let's Encrypt`.

### Step 9: Switch to Let's Encrypt production

Once staging works, repeat with the production ClusterIssuer. The only difference is the `server` URL:

```yaml title="clusterissuer-prod.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
```

```sh
kubectl apply -f clusterissuer-prod.yaml
kubectl annotate ingress echo \
cert-manager.io/cluster-issuer=letsencrypt-prod --overwrite -n default
kubectl delete secret echo-tls -n default
```

cert-manager detects the missing Secret and immediately requests a browser-trusted certificate from production Let's Encrypt.

cert-manager detects the missing Secret and immediately triggers a new certificate request using the production issuer.

---

## How to Get a Wildcard Certificate with DNS-01

HTTP-01 challenges work well for single domains with public ingress. But there are two situations where you need DNS-01 instead: when your cluster is not publicly accessible (internal clusters, air-gapped environments, staging namespaces behind a VPN), and when you want a wildcard certificate that covers all subdomains of your domain.

DNS-01 requires cert-manager to be able to create and delete TXT records in your DNS provider. cert-manager has built-in support for Route53, Cloud DNS, Cloudflare, Azure DNS, and many others.

Here is a `ClusterIssuer` for DNS-01 using AWS Route53:

```yaml title="clusterissuer-dns01.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-dns01
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-dns01-account-key
    solvers:
      - dns01:
          route53:
            region: us-east-1
            # Use IRSA (IAM Roles for Service Accounts) in production
            # rather than static credentials
            hostedZoneID: YOUR_HOSTED_ZONE_ID
```

A wildcard `Certificate` using that issuer:

```yaml title="wildcard-cert.yaml"
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: wildcard-example-com
  namespace: default
spec:
  secretName: wildcard-example-com-tls
  issuerRef:
    name: letsencrypt-dns01
    kind: ClusterIssuer
  commonName: "*.example.com"
  dnsNames:
    - "*.example.com"
    - "example.com"        # Also cover the apex domain
  duration: 2160h           # 90 days
  renewBefore: 720h         # Renew 30 days before expiry
```

The resulting Secret `wildcard-example-com-tls` can be referenced by any Ingress in the `default` namespace. All subdomains — `api.example.com`, `dashboard.example.com`, `staging.example.com` — are covered by a single certificate that rotates automatically.

For Cloudflare instead of Route53, the solver section looks like this:

```yaml
    solvers:
      - dns01:
          cloudflare:
            email: your-email@example.com
            apiTokenSecretRef:
              name: cloudflare-api-token
              key: api-token
```

---

## Demo 2 — Set Up an Internal CA for Service-to-Service TLS

Let's Encrypt certificates are great for public-facing services. But for internal services — a gRPC microservice calling another, a web application talking to its database — you don't need public trust. You need a CA that the cluster trusts, and you need it to issue certificates for service names that don't exist as public DNS records.

cert-manager's CA issuer handles this. You create a root CA, tell cert-manager about it, and then issue certificates for internal services using that CA. Every service that trusts the root CA trusts every certificate it issues.

### Step 1: Create a self-signed ClusterIssuer

A self-signed issuer generates certificates that are signed by the certificate itself — it is its own CA. You use this as a bootstrap step to create the root CA certificate:

```yaml title="selfsigned-issuer.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned
spec:
  selfSigned: {}
```

```sh
kubectl apply -f selfsigned-issuer.yaml
```

### Step 2: Create the root CA certificate

Use the self-signed issuer to create a CA certificate. The `isCA: true` field tells cert-manager this certificate can sign other certificates:

```yaml title="internal-ca.yaml"
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: internal-ca
  namespace: cert-manager    # Store in cert-manager namespace
spec:
  isCA: true
  commonName: internal-ca
  secretName: internal-ca-secret
  duration: 87600h           # 10 years — this is a root CA
  renewBefore: 720h
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned
    kind: ClusterIssuer
```

```sh
kubectl apply -f internal-ca.yaml
kubectl get certificate internal-ca -n cert-manager
#
# NAME          READY   SECRET               AGE
# internal-ca   True    internal-ca-secret   8s
```

### Step 3: Create a CA ClusterIssuer backed by the root CA

Now create a `ClusterIssuer` that uses the root CA Secret you just created. This is the issuer that will sign certificates for your internal services:

```yaml title="internal-ca-issuer.yaml"
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: internal-ca
spec:
  ca:
    secretName: internal-ca-secret   # References the Secret in cert-manager namespace
```

```sh
kubectl apply -f internal-ca-issuer.yaml
kubectl get clusterissuer internal-ca
#
# NAME          READY   AGE
# internal-ca   True    5s
```

### Step 4: Issue a certificate for an internal service

Now issue a certificate for an internal gRPC service. The `dnsNames` use Kubernetes internal DNS names — `<service>.<namespace>.svc.cluster.local`:

```yaml title="payments-cert.yaml"
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: payments-tls
  namespace: production
spec:
  secretName: payments-tls-secret
  issuerRef:
    name: internal-ca
    kind: ClusterIssuer
  commonName: payments.production.svc.cluster.local
  dnsNames:
    - payments.production.svc.cluster.local
    - payments.production.svc
    - payments
  duration: 2160h     # 90 days
  renewBefore: 360h   # Renew 15 days before expiry
```

```sh
kubectl create namespace production
kubectl apply -f payments-cert.yaml
kubectl get certificate payments-tls -n production
#
# NAME           READY   SECRET                AGE
# payments-tls   True    payments-tls-secret   6s
```

The Secret `payments-tls-secret` now contains `tls.crt`, `tls.key`, and `ca.crt`. Mount this into your application pod:

```yaml title="In your Deployment spec"
volumes:
  - name: tls
    secret:
      secretName: payments-tls-secret
containers:
  - name: payments
    volumeMounts:
      - name: tls
        mountPath: /etc/tls
        readOnly: true
```

Your application reads <VPIcon icon="fas fa-folder-open"/>`/etc/tls/`<VPIcon icon="fas fa-key"/>`tls.crt` and <VPIcon icon="fas fa-folder-open"/>`/etc/tls/`<VPIcon icon="fas fa-key"/>`tls.key` to configure TLS. Other services that need to trust it read <VPIcon icon="fas fa-folder-open"/>`/etc/tls/`<VPIcon icon="fas fa-key"/>`ca.crt`.

### Step 5: Distribute the CA bundle with trust-manager

The problem with a custom CA is that every service needs to know about it. cert-manager's companion tool, trust-manager, handles this by distributing the CA bundle as a `ConfigMap` to every namespace:

```sh
helm upgrade trust-manager oci://quay.io/jetstack/charts/trust-manager \
--install \
--namespace cert-manager \
--wait
```

Create a `Bundle` resource that takes the CA certificate from the `internal-ca-secret` and distributes it cluster-wide:

```yaml title="ca-bundle.yaml"
apiVersion: trust.cert-manager.io/v1alpha1
kind: Bundle
metadata:
  name: internal-ca-bundle
spec:
  sources:
    - secret:
        name: internal-ca-secret
        key: ca.crt
  target:
    configMap:
      key: ca-bundle.crt
    namespaceSelector:
      matchLabels:
        # Distribute to all namespaces with this label
        kubernetes.io/metadata.name: production
```

```sh
kubectl apply -f ca-bundle.yaml
```

After a few seconds, every matching namespace has a ConfigMap named `internal-ca-bundle` containing the CA certificate. Applications mount this ConfigMap to trust internally-issued certificates without any per-service configuration.

### Step 6: Verify the certificate chain

```sh
# Extract the CA cert and service cert
kubectl get secret payments-tls-secret -n production \
-o jsonpath='{.data.ca.crt}' | base64 -d > ca.crt

kubectl get secret payments-tls-secret -n production \
-o jsonpath='{.data.tls.crt}' | base64 -d > payments.crt

# Verify the cert was signed by the CA
openssl verify -CAfile ca.crt payments.crt
#
# payments.crt: OK
```

---

## How Certificate Rotation Works

Certificate rotation is the part of certificate management that breaks production clusters most often. cert-manager handles it automatically, but understanding the mechanism helps you tune it and debug it when things go wrong.

cert-manager watches every `Certificate` resource it manages and checks the expiry of the underlying certificate in the Secret. When the remaining validity drops below the `renewBefore` threshold, cert-manager triggers a renewal. The default `renewBefore` is 1/3 of the certificate's total validity period — so a 90-day certificate starts renewing at day 60. The renewal creates a new `CertificateRequest`, goes through the full issuance flow, and updates the Secret in place. The new certificate replaces the old one atomically. Applications that use file mounts and watch for changes (most modern web servers and gRPC frameworks do) will pick up the new certificate without restarting.

```sh
# See the current rotation status
kubectl describe certificate echo-tls -n default
#
# Status:
#   Not After:   2024-06-18T10:00:00Z
#   Not Before:  2024-03-20T10:00:00Z
#   Renewal Time: 2024-05-18T10:00:00Z   # When cert-manager will start renewing
#   Conditions:
#     Type:    Ready
#     Status:  True
#     Message: Certificate is up to date and has not expired
```

If a renewal fails — for example, because the HTTP-01 challenge can't be completed — cert-manager retries with exponential backoff. The existing certificate continues to serve until it actually expires, giving you a window to debug the issue.

To see renewal events in real time:

```sh
kubectl get events -n default --field-selector reason=Issued
kubectl get events -n default --field-selector reason=Failed
```

**Setting** `renewBefore` **correctly:** For public-facing services, 30 days before a 90-day certificate is a sensible buffer. For internal short-lived certificates (24-hour validity), set `renewBefore` to 8 hours so rotation happens well before expiry even if the first attempt fails. Never set `renewBefore` to more than half the certificate's validity — cert-manager will immediately try to renew a certificate it just issued.

---

## Cleanup

```sh
# Remove demo resources
kubectl delete ingress echo -n default
kubectl delete service echo -n default
kubectl delete deployment echo -n default
kubectl delete secret echo-tls -n default
kubectl delete certificate payments-tls -n production
kubectl delete namespace production

# Uninstall cert-manager and trust-manager
helm uninstall trust-manager -n cert-manager
helm uninstall cert-manager -n cert-manager
kubectl delete namespace cert-manager

# Remove ClusterIssuers
kubectl delete clusterissuer letsencrypt-staging letsencrypt-prod \
internal-ca selfsigned 2>/dev/null
```

---

## Conclusion

Kubernetes leaves TLS configuration entirely to you. In this article you worked through both the public and internal sides of that responsibility.

On the public side, you installed cert-manager using the current OCI Helm chart, created a `ClusterIssuer` backed by Let's Encrypt, and watched cert-manager go through the full ACME HTTP-01 challenge flow — from creating a temporary solver pod to storing a valid certificate in a Kubernetes Secret. You saw how switching from staging to production is a one-line annotation change, and how cert-manager renews certificates automatically before they expire.

On the internal side, you bootstrapped a private CA using cert-manager's self-signed issuer, created a `ClusterIssuer` backed by that CA, and issued certificates for internal service names that only exist inside the cluster. You used trust-manager to distribute the CA bundle cluster-wide so services can trust each other's certificates without per-service configuration. And you saw how to verify the certificate chain with `openssl` so you can confirm it's working before deploying to production.

Understanding certificate rotation is what separates teams that manage TLS confidently from teams that get woken up at 3am by an expired certificate. cert-manager automates the renewal, but the `renewBefore` field is your safety margin — set it correctly and know how to read the renewal status.

::: info

All YAML manifests and Helm values from this article are available in the [DevOps-Cloud-Projects GitHub repository (<VPIcon icon="iconfont icon-github"/>`Caesarsage/DevOps-Cloud-Projects`)](https://github.com/Caesarsage/DevOps-Cloud-Projects/tree/main/intermediate/k8/security/cert-manager).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Encrypt Kubernetes Traffic with cert-manager, Let's Encrypt, and Internal TLS",
  "desc": "Most engineers assume their Kubernetes cluster encrypts all of its traffic. It doesn't. The commands you run with kubectl are encrypted — your client and the API server speak TLS. The API server talki",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-encrypt-kubernetes-traffic.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
