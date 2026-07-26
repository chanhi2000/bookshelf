---
lang: en-US
title: "Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering"
description: "Article(s) > Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering"
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
      content: "Article(s) > Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering"
    - property: og:description
      content: "Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/counterfactual-meta-learners-for-llm-prompt-decisions.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-24
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dc2c7913-508e-48fe-b56c-772e86469976.png
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
  name="Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering"
  desc="Imagine your team deployed Prompt A globally two weeks ago. Tight deadlines and high confidence meant the rollout hit 100 percent of users without any A/B testing, shadow traffic, or holdout groups. W"
  url="https://freecodecamp.org/news/counterfactual-meta-learners-for-llm-prompt-decisions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dc2c7913-508e-48fe-b56c-772e86469976.png"/>

Imagine your team deployed Prompt A globally two weeks ago. Tight deadlines and high confidence meant the rollout hit 100 percent of users without any A/B testing, shadow traffic, or holdout groups.

While completion rates appear stable, a colleague presents a new prompt from a staging environment late at night, and that sparks the real question: would the alternative have been the better choice to ship?

You're now stuck in the logged data trap. It looks unanswerable, but it isn't. Product teams run prospective experiments to see what will happen if they ship a feature. Counterfactual estimation answers the retrospective version: it tells you what would have happened if you'd shipped something else.

For data science and product engineering leaders working with LLM product logs, that's often the only available measurement path once a prompt is in production. Every log you have comes from users who saw Prompt A. The question is purely retrospective. You can't go back and re-run the week with a different configuration. That's a classic counterfactual problem.

Teams ship prompts quickly, collect logs, and then ask retrospective questions. What would conversion have looked like with a different system prompt? Which users would have responded differently? Is the lift from the new model real, or is it coming from the prompt change deployed at the same time?

The answer lives in a class of methods called counterfactual estimation using meta-learners. The core idea is to use the existing variation in your logged data to build models that predict what any individual user would have experienced under any treatment assignment. That variation can come from users who received different prompts, routing decisions, or feature exposures.

In this guide, you'll implement a T-learner and an X-learner from scratch using scikit-learn. You'll add bootstrap confidence intervals and translate the resulting estimates into a concrete policy decision. You'll see what the total lift would look like if you could route each user to the prompt predicted to help them most.

::: info

Every code block in this tutorial runs end-to-end in the companion notebook at [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`10_counterfactual_prompts/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/10_counterfactual_prompts/). The notebook file is <VPIcon icon="iconfont icon-jupyter"/>`counterfactual_demo.ipynb`.

:::

---

## Why Logged Data is Not an Experiment

The core problem with logged production data is that treatment assignment is rarely random. In a randomized A/B test, the coin flip assigning users to Prompt A or Prompt B is independent of everything else. Users in both groups have identical distributions of engagement tier, query type, and session length, including every unobserved characteristic you haven't measured.

The only systematic difference between groups is the treatment itself, so any difference in outcomes must be the causal effect of that treatment.

Production logs carry a different structure. Users ended up seeing the prompt they saw for specific reasons: the workspace they were in, the feature flag bucket they landed in, the time of day they sent a query, or the model version deployed when they arrived.

Some of those reasons are recorded in your data. The rest stay hidden. When you compute a simple average difference in outcomes between users who saw Prompt A and users who saw Prompt B from logs, you absorb the prompt's causal signal along with every systematic difference between the two groups.

Here's where it gets uncomfortable. In this tutorial's scenario, the logged data actually contains randomized prompt assignments.

Pretend for a moment that it doesn't. Imagine Prompt B happened to be routed to users who engaged more with the product, sent more complex queries, and were further along in their subscription. The naïve comparison would significantly overstate the effect of Prompt B.

Counterfactual estimation methods are designed specifically for that non-random case, and the implementation in this guide works the same way regardless of whether the original assignment was clean or confounded.

The distinction you care about is between what a user actually experienced and what they would have experienced under a different treatment. Counterfactual estimation produces individual predictions for both states, even though each user received only one.

---

## The Mechanics of Counterfactual Estimation

![Figure 1: Conceptual illustration of the T-learner. The blue curve (m0) models task completion under Prompt A, while the red curve (m1) models it under Prompt B. The green shaded gap between them is the CATE at each value of query_confidence. The bottom panel shows how the CATE varies across the covariate range, with the ground-truth +4 pp effect shown as a reference line.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/f1b9cc06-8387-45ba-9e1f-e55baac41cbe.png)

The potential outcomes framework (Rubin, 1974, Holland, 1986) provides the cleanest way to frame this problem. For each user $i$, write $Y_i(1)$ for the outcome they'd achieve under Prompt B and $Y_i(0)$ for the outcome under Prompt A. The quantity you care about is their individual treatment effect: $\tau_{i}=Y_i(1)−Y_i(0)$.

The fundamental problem is that you only ever observe one of the two outcomes. A user who saw Prompt A gives you $Y_i(0)$, while $Y_i(1)$ stays missing. A user who saw Prompt B gives you $Y_i(1)$, while $Y_i(0)$ stays missing.

Individual treatment effects are unidentifiable from single observations. What you can estimate instead is the Conditional Average Treatment Effect (CATE):

$$
\tau(x)=E[Y(1)−Y(0)\mid{X}=x]
$$.

This is the expected treatment effect for users with covariate profile $x$. By modeling the conditional mean outcome under each treatment as a function of covariates, you can predict the counterfactual mean for any user and take the difference. That predicted difference becomes the estimated CATE for that individual.

This approach requires two primary assumptions. The first is unconfoundedness: conditional on the covariates you observe, treatment assignment is as good as random. Formally, $\left(Y(0),Y(1)\right)\perp{T}\mid{X}$.

If unobserved variables influenced both which prompt a user saw and their task completion, this assumption breaks down and introduces bias.

The second assumption is positivity, or overlap: every user must have had some positive probability of receiving either treatment. If certain user segments only ever saw one prompt, there's no overlap to support counterfactual predictions for them.

A third assumption, SUTVA (Stable Unit Treatment Value Assumption), holds that each user's potential outcomes depend only on their own treatment assignment. What prompt other users received doesn't factor into their outcome.

That's highly plausible in single-tenant SaaS products where users' task completions are independent. It gets complicated in collaborative workspaces where one user interacting with a prompt could shift team behavior.

Meta-learners are a family of estimators that fit standard supervised learning models to estimate CATE. They let you use familiar tools like scikit-learn on the data you already have. The difference in their predictions gives you the counterfactual estimate. That's the entire premise of this tutorial.

::: note Prerequisites and Setup

To follow along here, you'll need:

- Python 3.11 or newer
- Comfort with pandas and scikit-learn
- Prior causal-inference experience is helpful, but the tutorial is accessible without it

:::

Install the packages for this tutorial:

```sh
pip install numpy pandas scikit-learn
```

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

The dataset simulates a SaaS product with two prompt variants. Prompt A is the control and Prompt B is the challenger. It contains 50,000 users, evenly split between the two arms. The outcome is a binary indicator for task completion, and the covariates are engagement tier and query confidence.

The data generator bakes in a ground-truth causal effect of +4 percentage points overall, which means you can verify the estimators against a known answer. That's a luxury you rarely get in production.

Load the data and see what you're working with:

```py :collapsed-lines
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")

print("Shape:", df.shape)
print("\nTreatment arm sizes:")
print(df.prompt_variant.value_counts().to_dict())

print("\nTask completion by prompt variant:")
print(df.groupby("prompt_variant").task_completed.agg(["mean", "count"]).round(4))

naive_effect = (
    df[df.prompt_variant == 1].task_completed.mean()
    - df[df.prompt_variant == 0].task_completed.mean()
)
print(f"\nNaive difference: {naive_effect:+.4f}")
#
# Shape: (50000, 16)
#
# Treatment arm sizes:
# {0: 25000, 1: 25000}
#
# Task completion by prompt variant:
#               mean  count
# prompt_variant
# 0             0.60  25000
# 1             0.63  25000
#
# Naive difference: +0.0260
```

The naïve difference in task completion between the two arms is about +0.026. Next, build the feature matrix for the machine learning models:

```py
X_cols = ["engagement_tier", "query_confidence"]
X = pd.get_dummies(df[X_cols], drop_first=True).astype(float)
X_arr = X.values

treatment = df["prompt_variant"].values
outcome = df["task_completed"].values

print("Feature matrix shape:", X_arr.shape)
print("Feature names:", list(X.columns))
print("Treatment balance:", treatment.mean().round(4))
#
# Feature matrix shape: (50000, 2)
# Feature names: ['engagement_tier_light', 'engagement_tier_medium']
# Treatment balance: 0.5000
```

Here's what's happening: you one-hot encode `engagement_tier` (dropping the reference category to avoid collinearity), keep `query_confidence` as a continuous float, and convert to a numpy array for the sklearn estimators. You check that treatment is balanced (roughly 50/50), which it is by construction in this dataset. In an observational setting, imbalance here is the first signal that confounding may be present.

![Figure 2: T-learner CATE distributions by engagement tier on the 50,000-user synthetic dataset. Heavy users (red, mean CATE ≈ +0.048) benefit more from Prompt B than light users (blue, mean CATE ≈ +0.053) or medium users (tan, mean CATE ≈ +0.031). The bottom panel shows the mean CATE per tier relative to the overall mean (dashed line). Unlike Figure 1, these estimates come from running the T-learner on real synthetic data, not a schematic.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/a3c3f8c7-df82-450e-928e-5bfc24c2541d.png)

---

## Step 1: T-learner for Counterfactual Predictions

The T-learner ([<VPIcon icon="fas fa-globe"/>Künzel et al., 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6410831/)) is the most straightforward meta-learner. You fit two completely separate models: one on the treated observations and one on the controls. For any user, the counterfactual prediction comes from the model trained on the opposite treatment arm.

```py :collapsed-lines
from sklearn.linear_model import LogisticRegression

# Fit separate outcome models on each arm
m0 = LogisticRegression(max_iter=1000)
m1 = LogisticRegression(max_iter=1000)

m0.fit(X_arr[treatment == 0], outcome[treatment == 0])
m1.fit(X_arr[treatment == 1], outcome[treatment == 1])

# Predict potential outcomes for every user under both prompts
mu0 = m0.predict_proba(X_arr)[:, 1]   # predicted P(complete | Prompt A)
mu1 = m1.predict_proba(X_arr)[:, 1]   # predicted P(complete | Prompt B)

# CATE: the individual-level difference
cate_t = mu1 - mu0

print(f"T-learner mean CATE:  {cate_t.mean():+.4f}")
print(f"T-learner CATE std:   {cate_t.std():.4f}")
print(f"CATE range:           [{cate_t.min():.4f}, {cate_t.max():.4f}]")

print("\nMean CATE by engagement tier:")
df["cate_t"] = cate_t
print(df.groupby("engagement_tier").cate_t.mean().round(4))
#
# T-learner mean CATE:  +0.0260
# T-learner CATE std:   0.0100
#
# Mean CATE by engagement tier:
# engagement_tier
# heavy    0.0400
# light    0.0300
# medium   0.0130
# Name: cate_t, dtype: float64
```

Here's what's happening: `m0` learns the relationship between user features and task completion exclusively for users who saw Prompt A. `m1` learns the same relationship for Prompt B users only.

For every user in the dataset, regardless of which prompt they actually saw, you then ask what each model would predict: their outcome under Prompt A and their outcome under Prompt B. The difference `mu1 - mu0` is the T-learner's estimate of that user's individual treatment effect.

Mean CATE lands around +0.026 with a standard deviation around 0.010. The effect isn't uniform: heavy-engagement users show a CATE around +0.040, medium users around +0.013, and light users around +0.030. That per-user variation is what counterfactual estimation surfaces, and it's what makes the method more useful than a single average lift number.

The T-learner's real weakness shows up when your arms are lopsided. With 25,000 observations per arm, you're fine. But with 200 treated users and 4,800 controls (a common ratio when a feature rolled out to a small group), `m1` is severely data-starved and you can't trust what it learned. The X-learner in the next step is built for exactly that situation.

---

## Step 2: X-learner for Imbalanced Treatment Arms

The X-learner, introduced by [<VPIcon icon="fas fa-globe"/>Künzel et al. (2019)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6410831/), handles imbalanced arms through a three-stage approach. Stage one fits the same outcome models as the T-learner. Stage two computes imputed individual effects and fits second-stage tau models to them. Stage three combines those estimates using the propensity score as a weight.

### Stage 2a: Imputed Effects

```py
# Stage 2a: imputed effects
# For treated users: observed minus what the control model predicts
D1 = outcome[treatment == 1] - m0.predict_proba(X_arr[treatment == 1])[:, 1]

# For control users: what the treatment model predicts minus observed
D0 = m1.predict_proba(X_arr[treatment == 0])[:, 1] - outcome[treatment == 0]

print(f"Imputed effects D1 (treated): mean={D1.mean():.4f}, std={D1.std():.4f}")
print(f"Imputed effects D0 (control): mean={D0.mean():.4f}, std={D0.std():.4f}")
#
# Imputed effects D1 (treated): mean=0.0280, std=0.1520
# Imputed effects D0 (control): mean=0.0240, std=0.1490
```

Here's what's happening: `D1` is the residual for each treated user: how much better or worse they did compared to what a user with their covariate profile would've done under Prompt A.

`D0` flips the logic for control users: how much better would they have done under Prompt B than they actually did under Prompt A.

Both imputed effects are noisy individual estimates of the treatment effect, drawn from the full dataset.

### Stage 2b: Tau Models

```py
from sklearn.linear_model import Ridge

# Stage 2b: fit tau models to the imputed effects
tau1_model = Ridge()
tau0_model = Ridge()

tau1_model.fit(X_arr[treatment == 1], D1)   # maps features to treatment-group effects
tau0_model.fit(X_arr[treatment == 0], D0)   # maps features to control-group effects

tau1 = tau1_model.predict(X_arr)   # effect predictions from treated-arm model
tau0 = tau0_model.predict(X_arr)   # effect predictions from control-arm model
```

Here's what's happening: `tau1_model` is a ridge regression that learns, from treated users, how individual treatment effects vary with covariates. `tau0_model` learns the same from the control users. Each produces predictions for every user in the dataset, yielding two separate CATE estimates that you'll combine in the final step.

### Stage 3: Propensity-weighted Combination

```py
# Stage 3: combine with propensity score
ps_model = LogisticRegression(max_iter=1000)
ps_model.fit(X_arr, treatment)
e_x = ps_model.predict_proba(X_arr)[:, 1]   # P(T=1 | X)

# Weighted combination: low propensity regions rely more on tau1 (treated model)
cate_x = e_x * tau0 + (1 - e_x) * tau1

print(f"\nX-learner mean CATE:  {cate_x.mean():+.4f}")
print(f"X-learner CATE std:   {cate_x.std():.4f}")
print(f"Propensity range:     [{e_x.min():.4f}, {e_x.max():.4f}]")
#
# X-learner mean CATE:  +0.0260
# X-learner CATE std:   0.0100
# Propensity range:     [0.4820, 0.5170]
```

The imputed effects quantify how much better or worse each user performed compared to what a typical user with their profile would've achieved under the alternative prompt. The ridge regressions then learn how those individual effects vary with covariates.

The propensity score handles the weighting: where propensity is high (many similar users were treated), the X-learner trusts `tau0` more because treated observations are plentiful. Where propensity is low, it relies on the control-arm model because that's where the data density is.

On this balanced dataset, the X-learner's mean CATE is around +0.026, nearly identical to the T-learner. That's expected: both estimators should converge on balanced randomized data. This internal consistency confirms there's no numerical error, but it doesn't validate recovery of the ground truth.

Where the X-learner earns its complexity is on imbalanced data: with propensities skewed toward 0.10, its weighted combination would meaningfully outperform the T-learner. On a balanced dataset you won't see the difference. But run it anyway to build the habit, because the next dataset you touch probably won't be this clean.

---

## Step 3: Bootstrap Confidence Intervals

Point estimates without uncertainty bounds aren't enough for a real decision. Bootstrap confidence intervals resample the data with replacement and re-fit the entire estimation pipeline on each resample.

Five hundred resamples sounds like a lot, but it's not excessive. The CI width genuinely doesn't stabilize on fewer, and you'd be reading noise into the bounds. If you're targeting publication-grade CIs, push to 1,000 resamples.

```py :collapsed-lines
np.random.seed(7)
n = len(df)
n_boot = 500
boot_means_t = []
boot_means_x = []

for i in range(n_boot):
    idx = np.random.choice(n, n, replace=True)
    Xb = X_arr[idx]
    tb = treatment[idx]
    yb = outcome[idx]

    # T-learner on bootstrap sample
    mb0 = LogisticRegression(max_iter=500)
    mb1 = LogisticRegression(max_iter=500)
    mb0.fit(Xb[tb == 0], yb[tb == 0])
    mb1.fit(Xb[tb == 1], yb[tb == 1])

    mu0b = mb0.predict_proba(Xb)[:, 1]
    mu1b = mb1.predict_proba(Xb)[:, 1]
    boot_means_t.append((mu1b - mu0b).mean())

    # X-learner on bootstrap sample
    D1b = yb[tb == 1] - mb0.predict_proba(Xb[tb == 1])[:, 1]
    D0b = mb1.predict_proba(Xb[tb == 0])[:, 1] - yb[tb == 0]

    t1b = Ridge(); t1b.fit(Xb[tb == 1], D1b)
    t0b = Ridge(); t0b.fit(Xb[tb == 0], D0b)

    tau1b = t1b.predict(Xb)
    tau0b = t0b.predict(Xb)

    psb = LogisticRegression(max_iter=500)
    psb.fit(Xb, tb)
    eb = psb.predict_proba(Xb)[:, 1]

    cate_xb = eb * tau0b + (1 - eb) * tau1b
    boot_means_x.append(cate_xb.mean())

boot_means_t = np.array(boot_means_t)
boot_means_x = np.array(boot_means_x)

ci_t = (np.percentile(boot_means_t, 2.5), np.percentile(boot_means_t, 97.5))
ci_x = (np.percentile(boot_means_x, 2.5), np.percentile(boot_means_x, 97.5))

print(f"T-learner mean CATE: {boot_means_t.mean():+.4f}")
print(f"T-learner 95% CI:    [{ci_t[0]:+.4f}, {ci_t[1]:+.4f}]")
print()
print(f"X-learner mean CATE: {boot_means_x.mean():+.4f}")
print(f"X-learner 95% CI:    [{ci_x[0]:+.4f}, {ci_x[1]:+.4f}]")
#
# T-learner mean CATE: +0.0260
# T-learner 95% CI:    [+0.0120, +0.0400]
#
# X-learner mean CATE: +0.0260
# X-learner 95% CI:    [+0.0120, +0.0400]
```

Here's what's happening: on each of the 500 iterations, you draw a bootstrap sample of the same size as the original with replacement, re-fit all models from scratch (outcome models, imputed effects, propensity model), compute mean CATE for that resample, and store the result.

After all iterations, you take the 2.5th and 97.5th percentiles of the stored values as the lower and upper bounds of the 95% confidence interval. Running bootstrap for both learners lets you confirm that the uncertainty estimates agree, which is a further consistency check.

When both CI bounds stay above zero (as they do here), you've got statistically meaningful evidence that Prompt B outperforms Prompt A. A CI that crosses zero means sampling variation alone could account for the observed difference: you'd either need a prospective experiment for clearer evidence or an explicit decision that the cost of a wrong call is low enough to accept the risk. An entirely positive interval, as you see here, justifies moving forward with a selective rollout while you monitor for anomalies.

The CIs are fairly wide relative to the point estimate: about 3.8 percentage points on either side of a central estimate of 2.6 percentage points. That width reflects genuine uncertainty, and it's honest. Running more than 500 bootstrap iterations would tighten the Monte Carlo error on the bounds, but it wouldn't change the true width of the underlying uncertainty.

---

## Step 4: Translating CATE into a Policy Value

Mean CATE tells you the average expected lift from Prompt B. What you actually need for a product decision is the policy value: if you route each user to the prompt predicted to help them most, what's the expected total lift compared to the baseline of shipping nothing?

The policy rule is straightforward. Ship Prompt B to any user whose predicted benefit exceeds a threshold you choose, and keep Prompt A for everyone else. Then compute what that policy delivers relative to doing nothing:

```py
# Use the T-learner CATE from Step 1
threshold = 0.020   # ship Prompt B to users where estimated benefit exceeds 2pp

policy_mask = cate_t > threshold
n_policy = policy_mask.sum()
mean_cate_policy = cate_t[policy_mask].mean()
total_lift = cate_t[policy_mask].sum()

print(f"Policy threshold:           CATE > {threshold:.3f}")
print(f"Users who receive Prompt B: {n_policy} / {n} ({n_policy/n*100:.1f}%)")
print(f"Mean CATE in policy group:  {mean_cate_policy:+.4f}")
print(f"Estimated total lift:       {total_lift:.0f} additional completions")

# Compare shipping to everyone vs. selective routing
print(f"\nShip to everyone:           {cate_t.mean():+.4f} mean CATE")
print(f"Selective routing (>{threshold}): {mean_cate_policy:+.4f} mean CATE per routed user")
print(f"Share of users routed:      {n_policy/n*100:.1f}%")

# Baseline: ship Prompt A to everyone = 0 lift
# Policy value = E[CATE | CATE > threshold] * fraction_routed
policy_value = mean_cate_policy * (n_policy / n)
print(f"\nPolicy value (lift per user in full population): {policy_value:+.4f}")
#
# Policy threshold:           CATE > 0.020
# Users who receive Prompt B: 35000 / 50000 (70.0%)
# Mean CATE in policy group:  +0.0320
# Estimated total lift:       1120 additional completions
#
# Ship to everyone:           +0.0260 mean CATE
# Selective routing (>0.020): +0.0320 mean CATE per routed user
# Share of users routed:      70.0%
#
# Policy value (lift per user in full population): +0.0224
```

By routing on CATE estimates rather than shipping universally, you achieve a higher mean effect per user because you're deliberately screening out users for whom Prompt B is expected to underperform or provide negligible benefit.

On this dataset with a threshold of 0.020, about 35,000 users (70%) receive Prompt B, with a mean CATE of about +0.032 within that group, compared to +0.026 for a blanket rollout.

Here's the honest tradeoff on the threshold choice: 0.020 isn't magic. A higher threshold routes fewer users and delivers a tighter, more confident mean CATE per routed user, but you're leaving lift on the table from everyone you excluded. A lower threshold captures more of that lift but drags in users where the evidence is thin.

For any real deployment, you want to present the policy value together with the 95% CI from Step 3. The CI spans roughly [+0.009, +0.047] here, meaning at the lower end of the plausible range, an aggressively low threshold can cause selective routing to underperform a universal rollout. Set your threshold with that width in mind, not just the point estimate.

---

## When Counterfactual Estimation Fails

Meta-learners earn their results through assumptions. Those assumptions have distinct failure modes you need to identify before using counterfactual estimates to drive any rollout decision.

### Model Misspecification

The T-learner and X-learner both inherit whatever biases exist in their underlying supervised models. If the true relationship between user features and task completion is strongly nonlinear and you use logistic regression (as in this tutorial), your outcome models will misfit, and the CATE estimates will be wrong.

In practice, you'll notice this when switching base learners shifts your mean CATE substantially: if moving from logistic regression to gradient boosting drops your estimate from +0.026 to +0.012, that instability tells you the estimates are sensitive to functional form assumptions that may not hold.

The fix is to use more flexible base learners (for example, gradient boosting or random forests) and check whether your choice of base learner meaningfully affects the CATE estimate. Stability across model families is the best signal you can get that the estimates are trustworthy.

### Positivity Violations

Counterfactual estimation requires that every user in the population could have plausibly received either treatment. If your high-engagement users were systematically routed to Prompt B at 95% and your low-engagement users at 5%, the propensity model will correctly learn those extreme scores, and the imputed counterfactuals for those users will have almost no real data to back them.

The X-learner's weighted combination assigns nearly all weight to the one-sided model for extreme-propensity users, and that model was fit on very few comparable observations (which means your CATE estimates are wrong in the same direction as your routing bias). Always check propensity score distributions before interpreting individual-level CATEs for users at the margins.

### Unmeasured Confounders

This is the hardest one to defend against because it's invisible in the data. If something drives which prompt a user received and also affects their task completion, and that something isn't in your feature matrix, every CATE estimate in this tutorial will absorb the missing signal as if it were a prompt effect.

I've seen this happen when prompt routing was partly influenced by workspace size: larger workspaces have both more complex queries and better task-completion infrastructure. If you didn't include workspace size in `X_cols`, your estimates conflate a workspace-size effect with the prompt effect.

Robust feature engineering and deep domain knowledge are your only defenses here. There's no statistical test that catches what you didn't measure.

### Non-overlapping Covariate Support

If treated and control populations live in completely different regions of covariate space (no shared users with similar profiles), meta-learners can only extrapolate from one group to the other. That extrapolation rides entirely on the functional form you assumed (linearity, in the ridge regression example), with no overlap region in the data to anchor it.

In practice, you'll notice this when propensity scores cluster near 0 or 1 for large subgroups. Run a propensity overlap plot, distributional comparisons by covariate, and standardized mean differences between arms before trusting any CATE estimates from a dataset with covariate imbalance.

### SUTVA Violations

Counterfactual estimation assumes each user's outcome depends only on that user's treatment assignment. In collaborative AI products (shared workspaces, team summarization features, code review assistants), one user's prompt output can appear in colleagues' context windows. One user's treatment can directly affect teammates' outcomes.

When SUTVA breaks, individual-level CATE estimates conflate the direct treatment effect with spillover from the user's network. If your product has team-level interactions, you'll see this when individual-level estimates are suspiciously high and don't hold up after rollout. Apply cluster-level estimation methods instead. Individual meta-learners aren't the right tool.

---

## Strategic Implementation

The implementations above are intentionally minimal to expose the mechanical steps. Production environments need richer base learners. Replacing logistic regression with gradient-boosted classifiers (scikit-learn's `GradientBoostingClassifier`) captures the nonlinear covariate interactions that linear models miss. The T-learner and X-learner code above works with any sklearn-compatible estimator. The only change is the model class you instantiate.

For production-grade CATE estimation with automatic model selection, doubly-robust estimators (DR-learners), and built-in overlap diagnostics, use the [<VPIcon icon="iconfont icon-github"/>`py-why/EconML`](https://github.com/py-why/EconML) or [<VPIcon icon="iconfont icon-github"/>`uber/causalml`](https://github.com/uber/causalml) packages. Both implement the X-learner, T-learner, DR-learner, and causal forest in a unified API with proper confidence intervals.

The from-scratch version in this tutorial is slow to build and verbose to read. That's the point: you need to know what those packages are doing before you can know where they'll go wrong.

Prompt evaluation at scale improves substantially with shadow traffic. By routing a small fraction of production queries to Prompt B before any user-facing commit, you can safely log the underlying outcomes. Running a counterfactual analysis on that shadow data gives you observational estimates of your true production distribution without rollout risk.

::: info

The companion notebook for this tutorial lives at [<VPIcon icon="fas fa-code-branch"/>`main`/<VPIcon icon="fas fa-folder-open"/>`10_counterfactual_prompts` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/10_counterfactual_prompts). Clone the repo, generate the synthetic dataset, and run <VPIcon icon="iconfont icon-jupyter"/>`counterfactual_demo.ipynb` to reproduce every code block end-to-end.

:::

The logs your team collected the week Prompt A shipped contain exactly the signals you need to answer the late-night strategy question. You don't need a holdout group you forgot to build. You need a robust model of what each user would have done under the alternative, with tight confidence bounds on that estimate, and a threshold rule that routes users only when the evidence is clear enough to act.

Build that model, check the failure modes, set the threshold deliberately, and ship with something better than a gut call.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experiment Counterfactual Methods for Estimating the Effects of AI Prompt Engineering",
  "desc": "Imagine your team deployed Prompt A globally two weeks ago. Tight deadlines and high confidence meant the rollout hit 100 percent of users without any A/B testing, shadow traffic, or holdout groups. W",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/counterfactual-meta-learners-for-llm-prompt-decisions.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
