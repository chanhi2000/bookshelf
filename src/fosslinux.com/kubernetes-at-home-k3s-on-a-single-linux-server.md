---
lang: en-US
title: "Kubernetes at Home: k3s on a Single Linux Server (2026)"
description: "Article(s) > Kubernetes at Home: k3s on a Single Linux Server (2026)"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - fosslinux.com
  - devops
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Kubernetes at Home: k3s on a Single Linux Server (2026)"
    - property: og:description
      content: "Kubernetes at Home: k3s on a Single Linux Server (2026)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fosslinux.com/kubernetes-at-home-k3s-on-a-single-linux-server.html
prev: /devops/k8s/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Marcus T.
    url: https://fosslinux.com/author/marcus-t
cover: https://fosslinux.com/wp-content/uploads/2026/06/featured_158174.png
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
  name="Kubernetes at Home: k3s on a Single Linux Server (2026)"
  desc="I installed k3s on Ubuntu 26.04 and built a full Kubernetes homelab. Here is the step-by-step guide covering installation, storage, ingress, monitoring, and when to use k3s vs Docker Compose."
  url="https://fosslinux.com/158174/kubernetes-at-home-k3s-on-a-single-linux-server.htm"
  logo="https://fosslinux.com/favicon.ico"
  preview="https://fosslinux.com/wp-content/uploads/2026/06/featured_158174.png"/>

::: note Marcus’s DevOps Brief

I run k3s on a repurposed Dell OptiPlex in my closet. It hosts my Grafana dashboards, a GitOps-managed homelab, and a few side projects. If you have a spare machine with 4GB of RAM, you can do the same. This guide walks you through every step, from install to monitoring.

:::

Kubernetes has a reputation for being enterprise-grade complexity wrapped in YAML nightmares. That reputation is partly earned. But here is what most homelabbers miss: k3s, the lightweight Kubernetes distribution from Rancher Labs, strips away exactly the parts you do not need while keeping everything that matters. It runs on a single node, installs in under a minute, and uses less than 512MB of RAM at idle.

I spent the last month setting up k3s on an Ubuntu 26.04 LTS box, deploying real workloads, and stress-testing the stack. This is the guide I wish I had when I started.

---

## What Kubernetes Is (and Isn’t) for Homelabs (2026)

Kubernetes manages containers. It decides where to run your applications, restarts them when they crash, scales them up when traffic spikes, and rolls out updates without downtime. In a homelab, the practical value is different from a production data center. You are not scaling to 1,000 nodes. You are running a handful of services on one machine and wanting them to survive reboots, stay updated, and remain accessible.

Kubernetes is **not** the right choice if you are running a single Docker container. Docker Compose handles that perfectly well. Kubernetes shines when you have multiple services that need service discovery, automatic restarts, rolling updates, and a unified way to manage configurations across different applications.

Here is my honest take: if your homelab has fewer than five services, Docker Compose is simpler. If you are past that threshold and want a platform that scales with your ambitions, k3s is the answer.

---

## k3s Installation on Ubuntu 26.04 LTS (2026)

k3s is a CNCF Sandbox project that packages Kubernetes into a single binary under 75MB. It bundles containerd, CoreDNS, Traefik, and metrics-server out of the box. The install script handles systemd service setup automatically.

Before you start, make sure your system meets these minimums: 2 CPU cores, 2GB RAM (4GB recommended), and 10GB of free disk space. I tested on Ubuntu 26.04 LTS with kernel 7.0.0-22-generic.

Open a terminal and run the install command:

```sh
curl -sfL https://get.k3s.io | sh -
# 
# [INFO]  Finding release for channel stable
# [INFO]  Using v1.35.5+k3s1 as release
# [INFO]  Downloading hash https://github.com/k3s-io/k3s/releases/download/v1.35.5%2Bk3s1/sha256sum-amd64.txt
# [INFO]  Downloading binary https://github.com/k3s-io/k3s/releases/download/v1.35.5%2Bk3s1/k3s
# [INFO]  Verifying binary download
# [INFO]  Installing k3s to /usr/local/bin/k3s
```

The install completes in about 30 seconds on a decent connection. k3s downloads the binary, installs it to <VPIcon icon="fas fa-folder-open"/>`/usr/local/bin/k3s`, creates a systemd service, and starts the cluster automatically.

Verify the installation:

::: info Also Read

- [Ubuntu Core 26: Why Immutable Linux Is Moving From IoT to Edge AI](https://fosslinux.com/157135/ubuntu-core-26-why-immutable-linux-is-moving-from-iot-to-edge-ai.htm)

```component VPCard
{
  "title": "Linux Storage Deep Dive: LVM, mdadm, and ZFS RAID (2026)",
  "desc": "I break down LVM, mdadm, and ZFS from the ground up. Compare RAID levels, performance, recovery strategies, and pick the right storage tool for your workload.",
  "link": "/fosslinux.com/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```

```component VPCard
{
  "title": "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)",
  "desc": "I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from.",
  "link": "/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```

:::

```sh
k3s --version
#
# k3s version v1.35.5+k3s1 (6a4781ad)
# go version go1.25.9
kubectl get nodes
#
# NAME     STATUS   ROLES           AGE   VERSION
# ubuntu   Ready    control-plane   34m   v1.35.5+k3s1
```

The single node shows as `Ready` with the `control-plane` role. In a single-node setup, the same machine runs both the control plane and worker workloads.

Check that all system pods are running:

```sh
kubectl get pods -A
#
# NAMESPACE     NAME                                      READY   STATUS      RESTARTS   AGE
# kube-system   coredns-8db54c48d-z9zgw                   1/1     Running     1          34m
# kube-system   local-path-provisioner-5d9d9885bc-qk92x  1/1     Running     0          34m
# kube-system   metrics-server-786d997795-2kxqm           1/1     Running     1          34m
# kube-system   svclb-traefik-0fe69487-d4ct7              2/2     Running     0          34m
# kube-system   traefik-9bcdbbd9-s4gxf                    1/1     Running     0          34m
```

CoreDNS handles internal DNS resolution, metrics-server provides resource usage data, and Traefik is your ingress controller. Everything else is ready for your workloads.

---

## kubectl Basics You Actually Need (2026)

You do not need to memorize hundreds of kubectl commands. Here are the ones I use daily:

```sh
kubectl cluster-info
#
# Kubernetes control plane is running at https://127.0.0.1:6443
# CoreDNS is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
# Metrics-server is running at https://127.0.0.1:6443/api/v1/namespaces/kube-system/services/https:metrics-server:https/proxy
```

The `kubectl get` command is your bread and butter. Use `kubectl get pods -A` to see all pods across namespaces, `kubectl describe pod [name]` to debug issues, and `kubectl logs [name]` to read application output.

When something goes wrong, `kubectl describe` is your best friend. It shows you events, conditions, and resource allocation in one view. I check the Events section at the bottom first, because that is where Kubernetes tells you exactly what went wrong.

---

## Deploying Your First Application (2026)

Let us deploy a real application. I use nginx as the example because it starts fast and gives you a visible result:

```sh
kubectl create deployment nginx-demo --image=nginx:latest --replicas=2
#
# deployment.apps/nginx-demo created
kubectl get pods -l app=nginx-demo -o wide
# 
# NAME                          READY   STATUS    RESTARTS   AGE   IP           NODE
# nginx-demo-5dc66cb97d-ljnbt  1/1     Running   0          10s   10.42.0.11  ubuntu
# nginx-demo-5dc66cb97d-q79xc  1/1     Running   0          10s   10.42.0.10  ubuntu
```

Two replicas are running with their own IP addresses in the cluster network. These IPs are only reachable from inside the cluster. To access the application from your browser, expose it as a NodePort service:

```sh
kubectl expose deployment nginx-demo --port=80 --type=NodePort
#
# service/nginx-demo exposed
kubectl get svc nginx-demo
#
# NAME         TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
# nginx-demo   NodePort   10.43.160.79   <none>        80:31647/TCP   10s
```

Open `http://192.168.144.160:31647` in your browser (replace with your server IP). You should see the nginx welcome page.

::: tip Pro Tip

Use `kubectl port-forward deployment/nginx-demo 8080:80` to test an application locally without exposing it to the network. This is safer for development and debugging.

:::

---

## Persistent Storage with Longhorn (2026)

By default, Kubernetes stores data inside container filesystems. When the container restarts, the data is gone. Longhorn, a CNCF Incubating project, solves this by providing distributed block storage that persists across pod restarts.

::: info Also Read


```component VPCard
{
  "title": "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)",
  "desc": "I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from.",
  "link": "/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
- [Systemd v260 Removed SysV Init: Convert Legacy Scripts (2026)](https://fosslinux.com/157348/systemd-v260-removed-sysv-init-convert-legacy-scripts.htm)

```component VPCard
{
  "title": "Linux Storage Deep Dive: LVM, mdadm, and ZFS RAID (2026)",
  "desc": "I break down LVM, mdadm, and ZFS from the ground up. Compare RAID levels, performance, recovery strategies, and pick the right storage tool for your workload.",
  "link": "/fosslinux.com/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```

:::

Install Longhorn using Helm:

```sh
helm repo add longhorn https://charts.longhorn.io
#
# "longhorn" has been added to your repositories
helm repo update
#
# Hang tight while we grab the latest from your chart repositories...
# ...Successfully got an update from the "longhorn" chart repository
kubectl create namespace longhorn-system
#
# namespace/longhorn-system created
helm install longhorn longhorn/longhorn \\
--namespace longhorn-system \\
--set defaultSettings.defaultReplicaCount=1
#
# NAME: longhorn
# ...
# STATUS: deployed
```

The `defaultReplicaCount=1` setting is important for single-node setups. Longhorn normally replicates data across three nodes for redundancy. On one node, a single replica is the correct choice.

After Longhorn is running, create a PersistentVolumeClaim and attach it to a StatefulSet:

```sh
kubectl get storageclass
#
# NAME                   PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE
# local-path (default)   rancher.io/local-path   Delete          WaitForFirstConsumer
# longhorn               driver.longhorn.io      Delete          Immediate
kubectl get pvc
#
# NAME       STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS
# demo-pvc   Bound     pvc-...  1Gi        RWO            longhorn
```

The `longhorn` StorageClass is now available. Any PersistentVolumeClaim that references it will get a persistent volume backed by Longhorn.

::: important Insight

Longhorn v1.12.0, released in June 2026, marks the V2 Data Engine as Generally Available. The V2 engine uses NVMe-TCP for better performance, but it requires more RAM. For homelabs with limited resources, the V1 engine (the default) is still the better choice.

:::

---

## Ingress with Traefik (2026)

k3s bundles Traefik as its default ingress controller. This means you do not need to install an ingress controller separately. Traefik watches for Ingress and IngressRoute resources and routes external traffic to your services.

Check that Traefik is running:

```sh
kubectl get pods -n kube-system | grep traefik
#
# svclb-traefik-0fe69487-d4ct7   2/2     Running   0   34m
# traefik-9bcdbbd9-s4gxf         1/1     Running   0   34m
kubectl get svc -n kube-system traefik
#
# NAME      TYPE           CLUSTER-IP     EXTERNAL-IP       PORT(S)
# traefik   LoadBalancer   10.43.171.22   192.168.144.160   80:31216/TCP,443:32266/TCP
```

Traefik is exposed as a LoadBalancer service with the VM’s IP address. Create an IngressRoute to route traffic to your nginx deployment:

```sh
kubectl apply -f - <<'EOF'
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: nginx-ingress
spec:
  entryPoints:
    - web
  routes:
    - match: Host(`nginx.local`)
      kind: Rule
      services:
        - name: nginx-demo
          port: 80
EOF
#
# ingressroute.traefik.io/nginx-ingress created
kubectl get ingressroute nginx-ingress
#
# NAME            AGE
# nginx-ingress   3s
```

Add `192.168.144.160 nginx.local` to your <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`hosts` file, then visit `http://nginx.local`. Traefik routes the request to your nginx pods.

---

## HTTPS with cert-manager (2026)

For production homelab services, you want HTTPS. cert-manager automates Let’s Encrypt certificate issuance and renewal inside Kubernetes.

Install cert-manager from the official manifests:

::: info Also Read


```component VPCard
{
  "title": "Linux Storage Deep Dive: LVM, mdadm, and ZFS RAID (2026)",
  "desc": "I break down LVM, mdadm, and ZFS from the ground up. Compare RAID levels, performance, recovery strategies, and pick the right storage tool for your workload.",
  "link": "/fosslinux.com/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```

```component VPCard
{
  "title": "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)",
  "desc": "I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from.",
  "link": "/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
- [Ubuntu Core 26: Why Immutable Linux Is Moving From IoT to Edge AI](https://fosslinux.com/157135/ubuntu-core-26-why-immutable-linux-is-moving-from-iot-to-edge-ai.htm)

:::

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.20.2/cert-manager.yaml
#
# namespace/cert-manager created
# customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
# ...
# deployment.apps/cert-manager created
# deployment.apps/cert-manager-webhook created
kubectl get pods -n cert-manager
#
# NAME                                      READY   STATUS    RESTARTS   AGE
# cert-manager-68756bcf6f-wng5x             1/1     Running   1          45s
# cert-manager-cainjector-c664cf9b8-2jn62   1/1     Running   1          45s
# cert-manager-webhook-5749c6dc95-467v2     1/1     Running   1          45s
```

Create a ClusterIssuer that points to Let’s Encrypt staging (use the production URL once you have confirmed it works):

```sh
kubectl apply -f - <<'EOF'
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: test@fosslinux.com
    privateKeySecretRef:
      name: letsencrypt-staging
    solvers:
    - http01:
        ingress:
          class: traefik
EOF
#
# clusterissuer.cert-manager.io/letsencrypt-staging created
kubectl get clusterissuer letsencrypt-staging
#
# NAME                  READY   AGE
# letsencrypt-staging   True    5s
```

The ClusterIssuer becomes `Ready` within seconds. Reference it in your IngressRoute annotations to get automatic TLS certificates.

::: important Why It Matters

Without cert-manager, you would need to manually request, install, and renew TLS certificates for every service. cert-manager handles the entire lifecycle automatically, which is essential for a homelab where you do not want to remember renewal dates.

:::

---

## GitOps with Flux and ArgoCD (2026)

GitOps is the practice of storing your Kubernetes manifests in a Git repository and using a tool to automatically reconcile the cluster state with the repository. Flux (CNCF Graduated) and ArgoCD (CNCF Incubating) are the two leading options.

For a single-node homelab, I recommend Flux. It is lighter weight, runs as a set of controllers inside your cluster, and does not require a separate web UI to function. ArgoCD is better if you want a visual dashboard and are managing multiple clusters.

The core concept is the same for both: you push a YAML manifest to Git, the controller detects the change, and the cluster converges to match the desired state. If someone manually changes something in the cluster (called “drift”), the controller reverts it automatically.

For a homelab, this means you can version-control your entire infrastructure. Want to add a new service? Push a manifest. Want to roll back? Revert the commit. Your Git history becomes your audit log.

---

## Monitoring with Prometheus Stack (2026)

The kube-prometheus-stack Helm chart bundles Prometheus, Grafana, Alertmanager, and node-exporter into a single installation. It provides pre-built dashboards for cluster monitoring.

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
#
# "prometheus-community" has been added to your repositories
helm install prometheus prometheus-community/kube-prometheus-stack \\
--namespace monitoring \\
--set grafana.enabled=true \\
--set prometheus.prometheusSpec.retention=7d
#
# NAME: prometheus
# ...
# STATUS: deployed
kubectl get pods -n monitoring
#
# NAME                                                     READY   STATUS    RESTARTS   AGE
# alertmanager-prometheus-kube-prometheus-alertmanager-0   2/2     Running   0          92s
# prometheus-grafana-7c8679c986-6fpmn                      3/3     Running   0          95s
# prometheus-kube-prometheus-operator-857fcf6d94-p2g2c     1/1     Running   1          95s
# prometheus-kube-state-metrics-79ff744748-wg657           1/1     Running   0          95s
# prometheus-prometheus-kube-prometheus-prometheus-0       2/2     Running   0          91s
# prometheus-prometheus-node-exporter-bw54k                1/1     Running   1          95s
```

Access Grafana by port-forwarding:

```sh
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
#
# Forwarding from 127.0.0.1:3000 -> 80
```

Open `http://localhost:3000` in your browser. The default credentials are `admin` / `prom-operator`. The pre-built dashboards show CPU, memory, disk, and network usage for every pod and node in your cluster.

::: note Worth Knowing

The Prometheus stack uses significant memory. On my 3.3GB VM, the monitoring namespace alone consumed about 800MB. If your homelab server has limited RAM, consider disabling Grafana or reducing the retention period to save resources.

:::

---

## Scaling Considerations for Homelabs (2026)

In a single-node setup, scaling means allocating more resources to existing pods, not adding new nodes. Use resource requests and limits to prevent one application from starving others:

::: info Also Read


```component VPCard
{
  "title": "Linux Storage Deep Dive: LVM, mdadm, and ZFS RAID (2026)",
  "desc": "I break down LVM, mdadm, and ZFS from the ground up. Compare RAID levels, performance, recovery strategies, and pick the right storage tool for your workload.",
  "link": "/fosslinux.com/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
- [Ubuntu Core 26: Why Immutable Linux Is Moving From IoT to Edge AI](https://fosslinux.com/157135/ubuntu-core-26-why-immutable-linux-is-moving-from-iot-to-edge-ai.htm)

```component VPCard
{
  "title": "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)",
  "desc": "I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from.",
  "link": "/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```

:::

```sh
kubectl apply -f - <<'EOF'
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: nginx
    image: nginx:latest
    resources:
      requests:
        memory: "64Mi"
        cpu: "100m"
      limits:
        memory: "128Mi"
        cpu: "250m"
EOF
#
# pod/resource-demo created
kubectl describe pod resource-demo | grep -A 5 "Limits\\|Requests"
#
#     Limits:
#       cpu:     250m
#       memory:  128Mi
#     Requests:
#       cpu:        100m
#       memory:     64Mi
```

Resource requests tell Kubernetes how much the pod needs to run. Resource limits tell it the maximum it can use. If a pod exceeds its memory limit, Kubernetes kills it. If it exceeds its CPU limit, it gets throttled but not killed.

For a homelab, I recommend setting requests to what the application actually needs and limits to about 1.5x that value. This gives Kubernetes enough information to schedule pods efficiently while leaving headroom for traffic spikes.

---

## k3s vs Docker Compose vs Podman Quadlet (2026)

This is the comparison every homelabber asks about. Here is my honest breakdown:

**Docker Compose** is the simplest option. You write a YAML file, run `docker compose up`, and your services start. It handles networking between containers, volume mounts, and environment variables. The downside is that it has no built-in health checking, no automatic restarts beyond Docker’s `restart: always`, and no built-in service discovery. For 1-4 services on a single machine, it is perfect.

**Podman Quadlet** is Podman’s answer to Docker Compose, but integrated with systemd. Each container gets its own systemd unit file, which means native logging, dependency management, and service control. It is a great choice if you want rootless containers and systemd integration without the overhead of Kubernetes.

**k3s** is the right choice when you need service discovery, rolling updates, automatic scaling, and a unified API for managing all your workloads. The overhead is real: k3s uses about 400-500MB of RAM at idle, and you need to learn kubectl. But the payoff is a platform that grows with your homelab.

My recommendation: start with Docker Compose. When you find yourself managing more than five services and wishing they could discover each other automatically, migrate to k3s. You do not have to choose one forever.

---

## Frequently Asked Questions (2026)

::: details Can k3s run on a Raspberry Pi?

Yes. k3s supports ARM64 and ARMv7. The official install script detects your architecture automatically. A Raspberry Pi 4 with 4GB of RAM runs k3s comfortably.

:::

::: details How much RAM does k3s use at idle?

On my Ubuntu 26.04 test VM, k3s and its system pods used approximately 400MB at idle. With Prometheus monitoring installed, total cluster RAM usage was around 1.2GB.

:::

::: details Can I add more nodes later?

Yes. k3s supports multi-node clusters. Run the install script on a second machine with the `--server` flag pointing to your first node, and it joins the cluster automatically.

:::

::: info Also Read

- [Ubuntu Core 26: Why Immutable Linux Is Moving From IoT to Edge AI](https://fosslinux.com/157135/ubuntu-core-26-why-immutable-linux-is-moving-from-iot-to-edge-ai.htm)

```component VPCard
{
  "title": "Linux Storage Deep Dive: LVM, mdadm, and ZFS RAID (2026)",
  "desc": "I break down LVM, mdadm, and ZFS from the ground up. Compare RAID levels, performance, recovery strategies, and pick the right storage tool for your workload.",
  "link": "/fosslinux.com/linux-storage-deep-dive-lvm-mdadm-and-zfs-raid.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
- [Systemd v260 Removed SysV Init: Convert Legacy Scripts (2026)](https://fosslinux.com/157348/systemd-v260-removed-sysv-init-convert-legacy-scripts.htm)

:::

::: details What happens if my server reboots?

k3s runs as a systemd service with `Restart=always`. When your server boots, k3s starts automatically, and your workloads resume. Persistent volumes from Longhorn survive reboots.

:::

::: details Is k3s production-ready?

k3s is a CNCF Sandbox project used in production by thousands of organizations. For a homelab, it is more than sufficient. For enterprise workloads requiring high availability, you would add multiple server nodes and an external database.

:::

---

## Conclusion

k3s turns a single Linux server into a full Kubernetes platform. The install is fast, the overhead is manageable, and the ecosystem of tools (Longhorn, Traefik, cert-manager, Prometheus) gives you everything you need for a production-like homelab experience.

The biggest mistake I see homelabbers make is treating Kubernetes as an all-or-nothing choice. You do not need to migrate everything at once. Start with one service, learn kubectl, and expand from there. The skills you gain with k3s transfer directly to production Kubernetes environments, which makes this not just a homelab project but a career investment.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kubernetes at Home: k3s on a Single Linux Server (2026)",
  "desc": "I installed k3s on Ubuntu 26.04 and built a full Kubernetes homelab. Here is the step-by-step guide covering installation, storage, ingress, monitoring, and when to use k3s vs Docker Compose.",
  "link": "https://chanhi2000.github.io/bookshelf/fosslinux.com/kubernetes-at-home-k3s-on-a-single-linux-server.htm.html",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
