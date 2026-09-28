---
lang: en-US
title: "How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab"
description: "Article(s) > How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab"
icon: iconfont icon-k8s
category:
  - Python
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab"
    - property: og:description
      content: "How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-a-stuck-kubernetes-rollout-with-a-hands-on-lab.html
prev: /devops/k8s/articles/README.md
date: 2026-10-01
isOriginal: false
author:
  - name: Praneeth Kodumagulla
    url: https://freecodecamp.org/news/author/praneethhere/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3864c1c8-994c-4f98-9833-47a9bb34e15d.png
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

[[toc]]

---

<SiteInfo
  name="How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab"
  desc="You update a Deployment, run kubectl rollout status, and wait. The command times out. But when you send a request to the Service, it still answers. So did the update finish? And if it didn't, which Po"
  url="https://freecodecamp.org/news/how-to-debug-a-stuck-kubernetes-rollout-with-a-hands-on-lab"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3864c1c8-994c-4f98-9833-47a9bb34e15d.png"/>

You update a Deployment, run `kubectl rollout status`, and wait. The command times out. But when you send a request to the Service, it still answers. So did the update finish? And if it didn't, which Pods are serving your traffic?

You'll investigate that situation in a disposable Kubernetes lab. Starting from a healthy application, you'll introduce three failures: an image that can't be pulled, a readiness probe that never passes, and a Pod that can't be scheduled. You'll identify the blocked revision, inspect its evidence, and verify recovery before moving on.

In the recorded image failure, the deployment reported both of these conditions. This table is derived from its JSON snapshot:

| Condition | Status | Reason |
| --- | --- | --- |
| Available | True | `MinimumReplicasAvailable` |
| Progressing | False | `ProgressDeadlineExceeded` |

Those conditions answer different questions. The following experiments show why an application can still answer requests while its update is stuck.

---

## How to Set Up the Lab

You should be familiar with containers, Deployments, ReplicaSets, Pods, Services, and basic `kubectl` commands. The lab uses kind to run a single Kubernetes node inside a Docker container.

The recorded environment was:

| Component | Version or configuration |
| --- | --- |
| Host | macOS 15.7.4, Apple silicon, 16 GiB RAM |
| Colima | 0.10.3, Docker runtime, 4 CPUs, about 5.77 GiB visible to Docker |
| Docker | Client 29.4.3, server 29.2.1 |
| kind | 0.33.0 |
| kubectl | 1.36.0 |
| Kubernetes server | 1.37.0 |

The companion scripts require macOS ARM64 with Colima and kind 0.33.0. I didn't test Linux, Windows, and Intel machines. These memory figures describe the test machine, they're not minimum requirements.

You should already have Docker CLI, Colima, kind, and kubectl installed, with Colima running and internet access to Docker Hub.

Download the [companion code here (<VPIcon icon="iconfont icon-github"/>`praneethhere/fcc-rollout-lab`)](https://github.com/praneethhere/fcc-rollout-lab/). Extract it into a fresh directory and open that directory in Terminal. Start Bash, which is the shell I'm using, then run setup:

```sh
bash
bash setup.sh
```

Setup creates the `fcc-rollout-lab` cluster and `rollout-lab` namespace. It writes credentials to `./kubeconfig`, mounts the application source through an immutable ConfigMap, and creates the Deployment, Service, and an `http-client` Pod. No custom image build is needed.

It then verifies v1 and v2, saving snapshots and HTTP responses in an evidence archive. Setup refuses to overwrite an existing lab cluster or local kubeconfig. The node image and Python image are pinned by digest in the source.

After setup succeeds, define this function from the companion directory:

```sh
LAB_ROOT="$PWD"
k() {
  kubectl --kubeconfig "$LAB_ROOT/kubeconfig" \
    --context kind-fcc-rollout-lab \
    --namespace rollout-lab "$@"
}
```

The companion also includes `failures.sh`, an automated reproduction of the cases and checks. Follow the commands below for the manual walkthrough. The automated runner is an alternative way to reproduce the sequence.

Here, `k` is a Bash function that runs `kubectl` with this lab’s kubeconfig, context, and namespace already selected. For example, `k get pods` lists Pods in the lab. Run the definition above once in this Bash terminal, and keep using the same terminal and companion directory throughout the walkthrough.

---

## How to Establish a Healthy Rollout

Before you break anything, establish that the rollout path and Service work. Setup performs a v1-to-v2 update by changing only the `APP_VERSION` environment variable in the Pod template.

The application is a small Python HTTP server. `GET /` returns its configured version and Pod name, and `/ready` returns HTTP 200. Every other path returns HTTP 404. The Pod name comes from `metadata.name` through the downward API.

Here's the routing logic from <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-python"/>`server.py`:

```py title="app/server.py"
if self.path == "/":
    status = 200
    payload = {
        "version": os.environ["APP_VERSION"],
        "pod": os.environ.get("POD_NAME", "local-test"),
    }
elif self.path == "/ready":
    status = 200
    payload = {"ready": True}
else:
    status = 404
    payload = {"error": "unknown path"}
```

The readiness probe checks `/ready` on port 8080. These settings come from the Deployment's `spec` in <VPIcon icon="fas fa-folder-open"/>`manifests/`<VPIcon icon="iconfont icon-yaml"/>`deployment.yaml`. This is an excerpt, not a standalone manifest:

```yaml title="manifests/deployment.yaml"
replicas: 2
minReadySeconds: 5
progressDeadlineSeconds: 180
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 0
    maxSurge: 1
```

With these [<VPIcon icon="iconfont icon-k8s"/>rollout settings](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), the controller can add one replacement Pod. It waits for replacement availability before reducing the two healthy old replicas. A new Pod must remain Ready for five seconds to count as available. The progress deadline is 180 seconds.

`maxUnavailable: 0` constrains this rollout. It doesn't protect the old Pods from unrelated failures. Terminating Pods can also remain visible beyond the active replica counts. These settings are teaching choices, not a production availability guarantee.

The recorded controls each completed successfully and returned ten correct Service responses. This table is derived from the two Deployment snapshots:

| Control | Revision | Updated | Ready | Available | Correct HTTP responses |
| --- | --- | --- | --- | --- | --- |
| v1 | 1 | 2 | 2 | 2 | 10/10 |
| v2 | 2 | 2 | 2 | 2 | 10/10 |

For example, the decoded response body of one recorded v2 request was:

```json
{"version": "v2", "pod": "rollout-demo-5b4b45f68f-qrntz"}
```

Your Pod names will differ. Check your current state:

```sh
k get deployment rollout-demo -o json
k get pods -l app=rollout-demo -o wide
```

Before continuing, wait until exactly two application Pods remain, both Ready and neither terminating. The Deployment should have two updated, ready, and available replicas, with `status.observedGeneration` matching `metadata.generation`.

All subsequent failures leave `APP_VERSION=v2`. That makes the response's Pod name essential: the version alone can't distinguish the previous revision from the new one.

---

## How to Diagnose an Image-Pull Failure

The first failure changes only the image reference to a deliberately missing tag in the public Python repository:

```sh
k apply -f failure-lab/manifests/image.json
k rollout status deployment/rollout-demo --timeout=10s
```

The short watch in the recorded run exited with code 1 and this error:

```text
error: timed out waiting for the condition
```

This is expected for the exercise. Authentication, connection, or other errors require a different diagnosis. Don't treat every nonzero exit as the intended result.

### Find the Blocked Revision

Inspect the Deployment and its related objects:

```sh
k get deployment rollout-demo
k get deployment rollout-demo -o json
k describe deployment rollout-demo
k get replicasets -l app=rollout-demo -o wide
k get pods -l app=rollout-demo -o wide
```

Compare `metadata.generation` with `status.observedGeneration`. If the latter is lower, the controller hasn't yet observed the current desired state. Recheck before interpreting its rollout status.

The recorded fault snapshot contained three replicas: one updated, two ready, and two available. A healthy-looking ready count can therefore come entirely from the previous revision.

`kubectl describe deployment` identifies the `NewReplicaSet`. Inspect that ReplicaSet and the unready Pod it owns. Replace both values below with names from your output:

```sh
NEW_RS='replace-with-the-new-replicaset-name'
BAD_POD='replace-with-its-unready-pod-name'
k get replicaset "$NEW_RS" -o json
k get pod "$BAD_POD" -o json
k describe pod "$BAD_POD"
```

In the ReplicaSet's `metadata.ownerReferences`, the entry with `controller: true` must name the Deployment's UID. In the Pod's owner references, the controller UID must match that ReplicaSet's UID. The new ReplicaSet's template matches the Deployment's current template apart from the generated template-hash label. Its revision annotation matches the Deployment's revision.

Labels narrow your search. The UID ownership chain establishes which objects belong together. See the [<VPIcon icon="iconfont icon-k8s"/>owner-reference documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/owners-dependents/) for the underlying relationship.

### Read the Failure Message

Get Events for this exact Pod instance:

```sh
POD_UID="$(
  k get pod "$BAD_POD" -o jsonpath='{.metadata.uid}'
)"
k get events --field-selector "involvedObject.uid=$POD_UID" \
--sort-by=.metadata.creationTimestamp -o yaml
```

The image Pod was scheduled: `PodScheduled=True`, with `nodeName` set. Its container was waiting with `ErrImagePull`, followed by `ImagePullBackOff` between retries. The Pod phase remained `Pending`. The registry error ended with this exact text:

```text
docker.io/library/python:fcc-rollout-missing-20260928: not found
```

That message identifies the missing tag. Image-pull errors can also result from registry credentials, throttling, DNS, or network problems. Diagnose the Event message rather than assuming every `ImagePullBackOff` has the same cause.

Also distinguish the kubectl STATUS display from the Pod's phase. `ImagePullBackOff` is a container waiting reason, while `Pending` is the phase. The [<VPIcon icon="iconfont icon-k8s"/>Pod lifecycle reference](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/) explains the distinction.

### Check Which Pods Serve Requests

Inspect the Service's EndpointSlices and send requests through the Service from inside the cluster:

```sh
k get endpointslices -l kubernetes.io/service-name=rollout-demo -o json
k exec --pod-running-timeout=30s --request-timeout=60s http-client -- \
  python -u /app/probe.py --url http://rollout-demo:8080/ \
  --expected-version v2 --count 10 --interval 0.2
```

The probe checks the status and version and records the responding Pod's name. Compare those names with the previous healthy ReplicaSet's Pods. Compare the EndpointSlice `targetRef.uid` values with their UIDs too.

In the recorded run, all ten responses came from the two previous-revision Pods. Their EndpointSlice entries were ready. The blocked image Pod was also listed, but its endpoint had `ready: false` and `serving: false`.

The new Pod couldn't become available, so the controller retained both healthy old replicas. The Service samples confirmed that those Pods answered. Ten successful requests establish what happened during those samples. They don't prove uninterrupted service between measurements.

---

## How to Distinguish Two Timeouts

The first timeout came from your terminal. `kubectl rollout status --timeout=10s` stopped waiting after its client-side timeout. It didn't cancel the update or restore the previous configuration. The [<VPIcon icon="iconfont icon-k8s"/>command reference](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_rollout/kubectl_rollout_status/) describes that watch timeout.

The second belongs to the Deployment controller. Wait for its deadline reason, then inspect the full conditions:

```sh
k wait --for=jsonpath='{.status.conditions[?(@.type=="Progressing")].reason}'=ProgressDeadlineExceeded \
  deployment/rollout-demo --timeout=240s
k get deployment rollout-demo -o json
```

The 240-second timeout bounds this separate wait. Confirm that `Progressing` is `False` with reason `ProgressDeadlineExceeded`. The [<VPIcon icon="iconfont icon-k8s"/>kubectl wait reference](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_wait/) documents JSONPath waits.

In the original recording, the Progressing condition's last-update time changed from `04:57:14Z` to `05:00:15Z`: 181 seconds, with a configured deadline of 180. Controller timing isn't a promise of an exact wall-clock interval.

`Available=True` remained because the old Pods still supplied the required availability. `Progressing=False` reported the stalled update. Conversely, `Progressing=True` can also remain after a successful rollout, so always read its reason and the replica counts.

The [<VPIcon icon="iconfont icon-k8s"/>Deployment controller reports the deadline without automatically rolling back](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#failed-deployment). The missing image was still the desired image in the deadline snapshot.

Repeat the Service check now. All ten recorded requests after the deadline also came from the old Pods. Only the image case waits for the controller deadline in this tutorial.

---

## How to Restore the Healthy Configuration

Recover now, before introducing another failure. Keep `BAD_POD` set to the failed Pod you just inspected:

```sh
k apply -f failure-lab/manifests/healthy.json
k rollout status deployment/rollout-demo --timeout=300s
k wait --for=delete "pod/$BAD_POD" --timeout=120s
k get deployment rollout-demo -o json
k get replicasets -l app=rollout-demo -o wide
k get pods -l app=rollout-demo -o wide
k get endpointslices -l kubernetes.io/service-name=rollout-demo -o json
k exec --pod-running-timeout=30s --request-timeout=60s http-client -- \
  python -u /app/probe.py --url http://rollout-demo:8080/ \
  --expected-version v2 --count 10 --interval 0.2
```

Check the whole recovery, not just the rollout command's success. The desired spec should match `healthy.json`. The controller must have observed it, with replicas, updated replicas, ready replicas, and available replicas all equal to two.

Exactly two application Pods should remain, both owned by the current ReplicaSet, Ready, and not terminating. Their UIDs should be the ready Service endpoints, and the HTTP samples should return v2 from those Pod names.

In the original experiment, recovery reused the existing healthy ReplicaSet and the same two Pods. Their template already matched the restored configuration. The failed ReplicaSet scaled to zero.

Revision annotations changed even though those healthy Pods remained. These values are from the recorded run:

| Case | Before failure | Failed revision | After recovery |
| --- | --- | --- | --- |
| Image | 2 | 3 | 4 |
| Readiness | 4 | 5 | 6 |
| Scheduling | 6 | 7 | 8 |

Your numbers can differ. Restore the known healthy specification rather than relying on these example revision numbers.

---

## How to Diagnose Failed Readiness

After verifying recovery, apply the second failure:

```sh
k apply -f failure-lab/manifests/readiness.json
k rollout status deployment/rollout-demo --timeout=10s
```

This changes only `readinessProbe.httpGet.path`, from `/ready` to `/not-ready`. The short watch times out again.

Repeat the inspection sequence from the image case. Identify the new ReplicaSet, reset `NEW_RS` and `BAD_POD` to this case's names, and query Events using the new Pod UID. This time the container runs, but the Pod isn't Ready.

The following values are derived from the recorded Pod snapshot:

| Field | Value |
| --- | --- |
| Phase | Running |
| PodScheduled | True |
| Ready | False |
| Container restart count | 0 |

The Pod's Event message explains why:

```text
Readiness probe failed: HTTP probe failed with statuscode: 404
```

The app has no handler for `/not-ready`. HTTP probes accept responses from 200 through 399, so this 404 fails the readiness check. A failing readiness probe leaves the container running while marking it unready and continuing to probe. See the [<VPIcon icon="iconfont icon-k8s"/>probe documentation](https://kubernetes.io/docs/concepts/workloads/pods/probes/).

The recording also had brief startup `connection refused` Events. Those alone wouldn't establish this fault: they can occur before a healthy server begins listening. The later 404 demonstrates that this server answered the request. Combined with the single changed field and the known routes, it identifies the wrong probe path.

The failed readiness check didn't restart the container. The captured restart count was zero. This case wasn't a crash loop.

Repeat the EndpointSlice and Service checks. The new Pod remained listed in the recorded EndpointSlice with `ready: false`, `serving: false`, and `terminating: false`. The two old Pods had ready endpoints, and all ten responses came from them.

This Service doesn't enable `publishNotReadyAddresses`. Endpoint readiness and termination settings matter, so avoid generalizing this observation to every Service configuration. The [<VPIcon icon="iconfont icon-k8s"/>EndpointSlice documentation](https://kubernetes.io/docs/concepts/services-networking/endpoint-slices/) describes those conditions and exceptions.

For related background, freeCodeCamp's [**Kubernetes self-healing tutorial**](/freecodecamp.org/kubernetes-self-healing-explained.md) also explores readiness. Here, the failed probe explains why a new rollout can't finish.

Run the complete recovery sequence again, using this readiness Pod as `BAD_POD`. Verify healthy v2 before proceeding.

---

## How to Diagnose a Placement Constraint

The third failure adds this selector to the Pod template:

```yaml
nodeSelector:
  rollout-lab.example.com/placement: no-matching-node
```

Check that it matches no node, then apply it:

```sh
k get nodes -l rollout-lab.example.com/placement=no-matching-node
k apply -f failure-lab/manifests/scheduling.json
k rollout status deployment/rollout-demo --timeout=10s
```

If the first command lists a node, the intended unmatched-selector scenario doesn't hold. Inspect the label configuration before continuing.

Repeat the ownership and Event checks, updating `NEW_RS`, `BAD_POD`, and `POD_UID` for this case. The new Pod is `Pending`, just as in the image failure. But `Pending` covers both waiting for scheduling and waiting for container setup, including image downloads.

These are the recorded differences:

| Evidence | Image failure | Scheduling failure |
| --- | --- | --- |
| PodScheduled | True | False, reason Unschedulable |
| nodeName | Lab node assigned | Absent |
| containerStatuses | Waiting container | Absent |
| Diagnostic Event | Image pull failed | FailedScheduling |

The scheduling Event said:

```text
0/1 nodes are available: 1 node(s) didn't match Pod's node affinity/selector. preemption: 0/1 nodes are available: 1 Preemption is not helpful for scheduling.
```

No node satisfied the selector, so the Pod was never assigned to a kubelet. Image retrieval had not begun. Kubernetes requires nodes to match every specified `nodeSelector` label, as the [<VPIcon icon="iconfont icon-k8s"/>node-selection documentation](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) explains.

Repeat the Service checks. This unscheduled Pod had no Pod IP or EndpointSlice entry. The old Pods supplied all ten recorded responses.

Apply the complete recovery sequence once more, using this scheduling Pod as `BAD_POD`. Confirm healthy v2 and correct Service responses. The experiment tests a selector mismatch, not resource exhaustion or every possible scheduling failure.

---

## How to Clean Up

After saving your evidence, delete the disposable lab:

```sh
bash cleanup.sh
```

The script selects Colima's Docker context and deletes `fcc-rollout-lab`, passing the lab's kubeconfig explicitly. It records the result and checks that other kind cluster names remain unchanged. This removes the lab workloads.

Evidence archives remain in the local companion directory. To run the tutorial again, use a fresh extraction after cleanup; setup intentionally refuses to reuse the old kubeconfig.

---

## Conclusion

Three different faults stopped the new revision while the previous revision continued answering the recorded requests:

| Case | Where it stopped | Strongest evidence | Successful fault-state samples |
| --- | --- | --- | --- |
| Image | Container image retrieval | Scheduled Pod; missing-tag error | 20/20 across two batches |
| Readiness | Readiness check | Running Pod; HTTP 404; Ready=False | 10/10 |
| Scheduling | Node selection | PodScheduled=False; selector mismatch | 10/10 |

For your next stalled rollout, follow ownership from the Deployment to its ReplicaSet and Pod. Check whether the Pod was scheduled, whether the container started, and whether it became Ready. Use its conditions and Events to locate the failure, then use Service responses to establish which Pods actually answered.

Finally, distinguish a client watch timeout from a controller progress deadline, and verify the full recovery before drawing conclusions. These results came from a single-node local lab and finite HTTP samples. They don't establish production behavior or continuous availability.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Debug a Stuck Kubernetes Rollout with a Hands-On Lab",
  "desc": "You update a Deployment, run kubectl rollout status, and wait. The command times out. But when you send a request to the Service, it still answers. So did the update finish? And if it didn't, which Po",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-debug-a-stuck-kubernetes-rollout-with-a-hands-on-lab.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
