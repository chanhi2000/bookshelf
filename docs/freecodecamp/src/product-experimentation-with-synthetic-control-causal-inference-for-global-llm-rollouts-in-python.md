---
lang: en-US
title: "Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python"
description: "Article(s) > Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python"
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
      content: "Article(s) > Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python"
    - property: og:description
      content: "Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/product-experimentation-with-synthetic-control-causal-inference-for-global-llm-rollouts-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-05-12
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/06d252e7-e613-46c7-b5ce-c5daa14cec21.png
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
  name="Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python"
  desc="Every product experimentation team doing causal inference on LLM-based features eventually hits the same wall: when the provider ships a new model version, there's no holdout. Your infrastructure team"
  url="https://freecodecamp.org/news/product-experimentation-with-synthetic-control-causal-inference-for-global-llm-rollouts-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/06d252e7-e613-46c7-b5ce-c5daa14cec21.png"/>

Every product experimentation team doing causal inference on LLM-based features eventually hits the same wall: when the provider ships a new model version, there's no holdout.

Your infrastructure team upgrades every workspace from Claude 4.5 to Claude 4.6 overnight. All 50 production workspaces get the new model at the same time. A week later, task completion climbs across the board. The head of product calls it a win.

But you know something's off. No holdout group ran 4.5 through the upgrade week. The naïve before/after picks up whatever else changed that week alongside the model: a new onboarding flow, a seasonal uptick, a high-profile customer onboarding.

This is the Global Rollout Problem. It appears whenever a team ships a model upgrade to the entire user base simultaneously. For product teams running generative AI features, it's one of the most common measurement traps in the stack. Staged rollouts buy you a control group, global rollouts eliminate it.

In 2026, global model upgrades are the norm: every API provider pushes new versions, and every team using Claude, GPT, or Gemini has experienced the sudden jump from one version to the next with no opt-out.

Synthetic control is the tool that data scientists use when the control group is missing. You build a weighted combination of untreated units (other workspaces or regions that weren't upgraded at the same time) whose pre-upgrade behavior matches that of the treated unit. Compare the treated unit to its synthetic twin after the upgrade, and the gap is the causal estimate, conditional on three identification assumptions that we'll name explicitly.

In this tutorial, you'll build a synthetic control from scratch in Python using `scipy.optimize`, apply it to a 50,000-user synthetic SaaS dataset, and validate with a placebo permutation test, leave-one-out donor sensitivity, and a cluster bootstrap 95% confidence interval.

::: info Companion code

every code block runs end-to-end in the companion notebook at [github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/04_synthetic_control (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/04_synthetic_control). The notebook (`synthetic_control_demo.ipynb`) has all outputs pre-executed, so you can read along on GitHub before running anything locally.

:::

---

## Why Global Rollouts Break Naïve Measurement

The math of an A/B test is elegant because of one assumption: treatment assignment is independent of everything else. Flip a coin: half your workspaces get Claude 4.6, and half stay on 4.5. The coin flip breaks every possible confound. The global rollout world has no coin.

Three mechanisms make the naive before/after misleading.

1. **Co-occurring product changes:** Shipping a model upgrade rarely happens in isolation. The same week, the onboarding team ships a redesigned tutorial, the pricing team runs a promotion, or customer success reaches out to enterprise accounts about the new capabilities. Your before/after picks up the sum.
2. **Seasonal and market drift:** Weekly usage patterns, monthly billing cycles, and quarterly procurement cycles all move outcome metrics. A 3 pp lift in week 20 looks like the model upgrade, but in fact, users returned from spring break.
3. **Peer-company dynamics:** A competitor releases a buggy update, and your users migrate over for a week. Your task completion rate spikes because the new users had easier queries, with zero contribution from the model itself.

All three produce the same symptom: a raw before/after that folds the upgrade's causal effect together with the causal effect of every other week-20 event.

In this tutorial's dataset, the naïve gap is +0.0515, nearly equal to the ground-truth +0.05. That coincidence is the scariest failure mode: the naive number sometimes lands correctly by accident, and without a counterfactual, you can't tell luck from truth.

---

## What Synthetic Control Actually Does

![Figure 1 (above): Schematic of the synthetic control construction. The gray curves are donor workspaces that remain on the old model. The dashed navy curve is the weighted combination of donors that best tracks the treated unit (red) during the pre-treatment window marked by the blue bracket below the x-axis.<br/>After the treatment date (week 20, dotted vertical line), the weights stay frozen, and the dashed curve projects forward as the counterfactual, while the treated unit moves upward. The gap between the two curves in the post-treatment window is the causal-effect estimate.<br/>The key design choice the figure illustrates is that weights are fit once, using only pre-treatment data, and never refit using post-treatment data.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/d06bde67-30dd-4bc4-b019-5189ac5424a7.png)

Synthetic control finds a weighted combination of untreated units whose outcome trajectory closely matches the treated unit's in the pre-treatment period. Once the weights are fixed, you project the synthetic unit's trajectory forward into the post-treatment period and read off the gap between the two lines.

In your AI product context: if wave-2 workspaces didn't get the model upgrade at the same time as wave-1 workspaces, each wave-2 workspace is a candidate donor. The optimizer finds the combination of wave-2 workspaces whose weighted pre-upgrade trajectory best matches wave 1's. After week 20 (when wave 1 was upgraded), the gap between wave 1 and its synthetic twin is the causal-effect estimate, provided that the following three identification assumptions hold.

These identification assumptions work together.

- First, **pre-period fit** (the convex-hull condition): the treated unit's pre-treatment trajectory must lie inside the convex hull of the donor trajectories, which is what the non-negativity and sum-to-1 constraints enforce.
- Second, **no interference for donors** (SUTVA for the donor pool): the treatment on the treated unit must not affect the donors. Shared API rate-limit pools or users migrating between workspaces both break this.
- Third, **stable donor composition**: the donors must not experience structural breaks unrelated to the treatment during the post-period. Violate any one, and the gap is biased even when the pre-period fit looks perfect. The failure modes section walks through each.

One geometric note: with T₀ pre-treatment periods and J donors, pre-period overfitting becomes serious when J approaches T₀. This tutorial runs with T₀ = 20 and J = 25, which sits in the danger zone. The LOO sensitivity step later is the right diagnostic for whether the fit reflects genuine comparability or overfitting.

::: note Prerequisites

You'll need Python 3.11 or newer, comfort with pandas and numpy, and familiarity with basic constrained optimization.

Install the packages for this tutorial:

```sh
pip install numpy pandas scipy matplotlib
```

:::

**Here's what's happening:** four packages cover the full pipeline. Pandas loads the user-level log, NumPy handles panel arithmetic, SciPy provides the SLSQP solver to enforce the convex-combination constraint on the donor weights, and matplotlib renders the trajectory plot and the placebo distribution.

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

**Here's what's happening:** the clone pulls the companion repo, and <VPIcon icon="fa-brands fa-python"/>`generate_data.py` produces the shared synthetic dataset used across the series. Seed 42 keeps the dataset reproducible, and 50,000 users give a clean signal for the estimator in this tutorial. The output CSV lands at <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`synthetic_llm_logs.csv`.

---

## Setting Up the Working Example

The synthetic dataset simulates a SaaS product with 50,000 users spread across 50 workspaces. Workspaces 0 through 24 are in wave 1, which received the model upgrade at week 20. Workspaces 25 through 49 are in wave 2, which stayed on the old model through week 29. The ground-truth causal effect baked into the data generator is a +5 percentage-point increase in task completion for wave-1 users in the post-treatment period. You know the truth, so you can check what the synthetic control recovers.

Load the data and aggregate to a workspace-by-week panel:

```py :collapsed-lines
import numpy as np
import pandas as pd

df = pd.read_csv("data/synthetic_llm_logs.csv")

PRE = 20         # weeks 0-19 are pre-treatment
WINDOW = 30      # analysis window weeks 0-29

df_window = df[df.signup_week < WINDOW].copy()

panel = (
    df_window.groupby(["workspace_id", "signup_week"])
    ["task_completed"].mean().reset_index()
)
panel.columns = ["workspace_id", "week", "task_completed"]

pivot = panel.pivot(
    index="week", columns="workspace_id", values="task_completed"
)
pivot = pivot.interpolate(method="linear", axis=0).ffill().bfill()

ws_wave = df.groupby("workspace_id").wave.first()
wave1_ws = sorted(ws_wave[ws_wave == 1].index.tolist())
wave2_ws = sorted(ws_wave[ws_wave == 2].index.tolist())

treated_series = pivot[wave1_ws].mean(axis=1).values
donor_matrix = pivot[wave2_ws].values

print(f"Treated series shape: {treated_series.shape}")
print(f"Donor matrix shape:   {donor_matrix.shape}")
print(f"Users per workspace-week: ~{len(df_window) / (50 * WINDOW):.1f}")
print(f"Pre-period treated mean  (weeks 0-19):  {treated_series[:PRE].mean():.4f}")
print(f"Post-period treated mean (weeks 20-29): {treated_series[PRE:].mean():.4f}")
#
# Treated series shape: (30,)
# Donor matrix shape:   (30, 25)
# Users per workspace-week: ~19.2
# Pre-period treated mean  (weeks 0-19):  0.5927
# Post-period treated mean (weeks 20-29): 0.6421
```

**Here's what's happening:** you restrict to the 30-week window, aggregate user rows to a workspace-by-week panel, and reshape so rows are weeks and columns are workspaces. Interpolation fills any missing cells (each cell averages about 19 users). The treated series is the mean across all 25 wave-1 workspaces, pooling roughly 480 users per week to smooth cell-level noise.

The donor matrix keeps each wave-2 workspace as a separate column: 25 time series, each covering weeks 0 through 29. The pre-period treated mean of 0.5927 and the post-period mean of 0.6421 yield a raw before/after gap of +5.15 pp, which coincidentally sits near the ground-truth +5 pp and is contaminated by everything else that moved in weeks 20 through 29.

![Figure 2: The diagnostic on the real 50,000-user dataset. Top panel: wave 1's trajectory in red and the fitted synthetic control in navy dashed, with pre-period RMSE of 3.74 pp and a post-treatment gap averaging +8.29 pp. Bottom panel: the placebo distribution built by re-fitting the synthetic control with each of the 25 donor workspaces standing in as the placebo treated unit. The observed gap lies outside the full placebo range, which drives the pseudo p-value in Step 3.<br/>Where Figure 1 schematically showed the method, this figure shows that it produces a pre-period fit tight enough to make the post-period gap interpretable and a placebo distribution that discriminates the observed effect from noise.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/9b5d9711-9632-41ec-9c38-5ad531ca676f.png)

---

## Step 1: Fit Donor Weights with SLSQP

The synthetic control weight vector `w` is the solution to a constrained optimization problem: minimize the pre-period mean squared error between the treated series and the weighted combination of donor series, subject to each weight being in [0, 1] and all weights summing to 1. The non-negativity and sum-to-1 constraints together define a convex combination, which is what prevents extrapolation beyond the support of the donor pool.

```py :collapsed-lines
from scipy.optimize import minimize

n_donors = len(wave2_ws)
Y_pre = treated_series[:PRE]
D_pre = donor_matrix[:PRE, :]

def objective(w):
    return np.mean((Y_pre - D_pre @ w) ** 2)

w0 = np.ones(n_donors) / n_donors
bounds = [(0, 1)] * n_donors
constraints = [{"type": "eq", "fun": lambda w: w.sum() - 1}]

result = minimize(
    objective, w0, method="SLSQP", bounds=bounds,
    constraints=constraints,
    options={"ftol": 1e-12, "maxiter": 5000},
)
w_opt = result.x

pre_mse = float(np.mean((Y_pre - D_pre @ w_opt) ** 2))
pre_rmse = float(np.sqrt(pre_mse))
nz = int((w_opt > 0.001).sum())

print(f"Optimization converged: {result.success}")
print(f"Non-zero donor weights (|w| > 0.001): {nz}")
print(f"Pre-period MSE:  {pre_mse:.6f}")
print(f"Pre-period RMSE: {pre_rmse:.4f}  "
      f"({pre_rmse * 100:.2f} percentage points)")

synth_full = donor_matrix @ w_opt
gap = float((treated_series[PRE:] - synth_full[PRE:]).mean())
print(f"\nObserved post-period gap: {gap:+.4f}  (ground truth = +0.0500)")

nz_pairs = sorted(
    [(ws, w_opt[i]) for i, ws in enumerate(wave2_ws) if w_opt[i] > 0.001],
    key=lambda x: -x[1]
)
print("\nTop 5 donor weights:")
for ws_id, weight in nz_pairs[:5]:
    print(f"  workspace {ws_id}: w = {weight:.4f}")
#
# Optimization converged: True
# Non-zero donor weights (|w| > 0.001): 12
# Pre-period MSE:  0.001400
# Pre-period RMSE: 0.0374  (3.74 percentage points)
# 
# Observed post-period gap: +0.0829  (ground truth = +0.0500)
# 
# Top 5 donor weights:
#   workspace 35: w = 0.2016
#   workspace 40: w = 0.1900
#   workspace 25: w = 0.1638
#   workspace 32: w = 0.0872
#   workspace 36: w = 0.0784
```

**Here's what's happening:** the `objective` function computes the mean squared error between the treated pre-period series and the dot product of the donor matrix with the weight vector.

SLSQP handles the non-negativity bounds and the sum-to-1 equality constraint simultaneously. The `w > 0.001` threshold classifies 12 donors as non-zero. SLSQP doesn't guarantee exact zeros at inactive constraints, so the threshold is a display convention. Pre-period RMSE of 3.74 pp measures how closely the weighted donors tracked the treated unit before the upgrade. The observed post-period gap of +0.0829 is the headline estimate, which overshoots the ground-truth +5 pp, as Step 5 quantifies with a confidence interval.

The weights are fixed at the end of the pre-period and never re-estimated using post-treatment data. Any divergence after week 20 reflects movement the optimizer had no opportunity to fit.

---

## Step 2: Plot Treated vs Synthetic Control Trajectories

The primary visual diagnostic for synthetic control is the trajectory overlay: plot both series together, mark the treatment date, and confirm that the synthetic control tracks the treated unit in the pre-period and that a gap opens in the post-period.

A tight pre-period fit is the visible signal that the identification condition holds. A ragged fit means the treated unit is outside the convex hull of the donors, and the whole exercise is suspect.

```py
import matplotlib.pyplot as plt

weeks = np.arange(WINDOW)

fig, ax = plt.subplots(figsize=(9, 4.5))
ax.plot(weeks, treated_series, marker="o", linewidth=1.8,
        color="#C44E52", label="Wave 1 (treated)")
ax.plot(weeks, synth_full, marker="s", linestyle="--",
        linewidth=1.8, color="#4C72B0", label="Synthetic control")
ax.axvline(PRE, color="#555555", linestyle=":", linewidth=1.4,
           label="Model upgrade (week 20)")
ax.set_xlabel("Signup week")
ax.set_ylabel("Mean task completion rate")
ax.set_title("Treated unit vs synthetic control")
ax.legend(frameon=False)
plt.tight_layout()
plt.show()

post_gap = treated_series[PRE:] - synth_full[PRE:]
print("Post-period weekly gaps (treated minus synthetic):")
for wk, g in zip(range(PRE, WINDOW), post_gap):
    print(f"  week {wk}: {g:+.4f}")
print(f"\nMean gap: {post_gap.mean():+.4f}")
#
# Post-period weekly gaps (treated minus synthetic):
#   week 20: +0.0398
#   week 21: +0.1663
#   week 22: +0.1019
#   week 23: +0.1535
#   week 24: +0.1071
#   week 25: +0.1047
#   week 26: +0.0424
#   week 27: +0.0326
#   week 28: +0.0327
#   week 29: +0.0479
# 
# Mean gap: +0.0829
```

**Here's what's happening:** the two lines track each other in the pre-period, confirming the fit assumption. After week 20, the treated series moves above the synthetic control, and the weekly gaps are all positive with a mean of +8.29 pp.

The spread across weeks (from +3.26 pp to +16.63 pp) is how much week-to-week noise the estimator absorbs. A single bad week could swing the mean by a percentage point, which is why the placebo and LOO steps that follow matter more than any single point estimate.

---

## Step 3: In-Space Placebo Permutation Test

You can't run a standard t-test on a single treated unit. The synthetic control has one treated observation (wave 1) and 25 donor observations, which is not a setup for which any conventional p-value applies.

The standard validation is the in-space placebo permutation test. Treat each donor in turn as if it were the "treated" unit, re-fit the synthetic control using the remaining 24 donors as its placebo pool, record the placebo post-period gap, and compare the observed gap to the distribution of placebos.

```py
placebo_gaps = []

for j in range(n_donors):
    placebo_treated = donor_matrix[:, j]
    placebo_pool = np.delete(donor_matrix, j, axis=1)
    n_p = placebo_pool.shape[1]

    def obj_p(w):
        return np.mean((placebo_treated[:PRE] - placebo_pool[:PRE] @ w) ** 2)

    res_p = minimize(
        obj_p, np.ones(n_p) / n_p, method="SLSQP",
        bounds=[(0, 1)] * n_p,
        constraints=[{"type": "eq", "fun": lambda w: w.sum() - 1}],
        options={"ftol": 1e-12, "maxiter": 5000},
    )
    synth_p = placebo_pool @ res_p.x
    placebo_gaps.append((placebo_treated[PRE:] - synth_p[PRE:]).mean())

placebo_gaps = np.array(placebo_gaps)
observed_gap = gap

rank = int((np.abs(placebo_gaps) >= abs(observed_gap)).sum())
pseudo_p = (rank + 1) / (len(placebo_gaps) + 1)

print(f"Observed gap:      {observed_gap:+.4f}")
print(f"Placebo mean gap:  {placebo_gaps.mean():+.4f}")
print(f"Placebo std gap:   {placebo_gaps.std():.4f}")
print(f"Placebo gap range: [{placebo_gaps.min():+.4f}, "
      f"{placebo_gaps.max():+.4f}]")
print(f"|placebo| >= |observed|: {rank} of {len(placebo_gaps)}")
print(f"Pseudo p-value: {pseudo_p:.4f}")
#
# Observed gap:      +0.0829
# Placebo mean gap:  -0.0008
# Placebo std gap:   0.0380
# Placebo gap range: [-0.0748, +0.0707]
# |placebo| >= |observed|: 0 of 25
# Pseudo p-value: 0.0385
```

**Here's what's happening:** the loop iterates over all 25 wave-2 workspaces. For each one, you remove it from the donor pool, treat it as a placebo-treated unit, and re-run the SLSQP optimization. After 25 placebo runs, you count how many placebo gaps meet or exceed the observed gap in absolute value and apply the conservative (count + 1) / (N + 1) correction.

None of the 25 placebos produced a gap as extreme as the observed +0.0829, yielding a pseudo-p-value of 0.0385. That rejects the null of no effect at the 5% level. The placebo distribution centers near zero (mean -0.0008, std 3.80 pp), which is the noise floor to compare the observed gap against.

The correct statistical statement is: the observed gap is more extreme than any placebo drawn from untreated donors at the 5% level. The permutation test's power depends on the donor pool size: with 25 donors, the smallest possible pseudo-p is 1/26 = 0.0385, so you can't get a smaller p-value with this donor count. A wider placebo distribution or a smaller observed gap would rank the observation inside the placebo bulk and push the pseudo p above any useful threshold.

---

## Step 4: Leave-One-Out Donor Sensitivity

A tight point estimate can still be fragile if it hangs on a single donor. The leave-one-out (LOO) sensitivity check drops each non-zero-weight donor in turn, refits the synthetic control on the remaining donors, and records the new gap.

Abadie (2021) recommends this as the first-line robustness check. If removing any single donor swings the gap by a large amount, you don't have a synthetic control – you have a single-donor comparison dressed up with extra weight.

```py
def fit_and_gap(treated, donors, pre=PRE):
    n = donors.shape[1]
    def obj(w):
        return np.mean((treated[:pre] - donors[:pre] @ w) ** 2)
    res = minimize(
        obj, np.ones(n) / n, method="SLSQP",
        bounds=[(0, 1)] * n,
        constraints=[{"type": "eq", "fun": lambda w: w.sum() - 1}],
        options={"ftol": 1e-12, "maxiter": 5000},
    )
    synth = donors @ res.x
    return float((treated[pre:] - synth[pre:]).mean())


nz_idx = np.where(w_opt > 0.001)[0]
loo_rows = []
for j in nz_idx:
    kept = np.delete(donor_matrix, j, axis=1)
    gap_new = fit_and_gap(treated_series, kept)
    loo_rows.append({
        "dropped_workspace": int(wave2_ws[j]),
        "dropped_weight": float(w_opt[j]),
        "new_gap": gap_new,
    })
loo_df = pd.DataFrame(loo_rows).sort_values("dropped_weight", ascending=False)
print(loo_df.round(4).to_string(index=False))
print(f"\nLOO gap range: [{loo_df.new_gap.min():+.4f}, "
      f"{loo_df.new_gap.max():+.4f}]")
print(f"Original gap:  {gap:+.4f}")
#
#  dropped_workspace  dropped_weight  new_gap
#                 35          0.2016   0.0945
#                 40          0.1900   0.0756
#                 25          0.1638   0.0932
#                 32          0.0872   0.0868
#                 36          0.0784   0.0739
#                 31          0.0718   0.0858
#                 29          0.0648   0.0782
#                 26          0.0439   0.0786
#                 27          0.0364   0.0867
#                 46          0.0350   0.0794
#                 39          0.0192   0.0848
#                 42          0.0078   0.0839
# 
# LOO gap range: [+0.0739, +0.0945]
# Original gap:  +0.0829
```

**Here's what's happening:** the loop drops one non-zero-weight donor at a time and refits. All 12 LOO estimates stay positive, with the range [+7.39 pp, +9.45 pp] straddling the original +8.29 pp by about a percentage point in either direction.

No single donor drives the result. Even dropping workspace 35 (the largest weight at 0.2016) only shifts the gap to +9.45 pp because the optimizer redistributes weight across remaining donors.

That redistribution is the point of convex-combination weighting: many near-equivalent donor mixtures produce similar counterfactuals.

---

## Step 5: Cluster Bootstrap 95% Confidence Intervals

Point estimates are only half the story. A stakeholder asking "how sure are you" wants an interval. The classical non-parametric bootstrap doesn't apply cleanly to synthetic control on a single treated unit, because resampling the one treated time series with replacement destroys the time-ordering that the estimator depends on.

A valid substitute is the user-level cluster bootstrap: resample users with replacement, rebuild the workspace-by-week panel from the resampled user log, re-fit the donor weights on the pre-period, and record the post-period gap.

Repeat 500 times. The 2.5th and 97.5th percentiles of the resulting distribution are the 95% CI.

```py
def build_panel(df_inner):
    dfw = df_inner[df_inner.signup_week < WINDOW].copy()
    panel = (dfw.groupby(["workspace_id", "signup_week"])
             ["task_completed"].mean().reset_index())
    panel.columns = ["workspace_id", "week", "task_completed"]
    piv = panel.pivot(index="week", columns="workspace_id",
                      values="task_completed")
    piv = piv.interpolate(method="linear", axis=0).ffill().bfill()
    ws_wave_b = df_inner.groupby("workspace_id").wave.first()
    w1 = sorted(ws_wave_b[ws_wave_b == 1].index.tolist())
    w2 = sorted(ws_wave_b[ws_wave_b == 2].index.tolist())
    return piv[w1].mean(axis=1).values, piv[w2].values


rng = np.random.default_rng(7)
n = len(df)
n_reps = 500
gaps_boot = np.empty(n_reps)
for i in range(n_reps):
    sample = df.iloc[rng.integers(0, n, size=n)]
    t_b, d_b = build_panel(sample)
    gaps_boot[i] = fit_and_gap(t_b, d_b)

lo = float(np.percentile(gaps_boot, 2.5))
hi = float(np.percentile(gaps_boot, 97.5))
print(f"Post-period gap 95% CI: [{lo:+.4f}, {hi:+.4f}]")
print(f"Observed point estimate: {gap:+.4f}")
print(f"Ground truth +0.0500 inside CI: "
      f"{'YES' if lo <= 0.05 <= hi else 'NO'}")
print(f"Zero inside CI: {'YES' if lo <= 0 <= hi else 'NO'}")
#
# Post-period gap 95% CI: [+0.0511, +0.1215]
# Observed point estimate: +0.0829
# Ground truth +0.0500 inside CI: NO
# Zero inside CI: NO
```

**Here's what's happening:** you resample the user log 500 times, rebuild the panel from each resample, re-fit the weights on the pre-period, and take the 2.5th and 97.5th percentiles of the 500 resulting gaps. The 95% CI is [+5.11 pp, +12.15 pp]. It excludes zero with room to spare, so the effect is statistically meaningful.

The lower bound sits just above the +5 pp ground truth: a finite-sample upward bias typical of synthetic control on small donor panels, where each donor workspace (about 19 users per week) carries more noise than the 25-workspace treated average.

Placebo, LOO, and bootstrap together confirm a real positive effect. The point-estimate bias is the tradeoff for using single-workspace donors.

For a stakeholder report, cite the interval alongside the point estimate and note the bias direction so the team reads the number with the right calibration.

---

## When Synthetic Control Fails

Synthetic control is a precise tool with narrow failure modes. The four most common map directly to the three identification assumptions.

### 1. Donor Pool Contamination (Violates No Interference)

If the upgrade shipped to wave 1 spills over to wave 2 (shared API rate-limit pools, shared prompt caches, users migrating between workspaces), the donors are contaminated, and the gap understates the true effect.

The defense is institutional: audit what changed for donor units around the treatment date, explicitly including model-level channels like shared routing, shared caching, and shared monitoring.

### 2. Fundamentally Different Units (Violates Pre-period Fit)

The convex-hull condition states that the treated unit must lie within the donors' support. If the treated unit is structurally different (for example, enterprise customers where every donor is an SMB), no weighting scheme yields a credible counterfactual, regardless of how tight the pre-period fit appears.

Check the weights: if the optimizer assigns 80 percent to a single donor, that donor is doing the entire job, and you should ask whether it's truly comparable.

### 3. Post-Treatment Shocks to Donors (Violate Stable Donor Composition)

The synthetic control projects donor behavior forward from pre-period weights. If a key donor experiences a major shock after treatment (a customer churn, an outage, a competitor release), its post-treatment trajectory is no longer a clean counterfactual. Inspect the time series of high-weight donors for unusual post-treatment patterns.

### 4. Overfitting Risk When J Approaches T₀ (Degrades Pre-period Fit in Practice)

The optimizer can fit the pre-period solely to noise when J ≥ T₀, creating the illusion of comparability. This tutorial runs at T₀/J = 20/25 = 0.8, in the danger zone. The LOO sensitivity check is the practical defense: if the gap holds up across donor drops, the fit reflects genuine comparability.

These failure modes stay invisible in your point estimate. They surface as a synthetic control that looks well-fit on paper and produces a gap that doesn't hold up when treatment rolls out to the next wave. Placebo test, LOO sensitivity, and bootstrap together are your defense.

---

## What to Do Next

Synthetic control is the right tool when your feature ships globally and there's a pool of untreated units resembling the treated unit.

If treated and donor units operate at different scales, **augmented synthetic control** adds a bias-correction term from a linear outcome model. If you have many treated units with staggered adoption, **generalized synthetic control** (the `gsynth` R package) extends the framework.

For production Python work, `pysyncon` implements the full Abadie-Diamond-Hainmueller estimator with predictor-weighting via a V-matrix outer loop and adds in-time placebo tests (assigning the treatment to a pre-period date and checking for a spurious gap) that this tutorial doesn't cover. The from-scratch implementation here shows that the mechanics `pysyncon` is what you ship to a reviewer.

The companion notebook for this tutorial lives at [github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/04_synthetic_control (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/04_synthetic_control). Clone the repo, generate the synthetic dataset, and run <VPIcon icon="iconfont icon-jupyter"/>`synthetic_control_demo.ipynb` (or <VPIcon icon="fa-brands fa-python"/>`synthetic_control_demo.py`) to reproduce every code block, every number, and every figure from this tutorial.

:::

When a model upgrade ships to every user at once, the naive before/after is usually the wrong number. Synthetic control builds "users like yours who didn't get the upgrade" from the data you already have, locks in the weights before the treatment week, and gives you a placebo distribution plus a bootstrap interval you can defend when a stakeholder asks how confident you are.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation with Synthetic Control: Causal Inference for Global LLM Rollouts in Python",
  "desc": "Every product experimentation team doing causal inference on LLM-based features eventually hits the same wall: when the provider ships a new model version, there's no holdout. Your infrastructure team",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/product-experimentation-with-synthetic-control-causal-inference-for-global-llm-rollouts-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
