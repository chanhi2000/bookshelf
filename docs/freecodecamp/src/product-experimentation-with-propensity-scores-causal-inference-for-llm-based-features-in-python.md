---
lang: en-US
title: "Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python"
description: "Article(s) > Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python"
icon: iconfont icon-pandas
category:
  - Python
  - NumPy
  - Pandas
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - numpy
  - py-numpy
  - pandas
  - py-pandas
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python"
    - property: og:description
      content: "Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/product-experimentation-with-propensity-scores-causal-inference-for-llm-based-features-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-01
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a8936be-7f43-4977-9baf-6021dc892b2d.png
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
  name="Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python"
  desc="Every product experimentation team running causal inference on LLM-based features eventually hits the same wall: when users click ”Try our AI assistant,” the volunteers aren't a random sample. Your pr"
  url="https://freecodecamp.org/news/product-experimentation-with-propensity-scores-causal-inference-for-llm-based-features-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6a8936be-7f43-4977-9baf-6021dc892b2d.png"/>

Every product experimentation team running causal inference on LLM-based features eventually hits the same wall: when users click "Try our AI assistant," the volunteers aren't a random sample.

Your product shipped a new agent mode last quarter. Users have to tap the "Try agent mode" toggle to enable it. The dashboard numbers look stunning: agent-mode users complete 21 percentage points more tasks than non-users. The CPO calls it the best feature launch of the year.

But you know something's off. Heavy-engagement users opt into new features constantly, while light users ignore toggles entirely. That 21-point gap measures the agent's effect combined with the pre-existing gap between power users and the rest of your base.

This is the Opt-In Trap. It shows up in every generative AI product that ships features behind a user-controlled toggle: "Try our AI assistant," "Enable smart replies," "Turn on code suggestions." Users who click to opt in differ systematically from those who scroll past. Any naïve comparison between the two groups collapses the feature's causal effect into whatever made those users opt in in the first place.

Running an AI feature behind a toggle is a product experiment. The hypothesis: the feature improves outcomes for users who adopt it.

Unlike an A/B test, where the coin flip creates two otherwise-identical populations, the toggle creates two populations that differ before they even make a choice. That pre-existing difference is the measurement problem, and a t-test on dashboard numbers can't fix it.

Propensity score methods are statistical tools that data scientists use to separate adoption bias from the feature's actual effect. They reweight (or rematch) your comparison so that opted-in and non-opted-in groups look comparable on observable characteristics, approximating what a randomized experiment would have given you.

This tutorial walks through the full pipeline (propensity estimation, inverse-probability weighting, nearest-neighbor matching, balance diagnostics, and bootstrap confidence intervals) on a 50,000-user synthetic SaaS dataset where the ground-truth causal effect is known. You'll estimate it, quantify uncertainty, and see where the approach silently breaks.

::: info Companion code

every code block runs end-to-end in the companion notebook at [github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/02_propensity_opt_in (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/02_propensity_opt_in). The notebook (`psm_demo.ipynb`) has all outputs pre-executed, so you can read along on GitHub before running anything locally.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/02_propensity_opt_in at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/02_propensity_opt_in/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/35e86fc7858b217d2f9a90f65685913364f4a81767ba150119a2b44f6311b13c/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

---

## Why Opt-in Features Break Naïve Comparisons

The math of an A/B test is elegant because of one assumption: treatment is assigned independent of everything else. Flip a coin: half your users get agent mode, and the coin flip breaks every possible confound by construction. The opt-in world has no coin.

Three mechanisms make opt-in comparisons misleading.

### 1. Selection on engagement

Power users click everything. If your heavy-engagement cohort opts into agent mode at 65 percent and your light-engagement cohort opts in at 12 percent, you've stacked the opt-in group with users who were going to complete more tasks anyway.

That compositional imbalance accounts for most of the observed lift on its own, before the agent does any work.

### 2. Selection on intent

Users who opt into a new feature often have a specific use case in mind. A developer who clicks "Try code suggestions" already has code to write. That user would have shown higher task completion even with the control UI.

### 3. Selection on risk tolerance

Early adopters tolerate rough edges. A user who clicks "Try beta" and sees slow latency sticks around, but a risk-averse user bounces.

Your opt-in group is enriched for people willing to put up with bad experiences, which affects every downstream metric you might measure.

All three produce the same symptom: a raw comparison of opted-in users against everyone else that can overstate the feature's causal effect by 2x or more, depending on how concentrated opt-in is among your heaviest users.

On the synthetic dataset in this tutorial, the naïve comparison inflates a true +8pp effect to +21pp, a 2.6x overshoot. Propensity score methods exist to correct this.

---

## What Propensity Scores Actually Do

![Figure 1: Schematic propensity score distributions for two hypothetical groups. The opted-in group (red) skews toward higher propensities, while the non-opted-in group (blue) skews lower.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/df8f4e49-98f3-4cd2-b4a8-f9b49d18f60a.png)

In the above figure, the bracketed strip below the x-axis splits the score range into three zones: a control-heavy region at low propensities where few treated users exist, a region of common support in the middle where both groups are well represented, and a treatment-heavy region at high propensities where few controls exist. Propensity score methods operate within the common-support region by reweighting or rematching so that the two groups appear balanced on observables. The extremes are either trimmed out or handled with caution.

The propensity score is the probability that a user opts in given their observable characteristics. Estimate this probability well, and you can use it to reweight your sample so that opted-in and non-opted-in users look similar on observables, just as they would have if opt-in had been randomized.

Two practical strategies use the propensity score:

- **Inverse-probability weighting (IPW)** assigns each user a weight equal to the inverse of their probability of receiving the treatment they actually received. Opted-in users get weighted by 1/P(opt-in). Non-opted-in users get weighted by 1/P(no opt-in). After weighting, the two groups are balanced on observables, and the weighted difference in outcomes approximates the average treatment effect.
- **Matching** pairs each opted-in user with one or more non-opted-in users who have similar propensity scores. The average outcome difference between matched pairs estimates the average treatment effect on the treated (ATT): what opt-in users actually gained by opting in.

Both methods rest on three identification assumptions working together.

1. First, **unconfoundedness**: every observable variable that drives opt-in and affects the outcome is in your propensity model.
2. Second, **overlap** (also called positivity): every user has some nonzero probability of opting in and some nonzero probability of staying out.
3. Third, **no interference**: one user's opt-in decision does not affect another user's outcome (the stable-unit-treatment-value assumption, or SUTVA).

Violate any one of these and the estimate is biased even when the other two hold. The failure modes at the end of this tutorial walk through each one.

---

## Prerequisites

You'll need Python 3.11 or newer, comfort with pandas and scikit-learn, and rough familiarity with logistic regression.

Install the packages for this tutorial:

```sh
pip install numpy pandas scikit-learn matplotlib
```

::: info Here's what's happening

four packages cover the full pipeline. Pandas loads the data, NumPy handles weights and array arithmetic, scikit-learn fits the propensity model and runs nearest-neighbor matching, and matplotlib renders the overlap diagnostic.

:::

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

::: info Here's what's happening

the clone pulls the companion repo, and <VPIcon icon="fa-brands fa-python"/>`generate_data.py` produces the shared synthetic dataset used across the series. Seed 42 keeps the dataset reproducible, and 50,000 users give clean signal for every estimator in this tutorial. The output CSV lands at <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`synthetic_llm_logs.csv`.

:::

---

## Setting Up the Working Example

The synthetic dataset simulates a SaaS product where users can opt into an agent mode that uses a more expensive model. With fifty thousand users, opt-in rates differ sharply by engagement tier: heavy users opt in at 65 percent, medium users at 35 percent, and light users at 12 percent.

The ground-truth causal effect baked into the data generator is +8 percentage points on task completion for users who opted in. The naive comparison inflates this to around +21 percentage points because selection bias stacks the opted-in group with your most engaged users.

Knowing the ground truth is what lets you verify that your propensity score method recovers it.

Load the data and see the selection problem:

```py
import pandas as pd

df = pd.read_csv("data/synthetic_llm_logs.csv")

print(df.groupby("engagement_tier").opt_in_agent_mode.mean().round(3))

naive_effect = (
    df[df.opt_in_agent_mode == 1].task_completed.mean()
    - df[df.opt_in_agent_mode == 0].task_completed.mean()
)
print(f"\nNaive opt-in effect: {naive_effect:+.4f}")
#
# engagement_tier
# heavy     0.647
# light     0.120
# medium    0.353
# Name: opt_in_agent_mode, dtype: float64
# 
# Naive opt-in effect: +0.2106
```

::: info Here's what's happening

you load 50,000 rows, group by engagement tier, and print the opt-in rate inside each group. Heavy users opt in far more than light users, which is the selection-on-engagement pattern baked into the data. The naïve effect lands at +0.2106 (21 percentage points), nearly three times the ground truth of +0.08. That gap is exactly what propensity score methods have to remove.

:::

---

## Step 1: Estimate the Propensity Score

The propensity score is the output of a model that predicts opt-in from observable characteristics. Logistic regression is the right starting point because it's interpretable and fast, but watch the balance diagnostics in Step 4: if any weighted SMD stays above 0.1, the logistic model is missing an interaction, and gradient boosting is the next move.

For this dataset, the relevant observables are engagement tier and query confidence. In a real product, you'd include every variable you think drives opt-in: device type, tenure, plan tier, and historical usage patterns.

```py
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

X = pd.get_dummies(
    df[["engagement_tier", "query_confidence"]],
    drop_first=True
).astype(float)
y_treat = df.opt_in_agent_mode

ps_model = LogisticRegression(max_iter=1000).fit(X, y_treat)
df["propensity"] = ps_model.predict_proba(X)[:, 1]

# Basic sanity checks
print(df.groupby("engagement_tier").propensity.mean().round(3))
print(
    f"\nPropensity range (treated):  "
    f"{df[df.opt_in_agent_mode == 1].propensity.min():.3f} - "
    f"{df[df.opt_in_agent_mode == 1].propensity.max():.3f}"
)
print(
    f"Propensity range (control):  "
    f"{df[df.opt_in_agent_mode == 0].propensity.min():.3f} - "
    f"{df[df.opt_in_agent_mode == 0].propensity.max():.3f}"
)
print(f"Propensity model AUC: {roc_auc_score(y_treat, df.propensity):.3f}")
#
# engagement_tier
# heavy     0.646
# light     0.120
# medium    0.353
# Name: propensity, dtype: float64
# 
# Propensity range (treated):  0.114 - 0.675
# Propensity range (control):  0.114 - 0.673
# Propensity model AUC: 0.744
```

::: info Here's what's happening

you encode the engagement tier as dummy variables, keep query confidence continuous, and fit a logistic regression model. The predicted probability from the model is each user's propensity score.

:::

Scikit-learn `LogisticRegression` applies L2 regularization by default (`C=1.0`), which shrinks propensities slightly toward 0.5. For production use, you can set `penalty=None` if you want an unregularized fit.

Mean propensity inside each engagement tier recovers the true opt-in rate for that tier almost exactly, so the model is calibrated. The AUC of 0.744 confirms the model discriminates between opt-ins and non-opt-ins well above chance (0.5).

And the propensity ranges overlap between treated and control groups (both span roughly 0.11 to 0.67), which is the visual overlap condition.

![Figure 2: Two views of the same positivity check on the real 50,000-user synthetic dataset.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/0ad957a6-1d24-4332-b033-aae6e91c4162.png)

In the figure above, the top panel plots smooth kernel density curves of the fitted propensity scores for each group. The three peaks align with the three engagement tiers (light at p ≈ 0.12, medium at p ≈ 0.35, heavy at p ≈ 0.65), as expected, because the opt-in rate is tier-driven. The bottom panel translates that same distribution into raw counts per tier: every tier contains thousands of both opted-in and non-opted-in users, which is exactly what positivity requires.

Where Figure 1 schematically illustrated the idea, this figure shows that it holds for the data, so the weighting and matching that follow will have real counterfactuals to work with.

---

## Step 2: Inverse-Probability Weighting

IPW assigns each user a weight inversely proportional to their propensity. An opted-in user with a 0.12 propensity is rare (a light user who still opted in despite low engagement) and carries information about 1 / 0.12 ≈ 8 similar users in the population. A control user with a 0.12 propensity is the expected case for light users who stayed out, so they're common and get a weight of 1 / (1 - 0.12) ≈ 1.14.


```py
import numpy as np

# ATE weights: 1/P(treat) for treated, 1/P(no treat) for control
df["ipw"] = np.where(
    df.opt_in_agent_mode == 1,
    1 / df.propensity,
    1 / (1 - df.propensity)
)

t = df[df.opt_in_agent_mode == 1]
c = df[df.opt_in_agent_mode == 0]
ate_ipw = (
    (t.task_completed * t.ipw).sum() / t.ipw.sum()
    - (c.task_completed * c.ipw).sum() / c.ipw.sum()
)
print(f"IPW average treatment effect (ATE): {ate_ipw:+.4f}")

# ATT: what opt-in users actually gained
df["ipw_att"] = np.where(
    df.opt_in_agent_mode == 1,
    1,
    df.propensity / (1 - df.propensity)
)
t = df[df.opt_in_agent_mode == 1]   # re-slice now that ipw_att is in df
c = df[df.opt_in_agent_mode == 0]
treated_mean = t.task_completed.mean()
control_w_mean = (c.task_completed * c.ipw_att).sum() / c.ipw_att.sum()
att_ipw = treated_mean - control_w_mean
print(f"IPW average treatment effect on treated (ATT): {att_ipw:+.4f}")
#
# IPW average treatment effect (ATE): +0.0851
# IPW average treatment effect on treated (ATT): +0.0770
```

::: info Here's what's happening

first, you compute ATE weights for every user and take the weighted difference in task completion between opted-in and non-opted-in groups. Then you compute ATT weights, which reweight only the control group to match the treated group's covariate distribution, and compute the average treatment effect on the treated.

:::

ATE answers the population question: what's the effect on a random user who might or might not have opted in anyway? ATT answers the user question: What did opt-in users actually gain? On this dataset, ATE lands at +0.0851 and ATT at +0.0770, both close to the ground-truth +0.08 and a massive improvement over the naive +0.2106. The distinction matters in practice. Deciding whether to roll the feature out to users who haven't opted in calls for ATE. Reporting on the value opt-in users captured calls for ATT.

---

## Step 3: Nearest-Neighbor Matching

Matching takes a different approach: pair each opted-in user with the non-opted-in user whose propensity score is closest, then take the average outcome difference across matched pairs. The result estimates ATT.

```py
from sklearn.neighbors import NearestNeighbors

treated_ps = df[df.opt_in_agent_mode == 1][["propensity"]].values
control_ps = df[df.opt_in_agent_mode == 0][["propensity"]].values

nn = NearestNeighbors(n_neighbors=1).fit(control_ps)
_, idx = nn.kneighbors(treated_ps)

treated_outcomes = df[df.opt_in_agent_mode == 1].task_completed.values
matched_control_outcomes = (
    df[df.opt_in_agent_mode == 0].task_completed.values[idx.flatten()]
)

att_match = (treated_outcomes - matched_control_outcomes).mean()
print(f"1-NN matching ATT: {att_match:+.4f}")
#
# 1-NN matching ATT: +0.0752
```

::: info Here's what's happening

you extract propensity scores for each group, fit a nearest-neighbor index on the control group, and find the single closest control user for every treated user.

:::

The `NearestNeighbors` index allows the same control user to be selected as the match for multiple treated users, so this is a matching-with-replacement case.

You pull the outcomes for each treated user and their matched control, take the difference per pair, and average across pairs. The result estimates what opt-in users gained compared to very similar users who did not opt in.

The +0.0752 result lands close to the ground truth of +0.08 but slightly below IPW ATT, typical of 1-NN matching because a single nearest neighbor is a high-variance estimator.

Two variants are worth knowing. Matching with replacement (what you just ran) allows a single control user to serve as a match for multiple treated users, reducing bias when good matches are scarce but inflating variance.

Matching without replacement assigns each control user to at most one treated user, which keeps variance lower but forces poor-quality pairings when the treated group dwarfs the available controls.

For most production analyses, k-nearest-neighbor matching with k = 3-5 and replacement is a sensible default.

---

## Step 4: Check Covariate Balance

Propensity score methods work only if they actually balance the covariates between groups. You need to verify that they did, because if the balance fails, your estimate is wrong.

The standard diagnostic is the standardized mean difference (SMD) for each covariate. SMD compares the treated group mean to the control group mean, divided by the pooled standard deviation.

Before weighting, SMDs tell you how imbalanced the raw groups are. After weighting, they should be small (|SMD| < 0.1 is the conventional cutoff).

```py
def smd(treated_vals, control_vals, treated_w=None, control_w=None):
    """Standardized mean difference, optionally with weights."""
    if treated_w is None:
        treated_w = np.ones(len(treated_vals))
    if control_w is None:
        control_w = np.ones(len(control_vals))
    t_mean = np.average(treated_vals, weights=treated_w)
    c_mean = np.average(control_vals, weights=control_w)
    pooled_std = np.sqrt((treated_vals.var() + control_vals.var()) / 2)
    return (t_mean - c_mean) / pooled_std

engagement_heavy = (df.engagement_tier == "heavy").astype(float).values
qc = df.query_confidence.values
tr = (df.opt_in_agent_mode == 1).values

covariates = {
    "engagement_tier_heavy": engagement_heavy,
    "query_confidence": qc,
}

print(f"{'Covariate':<30} {'Raw SMD':>10} {'Weighted SMD':>15}")
for name, vals in covariates.items():
    smd_raw = smd(vals[tr], vals[~tr])
    smd_weighted = smd(
        vals[tr], vals[~tr],
        treated_w=df[tr].ipw.values,
        control_w=df[~tr].ipw.values,
    )
    print(f"{name:<30} {smd_raw:>+10.3f} {smd_weighted:>+15.3f}")
#
# Covariate                         Raw SMD    Weighted SMD
# engagement_tier_heavy              +0.742          +0.002
# query_confidence                   -0.032          -0.003
```

::: info Here's what's happening

the helper computes the standardized mean difference for any covariate, with optional IPW weights.

:::

You then print raw and weighted SMDs for each covariate. The raw SMD on `engagement_tier_heavy` is +0.742 (heavy users opt in far more than everyone else), and the weighted SMD drops to +0.002, a clean pass. Query confidence was already close to balanced on the raw data, and weighting keeps it that way. If any weighted SMD came back above 0.1 in absolute value, your propensity model would be missing something; the fix is usually richer features or interaction terms in the logistic regression.

Visually, Figure 2 above confirmed what the SMDs now confirm numerically: the overlap condition holds, and balance is achievable.

---

## Step 5: Bootstrap Confidence Intervals

Point estimates are only half the story. Any estimate you report to a product team needs an interval that tells them whether +0.08 is distinguishable from +0.03 or from +0.12. Analytic standard errors for IPW and matching are tricky because of the estimated propensity score, so the simplest and most honest move is the non-parametric bootstrap.

```py :collapsed-lines
def estimate_all(sample):
    """Return (ATE_IPW, ATT_IPW, ATT_match) on a bootstrap sample."""
    s = sample.copy()
    X_s = pd.get_dummies(
        s[["engagement_tier", "query_confidence"]], drop_first=True
    ).astype(float)
    ps = LogisticRegression(max_iter=1000).fit(X_s, s.opt_in_agent_mode)
    s["p"] = ps.predict_proba(X_s)[:, 1]

    s["w_ate"] = np.where(
        s.opt_in_agent_mode == 1, 1 / s.p, 1 / (1 - s.p)
    )
    s["w_att"] = np.where(
        s.opt_in_agent_mode == 1, 1, s.p / (1 - s.p)
    )
    t, c = s[s.opt_in_agent_mode == 1], s[s.opt_in_agent_mode == 0]

    ate = (
        (t.task_completed * t.w_ate).sum() / t.w_ate.sum()
        - (c.task_completed * c.w_ate).sum() / c.w_ate.sum()
    )
    att = t.task_completed.mean() - (
        (c.task_completed * c.w_att).sum() / c.w_att.sum()
    )
    nn_b = NearestNeighbors(n_neighbors=1).fit(c[["p"]].values)
    _, idx_b = nn_b.kneighbors(t[["p"]].values)
    match = (
        t.task_completed.values
        - c.task_completed.values[idx_b.flatten()]
    ).mean()
    return ate, att, match

rng = np.random.default_rng(7)
n_reps = 500
results = np.zeros((n_reps, 3))
for i in range(n_reps):
    boot = df.iloc[rng.integers(0, len(df), size=len(df))]
    results[i] = estimate_all(boot)

for name, col in zip(["IPW ATE", "IPW ATT", "1-NN ATT"], range(3)):
    lo, hi = np.percentile(results[:, col], [2.5, 97.5])
    print(f"{name:<10} 95% CI: [{lo:+.4f}, {hi:+.4f}]")
#
# IPW ATE    95% CI: [+0.0745, +0.0954]
# IPW ATT    95% CI: [+0.0687, +0.0865]
# 1-NN ATT   95% CI: [+0.0659, +0.0940]
```

::: info Here's what's happening

you resample the dataset with replacement 500 times, refit the propensity model, and recompute each estimator on each resample, and take the 2.5th and 97.5th percentiles of the bootstrap distribution as the 95% confidence interval. All three intervals cover the ground-truth +0.08 and exclude the naive +0.21 by a wide margin.

The IPW ATT interval is the tightest because ATT reweights only the control group. The 1-NN matching interval is the widest because single-neighbor matching discards control users outside the matched set.

Running this once takes about 90 seconds on a laptop. For a stakeholder report, anchor the headline to the point estimate and cite the interval so the team sees the uncertainty alongside the number.

---

## When Propensity Score Methods Fail

Propensity scores make opt-in comparisons rigorous when their assumptions hold. They produce biased estimates that look clean when those assumptions fail.

Four common failure modes map to the three identification assumptions from earlier.

### 1. Unmeasured Confounders (Violate Unconfoundedness)

If something drives both opt-in and your outcome but isn't in your propensity model, IPW and matching produce biased estimates. This is the most common failure in practice.

An example: users who opt into agent mode are also the users who follow your engineering blog and read release notes. If blog-reading behavior raises task completion independently of the feature, missing that signal attributes the effect to agent mode, inflating your estimate.

The only real defense is domain knowledge about what drives opt-in, richer feature engineering in your propensity model, and formal sensitivity tools (Rosenbaum bounds, E-values) that quantify how strong an unmeasured confounder would have to be to overturn the result.

### 2. Positivity (Overlap) Failures (Violates Overlap)

If some users have near-zero probability of opting in (or near-one), you've got no comparable counterfactual for them. I

PW creates extreme weights (1 / 0.001 = 1,000) that let a single outlier dominate the estimate. So matching is forced into poor-quality pairings.

Check propensity histograms and trim propensities outside [0.05, 0.95] before weighting if extreme values exist.

### 3. Misspecified Propensity Models (Degrade Unconfoundedness in Practice)

A linear logistic regression can't capture nonlinear relationships. If opt-in depends on the interaction between engagement tier and query confidence (power users with complex queries opt in, while light users pass), a main-effects model misses that and produces poor balance.

Use flexible models (for example, gradient boosting on the propensity score or regression adjustment on top of weighting) and always check the balance after weighting. Poor balance after weighting is the primary signal of misspecification.

### 4. Spillovers Between Users (Violates SUTVA)

Propensity score methods assume your users are independent. If one user opting into agent mode affects another user's task completion (for example, teammates adopting the feature together in shared workspaces), your estimated effect includes the spillover.

This violates the stable-unit-treatment-value-assumption, and handling it cleanly requires a different toolkit: either cluster randomization for features adopted at the workspace level or network-aware experimental designs for user-level spillovers.

These failure modes stay invisible in your regression coefficients. They surface as estimates that look good on paper but don't hold up when the feature rolls out to a broader audience.

Run balance diagnostics, check overlap plots, and document what you might have missed: those are your only real defenses.

---

## What to Do Next

Propensity score methods are the right tool when your feature ships behind an opt-in toggle and you've got rich covariates to model selection with.

If opt-in follows a crisp rule (a threshold on query complexity, a paid-tier gate), regression discontinuity fits better. If you suspect unobserved confounders and have an external randomization source (randomized rollout noise, rate-limit-triggered routing), instrumental variables will do better.

To guard your estimate against propensity misspecification, doubly robust estimators combine propensity weighting with regression adjustment and stay consistent if at least one of the two component models is correctly specified.

The companion notebook for this tutorial [lives here (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](http://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/02_propensity_opt_in). Clone the repo, generate the synthetic dataset, and run `psm_demo.ipynb` (or `psm_demo.py`) to reproduce every code block, every number, and every figure from this tutorial.

When an AI feature ships behind a toggle, the naïve opt-in comparison is usually the wrong number. Propensity score methods give you "users comparable to those who clicked this" as your counterfactual, and the bootstrap gives you an interval you can defend when a stakeholder asks how sure you are.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Propensity Scores: Causal Inference for LLM-Based Features in Python",
  "desc": "Every product experimentation team running causal inference on LLM-based features eventually hits the same wall: when users click ”Try our AI assistant,” the volunteers aren't a random sample. Your pr",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/product-experimentation-with-propensity-scores-causal-inference-for-llm-based-features-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
