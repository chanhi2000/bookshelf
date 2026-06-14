---
lang: en-US
title: "Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python"
description: "Article(s) > Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
  - Matplotlib
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
  - matplotlib
  - py-matplotlib
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python"
    - property: og:description
      content: "Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/switchback-experiments-for-ai-platform-features-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-01
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/50802c2c-ef8c-4137-852a-eed1000e67e7.png
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
  "title": "Matplotlib > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-matplotlib/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python"
  desc="Your team ships an intelligent query-routing feature for an LLM SaaS platform. The feature reads each incoming request in real time and decides whether to send it to the fast standard model or the mor"
  url="https://freecodecamp.org/news/switchback-experiments-for-ai-platform-features-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/50802c2c-ef8c-4137-852a-eed1000e67e7.png"/>

Your team ships an intelligent query-routing feature for an LLM SaaS platform. The feature reads each incoming request in real time and decides whether to send it to the fast standard model or the more capable premium model. In offline evaluation, it raises task completion rates by six percentage points.

You're ready to test it in production. Then your platform engineer raises a structural problem: you can't randomize at the user level.

This issue is rooted in causal inference and runs deeper than a technical constraint. Every user draws from a centralized pool of premium model capacity. A standard A/B test creates an uneven playing field in this environment. When the routing AI is active for the treatment group, those users consume premium resources first, leaving the control group with degraded availability.

The routing AI does more than alter the treatment group's experience. It fundamentally shifts the resource environment for everyone else. You're not isolating the AI's impact. You're measuring the combined effect of the routing AI and the artificial scarcity your experimental design imposed on the control group. That's a confounded measurement, not a clean experiment.

Switchback experiments are the standard fix for LLM-based platforms and for any shared-resource product where user-level randomization would break the comparison. You stop randomizing users and randomize time slots instead.

The full platform runs with AI routing on for a 30-minute slot, then off for the next 30 minutes. You repeat the cycle, accumulate enough slots, and estimate the average treatment effect from the contrast between AI-on and AI-off slots.

This tutorial walks through the full switchback pipeline in Python: building the time series from session logs, diagnosing carryover contamination, estimating the direct effect with and without carryover adjustment, applying HAC standard errors for time-series data, computing bootstrap confidence intervals, and validating all estimates against a known ground truth.

By the end, you'll know how to run this analysis on your own LLM platform data and how to spot the four conditions that break it.

---

## Why User-Level A/B Testing Fails on Shared LLM Infrastructure

Standard A/B testing buys you causal inference through randomization. When you flip a coin to assign each user to treatment or control, both groups share identical distributions of every confounder on average. Differences in outcomes trace back to the treatment. The logic holds when users act independently of each other.

Shared LLM infrastructure breaks that independence. Consider the query-routing scenario. If 50% of users are assigned to AI routing, they receive priority access to the premium model, enabling them to complete tasks faster and at higher rates. The remaining 50% operate in a degraded environment, where premium-model queues are longer because treatment-group sessions occupy capacity. Control-group users experience worse availability not because the AI routing feature fails them, but because your experiment design created artificial scarcity for them.

Interference is the structural problem here: the Stable Unit Treatment Value Assumption, known as SUTVA, holds that a unit's outcome depends solely on that unit's treatment assignment.

SUTVA fails on shared LLM infrastructure. A treated user's session claims capacity that determines whether a control user gets routed to the premium model or the degraded standard model. The control group is no longer a clean counterfactual.

The estimated treatment effect under user-level randomization is:

```plaintext
Naive ATE = E[outcome | AI-on user] - E[outcome | AI-off user, degraded capacity]
```

The counterfactual you actually need is what AI-off users would have experienced if no users had AI routing, with no capacity degradation. You never observe that counterfactual in a 50/50 user-level split. Your estimate conflates the routing AI's direct effect with the capacity-degradation penalty, and separating them requires knowing the full capacity-utilization function, which you almost never have.

Other shared-resource LLM platform patterns produce the same failure: a caching layer that speeds retrieval for treated users but drains shared cache space for control users, and a fine-tuned model version that consumes GPU memory, leaving standard inference slower for the control group, or a batch-processing scheduler that prioritizes AI-routed requests and creates queuing delays for everything else. Anything touching a shared resource pool contaminates the control group.

---

## How Switchback Design Restores a Clean Comparison

Because standard randomization can poison the control group through shared resources, a switchback design changes what you randomize. You stop randomizing users. You randomize time slots.

The entire platform operates under a single treatment condition at any given time: AI routing is either on or off for all users.

The treatment indicator switches between slots on a predetermined schedule, cycling through alternating blocks across the experiment. At the end of the run, you have a time series of slots, each with a treatment indicator and an aggregate outcome, such as the mean task completion rate or the mean cost per session. You regress the outcome on the treatment indicator, and the coefficient is your average treatment effect estimate.

![Figure 1: Conceptual schematic of the 3-slot switchback design. Blue regions are AI-routing-on blocks, while orange marks the first AI-off slot of each cycle where carryover from the prior on-block artificially elevates outcomes.<br/>The green band shows the true 6 pp direct effect. A naïve comparison of all-on vs. all-off slots inflates the estimated effect because it can't disentangle the direct contribution from within-block carryover.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/64756f6a-bfac-4fd3-b014-21d6ef724df4.png)

A clean comparison is restored because the platform operates under a single condition for any given slot. Every user within a slot sees the same treatment. The AI-off slots function as a reliable counterfactual for the AI-on slots, provided that demand conditions remain comparable across slots.

The key complication is carryover. If AI routing effects persist into a subsequent AI-off slot due to factors such as warm routing caches, in-flight sessions that began under AI routing and complete after the switch, or changed user behavior that persists across the slot boundary, then AI-off slot outcomes are artificially elevated by residual AI effects.

The naïve comparison conflates this inherited elevation with the direct treatment effect, biasing the estimate upward. Estimating and removing carryover is the core analytical challenge in switchback experiments: it's where most of the real work lives, and most of what this tutorial covers.

---

## Identification Assumptions

Switchback estimates have a causal interpretation only when four conditions hold.

### 1. Zero or bounded carryover between slots.

AI routing effects from one slot don't persist far enough into later slots to bias the comparison. The carryover model in this tutorial captures first-order persistence (one lag). If effects persist for multiple periods, you need more lag terms in the regression.

### 2. Demand stationarity across the treatment schedule.

AI-on and AI-off slots face similar underlying demand conditions. If Monday morning slots are always AI-on and Sunday afternoon slots are always AI-off, demand differences contaminate the treatment comparison in ways no lag correction can fix.

### 3. No ramp-up effects at block boundaries.

The system reaches steady-state behavior within each slot. If the first slot of each AI-on block performs worse than subsequent slots because the routing model's cache is cold, that ramp-up period produces a downward-biased estimate of the steady-state direct effect.

### 4. Residual autocorrelation is addressed.

Slot residuals may be correlated over time due to demand cycles, capacity events, and platform-level shocks spanning multiple periods. HAC standard errors or bootstrap CIs correct for this (as plain OLS standard errors aren't sufficient).

The "When switchback fails" section maps each failure mode to the specific assumption it violates.

::: info

All code in this tutorial runs end-to-end in the companion notebook at [`06_switchback/switchback_demo.ipynb` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/06_switchback/).

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/06_switchback at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/06_switchback/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f60e44431af2d481a610a5962d64eb8adcf952744e03d546cc72d3186012b91a/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

::: note Prerequisites

- Python 3.11+
- pandas 2.x (`pip install pandas`)
- numpy 1.26+ (`pip install numpy`)
- statsmodels 0.14+ (`pip install statsmodels`)
- matplotlib 3.8+ (`pip install matplotlib`)

:::

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py
```

The generate script writes <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`synthetic_llm_logs.csv`, a 50,000-row file of synthetic SaaS LLM product telemetry. Key columns are `user_id`, `task_completed` (binary outcome), `cost_usd`, and `session_minutes`.

After slot assignment in Step 1, each of the 48 time slots contains approximately 1,042 sessions. The dataset represents realistic LLM platform traffic: query arrival rates, model cost distributions, and session lengths are drawn from distributions calibrated to production patterns.

---

## Step 1: Build the Switchback Time Series

Switchback experiments are run with a live treatment-assignment controller that flips the routing AI on or off at the slot boundary in production.

For this tutorial, you construct the time series from the session log by mapping each row to a synthetic hour slot, then aggregating to the slot level.

```py :collapsed-lines
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")
print(f"Dataset shape: {df.shape}")
print(df[["user_id", "task_completed", "cost_usd", "session_minutes"]].head(3).round(3))

# Shuffle to eliminate row-ordering bias before slot assignment
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Assign hour slots: 48 slots, each containing ~1,042 sessions
df['hour_slot'] = df.index % 48

# Treatment schedule: 3-slot blocks (on, on, on, off, off, off, ...)
# 3-slot blocks give the platform time to settle into each state and break
# the perfect collinearity between ai_on and its one-period lag.
ai_on_schedule = np.tile([1, 1, 1, 0, 0, 0], 8)   # 48 slots, 8 full cycles
df['ai_on'] = ai_on_schedule[df['hour_slot']]

# Aggregate to slot level: mean outcome, mean cost, treatment indicator, session count
slots = df.groupby('hour_slot').agg(
    mean_task_completed = ('task_completed', 'mean'),
    mean_cost           = ('cost_usd',       'mean'),
    ai_on               = ('ai_on',          'first'),
    n_obs               = ('user_id',         'count')
).reset_index()

print(f"\nSlot-level data: {len(slots)} slots")
print(slots[['hour_slot', 'ai_on', 'mean_task_completed', 'mean_cost', 'n_obs']].head(8).round(4))
print(f"\nAI-on slots: {slots['ai_on'].sum()},  AI-off slots: {(1 - slots['ai_on']).sum()}")
#
# Dataset shape: (50000, 16)
#    user_id  task_completed  cost_usd  session_minutes
# 0        0               0     0.022             7.03
# 1        1               1     0.008             4.07
# 2        2               1     0.040             8.34
# 
# Slot-level data: 48 slots
#    hour_slot  ai_on  mean_task_completed  mean_cost  n_obs
# 0          0      1               0.5950     0.0222   1042
# 1          1      1               0.5806     0.0223   1042
# 2          2      1               0.5950     0.0224   1042
# 3          3      0               0.6353     0.0218   1042
# 4          4      0               0.6017     0.0222   1042
# 5          5      0               0.6094     0.0218   1042
# 6          6      1               0.5912     0.0218   1042
# 7          7      1               0.5931     0.0219   1042
# 
# AI-on slots: 24,  AI-off slots: 24
```

The process begins by shuffling the dataset before slot assignment to eliminate any row-ordering artifacts from data generation. Each of the 50,000 rows is assigned to one of 48 synthetic hour slots using modulo arithmetic, and the treatment schedule alternates in 3-slot blocks, completing eight full cycles.

The 3-slot block structure serves two purposes: it gives the platform time to settle into each treatment state, and it breaks the perfect collinearity between the current treatment indicator and its one-period lag, which would otherwise make carryover estimation impossible under a purely alternating schedule. After aggregation, each slot contains approximately 1,042 sessions.

Notice that before injection, the slot-level means don't yet separate clearly by treatment. Slots 3, 4, and 5 (AI-off) show slightly higher completion rates than slots 0, 1, and 2 (AI-on) in the raw data. That's expected: before injection, the treatment assignment is arbitrary, and outcomes carry no true signal. The injection step below bakes in the ground truth.

```py :collapsed-lines
# Known ground truth baked into the simulation
TRUE_EFFECT = 0.060   # AI routing raises task completion by 6 percentage points
CARRYOVER   = 0.030   # Residual routing effect persists into the following slot

# Replace slot means with synthetic balanced base rates.
# Slot noise std matches the CLT variance of aggregating ~1,042 Bernoulli sessions,
# simulating realistic slot-to-slot demand variation without treatment-group imbalance.
BASE_RATE = df['task_completed'].mean()
slot_noise_std = np.sqrt(BASE_RATE * (1 - BASE_RATE) / slots['n_obs'].iloc[0])
rng = np.random.default_rng(42)
slots['mean_task_completed'] = BASE_RATE + rng.normal(0, slot_noise_std, size=len(slots))

# Lag the treatment indicator: did the previous slot have AI routing on?
slots['ai_on_lag1'] = slots['ai_on'].shift(1).fillna(0).astype(int)

# Observed outcome = base outcome + treatment effect + carryover from prior slot
slots['mean_task_completed'] = (
    slots['mean_task_completed']
    + TRUE_EFFECT * slots['ai_on']
    + CARRYOVER   * slots['ai_on_lag1']
)

print("Post-injection slot data:")
print(slots[['hour_slot', 'ai_on', 'ai_on_lag1', 'mean_task_completed']].head(8).round(4))
#
# Post-injection slot data:
#    hour_slot  ai_on  ai_on_lag1  mean_task_completed
# 0          0      1           0               0.6606
# 1          1      1           1               0.6701
# 2          2      1           1               0.6973
# 3          3      0           1               0.6402
# 4          4      0           0               0.5663
# 5          5      0           0               0.5761
# 6          6      1           0               0.6579
# 7          7      1           1               0.6811
```

The injection substitutes raw slot means with noise calibrated to the variance of 1,042 Bernoulli trials, producing slot-to-slot fluctuation that mirrors production demand variability without artificial treatment-group imbalance.

The lag of `ai_on` identifies which slots immediately follow an AI-on period. The injection formula then adds `TRUE_EFFECT` (0.060) to every AI-on slot and `CARRYOVER` (0.030) to every slot that follows an AI-on slot, regardless of its own treatment status.

Look at slot 3: `ai_on=0` but `ai_on_lag1=1`, so its outcome receives the +0.030 carryover boost even though AI routing is off. That's the carryover contamination a naïve model can't see.

The first AI-off slot of each cycle reflects a genuine off period, but its outcome is elevated by residual routing state from the previous block. A naïve comparison of all AI-on vs. all AI-off slots treats that elevated outcome as part of the AI-off baseline, distorting the true direct effect.

![Figure 2: Left: the 48-slot time series from the synthetic dataset after injecting a 6 pp treatment effect and 3 pp carryover. Orange dots mark the first AI-off slot of each cycle (ai_on=0, ai_on_lag1=1), where outcomes remain elevated from the prior AI-on block.<br/>Right: naïve OLS (red) overshoots the true 6 pp effect by 0.9 pp because it conflates direct and inherited carryover. The carryover-adjusted OLS (blue) recovers the true effect. Both 95% bootstrap CIs include the green dashed true-effect line.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/a2e1458b-751e-4e64-9e76-ea269f09de5d.png)

---

## Step 2: Naive Estimate (Ignoring Time Structure)

Before adding any sophistication, compute the obvious estimate: regress mean task completion on the binary AI-on indicator, ignoring the time structure entirely.

```py
import statsmodels.api as sm

# Naive OLS: outcome ~ constant + ai_on
# No lag term, no time controls
X_naive = sm.add_constant(slots['ai_on'])
naive_model = sm.OLS(slots['mean_task_completed'], X_naive).fit()

naive_ate = naive_model.params['ai_on']
naive_se  = naive_model.bse['ai_on']

print("=== Naive estimate (no carryover control) ===")
print(f"  ATE estimate : {naive_ate:.4f}")
print(f"  Std error    : {naive_se:.4f}")
print(f"  95% CI       : [{naive_ate - 1.96*naive_se:.4f},  {naive_ate + 1.96*naive_se:.4f}]")
print(f"\n  True effect  : {TRUE_EFFECT}")
print(f"  Bias         : {naive_ate - TRUE_EFFECT:+.4f}")
#
=== Naive estimate (no carryover control) ===
  ATE estimate : 0.0688
  Std error    : 0.0048
  95% CI       : [0.0595,  0.0782]

  True effect  : 0.06
  Bias         : +0.0088
```

The naïve OLS regresses mean task completion on the binary AI-on indicator alone, treating the 48 slots as 48 independent observations with no time structure. It returns an ATE of 0.0688 against a true direct effect of 0.060, a bias of +0.0088, nearly a full percentage point of artificial lift.

The bias stems from how carryover is distributed between the two groups. In a 3-slot-on / 3-slot-off design, slots 1 and 2 of every AI-on block receive both the direct treatment effect (+0.060) and the carryover effect (+0.030) from the previous on-slot, pushing their outcomes to base + 0.090. The naïve model can't separate these two contributions: it sees a high outcome in an AI-on slot and attributes it entirely to the direct treatment. Across 24 AI-on slots, 16 receive this compound injection, pulling the group average well above the true direct effect.

On the AI-off side, the first off-slot of each block receives +0.030 carryover, which raises the AI-off group's baseline. That partially offsets the AI-on group inflation, but 16 slots of compound AI-on inflation outweigh 8 slots of AI-off carryover. The net result is a positive bias of roughly +0.009 percentage points.

A team acting on 0.0688, when the true effect is 0.060, will declare a larger effect than exists and over-prioritize the routing feature relative to other initiatives.

---

## Step 3: Carryover-Adjusted OLS Regression

The fix is to add the lagged treatment indicator to the regression. The coefficient on `ai_on` then measures the direct effect of the current period's treatment, holding the prior period's treatment constant. That's the quantity you want.

```py
# Carryover-adjusted OLS: outcome ~ constant + ai_on + ai_on_lag1
X_adj = sm.add_constant(slots[['ai_on', 'ai_on_lag1']])
adj_model = sm.OLS(slots['mean_task_completed'], X_adj).fit()

adj_ate      = adj_model.params['ai_on']
adj_carryover = adj_model.params['ai_on_lag1']
adj_se        = adj_model.bse['ai_on']

print("=== Carryover-adjusted estimate ===")
print(adj_model.summary().tables[1])

print(f"\n  Direct ATE estimate  : {adj_ate:.4f}  (true: {TRUE_EFFECT})")
print(f"  Carryover estimate   : {adj_carryover:.4f}  (true: {CARRYOVER})")
print(f"  Residual bias        : {adj_ate - TRUE_EFFECT:+.4f}")

# How much did we remove?
removed = naive_ate - adj_ate
print(f"\n  Bias removed vs naive: {removed:.4f}")
#
# === Carryover-adjusted estimate ===
# ==============================================================================
#                  coef    std err          t      P>|t|      [0.025      0.975]
# ------------------------------------------------------------------------------
# const          0.5996      0.003    222.975      0.000       0.594       0.605
# ai_on          0.0607      0.004     16.830      0.000       0.053       0.068
# ai_on_lag1     0.0244      0.004      6.754      0.000       0.017       0.032
# ==============================================================================
# 
#   Direct ATE estimate  : 0.0607  (true: 0.06)
#   Carryover estimate   : 0.0244  (true: 0.03)
#   Residual bias        : +0.0007
# 
#   Bias removed vs naive: 0.0081
```

The adjusted regression includes both `ai_on` (current slot treatment) and `ai_on_lag1` (previous slot treatment) as regressors.

The model now decomposes the drivers of elevated outcomes in each slot: some elevation comes from the current period's AI routing, and some from the previous period's residual. The coefficient on `ai_on` isolates only the current-period direct effect.

The direct ATE estimate drops from 0.0688 to 0.0607, recovering the true value of 0.060 to within 0.0007, with a residual bias smaller than the standard error.

The carryover estimate is 0.0244, compared with a true carryover of 0.030. Some underestimation is expected: the 3-slot block structure creates slots where both `ai_on` and `ai_on_lag1` equal 1, introducing mild collinearity that slightly attenuates the carryover coefficient. Adding `ai_on_lag1` removed 0.0081 of the 0.0088 naïve bias, recovering roughly 92% of the upward distortion.

The two-coefficient interpretation matters for product decisions. The `ai_on` coefficient (0.0607) is the **direct effect**: what AI routing adds in the current slot, independent of what happened in the prior slot. The `ai_on_lag1` coefficient (0.0244) is the **carryover effect**: the residual impact that persists into the next slot after routing is switched off. In a real LLM platform, carryover might reflect session-level state, warm inference caches, or shifts in user behavior that span the slot boundary.

If `ai_on_lag2` and `ai_on_lag3` still improve model fit as measured by decreasing AIC, your slot length is shorter than the system's memory, and you need more lag terms. Add lags until AIC stops improving, and use domain knowledge to set a ceiling on plausible persistence given your platform's architecture.

---

## Step 4: HAC Standard Errors for Time-series Data

The adjusted OLS model gives you the right point estimate. But the standard errors it reports assume residuals are uncorrelated across time.

Slot residuals inherit any systematic variation not captured by the treatment indicators: demand cycles, capacity events, model-version deployments, and user behavior patterns that span multiple periods. That autocorrelation makes OLS standard errors too small, which inflates your t-statistics and makes the effect look more precisely measured than it is.

The correction is Heteroskedasticity- and Autocorrelation-Consistent (HAC) standard errors, also called Newey-West standard errors. They correct for serial correlation in residuals using a bandwidth parameter equal to the number of lags you expect to matter.

```py :collapsed-lines
from statsmodels.stats.sandwich_covariance import cov_hac
from statsmodels.stats.stattools import durbin_watson

# First check for autocorrelation in the residuals
dw_stat = durbin_watson(adj_model.resid)
print(f"Durbin-Watson statistic: {dw_stat:.4f}")
print("  DW near 2.0 = little autocorrelation in residuals.")
print("  DW < 1.5 = positive serial correlation.")
print("  DW > 2.5 = negative serial correlation.")
print("  Apply HAC standard errors regardless -- DW only tests AR(1) structure.")

# Apply HAC correction (Newey-West), 3 lags
hac_cov = cov_hac(adj_model, nlags=3)
hac_se  = np.sqrt(np.diag(hac_cov))

print("\n=== Standard error comparison ===")
print(f"  OLS SE on ai_on  : {adj_model.bse['ai_on']:.4f}")
print(f"  HAC SE on ai_on  : {hac_se[1]:.4f}")
print(f"  OLS t-stat       : {adj_model.tvalues['ai_on']:.2f}")
print(f"  HAC t-stat       : {adj_ate / hac_se[1]:.2f}")

# Construct HAC-based confidence interval manually
hac_ci_lower = adj_ate - 1.96 * hac_se[1]
hac_ci_upper = adj_ate + 1.96 * hac_se[1]
print(f"\n  HAC 95% CI: [{hac_ci_lower:.4f},  {hac_ci_upper:.4f}]")
print(f"  True effect {TRUE_EFFECT} inside CI: {hac_ci_lower < TRUE_EFFECT < hac_ci_upper}")
#
# Durbin-Watson statistic: 1.9628
#   DW near 2.0 = little autocorrelation in residuals.
#   DW < 1.5 = positive serial correlation.
#   DW > 2.5 = negative serial correlation.
#   Apply HAC standard errors regardless -- DW only tests AR(1) structure.
# 
# === Standard error comparison ===
#   OLS SE on ai_on  : 0.0036
#   HAC SE on ai_on  : 0.0037
#   OLS t-stat       : 16.83
#   HAC t-stat       : 16.41
# 
#   HAC 95% CI: [0.0535,  0.0680]
#   True effect 0.06 inside CI: True
```

The Durbin-Watson statistic near 2.0 (1.9628) indicates very little AR(1) autocorrelation in the residuals on this synthetic dataset, so the HAC and OLS standard errors are nearly identical. The HAC 95% CI [0.0535, 0.0680] contains the true effect of 0.060, confirming the adjusted estimate is valid.

In production LLM platforms where demand correlates across consecutive hours (morning surges, lunchtime dips, evening peaks), positive serial correlation causes OLS standard errors to understate uncertainty. I've seen teams skip this step and report t-statistics of 20+ on effects that don't hold up.

HAC corrections in those settings bring those numbers down to realistic levels and occasionally flip a "significant" result to inconclusive. The flip to inconclusive is the method working correctly. Apply HAC by default in any time-series regression: it costs nothing when autocorrelation is absent, and it provides real protection when it's present.

The `nlags` parameter deserves deliberate choice. A reasonable default is the number of slots you'd expect your largest demand cycle to span. If your platform shows strong hour-of-day patterns and you're using 30-minute slots, set `nlags=4` or `nlags=6` to cover the two-to-three-hour neighborhood. If you use two-hour slots, `nlags=2` or `nlags=3` usually covers the relevant range.

---

## Step 5: Bootstrap Confidence Intervals

HAC standard errors correct for autocorrelation under the assumption that the autocorrelation structure follows a specific parametric form. Bootstrap CIs make no such assumption. They quantify estimation uncertainty by resampling slots with replacement and recomputing the estimator each time.

```py :collapsed-lines
def bootstrap_ci(slots, B=500, seed=7):
    """Bootstrap CIs treating each slot as an independent observation.
  
    Each slot's ai_on_lag1 value is fixed from the original treatment schedule.
    Resampling slots with replacement while keeping their original lag values
    correctly quantifies estimation uncertainty without destroying the lag structure.
    """
    rng  = np.random.default_rng(seed)
    n    = len(slots)
    naive_ates, adj_ates, carryover_ests = [], [], []

    for _ in range(B):
        idx = rng.integers(0, n, size=n)
        s   = slots.iloc[idx]  # ai_on_lag1 stays as the original slot's value

        X_n = sm.add_constant(s['ai_on'])
        naive_ates.append(sm.OLS(s['mean_task_completed'], X_n).fit().params['ai_on'])

        X_a = sm.add_constant(s[['ai_on', 'ai_on_lag1']])
        m   = sm.OLS(s['mean_task_completed'], X_a).fit()
        adj_ates.append(m.params['ai_on'])
        carryover_ests.append(m.params['ai_on_lag1'])

    naive_ci     = np.percentile(naive_ates,     [2.5, 97.5])
    adj_ci       = np.percentile(adj_ates,       [2.5, 97.5])
    carryover_ci = np.percentile(carryover_ests, [2.5, 97.5])

    print(f"\n=== Bootstrap 95% confidence intervals (B={B}, seed={seed}) ===")
    print(f"  Naive ATE        : [{naive_ci[0]:.4f},  {naive_ci[1]:.4f}]  "
          f"(covers {TRUE_EFFECT}: {naive_ci[0] < TRUE_EFFECT < naive_ci[1]})")
    print(f"  Adjusted ATE     : [{adj_ci[0]:.4f},  {adj_ci[1]:.4f}]  "
          f"(covers {TRUE_EFFECT}: {adj_ci[0] < TRUE_EFFECT < adj_ci[1]})")
    print(f"  Carryover effect : [{carryover_ci[0]:.4f},  {carryover_ci[1]:.4f}]  "
          f"(covers {CARRYOVER}: {carryover_ci[0] < CARRYOVER < carryover_ci[1]})")

    return naive_ci, adj_ci, carryover_ci

naive_ci, adj_ci, carryover_ci = bootstrap_ci(slots)
#
# === Bootstrap 95% confidence intervals (B=500, seed=7) ===
#   Naive ATE        : [0.0596,  0.0783]  (covers 0.06: True)
#   Adjusted ATE     : [0.0541,  0.0683]  (covers 0.06: True)
#   Carryover effect : [0.0175,  0.0320]  (covers 0.03: True)
```

Each bootstrap iteration resamples 48 slots with replacement, refits both the naive and adjusted OLS models, and records the key estimates. The 2.5th and 97.5th percentiles of those 500 replications give the bootstrap CIs.

Each slot brings its own `ai_on_lag1` value from the original treatment schedule, so the lag structure is preserved within each bootstrap draw. The resampling captures estimation uncertainty without fabricating temporal relationships that didn't exist.

All three 95% CIs cover their respective ground truths. The naive ATE CI [0.0596, 0.0783] covers the true effect (0.060) but is shifted upward, consistent with the +0.009 positive bias. The adjusted ATE CI [0.0541, 0.0683] is centered closer to the true effect and is narrower. The carryover CI [0.0175, 0.0320] covers the true carryover of 0.030 and excludes zero, confirming that the carryover is statistically distinguishable from no persistence.

The excluded-zero result matters for the product decision: if the carryover CI included zero, you couldn't rule out that all the elevated AI-off outcomes were sampling noise rather than genuine persistence.

---

## Validating Against the Ground Truth

Pull together the three point estimates against their known ground truths:

```py
print("=" * 52)
print(f"{'Estimator':<30} {'Estimate':>8}  {'True':>6}  {'Bias':>7}")
print("-" * 52)
print(f"{'Naive OLS (no lag)':<30} {naive_ate:>8.4f}  {TRUE_EFFECT:>6.4f}  {naive_ate - TRUE_EFFECT:>+7.4f}")
print(f"{'Carryover-adjusted OLS':<30} {adj_ate:>8.4f}  {TRUE_EFFECT:>6.4f}  {adj_ate - TRUE_EFFECT:>+7.4f}")
print(f"{'Carryover coefficient':<30} {adj_carryover:>8.4f}  {CARRYOVER:>6.4f}  {adj_carryover - CARRYOVER:>+7.4f}")
print("=" * 52)
#
# ====================================================
# Estimator                      Estimate    True     Bias
# ----------------------------------------------------
# Naive OLS (no lag)               0.0688  0.0600  +0.0088
# Carryover-adjusted OLS           0.0607  0.0600  +0.0007
# Carryover coefficient            0.0244  0.0300  -0.0056
# ====================================================
```

The comparison table shows exactly what each estimator recovers against the known ground truth.

The naïve OLS overshoots by 0.0088 percentage points because it can't separate the direct AI routing effect from the carryover that inflates AI-on and adjacent AI-off slots. The adjusted OLS recovers the true effect to within 0.0007, well inside the width of any reasonable confidence interval. The carryover coefficient is 0.0244, compared with a true value of 0.030. That's a systematic underestimate: the collinearity between `ai_on` and `ai_on_lag1` in the 3-slot block structure produces this attenuation across all designs of this type.

The practical implication runs beyond this synthetic example. In a real LLM platform, carryover can be larger than the treatment effect. If the AI routing system fundamentally reshapes how the inference cluster allocates warm-cache slots across users, the next period will inherit a compute distribution shaped by AI routing, even after the routing AI is off.

Under those conditions, the naïve estimate could substantially overstate the effect you'd observe from a full always-on rollout, where no switching exists, and no carryover asymmetry accumulates.

Always estimate the carryover coefficient. If it's statistically significant and greater than 20% of your direct ATE estimate, the naïve estimate is unreliable for rollout decisions.

---

## When Switchback Fails

Switchback solves marketplace interference under four conditions, and breaks under four others.

### 1. Carryover period longer than the slot length.

*Violated assumption: (1) zero or bounded carryover.*

If AI routing changes how the inference cluster pre-warms caches across multi-hour periods, the carryover half-life might exceed 60 or 90 minutes. A 30-minute slot length is shorter than the system's memory, and adding a single lag term won't capture the full persistence. You'll underestimate carryover and your direct effect estimate will remain biased.

The diagnostic: add progressively more lags and watch whether AIC keeps improving. If `ai_on_lag3` and `ai_on_lag4` still improve fit, your slot length is too short relative to system memory. Lengthening slots and adding more lag terms trade the same resource: fewer effective observations and wider confidence intervals.

### 2. Non-stationary demand confounding slots.

*Violated assumption: (2) demand stationarity across the treatment schedule.*

Weekday morning traffic surges, weekend evening spikes, and post-deployment adoption curves produce fundamentally different platform load conditions. If your treatment schedule places AI-on slots disproportionately in high-traffic windows and AI-off slots in low-traffic windows, the treatment coefficient absorbs demand differences as well as the routing AI's effect.

Randomizing the schedule within each day addresses this, as does including time-of-day fixed effects in the regression: a set of indicators for morning, afternoon, evening, and overnight absorbs within-day demand variation that would otherwise contaminate the treatment estimate.

### 3. Ramp-up effects at the first slot of each on-period.

*Violated assumption: (3) no ramp-up at block boundaries.*

In a real LLM platform, the first AI-on slot often underperforms subsequent slots. The routing model's cache is cold. The demand-prediction layer hasn't observed the current day's query distribution.

Including the cold-start slot alongside steady-state AI-on slots averages a low-performing initialization period with a high-performing equilibrium period, and the ATE estimate understates the steady-state effect you'd observe at full rollout. Standard practice is to drop the first slot of each on-period as a burn-in window and estimate the ATE from slots 2 and 3 of each block.

### 4. Period autocorrelation producing overconfident p-values.

*Violated assumption: (4) residual autocorrelation addressed.*

The Durbin-Watson diagnostic is a first check, but it only detects AR(1) autocorrelation. Real LLM platform time series often have daily seasonality, intraday autocorrelation at specific hours, and structural breaks after model version deployments.

Plot the full ACF of the model residuals: spikes at lags corresponding to meaningful demand cycles signal that your `nlags` parameter in `cov_hac` needs to increase, or you should switch to bootstrap CIs that don't assume any particular autocorrelation structure.

Failing to correct for autocorrelation is the most common source of false positives in switchback analyses at LLM platforms.

Two additional design-level failure modes are worth tracking.

Slot lengths under 15 minutes mean the platform hasn't cleared between switches: queue depth, in-flight session count, and cache state all carry over from the prior period, amplifying contamination and making AI-off periods non-representative of steady-state operations.

Slot lengths longer than 4 hours reduce the number of treatment-control pairs, shrinking the effective sample size and widening confidence intervals to the point where you can't detect plausible-sized effects.

The practical sweet spot for most LLM platform experiments is 30 minutes to 2 hours per slot, with final calibration determined by the carryover half-life estimated from early pilot data.

---

## When to Use Switchback vs. Cluster Randomization

Switchback and cluster randomization solve the same interference problem through different mechanisms.

Cluster randomization partitions users into non-overlapping segments by geographic region, tenant ID, or organizational account, and assigns segments to treatment and control simultaneously. Switchback assigns the full population to treatment and control at different times.

Cluster randomization works well when you have enough separable segments and between-segment spillover is negligible. For an LLM SaaS platform with enterprise tenants on dedicated compute slices, cluster randomization by tenant is feasible: one tenant's routing decisions don't exhaust capacity for another's sessions.

For a consumer LLM platform where all users share the same inference fleet, capacity spillover crosses any user-segment boundary you draw, and cluster randomization can't isolate it.

Switchback is appropriate when spillover crosses segment boundaries or when you don't have enough separable clusters to run a properly powered cluster experiment.

Most large platforms use both: switchback for platform-wide infrastructure changes where no clean segment boundary exists, cluster randomization for features that can be scoped to a tenant or geographic region.

The choice comes down to where you can plausibly break the interference. Time is a natural boundary when the system clears faster than the slot length, so the platform fully processes the effects of one condition before switching to the next. Segment identity is a natural boundary when resource pools genuinely don't overlap. Where neither boundary holds, you're in causal estimation territory: synthetic control methods, difference-in-differences with matched controls, or structural models of the interference mechanism.

---

## What to Do Next

If your switchback analysis shows a significant positive direct effect with a well-identified carryover term, the next hard question is whether the effect size justifies full rollout given the cost of the AI routing infrastructure. The premium model costs more per query than the standard model. Whether a 6 pp completion-rate lift covers that incremental inference cost depends on your product's monetization mechanics.

The carryover estimate shapes that decision too.

A large carryover coefficient means that some of the measured lift is dissipated once you switch to always-on routing, and the switching asymmetry disappears. The causal cost-benefit calculation requires the direct ATE, not the naïve estimate you'd get without the lag adjustment: revenue impact of the completion-rate gain, incremental inference cost at full traffic, and the confidence interval around each estimate before committing to an infrastructure investment.

If the routing AI shows heterogeneous effects across query types or user segments, the next analytical step is uplift modeling: building a model that predicts which queries benefit most from premium routing, so you route selectively and capture most of the task-completion gain at a fraction of the cost.

The causal identification work you've done here, including the switchback design, carryover adjustment, and HAC correction, gives you the unbiased population ATE you need as the ground-truth anchor for calibrating that uplift model.

::: info

The full companion code is at [`06_switchback/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/06_switchback/), including the notebook with all five steps, the figure-generation scripts, and the dataset-generation code.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/06_switchback at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/06_switchback/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f60e44431af2d481a610a5962d64eb8adcf952744e03d546cc72d3186012b91a/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation for LLM Platforms: Switchback Designs When User Randomization Breaks Market Equilibrium in Python",
  "desc": "Your team ships an intelligent query-routing feature for an LLM SaaS platform. The feature reads each incoming request in real time and decides whether to send it to the fast standard model or the mor",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/switchback-experiments-for-ai-platform-features-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
