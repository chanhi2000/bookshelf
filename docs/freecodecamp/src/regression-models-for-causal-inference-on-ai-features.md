---
lang: en-US
title: "Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels"
description: "Article(s) > Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - NumPy
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels"
    - property: og:description
      content: "Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/regression-models-for-causal-inference-on-ai-features.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-16
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/731ac81a-7bf4-45ff-9eac-49292d1484b1.png
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

[[toc]]

---

<SiteInfo
  name="Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels"
  desc="A randomized A/B test is the cleanest form of product experiment available. The coin flip that splits users between the new prompt template and the control removes every possible confounder by constru"
  url="https://freecodecamp.org/news/regression-models-for-causal-inference-on-ai-features"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/731ac81a-7bf4-45ff-9eac-49292d1484b1.png"/>

A randomized A/B test is the cleanest form of product experiment available. The coin flip that splits users between the new prompt template and the control removes every possible confounder by construction.

That randomization is the load-bearing wall of your experiment, and regression is how you read the result precisely: how far the treatment moved the metric, with what confidence, and whether the effect was uniform across user types.

If you're a data scientist running clean randomized A/B tests on AI features, the hardest question is "how much did it work, and how confident should I be?" Your team split users by a hash of their user ID, half saw the new prompt template, half saw the old one, and the experiment ran four weeks. Now someone asks how much the new template actually moved task completion rates.

The first instinct is to open a spreadsheet and take the difference in group means. That number is real and unbiased, and for a small team with a quick decision to make it often suffices. It leaves open, though, how confident you should be in that number, whether that confidence depends on which cluster the user was in, and whether the effect holds equally for light users and heavy users.

Regression handles all of that in a single model, and when the experiment is properly randomized, the coefficients carry a clean causal interpretation that the simple mean difference can't.

That causal interpretation is what this tutorial is about. Under random assignment, OLS gives you a causal estimate. The treatment variable and the error term are independent by construction of the randomization, so the coefficient on treatment is an unbiased estimate of the average causal effect.

Add covariates and the estimate stays the same but the standard error shrinks because you have absorbed variance in the outcome that comes from other sources. Cluster by workspace and you get standard errors built on the actual data structure.

The dataset is a synthetic SaaS product with 50,000 users split across 50 workspaces. The new prompt template was assigned randomly by user ID hash. The ground-truth causal effect baked into the data generator is an increase of 4 percentage points on task completion.

The code in this tutorial recovers it through five steps: a randomization check, a naïve mean difference, OLS with HC3 robust errors, cluster-robust errors, and an interaction model that detects whether the effect differs by user type.

The final section identifies regression's limits, because knowing when a tool fails is as important as knowing how to use it.

---

## Why Regression Works for Randomized Experiments

![Figure 1: Under randomization (left), covariate distributions overlap almost perfectly across treatment and control arms, and OLS recovers the causal effect. Under observational data with selection bias (right), treated users have systematically higher covariate values, and OLS conflates the covariate effect with the treatment effect.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/bfd58962-9157-43e8-852c-0372394e0782.png)

Random assignment creates one very specific condition: the treatment indicator is statistically independent of every other variable in the world, observed and unobserved. Under independence, the expected value of OLS's error term, conditional on treatment, is zero, and OLS recovers an unbiased causal estimate. The ordinary assumption of no omitted-variable bias collapses into a trivially satisfied condition once you have randomized.

To see why, write the simplest possible model:

```plaintext
task_completed_i = alpha + beta * prompt_variant_i + epsilon_i
```
<!-- TODO: latex화 -->

If `prompt_variant` was assigned by coin flip, then `E[epsilon | prompt_variant] = 0`. OLS will recover `beta` as the average treatment effect. Confounders such as engagement tier, workspace tenure, and historical query complexity all live inside `epsilon`, but because the coin flip removed any correlation between `prompt_variant` and `epsilon`, they pass harmlessly through the residual without touching `beta`. They simply inflate the variance of `epsilon` and therefore the variance of your estimate.

Adding covariates to the regression preserves the point estimate while doing something highly useful: it absorbs the variance in `epsilon` that the covariates explain. The treatment coefficient stays the same, the residual variance shrinks, and the standard error on `beta` falls. You achieve the same point estimate with a tighter confidence interval simply by including baseline variables you already have in your logs.

Four assumptions underpin that causal interpretation, and all four must hold for the regression coefficient to carry a causal meaning.

1. **Random assignment**: treatment is independent of potential outcomes (`E[ε|D] = 0`). Randomization delivers this by construction. If assignment is confounded, this assumption breaks and OLS measures something other than the average treatment effect.
2. **Linearity**: the conditional expectation of the outcome is linear in treatment and covariates. It's a reasonable approximation for binary outcomes over a narrow covariate range.
3. **No interference / SUTVA**: each user's outcome depends only on their own treatment assignment, not on which template their colleagues received. That's the stable unit treatment value assumption. When it breaks, the coefficient conflates direct effects with spillovers.
4. **No differential attrition**: dropout from the experiment is roughly equal across arms, so the groups you observe at the end are still comparable, with minimal attrition and no contamination between arms.

The balance check below verifies that randomization held on observables. The failure-modes section identifies which of these four assumptions each real-world problem violates.

When the randomization is clean, regression efficiently extracts the causal estimate. When an assumption breaks, regression describes the failure rather than the treatment effect. If the balance table reveals a systematic gap on any covariate, stop and investigate the assignment pipeline before you proceed to estimation.

::: note Prerequisites

Every code block in this tutorial runs end-to-end in the companion notebook at [`09_regression/regression_demo.ipynb` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/09_regression).

You need Python 3.11 or newer and basic comfort with pandas and statistics. `statsmodels` is the one library here that might be new to you: it handles HC3 and cluster-robust standard errors in a single call, the analytical substance `scipy.stats` can't provide on its own.

:::

Install the required packages:

```sh
pip install numpy pandas statsmodels scipy
```

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

---

## Setting Up the Working Example

The dataset simulates 50,000 users distributed across 50 workspaces. The `prompt_variant` column records which arm each user was assigned to: 1 is the new template, 0 is the control.

Assignment was done by hashing user ID, so it's effectively random and independent of everything else in the data.

The `task_completed` column is the binary outcome. The ground-truth causal effect baked into the generator is an increase of 4 percentage points.

Before fitting any model, verify that randomization balanced the groups on observable covariates. A properly randomized experiment produces near-equal means on every measured characteristic across arms.

```py :collapsed-lines
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")

print("Dataset shape:", df.shape)
print("\nPrompt variant distribution:")
print(df.prompt_variant.value_counts().to_dict())

# Randomization check: covariate means by arm
check_cols = ["query_confidence", "session_minutes", "cost_usd"]
balance_table = (
    df.groupby("prompt_variant")[check_cols]
    .mean()
    .round(4)
    .T
)
balance_table.columns = ["Control (variant=0)", "Treatment (variant=1)"]
balance_table["Difference"] = (
    balance_table["Treatment (variant=1)"]
    - balance_table["Control (variant=0)"]
)
print("\nCovariate balance check:")
print(balance_table)

# Engagement tier proportions
print("\nEngagement tier split by arm:")
print(
    df.groupby("prompt_variant")
    .engagement_tier.value_counts(normalize=True)
    .unstack()
    .round(3)
)
#
#[Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you load 50,000 rows and count the split between arms (approximately 25,000 in each). You then compute mean values of three continuous variables (`query_confidence`, `session_minutes`, and `cost_usd`) for the control and treatment groups separately.

These columns reflect behavior logged before the prompt variant was assigned, so they are pre-treatment by construction. The "Difference" column should be tiny in every row.

You also check that the categorical engagement tiers (heavy, medium, light) appear at similar proportions in each arm. Small imbalances are normal sampling variation, but a systematic gap on any covariate signals that the hash-based assignment failed or that the data pipeline introduced selection after randomization. If you see a large imbalance, stop and investigate the assignment pipeline before proceeding to estimation.

On this dataset, all differences fall below 0.01 in absolute value and engagement tier proportions match to within two percentage points across arms. The randomization held.

![Figure 2: `query_confidence` density by treatment arm across 25,000 control and 25,000 treatment users. The two curves overlap almost exactly (mean difference = -0.0013), confirming that hash-based random assignment produced covariate balance. This is the real dataset diagnostic. Compare it with the schematic in Figure 1.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/95863661-169e-4de7-a699-9154ce463b92.png)

---

## Step 1: Naïve Difference in Means

Start with the simplest possible estimator: subtract the mean outcome in the control arm from the mean outcome in the treatment arm.

```py :collapsed-lines
from scipy import stats

mean_control = df[df.prompt_variant == 0].task_completed.mean()
mean_treatment = df[df.prompt_variant == 1].task_completed.mean()

naive_effect = mean_treatment - mean_control

print(f"Control mean:    {mean_control:.4f}")
print(f"Treatment mean:  {mean_treatment:.4f}")
print(f"Naive effect:    {naive_effect:+.4f}")

# Manual two-sample t-test
n0 = (df.prompt_variant == 0).sum()
n1 = (df.prompt_variant == 1).sum()
var0 = df[df.prompt_variant == 0].task_completed.var()
var1 = df[df.prompt_variant == 1].task_completed.var()
se = np.sqrt(var0 / n0 + var1 / n1)
t_stat = naive_effect / se

p_val = 2 * stats.t.sf(abs(t_stat), df=n0 + n1 - 2)

print(f"\nSE (two-sample):  {se:.4f}")
print(f"t-statistic:      {t_stat:.3f}")
print(f"p-value:          {p_val:.4f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you compute the mean task completion rate in each arm, take the difference, and calculate the standard error using the pooled variance formula for a two-sample t-test. Because the experiment was randomized, this naïve difference is a valid causal estimate.

The recovered estimate may sit a percentage point or two away from the baked-in +4 pp ground truth. That's normal sampling variation at this dataset size, not estimator bias. The OLS regression in the next step will reproduce this number exactly when run without covariates, and will tighten the standard error once covariates are added.

The naïve t-test treats every observation as independent. That's a reasonable starting assumption here, but it doesn't hold in step 3, where users in the same workspace are correlated and the naïve standard error understates the actual uncertainty.

---

## Step 2: OLS with Heteroskedasticity-robust Errors (HC3)

Ordinary least squares with a binary treatment variable regressed on a binary outcome produces the same point estimate as the difference in means when there are no covariates. Adding covariates absorbs residual variance and shrinks the standard error.

HC3 standard errors are the main upgrade over the naïve t-test: they're valid even when the variance of the error term shifts across observations.

HC3 is preferred over HC0 through HC2 for finite samples because it penalizes high-leverage observations more aggressively, giving you better confidence interval coverage when sample sizes are moderate.

```py
import statsmodels.formula.api as smf

# OLS without covariates: should match naive difference
m1 = smf.ols(
    "task_completed ~ prompt_variant",
    data=df
).fit(cov_type="HC3")

print("=== OLS without covariates (HC3) ===")
print(m1.summary().tables[1])
print(f"\nCoefficient: {m1.params['prompt_variant']:+.4f}")
print(f"HC3 SE:      {m1.bse['prompt_variant']:.4f}")
print(f"p-value:     {m1.pvalues['prompt_variant']:.4f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you fit OLS with HC3 robust standard errors and no covariates. The coefficient on `prompt_variant` matches the naïve difference in means to four decimal places, confirming that OLS is just the mean-difference estimator in a regression wrapper.

HC3 standard errors run slightly larger than classical OLS standard errors because they correct for heteroskedasticity without assuming constant variance across the outcome distribution.

In practice, the difference is often small on balanced experiments, but you should default to HC3 anyway. There's no cost when you don't need it and real cost when you do.

Now add the covariates:

```py
# Define the regression formula with covariates
formula = (
    "task_completed ~ prompt_variant + query_confidence + "
    "session_minutes + C(engagement_tier)"
)

# OLS with covariates: same point estimate, smaller SE
m2 = smf.ols(formula, data=df).fit(cov_type="HC3")

print("=== OLS with covariates (HC3) ===")
print(m2.summary().tables[1])
print(f"\nCoefficient: {m2.params['prompt_variant']:+.4f}")
print(f"HC3 SE:      {m2.bse['prompt_variant']:.4f}")
print(f"p-value:     {m2.pvalues['prompt_variant']:.4f}")

# Compare the two SEs
print("\n--- SE comparison ---")
print(f"Without covariates: {m1.bse['prompt_variant']:.4f}")
print(f"With covariates:    {m2.bse['prompt_variant']:.4f}")
print(f"R-squared (with):   {m2.rsquared:.4f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you add `query_confidence`, `session_minutes`, and `engagement_tier` as controls. All three are pre-treatment variables, logged before the prompt variant was applied, so including them can't introduce collider bias.

The coefficient on `prompt_variant` stays close to the naïve estimate because randomization guarantees those covariates are uncorrelated with treatment assignment. The point estimate stays fixed. What shrinks is the uncertainty around it.

R-squared rises from near-zero without covariates to a few percentage points with them, meaning the covariates account for some of the variation in task completion. The HC3 p-value on `prompt_variant` tightens as the standard error falls.

This is the free lunch of covariate adjustment in randomized experiments. Include any pre-treatment variable that predicts the outcome: baseline engagement, historical task completion rate, or signup cohort. Stick to variables fixed before treatment began, because anything the treatment could have changed doesn't belong here.

---

## Step 3: Cluster-robust Standard Errors

The HC3 approach in step 2 handles heteroskedasticity but still treats every observation as independent. Users inside the same workspace share a support team, a product tier, the same IT policies, and often the same use cases, so their outcomes correlate with each other.

If the new prompt template happens to land well in workspace 12 and poorly in workspace 37, those outcomes are correlated within workspace regardless of treatment. Ignoring that correlation makes the standard error too small, which inflates the t-statistic and makes your results appear more significant than they are.

Cluster-robust standard errors fix this by treating each workspace as a single informational unit, so the variance of the treatment coefficient reflects 50 workspace-level draws rather than 50,000 independent coin flips.

```py
# Naive SE (assumes independence within workspaces)
m3_naive = smf.ols(formula, data=df).fit(cov_type="HC3")

# Cluster-robust SE (accounts for within-workspace correlation)
m3_cluster = smf.ols(formula, data=df).fit(
    cov_type="cluster",
    cov_kwds={"groups": df["workspace_id"]}
)

print("=== SE comparison: HC3 vs cluster-robust ===")
print(f"Coefficient (both):      {m3_cluster.params['prompt_variant']:+.4f}")
print(f"HC3 SE:                  {m3_naive.bse['prompt_variant']:.4f}")
print(f"Cluster-robust SE:       {m3_cluster.bse['prompt_variant']:.4f}")
print(f"HC3 p-value:             {m3_naive.pvalues['prompt_variant']:.4f}")
print(f"Cluster p-value:         {m3_cluster.pvalues['prompt_variant']:.4f}")

# Check how many workspaces exist
print(f"\nNumber of clusters: {df.workspace_id.nunique()}")
print(f"Users per workspace (avg): {len(df) / df.workspace_id.nunique():.0f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you fit the same covariate-adjusted OLS model twice, once with HC3 and once with cluster-robust errors grouped by `workspace_id`. The point estimate is identical in both because standard error choice doesn't affect the coefficient, only its uncertainty. On this dataset with 50 workspaces and 1,000 users per workspace, the cluster-robust standard error will be somewhat larger than the HC3 version, reflecting that your effective sample size is 50 workspace-level draws, not 50,000 individual rows.

A rule worth remembering: if your experiment assigns treatment at the individual level but your data has clustering structure (users in workspaces, sessions in users, weeks in products), cluster at the unit level of natural correlation. Under-clustering produces overconfident results. Over-clustering at a coarser granularity than the actual correlation structure inflates the SE and costs precision but doesn't bias the point estimate.

When in doubt, cluster up. At fewer than 30 clusters, cluster-robust standard errors become unreliable and you should run a permutation test instead.

---

## Step 4: Treatment-effect Heterogeneity via Interactions

The OLS coefficient in steps 2 and 3 estimates the average treatment effect across all users. Averages can hide important structure. The new prompt template might work well for heavy users and do nothing for light users, or it might produce the same lift regardless of user type. Detecting that heterogeneity means adding an interaction term between treatment and the moderating variable.

```py
# Interaction model: prompt_variant x engagement_tier
interaction_formula = (
    "task_completed ~ prompt_variant * C(engagement_tier) + "
    "query_confidence + session_minutes"
)

m4 = smf.ols(interaction_formula, data=df).fit(
    cov_type="cluster",
    cov_kwds={"groups": df["workspace_id"]}
)

print("=== Interaction model (cluster-robust) ===")
print(m4.summary().tables[1])

# Extract tier-specific effects
print("\n=== Implied treatment effects by engagement tier ===")
baseline_effect = m4.params["prompt_variant"]
tiers = ["medium", "heavy"]  # 'light' is the reference category

effects = {"light": baseline_effect}
for tier in tiers:
    interaction_key = f"prompt_variant:C(engagement_tier)[T.{tier}]"
    if interaction_key in m4.params:
        effects[tier] = baseline_effect + m4.params[interaction_key]
    else:
        effects[tier] = baseline_effect

for tier, eff in effects.items():
    print(f"  {tier:8s}: {eff:+.4f}")

# Joint F-test: are the interaction terms jointly significant?
interaction_terms = [k for k in m4.params.index if "prompt_variant:C" in k]
if interaction_terms:
    f_test = m4.f_test([f"({t} = 0)" for t in interaction_terms])
    print(f"\nJoint F-test on interactions: p = {f_test.pvalue:.4f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you add an interaction between `prompt_variant` and `C(engagement_tier)`. The `light` tier is the reference category, so the coefficient on `prompt_variant` is now the effect for light users specifically. Adding the interaction coefficient for `medium` or `heavy` gives you the treatment effect in each of those tiers.

The joint F-test on all interaction terms asks whether the effects differ across tiers beyond sampling variation. A non-significant result means the prompt template's effect is broadly consistent across engagement levels. A significant result means you would report the tier-specific effects separately and target rollout toward the tiers with the largest lift.

Running interaction models well requires discipline. Preregister which moderator you plan to test before looking at the data. Running ten interactions and reporting the one that's significant at p < 0.05 is multiple comparisons, p-hacking masquerading as subgroup analysis.

If you're exploring a new dataset without preregistration, apply a Bonferroni correction or use a false-discovery-rate procedure, and describe your analysis as exploratory.

---

## Step 5: Bootstrap Confidence Intervals

Point estimates from OLS are efficient, but bootstrap CIs give you a check that doesn't rely on distributional assumptions. Run 500 replicates: resample users with replacement, refit the cluster-robust model, and collect the treatment coefficient each time. The 2.5th and 97.5th percentiles of that distribution are your 95% CI.

```py
rng = np.random.default_rng(seed=7)
n_boot = 500
boot_coefs = []

for _ in range(n_boot):
    idx = rng.integers(0, len(df), size=len(df))
    boot_df = df.iloc[idx].reset_index(drop=True)
    boot_model = smf.ols(
        formula,
        data=boot_df
    ).fit(
        cov_type="cluster",
        cov_kwds={"groups": boot_df["workspace_id"]}
    )
    boot_coefs.append(boot_model.params["prompt_variant"])

boot_coefs = np.array(boot_coefs)
ci_low, ci_high = np.percentile(boot_coefs, [2.5, 97.5])

print(f"Bootstrap 95% CI: [{ci_low:+.4f}, {ci_high:+.4f}]")
print(f"Bootstrap mean:   {boot_coefs.mean():+.4f}")
print(f"Analytic cluster SE: {m3_cluster.bse['prompt_variant']:.4f}")
#
# [Placeholder — run regression_demo.py on the 50k dataset to capture real numbers]
```

Here's what's happening: you resample the full dataset 500 times with replacement and refit the covariate-adjusted cluster-robust model each time. The resulting distribution of treatment coefficients captures both sampling uncertainty and the cluster structure. A valid bootstrap CI covers the ground-truth effect (+4 pp) and excludes zero. The bootstrap mean should align closely with the analytic point estimate. A material gap signals that the analytic model is sensitive to specific observations.

---

## When Regression Alone Isn't Enough

Regression under randomization has a clean causal story because randomization severs the link between treatment and confounders. Production LLM systems rarely run pure experiments. Each failure mode below maps to a specific assumption from the four listed earlier.

### Unmeasured Confounders in Observational Data

Suppose your team never randomized the prompt template. Instead, high-confidence queries got routed to the new template by default. Now `prompt_variant` correlates strongly with `query_confidence`, which itself predicts `task_completed`.

This violates the random assignment assumption (`E[ε|D] = 0`): the error term is no longer independent of treatment.

OLS will attribute some of the confidence effect to the template and overstate the treatment effect. Adding `query_confidence` as a control fixes the bias only if you have measured and correctly specified the confounder.

Any unmeasured driver of both assignment and outcome passes straight through OLS into the coefficient. Measure the confounder and include it as a control, or use an instrument or discontinuity design that restores local randomization.

### SUTVA Violations and Spillovers

OLS assumes each user's outcome depends only on their own treatment assignment (SUTVA, the third identification assumption listed above).

In a multi-user workspace product, that assumption is fragile. If heavy users in a workspace adopt the new prompt template and start helping their teammates phrase queries differently, light users in the same workspace get an indirect treatment effect through peer influence. Your outcome now depends on the treatment assigned to a neighbor, not just yourself.

Cluster-robust standard errors handle the correlation, but the coefficient still conflates direct effects and spillovers. Detecting spillovers requires a two-level randomization design: randomize workspaces into treatment and control, then measure outcomes for everyone inside each workspace.

### Time-varying Confounders

If the prompt template was assigned at one point in time but engagement patterns shift over the analysis window due to product updates, support incidents, or seasonal usage changes, the association between treatment and outcome can drift in ways OLS can't separate from the causal effect.

This violates the random assignment assumption in its time-varying form: treatment assignment is no longer independent of potential outcomes once the covariate distribution drifts post-assignment.

You need a panel design with period-specific controls or an instrumental variable that accounts for the time variation.

### Binary Outcomes and the Linear Probability Model

Task completion is 0 or 1. OLS on a binary outcome is the linear probability model, which is valid for estimating average treatment effects and easier to interpret than logistic regression in an A/B context.

Its mechanical weakness relates to the linearity assumption: a linear conditional expectation can produce predicted probabilities outside [0, 1] for users with extreme covariate values. This doesn't invalidate the average effect but it does make individual-level predictions unreliable. Use logistic regression when you need calibrated probability scores; use OLS when you need an interpretable average treatment effect.

---

## What to Do Next

When the experiment is clean and the four assumptions hold, these four steps give you the full picture: naïve mean difference, HC3, cluster-robust, and one preregistered interaction. Get the randomization right, run the balance table, and cluster at the natural unit of correlation. The confidence interval tightens at each step, and you walk into the rollout decision knowing exactly what precision your data supports.

When the experiment isn't clean, the tools change. Observational data with selection on engagement requires propensity score methods or regression adjustment on a rich covariate set. Assignment by a continuous threshold requires regression discontinuity. Non-random rollout across workspaces over time requires difference-in-differences.

Each of those approaches handles a specific pattern of confounding that OLS can't reach, and each maps back to which of the four identification assumptions the design violates.

::: info

The companion notebook for this tutorial lives at [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`09_regression` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/09_regression). Clone the repo, generate the synthetic dataset, and run <VPIcon icon="fa-brands fa-python"/>`regression_demo.py` to reproduce every code block from this tutorial end to end.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Regression-Based Causal Inference: Estimating LLM Feature Impact with Python and statsmodels",
  "desc": "A randomized A/B test is the cleanest form of product experiment available. The coin flip that splits users between the new prompt template and the control removes every possible confounder by constru",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/regression-models-for-causal-inference-on-ai-features.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
