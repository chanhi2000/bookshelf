---
lang: en-US
title: "Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python"
description: "Article(s) > Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python"
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
      content: "Article(s) > Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python"
    - property: og:description
      content: "Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/instrumental-variables-for-llm-routing-in-python.html
prev: /articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9b1e9df5-6f52-4f55-b9df-6cd0fbb0ce7c.png
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
  name="Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python"
  desc="For data science leaders and product managers who are overseeing multi-model gateways, the standard regression approach to measuring model quality is fundamentally flawed. You're running a causal infe"
  url="https://freecodecamp.org/news/instrumental-variables-for-llm-routing-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9b1e9df5-6f52-4f55-b9df-6cd0fbb0ce7c.png"/>

For data science leaders and product managers who are overseeing multi-model gateways, the standard regression approach to measuring model quality is fundamentally flawed.

You're running a causal inference experiment whether you acknowledge it or not, and your routing rules are quietly poisoning your performance estimates.

Consider a gateway that routes incoming queries to either a premium model or a faster, cheaper alternative based on a confidence threshold. Queries with a confidence score below a certain threshold get routed premium, while queries above that threshold go cheap.

You pull the logs, run a regression of `task_completed` on the routing decision, and find that premium routing yields a 14-percentage-point lift. Based on this number, your infrastructure team might start drafting a proposal to route everything premium.

Stop before you send that proposal. The routing rule correlates strongly with query complexity, which directly determines whether a task is completed. Complex queries are harder and fail more often, regardless of which model handles them.

When you regress task completion on premium routing, you measure two entangled phenomena simultaneously: the causal effect of sending a query to the premium model, and the inherent difference in difficulty between the queries each model receives.

Standard regression blends those two signals into a single coefficient, and the observed lift reflects query difficulty just as much as it reflects model quality.

The routing confounder arises whenever assignment correlates with query characteristics, as is to be expected in any routing system doing its job. The assignment rule ensures that the two treatment arms contain systematically different queries, invalidating the naïve comparison as a causal estimate.

Instrumental variable analysis is the method that breaks this deadlock. You need a third variable that influences routing for reasons completely unrelated to query quality.

Rate-limit-triggered fallbacks are exactly that. When the premium model hits a rate limit, the gateway reroutes the query to the cheaper model regardless of the query's characteristics. The rate limit fires for infrastructure reasons, independent of what a user actually asked. That randomness is an instrument, and two-stage least squares (2SLS) lets you extract a clean causal estimate from it.

This tutorial walks through the full diagnosis-to-fix sequence in Python: why the routing confounder biases OLS, how to build 2SLS from scratch across two chained regressions, how to check instrument strength with the first-stage F-statistic, and how to recover the local average treatment effect that 2SLS actually estimates rather than mistaking it for the average treatment effect. By the end, you'll know how to spot a confounded routing decision in your own logs, construct a valid instrument from an infrastructure signal like rate-limit fallbacks, and produce a causal estimate with correctly sized confidence intervals instead of the overconfident ones manual 2SLS gives you by default.

::: info Companion notebook

Every code block in this article runs end-to-end in <VPIcon icon="iconfont icon-jupyter"/>`iv_demo.ipynb` in the companion repo at [<VPIcon icon="fas fa-code-branch"/>`main`/<VPIcon icon="fas fa-folder-open"/>`11_instrumental_variables/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/11_instrumental_variables/).

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/11_instrumental_variables at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/11_instrumental_variables/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/47794a0ad672684944ba35bb79d8a468cbca23e43e86657121b00519446b0160/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

---

## Why Routing Confounds Regression

A routing system makes a correlated decision. Queries that arrive with low confidence scores, long token counts, or complex multi-step intent get routed to premium. Queries that are short, clear, and well within the cheap model's capability get routed cheap. That correlation is the whole point of the routing layer.

The problem is that the same features driving the routing decision also affect the outcome you care about.

Task completion is harder for complex queries, independent of which model processes them. When you write `task_completed ~ routed_to_premium + controls`, the `controls` term can absorb the observable dimensions of complexity: query length, user engagement tier, and whatever you logged.

The unobservable dimensions stay embedded in the `routed_to_premium` coefficient, and they bias the estimate downward (complex queries routed premium complete less often, making premium look worse than it is) or upward, depending on the direction of the confound.

In the synthetic dataset used in this tutorial, the OLS estimate lands at +3.3 percentage points even though the true causal effect is +6 percentage points. This is a downward bias of 2.7 pp driven entirely by unobserved query complexity.

The regression looks confident, the p-value looks significant, and nothing in the standard OLS output flags the problem. That's what makes this failure mode dangerous: it's invisible in standard regression diagnostics.

2SLS is built for exactly this structure. You need an external source of variation in routing that is uncorrelated with query quality. Rate-limit-triggered fallbacks provide it.

![Figure 1: The IV causal structure. The instrument (Z = rate-limit fallback) satisfies relevance (Z predicts routing), exclusion (no direct Z to outcome path), and independence (Z is uncorrelated with unobserved query complexity). The dashed red arrows show the confounder paths that bias naïve OLS.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/dcb88e06-c217-47f7-b220-a3c3184c84e1.png)

---

## What an Instrumental Variable is

An instrument is a variable that shifts your endogenous variable (routing decision) without any other direct path to your outcome (task completion).

Four assumptions define a valid instrument.

### Relevance

The instrument must actually influence the endogenous variable. A rate-limit fallback indicator that fires on 15 percent of premium-eligible queries will meaningfully affect whether those queries get routed to premium.

This assumption is testable: check it with the first-stage F-statistic. The conventional threshold is F > 10, established by [<VPIcon icon="fas fa-globe"/>Staiger and Stock (1997)](https://ideas.repec.org/a/ecm/emetrp/v65y1997i3p557-586.html), corresponding to approximately a 10% maximum bias in the 2SLS estimator relative to OLS in the worst case.

Note that more recent work by [<VPIcon icon="fas fa-globe"/>Andrews, Stock, and Sun (2019)](https://ideas.repec.org/a/anr/reveco/v11y2019p727-753.html) suggests this threshold may be too permissive in settings with smaller samples or multiple instruments. For production analyses with limited fallback data, treat F > 10 as a minimum floor and verify with additional sensitivity checks before reporting results. Below 10, the instrument is definitively weak, and the estimate is unreliable.

### Exclusion Restriction

The instrument must affect the outcome solely through its effect on routing. The rate-limit fallback completes the task entirely by changing which model handles the query, with no separate direct path.

This assumption requires logical business reasoning and can't be verified from data alone. A fallback triggered by aggregate infrastructure load is unrelated to what a user asked or how hard their task was.

### Independence

The instrument must be independent of all confounders. Rate-limit events are driven by aggregate API traffic and are unrelated to the characteristics of any individual query. The probability that a given query triggers a rate-limit fallback is uncorrelated with query complexity, user tier, or any other confounder. This assumption too must be argued logically.

### Monotonicity

The instrument must move all affected units in the same direction. For rate-limit fallbacks, every affected query switches from premium to cheap, but no query switches from cheap to premium due to a fallback. This rules out defiers and is required for the LATE interpretation to hold.

When all four hold, 2SLS extracts a causal estimate of routing's effect on task completion by using only the exogenous variation in routing generated by the instrument.

::: note Prerequisites

You need:

- Python 3.11 or newer
- Comfort with pandas and statsmodels OLS
- Rough familiarity with linear regression (2SLS is two OLS regressions chained together)

Install the packages for this tutorial:

```sh
pip install numpy pandas statsmodels scipy
```

This installs the four packages used in the tutorial. `statsmodels` provides OLS and the formula API, and `scipy` is used for statistical computations in the bootstrap step.

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

You clone the companion repo and regenerate the shared 50,000-user synthetic dataset with a fixed seed so your results match the expected outputs in this article.

:::

---

## Setting Up the Working Example

This tutorial adds three simulated variables on top of the shared dataset's user covariates, constructing the full IV causal graph in code:

- `rate_limit_fallback`: the instrument Z. Sampled as a pure Bernoulli(0.15), completely independent of all query characteristics.
- `routed_to_premium_actual`: the endogenous treatment D. Routing is driven by both `query_confidence` (observable) and `query_complexity` (unobservable), so OLS is biased.
- `task_completed_iv`: the outcome Y. Re-simulated from the IV causal graph with a known +6 pp premium routing effect, letting you verify that the estimator recovers the ground truth.

A transparency note: in a real production analysis, the rate-limit fallback events come from your API gateway logs. Your user telemetry table won't have them. You'd join those two sources to construct the instrument.

The simulation here preserves the structural properties of a real instrument: it fires for infrastructure reasons, independent of query quality, without requiring production gateway logs.

```py :collapsed-lines
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf

np.random.seed(42)

df = pd.read_csv("data/synthetic_llm_logs.csv")
rng = np.random.default_rng(99)
n = len(df)

# Unobserved confounder: complex queries route premium AND complete less often
query_complexity = rng.normal(0, 1, n)

# Endogenous routing: depends on query_confidence (observable)
# and query_complexity (unobserved): this is the confounding structure
log_odds = -2.0 + 4.0 * (1.0 - df["query_confidence"]) + 0.6 * query_complexity
premium_prob = 1.0 / (1.0 + np.exp(-log_odds))
df["routed_to_premium_iv"] = rng.binomial(1, premium_prob).astype(int)

# Instrument: pure Bernoulli(0.15), independent of all query characteristics
df["rate_limit_fallback"] = rng.binomial(1, 0.15, n)

# Actual routing: premium if intended, unless fallback overrides
df["routed_to_premium_actual"] = (
    df["routed_to_premium_iv"] * (1 - df["rate_limit_fallback"])
).astype(int)

# Outcome: known causal structure with +0.06 premium effect
engagement_base = np.where(df.engagement_tier == "heavy", 0.70,
                  np.where(df.engagement_tier == "medium", 0.55, 0.35))
completion_prob = np.clip(
    engagement_base
    + 0.06 * df["routed_to_premium_actual"]  # true causal effect
    - 0.04 * query_complexity                 # unobserved confounder
    + rng.normal(0, 0.02, n),
    0.01, 0.99
)
df["task_completed_iv"] = rng.binomial(1, completion_prob).astype(int)

# Encode engagement tier as dummies
df = pd.get_dummies(df, columns=["engagement_tier"], drop_first=True)
tier_dummies = [c for c in df.columns if c.startswith("engagement_tier_")]
covariate_str = " + ".join(["query_confidence"] + tier_dummies)

print(f"Rate-limit fallback rate:      {df.rate_limit_fallback.mean():.3f}")
print(f"Premium routing rate (actual): {df.routed_to_premium_actual.mean():.3f}")
print(f"Mean confidence | fallback=1:  {df[df.rate_limit_fallback==1].query_confidence.mean():.3f}")
print(f"Mean confidence | fallback=0:  {df[df.rate_limit_fallback==0].query_confidence.mean():.3f}")
#
# Rate-limit fallback rate:      0.151
# Premium routing rate (actual): 0.271
# Mean confidence | fallback=1:  0.716
# Mean confidence | fallback=0:  0.715
```

In the above code, the nearly identical mean confidence scores between the fallback=1 and fallback=0 groups confirm that the instrument is independent of the observable routing signal. This is the independence assumption check you can run on any proposed instrument. `query_complexity` is available in this simulation but would be unobserved in production. The regression never receives it.

---

## Step 1: Naïve OLS (Biased Baseline)

Running a standard regression first establishes the biased baseline you'd encounter without accounting for the confounding structure. Most engineering teams report this number without realizing it's mathematically compromised.

```py
ols_formula = f"task_completed_iv ~ routed_to_premium_actual + {covariate_str}"
ols_model = smf.ols(ols_formula, data=df).fit(cov_type="HC3")

ols_coef = ols_model.params["routed_to_premium_actual"]
ols_se   = ols_model.bse["routed_to_premium_actual"]
ols_pval = ols_model.pvalues["routed_to_premium_actual"]
print(f"OLS estimate of premium routing effect: {ols_coef:+.4f}")
print(f"HC3 standard error:                      {ols_se:.4f}")
print(f"p-value:                                 {ols_pval:.4f}")
#
# OLS estimate of premium routing effect: +0.0327
# HC3 standard error:                      0.0050
# p-value:                                 0.0000
```

Here's what's happening: OLS recovers +3.3 percentage points (probability units, since `task_completed_iv` is a 0/1 binary outcome in a linear probability model). The true causal effect is +6.0 pp. The 2.7 pp bias comes from unobserved query-complexity routing: harder queries are routed to premium, and they complete less often, which is a downward confounding mechanism. The p-value looks significant, and the standard error looks precise. Nothing in this output tells you the estimate is wrong.

Keep this number in mind: the 2SLS result in Step 2 will reveal the gap.

---

## Step 2: Two-Stage Least Squares (2SLS) from Scratch

Two-stage least squares corrects the bias by isolating the exogenous routing variation generated by rate-limit fallbacks, using only that variation to estimate the causal effect.

### Stage 1: Predict Routing from the Instrument and Covariates.

```py
stage1_formula = f"routed_to_premium_actual ~ rate_limit_fallback + {covariate_str}"
stage1 = smf.ols(stage1_formula, data=df).fit(cov_type="HC3")

print(f"Stage 1 instrument coefficient: {stage1.params['rate_limit_fallback']:+.4f}")
print(f"p-value:                         {stage1.pvalues['rate_limit_fallback']:.4f}")

df["rtp_hat"] = stage1.fittedvalues
#
# Stage 1 instrument coefficient: -0.3190
# p-value:                         0.0000
```

In this code, you regress the endogenous routing variable on the instrument and the same observed covariates you'll use in Stage 2. The fitted values `rtp_hat` contain two components: the exogenous variation the instrument explains, and the exogenous variation the covariates explain.

The endogenous component (the variation correlated with unobserved query complexity) stays in the residuals and drops out of `rtp_hat`. The negative coefficient on `rate_limit_fallback` confirms the relevance assumption: when the fallback fires, premium routing probability drops by about 32 percentage points.

### Stage 2: Regress Outcome on the Predicted Routing.

```py
stage2_formula = f"task_completed_iv ~ rtp_hat + {covariate_str}"
stage2 = smf.ols(stage2_formula, data=df).fit(cov_type="HC3")

tsls_coef = stage2.params["rtp_hat"]
tsls_se   = stage2.bse["rtp_hat"]
print(f"2SLS estimate:              {tsls_coef:+.4f}")
print(f"Stage-2 SE (underestimate): {tsls_se:.4f}")
#
# 2SLS estimate:              +0.0599
# Stage-2 SE (underestimate): 0.0188
```

Here's what's happening: replacing `routed_to_premium_actual` with `rtp_hat` removes the endogenous part of the routing variation. The Stage 2 coefficient (+0.0599) is the 2SLS estimate of the causal effect of premium routing on task completion, almost exactly the +0.06 ground truth.

Here's an important caveat on standard errors: manual 2SLS produces Stage 2 SEs that are too small. Stage 2 OLS treats `rtp_hat` as a fixed, known regressor, when in fact it was estimated from the data in Stage 1. That estimation error adds a variance component that Stage 2's residuals never see.

For any result you report to stakeholders, use `linearmodels.IV2SLS` (shown in "What to do next"), which computes the correct sandwich variance.

### Compare OLS and 2SLS Side by Side:

```py
print(f"OLS estimate (biased):  {ols_coef:+.4f}")
print(f"2SLS estimate (IV):     {tsls_coef:+.4f}")
print(f"True premium effect:   +0.0600")
print(f"OLS bias:               {ols_coef - 0.06:+.4f}")
#
# OLS estimate (biased):  +0.0327
# 2SLS estimate (IV):     +0.0599
# True premium effect:   +0.0600
# OLS bias:               -0.0273
```

Here, OLS misses the true effect by 2.7 pp, a 45% underestimate. 2SLS recovers it to within 0.01 pp. The direction of the gap matches the confounding mechanism: unobserved query complexity routes hard queries to premium and reduces their completion, pulling the OLS coefficient downward.

![Figure 2: Data-driven results on the 50,000-user synthetic dataset. Left panel: routing rates by fallback group confirm the first-stage relationship: fallback=0 queries route premium at 39.1%, fallback=1 queries at 0% (complete override). Right panel: OLS CI (red) misses the true +0.06 pp effect entirely. 2SLS CI (green) covers it. The wider 2SLS interval reflects the variance cost of relying solely on the instrument's exogenous variation.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/dc39aa79-c955-4c4e-9962-f5a648d6e383.png)

---

## Step 3: Weak-Instrument Diagnostics

A valid instrument that has little effect on outcomes is a weak instrument. Weak instruments produce 2SLS estimates with enormous variance that drift toward the OLS estimate in small samples, which defeats the purpose. The standard diagnostic is the first-stage F-statistic.

```py
stage1_restricted = smf.ols(
    f"routed_to_premium_actual ~ {covariate_str}", data=df
).fit()

f_stat, f_pval, _ = stage1.compare_f_test(stage1_restricted)
print(f"First-stage F-statistic (instrument): {f_stat:.2f}")
print(f"p-value:                               {f_pval:.4f}")

if f_stat > 10:
    print("Instrument is STRONG (F > 10). 2SLS estimates are reliable.")
elif f_stat > 4:
    print("Instrument is BORDERLINE WEAK (4 < F < 10). Interpret with caution.")
else:
    print("Instrument is WEAK (F < 4). 2SLS estimates are unreliable.")

print(f"\nFirst-stage coefficient on instrument: "
      f"{stage1.params['rate_limit_fallback']:+.4f}")
#
# First-stage F-statistic (instrument): 3780.94
# p-value:                               0.0000
# Instrument is STRONG (F > 10). 2SLS estimates are reliable.
#
# First-stage coefficient on instrument: -0.3190
```

In the above code, you compare the full Stage 1 model (with the instrument) to a restricted model (without it) using an F-test. An F of 3780 is overwhelmingly above the Staiger-Stock rule of thumb. The 15% fallback rate applied to 50,000 observations yields a large, precisely estimated first-stage effect.

On a real production dataset with lower fallback rates or a smaller dataset, the F-statistic will be lower. If you get an F-statistic below 10, either find a stronger instrument or add more fallback data before drawing conclusions.

There's a trade-off between instrument strength and exclusion validity that's worth flagging explicitly. You can make an instrument stronger by increasing the fallback rate, but if you push it high enough to affect user experience, the fallback starts to directly affect task completion through satisfaction and retry behavior, which violates the exclusion restriction. A strong instrument that satisfies both relevance and exclusion is the goal.

The endogeneity direction check:

```py
gap = ols_coef - tsls_coef
print(f"OLS minus 2SLS gap: {gap:+.4f}")
if abs(gap) > 0.005:
    print("Gap suggests endogeneity bias is present in OLS.")
else:
    print("Small gap: OLS and 2SLS broadly agree.")
print("For a formal Hausman endogeneity test, use linearmodels IV2SLS.")
#
# OLS minus 2SLS gap: -0.0272
# Gap suggests endogeneity bias is present in OLS.
# For a formal Hausman endogeneity test, use linearmodels IV2SLS.
```

Here's what's happening: the gap between OLS and 2SLS is the diagnostic for endogeneity. A gap of 2.7 pp confirms that the routing variable is genuinely correlated with unobserved confounders, and that OLS was absorbing part of the confounder's effect.

For a formally valid Hausman test (one that produces a chi-squared statistic with a known distribution under the null), use `linearmodels.IV2SLS`'s built-in test. The direction check above is a quick diagnostic only.

---

## Step 4: The LATE is the Quantity You Actually Care About

2SLS estimates the Local Average Treatment Effect (LATE), also called the Complier Average Causal Effect (CACE). The LATE applies only to compliers: the specific subset of queries whose routing actually changes when the instrument fires. Rate-limit fallbacks affect only premium-eligible queries that experience a fallback, so the LATE is specific to that subpopulation.

```py
compliers_mask = df["rate_limit_fallback"] == 1
complier_count = compliers_mask.sum()
complier_pct   = complier_count / n * 100

print(f"Approximate complier population: {complier_count:,} ({complier_pct:.1f}% of queries)")
print(f"\nComplier mean confidence:     {df[compliers_mask]['query_confidence'].mean():.3f}")
print(f"Non-complier mean confidence: {df[~compliers_mask]['query_confidence'].mean():.3f}")
print(f"\n2SLS LATE estimate: {tsls_coef:+.4f}")
print("This is the causal effect of premium routing for queries rerouted")
print("by rate-limit fallbacks, not all queries in the dataset.")
#
# Approximate complier population: 7,575 (15.2% of queries)
#
# Complier mean confidence:     0.716
# Non-complier mean confidence: 0.715
#
# 2SLS LATE estimate: +0.0599
# This is the causal effect of premium routing for queries rerouted
# by rate-limit fallbacks, not all queries in the dataset.
```

In this code, the complier population is 7,575 queries (those that experienced a rate-limit fallback and were rerouted from premium to cheap). Their mean confidence (0.716) is nearly identical to the non-complier group (0.715), confirming that the fallback fired independently of query characteristics.

When compliers look like a representative slice of all queries on observables, the LATE is often a reasonable approximation of the average treatment effect (ATE).

Observable representativeness meets the minimum diagnostic standard. The formal LATE-to-ATE condition requires either homogeneous treatment effects across all units or a valid instrument for every unit in the population. If your routing effect is heterogeneous across query types (premium routing helps complex queries far more than simple ones, for instance), the LATE can diverge substantially from the ATE, even when the complier mean confidence looks similar to that of the non-complier group.

For strategic capacity planning, this is exactly the metric you need. When you ask whether to invest in greater premium model capacity or adjust rate limits, you're asking a specific question about the queries currently constrained by your infrastructure. 2SLS answers that question directly.

---

## Step 5: Bootstrap Confidence Intervals

Manual 2SLS produces Stage 2 standard errors that are too small, as explained in Step 2. Bootstrap CIs give you reliable uncertainty estimates without needing to derive the correct analytic variance formula. The bootstrap resamples the full two-stage procedure together, capturing the sampling variance from both stages.

```py :collapsed-lines
rng_boot = np.random.default_rng(7)
ols_boot, tsls_boot = [], []

for _ in range(500):
    samp = df.sample(len(df), replace=True,
                     random_state=int(rng_boot.integers(1_000_000_000)))

    # OLS bootstrap
    ols_b = smf.ols(
        f"task_completed_iv ~ routed_to_premium_actual + {covariate_str}",
        data=samp
    ).fit()
    ols_boot.append(ols_b.params["routed_to_premium_actual"])

    # 2SLS bootstrap (two stages together)
    s1b = smf.ols(
        f"routed_to_premium_actual ~ rate_limit_fallback + {covariate_str}",
        data=samp
    ).fit()
    samp = samp.copy()
    samp["rtp_hat"] = s1b.fittedvalues
    s2b = smf.ols(
        f"task_completed_iv ~ rtp_hat + {covariate_str}",
        data=samp
    ).fit()
    tsls_boot.append(s2b.params["rtp_hat"])

ols_ci  = (np.percentile(ols_boot, 2.5),  np.percentile(ols_boot, 97.5))
tsls_ci = (np.percentile(tsls_boot, 2.5), np.percentile(tsls_boot, 97.5))
true_eff = 0.0600

print(f"OLS  95% CI: [{ols_ci[0]:+.4f}, {ols_ci[1]:+.4f}]")
print(f"2SLS 95% CI: [{tsls_ci[0]:+.4f}, {tsls_ci[1]:+.4f}]")
print(f"Ground truth: +{true_eff:.4f}")
print(f"OLS CI covers ground truth:  {ols_ci[0] <= true_eff <= ols_ci[1]}")
print(f"2SLS CI covers ground truth: {tsls_ci[0] <= true_eff <= tsls_ci[1]}")
#
# OLS  95% CI: [+0.0227, +0.0426]
# 2SLS 95% CI: [+0.0247, +0.0969]
# Ground truth: +0.0600
# OLS CI covers ground truth:  False
# 2SLS CI covers ground truth: True
```

In this code, the OLS 95% CI ([+0.023, +0.043]) entirely misses the true +0.06 effect. Every value in that interval is below the ground truth: OLS is confidently wrong. The 2SLS CI ([+0.025, +0.097]) covers the ground truth. It's wider than the OLS interval, reflecting the variance cost of IV estimation: you pay in precision to gain in validity.

The bootstrap resamples both stages in each iteration, so the uncertainty correctly accounts for the two-stage structure. Use bootstrap CIs when reporting 2SLS results from a manual implementation, as they're more reliable than the Stage 2 parametric SE.

---

## When Instrumental Variables Fail

IV analysis has failure modes more insidious than those of propensity scores or regression discontinuity, because two of the four assumptions are untestable from data alone.

### Weak Instruments

A first-stage F below 10 signals a serious identification problem. Weak instruments cause the 2SLS estimator to have large variance and drift toward OLS in finite samples, replicating the biased baseline while appearing to do something more sophisticated. Check the F-statistic before interpreting any IV result.

If F is below 10, find a stronger instrument or report the estimate with an explicit weak-instrument warning. The instrument here is strong (F = 3780) because the 15% fallback rate applied to 50,000 queries yields 7,500+ routing changes.

### Exclusion Restriction Violations

If the rate-limit fallback affects task completion through any channel other than the routing decision, exclusion fails.

There are two plausible violations: fallback events cluster during high-traffic periods when users are also more likely to be doing complex batch jobs, making the instrument correlated with query difficulty after all. Or users who experience a fallback notice the degraded response quality and abandon the session, creating a direct Z to Y path through user frustration.

Both violate exclusion while leaving relevance intact. You can't test them from data. You have to argue from system knowledge.

### LATE vs. ATE Confusion

Using the LATE estimate to justify a broad routing policy change is wrong if compliers are atypical. If rate-limit fallbacks disproportionately hit complex queries (because complex queries take longer and are more likely to hit a rate limit mid-session), the LATE covers the causal effect of premium routing for that complex-query subpopulation.

Reporting it as if it were the ATE overstates the benefit of routing all queries premium. The complier characteristics table in Step 4 is the diagnostic: if compliers and non-compliers look similar on observables, the LATE is a credible approximation of the ATE.

### Defiers and the Monotonicity Assumption

The LATE interpretation requires monotonicity: the instrument moves all affected units in the same direction. For rate-limit fallbacks, this is almost certainly satisfied, since a fallback always reduces the probability of premium routing for the affected query.

If some compensating mechanism exists (say, a fallback: one query triggers a priority boost on the next), you have defiers, and the monotonicity assumption breaks down. Verify directional consistency before trusting the LATE.

---

## What to Do Next

The manual 2SLS implementation in this tutorial is transparent about the mechanism but produces incorrect standard errors. For any result you report to stakeholders or include in a published analysis, use `linearmodels.IV2SLS`:

```py
# Production-grade 2SLS with correct standard errors
# pip install linearmodels
from linearmodels.iv import IV2SLS

exog_vars = ["query_confidence"] + tier_dummies
iv_model = IV2SLS.from_formula(
    f"task_completed_iv ~ 1 + {' + '.join(exog_vars)} "
    f"[routed_to_premium_actual ~ rate_limit_fallback]",
    data=df
).fit(cov_type="robust")

print(iv_model.summary)
```

Here's what's happening: `linearmodels` computes the correct 2SLS variance that accounts for the two-stage structure, runs a proper first-stage diagnostic summary, and provides a formal Hausman endogeneity test. The syntax brackets the endogenous variable and instrument: `[D ~ Z]`.

The full implementation (including bootstrap confidence intervals and the visualization in Figure 2) is in the companion notebook at [<VPIcon icon="fas fa-code-branch"/>`main`/<VPIcon icon="fas fa-folder-open"/>`11_instrumental_variables`/ (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/11_instrumental_variables/). Clone the repo, generate the synthetic dataset, and run <VPIcon icon="iconfont icon-jupyter"/>`iv_demo.ipynb` to reproduce every code block end-to-end.

One final note on when to reach for IV at all: if your system supports forced routing randomization (randomly assigning a fraction of queries to premium regardless of confidence score), a standard A/B test is simpler and produces a full-fleet ATE estimate.

IV is the right tool when randomization is infeasible: when the routing rule is baked into production logic, when you can't afford to deliberately route queries suboptimally, or when you need to use historical observational data. If you can run a true experiment, run it.

Confounding is the structural default for any optimized routing system. Standard regression folds model quality and inherent query difficulty into a single coefficient, measuring both at once when you need them separated.

Rate-limit fallbacks provide the clean, natural instrument that filters infrastructure noise from routing signal. This approach gives your team a defensible causal estimate of how your model architecture actually drives business value.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Instrumental Variables: Unconfounding LLM Routing Decisions in Python",
  "desc": "For data science leaders and product managers who are overseeing multi-model gateways, the standard regression approach to measuring model quality is fundamentally flawed. You're running a causal infe",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/instrumental-variables-for-llm-routing-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
