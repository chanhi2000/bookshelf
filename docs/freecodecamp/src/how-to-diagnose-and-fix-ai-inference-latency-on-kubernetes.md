---
lang: en-US
title: "How to Diagnose and Fix AI Inference Latency on Kubernetes"
description: "Article(s) > How to Diagnose and Fix AI Inference Latency on Kubernetes"
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
      content: "Article(s) > How to Diagnose and Fix AI Inference Latency on Kubernetes"
    - property: og:description
      content: "How to Diagnose and Fix AI Inference Latency on Kubernetes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-diagnose-and-fix-ai-inference-latency-on-kubernetes.html
prev: /devops/k8s/articles/README.md
date: 2026-09-30
isOriginal: false
author:
  - name: Gursimar Singh
    url: https://freecodecamp.org/news/author/gursimar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4ab24802-80a3-43bb-a432-28f18d1f777e.png
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
  name="How to Diagnose and Fix AI Inference Latency on Kubernetes"
  desc="It's Thursday, around quarter past two. Your team shipped an internal assistant two weeks ago. The demo went well enough that someone in finance asked whether it could read contracts. Word spread. Tod"
  url="https://freecodecamp.org/news/how-to-diagnose-and-fix-ai-inference-latency-on-kubernetes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4ab24802-80a3-43bb-a432-28f18d1f777e.png"/>

It's Thursday, around quarter past two. Your team shipped an internal assistant two weeks ago. The demo went well enough that someone in finance asked whether it could read contracts. Word spread. Today, for the first time, everyone is using it at once.

The support channel has the same complaint arriving in six different tones. Is it down? Mine is just spinning. It worked this morning. Somebody has posted a screenshot of a loading indicator with no caption, which you suspect they're enjoying.

So you open the dashboard.

Nodes ready. Pods running. CPU at 20%. No restarts, nothing in CrashLoopBackOff, no alert fired. By every signal Kubernetes gives you, the system is healthy.

It is not healthy. Somebody is eleven seconds into waiting for the first word of an answer, and they're about to go back to doing it the old way, and they're not coming back.

That is the failure this piece is about. Not the outage. The quiet one, where everything is technically up and the product is still unusable.

---

## Your First Instinct is Wrong

The instinct at that moment is to suspect the model. Wrong version, bad quantization, context too long, or that someone changed the system prompt.

It is almost never the model.

Walk one request end to end and you find four stages. It gets routed to a replica. It waits in a queue. The model reads the prompt. The model streams an answer. Only the last two involve the model doing anything you are paying for. The first two are queueing and routing, which is to say infrastructure.

When people say their model is slow, the model is usually fine. The wait is somewhere else.

---

## You Are Not the Only One

It's worth knowing before you go hunting that this is the most common complaint in the field, not an unlucky configuration on your part.

A [<VPIcon icon="fas fa-globe"/>practitioner survey](https://akamai.com/lp/the-state-of-ai-inference) of 200 people running AI in production found that nearly half, 49.5%, named latency at peak load as their single hardest scaling problem. Not accuracy. Not hallucination. Not cost per token. Latency, at the exact moment people are trying to use the thing.

Two more figures from the same research are worth holding alongside it. 59.5% said running inference closer to users or decision points is critical or very important. 45.5% still serve from a single cloud region. People know proximity matters and have not managed to act on it, which tells you something about what multi-region GPU capacity costs to stand up.

The same research mentions organizations mandating sub-250ms response times alongside 99.9% availability. Read that carefully, because taken literally it is impossible. No meaningful LLM response completes in a quarter of a second. It has to mean time to first token (how long before the first word of the answer appears), and that is the right thing to hold yourself to anyway. Once tokens are flowing at a readable pace, people stop counting. The silence before the first one is what loses them.

---

## The Thing Nobody Told You When You Deployed It

Here's the part that explains everything else.

A normal web request is short, small, and costs roughly what the last one cost. Kubernetes scheduling assumes that. Service load balancing assumes it. The Horizontal Pod Autoscaler assumes it. Your ingress controller's default timeout assumes it. Nobody wrote the assumption down, because for fifteen years it was simply true.

An LLM request breaks it in three places.

It runs in two phases with completely different profiles. Prefill: the model reads the entire prompt in one pass. Compute-bound, bursty, and this is what decides how long your user stares at nothing. Then decode: one token at a time, each needing the accumulated state of every token before it. That state is the KV cache. It lives in GPU memory next to the weights, and it grows as the answer grows.

So requests are not short, they can run for a minute. They do not cost the same, since a prompt with a document pasted into it can cost fifty times what a one-liner costs. And the genuinely scarce resource is GPU memory, which does not appear on a single dashboard you inherited.

That is why your monitoring said everything was fine. It was measuring the wrong machine.

---

## Where the Eleven Seconds Went

Follow the request through the four stages and the failure modes fall out in order. These six are the ones practitioners name most often, and they map neatly onto the path.

### Stage One, Routing: Your Load Balancer is Guessing

Round-robin stops being fair the moment request costs diverge. Three heavy prompts land on one pod while its neighbour handles one-liners. The loaded pod's queue grows, its tail latency climbs, and the fleet average still looks completely reasonable, which is why nobody noticed before today.

Long-lived connections make it worse. With HTTP/2 or keepalive, a client opens one connection and sends everything down it, and a Kubernetes Service balances per connection rather than per request. All that traffic pins to a single backend and stays there.

Then there is the cost most teams have never considered. If a replica already holds the prefix of this prompt in its KV cache, routing there skips real prefill work. Since most production prompts share a long system preamble, that is not an edge case, it is most of your traffic. Round-robin throws the benefit away at random, every time.

### Stage Two, The Queue: Nothing is Coming to Help

Your autoscaler could add capacity. It will be late, and the reason is unglamorous: a new replica has to pull a multi-gigabyte serving image, fetch 20GB to 70GB of weights over the network, and load them into GPU memory. Minutes, not seconds, and that assumes a node with a free card already exists. If it does not, add provisioning time, and add whether your provider has stock in that zone today.

There is a second problem stacked on the first. The signal is usually wrong. CPU tells you nothing here, because the CPU is idle while the GPU works. GPU utilization is barely better: it reports that a kernel was executing during the sample window, and a server handling one request and a server handling sixty both read 100%. It cannot tell you whether anyone is waiting.

Queue depth can. vLLM already exposes running and waiting request counts as Prometheus metrics. Scale on those:

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: llm-server
spec:
  scaleTargetRef:
    name: llm-server
  minReplicaCount: 2
  maxReplicaCount: 8
  cooldownPeriod: 600
  triggers:
    - type: prometheus
      metadata:
        serverAddress: http://prometheus.monitoring:9090
        query: sum(vllm:num_requests_waiting{app="llm-server"})
        threshold: "5"
```

Check the metric names against your vLLM version. Several have been renamed across releases, and the failure is silent.

Two values there are deliberate. The minimum of 2, because a cold start means you cannot sit at zero and expect to serve. The ten minute cooldown, because scaling down eagerly means paying that cold start again shortly afterwards.

Which leads to the uncomfortable conclusion about autoscaling inference. Reactive scaling is permanently late by however long your cold start is, and no trigger fixes that. The fix is to keep more spare capacity than feels comfortable. Run extra replicas at all times, scale up earlier than you think you need to, and scale down more slowly. This also means scale to zero isn't a good fit for user-facing inference. Save it for batch jobs, where nobody is sitting there waiting for a response.

### Stage Three, Prefill: The GPUs Are There, and Useless

Kubernetes hands out CPU in millicores and GPUs whole. A pod asks for one card and gets the entire card, whether it needs 10% of it or all of it.

The waste is the obvious problem. Fragmentation is the one that ruins a Thursday. A 70B model in 16-bit needs roughly 140GB of weights, so a replica needs several GPUs on one node. You can have six free GPUs spread two-two-one-one across four nodes, and the replica sits in Pending indefinitely. Capacity on paper, none of it usable, and no alert, because nothing is broken.

Sharing a card gives three options, each with a catch you should know before choosing. Time-slicing is easy to enable and gives no memory isolation, so one greedy pod can take down its neighbour. Fine for development, not for anything customer-facing. MIG gives real hardware isolation but fixed slice geometry, which means predicting your workload mix before you have one. Dynamic Resource Allocation is the structurally correct answer and brings accelerator requests properly into the core Kubernetes API.

None of these are on by default. Each needs a deliberate decision from somebody who understands the workload, who is usually not in the room when the cluster gets built.

### Stage Four, Decode: Your Ingress is Cutting People Off

Many ingress controllers ship with a 60 second read timeout and response buffering enabled.

The timeout terminates long generations mid-sentence. Users report that as a crash, and you cannot reproduce it, because your test prompt is short. The buffering holds tokens and releases them in clumps, which destroys the feel of streaming while the model is behaving perfectly.

Two config lines, written for a workload that no longer exists.

### And Underneath All four: Bursty Traffic and Nobody's Name on the Problem

Internal AI tools don't get steady traffic. They get sudden spikes: when everyone starts work at 9am, in the hour after a company all-hands meeting, or when someone shares the link in a busy Slack channel and says it's actually quite good. A fixed replica count handles exactly one of those. Most teams set it once during a quiet week and never revisit it, so they get both waste and collapse on the same day.

Then the sixth failure mode, which is not technical at all, and which is the reason the other five survive for quarters.

Platform engineering owns the cluster. The cluster is green. From where they sit, the job is done and done well. Application developers can see latency is bad and cannot see why, because every cause sits in scheduling, scaling and routing that they neither control nor observe. MLOps owns the model artifact and almost nothing that determines how it performs at quarter past two on a Thursday.

Three teams, all telling the truth, and the problem living in the gap between their on-call rotas, where no alert is configured and no dashboard points.

---

## Meanwhile, the Platform Did Not Stand Still

The encouraging part of this story is that the gaps above are known, and the fixes have been shipping.

Dynamic Resource Allocation brings accelerator hardware requests into the core Kubernetes API, so the scheduler can reason about the device rather than counting opaque units. Kueue adds job queueing and multi-tenant GPU quota alongside CPU and memory, which is how you stop a research job starving the endpoint your users depend on. Gateway API Inference Extension and llm-d add model-aware routing: request criticality, dynamic balancing from live model metrics, and awareness of cache state. That last one is the direct answer to the guessing load balancer in stage one.

Published benchmarks give a sense of scale: Kueue reducing multi-stage workload makespan by up to 15%, dynamic accelerator slicing cutting mean job completion time by 36%, and Gateway API plus llm-d improving tail time to first token by up to 90% under heavy load.

Treat those as headroom rather than forecast. Up to 90% is measured on a configuration chosen to demonstrate the improvement, and your gain depends entirely on how poor your baseline is. If you already run least-outstanding-requests balancing with a warm cache, expect far less. If you are on stock round-robin behind a default ingress, possibly something dramatic, because that baseline is genuinely bad.

The direction is what matters. The biggest published gain is in tail time to first token, which is precisely what half the surveyed practitioners named as their worst problem. Somebody built the fix for the thing people were complaining about.

---

## How This Got Here in the First Place

Worth a short detour, because it explains why the tooling arrived late.

When generative AI landed in enterprise planning documents, the confident position was that Kubernetes could not hold it. Container orchestration was built for small fungible units of CPU and memory, cheap restarts, interchangeable replicas. AI needed scheduled specialized silicon carrying enormous state that takes minutes to place. A purpose-built platform was coming.

It never arrived. AI went into the microservices stack and Kubernetes absorbed it.

The [<VPIcon icon="fas fa-globe"/>survey data](https://cncf.io/reports/the-cncf-annual-cloud-native-survey/) explains why. More than half of enterprises do not train models at all, and only 7% deploy a model on any given day. Meanwhile 82% of container users run Kubernetes in production, and 66% of organizations hosting generative AI already serve it there. The industry spent years designing for the workload almost nobody has, while everybody else quietly downloaded weights and put them behind an endpoint.

What actually converged was not a place to run AI. It was a standard way to run it, with the location left negotiable. Which is exactly why your problems today are placement, routing and capacity rather than anything model-shaped.

---

## What To Do Once the Fire is Out

The path from working to reliable comes down to five things: capacity, performance, placement, resilience and ownership.

### Capacity

Requests per second is meaningless when one request is 50 tokens and the next is 8,000. Plan in tokens per second and track prompt and completion separately, because they stress different parts of the system. Prompt tokens are a compute burst during prefill. Completion tokens are a sustained drip during decode that holds GPU memory for the life of the response.

Load test with your worst realistic prompt at your worst realistic concurrency, and plan from that number. A benchmark built on short prompts gives a reassuring figure that evaporates in week one.

On supply, treat GPUs as something you reserve ahead of time rather than request when needed. Keep a committed baseline and burst on top. Find out your provider's quota and regional stock position before the evening you need it, and use Kueue so one team cannot quietly consume the pool.

### Performance

Two numbers matter most. Time to first token (TTFT) is how long a user waits between sending a prompt and seeing the first word of the answer. It decides whether people trust the product. Inter-token latency is the gap between each word after that, and it decides whether the answer feels smooth to read.

Track both at p95 and p99, not the average. These are percentiles. p95 is the time that 95% of requests come in under, so it shows what your slowest 1 in 20 users experience. p99 does the same for the slowest 1 in 100. An average can look healthy while those users wait far too long, and they're the ones who give up.

Next, tune the serving layer. This is the software that loads the model and handles requests, such as vLLM. It's where you'll get the biggest improvements for the least effort and cost. Continuous batching keeps the GPU busy without making early requests wait for a batch to fill. Quantization roughly halves memory footprint where the quality tradeoff is acceptable, and freed memory becomes concurrent requests. Set maximum context length to what your product actually needs rather than what the model supports. If the model handles 128K and your longest genuine prompt is 6K, you are reserving KV cache for a scenario that never occurs. One config line, and it can substantially raise effective concurrency.

### Placement

Taint GPU nodes so general workloads cannot land on them and only inference pods with matching tolerations schedule there. A logging sidecar should never be the reason a model replica cannot place.

Keep weights close. Node-local NVMe or a zone-local cache turns a 40GB network pull into a fast local read, which feeds directly into cold start, autoscaling lag, and the peak-hour latency you spent Thursday afternoon on. This is the highest-leverage unglamorous fix on the list.

Respect topology. Cards connected by NVLink behave very differently from cards that merely share a PCIe bus, and for a sharded model that interconnect sits on the critical path of every token generated.

Then be honest about geography. If your users are in London and your GPUs are in Virginia, every token crosses an ocean, and a well-tuned model behind a long network path is still a slow product.

### Resilience

Readiness should pass only when the model is loaded and genuinely able to serve. Use a startup probe with a generous failure threshold, otherwise liveness kills the pod partway through loading weights and you get a restart loop that presents as a mystery and costs an hour.

Set a PodDisruptionBudget so a routine node upgrade cannot remove half your replicas at once.

Raise the termination grace period past the 30 second default and add a preStop hook. A generation can easily run longer than that, so otherwise every rollout severs in-flight streams and your users experience deployments as random failure.

Shed load deliberately. Past a queue depth threshold, return a fast busy-try-again rather than accepting a request that will hang for two minutes. This feels wrong to engineers and is right for users. People forgive a quick honest retry. Nobody forgives a frozen screen.

Have somewhere to fall back to: a second region, a smaller model covering the common cases, or an external API at the edge of disaster. Given that 45.5% of practitioners run from a single region, this is the most commonly skipped item on the list, which makes it the most likely candidate for your next incident.

### Ownership

Agree on the numbers and write them down: time to first token, inter-token latency, error rate, queue time. Put them on one dashboard showing cluster and model metrics side by side, and make sure both teams open the same link rather than maintaining separate versions of reality.

Split responsibility explicitly. Platform owns the ability to hit the target: capacity, scheduling, routing, scaling, placement. Application owns how the model is configured and called: context length, batching parameters, prompt size, retry behaviour. When the number slips, both show up, and the conversation starts from the same graph instead of two that disagree.

---

## Four Things Your Monitoring Still Isn't Telling You

Latency, traffic, errors and saturation are still necessary and no longer sufficient. Four more belong on the board.

Token consumption rate, split prompt and completion, because that is your real unit of capacity. Cost per request by tenant and query type, because we run eight GPUs is not an answer to what a feature costs per user. Output quality, tracking hallucination rate and guardrail drift, because latency work that degrades quality is not a win. Model attribution, recording which checkpoint and which prompt version produced a response, because when quality moves you need to know what changed.

That last one connects to a shift worth noticing. Model registries have become peers to container registries, and prompts and agent configurations are increasingly versioned as GitOps artifacts in the same delivery pipelines as everything else.

The prompt is code now. It changes production behaviour, it can break things, and it should go through review, versioning and rollback like anything else that does. Plenty of teams are still editing prompts in a web console and wondering why quality shifted on a Tuesday.

---

## The Thing That is Still Unsettled

The substrate has converged, and the speed of it is the evidence. A Kubernetes AI conformance programme launched in late 2025 with 18 platforms. Within roughly four months it had grown to 31 and extended to agentic workloads, covering the major hyperscalers, the enterprise and private cloud distributions, GPU neoclouds and edge networks. Companies that agree on almost nothing agreed on this.

The layer above has not converged at all. AI gateways, evaluation platforms, agent control planes, agent observability. All advancing faster in commercial products than in any standard body, and all sitting exactly where the interesting business logic is heading.

The risk is worth naming plainly. You can be perfectly portable at the Kubernetes layer and completely locked in at the layer where you actually build. Your pods will migrate between clouds beautifully while your agent definitions, eval suites and gateway policies stay exactly where they are, because there is nowhere standard to move them to.

That is not a reason to avoid those tools. They solve real problems today. It is a reason to know which of your components has an exit and which does not, and to make that a decision you wrote down rather than one you discover during a renewal negotiation.

---

## Monday Morning

Start with one measurement. Time a cold start end to end, from pod created to first token served, and write the number down. That figure is your autoscaling floor, and your minimum replica count falls directly out of it.

Put time to first token and queue depth on your main dashboard at p99. Replace CPU-based autoscaling with a queue-depth trigger and minimums that respect the cold start. Check your ingress read timeout and buffering against a real long streaming response rather than a test prompt. Fix the termination grace period so deployments stop cutting people off.

Then, over the next few weeks: taint your GPU nodes, move weights to node-local or zone-local storage, set maximum context length to what you actually use, and find out whether you are still on round-robin. You probably are.

And before the quarter ends, decide who owns the end-to-end latency number, and say it out loud in a room with the other team present.

---

## Back to Thursday

The dashboard was never lying. It was answering a different question.

It was telling you whether the containers were alive, which they were. It could not tell you that requests were queueing behind a badly routed batch, that no new replica was coming for four minutes, that six GPUs were free and unusable, or that the ingress was buffering tokens it should have been streaming. Nothing in the standard toolkit is pointed at any of that.

Getting a model to answer on Kubernetes takes an afternoon. Getting it to answer well when everyone logs in at once is a different discipline, and it looks far more like ordinary infrastructure engineering than the current conversation suggests. Scheduling, routing, capacity, ownership. We have been solving those since long before any of this carried the AI label. The skills are already in the building. They need pointing at the right metric.

A green cluster is where the work starts. What counts is what the person typing the prompt sees.

::: info About Author

I hope you’ve enjoyed this and learned something new. I’m always open to suggestions and discussions on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`gursimarsm`)](https://linkedin.com/in/gursimarsm). Hit me up with direct messages.

If you’ve enjoyed my writing and want to keep me motivated, consider leaving stars on [GitHub (<VPIcon icon="iconfont icon-github"/>`gursimarsm`)](https://github.com/gursimarsm) and endorsing me for relevant skills on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`gursimarsm`)](https://linkedin.com/in/gursimarsm).

:::

Till the next one, happy exploring!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Diagnose and Fix AI Inference Latency on Kubernetes",
  "desc": "It's Thursday, around quarter past two. Your team shipped an internal assistant two weeks ago. The demo went well enough that someone in finance asked whether it could read contracts. Word spread. Tod",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-diagnose-and-fix-ai-inference-latency-on-kubernetes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
