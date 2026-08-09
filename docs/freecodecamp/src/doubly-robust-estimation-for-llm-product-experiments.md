---
lang: en-US
title: "Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications"
description: "Article(s) > Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications"
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
      content: "Article(s) > Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications"
    - property: og:description
      content: "Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/doubly-robust-estimation-for-llm-product-experiments.html
prev: /programming/py-pandas/articles/README.md
date: 2026-08-11
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/37d63c81-8744-46ba-8dcd-da9371817913.png
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
  name="Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications"
  desc="Your AI product shipped an agent-mode opt-in six months ago. You ran a propensity analysis, adjusted for engagement tier and query confidence, and reported a clean +8 percentage-point lift in task com"
  url="https://freecodecamp.org/news/doubly-robust-estimation-for-llm-product-experiments"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/37d63c81-8744-46ba-8dcd-da9371817913.png"/>

Your AI product shipped an agent-mode opt-in six months ago. You ran a propensity analysis, adjusted for engagement tier and query confidence, and reported a clean +8 percentage-point lift in task completion. The number made it into the quarterly business review, and everyone was pleased.

Inevitably, a rigorous data scientist will ask an uncomfortable question. How confident are you that the propensity model captured every confounder? What if you missed something and the logistic regression is estimating the wrong selection probability? What if your outcome regression is also misspecified because task completion has a nonlinear relationship with query confidence that a linear model can't capture?

You have two models, you're not sure which one is right, and both are load-bearing.

Opt-in AI products hit this wall by default. In causal inference for LLM-based experiments run without randomization, you have outcomes for users who opted in and those who didn't.

The complication is that the groups chose themselves. Every model you build to recover the causal effect is an approximation of an unknown truth.

Propensity weighting alone fails if the propensity model is wrong. Regression adjustment alone fails if the outcome model is wrong. Each method bets everything on a single model being correctly specified.

Doubly robust estimation, specifically the augmented inverse-probability weighting (AIPW) estimator, takes a different bet. It combines a propensity model and an outcome model into a single estimator that remains consistent if either is correctly specified. You need both to fail simultaneously for AIPW to break.

That guarantee comes from the semiparametric efficiency theory underlying the estimator, a mathematical property baked into its construction. Think of it as redundancy engineering for causal estimates. It relies on the same fault-tolerance logic that keeps distributed systems online when a single node fails.

In this tutorial, you'll implement AIPW from scratch using scikit-learn, add a bootstrap confidence interval, and prove the double-robust property by deliberately breaking one model at a time to show the estimator holds up. For data scientists running noisy AI product experiments where every model is an approximation, this framework makes your estimate survivable.

::: info

Every code block in this tutorial runs end-to-end in the companion notebook at [<VPIcon icon="fas fa-code-branch"/>`main`<VPIcon icon="fas fa-folder-open"/>`12_doubly_robust` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/12_doubly_robust/). The notebook file is <VPIcon icon="iconfont icon-jupyter"/>`aipw_demo.ipynb`.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/12_doubly_robust at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/12_doubly_robust/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0217a4192cd0b3c0bc9888c735ca11cbe70ccffea1fab8aa8de5cacc8898b89e/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

---

## Why Neither Model Earns Your Trust

Propensity score methods require one thing to succeed: a propensity model that correctly captures all confounders. Regression adjustment requires one thing to succeed: an outcome model that correctly captures how covariates relate to the outcome. Both are strong conditions in practice, and you rarely know whether you've met either one.

Propensity models fail in three specific ways in LLM opt-in analyses. First, the features in your event logs are downstream of the opt-in decision itself. A user's query confidence score reflects the model's assessment upon receipt of the query. The underlying motivation for opting in stays entirely outside your measurement system.

Second, logistic regression can't automatically capture nonlinear interactions. If heavy users in enterprise plans opt in at radically different rates than heavy users on individual plans, a main-effects logistic model will miss that nuance completely. Third, unmeasured confounders are invisible by construction. If power users who read your engineering blog opt in far more than equivalent users who don't, and you lack that blog-readership signal, the propensity model will assign them the wrong weight no matter how well you tune it.

Outcome models fail for different reasons. Task completion in LLM systems depends on query complexity, which is notoriously noisy. It depends on model version, which you might not have captured as a covariate. And it depends on whether the user was in an enterprise workspace with a custom system prompt (a factor that may not be in your logs at all). A linear regression on those covariates will misspecify the functional form somewhere, and the direction of the bias is unpredictable.

The practical problem is that you can't run a specification test that definitively confirms either model is right. Balance diagnostics reveal propensity quality, and their reach ends there. They can't detect unmeasured confounding. Residual plots confirm how well your outcome model fits the observed data. But they can't reveal what your covariates left out. You can improve both models and still not know if you've fixed the fundamental problem. That's harder than it sounds.

Three identification assumptions underlie any propensity-based causal analysis. All three must hold before AIPW or any other estimator can give you a valid causal effect.

1. **Unconfoundedness** (also called strong ignorability): all variables that jointly affect opt-in probability and task completion are measured and included in your models.
2. **Overlap** (positivity): every user must have a nonzero probability of being in either the treated or control group. No subgroup can be entirely certain to opt in or not.
3. **SUTVA**: each user's potential outcomes are unaffected by other users' treatment status, and there's only one version of the treatment. AIPW relaxes the requirement that your models correctly capture these assumptions, but it doesn't make the assumptions themselves disappear. They still have to hold in the data, and no amount of methodological cleverness changes that.

---

## What Doubly Robust Estimation Actually Does

AIPW gives you a mathematical guarantee neither single-model method can offer. The estimate stays consistent if either the propensity model or the outcome model is correctly specified. The estimator succeeds as long as at least one arm holds up. Both models have to fail simultaneously for the estimator to break.

The AIPW estimator targets the **average treatment effect (ATE)** across all users with overlapping propensity scores. This is distinct from the average treatment effect on the treated (ATT) that propensity matching targets. Propensity trimming to [0.01, 0.99] narrows the effective population to users with adequate overlap, but the estimand stays the ATE over that specific overlap region.

The formula:

$$
\text{ATE_AIPW}=\text{mean}\left(m_1\left(X\right)-m_0\left(X\right)+T\times\frac{\left(Y-m_1\left(X\right)\right)}{e\left(X\right)}-\left(1-T\right)\times\frac{\left(Y-m_0\left(X\right)\rigt)}{(1-e\left(X\right))}\right)
$$

Where:

- $e(X)$ is the propensity score: predicted probability of opt-in given covariates
- $m_1\left(X\right)$ is the predicted outcome under treatment (opted-in)
- $m_0\left(X\right)$ is the predicted outcome under control (not opted-in)
- $T$ is the treatment indicator (1 = opted in, 0 = not)
- $Y$ is the observed outcome

All decimal values in this tutorial represent proportions. An estimate of 0.08 equals 8 percentage points on task completion.

The expression has two main parts. The first part, $m_1\left(X\right)-m_0\left(X\right)$, is pure regression adjustment: it directly contrasts the two predicted outcomes. The second part, the IPW correction terms, computes the weighted residual between what actually happened and what the regression predicted.

If the outcome models are perfect, the residuals evaluate to zero and the correction vanishes. If the outcome models are wrong, the IPW correction adjusts for the prediction errors, provided the propensity model is correctly specified.

Run that logic in reverse: if the propensity is correct, the IPW correction terms produce an unbiased estimate by themselves, and the outcome models only need to reduce variance. Either arm is sufficient. You need both to fail for the estimator to fail.

![Figure 1 (AIPW two-model structure): AIPW's two-model structure: propensity arm and outcome arm each providing redundant protection. The estimate is consistent if either arm is correctly specified.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/c477792f-480a-4dc6-beb9-fee5691ce72d.png)

This property is called double robustness, and it carries a real practical consequence. AIPW reaches the semiparametric efficiency bound asymptotically when both models are correctly specified and regularity conditions hold: it extracts as much statistical information from the data as any regular estimator can in large samples. In practice, that efficiency gain means tighter confidence intervals without collecting more data.

::: note Prerequisites

You need Python 3.11 or newer, familiarity with pandas and scikit-learn, and a basic understanding of regression and inverse probability weighting.

Install the packages for this tutorial:

```sh
pip install numpy pandas scikit-learn scipy
#
# Successfully installed numpy pandas scikit-learn scipy
```

These four packages are the only dependencies. `scikit-learn` provides the logistic and linear regression models. `scipy` is used for KDE in the chart scripts. You don't need any causal-inference-specific library. The AIPW estimator is straightforward enough to build from scratch.

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
#
# Generated 50000 users → data/synthetic_llm_logs.csv
```

The data generator creates 50,000 synthetic users with engagement tiers, query confidence scores, opt-in flags, and task-completion outcomes. The ground-truth causal effect of agent-mode opt-in is +8 percentage points, baked into the generator so you can verify that each estimator recovers it accurately.

:::

---

## Setting Up the Working Example

The dataset simulates a SaaS product where users can opt into an agent mode powered by a more capable model. Fifty thousand users, with opt-in rates that differ sharply by engagement tier: heavy users opt in at 65%, medium at 35%, and light at 12%.

The ground-truth causal effect is +8 percentage points on task completion. A naïve comparison between opted-in and non-opted-in users overstates the difference by nearly a factor of three due to selection bias (a distortion that AIPW is specifically designed to correct).

Load the data and compute the naïve estimate:

```py
import numpy as np
import pandas as pd

df = pd.read_csv("data/synthetic_llm_logs.csv")

T = df["opt_in_agent_mode"].values
Y = df["task_completed"].values

naive_ate = Y[T == 1].mean() - Y[T == 0].mean()
print(f"Naive ATE (unadjusted): {naive_ate:+.4f}")
print(f"N treated: {T.sum()}, N control: {(1-T).sum()}")
#
# Naive ATE (unadjusted): +0.2106
# N treated: 13451, N control: 36549
```

You load the dataset, pull out the binary treatment indicator (`opt_in_agent_mode`) and the binary outcome (`task_completed`), and compute the raw difference in mean outcomes between treated and control.

The naïve estimate lands at +0.2106, more than 21 percentage points, heavily inflated by selection bias. Heavy-engagement users opt in far more often than light-engagement users, and they were always going to complete more tasks regardless of which model they were on.

The naïve gap mostly reflects who opted in. The model change contributed only a fraction of the observed difference.

The guarantee sounds straightforward in theory, and it holds up in the data: when you run Step 5's misspecification tests, you'll see exactly how much of that +0.2106 is selection noise versus real treatment effect.

---

## Step 1: Fit the Propensity Model

The propensity score is the predicted probability that a user opted in given their observable characteristics. Logistic regression on engagement tier and query confidence is the right starting point for this dataset.

```py
from sklearn.linear_model import LogisticRegression

# Build covariate matrix
X_df = pd.get_dummies(
    df[["engagement_tier", "query_confidence"]],
    drop_first=True
).astype(float)
X = X_df.values

# Fit propensity model
ps_model = LogisticRegression(max_iter=1000, C=1.0)
ps_model.fit(X, T)

e_hat = ps_model.predict_proba(X)[:, 1]

# Trim extreme propensities for numerical stability
e_hat = np.clip(e_hat, 0.01, 0.99)

print(f"Propensity range: {e_hat.min():.3f} to {e_hat.max():.3f}")
print(f"Mean propensity (treated): {e_hat[T == 1].mean():.3f}")
print(f"Mean propensity (control): {e_hat[T == 0].mean():.3f}")
#
# Propensity range: 0.114 to 0.675
# Mean propensity (treated): 0.401
# Mean propensity (control): 0.220
```

You one-hot encode the categorical engagement tier, keep query confidence as a continuous variable, and fit logistic regression to predict the opt-in event.

The `predict_proba` method returns the class-1 probability for each user: that's the propensity score. You clip values to [0.01, 0.99] to prevent division-by-zero errors in the AIPW formula when propensities fall near the boundary (which is what the clip prevents in practice).

The sanity check confirms that mean propensity is higher in the treated group (0.401) than in the control group (0.220), which matches the selection pattern you'd expect given that heavy users appear in the treated group far more often and the model correctly assigns them higher probabilities.

The propensity range of 0.114 to 0.675 confirms that the overlap assumption holds: no user is assigned a propensity near 0 or 1, so every user has a meaningful probability of being in either group.

Run the propensity range check before touching the estimator. A narrow range like 0.114 to 0.675 confirms overlap holds, while values near 0 or 1 would flag a violation.

![Figure 2 (propensity overlap chart): Propensity score overlap on the 50,000-user synthetic dataset. Treated (opted in, 13,451 users) and control (did not opt in, 36,549    users) distributions share common support across the full propensity range, confirming the positivity assumption holds. The bottom panel shows treated and control user counts by engagement tier.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/4bb05047-3f90-4ffe-8384-23adbe3b976f.png)

---

## Step 2: Fit the Outcome Models

The outcome models predict task completion separately for the treated and control groups.

You train two separate regressions: the first trains only on treated users, the second only on control users. Then you use both to predict outcomes for every user in the dataset under each hypothetical treatment assignment.

```py
from sklearn.linear_model import LinearRegression

# Fit outcome model for treated users
m1_model = LinearRegression()
m1_model.fit(X[T == 1], Y[T == 1])

# Fit outcome model for control users
m0_model = LinearRegression()
m0_model.fit(X[T == 0], Y[T == 0])

# Predict counterfactual outcomes for all users
m1_hat = m1_model.predict(X)   # predicted outcome if every user were treated
m0_hat = m0_model.predict(X)   # predicted outcome if every user were control

# Regression adjustment estimate (outcome model only, no propensity)
ate_regression = (m1_hat - m0_hat).mean()
print(f"Regression adjustment ATE: {ate_regression:+.4f}")
#
# Regression adjustment ATE: +0.0847
```

You fit one linear regression on treated users to learn how covariates relate to outcomes in that group, and a separate regression on control users for the other side. Then you predict what each user's outcome would have been under treatment (`m1_hat`) and under control (`m0_hat`) across the full dataset.

The regression adjustment estimate averages those predicted differences: it lands at +0.0847, much closer to the ground truth of +0.08 than the naïve +0.2106. Regression adjustment is doing its job here, using the outcome model to impute the missing counterfactual for each user. The remaining gap between 0.0847 and 0.0800 reflects the outcome model's own limitations, and that's exactly where the propensity-score correction in AIPW steps in.

---

## Step 3: Combine into the AIPW Estimator

With propensity scores and both outcome predictions in hand, you can combine them into the AIPW formula:

```py
from typing import Tuple

def calculate_aipw_ate(
    Y: np.ndarray,
    T: np.ndarray,
    e_hat: np.ndarray,
    m1_hat: np.ndarray,
    m0_hat: np.ndarray
) -> Tuple[float, np.ndarray]:
    """
    Augmented Inverse-Probability Weighting (AIPW) estimator.

    Parameters
    ----------
    Y       : array-like, observed outcomes
    T       : array-like, binary treatment indicators
    e_hat   : array-like, estimated propensity scores P(T=1|X)
    m1_hat  : array-like, predicted outcomes under treatment
    m0_hat  : array-like, predicted outcomes under control

    Returns
    -------
    float : estimated average treatment effect (ATE)
    """
    # IPW correction for treated observations
    ipw_treated = T * (Y - m1_hat) / e_hat

    # IPW correction for control observations
    ipw_control = (1 - T) * (Y - m0_hat) / (1 - e_hat)

    # AIPW influence function per observation
    phi = (m1_hat - m0_hat) + ipw_treated - ipw_control

    return phi.mean(), phi


ate_aipw, phi_obs = calculate_aipw_ate(Y, T, e_hat, m1_hat, m0_hat)
print(f"AIPW ATE:            {ate_aipw:+.4f}")
print(f"Naive ATE:           {naive_ate:+.4f}")
print(f"Regression-only ATE: {ate_regression:+.4f}")
print(f"Ground truth:        +0.0800")
#
# AIPW ATE:            +0.0847
# Naive ATE:           +0.2106
# Regression-only ATE: +0.0847
# Ground truth:        +0.0800
```

The function computes the AIPW influence function for each observation. The first term, `m1_hat - m0_hat`, is the regression adjustment. The second term, `T * (Y - m1_hat) / e_hat`, is the IPW correction for treated users: it takes the residual between their actual outcome and the model's prediction, then upweights it by the inverse propensity. Because users who looked unlikely to opt in are underrepresented in the treated group, they get large upweights to compensate. The third term applies the symmetric correction for control users.

Average the per-observation influence values to obtain the AIPW estimate. On this dataset, it lands at +0.0847, matching the regression-only estimate. That's exactly what you'd expect when both models are adequately specified: both arms agree, both sit close to the ground truth of +0.08, and both are well clear of the naive +0.2106. The function also returns `phi_obs`the per-observation influence values you'll need for the misspecification tests in Step 5. ---

## Step 4: Bootstrap Confidence Intervals

A point estimate without a confidence interval is incomplete. The cleanest production approach is a nonparametric bootstrap: resample the data with replacement, refit everything from scratch, and take percentiles of the distribution of estimates across resamples.

```py :collapsed-lines
def bootstrap_aipw_ci(
    df: pd.DataFrame,
    X_cols: list,
    treatment_col: str,
    outcome_col: str,
    n_bootstrap: int = 500,
    seed: int = 7
) -> Tuple[np.ndarray, float, float]:
    """
    Bootstrap AIPW ATE with 95% percentile confidence interval.

    Refits propensity model, both outcome models, and AIPW
    from scratch on each resample.
    """
    rng = np.random.default_rng(seed)
    n = len(df)
    boot_estimates = []

    X_all = pd.get_dummies(df[X_cols], drop_first=True).astype(float).values
    T_all = df[treatment_col].values
    Y_all = df[outcome_col].values

    for _ in range(n_bootstrap):
        # Resample with replacement
        idx = rng.integers(0, n, size=n)
        X_b, T_b, Y_b = X_all[idx], T_all[idx], Y_all[idx]

        # Re-fit propensity
        ps = LogisticRegression(max_iter=1000, C=1.0)
        ps.fit(X_b, T_b)
        e_b = np.clip(ps.predict_proba(X_b)[:, 1], 0.01, 0.99)

        # Re-fit outcome models
        m1 = LinearRegression().fit(X_b[T_b == 1], Y_b[T_b == 1])
        m0 = LinearRegression().fit(X_b[T_b == 0], Y_b[T_b == 0])
        m1_b = m1.predict(X_b)
        m0_b = m0.predict(X_b)

        # AIPW on bootstrap sample
        ate_b, _ = calculate_aipw_ate(Y_b, T_b, e_b, m1_b, m0_b)
        boot_estimates.append(ate_b)

    boot_estimates = np.array(boot_estimates)
    ci_low  = np.percentile(boot_estimates, 2.5)
    ci_high = np.percentile(boot_estimates, 97.5)

    return boot_estimates, ci_low, ci_high


boot_dist, ci_lo, ci_hi = bootstrap_aipw_ci(
    df,
    X_cols=["engagement_tier", "query_confidence"],
    treatment_col="opt_in_agent_mode",
    outcome_col="task_completed",
    n_bootstrap=500,
    seed=7,
)

print(f"AIPW ATE:           {ate_aipw:+.4f}")
print(f"95% Bootstrap CI:   [{ci_lo:+.4f}, {ci_hi:+.4f}]")
print(f"Bootstrap std dev:  {boot_dist.std():.4f}")
#
# AIPW ATE:           +0.0847
# 95% Bootstrap CI:   [+0.0744, +0.0952]
# Bootstrap std dev:  0.0053
```

You draw 500 bootstrap samples by resampling 50,000 rows with replacement. On each resample, you refit the propensity model from scratch, refit both outcome models from scratch, and compute the AIPW estimate on that new data.

Refitting all models on each resample matters: if you only resample the residuals from fixed models, you understate the variability due to model estimation error.

The 95% confidence interval is [+0.0744, +0.0952], which comfortably contains the ground truth of +0.0800 and excludes the naïve +0.2106 by a wide margin. The bootstrap standard deviation is 0.0053, so typical sampling variation in your estimate is about half a percentage point.

---

## Step 5: Prove the Double-Robust Property via Deliberate Misspecification

The double-robust property holds up in practice. You can verify it empirically on your own dataset by deliberately misspecifying one model at a time and watching whether AIPW holds.

### Scenario 1: Wrong Propensity Model, Correct Outcome Model

Replace the estimated propensity scores with a constant value of 0.3 for all users. Every user gets the same weight regardless of their engagement tier or query confidence, making this a maximally misspecified propensity model by design. IPW alone should break. AIPW should be unaffected because the outcome model is correctly specified.

```py
# Scenario 1: constant propensity (e = 0.3 for everyone)
e_wrong = np.full(len(df), 0.3)

# IPW with wrong propensity
t_mask = T == 1
c_mask = T == 0
ate_ipw_wrong = (
    (Y[t_mask] / e_wrong[t_mask]).sum() / (1 / e_wrong[t_mask]).sum()
    - (Y[c_mask] / (1 - e_wrong[c_mask])).sum() / (1 / (1 - e_wrong[c_mask])).sum()
)

# AIPW with wrong propensity but correct outcome models
ate_aipw_wrong_ps, _ = calculate_aipw_ate(Y, T, e_wrong, m1_hat, m0_hat)

print("=== Scenario 1: constant propensity (e = 0.3) ===")
print(f"IPW with wrong propensity:         {ate_ipw_wrong:+.4f}  (should be wrong)")
print(f"Regression adjustment (unchanged): {ate_regression:+.4f}  (should be ~0.085)")
print(f"AIPW with wrong propensity:        {ate_aipw_wrong_ps:+.4f}  (should stay ~0.085)")
print(f"Ground truth:                      +0.0800")
#
# === Scenario 1: constant propensity (e = 0.3) ===
# IPW with wrong propensity:         +0.2106  (should be wrong)
# Regression adjustment (unchanged): +0.0847  (should be ~0.085)
# AIPW with wrong propensity:        +0.0847  (should stay ~0.085)
# Ground truth:                      +0.0800
```

You replace the flat propensity with 0.3 for every user and compute two things. First, pure IPW using only the wrong propensity: it produces the naïve +0.2106 because it reweights everyone equally regardless of engagement tier, failing to correct for the selection pattern.

Second, AIPW using the wrong propensity while keeping the correctly fitted outcome models: the estimate remains +0.0847. The outcome model terms carry the estimation forward, and the IPW correction adds noise that averages out across the sample. One arm fails, and the other carries the estimator through.

### Scenario 2: Wrong Outcome Models, Correct Propensity Model

Now keep the correctly estimated propensity scores but replace both outcome models with constants. Set `m1_hat = m0_hat = 0.5` for all users, which is the uninformative prediction of 50% task completion for everyone. Regression adjustment alone should collapse to zero. AIPW should be unaffected because the propensity model is correctly specified.

```py
# Scenario 2: constant outcome models (m1 = m0 = 0.5 for everyone)
m1_wrong = np.full(len(df), 0.5)
m0_wrong = np.full(len(df), 0.5)

# Regression adjustment with wrong outcome models
ate_regression_wrong = (m1_wrong - m0_wrong).mean()

# Pure IPW with correct propensity (for comparison)
ate_ipw_correct = (
    (Y[t_mask] / e_hat[t_mask]).sum() / (1 / e_hat[t_mask]).sum()
    - (Y[c_mask] / (1 - e_hat[c_mask])).sum() / (1 / (1 - e_hat[c_mask])).sum()
)

# AIPW with correct propensity but wrong outcome models
ate_aipw_wrong_out, _ = calculate_aipw_ate(Y, T, e_hat, m1_wrong, m0_wrong)

print("=== Scenario 2: constant outcome models (m1 = m0 = 0.5) ===")
print(f"Regression with wrong outcome models: {ate_regression_wrong:+.4f}  (should be 0.0)")
print(f"IPW with correct propensity:          {ate_ipw_correct:+.4f}  (should be ~0.085)")
print(f"AIPW with wrong outcome models:       {ate_aipw_wrong_out:+.4f}  (should stay ~0.085)")
print(f"Ground truth:                         +0.0800")
#
# === Scenario 2: constant outcome models (m1 = m0 = 0.5) ===
# Regression with wrong outcome models: +0.0000  (should be 0.0)
# IPW with correct propensity:          +0.0851  (should be ~0.085)
# AIPW with wrong outcome models:       +0.0849  (should stay ~0.085)
# Ground truth:                         +0.0800
```

With constant outcome models set to 0.5, the regression adjustment term `m1_hat - m0_hat` collapses to exactly zero, a completely useless estimate. Pure IPW using the correctly specified propensity model recovers +0.0851 on its own.

AIPW using the wrong outcome models but the correct propensity also recovers +0.0849, because the IPW correction terms now carry all the weight: the residuals `Y - 0.5` get correctly reweighted by the inverse propensity and average out to the right answer. The outcome model being wrong adds only variance. The estimator stays consistent.

Running both scenarios gives you a sanity check you can include in any internal analysis document. It transforms double robustness from a theoretical property into a concrete number you can show a skeptic.

---

## When Doubly Robust Estimation Fails

AIPW gives you one layer of protection against model misspecification, with real limits worth naming before you present results.

### Both Models Are Misspecified Simultaneously

The double-robust guarantee covers the case where at least one model is correct. If your propensity model misses a central confounder and your outcome model also fails to capture the true functional form, AIPW carries the bias of whichever model is less wrong.

The uncomfortable reality: AIPW carries unmeasured confounding forward, unchanged. It gives you one free mistake. The limit is exactly one.

### Extreme Propensity Scores Inflate Variance

Because some users have propensities near 0 or 1, the IPW correction terms in the AIPW formula blow up. A user with `e_hat = 0.02` generates a correction of `Y / 0.02 = 50 * Y`, which can dominate the entire estimator if that user's outcome is unusual.

Clipping propensities to [0.01, 0.99] as done here provides minimal protection. Propensity trimming (removing users with extreme scores from the analysis) is the cleaner solution, though it changes the estimand: you're then estimating the ATE over the overlap region, a narrower population than the full dataset. Document that choice explicitly.

### Finite-Sample Variance Exceeds What Asymptotic Theory Predicts

AIPW achieves the semiparametric efficiency bound in large samples. With 500 or 1,000 observations, the variance inflation from the IPW correction terms can be substantial, and bootstrap confidence intervals will be wide.

In very small experiments, naïve regression adjustment may give tighter intervals, even if the theoretical protection against misspecification is weaker. AIPW's efficiency advantage is a large-sample property.

### Model Selection for Both Components Still Requires Judgment

Logistic regression is a sensible default, but if the true selection mechanism involves high-order interactions a main-effects model can't represent, the propensity model will be systematically wrong in ways that balance diagnostics won't catch.

Using more flexible models (gradient boosting, random forests) for the nuisance components improves performance in large samples but requires cross-fitting: fitting the propensity and outcome models on a held-out fold before predicting, so their training error doesn't leak into the AIPW calculation and bias the final estimate. Cross-fitting is the setup behind targeted maximum likelihood estimation (TMLE).

---

## Strategic Implementation

The from-scratch implementation in this tutorial shows the mechanics. Your production setup needs two things this version lacks: cross-fitting to prevent overfitting bias when using flexible models, and data-adaptive nuisance models that flex to the signal in your data. The from-scratch version in this tutorial won't get you through a serious observational study without cross-fitting.

Python implementations of TMLE are available in specialized causal inference libraries, and each takes the AIPW principle and adds both. TMLE targets the estimand of interest directly, corrects for regularization bias when you use machine learning models for the propensity and outcome components, and produces confidence intervals valid even when the nuisance models are estimated from the same data you're analyzing.

The Lyft engineering team published a detailed account of their doubly robust pipeline for ride-share causal inference worth reading before building a production-grade system ([<VPIcon icon="fas fa-globe"/>Nassiri & Chu, Lyft Engineering, 2026](https://eng.lyft.com/trusting-the-untestable-validation-and-diagnostics-for-the-doubly-robust-models-00853df009df)).

For the theoretical background, the guarantee behind AIPW dates to Robins, Rotnitzky, and Zhao ([<VPIcon icon="fas fa-globe"/>Robins et al., 1994](https://semanticscholar.org/paper/Estimation-of-Regression-Coefficients-When-Some-are-Robins-Rotnitzky/46c56845fbb9e9452a318d736356949bd24fa012)), which matters because it tells you exactly where the method's guarantees stop and where your own modeling judgment begins.

The practical implementation guide most closely aligned with what you see here is the targeted learning framework developed by Mark van der Laan at UC Berkeley ([<VPIcon icon="fas fa-globe"/>van der Laan & Rose, 2011](https://link.springer.com/book/10.1007/978-1-4419-9782-1)).

::: info

The companion notebook for this tutorial lives at [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`12_doubly_robust` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/12_doubly_robust). Clone the repo, generate the synthetic dataset, and open <VPIcon icon="iconfont icon-jupyter"/>`aipw_demo.ipynb` to reproduce every code block from this tutorial, including the misspecification scenarios.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/12_doubly_robust at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/12_doubly_robust/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0217a4192cd0b3c0bc9888c735ca11cbe70ccffea1fab8aa8de5cacc8898b89e/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

Your production observational analysis has two approximations where you'd prefer one. Run the misspecification tests from Step 5 on your own data: the propensity diagnostics will tell you how much weight the propensity arm is carrying, and the residual spread in your outcome models will tell you how much the regression adjustment arm is doing.

AIPW works because it's designed for exactly that situation, where neither model is verified, and both are in play. If one holds up, the estimator does too.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Doubly Robust Estimation: When Both Your Models Are Wrong in LLM Applications",
  "desc": "Your AI product shipped an agent-mode opt-in six months ago. You ran a propensity analysis, adjusted for engagement tier and query confidence, and reported a clean +8 percentage-point lift in task com",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/doubly-robust-estimation-for-llm-product-experiments.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
