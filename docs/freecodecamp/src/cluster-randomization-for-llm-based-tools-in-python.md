---
lang: en-US
title: "Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python"
description: "Article(s) > Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python"
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
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python"
    - property: og:description
      content: "Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/cluster-randomization-for-llm-based-tools-in-python.html
prev: /ai/llm/articles/README.md
date: 2026-05-23
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/35d6e16c-0c87-4160-9c02-2eb0db8505d7.png
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
  name="Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python"
  desc="Every product experimentation team running causal inference on LLM-based collaborative features eventually hits the same wall: your users aren't independent. Your team ships an AI meeting summarizer t"
  url="https://freecodecamp.org/news/cluster-randomization-for-llm-based-tools-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/35d6e16c-0c87-4160-9c02-2eb0db8505d7.png"/>

Every product experimentation team running causal inference on LLM-based collaborative features eventually hits the same wall: your users aren't independent. Your team ships an AI meeting summarizer to half the enterprise accounts on your platform. The rollout's clean, half on and half off, and you wait for the control group's task completion to stay flat while the treated group's creeps up. Two weeks in, the control group's numbers are moving too. Not as much, but visibly. The feature's confirmed off for those accounts, and you've checked the rollout config twice. Something's still contaminating your control.

You know what it is before you dig into the logs. The AI meeting summaries land in shared Slack channels, the AI-drafted docs show up in shared Google Drive folders, and the AI code review suggestions appear in pull requests that both treated and control engineers read. Behavior changes for the treated users, and a slice of that behavior bleeds back into your control group through the collaboration graph.

This is the collaborator contamination trap. It shows up in every generative AI product that touches shared artifacts: AI meeting notes that teammates read, AI-drafted documents that coworkers edit, AI code suggestions that reviewers evaluate, AI-generated email threads that the whole team replies to. User-level randomization assumes one user's treatment assignment leaves every other user's outcome alone. In a collaborative workspace, that assumption is wrong by design, and the product experiment folds the feature's real effect together with the spillover it creates inside the control group.

Running a collaborative AI feature behind a user-level A/B test is a product experiment that violates the Stable Unit Treatment Value Assumption (SUTVA). The fix is cluster randomization: flip the coin at the workspace level, so entire teams are in or out together, then model the cross-workspace spillover directly.

This tutorial walks through the full pipeline (cluster assignment, a biased, naive user-level OLS, cluster-weighted least squares for honest standard errors, a two-exposure decomposition that identifies direct and spillover effects separately, and cluster-bootstrap confidence intervals) on a 50,000-user synthetic SaaS dataset in which the ground-truth causal effects are known. You'll estimate them, quantify uncertainty, and see where the approach silently breaks.

::: info Companion code

every code block runs end-to-end in the companion notebook at [github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/05_cluster_randomization (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/05_cluster_randomization). The notebook (<VPIcon icon="iconfont icon-jupyter"/>`cluster_randomization_demo.ipynb`) has all outputs pre-executed, so you can read along on GitHub before running anything locally.

:::

---

## Why User-Level A/B Randomization Breaks Under Collaboration

The math of an A/B test is elegant because one user's treatment assignment has no bearing on another user's outcome. Flip a coin; half your users get the AI feature, and the coin flip breaks every possible confound by construction. Collaboration breaks that guarantee in three ways.

**Shared artifacts travel.** The AI summary lands in a channel every teammate reads, the AI-drafted doc goes into a folder every teammate edits, and the AI code review suggestion sits on a pull request every reviewer evaluates. Control users consume those artifacts, whether or not the feature is switched on for them, and the behavioral effects of reading AI-assisted content leak into their outcomes.

**Shared workflows create interference.** A treated user who relies on the AI summarizer writes shorter follow-up notes, assuming teammates have read the summary. A control user on the same team receives those shorter notes and spends less time reading them, which changes their session length. That means the treated user's assignment has shifted the control user's outcome, which is exactly what SUTVA forbids.

**Network adoption follows collaboration.** Power users on treated teams experiment with the feature first, then nudge teammates in other workspaces through cross-team channels. If your treated group produces AI-assisted content that your control group reads and copies, the control group is partially treated without ever flipping a switch.

All three mechanisms produce the same symptom: the raw user-level comparison understates the feature's direct effect because the control group is no longer a pure counterfactual. On the synthetic dataset in this tutorial, the ground-truth direct effect is +0.80 min of session time for treated users, and the ground-truth spillover effect is +0.20 min for control users who collaborate across workspaces. A naive user-level OLS recovers +0.6723, a 16 percent underestimate of the direct effect, and reports a standard error that is roughly 19 times too small because it treats 50,000 users as independent, even though the treatment was randomized only across 50 clusters. That's not a small error. It's the kind that ships a broken feature launch decision.

---

## What Cluster Randomization Actually Does

Cluster randomization flips the assignment coin at the workspace level so entire teams land in the same arm, confining most interference to where it belongs and making the residual cross-workspace leakage something you can model directly.

![Figure 1(image ab: Schematic of the SUTVA violation that cluster randomization targets. Every user in a treated workspace (top row, red) sees the AI feature. Every user in a control workspace (bottom row) should see nothing, but collaborators (orange) read AI artifacts that travel through shared Slack, documents, and code reviews. Those spillover-exposed users are partially treated. Cluster randomization doesn't make interference disappear; it confines it to within workspace boundaries, leaving the remaining cross-workspace leakage as an identifiable component that a two-exposure model can estimate directly.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/e47df38e-0f83-4b51-99e2-aee7da95a82e.png)

If a workspace is treated, every user inside it gets the feature. If it's a control workspace, nobody inside it does. Interference within a workspace is fine because all teammates share the same assignment, and the workspace-level mean captures the full treatment package. The design aims to control interference across workspaces.

The estimator works under a stack of assumptions, and each one has a name worth knowing because the failure modes at the end of this tutorial map directly to specific violations.

- **Cluster-level random assignment.** Treatment is assigned at the cluster level by a genuinely random mechanism. Which workspaces land in the treated arm is independent of workspace-level potential outcomes.
- **Partial interference.** Interference happens inside clusters but not across them ([<VPIcon icon="fas fa-globe"/>Hudgens et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC2600548/)). A treated user in workspace A can affect her teammate in workspace A, but can't affect a user in workspace B. This is the assumption cluster randomization is built around.
- **Cluster-level SUTVA.** A workspace's treatment is a single, well-defined package. There's one version of the feature, and within-cluster heterogeneity in exposure is absorbed into the cluster-level effect.
- **Exchangeability of clusters.** Before the coin flip, the treated and control workspaces are exchangeable. Randomization achieves this by construction.
- **Sufficient cluster count.** Cluster-robust inference relies on a central limit theorem across clusters. Practitioners often use K ≥ 30 as a working floor, though the appropriate threshold depends on cluster-size heterogeneity and the choice of test statistic. Fewer clusters demand a different inference tool, such as randomization inference or a cluster wild bootstrap.

Partial interference is the underlying assumption of load-bearing here. The whole point of cluster randomization is that cross-cluster spillover is smaller and slower than within-cluster spillover, so treating an entire team contains most of the interference where it's supposed to be ([<VPIcon icon="iconfont icon-arxiv"/>Ugander et al.](https://arxiv.org/abs/1305.6979)). When cross-cluster spillover is meaningful, a two-exposure model directly identifies and estimates that leakage.

::: note Prerequisites

You'll need Python 3.11 or newer, comfort with pandas and linear regression, and rough familiarity with ordinary least squares.

Install the packages for this tutorial:

```sh
pip install numpy pandas statsmodels scipy matplotlib
```

**Here's what's happening:** five packages cover the full pipeline. Pandas loads the data and builds the cluster assignment. NumPy handles array arithmetic and bootstrap draws. Statsmodels fits every regression: naive OLS, cluster-weighted least squares, and the two-exposure model with cluster-robust standard errors. Scipy supports the kernel density diagnostic plot, and matplotlib renders it.

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

**Here's what's happening:** the clone pulls the companion repo, and `generate_data.py` produces the shared 50,000-user dataset used across the series. Seed 42 keeps the data reproducible. The 50,000-user scale gives enough users per workspace (about 1,000 each) for the cluster-level inference to behave asymptotically. The output CSV lands at `data/synthetic_llm_logs.csv`.

:::

---

## Setting up the Working Example

The synthetic dataset simulates a SaaS product with 50,000 users spread across 50 workspaces. The collaborative AI feature ships at full coverage to 25 randomly selected workspaces and stays off for the other 25. A control user is spillover-exposed when they collaborate across workspaces. In this tutorial, `opt_in_agent_mode == 1` serves as a behavioral proxy for that cross-workspace activity: users who actively opt into AI tooling are the ones reading teammate-authored documents, Slack threads, and pull requests where treated-workspace AI output surfaces. In a production deployment, you'd replace this proxy with an observed collaboration graph such as shared-channel membership, doc co-authorship, or reviewer overlap. Because `opt_in_agent_mode` reflects a voluntary behavioral choice with no random component, the spillover coefficient in a real experiment would absorb selection differences between opting-in and non-opting-in control users. A production spillover flag should be grounded in the observed collaboration graph; behavioral proxies introduce selection bias that the two-exposure model can't correct.

This tutorial constructs `session_minutes_obs` from scratch by layering known ground-truth effects onto workspace-level baselines. The CSV's `session_minutes` column is intentionally set aside. That separation lets you verify that every estimator recovers the effects baked in.

The ground-truth effects baked into the scenario are a +0.80-minute direct effect on treated users and a +0.20-minute spillover effect on spillover-exposed control users. Knowing both values is what lets you verify that your estimator recovers them.

---

## Step 1: Build the Cluster Assignment and Spillover Exposure

The first code block loads the data, assigns workspaces to treatment at the cluster level, flags spillover-exposed users, and constructs an observed outcome where the ground truth is known. The outcome starts from a workspace-level baseline so within-workspace correlation is genuine. It then adds the direct effect for treated users, the spillover effect for exposed control users, and Gaussian noise.

```py :collapsed-lines
import numpy as np
import pandas as pd

DIRECT_EFFECT = 0.80
SPILLOVER_EFFECT = 0.20
DATA_SEED = 42
OUTCOME_NOISE_SD = 0.30

df = pd.read_csv("data/synthetic_llm_logs.csv")
rng = np.random.default_rng(DATA_SEED)

df["treated_workspace"] = (df["workspace_id"] < 25).astype(int)
df["treated_user"] = df["treated_workspace"]
df["spillover_exposed"] = (
    (df["treated_workspace"] == 0) & (df["opt_in_agent_mode"] == 1)
).astype(int)

ws_baseline = pd.DataFrame({
    "workspace_id": np.arange(50),
    "ws_baseline": rng.normal(5.0, 0.30, size=50),
})
df = df.merge(ws_baseline, on="workspace_id")
noise = rng.normal(0, OUTCOME_NOISE_SD, size=len(df))
df["session_minutes_obs"] = (
    df["ws_baseline"]
    + DIRECT_EFFECT * df["treated_user"]
    + SPILLOVER_EFFECT * df["spillover_exposed"]
    + noise
)
df["exposure"] = np.select(
    [df["treated_user"] == 1, df["spillover_exposed"] == 1],
    ["direct", "spillover"],
    default="pure_control",
)

print(f"Total users:             {len(df):,}")
print(f"Treated workspaces:      {df[df.treated_workspace == 1].workspace_id.nunique()}")
print(f"Control workspaces:      {df[df.treated_workspace == 0].workspace_id.nunique()}")
print(f"Treated users:           {df.treated_user.sum():,}")
print(f"Pure-control users:      {(df.exposure == 'pure_control').sum():,}")
print(f"Spillover-exposed users: {(df.exposure == 'spillover').sum():,}")
ws_sizes = df.groupby("workspace_id").size()
print(f"Workspace size: min={ws_sizes.min()} median={int(ws_sizes.median())} max={ws_sizes.max()}")
#
# Total users:             50,000
# Treated workspaces:      25
# Control workspaces:      25
# Treated users:           24,937
# Pure-control users:      18,319
# Spillover-exposed users: 6,744
# Workspace size: min=923 median=1002 max=1052
```

::: info Here's what's happening

Workspace IDs 0 through 24 become the treated cluster and 25 through 49 become the control cluster, giving you 24,937 treated users and 25,063 control users. Among the controls, 6,744 are flagged as spillover-exposed because they opted into agent mode and sit in a control workspace where they'd plausibly read treated-workspace output through cross-team channels. The remaining 18,319 are pure-control users, untouched by the feature. Workspace sizes range from 923 to 1,052 users, which is close enough to be balanced, so that cluster-weighted and unweighted estimators will behave similarly. The observed outcome `session_minutes_obs` captures the known ground truth: a treated user adds 0.80 min to their workspace baseline, a spillover-exposed user adds 0.20 min, and every user is subject to Gaussian noise with standard deviation 0.30 min.

:::

![Figure 2 (image above): The three exposure groups on the 50,000-user dataset. The top panel shows the observed-outcome distribution for each group, with dashed vertical lines at the group means (5.06 min pure control, 5.27 min spillover-exposed, 5.79 min treated). The spillover distribution sits between the pure-control and treated distributions, which is the contamination a naive user-level estimator would fold into the control baseline. The bottom panel translates the same groups into raw counts: 18,319 pure-control users, 6,744 spillover-exposed control users, and 24,937 treated users. Where Figure 1 schematically showed the SUTVA violation, this figure shows it at the data scale, and the three-group structure is exactly what Step 4's two-exposure model will identify.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/0bc04600-b054-405a-b3cf-d57cc8e24e4d.png)

---

## Step 2: Naive User-Level OLS (Biased and Overconfident)

The naive analysis ignores clustering entirely and regresses the observed outcome on each user's treatment assignment, reporting a standard error as if every user were an independent draw. Two things go wrong at once.

```py
import statsmodels.formula.api as smf

naive = smf.ols("session_minutes_obs ~ treated_user", data=df).fit()
print(f"Naive estimate:  {naive.params['treated_user']:+.4f} min")
print(f"Naive SE:        {naive.bse['treated_user']:.4f}  (under-reported)")
ci = naive.conf_int().loc["treated_user"].tolist()
print(f"Naive 95% CI:    [{ci[0]:+.4f}, {ci[1]:+.4f}]")
print(f"Ground truth:    +0.80")
print(f"Bias:            {naive.params['treated_user'] - 0.80:+.4f} min")
#
# Naive estimate:  +0.6723 min
# Naive SE:        0.0034  (under-reported)
# Naive 95% CI:    [+0.6656, +0.6790]
# Ground truth:    +0.80
# Bias:            -0.1277 min
```

::: info Here's what's happening

the point estimate lands at +0.6723, 16 percent below the ground-truth direct effect of +0.80. The bias has two components. First, spillover contamination: 6,744 control users who read treated-workspace output lie above the pure-control baseline, raising the control mean and compressing the naive treated-minus-control gap. Second, workspace baseline imbalance: with only 50 clusters, random assignment doesn't guarantee that treated and control workspace pools draw equal mean baselines. This dataset's specific seed produces a treated-pool baseline slightly below the control-pool baseline, adding additional downward pressure on the estimate. The lesson generalizes: at small K, balance checks on observable workspace characteristics before the experiment are the only defense against pre-existing between-arm differences that no standard-error correction can fix.

The standard error is the more alarming number. At 0.0034, it reflects variation across 50,000 users treated as independent observations, and the resulting 95% confidence interval [+0.6656, +0.6790] excludes the ground truth entirely, at roughly one-twentieth the width the design actually supports. An SE 19 times too small inflates the t-statistic by the same factor, making the naive regression's p-value appear orders of magnitude more significant than the design justifies. A stakeholder reading this report would walk away confident that the direct effect is somewhere near 0.67 min. Wrong number, wrong precision.

:::

---

## Step 3: Cluster-Weighted Least Squares (Honest Standard Error)

The fix for the standard error is to aggregate to 50 workspace means, then regress those means on the workspace-level treatment indicator weighted by workspace size. Inference is now based on K = 50 observations.

```py
import statsmodels.api as sm

ws = (
    df.groupby("workspace_id")
    .agg(ws_mean=("session_minutes_obs", "mean"),
         ws_size=("user_id", "count"),
         treated=("treated_workspace", "max"))
    .reset_index()
)
X_ws = sm.add_constant(ws["treated"])
wls = sm.WLS(ws["ws_mean"], X_ws, weights=ws["ws_size"]).fit()
wls_ci = wls.conf_int().loc["treated"].tolist()
print(f"WLS cluster-mean contrast: {wls.params['treated']:+.4f} min")
print(f"WLS SE:          {wls.bse['treated']:.4f}  (based on K=50 clusters)")
print(f"WLS 95% CI:      [{wls_ci[0]:+.4f}, {wls_ci[1]:+.4f}]")
#
# WLS cluster-mean contrast: +0.6723 min
# WLS SE:                    0.0652  (based on K=50 clusters)
# WLS 95% CI:                [+0.5412, +0.8035]
```

::: info Here's what's happening

the cluster-mean contrast is identical to the naive estimate at +0.6723, because weighted workspace means are a different aggregation of the same user-level data. What changed is the standard error. At 0.0652, it's roughly 19 times larger than the naive 0.0034 and reflects genuine variation across 50 cluster means (statsmodels WLS uses t(48) critical values in place of z=1.96, which is why the CI bounds differ slightly from a hand calculation with z). The 95% confidence interval expands to [+0.5412, +0.8035], which barely covers the ground truth. WLS has fixed the inference problem, so the standard error now reflects the actual design, but it hasn't fixed the identification problem. Control workspace means still includes spillover-exposed users, so this estimate is a contaminated contrast you can't interpret as a clean ATE. The next step separates the two.

:::

---

## Step 4: Two-Exposure Decomposition (Unbiased Direct and Spillover)

The two-exposure model treats each user's exposure as a three-category variable (direct, spillover, or pure control) and regresses the outcome on the two non-baseline categories ([<VPIcon icon="fas fa-globe"/>Aronow et al.](https://projecteuclid.org/journals/annals-of-applied-statistics/volume-11/issue-4/Estimating-average-causal-effects-under-general-interference-with-application-to/10.1214/16-AOAS1005.full)). Pure control is the omitted reference, so both coefficients are directly interpretable: one is the direct effect of the feature, the other is the spillover effect on control users who collaborate across workspaces.

```py :collapsed-lines
df["is_direct"] = (df["exposure"] == "direct").astype(int)
df["is_spillover"] = (df["exposure"] == "spillover").astype(int)
two_exp = smf.ols(
    "session_minutes_obs ~ is_direct + is_spillover",
    data=df,
).fit(cov_type="cluster", cov_kwds={"groups": df["workspace_id"]})
direct = two_exp.params["is_direct"]
spillover = two_exp.params["is_spillover"]
direct_ci = two_exp.conf_int().loc["is_direct"].tolist()
spillover_ci = two_exp.conf_int().loc["is_spillover"].tolist()
print(f"Direct effect:     {direct:+.4f} min  (ground truth = +0.80)")
print(f"  SE:              {two_exp.bse['is_direct']:.4f}")
print(f"  95% CI:          [{direct_ci[0]:+.4f}, {direct_ci[1]:+.4f}]")
print(f"Spillover effect:  {spillover:+.4f} min  (ground truth = +0.20)")
print(f"  SE:              {two_exp.bse['is_spillover']:.4f}")
print(f"  95% CI:          [{spillover_ci[0]:+.4f}, {spillover_ci[1]:+.4f}]")
spillover_share = (df["exposure"] == "spillover").mean()
projected = direct + spillover_share * spillover
print(f"Spillover share of all users: {spillover_share:.4f}")
print(f"Projected total under full rollout: {projected:+.4f} min")
#
# Direct effect:     +0.7284 min  (ground truth = +0.80)
#   SE:              0.0647
#   95% CI:          [+0.6016, +0.8552]
# Spillover effect:  +0.2083 min  (ground truth = +0.20)
#   SE:              0.0038
#   95% CI:          [+0.2008, +0.2158]
# Spillover share of all users: 0.1349
# Projected total under full rollout: +0.7565 min
```

**Here's what's happening:** fitting on the three-category exposure with cluster-robust standard errors keyed to `workspace_id` yields two clean coefficients. The direct effect is +0.7284, with a 95% CI of [+0.6016, +0.8552], which includes the ground-truth value of +0.80. The spillover effect is +0.2083, with a 95% CI of [+0.2008, +0.2158], which tightly covers the ground-truth +0.20. The spillover SE (0.0038) looks small for cluster-robust inference because the simulated spillover effect is uniform across all 25 control clusters; in real data with heterogeneous spillover intensity, you'll see the cluster-robust SE grow meaningfully larger. The projected total of +0.7565 min accounts for the spillover effect, based on the fraction of users expected to be spillover-exposed at a given deployment scale (0.1349 in this dataset). In a production deployment, you'd replace that fraction with whatever share your collaboration graph predicts will be spillover-exposed under your rollout plan. The projection is a design parameter in your rollout, so state the assumed share explicitly when you report the number.

---

## Step 5: Cluster-Bootstrap Confidence Intervals

The cluster bootstrap resamples entire workspaces to test whether Step 4's analytic confidence intervals hold without assuming the central limit theorem has fully kicked in at K = 50. Analytic standard errors for a cluster design work well when K is large, and workspaces are roughly equal in size; the bootstrap confirms this holds in practice for your actual data. Resampling individual users would undercount variance because users in the same workspace share the cluster assignment and the workspace-level baseline; the cluster bootstrap preserves that correlation structure.

```py :collapsed-lines
def naive_point(d):
    return smf.ols(
        "session_minutes_obs ~ treated_user", data=d
    ).fit().params["treated_user"]

def wls_point(d):
    w = (d.groupby("workspace_id").agg(
            ws_mean=("session_minutes_obs", "mean"),
            ws_size=("user_id", "count"),
            treated=("treated_workspace", "max")).reset_index())
    X = sm.add_constant(w["treated"])
    return sm.WLS(w["ws_mean"], X, weights=w["ws_size"]).fit().params["treated"]

def two_exp_point(d):
    fit = smf.ols(
        "session_minutes_obs ~ is_direct + is_spillover", data=d
    ).fit(cov_type="cluster", cov_kwds={"groups": d["workspace_id"]})
    return fit.params["is_direct"], fit.params["is_spillover"]

rng_boot = np.random.default_rng(7)
ws_ids = df["workspace_id"].unique()
k = len(ws_ids)
reps = {"naive": [], "cluster_wls": [], "direct": [], "spillover": []}
for _ in range(500):
    draw = rng_boot.choice(ws_ids, size=k, replace=True)
    sample = pd.concat(
        [df[df["workspace_id"] == wid] for wid in draw],
        ignore_index=True,
    )
    reps["naive"].append(naive_point(sample))
    reps["cluster_wls"].append(wls_point(sample))
    d_b, s_b = two_exp_point(sample)
    reps["direct"].append(d_b)
    reps["spillover"].append(s_b)

for key, truth in [("naive", 0.80), ("cluster_wls", 0.80),
                   ("direct", 0.80), ("spillover", 0.20)]:
    arr = np.array(reps[key])
    lo, hi = np.percentile(arr, [2.5, 97.5])
    covers = "covers" if lo <= truth <= hi else "misses"
    print(f"{key:<13} 95% CI: [{lo:+.4f}, {hi:+.4f}]   ({covers} {truth:+.2f})")
#
# naive         95% CI: [+0.5386, +0.7966]   (misses +0.80)
# cluster_wls   95% CI: [+0.5386, +0.7966]   (misses +0.80)
# direct        95% CI: [+0.5931, +0.8519]   (covers +0.80)
# spillover     95% CI: [+0.2008, +0.2164]   (covers +0.20)
```

::: info sHere's what's happening

drawing 50 workspaces with replacement and refitting each estimator 500 times gives you a bootstrap distribution for every point estimate. The naive OLS and cluster WLS estimators produce identical bootstrap intervals because they share the same point estimate under workspace-level resampling, and both intervals exclude the ground-truth +0.80 because both are biased by the two sources identified in Step 2 (spillover contamination and the workspace baseline imbalance). The direct-effect interval from the two-exposure model is [0.5931, 0.8519], which includes 0.80. The spillover interval is [+0.2008, +0.2164], which tightly covers +0.20. The cluster bootstrap confirms what the analytic cluster-robust standard errors in Step 4 already showed: inference holds up without relying on asymptotic approximations at K = 50. Running this takes about one minute on a laptop.

:::

---

## When Cluster Randomization Fails

Cluster randomization solves the SUTVA problem when its assumptions hold, and it produces biased estimates that look clean when they don't. Three failure modes map to a named identification assumption; a fourth addresses estimator efficiency when cluster sizes are unequal.

**Too few clusters (violates sufficient cluster count).** Cluster-robust standard errors rely on a central limit theorem across clusters, and practitioners often use K ≥ 30 as a working floor, though the appropriate threshold depends on heterogeneity in cluster sizes and the choice of test statistic ([<VPIcon icon="fas fa-globe"/>MacKinnon & Webb, 2017](https://doi.org/10.1002/jae.2600)). A collaborative AI feature rolled out to four customer accounts doesn't clear that bar. Cluster-robust standard errors with K = 4 are anticonservative, and the resulting confidence intervals are too narrow. When K is small, randomization inference or a cluster wild bootstrap gives you valid p-values.

**Cluster boundary does not contain the interference graph (violates partial interference).** Cluster randomization assumes interference is confined within workspaces. If your users collaborate heavily across workspaces through Slack Connect channels, external shared documents, or customer community forums, partial interference is a fiction, and spillover bleeds across every cluster boundary. The two-exposure model can absorb modest cross-cluster leakage because the spillover coefficient captures whatever spillover your exposure flag measures. When leakage is structural, you need the observed collaboration graph and a graph-cluster randomization design that builds clusters from the collaboration structure itself ([<VPIcon icon="iconfont icon-arxiv"/>Ugander et al.](https://arxiv.org/abs/1305.6979)).

**Heterogeneous cluster sizes that bias the aggregation (estimator efficiency).** Equal-weighted cluster means treat a 50-user workspace the same as a 5,000-user workspace, which is a poor efficiency trade when the variance of a workspace's mean depends on the number of users in it. The fix is weighted least squares by workspace size, or a mixed-effects model with workspace random intercepts. This is an efficiency concern with no bearing on identification, and that distinction matters: the point estimate stays consistent under either weighting choice.

**Post-hoc cluster construction (violates exchangeability).** Building cluster assignments after observing outcomes is the cleanest way to turn a valid design into p-hacking. You've got to define and commit your clusters before the randomization, ideally in a pre-registered analysis plan. Any post-hoc adjustment to cluster boundaries (dropping a workspace with extreme outcomes, merging small workspaces into a composite, redefining spillover exposure after inspecting the data) reintroduces selection bias that no standard-error correction can fix.

Two additional threats deserve attention in real deployments.

**Cluster-level SUTVA fails under partial feature adoption.** The cluster-level SUTVA assumption requires that a workspace's treatment is a single, well-defined package. That breaks down when a feature rolls out at different adoption rates within a single workspace, or when multiple feature versions coexist (advanced for power users, basic for casual users). In that case, the cluster-level "treatment" conflates multiple effects, and the estimand is no longer interpretable.

**Workspace-level confounders when randomization isn't mechanical.** In enterprise deployments, workspace selection into the treated arm is often not fully random. Beta programs attract tech-forward accounts; customer success teams influence which clients get early access. When exchangeability is violated before the coin flip, cluster-robust standard errors cannot correct for pre-existing systematic differences between the treated and control workspace pools. A balance check on observable workspace characteristics (size, industry, baseline engagement) and regression adjustment at the cluster level are the standard remedies.

These failure modes stay invisible in your regression coefficients. They surface later, in the gap between the offline estimate and the production rollout. Cluster counts, collaboration graph audits, and a written pre-registration are your only real defenses.

---

## What To Do Next

Cluster randomization is the right tool when collaboration within a workspace creates spillover effects that break user-level SUTVA, and when your clusters are natural and observable (workspaces, teams, accounts, physical stores). If the interference you care about spans geographic markets or occurs over time inside a two-sided marketplace where drivers and riders clear as a whole, switchback experiments that randomize time slots fit better. If your treatment is assigned at the individual level but you suspect unobserved cross-user confounders, an instrumental variable analysis with a design-based instrument provides a cleaner identification strategy. When interference is known and complex, graph-cluster randomization with Horvitz-Thompson weighted exposure estimators gives you unbiased effect estimates without forcing every cluster boundary to contain every interference path.

The companion notebook for this tutorial lives at [github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/05_cluster_randomization (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/05_cluster_randomization). Clone the repo, generate the synthetic dataset, and run <VPIcon icon="iconfont icon-jupyter"/>`cluster_randomization_demo.ipynb` (or <VPIcon icon="fa-brands fa-python"/>`cluster_randomization_demo.py`) to reproduce every code block, every number, and every figure from this tutorial.

When a collaborative AI feature ships to teams who share their work, the user-level A/B estimate is almost always wrong. Cluster randomization plus a two-exposure model gives you the direct effect and the spillover effect separately, and the cluster bootstrap gives you an interval you can defend when a stakeholder asks how much of the lift comes from the feature and how much comes from teammates talking to each other.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation for Collaborative AI Features: Cluster Randomization for LLM-Based Tools in Python",
  "desc": "Every product experimentation team running causal inference on LLM-based collaborative features eventually hits the same wall: your users aren't independent. Your team ships an AI meeting summarizer t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/cluster-randomization-for-llm-based-tools-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
