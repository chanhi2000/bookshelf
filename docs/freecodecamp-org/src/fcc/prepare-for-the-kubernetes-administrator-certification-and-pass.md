---
lang: en-US
title: "Prepare for the Kubernetes Administrator Certification and Pass"
description: "Article(s) > Prepare for the Kubernetes Administrator Certification and Pass"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Prepare for the Kubernetes Administrator Certification and Pass"
    - property: og:description
      content: "Prepare for the Kubernetes Administrator Certification and Pass"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/prepare-for-the-kubernetes-administrator-certification-and-pass.html
prev: /devops/k8s/articles/README.md
date: 2025-10-29
isOriginal: false
author:
  - name: Beau Carnes
    url : https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761739982392/f255a6af-6ec9-4136-b45f-6f14d4fb2c8c.jpeg
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
  name="Prepare for the Kubernetes Administrator Certification and Pass"
  desc="We just posted a course on the freeCodeCamp.org YouTube channel to help prepare you for the Certified Kubernetes Administrator Certification. This course is designed to provide a deep, practical understanding of Kubernetes administration, from founda..."
  url="https://freecodecamp.org/news/prepare-for-the-kubernetes-administrator-certification-and-pass"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761739982392/f255a6af-6ec9-4136-b45f-6f14d4fb2c8c.jpeg"/>

We just posted a course on the freeCodeCamp.org YouTube channel to help prepare you for the Certified Kubernetes Administrator Certification. This course is designed to provide a deep, practical understanding of Kubernetes administration, from foundational concepts to advanced troubleshooting.

You can watch the course on [<VPIcon icon="fa-brands fa-youtube"/>the freeCodeCamp.org YouTube channel](https://youtu.be/Fr9GqFwl6NM) (2-hour watch).

<VidStack src="youtube/Fr9GqFwl6NM" />

There are many demos in the course using Kubernetes. Below you can find all the commands used in the course so it is easier for you to follow along on your local machine.

---

## CKA Hands-On Companion: Commands and Demos

---

## Part 1: Kubernetes Fundamentals and Lab Setup

This section covers the setup of a single-node cluster using `kubeadm` to create an environment that mirrors the CKA exam.

### Section 1.3: Setting Up Your CKA Practice Environment

#### Step 1: Install a Container Runtime (on all nodes)

```sh :collapsed-lines
# 1. Load required kernel modules:
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
    
sudo modprobe overlay
sudo modprobe br_netfilter

# 2. Configure sysctl for networking:
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward               = 1
EOF
    
sudo sysctl --system

# 3. Install containerd:
sudo apt-get update
sudo apt-get install -y containerd

# 4. Configure containerd for systemd cgroup driver:
sudo mkdir -p /etc/containerd
sudo containerd config default | sudo tee /etc/containerd/config.toml
sudo sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml

# 5. Restart and enable containerd:
sudo systemctl restart containerd
sudo systemctl enable containerd
```

#### Step 2: Install Kubernetes Binaries (on all nodes)

```sh :collapsed-lines
# 1. Disable swap memory:
sudo swapoff -a
# Comment out swap in fstab to make it persistent:
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# 2. Add the Kubernetes apt repository:
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# 3. Install and hold binaries (adjust version as needed):
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

#### Step 3: Configure a Single-Node Cluster (on the control plane)

```sh
# 1. Initialize the control-plane node:
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# 2. Configure kubectl for the administrative user
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 3. Remove the control-plane taint
kubectl taint nodes --all node-role.kubernetes.io/control-plane-

# 4. Install the Flannel CNI plugin
kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml

# 5. Verify the cluster:
kubectl get nodes
kubectl get pods -n kube-system
```

---

## Part 2: Cluster Architecture, Installation & Configuration (25%)

### Section 2.1: Bootstrapping a Multi-Node Cluster with `kubeadm`

#### Initializing the Control Plane (Run on Control Plane node)

```sh :collapsed-lines
# 1. Run `kubeadm init` (Replace `<control-plane-private-ip>`)
sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --apiserver-advertise-address=<control-plane-private-ip>
# Note: Save the `kubeadm join` command from the output.

# 2. Install Calico CNI Plugin:
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml

# 3. Verify Cluster and CNI installation:
kubectl get pods -n kube-system
kubectl get nodes
```

#### Joining Worker Nodes (Run on each Worker node)

```sh :collapsed-lines
# 1. Run the join command saved from** `kubeadm init
# EXAMPLE - Use the exact command from your kubeadm init output
sudo kubeadm join <control-plane-private-ip>:6443 --token <token> \
--discovery-token-ca-cert-hash sha256:<hash>

# 2. Verify the full cluster (from Control Plane node):
kubectl get nodes -o wide
```

### Section 2.2: Managing the Cluster Lifecycle

#### Upgrading Clusters with `kubeadm` (Example: Upgrade to 1.29.)

```sh
# 1. Upgrade Control Plane: Upgrade `kubeadm` binar
sudo apt-mark unhold kubeadm
sudo apt-get update && sudo apt-get install -y kubeadm='1.29.1-1.1'
sudo apt-mark hold kubeadm

# 2. Plan and apply the upgrade (on Control Plane node)
sudo kubeadm upgrade plan
sudo kubeadm upgrade apply v1.29.1

# 3. Upgrade `kubelet` and `kubectl` (on Control Plane node
sudo apt-mark unhold kubelet kubectl
sudo apt-get update && sudo apt-get install -y kubelet='1.29.1-1.1' kubectl='1.29.1-1.1'
sudo apt-mark hold kubelet kubectl
sudo systemctl daemon-reload
sudo systemctl restart kubele

# 4. Upgrade Worker Node: Drain the node (from Control Plane node):
kubectl drain <node-to-upgrade> --ignore-daemonsets

# 5. Upgrade binaries (on Worker Node):
# On the worker node
sudo apt-mark unhold kubeadm kubelet
sudo apt-get update
sudo apt-get install -y kubeadm='1.29.1-1.1' kubelet='1.29.1-1.1'
sudo apt-mark hold kubeadm kubelet

# 6. Upgrade node configuration and restart kubelet (on Worker Node):
# On the worker node
sudo kubeadm upgrade node
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# 7. Uncordon the Node (from Control Plane node):
kubectl uncordon <node-to-upgrade>
```

#### Backing Up and Restoring etcd (Run on Control Plane node)

##### 

```sh
# 1. Perform a Backup (using host `etcdctl`)
# Create the backup directory first
sudo mkdir -p /var/lib/etcd-backup
    
sudo ETCDCTL_API=3 etcdctl snapshot save /var/lib/etcd-backup/snapshot.db \
--endpoints=https://127.0.0.1:2379 \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
--cert=/etc/kubernetes/pki/etcd/server.crt \
--key=/etc/kubernetes/pki/etcd/server.key

# 2. Perform a Restore (on the control plane node):
sudo systemctl stop kubelet       # Stop kubelet to stop static pods
sudo ETCDCTL_API=3 etcdctl snapshot restore \
/var/lib/etcd-backup/snapshot.db \
--data-dir /var/lib/etcd-restored # Restore the snapshot to a new data directory
# !! IMPORTANT: Manually edit /etc/kubernetes/manifests/etcd.yaml to point to the new data-dir /var/lib/etcd-restored !!
sudo systemctl start kubelet      # Restart kubelet to pick up the manifest change
```

### Section 2.3: Implementing a Highly-Available (HA) Control Plane

```sh
# 1. Initialize the First Control-Plane Node (Replace `<load-balancer-address:port>`)
sudo kubeadm init --control-plane-endpoint "load-balancer.example.com:6443" --upload-certs
# Note: Save the HA-specific join command and the `--certificate-key`.

# 2. Join Additional Control-Plane Nodes (Run on the second and third Control Plane nodes):
# EXAMPLE - Use the exact command from your `kubeadm init` output
sudo kubeadm join load-balancer.example.com:6443 --token <token> \
--discovery-token-ca-cert-hash sha256:<hash> \
--control-plane --certificate-key <key>
```

### Section 2.4: Managing Role-Based Access Control (RBAC)

#### Demo: Granting Read-Only Access

##### 1. Create a Namespace and ServiceAccount:

```sh
kubectl create namespace rbac-test
kubectl create serviceaccount dev-user -n rbac-test
```

##### 2. Create the** `Role` manifest (<VPIcon icon="iconfont icon-yaml"/>`role.yaml`)

```yaml title="role.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: rbac-test
  name: pod-reader
rules:
- apiGroups: [""] # "" indicates the core API group
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```

```sh
kubectl apply -f role.yaml
```

##### 3. Create the** `RoleBinding` manifest (<VPIcon icon="iconfont icon-yaml"/>`rolebinding.yaml`)

```yaml title="rolebinding.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: rbac-test
subjects:
- kind: ServiceAccount
  name: dev-user
  namespace: rbac-test
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

```sh
kubectl apply -f rolebinding.yaml
```

##### 4. Verify Permissions

```sh
# Check if the ServiceAccount can list pods (Should be YES)
kubectl auth can-i list pods --as=system:serviceaccount:rbac-test:dev-user -n rbac-test
    
# Check if the ServiceAccount can delete pods (Should be NO)
kubectl auth can-i delete pods --as=system:serviceaccount:rbac-test:dev-user -n rbac-test
```

### Section 2.5: Application Management with Helm and Kustomize

#### Demo: Installing an Application with Helm

```sh
# 1. Add a Chart Repository:
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# 2. Install a Chart with a value override:
helm install my-nginx bitnami/nginx --set service.type=NodePort

# 3. Manage the application:
helm upgrade my-nginx bitnami/nginx --set service.type=ClusterIP
helm rollback my-nginx 1
helm uninstall my-nginx
```

#### Demo: Customizing a Deployment with Kustomize

```sh :collapsed-lines
# 1. Create base manifest (`my-app/base/deployment.yaml`)
mkdir -p my-app/base
cat <<EOF > my-app/base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.25.0
EOF

# 2. Create base Kustomization file (`my-app/base/kustomization.yaml`)
cat <<EOF > my-app/base/kustomization.yaml
resources:
- deployment.yaml
EOF

# 3. Create production overlay and patch:
mkdir -p my-app/overlays/production
cat <<EOF > my-app/overlays/production/patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
EOF
cat <<EOF > my-app/overlays/production/kustomization.yaml
bases:
-../../base
patches:
- path: patch.yaml
EOF

# 4. Apply the overlay (note the `-k` flag for kustomize)
kubectl apply -k my-app/overlays/production

# 5. Verify the change:
kubectl get deployment my-app
```

---

## Part 3: Workloads & Scheduling (15%)

### Section 3.1: Mastering Deployments

#### Demo: Performing a Rolling Update

##### 1. Create a base Deployment manifest (<VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`)

```yaml title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24.0
        ports:
        - containerPort: 80
```

```sh
kubectl apply -f deployment.yaml
```

##### 2. Update the Container Image to trigger the rolling update

```sh
kubectl set image deployment/nginx-deployment nginx=nginx:1.25.0
```

##### 3. Observe the rollout

```sh
kubectl rollout status deployment/nginx-deployment
kubectl get pods -l app=nginx -w
```

#### Executing and Verifying Rollbacks

```sh
# 1. View Revision History:
kubectl rollout history deployment/nginx-deployment

# 2. Roll back to the previous version:
kubectl rollout undo deployment/nginx-deployment

# 3. Roll back to a specific revision (e.g., revision 1):
kubectl rollout undo deployment/nginx-deployment --to-revision=1
```

### Section 3.2: Configuring Applications with ConfigMaps and Secrets

#### Creation Methods

```sh
# 1. ConfigMap: Imperative Creation:
# From literal values
kubectl create configmap app-config --from-literal=app.color=blue --from-literal=app.mode=production
# From a file
echo "retries = 3" > config.properties
kubectl create configmap app-config-file --from-file=config.properties

# 2. Secret: Imperative Creation:
# Kubernetes will automatically base64 encode
kubectl create secret generic db-credentials --from-literal=username=admin --from-literal=password='s3cr3t'
```

#### Demo: Consuming ConfigMaps and Secrets in Pods

##### 1. Manifest: Environment Variables (<VPIcon icon="iconfont icon-yaml"/>`pod-config.yaml`)

```yaml title="pod-config.yaml"
# Assumes app-config-declarative ConfigMap and db-credentials Secret exist
apiVersion: v1
kind: Pod
metadata:
  name: config-demo-pod
spec:
  containers:
  - name: demo-container
    image: busybox
    command: ["/bin/sh", "-c", "env && sleep 3600"]
    env:
      - name: THEME
        valueFrom:
          configMapKeyRef:
            name: app-config-declarative
            key: ui.theme
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: password
  restartPolicy: Never
```

```sh
kubectl apply -f pod-config.yaml
kubectl logs config-demo-pod # Verify
```

##### 2. Manifest: Mounted Volumes (<VPIcon icon="iconfont icon-yaml"/>`pod-volume.yaml`)

```yaml title="pod-volume.yaml"
# Assumes app-config-file ConfigMap exists
apiVersion: v1
kind: Pod
metadata:
  name: volume-demo-pod
spec:
  containers:
  - name: demo-container
    image: busybox
    command: ["/bin/sh", "-c", "cat /etc/config/config.properties && sleep 3600"]
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config-file
  restartPolicy: Never
```

```sh
kubectl apply -f pod-volume.yaml
kubectl logs volume-demo-pod   # Verify
```

### Section 3.3: Implementing Workload Autoscaling

#### Demo: Installing and Verifying the Metrics Server

```sh
# 1. Install the Metrics Server:
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 2. Verify Installation:
kubectl top nodes
kubectl top pods -A
```

#### Demo: Autoscaling a Deployment

```sh
# 1. Create a Deployment with Resource Requests (requires `hpa-demo-deployment.yamlmanifest not provided, use a simple one):
kubectl create deployment php-apache --image=k8s.gcr.io/hpa-example --requests="cpu=200m"
kubectl expose deployment php-apache --port=80

# 2. Create an HPA (target 50% CPU, scale 1-10 replicas):
kubectl autoscale deployment php-apache --cpu-percent=50 --min=1 --max=10

# 3. Generate Load (will run in the background):
kubectl run -it --rm load-generator --image=busybox -- /bin/sh -c "while true; do wget -q -O- http://php-apache; done"

# 4. Observe Scaling:
kubectl get hpa -w # (Stop the load generator to observe scale down)
```

### Section 3.5: Advanced Scheduling

#### Demo: Using Node Affinity

```sh
# 1. Label a Node
kubectl label node <your-worker-node-name> disktype=ssd

# 2. Create a Pod with Node Affinity (requires `affinity-pod.yaml` manifest not providedcreate a dummy pod for the node label):
# Create the pod using the affinity rules
kubectl apply -f affinity-pod.yaml # Or equivalent manifest with node affinity
```

#### Demo: Using Taints and Tolerations

```sh
# 1. Taint a Node (Effect: `NoSchedule`)
kubectl taint node <another-worker-node-name> app=gpu:NoSchedule

# 2. Create a Pod with a Toleration (requires `toleration-pod.yaml` manifest not providedcreate a dummy pod for the taint)
# Create the pod using the toleration rules
kubectl apply -f toleration-pod.yaml # Or equivalent manifest with toleration

# 3. Verify Pod scheduling on the tainted node:
kubectl get pod gpu-pod -o wide
```

---

## Part 4: Services & Networking (20%)

### Section 4.2: Kubernetes Services

#### Demo: Creating a ClusterIP Service

```sh
# 1. Create a Deployment:
kubectl create deployment my-app --image=nginx --replicas=2

# 2. Expose the Deployment with a ClusterIP Service (requires** `clusterip-service.yamlmanifest not provided, use an imperative command):
kubectl expose deployment my-app \
--port=80 --target-port=80 \
--name=my-app-service \
--type=ClusterIP

# 3. Verify Access (inside a temporary Pod):
kubectl run tmp-shell --rm -it --image=busybox -- /bin/sh
# Inside the shell:
# wget -O- my-app-service
```

#### Demo: Creating a NodePort Service

```sh
# 1. Create a NodePort Service (requires `nodeport-service.yaml` manifest not provided, usan imperative command):
kubectl expose deployment my-app \
--port=80 --target-port=80 \
--name=my-app-nodeport \
--type=NodePort

# 2. Verify Access information:
kubectl get service my-app-nodeport
kubectl get nodes -o wide
# Access from outside via <NodeIP>:<NodePort>
```

### Section 4.3: Ingress and the Gateway API

#### Demo: Path-Based Routing with NGINX Ingress

```sh
# 1. Install the NGINX Ingress Controller:
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml

# 2. Deploy Two Sample Applications and Services:
kubectl create deployment app-one --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment app-one --port=8080
kubectl create deployment app-two --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment app-two --port=8080

# 3. Create an Ingress Resource (requires** `ingress.yaml` manifest not provided, use thprovided structure to create the file)
# Apply ingress.yaml
kubectl apply -f ingress.yaml
```

##### 4. Test the Ingress

```sh
INGRESS_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress.ip}')
curl http://$INGRESS_IP/app1
curl http://$INGRESS_IP/app2
```

### Section 4.4: Network Policies

#### Demo: Securing an Application with Network Policies

##### 1. Create a Default Deny-All Ingress Policy (<VPIcon icon="iconfont icon-yaml"/>`deny-all.yaml`)

```yaml title="deny-all.yaml"
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {} # Matches all pods in the namespace
  policyTypes:
  - Ingress
```

```sh
kubectl apply -f deny-all.yaml # Apply
```

##### 2. Deploy a Web Server and a Service

```sh
kubectl create deployment web-server --image=nginx
kubectl expose deployment web-server --port=80
```

##### 3. Attempt connection (will fail)

```sh
kubectl run tmp-shell --rm -it \
--image=busybox \
-- /bin/sh -c "wget -O- --timeout=2 web-server"
```

##### 4. Create an "Allow" Policy (<VPIcon icon="iconfont icon-yaml"/>`allow-web-access.yaml`)

```yaml title="allow-web-access.yaml"
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-access
spec:
  podSelector:
    matchLabels:
      app: web-server
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          access: "true"
    ports:
    - protocol: TCP
      port: 80
```

```sh
kubectl apply -f allow-web-access.yaml # Apply
```

##### 5. Test the "Allow" Policy (connection will succeed):

```sh
kubectl run tmp-shell --rm -it \
--labels=access=true \
--image=busybox \
-- /bin/sh -c "wget -O- web-server"
```

### Section 4.5: CoreDNS

#### Demo: Customizing CoreDNS for an External Domain

##### 1. Edit the CoreDNS ConfigMap:

```sh
kubectl edit configmap coredns -n kube-system
```

##### 2. Add a new server block inside the** `Corefile` data structure (e.g., for `my-corp.com`)

```tcl title="Corefile"
# ... inside the data.Corefile string...
    my-corp.com:53 {
        errors
        cache 30
        forward . 10.10.0.53 # Forward to your internal DNS server
    }
# ...
```

---

## Part 5: Storage (10%)

### Section 5.2: Volume Configuration

#### Static Provisioning Demo

##### 1. Create a PersistentVolume (<VPIcon icon="iconfont icon-yaml"/>`pv.yaml`)

```yaml title="pv.yaml"
# (Using hostPath for local testing)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: task-pv-volume
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual
  hostPath:
    path: "/mnt/data"
```

```sh
kubectl apply -f pv.yaml # Apply
```

##### 2. Create a PersistentVolumeClaim (<VPIcon icon="iconfont icon-yaml"/>`pvc.yaml`)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: task-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi
```

```sh
kubectl apply -f pvc.yaml
```

##### 3. Verify Binding

```sh
kubectl get pv,pvc
```

##### 4. Create a Pod that Uses the PVC (<VPIcon icon="iconfont icon-yaml"/>`pod-storage.yaml`)

```yaml title="pod-storage.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: storage-pod
spec:
  containers:
    - name: nginx
      image: nginx
      volumeMounts:
      - mountPath: "/usr/share/nginx/html"
        name: my-storage
  volumes:
    - name: my-storage
      persistentVolumeClaim:
        claimName: task-pv-claim
```

```sh
kubectl apply -f pod-storage.yaml # Apply
```

### Section 5.3: StorageClasses and Dynamic Provisioning

#### Demo: Using a Default StorageClass

##### 1. Inspect the Available StorageClasses

```sh
kubectl get storageclass
```

##### 2. Create a PVC without a PV (relies on a default StorageClass)

```yaml title="dynamic-pvc.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-dynamic-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

```sh
kubectl apply -f dynamic-pvc.yaml # Apply
```

##### 3. Observe Dynamic Provisioning

```sh
kubectl get pv
```

---

## Part 6: Troubleshooting (30%)

### Section 6.2: Troubleshooting Applications and Pods

#### Debugging Tools for Crashes and Failures

##### 1. Get detailed information on a resource (the most critical debugging command):

```sh
kubectl describe pod <pod-name>
```

##### 2. Check application logs (for current container):

```sh
kubectl logs <pod-name>
```

##### 3. Check application logs (for previous crashed container instance):

```sh
kubectl logs <pod-name> --previous
```

##### 4. Get a shell inside a running container for live debugging:

```sh
kubectl exec -it <pod-name> -- /bin/sh
```

### Section 6.3: Troubleshooting Cluster and Nodes

####

```sh
# 1. Check node status
kubectl get nodes

# 2. Get detailed node information
kubectl describe node <node-name>

# 3. View node resource capacity (for scheduling issues)
kubectl describe node <node-name> | grep Allocatable

# 4. Check the** `kubelet` service status (on the affected node via SSH)
sudo systemctl status kubelet
sudo journalctl -u kubelet -f

# 5. Re-enable scheduling on a cordoned node:
kubectl uncordon <node-name>
```

### Section 6.5: Troubleshooting Services and Networking

```sh
# 1. Check Service and Endpoints (for connectivity issues):
kubectl describe service <service-name>

# 2. Check DNS resolution from a client Pod (from inside the client Pod's shell):
kubectl exec -it client-pod -- nslookup <service-name>

# 3. Check Network Policies (to see if traffic is being blocked):
kubectl get networkpolicy
```

### Section 6.6: Monitoring Cluster and Application Resource Usage

```sh
# 1. Get node resource usage (requires Metrics Server):
kubectl top nodes

# 2. Get Pod resource usage (requires Metrics Server):
kubectl top pods -n <namespace>
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prepare for the Kubernetes Administrator Certification and Pass",
  "desc": "We just posted a course on the freeCodeCamp.org YouTube channel to help prepare you for the Certified Kubernetes Administrator Certification. This course is designed to provide a deep, practical understanding of Kubernetes administration, from founda...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/prepare-for-the-kubernetes-administrator-certification-and-pass.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
