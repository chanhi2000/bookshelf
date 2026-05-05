---
lang: en-US
title: "Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python"
description: "Article(s) > Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python"
    - property: og:description
      content: "Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/gen-ai-product-experimentation-with-regression-discontinuity-design.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a6b7e375-8638-4b98-824e-bb94c60e9e57.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
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
  name="Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python"
  desc="Causal inference for LLM-based features starts with one question editors ask before they ship anything: Did the change actually move the metric, or did the metric just move? Let's say that your team b"
  url="https://freecodecamp.org/news/gen-ai-product-experimentation-with-regression-discontinuity-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a6b7e375-8638-4b98-824e-bb94c60e9e57.png"/>

Causal inference for LLM-based features starts with one question editors ask before they ship anything: Did the change actually move the metric, or did the metric just move?

Let's say that your team built a routing layer that splits incoming queries between two models: queries with a confidence score below 0.85 go to a premium model, and those above 0.85 go to a cheaper distilled model. The premium model costs 5x as much as the cheaper one.

Your boss wants the answer that ends the debate: Is the premium model worth it for the queries it sees?

You can't run a clean A/B test, because routing is deterministic: a query at confidence 0.84 always gets premium, a query at 0.86 always gets cheap, and you can't randomize the assignment.

You also can't trust a naïve comparison of premium-routed users against cheap-routed users. Premium handles the harder queries by design (that's the reason you built the gate), so the two groups differ in query difficulty before either model touches them.

The threshold itself is your free experiment. Right at 0.85, the assignment flips, but the queries on either side of that boundary are essentially identical. A query at confidence 0.849 isn't meaningfully different from a query at 0.851. Any differences in outcomes between the two narrow groups stem solely from the routing decision. That's what regression discontinuity design (RDD) reads.

In this tutorial, you'll use Python to estimate the causal effect of premium routing on task completion using sharp RDD with local linear regression. You'll sweep bandwidths to test estimate stability, run a manipulation diagnostic, check robustness with a quadratic specification, and bootstrap 95% confidence intervals around every point estimate.

The LLM telemetry is a 50,000-user synthetic dataset with the ground-truth premium-routing effect baked in at +6 percentage points, so you can verify that RDD recovers it.

::: info Companion code

every code block runs end-to-end [in the companion notebook (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/03_rdd_confidence_threshold).

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/03_rdd_confidence_threshold at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/03_rdd_confidence_threshold/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/35e86fc7858b217d2f9a90f65685913364f4a81767ba150119a2b44f6311b13c/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

---

## Why Threshold Routing is a Natural Experiment

The product reason this routing rule exists is to help your team spend the premium model budget where it earns its keep. Low-confidence queries are the harder ones, which is where a stronger model has the most upside. High-confidence queries already look easy enough for the cheap model to handle.

You'll see this routing direction across confidence-score gates for Q&A assistants, query-complexity gates in multi-model gateways like OpenRouter, safety-score gates in content moderation, and latency-budget gates that re-route when the cheap model would exceed a p99 latency budget.

The mechanism is the same in every case: a continuous score, a threshold, and a deterministic routing rule.

What makes this setup useful for causal inference is that users don't pick which model they get. A query lands, the system computes confidence, and the routing layer decides. Right at the threshold, the user's experience flips from premium to cheap based on a difference too small to be meaningful.

Again, a query at 0.849 confidence isn't shipping a different problem to the model than a query at 0.851. Anything that differs in outcomes between those two groups is the routing decision speaking. The underlying query is the same.

That local randomness is the experiment RDD reads from. You don't need a randomized control group, you don't need a propensity score. And you don't need an instrument, you need a sharp threshold that nobody can game.

---

## What Regression Discontinuity Actually Does

The jump at the threshold is the causal effect, which is the number a product team can act on. RDD reads it by fitting two separate regression lines to the outcome: one for users just below the threshold and one for users just above. The vertical difference between those two fitted lines at the cutoff is the local average treatment effect at that point.

Graphically, picture task completion on the y-axis and query confidence on the x-axis. Completion generally trends with confidence (easier queries complete more often). At exactly 0.85, though, users below the cutoff get premium routing, and users above get cheap.

If premium routing helps, you'd see a sharp upward jump in task completion just below 0.85, then disappear just above. Approached from left to right with confidence rising, the visual reads as a downward step at 0.85, because you're moving from the premium-treated zone into the cheap-treated zone.

![Figure 1. Conceptual schematic. Two outcome trajectories, one for premium-routed queries (confidence below 0.85) and one for cheap-routed queries (confidence above 0.85), meet at the threshold but don't match. The vertical gap between their endpoints at 0.85 is the local causal effect of premium routing.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/f772c04b-5642-472c-8182-695183027294.png)

That gap is identified under two named assumptions:

1. **No manipulation of the running variable:** Users (or your system) can't precisely nudge a query's confidence score across the cutoff. If anyone can game their score to land just below 0.85 and grab premium routing, the cutoff is no longer drawn at random, and RDD breaks.
2. **Continuity of potential outcomes at the cutoff:** Every other factor that affects task completion (query type, user expertise, workspace tenure, time of day) varies smoothly across 0.85. Only the routing assignment changes discontinuously at exactly the threshold. If a second product rule fires at 0.85 (a different logging level, a separate UI treatment, a retry policy), RDD will attribute that rule's effect to the routing decision.

These are the two assumptions you check before you trust the estimate. Step 3 below tests the first one. The second is a structural property of your system that you have to know cold.

Two practical choices shape every RDD: the **bandwidth** (how close to the cutoff to restrict the analysis) and the **functional form** (linear, quadratic, or local polynomial).

Narrow bandwidths cut potential bias by staying close to the local-randomization zone, but they shrink the sample. Linear specifications are stable, though they assume the underlying relationship can be approximated by a straight line on each side.

You'll try both linear and quadratic specifications at multiple bandwidths to see whether the answer holds.

The article uses sharp RDD throughout, since assignment is a deterministic function of confidence (below 0.85 always premium, above 0.85 always cheap). When the threshold is probabilistic and compliance is partial, the design is a fuzzy RDD, which requires an instrumental variables framework that you can implement using the `rdrobust` Python package.

::: note Prerequisites

You need Python 3.11 or newer, comfort with pandas and statsmodels, and rough familiarity with linear regression and interaction terms.

Install the packages used in this tutorial:

```sh
pip install numpy pandas statsmodels matplotlib scipy
```

**Here's what's happening:** four standard scientific Python libraries plus matplotlib for the diagnostic visualization. Nothing exotic.

Clone the companion repo and generate the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

**Here's what's happening:** the data generator draws 50,000 users with a `query_confidence` score from a Beta(5,2) distribution, applies the routing rule (`routed_to_premium = query_confidence < 0.85`), and bakes a +6-percentage-point premium routing effect into `task_completed`. Same seed, same dataset, every time.

:::

---

## Setting Up the Working Example

The dataset simulates a SaaS product that routes queries between a premium and a cheap model based on confidence score. The threshold is 0.85, and the ground-truth causal effect of premium routing is +6 percentage points on task completion. You know the truth, so you can check whether RDD recovers it.

Load the data and look at the routing breakdown:

```py
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

df = pd.read_csv("data/synthetic_llm_logs.csv")
print(f"Loaded {len(df):,} rows, {df.shape[1]} columns")

print("\nRouting breakdown:")
counts = df.routed_to_premium.value_counts().to_dict()
print(f"  Premium-routed (confidence < 0.85):  {counts.get(1, 0):,}")
print(f"  Cheap-routed   (confidence >= 0.85): {counts.get(0, 0):,}")

print("\nQuery confidence distribution:")
print(df.query_confidence.describe().round(3))
#
# Loaded 50,000 rows, 16 columns
# 
# Routing breakdown:
#   Premium-routed (confidence < 0.85):  38,874
#   Cheap-routed   (confidence >= 0.85): 11,126
# 
# Query confidence distribution:
# count    50000.000
# mean         0.715
# std          0.159
# min          0.078
# 25%          0.611
# 50%          0.736
# 75%          0.838
# max          0.998
```

**Here's what's happening:** about 78% of queries land below the 0.85 cutoff and get premium routing. The Beta(5,2) distribution is skewed toward the upper end, with a median of 0.736, and most of its mass still sits below 0.85. The remaining 22% are queries that the model already feels confident about, and they go to the cheap model.

Before any regression, look at the naïve comparison every product team is tempted to run:

```py
naive = (
    df[df.routed_to_premium == 1].task_completed.mean()
    - df[df.routed_to_premium == 0].task_completed.mean()
)
print(f"Naive premium-vs-cheap effect: {naive:+.4f}  (ground truth = +0.06)")
#
# Naive premium-vs-cheap effect: +0.0632  (ground truth = +0.06)
```

**Here's what's happening:** the naive estimate sits at +0.0632, which is suspiciously close to the truth. That's a coincidence of this specific synthetic dataset, where the only confounder of premium vs. cheap is `query_confidence` itself, and the outcome doesn't depend on confidence except through routing.

In production, you almost never get this lucky. User expertise, prompt phrasing, time of day, and a dozen unobserved query traits all correlate with confidence and with completion.

A naïve comparison in a real system can be off by 50% or more in either direction. RDD gives you identification that doesn't depend on the absence of hidden confounders.

### Step 1: A Sharp RDD with Local Linear Regression

The basic sharp RDD estimator is a local linear regression. Restrict to users whose confidence sits within a bandwidth of the cutoff, fit separate linear slopes on each side, and read off the jump at 0.85.

```py
cutoff = 0.85
bw = 0.10

near = df[(df.query_confidence > cutoff - bw)
          & (df.query_confidence < cutoff + bw)].copy()
near["below_cutoff"] = (near.query_confidence < cutoff).astype(int)
near["rc"] = near.query_confidence - cutoff

rdd_model = smf.ols(
    "task_completed ~ below_cutoff + rc + below_cutoff:rc",
    data=near,
).fit(cov_type="HC3")

effect = rdd_model.params["below_cutoff"]
print(f"RDD effect at cutoff (LATE): {effect:+.4f}")
print(f"Std error (HC3):             {rdd_model.bse['below_cutoff']:.4f}")
print(f"p-value:                     {rdd_model.pvalues['below_cutoff']:.4f}")
print(f"N users in [0.75, 0.95):     {len(near):,}")
#
# RDD effect at cutoff (LATE): +0.0548
# Std error (HC3):             0.0131
# p-value:                     0.0000
# N users in [0.75, 0.95):     21,689
```

**Here's what's happening:** the model fits separate intercepts and slopes on each side of 0.85 (`below_cutoff` is the side indicator, `rc` is confidence centered at the cutoff). The coefficient on `below_cutoff` reads off the vertical jump at the threshold, which is the local average treatment effect (LATE) for queries with confidence near 0.85. You get +0.0548, within sampling noise of the +0.06 ground truth.

Three notes on the specification. First, `task_completed` is binary, so this is a linear probability model. For RDD with a binary outcome at the cutoff, the linear probability model is standard practice because local linearity is the identifying assumption either way. Logit at the cutoff is an alternative if you need bounded predictions globally.

Second, the standard errors are used `cov_type="HC3"` to relax the homoskedasticity assumption, which is almost always wrong for binary outcomes.

Third, the dataset has one query per user with no within-user clustering, so cluster-robust standard errors aren't needed here. In a setting with multiple queries per user, you'd cluster on `user_id`.

The next diagnostic to look at is the confidence distribution near the cutoff. Figure 2 shows what 50,000 queries look like in the bandwidth window:

![Figure 2. Real distribution from the 50,000-user synthetic dataset. Unlike the schematic in Figure 1, this shows the actual query density by confidence score, with the routing threshold annotated. The bottom panel counts how many queries land in each 2-percentage-point bin near the cutoff (2,461 / 2,481 / 2,335 / 2,229 / 2,048 across the 0.80–0.90 range). The roughly uniform spread is the visual signal that no manipulation is concentrating users on one side of the threshold.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/9ecb8a4c-6eac-4732-95ae-2a5981917f54.png)

### Step 2: Try Different Bandwidths

Bandwidth choice matters. Too narrow and you have too few observations, so the confidence interval blows up. Too wide and you're extrapolating into regions where the linear specification is no longer a reasonable local approximation.

The honest move is to try multiple bandwidths and report whether the estimate holds.

```py
results = []
for bw in [0.05, 0.10, 0.15, 0.20]:
    sub = df[(df.query_confidence > cutoff - bw)
             & (df.query_confidence < cutoff + bw)].copy()
    sub["below_cutoff"] = (sub.query_confidence < cutoff).astype(int)
    sub["rc"] = sub.query_confidence - cutoff

    m = smf.ols(
        "task_completed ~ below_cutoff + rc + below_cutoff:rc",
        data=sub,
    ).fit(cov_type="HC3")

    results.append({
        "bandwidth": bw,
        "n": len(sub),
        "effect": m.params["below_cutoff"],
        "se": m.bse["below_cutoff"],
        "p": m.pvalues["below_cutoff"],
    })

print(pd.DataFrame(results).round(4).to_string(index=False))
#
#  bandwidth      n  effect     se       p
#       0.05  11554  0.0635  0.0183  0.0005
#       0.10  21689  0.0548  0.0131  0.0000
#       0.15  29137  0.0618  0.0112  0.0000
#       0.20  34074  0.0614  0.0107  0.0000
```

**Here's what's happening:** four bandwidths from ±0.05 to ±0.20 around the cutoff, refitting the same RDD specification at each. The estimates range from +0.0548 to +0.0635, all in the same neighborhood as the +0.06 ground truth, with standard errors that shrink as the bandwidth widens and grow as it narrows. Every p-value is well below 0.05. Whether the estimates are "stable" depends on the confidence intervals around them, which Step 5 produces with the bootstrap.

### Step 3: Checking for Manipulation at the Threshold

RDD is valid only if users can't precisely manipulate the running variable around the cutoff. If your users (or your system) can nudge confidence scores just below 0.85 to force premium routing, you get a density spike at the cutoff, and the RDD estimate is contaminated.

The standard diagnostic is the McCrary density test, which checks whether the distribution of the running variable has a sharp jump at the cutoff. The simple version: bin the data tightly around 0.85 and check whether the counts on the two sides are similar.

```py
print("User counts in 2-percentage-point bins around 0.85:")
for lo in [0.80, 0.82, 0.84, 0.86, 0.88]:
    hi = lo + 0.02
    cnt = ((df.query_confidence >= lo) & (df.query_confidence < hi)).sum()
    print(f"  [{lo:.2f}, {hi:.2f}):  n = {cnt:,}")
#
# User counts in 2-percentage-point bins around 0.85:
#   [0.80, 0.82):  n = 2,461
#   [0.82, 0.84):  n = 2,481
#   [0.84, 0.86):  n = 2,335
#   [0.86, 0.88):  n = 2,229
#   [0.88, 0.90):  n = 2,048
```

**Here's what's happening:** counts trend gently downward across the bandwidth because Beta(5,2) places more mass at higher confidence levels, and the density tapers as it approaches 1.0. There's no spike or dip at the 0.84–0.86 bin that straddles the cutoff. The 433-user spread across all five bins is consistent with smooth tapering of the underlying density.

That's the pattern you want when manipulation is absent. For a more rigorous test, the [<VPIcon icon="iconfont icon-github"/>`rdpackages/rddensity`](https://github.com/rdpackages/rddensity) Python package implements the formal McCrary procedure with bias-corrected standard errors.

What manipulation looks like when it's real: a spike in users at confidences just barely below 0.85 (they're being nudged into premium routing) and a dip just above. If you see that pattern, the RDD estimate overstates the causal effect because the users right below 0.85 differ in motivation from those right above. They cared enough to manipulate the score, and they'd have shown different outcomes even under random routing.

### Step 4: Quadratic Specification as a Robustness Check

If the true relationship between confidence and task completion isn't exactly linear, a local linear RDD can mistake the curvature for a jump. The standard robustness check allows quadratic terms on both sides of the cutoff and tests whether the estimate holds.

```py
near = df[(df.query_confidence > cutoff - 0.10)
         & (df.query_confidence < cutoff + 0.10)].copy()
near["below_cutoff"] = (near.query_confidence < cutoff).astype(int)
near["rc"] = near.query_confidence - cutoff
near["rc2"] = near.rc ** 2

rdd_quad = smf.ols(
    "task_completed ~ below_cutoff + rc + below_cutoff:rc"
    " + rc2 + below_cutoff:rc2",
    data=near,
).fit(cov_type="HC3")

print(f"Linear RDD    (bw=0.10):  effect = +0.0548, p < 0.0001")
print(f"Quadratic RDD (bw=0.10):  effect = "
      f"{rdd_quad.params['below_cutoff']:+.4f}, "
      f"p = {rdd_quad.pvalues['below_cutoff']:.4f}")
#
# Linear RDD    (bw=0.10):  effect = +0.0548, p < 0.0001
# Quadratic RDD (bw=0.10):  effect = +0.0569, p = 0.0036
```

**Here's what's happening:** the quadratic specification adds squared terms and interactions with the cutoff indicator, allowing the relationship to curve differently on each side. The `below_cutoff` coefficient still captures the jump at the threshold, now under a more flexible specification.

The two estimates differ by 0.0022, both close to the +0.06 ground truth, and both are significant at p < 0.01. The answer doesn't change when you let the model bend.

When linear and quadratic specifications disagree noticeably, you have a real signal. With small samples (a few thousand at narrow bandwidths), the quadratic version can lose power because four extra parameters need data to be identified.

The standard move is to widen the bandwidth and re-run both specifications. If they still disagree at wider bandwidths, the linear approximation is wrong, and you should report both numbers.

### Step 5: Bootstrap Confidence Intervals

Every point estimate in this article is a single number from a finite sample. The bootstrap quantifies how much that number would move under resampling, which is what a confidence interval describes.

```py :collapsed-lines
def bootstrap_ci(df, cutoff, bw, quadratic=False, n_reps=500, seed=7):
    rng = np.random.default_rng(seed)
    near = df[(df.query_confidence > cutoff - bw)
              & (df.query_confidence < cutoff + bw)].copy()
    near["below_cutoff"] = (near.query_confidence < cutoff).astype(int)
    near["rc"] = near.query_confidence - cutoff
    if quadratic:
        near["rc2"] = near.rc ** 2
        formula = ("task_completed ~ below_cutoff + rc + below_cutoff:rc"
                   " + rc2 + below_cutoff:rc2")
    else:
        formula = "task_completed ~ below_cutoff + rc + below_cutoff:rc"

    n = len(near)
    estimates = np.empty(n_reps)
    for i in range(n_reps):
        sample = near.iloc[rng.integers(0, n, size=n)]
        m = smf.ols(formula, data=sample).fit()
        estimates[i] = m.params["below_cutoff"]
    return (np.percentile(estimates, 2.5), np.percentile(estimates, 97.5))


print("Linear RDD (bw=0.10):")
lo, hi = bootstrap_ci(df, cutoff, bw=0.10)
print(f"  effect = +0.0548   95% CI: [{lo:+.4f}, {hi:+.4f}]")

print("\nBandwidth sensitivity:")
for bw, eff in [(0.05, 0.0635), (0.10, 0.0548), (0.15, 0.0618), (0.20, 0.0614)]:
    lo, hi = bootstrap_ci(df, cutoff, bw=bw)
    print(f"  bw = {bw:.2f}   effect = {eff:+.4f}   "
          f"95% CI: [{lo:+.4f}, {hi:+.4f}]")

print("\nQuadratic RDD (bw=0.10):")
lo, hi = bootstrap_ci(df, cutoff, bw=0.10, quadratic=True)
print(f"  effect = +0.0569   95% CI: [{lo:+.4f}, {hi:+.4f}]")
#
# Linear RDD (bw=0.10):
#   effect = +0.0548   95% CI: [+0.0278, +0.0817]
# 
# Bandwidth sensitivity:
#   bw = 0.05   effect = +0.0635   95% CI: [+0.0244, +0.0986]
#   bw = 0.10   effect = +0.0548   95% CI: [+0.0278, +0.0817]
#   bw = 0.15   effect = +0.0618   95% CI: [+0.0381, +0.0823]
#   bw = 0.20   effect = +0.0614   95% CI: [+0.0420, +0.0808]
# 
# Quadratic RDD (bw=0.10):
#   effect = +0.0569   95% CI: [+0.0205, +0.0959]
```

**Here's what's happening:** the bootstrap resamples the bandwidth-restricted data with replacement 500 times, refits the RDD on each replicate, and collects the `below_cutoff` coefficient. The 2.5th and 97.5th percentiles of those 500 estimates form the 95% interval. Every interval covers the +0.06 ground truth, every interval excludes zero, and the bandwidth sweep produces overlapping intervals.

That's quantitative stability, verified by resampling across the full bandwidth range. Intervals widen as the bandwidth shrinks and narrow as it grows. The quadratic interval is wider than the linear one because the four extra parameters absorb degrees of freedom.

One thing the intervals do NOT do on this dataset: exclude the naive +0.0632 estimate. That's because the data generator doesn't bake in confounding by query confidence. The only difference between the premium and cheap groups in expectations is the +6pp routing effect itself, so the naïve comparison is close to the truth.

Real systems are messier. In a production setting where unobserved query traits affect both the routing assignment and task completion, the naïve estimate would diverge from the RDD estimate, and the bootstrap intervals would tell you which one to trust.

---

## When Regression Discontinuity Fails

RDD looks clean, but several specific failure modes can destroy the identification. Each one maps to a violation of one of the two named assumptions.

**Users manipulate the running variable** (violates assumption 1). The whole setup depends on users (or any upstream service) being unable to precisely control which side of the cutoff they land on. Any system that reveals the cutoff and gives users a way to influence their score (a retry mechanism, a prompt engineering workaround, a confidence-inflating trick) breaks RDD.

Run the density check in Step 3 every time. If you find manipulation, switch to a fuzzy RDD that treats the threshold as probabilistic, or abandon the approach.

**Other policies fire at the same cutoff** (violates assumption 2). If your product has additional rules that activate at 0.85 (a separate UI treatment, a different logging level, a different retry policy), RDD can't separate the routing effect from those other policy effects. Audit the full rule book for anything that shares the threshold.

**The threshold has noise or overrides** (violates assumption 1, in the structural sense). Maybe routing isn't strictly deterministic at 0.85 – it may have random jitter, or a second rule may override the main rule in some cases.

If assignment to the premium model isn't a deterministic function of `query_confidence`, you have a fuzzy RDD, which requires an instrumental variables framework. The `rdrobust` package handles both sharp and fuzzy designs.

**Curvature masquerading as a jump** (breaks the linear approximation that supports identification at the cutoff). Sharp RDD assumes linearity is a reasonable local approximation. When the underlying outcome-confidence relationship is strongly curved, the linear specification can mistake the bend for a jump.

Step 4's quadratic robustness check is the standard diagnostic. If linear and quadratic disagree, widen the bandwidth and re-run both.

**Extrapolation bias** (a continuity issue, reframed). RDD estimates are strictly local to the cutoff. The +0.06 effect at 0.85 tells you nothing about what premium routing would do for queries with confidence 0.30 or 0.99. If you want a global average effect, you need a different technique: propensity methods, regression with confounder adjustment, or an actual experiment.

---

## What to Do Next

RDD is the right tool when your AI feature is gated by a continuous score and a sharp threshold.

If your feature is gated by a user-controlled toggle, propensity score methods are a better fit. If it's gated by a staged rollout across workspaces, difference-in-differences handles it. If it's gated by rules you can't observe directly but that have a random component, instrumental variables is the right choice.

For production RDD analyses, use the [<VPIcon icon="iconfont icon-github"/>`rdpackages/rdrobust`](https://github.com/rdpackages/rdrobust) Python package. It gives you optimal bandwidth selection (Calonico, Cattaneo, and Titiunik 2014), bias-corrected standard errors, and a built-in plotting utility. The companion [<VPIcon icon="iconfont icon-github"/>`rdpackages/rddensity`](https://github.com/rdpackages/rddensity) package implements the McCrary density test you saw informally in Step 3. The from-scratch version in this tutorial shows the mechanics. The rd-packages stack is what you ship to a reviewer.

One thing the LATE doesn't do: tell you the effect for users far from the cutoff. If a +0.06 LATE at 0.85 is enough to keep premium routing in the pipeline, you're done. If you need to know what premium would do for the easy queries you're currently sending to cheap (or the hardest queries near the floor), the next step is a small randomized rollout in those zones, scored against the RDD estimate as a calibration check. Don't generalize the LATE without evidence.

::: info

The companion notebook for this tutorial [lives here on GitHub (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/03_rdd_confidence_threshold). Clone the repo, generate the synthetic dataset, and run `rdd_demo.ipynb` to reproduce every code block from this tutorial.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/03_rdd_confidence_threshold at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/03_rdd_confidence_threshold/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/35e86fc7858b217d2f9a90f65685913364f4a81767ba150119a2b44f6311b13c/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

Threshold routing is one of the most common patterns in production LLM systems, and every confidence-gated routing decision in your stack is a potential RDD. Run the analysis.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Regression Discontinuity: How an LLM Confidence Threshold Creates a Natural Experiment in Python",
  "desc": "Causal inference for LLM-based features starts with one question editors ask before they ship anything: Did the change actually move the metric, or did the metric just move? Let's say that your team b",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/gen-ai-product-experimentation-with-regression-discontinuity-design.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
