---
lang: en-US
title: "Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)"
description: "Article(s) > Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)"
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
      content: "Article(s) > Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)"
    - property: og:description
      content: "Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/uplift-modeling-for-personalized-ai-rollouts-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-10
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/134c2ea7-4a99-4150-b6c8-a91aa7074e7b.png
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
  name="Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)"
  desc="Your LLM product experiment just came back positive, with a promising 8-percentage-point lift in task completion. You ship the feature and leadership celebrates. Three months later, the core metric ha"
  url="https://freecodecamp.org/news/uplift-modeling-for-personalized-ai-rollouts-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/134c2ea7-4a99-4150-b6c8-a91aa7074e7b.png"/>

Your LLM product experiment just came back positive, with a promising 8-percentage-point lift in task completion. You ship the feature and leadership celebrates. Three months later, the core metric has barely moved.

The experiment was statistically sound. It simply answered the wrong question.

An average treatment effect compresses the entire treatment response across your user base into a single number. That compression is useful when you're deciding whether to build a feature in the first place.

But once you've committed to building it, the average treatment effect is no longer the most actionable metric. Heavy users of your AI summary tool have already optimized their workflows and often find the new summaries redundant. Light users frequently lose track of context and genuinely benefit from a quick recap.

Rolling out the feature uniformly to everyone, simply because the average effect was positive, misses something important: the feature helps some users significantly, barely moves the needle for others, and actively disrupts a third group.

This is the heterogeneity problem. Standard product experiments answer a binary question about average efficacy. Uplift modeling turns that binary into a nuanced spectrum. The experimental data that produced the positive average contains hidden information about exactly which users drove that success, and you can act on it.

Uplift modeling estimates a conditional average treatment effect (CATE) for each user based on their specific features. You get a score you can act on immediately.

Users with a high predicted CATE receive the feature. Users with a CATE near zero get skipped. The result is a segmented rollout that concentrates treatment where it produces real value, keeping inference costs and user disruption proportional to actual benefit.

For ML engineers and product data scientists orchestrating personalized AI rollouts, this guide walks through uplift modeling from scratch using scikit-learn. We'll build this without heavy dependencies such as causalml or econml, so you can understand the underlying mechanics.

You'll implement two meta-learner approaches, construct a Qini curve to evaluate how well your model ranks users, and write a segmented rollout decision rule. The dataset simulates a 50,000-user SaaS product with heterogeneity baked into different engagement tiers.

By the end, you'll understand when to trust your estimates and how to translate a model into a practical deployment policy.

---

## Why Average Treatment Effects Mislead for AI Personalization

Think about what the average treatment effect actually averages. In a typical SaaS product, heavy users overrepresent themselves in opt-in experiments because they engage with new features more frequently. Light users underrepresent themselves because they ignore toggles.

The average effect reflects whatever mix of users happened to participate in the experiment, and that mix will likely look nothing like the general population you face at full rollout.

More critically, an average treatment effect obscures the direction of the treatment effect across subgroups.

Consider a scenario where an AI summary feature produces a 9.6-percentage-point lift for light users, a 7.4-percentage-point lift for medium users, and only a 6.7-percentage-point lift for heavy users. That averages out to something that looks uniformly positive.

But the strategic call here is to concentrate the rollout on light users while monitoring heavy users to ensure their optimized workflows aren't being disrupted. Shipping uniformly ignores this spread entirely.

This pattern appears across all AI feature categories. Think of an AI meeting summarizer for enterprise teams. New joiners who struggle to follow long threads benefit significantly. Experienced team members who read faster than the AI writes might find the summary slows them down. A positive average justifies building the feature, but it tells you nothing about deploying it identically to every user.

Uplift modeling addresses this by estimating the CATE: the expected treatment effect for a specific user given their observed features. Users where the CATE is strongly positive get treatment, while low-CATE users get held back. The Qini curve, which you'll build in step 3, tells you how much value you recover by treating only the high-CATE segment and skipping the rest.

---

## What Uplift Modeling Actually Does

Uplift modeling builds on top of causal inference. The fundamental quantity is the individual treatment effect, which represents the difference in potential outcomes for a specific user:

$$
ITE(i) = Y_i(1) - Y_i(0)
$$

$Y_i(1)$ is what user $i$ would do with the feature. $Y_i(0)$ is what user $i$ would do without it. The problem is that you observe only one of these two quantities for any given user: $Y_i(1)$ for treated users and $Y_i(0)$ for control users, each user appearing in only one arm.

The CATE is the population-level analog: the expected individual treatment effect given a user's features:

$$
CATE(x)=E[Y\left(1\right)-Y\left(0\right)|X=x]
$$

Meta-learner approaches estimate the CATE by fitting separate outcome models on the treated and control groups, then computing the difference in their predictions. Both the T-learner and X-learner ([<VPIcon icon="iconfont icon-arxiv"/>Künzel et al.](https://arxiv.org/abs/1706.03461)) rest on three identification assumptions:

1. **Unconfoundedness** (conditional ignorability): treatment assignment is independent of potential outcomes given observed covariates, T ⊥ (Y(0), Y(1)) | X. In a randomized experiment, this holds automatically. In an observational opt-in study, you need a feature set rich enough to control for confounders.
2. **Overlap** (positivity): every user has a nonzero probability of receiving either the treatment or the control, with 0 < P(T=1|X=x) < 1. When some users have a near-zero opt-in probability (as light users do in this dataset, at 12%), CATE estimates in that region have higher variance.
3. **SUTVA**: each user's outcome depends only on their own treatment, independent of what other users around them do. If your users share workspaces or social graphs, this assumption may be violated (addressed in "What to do next").

::: note Prerequisites

You need:

- Python 3.11 or newer
- Comfort with pandas and scikit-learn
- Rough familiarity with linear regression and logistic regression

Install the packages for this tutorial:

```sh
pip install numpy pandas scikit-learn matplotlib scipy
```

:::

::: info Here's what's happening

this installs the full numeric stack for the tutorial. scipy is needed for KDE smoothing of the Qini curve in the chart generator. Everything else is standard ML tooling.

:::

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

::: info Here's what's happening

the data generator creates a reproducible dataset of 50,000 synthetic SaaS product users. Every user has an engagement tier (light, medium, heavy), a query confidence score, and an opt-in flag for the AI summary feature. The ground-truth causal effect of opting in is approximately +8 percentage points `task_completed`, baked in with per-tier variation across engagement segments. All numbers in this tutorial come from this exact dataset.

All code in this article runs end-to-end in the companion notebook at [<VPIcon icon="fas fa-code-branch"/>`/tree/main/08_uplift_modeling/uplift_demo.ipynb` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/08_uplift_modeling). Clone the repo and run `uplift_demo.py` to reproduce every result.

---

## Setting Up the Working Example

The dataset simulates a SaaS product with an AI summary feature that users opted into via a toggle. 50,000 users, with `opt_in_agent_mode` as the treatment column and `task_completed` as the binary outcome. The engagement tier (light, medium, heavy) captures how actively each user interacts with the product.

Load the data and establish the baseline:

```py
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")
print(df.shape)
print(df[["engagement_tier", "opt_in_agent_mode", "task_completed"]].head(10))

# Opt-in rates by tier
print("\nOpt-in rate by engagement tier:")
print(df.groupby("engagement_tier").opt_in_agent_mode.mean().round(3))

# Naive ATE: treated minus control
naive_ate = (
    df[df.opt_in_agent_mode == 1].task_completed.mean()
    - df[df.opt_in_agent_mode == 0].task_completed.mean()
)
print(f"\nNaive ATE (treated - control): {naive_ate:+.4f}")
print(f"Treated users: {(df.opt_in_agent_mode == 1).sum():,}")
print(f"Control users: {(df.opt_in_agent_mode == 0).sum():,}")
#
# (50000, 16)
#   engagement_tier  opt_in_agent_mode  task_completed
# 0          medium                  0               0
# ...
# 
# Opt-in rate by engagement tier:
# engagement_tier
# heavy     0.647
# light     0.120
# medium    0.353
# Name: opt_in_agent_mode, dtype: float64
# 
# Naive ATE (treated - control): +0.2106
# Treated users: 13,451
# Control users: 36,549
```

::: info Here's what's happening

you load 50,000 rows and immediately see a severe selection-on-engagement pattern. Heavy users opt in at 64.7%, medium at 35.3%, and light users at only 12%. The naïve ATE is +0.2106, more than double the true underlying effect.

That gap reflects selection bias: the treated group is skewed toward heavy users who complete more tasks regardless of the feature. The +0.21 number measures engagement level more than feature impact.

Now look at the naïve per-tier gaps, which hint at the heterogeneity you're about to estimate properly:

```py
# Naive per-tier gap (confounded but directionally useful)
print("Naive per-tier treated vs. control completion rate:")
for tier in ["light", "medium", "heavy"]:
    sub = df[df.engagement_tier == tier]
    t_rate = sub[sub.opt_in_agent_mode == 1].task_completed.mean()
    c_rate = sub[sub.opt_in_agent_mode == 0].task_completed.mean()
    print(f"  {tier:8s}: treated={t_rate:.3f}, control={c_rate:.3f}, "
          f"diff={t_rate - c_rate:+.3f}")
#
Naive per-tier treated vs. control completion rate:
  light   : treated=0.551, control=0.455, diff=+0.096
  medium  : treated=0.745, control=0.670, diff=+0.075
  heavy   : treated=0.891, control=0.824, diff=+0.067
```

::: info Here's what's happening

even the raw confounded gaps show the ordering light > medium > heavy (+0.096 > +0.075 > +0.067). Light users show the largest within-tier gap, heavy users the smallest.

This is counterintuitive if you assume power users always benefit most, but it makes sense for an AI summary feature. Light users frequently lose context in long threads and genuinely benefit from a summary at the top. Heavy users have already internalized how to navigate the product and find the summary more disruptive than useful. The T-learner in the next step will sharpen these estimates by controlling for query confidence within each tier.

![Figure 1: Conceptual illustration of heterogeneous treatment effects. Control and treated distributions (dashed and solid lines) are shown for each engagement tier. The per-tier CATE (the gap between the two curves) decreases from light to heavy users. The bottom panel shows how the ATE collapses this spread into a single average, misrepresenting how the feature actually works for each segment.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/911ddc46-5c79-41b1-910f-af17d426dc5f.png)

---

## Step 1: T-learner (Simplest Meta-learner)

The T-learner fits two completely separate models: one for the treated group and one for the control group. The predicted CATE for any user is the difference between the treated model's prediction and the control model's prediction for that user's features.

```py
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np

# Build feature matrix: query_confidence + engagement_tier dummies
X_full = pd.get_dummies(
    df[["query_confidence", "engagement_tier"]],
    drop_first=False
).astype(float)

feature_cols = X_full.columns.tolist()
print("Feature columns:", feature_cols)

X_all = X_full.values
treated_mask = df.opt_in_agent_mode == 1
control_mask = ~treated_mask

X1 = X_all[treated_mask]    # features for treated users
Y1 = df[treated_mask].task_completed.values
X0 = X_all[control_mask]    # features for control users
Y0 = df[control_mask].task_completed.values

# Fit separate models on each arm
m1 = LinearRegression().fit(X1, Y1)   # outcome model for treated
m0 = LinearRegression().fit(X0, Y0)   # outcome model for control

# CATE = mu_1(x) - mu_0(x)
cate_t = m1.predict(X_all) - m0.predict(X_all)
df["cate_tlearner"] = cate_t

print(f"\nMean CATE (T-learner): {cate_t.mean():+.4f}")
print("\nMean predicted CATE by engagement tier:")
print(df.groupby("engagement_tier").cate_tlearner.mean().round(4))
#
# Feature columns: ['query_confidence', 'engagement_tier_heavy', 'engagement_tier_light', 'engagement_tier_medium']
# 
# Mean CATE (T-learner): +0.0847
# 
# Mean predicted CATE by engagement tier:
# engagement_tier
# heavy     0.0665
# light     0.0954
# medium    0.0744
# Name: cate_tlearner, dtype: float64
```

::: info Here's what's happening

you encode engagement tier as one-hot columns and keep query confidence as a continuous feature. Two `LinearRegression` models fit separately: `m1` learns the conditional expectation of task completion among users who opted in, `m0` learns the same among users who didn't. For any user with features `x`, the predicted CATE is `m1(x) - m0(x)`.

The output confirms the direction from the naïve gaps but sharpens the estimates. The mean CATE across all 50,000 users is +0.0847, close to the ground truth of +0.08. The per-tier ordering is light (+0.0954) > medium (+0.0744) > heavy (+0.0665). The +0.2106 naive ATE was hiding a 1.4x difference between light and heavy users. That spread is your segmentation signal.

The T-learner has one important caveat worth naming: when one arm is much smaller than the other (here, 13,451 treated versus 36,549 control), the model trained on the smaller arm can show higher variance. Linear regression handles this reasonably well at 50,000 total users. The X-learner in the next step directly addresses the imbalance.

---

## Step 2: X-learner (Handles Imbalanced Treatment Arms)

The X-learner improves on the T-learner by using the larger arm to help estimate the CATE in the smaller arm. It does this by computing *imputed treatment effects* for each user: counterfactual outcomes predicted by the cross-arm model, then differencing them from the observed outcome.

The procedure has four steps:

1. Fit outcome models `m0` and `m1` on each arm (same as T-learner).
2. For treated users: compute `D1 = Y1 - m0(X1)`, the difference between what each treated user actually achieved and what the control model predicts they would have achieved without treatment.
3. For control users: compute `D0 = m1(X0) - Y0`, the difference between what the treated model predicts each control user would achieve under treatment and what they actually achieved.
4. Fit two tau regressors (one per arm), then combine them using the propensity score as a weight. Per ([<VPIcon icon="iconfont icon-arxiv"/>Künzel et al.](https://arxiv.org/abs/1706.03461)): `tau(x) = g(x) * tau_1(x) + (1 - g(x)) * tau_0(x)`, where g(x) is the propensity score. When g(x) is low (few treated users in this feature region), tau_0, estimated from the large control arm, gets more weight. When g(x) is high, tau_1 gets more weight.

```py :collapsed-lines
from sklearn.linear_model import LinearRegression, LogisticRegression

# Step 1: m0 and m1 already fitted in Step 1 above

# Step 2: imputed treatment effects for treated group
D1 = Y1 - m0.predict(X1)     # Y(1) - mu_0(X1)

# Step 3: imputed treatment effects for control group
D0 = m1.predict(X0) - Y0     # mu_1(X0) - Y(0)

# Fit tau regressors on each arm
tau1_model = LinearRegression().fit(X1, D1)  # tau for treated arm
tau0_model = LinearRegression().fit(X0, D0)  # tau for control arm

# Step 4: estimate propensity score e(x) = P(T=1 | X)
ps_model = LogisticRegression(max_iter=1000).fit(X_all, df.opt_in_agent_mode.values)
e_x = ps_model.predict_proba(X_all)[:, 1]

# Kunzel et al. (2019): tau(x) = g(x)*tau_1(x) + (1 - g(x))*tau_0(x)
tau1_all = tau1_model.predict(X_all)
tau0_all = tau0_model.predict(X_all)
cate_x = e_x * tau1_all + (1 - e_x) * tau0_all
df["cate_xlearner"] = cate_x

print(f"Mean CATE (X-learner): {cate_x.mean():+.4f}")
print("\nMean predicted CATE by engagement tier:")
print(df.groupby("engagement_tier").cate_xlearner.mean().round(4))

# Compare T-learner vs X-learner
print("\nT-learner vs X-learner per tier:")
comp = df.groupby("engagement_tier")[["cate_tlearner", "cate_xlearner"]].mean().round(4)
print(comp)
#
# Mean CATE (X-learner): +0.0847
# 
# Mean predicted CATE by engagement tier:
# engagement_tier
# heavy     0.0665
# light     0.0954
# medium    0.0744
# Name: cate_xlearner, dtype: float64
# 
# T-learner vs X-learner per tier:
#                  cate_tlearner  cate_xlearner
# engagement_tier
# heavy                   0.0665         0.0665
# light                   0.0954         0.0954
# medium                  0.0744         0.0744
```

::: info Here's what's happening

with linear outcome models and four features, the T-learner and X-learner produce identical per-tier CATEs. This agreement is expected when the outcome models are well-specified: the cross-imputation in the X-learner doesn't add information that a linear model can't already recover.

In production, the X-learner's advantage shows up when you use gradient boosting or causal forests as the outcome models, since tree-based models amplify arm-size imbalance in ways the X-learner's propensity-weighted combination corrects.

Run both estimators whenever you upgrade the base model, and prefer the one that shows better calibration on a held-out set.

---

## Step 3: The Qini Curve and Uplift at K

A CATE model is useful only if its ranking of users aligns with their actual treatment-response ordering. The Qini curve ([<VPIcon icon="fas fa-globe"/>Radcliffe, 2007](https://research.ed.ac.uk/en/publications/using-control-groups-to-target-on-predicted-lift-building-and-ass)) tests this by asking: if you sort users by predicted CATE (in descending order) and treat only the top k%, how much observed uplift do you actually recover?

```py :collapsed-lines
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

# Sort users by predicted CATE descending
df_sorted = df.sort_values("cate_tlearner", ascending=False).copy()
n = len(df_sorted)

# Compute observed uplift at each percentile cutoff
top_ks = np.arange(0.01, 1.01, 0.01)
qini_vals = []

for k in top_ks:
    top_n = max(1, int(k * n))
    sub = df_sorted.iloc[:top_n]
    treated_sub = sub[sub.opt_in_agent_mode == 1]
    control_sub  = sub[sub.opt_in_agent_mode == 0]
    if len(treated_sub) > 0 and len(control_sub) > 0:
        uplift = (treated_sub.task_completed.mean()
                  - control_sub.task_completed.mean())
    else:
        uplift = np.nan
    qini_vals.append(uplift)

# Plot
fig, ax = plt.subplots(figsize=(8, 4.5))
ax.plot(top_ks * 100, qini_vals, linewidth=2, label="T-learner Qini")
ax.axhline(naive_ate, color="gray", linestyle="--",
           label=f"Naive ATE = {naive_ate:.4f}")
ax.set_xlabel("Top-k% of users (sorted by predicted CATE)")
ax.set_ylabel("Observed uplift in top-k group")
ax.set_title("Qini curve: T-learner ranking vs. observed uplift")
ax.legend()
plt.tight_layout()
plt.savefig("qini_curve.png", dpi=140)
print("Saved qini_curve.png")

# Print values at selected percentiles
print("\nQini values at selected cutoffs:")
for target_k in [10, 20, 30, 50, 70, 100]:
    idx = target_k - 1
    print(f"  Top {target_k:3d}%: observed uplift = {qini_vals[idx]:.4f}")
#
# Saved qini_curve.png
# 
# Qini values at selected cutoffs:
#   Top  10%: observed uplift = 0.0895
#   Top  20%: observed uplift = 0.1018
#   Top  30%: observed uplift = 0.0959
#   Top  50%: observed uplift = 0.0966
#   Top  70%: observed uplift = 0.1454
#   Top 100%: observed uplift = 0.2106
```

::: info Here's what's happening

you sort all 50,000 users by the T-learner's predicted CATE, highest first. For each percentile cutoff, you compute the raw treated-minus-control difference in task completion within that subgroup.

The top-10% group shows an observed uplift of +0.0895 and the top-20% group shows +0.1018, both well below the naive ATE of +0.2106, which is confounded by selection and reflects engagement level more than feature impact.

The Qini values here also mix the CATE signal with residual selection bias: all users in the top 54% by predicted CATE are light users (the tier with the lowest opt-in rate of 12%), so the treated-minus-control comparison within that group is still confounded by within-tier selection bias.

The jump in the top 70% (+0.1454) makes this confounding effect visible: as medium and heavy users enter the ranked group, the treated side suddenly includes high-completion heavy users (64.7% opt-in), while the control side remains dominated by low-completion light users. That spike is selection bias, with no genuine CATE signal behind it.

In observational uplift settings, the actionable region of the Qini is roughly the top 20% to 50%, where the ranking reflects the model's CATE estimates more cleanly than at higher percentiles, where propensity-score correlation with outcome levels dominates.

---

## Step 4: A Segmented Rollout Rule

The CATE model assigns a predicted treatment effect to every user. Turn that into a deployment policy by setting a threshold: ship the feature to users whose predicted CATE exceeds some value, suppress it for everyone else.

```py :collapsed-lines
# Inspect the CATE distribution first
print("CATE distribution (T-learner):")
print(pd.Series(df.cate_tlearner).describe().round(4))
print()

# Plot CATE distribution
fig, ax = plt.subplots(figsize=(8, 4))
ax.hist(df.cate_tlearner, bins=50, edgecolor="white", linewidth=0.5)
ax.axvline(0.085, color="red", linestyle="--", label="Threshold = 0.085")
ax.axvline(df.cate_tlearner.mean(), color="gray", linestyle=":",
           label=f"Mean CATE = {df.cate_tlearner.mean():.4f}")
ax.set_xlabel("Predicted CATE (T-learner)")
ax.set_ylabel("Number of users")
ax.set_title("Distribution of predicted CATEs")
ax.legend()
plt.tight_layout()
plt.savefig("cate_distribution.png", dpi=140)
print("Saved cate_distribution.png")

# Apply rollout rule
threshold = 0.085
selected = df[df.cate_tlearner >= threshold].copy()
suppressed = df[df.cate_tlearner < threshold].copy()

print(f"\nRollout threshold: CATE >= {threshold}")
print(f"Users selected for rollout: {len(selected):,} ({100*len(selected)/len(df):.0f}%)")
print(f"Users suppressed:           {len(suppressed):,} ({100*len(suppressed)/len(df):.0f}%)")
print()
print("Tier composition of selected group:")
print((selected.groupby("engagement_tier").size() / len(selected)).round(3))
print()
print(f"Mean predicted CATE (selected):   {selected.cate_tlearner.mean():.4f}")
print(f"Mean predicted CATE (suppressed): {suppressed.cate_tlearner.mean():.4f}")
#
# CATE distribution (T-learner):
# count    50000.0000
# mean         0.0847
# std          0.0126
# min          0.0515
# 25%          0.0731
# 50%          0.0897
# 75%          0.0963
# max          0.1021
# Name: cate_tlearner, dtype: float64
# 
# Saved cate_distribution.png
# 
# Rollout threshold: CATE >= 0.085
# Users selected for rollout: 27,203 (54%)
# Users suppressed:           22,797 (46%)
# 
# Tier composition of selected group:
# engagement_tier
# light    1.0
# dtype: float64
# 
# Mean predicted CATE (selected):   0.0955
# Mean predicted CATE (suppressed): 0.0719
```

::: info Here's what's happening

you inspect the full CATE distribution before setting a threshold. The mean CATE across all 50,000 users is +0.0847, with a standard deviation of +0.0126. Setting a threshold at +0.085 (just above the mean of +0.0847) selects 27,203 users (54%).

The tier composition of the selected group is 100% light users: with linear models and these features, the CATE ranges for each tier don't overlap across the threshold. Light users all have predicted CATEs between +0.0807 and +0.1021. Medium users have predicted CATEs between +0.0592 and +0.0812. The threshold at 0.085 cleanly separates the two.

The mean predicted CATE in the selected group (+0.0955) is 33% higher than in the suppressed group (+0.0719). That concentration is the value of the segmented rollout: you deploy the AI summary to the 54% of users who stand to benefit most, hold it back from medium and heavy users who show smaller predicted benefit, and collect outcome data on both groups to refine the threshold quarterly.

![Figure 2: Per-tier CATE distributions from the 50,000-user synthetic dataset. The top panel shows smooth KDE curves per engagement tier: light users (blue) cluster at the highest predicted CATEs, heavy users (green) at the lowest. The bottom panel shows mean CATE per tier with 95% bootstrap confidence intervals, alongside the naive ATE (+0.2106) as a reference line. All three tier CIs sit well below the naïve ATE, confirming that the average was confounded by selection bias.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/0bfc5bc9-b9b0-42ba-9ffb-1a3eee05e797.png)

The rollout rule maps directly to a feature flag system:

```py
# Simulate the rollout decision for a single new user
def should_show_feature(query_confidence, engagement_tier, threshold=0.085):
    """Returns True if predicted CATE exceeds the rollout threshold."""
    x = pd.get_dummies(
        pd.DataFrame([{"query_confidence": query_confidence,
                        "engagement_tier": engagement_tier}]),
        drop_first=False
    ).reindex(columns=feature_cols, fill_value=0).astype(float).values
    cate = m1.predict(x)[0] - m0.predict(x)[0]
    return cate >= threshold, round(cate, 4)

show, cate = should_show_feature(0.72, "heavy")
print(f"Heavy user, conf=0.72:  show feature={show}, CATE={cate}")

show, cate = should_show_feature(0.72, "light")
print(f"Light user, conf=0.72:  show feature={show}, CATE={cate}")

show, cate = should_show_feature(0.45, "medium")
print(f"Medium user, conf=0.45: show feature={show}, CATE={cate}")
#
Heavy user, conf=0.72:  show feature=False, CATE=0.0667
Light user, conf=0.72:  show feature=True, CATE=0.0955
Medium user, conf=0.45: show feature=False, CATE=0.0681
```

::: info Here's what's happening

you wrap the CATE computation into a function that mirrors what a real feature-flag service would run at request time. A heavy user with moderate query confidence gets `show feature=False` and a CATE of +0.0667, below the 0.085 threshold. The same query confidence from a light user gets `show feature=True` and a CATE of +0.0955. A medium user with lower confidence falls below the +0.0681 threshold.

These outputs match the domain story: the AI summary helps users who struggle to maintain context across sessions, and engagement tier is a strong proxy for that struggle.

:::

---

## Step 5: Bootstrap Confidence Intervals

The CATE estimates above are point estimates with no uncertainty quantification. Before you build rollout rules on them, you need to know how stable those estimates are across different samples of your user base.

```py
def bootstrap_cate_ci(df, X_all, feature_cols, n_reps=500, seed=7):
    """Bootstrap 95% CI for mean CATE overall and per engagement tier."""
    rng = np.random.default_rng(seed)
    n = len(df)
    tier_reps = {"light": [], "medium": [], "heavy": []}
    mean_reps = []

    for _ in range(n_reps):
        idx = rng.integers(0, n, size=n)
        df_b = df.iloc[idx].reset_index(drop=True)
        X_b = X_all[idx]
        treated_b = df_b.opt_in_agent_mode == 1
        m1_b = LinearRegression().fit(X_b[treated_b], df_b[treated_b].task_completed.values)
        m0_b = LinearRegression().fit(X_b[~treated_b], df_b[~treated_b].task_completed.values)
        cate_b = m1_b.predict(X_b) - m0_b.predict(X_b)
        df_b["cate"] = cate_b
        for tier in tier_reps:
            tier_reps[tier].append(df_b[df_b.engagement_tier == tier].cate.mean())
        mean_reps.append(cate_b.mean())

    cis = {}
    for tier, vals in tier_reps.items():
        arr = np.array(vals)
        cis[tier] = (float(np.percentile(arr, 2.5)),
                     float(np.percentile(arr, 97.5)))
    arr = np.array(mean_reps)
    cis["mean"] = (float(np.percentile(arr, 2.5)),
                   float(np.percentile(arr, 97.5)))
    return cis

print("Running bootstrap (500 replicates, seed=7)...")
cis = bootstrap_cate_ci(df, X_all, feature_cols, n_reps=500, seed=7)
print(f"Mean CATE   95% CI: [{cis['mean'][0]:+.4f}, {cis['mean'][1]:+.4f}]")
print(f"Light tier  95% CI: [{cis['light'][0]:+.4f}, {cis['light'][1]:+.4f}]")
print(f"Medium tier 95% CI: [{cis['medium'][0]:+.4f}, {cis['medium'][1]:+.4f}]")
print(f"Heavy tier  95% CI: [{cis['heavy'][0]:+.4f}, {cis['heavy'][1]:+.4f}]")
#
# Running bootstrap (500 replicates, seed=7)...
# Mean CATE   95% CI: [+0.0744, +0.0951]
# Light tier  95% CI: [+0.0781, +0.1125]
# Medium tier 95% CI: [+0.0596, +0.0892]
# Heavy tier  95% CI: [+0.0483, +0.0842]
```

::: info Here's what's happening

you resample the full 50,000-user dataset 500 times with replacement, refit the T-learner on each resample, and compute the distribution of mean CATEs across bootstrap iterations. The 2.5th and 97.5th percentiles of that distribution give a 95% confidence interval for each estimate.

:::

Three things to check in these CIs. First, the overall mean CI (+0.0744, +0.0951) brackets the ground truth of +0.08, confirming that the estimator is working. Second, the light-tier CI (+0.0781, +0.1125) is wider than the heavy-tier CI (+0.0483, +0.0842), consistent with light users having the lowest opt-in rate (12%) and therefore fewer treated observations to anchor the estimate. Third, the tier CIs don't fully separate at their tails: light's lower bound (+0.0781) barely clears heavy's upper bound (+0.0842), meaning the ordering light > heavy is stable but not by a wide margin.

For a business decision about differential rollout, that stability is enough. For a regulatory or clinical context, you'd want larger samples.

---

## When Uplift Modeling Fails

CATE models look compelling because they produce a continuous, individualized score. Four failure modes deserve explicit attention before you deploy a CATE-based policy.

### 1. Thin Segments (Overlap Violation)

The CATE for light users is estimated from 12% of your 13,451 treated users, roughly 1,614 people. That's enough to detect a tier-level average but not enough to estimate reliable individual-level effects within the tier at fine-grained feature values.

When the treatment arm has sparse coverage in a region of feature space, CATE estimates there carry high variance. The model returns a smooth prediction, but the empirical support behind it may be weak.

Check the feature distribution of your highest-CATE users and verify that treated and control observations exist in each region before acting on the ranking.

### 2. Extrapolation at the Tails (Overlap Violation)

Linear regression extrapolates smoothly outside the training range. If your model assigns a predicted CATE to a user whose feature values fall in a region with no training data for one arm, that estimate lacks empirical support.

The overlap assumption fails silently: the model returns a number, but P(T=1|X=x) is approximately 0 or 1 in that region, making the CATE unidentified.

Check propensity scores alongside CATE predictions and clip or flag estimates where the propensity falls outside [0.05, 0.95].

### 3. Qini Noise at Small k

The Qini curve is noisy at very small k (top 5% or fewer). When only a few hundred users are in the evaluation group, the treated count in that group may be small enough that the observed uplift is dominated by sampling noise.

Base rollout decisions on the 20% to 50% Qini range, where the signal is more stable. In observational settings, high Qini values at large k (such as +0.1454 in the top 70% in this tutorial) can reflect selection bias that masks the real CATE signal. Inspect the tier composition of each top-k group before interpreting the uplift value.

### 4. Overfitting the CATE Model

A `LinearRegression` trained on the treated arm here sees 13,451 observations and four features, a comfortable margin. If you replace linear regression with gradient boosting and add 30 features, you can overfit the imputed treatment effects to training noise. The CATE predictions will look sharply heterogeneous on the training set and regress toward the global mean on a held-out set. A CATE model earns its complexity when it outperforms the tier-level averages on held-out uplift. Evaluate on a held-out dataset before using it to build rollout rules.

---

## What to Do Next

The implementations above are built without external uplift libraries so you can see exactly what each step computes. For production use, [<VPIcon icon="iconfont icon-github"/>`uber/causalml`](https://github.com/uber/causalml) and [<VPIcon icon="iconfont icon-github"/>`py-why/EconML`](https://github.com/py-why/EconML) offer richer versions of both estimators: tree-based T-learners, doubly robust X-learners, and honest causal forests that split training and estimation samples to reduce overfitting. Both libraries follow the same conceptual structure you've built here.

`causalml` includes production-grade Qini curve computation and the AUUC (area under the uplift curve) metric, which collapses the Qini curve into a single comparison number. For running uplift model comparisons in an A/B framework, AUUC is the standard leaderboard metric.

One structural limitation worth naming: this tutorial assumed SUTVA, meaning each user's outcome depends only on their own treatment status. In workspace-based AI products, that assumption is often wrong. Users in the same workspace share a common environment, and treating one user can affect teammates through shared outputs, changed response patterns, or altered workspace dynamics.

When you suspect this kind of interference, DR-learner variants that propagate within-group correlation into the CATE estimates give more realistic uncertainty bounds. Standard T-learner and X-learner treat all observations as independent, which understates uncertainty when workspace-level factors are at play.

::: info

The companion repo for this tutorial lives at [<VPIcon icon="fas fa-code-branch"/>`main/08_uplift_modeling` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/08_uplift_modeling). Clone the repo, generate the dataset with `--n-users 50000 --seed 42`, and run `uplift_demo.py` to reproduce every result in this tutorial.

:::

The ATE is the number you need to decide whether to build a feature. The CATE is the number you need to decide who gets it first. A segmented rollout that focuses treatment on the 54% of users with the strongest predicted response yields more than spreading the same feature to everyone. Uniform rollout is a policy choice. Make it an informed one.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Uplift Modeling: Targeting Your LLM Feature Rollout to Users Who Actually Benefit (Python Implementation)",
  "desc": "Your LLM product experiment just came back positive, with a promising 8-percentage-point lift in task completion. You ship the feature and leadership celebrates. Three months later, the core metric ha",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/uplift-modeling-for-personalized-ai-rollouts-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
