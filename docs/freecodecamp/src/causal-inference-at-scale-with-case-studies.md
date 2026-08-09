---
lang: en-US
title: "Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features"
description: "Article(s) > Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features"
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
      content: "Article(s) > Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features"
    - property: og:description
      content: "Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/causal-inference-at-scale-with-case-studies.html
prev: /programming/py-pandas/articles/README.md
date: 2026-08-12
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2d445aeb-4ed9-40c4-9c91-c6e701a1325a.png
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
  name="Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features"
  desc="Causal inference for LLM-based AI features is no longer theoretical. Airbnb, Netflix, Lyft, and Uber have published detailed engineering blog posts describing exactly how they measure the causal impac"
  url="https://freecodecamp.org/news/causal-inference-at-scale-with-case-studies"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/2d445aeb-4ed9-40c4-9c91-c6e701a1325a.png"/>

Causal inference for LLM-based AI features is no longer theoretical. Airbnb, Netflix, Lyft, and Uber have published detailed engineering blog posts describing exactly how they measure the causal impact of product changes on user behavior.

The techniques they name (difference-in-differences, regression discontinuity, and doubly robust estimation, among others) are standard tools.

What's interesting is how those teams operationalized them at scale: where the methods failed in production, what they built around each one to make the estimates trustworthy, and how they connected the numbers to actual product decisions.

If you're building LLM features and making product decisions based on thumbs-up rates and session length, these posts will change how you think about measurement.

Most teams still measure feature impact with 30-day A/B tests and thumbs-up rates. That approach works until you need to know whether the metric moved because of your feature or because of a dozen other things that happened the same week.

The four teams below ran into that problem before most teams were even building with LLMs, and the patterns they settled on are worth understanding before you make the same mistakes. I've watched teams spend weeks shipping a feature, then spend additional weeks arguing about whether the numbers are real. That's avoidable.

For these organizations, causal measurement isn't an afterthought but a foundational element of product experimentation, integrated directly into their deployment architectures. The synthesis presented in this article details a comprehensive toolkit for AI product experiments in which traditional A/B testing is incompatible with the deployment model.

Whether you're managing global model transitions, threshold-based routing, staged rollouts, or observational opt-in data, each scenario necessitates a specific methodological approach. Failing to utilize this toolkit leads to more than just ambiguity. It results in product decisions driven by confounded data, a situation far more damaging than having no measurements at all.

::: info

Every code block in this article runs end-to-end in the companion notebook at [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`13_case_studies/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/13_case_studies/). Notebook: <VPIcon icon="iconfont icon-jupyter"/>`case_studies_demo.ipynb`.

:::

::: note Prerequisites

You need:

- Python 3.11 or newer
- Comfort with pandas, scikit-learn, and basic regression
- No prior reading on causal inference methods required: each case study explains the technique inline

Install the packages for this article:

```sh
pip install numpy pandas scikit-learn scipy matplotlib
```

Clone the companion repo and generate the shared dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

All four case-study code blocks in this article load that file with <VPIcon icon="fas fa-file-csv"/>`pd.read_csv` (<VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`synthetic_llm_logs.csv`). The dataset has 50,000 rows and 16 columns covering user identity, session behavior, and model metadata, including `user_id`, `session_minutes`, `task_completed`, `model_used`, `latency_ms`, and `query_complexity`, among others.

:::

---

## Why Production AI Measurement is Harder Than it Looks

The standard story about measuring the impact of an AI feature goes like this: run an A/B test and report the lift. If your p-value is below 0.05, you ship. But this story breaks in three places.

First, randomization isn't always available. Enterprise SaaS products roll out AI features to workspaces in waves, bypassing the individual user coin flip that A/B testing assumes. Consumer products roll out features gradually by region, by cohort, or by platform. Safety-sensitive features ship to a subset of users whose risk profiles clear a threshold.

When randomization doesn't happen, A/B test logic fails. You can't just run the same analysis on non-randomized data and expect the estimate to mean anything. Confounders that correlate with both who receives the feature and how they behave will bias every coefficient you compute, often in the direction that flatters the feature.

Second, short-term metrics don't always predict long-term value. A prompt change that raises thumbs-up ratings by 8 points today might increase user dependence on the AI assistant in ways that cause churn three months out. A model routing change that improves task completion this week might degrade under a new query distribution emerging next quarter.

I initially presumed that short-term proxies would reliably mirror long-term trends, yet they fail to do so consistently. The limitation of short-term A/B testing lies in its focus on immediate metric shifts while remaining oblivious to downstream user behavioral changes, which are ultimately the most critical factors.

Finally, observational data is unavoidable. A/B testing covers a narrow slice of product decisions. The routing threshold change that shipped six months ago, the model vintage swap in Q3, or the users who opted into agent mode before the gate closed: none of these can be run as experiments after the fact.

For any question that requires looking backward, or any system with routing decisions that can't ethically be randomized, you're working from observational logs, with no experiment design to fall back on.

Observational causal inference isn't a fallback. It's a core competency, and teams that treat it as optional find out the hard way when a stakeholder asks why the numbers from last quarter's rollout don't hold up to scrutiny.

Each of the four teams below built systems that grapple with one or more of these three problems.

---

## Case Study 1: Airbnb's Future Value Framework

### Short-Term A/B Tests Miss the Behavioral Change That Matters

Airbnb's engineering team, as described by Jenny Chen in the Airbnb Tech Blog post ["How Airbnb Measures Future Value to Standardize Tradeoffs" (<VPIcon icon="fa-brands fa-medium"/>`airbnb-engineering`)](https://medium.com/airbnb-engineering/how-airbnb-measures-future-value-to-standardize-tradeoffs-3aa99a941ba5), ran into a fundamental problem with their experiment infrastructure. Standard A/B tests measure outcomes at the end of the experiment window, typically 14 to 30 days.

For marketplace features that affect user behavior over months and years, that window is too short. A feature that moves 30-day bookings upward might be accelerating behavior the user was going to exhibit anyway, pulling forward demand, or genuinely adding new long-term engagement. The 30-day metric can't tell these apart.

The LLM version of this is the assistant dependence problem. A prompt redesign that makes your AI assistant more concise and confident will typically immediately raise thumbs-up ratings and task completion rates. Users prefer confident, direct answers. But if the redesign also makes users less likely to verify answers independently, you may have improved the short-term experience at the cost of calibration and long-term trust.

By the time users start churning because the assistant gave them confident wrong answers twice, the prompt change is long-shipped, and its connection to the churn signal is invisible. I've seen this gap cost teams months of diagnostic work trying to untangle prompt changes from model updates from seasonal behavior.

### The Framework

You don't need to wait for long-term outcomes to arrive. You need to have estimated, from prior cohorts, which short-term signals reliably predict long-term retention and revenue. Airbnb's solution converts short-term signals into projected long-term value using a predictive model trained on that historical relationship.

In their context, the metric is a "future value" score that estimates a user's long-term booking contribution based on their current engagement pattern. Once you have that model, you can evaluate any experiment by its expected impact on future value, with the 30-day metric as one of several inputs. The experiment window stays short, and the evaluation horizon extends as far as your predictive model can reach.

The DiD step in the reference implementation requires one identifying assumption: parallel pre-treatment trends. Before the feature shipped, both cohorts must have been on equivalent behavioral trajectories. If wave 1 users were already trending toward higher retention independently of the feature, the DiD estimate mixes the feature effect with a pre-existing difference between the waves. The assumption is that most teams skip validating because it requires plotting pre-period trends, which takes 20 minutes and feels unnecessary until the results don't make sense.

For LLM teams, the equivalent requires two things. First, you need leading indicators of long-term user value: week-7 retention and return query rate. Second, you need historical data linking those leading indicators to long-term outcomes you actually care about (revenue and user lifetime). The linking model is trained once on historical cohorts and then applied to new experiments.

### Reference Implementation

The code below shows the structural pattern: compute a future-value proxy for each user from short-term signals, then use it as the outcome in a DiD or IPW analysis, replacing the immediate task-completion signal.

```py :collapsed-lines
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

# Synthetic LLM telemetry with retention signal
df = pd.read_csv("data/synthetic_llm_logs.csv")

# Step 1: Train the future-value proxy model on a historical cohort.
# In production this model is trained on users old enough that
# their long-term outcome (e.g., 90-day retained revenue) is known.
historical = df[df.signup_week < 10].copy()

feature_cols = ["task_completed", "thumbs_up", "session_minutes"]
X_hist = historical[feature_cols].fillna(0)
y_hist = historical["retained_7d"].values  # 7-day retention as long-term proxy

fv_model = LinearRegression().fit(X_hist, y_hist)
# R² computed on training data; use a holdout cohort in production
print("Future-value model R²:", round(fv_model.score(X_hist, y_hist), 3))

# Step 2: Score all users with the future-value proxy.
X_all = df[feature_cols].fillna(0)
df["future_value_score"] = fv_model.predict(X_all)

# Step 3: Compare future_value_score by wave (this is the real experiment outcome).
print("\nMean future-value score by wave:")
print(df.groupby("wave").future_value_score.mean().round(4))

# Step 4: The DiD effect on future value (rather than on task_completed).
# This is where you would plug future_value_score into your DiD regression.
analysis = df[df.signup_week < 30].copy()
analysis["post"] = (analysis.signup_week >= 20).astype(int)
analysis["treated"] = (analysis.wave == 1).astype(int)

cells = analysis.groupby(["treated", "post"]).future_value_score.mean()
did_fv = (
    (cells.loc[(1, 1)] - cells.loc[(1, 0)])
    - (cells.loc[(0, 1)] - cells.loc[(0, 0)])
)
print(f"\nDiD effect on future-value score: {did_fv:+.4f}")
#
# Future-value model R²: 0.024
#
# Mean future-value score by wave:
# wave
# 1    0.6325
# 2    0.6271
# Name: future_value_score, dtype: float64
#
# DiD effect on future-value score: +0.0059
```

Here's what's happening: you train a lightweight linear model on a historical cohort where long-term outcomes are already known, mapping observable short-term signals to 7-day retention as a proxy for future value.

You score all users with that model, then use the future value score as the outcome in a standard DiD. Seven-day retention is an imperfect proxy, but it forces the analysis to weight short-term engagement by its historical correlation with durable value, which is more than thumbs-up rate does.

The low R² value of 0.024 is intentional, as it highlights the inherent noise when linking immediate session data to 7-day retention. While production systems should ideally utilize signals with higher predictive power such as return-visit rates or query depth, even a less precise linking model can still provide value.

The primary objective is to establish the correct direction of the correction rather than achieve absolute precision.

### Instrumenting for Long-Term Value Cuts Experiments That Look Good in Week 2 and Fail in Month 4

The Airbnb framework is a direct response to the measurement horizon problem. When you evaluate AI features on 30-day or 14-day windows, you reward features that move users fast, regardless of where they're moving.

Instrumenting for leading indicators of long-term value doesn't require a longer experiment. It requires a richer measurement model. Teams that have built this capability run fewer experiments that look great in week 2 and disappoint in month 4. If a linking model isn't yet part of your infrastructure, developing one should be your immediate priority over expanding your evaluation dashboards.

---

## Case Study 2: Netflix's Quasi-Experiment Taxonomy

### Deployment Structure Determines the Method

The Netflix Technology Blog post [<VPIcon icon="fa-brands fa-netflix"/>"Key Challenges with Quasi Experiments at Netflix"](https://netflixtechblog.com/key-challenges-with-quasi-experiments-at-netflix-89b4f234b852) is one of the more practically useful pieces on causal inference for product teams. Its core contribution is a taxonomy: for each deployment scenario, there's a corresponding causal method, and the post names the identifying assumption and failure mode that go with it.

That framing matters because most teams don't pick methods based on deployment structure. They pick what they already know, which is often the wrong fit.

![Figure 1: Deployment structure determines which identification strategy is credible. Threshold routing systems call for RDD, while opt-in analyses call for propensity methods. The assignment mechanism drives the choice, with the team's preferred estimator coming second.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/1cdf81be-3631-45fc-8295-0306cc53983b.png)

Netflix's taxonomy covers four scenarios that map almost exactly to the situations LLM teams encounter:

**Staged rollouts** (their scenario: gradual market entry) map to difference-in-differences. When you ship an AI feature to workspace cohort A before cohort B, you've got a natural treated and control group across time. The identification strategy subtracts the shared time trend from the difference in outcomes.

The critical assumption is that the two cohorts have parallel pre-treatment trends. If one cohort was already trending up before treatment started, the method can't distinguish that from a real effect.

**Threshold-based routing** (their scenario: geographic score cutoffs) maps to regression discontinuity. When a continuous score determines which model or feature a user receives, users just below and just above the threshold are nearly identical in everything except the treatment.

The jump at the cutoff identifies the local average treatment effect (LATE): the causal effect for users near the threshold only, with the average treatment effect across all users outside its scope. The critical assumption is that users can't precisely manipulate the score.

**Full-population upgrades** (their scenario: platform-wide policy changes) map to the synthetic control design. When every user gets the new model at once, and there's no holdout group, you construct a weighted combination of historical or synthetic counterfactuals to estimate what would have happened without the upgrade.

The critical assumption is that the synthetic control fits the pre-treatment period well. Poor pre-period fit isn't a minor inconvenience. It invalidates the entire counterfactual.

**Matched comparisons** (their scenario: opt-in feature adoption) map to propensity score methods. When users self-select into AI features, you reweight or re-match the comparison group to approximate random assignment on observables.

The critical assumption is that all relevant confounders are observed. If users who opt in also tend to be power users in ways you haven't measured, your confounder adjustment is incomplete, and your estimate is biased in ways that are hard to detect after the fact.

The taxonomy makes method selection a structured lookup: describe your deployment structure, and find the method whose assumptions your setup most plausibly satisfies.

I've seen teams skip this step and spend two weeks running a DiD on data that was clearly a threshold routing problem. The estimates differed by 40%. Neither was wrong. They were answering different questions.

### Reference Implementation

The code below implements the taxonomy as a decision function: given a deployment scenario description, print the appropriate method and its key assumption.

```py :collapsed-lines
TAXONOMY = {
    "staged_rollout": {
        "method": "Difference-in-Differences (DiD)",
        "assumption": "Parallel pre-treatment trends between treated and control cohorts",
        "check": "Plot weekly means by cohort before treatment starts; "
                 "run pre-trend placebo regression",
        "failure_mode": "Non-parallel pre-trends, time-varying confounders, "
                        "staggered adoption without Callaway-Sant'Anna correction",
    },
    "threshold_routing": {
        "method": "Regression Discontinuity Design (RDD)",
        "assumption": "Users cannot precisely manipulate their score across the cutoff",
        "check": "McCrary density test; bandwidth sensitivity; "
                 "quadratic spec robustness",
        "failure_mode": "Score manipulation, other policies firing at same cutoff, "
                        "extrapolation bias away from the cutoff",
    },
    "full_population_upgrade": {
        "method": "Synthetic Control",
        "assumption": "Pre-treatment fit between actual and synthetic counterfactual is good",
        "check": "In-time placebo tests; in-space placebo tests; "
                 "plot pre-period fit",
        "failure_mode": "Poor pre-period fit, interference between donor units, "
                        "post-treatment structural breaks",
    },
    "opt_in_feature": {
        "method": "Propensity Score Methods (IPW / Matching)",
        "assumption": "All confounders that drive opt-in and affect outcome are observed",
        "check": "Standardized mean difference before and after weighting; "
                 "propensity overlap histogram",
        "failure_mode": "Unmeasured confounders, positivity violations, "
                        "propensity model misspecification",
    },
}

def select_method(scenario: str) -> None:
    if scenario not in TAXONOMY:
        valid = ", ".join(TAXONOMY.keys())
        print(f"Unknown scenario. Valid options: {valid}")
        return
    entry = TAXONOMY[scenario]
    print(f"Scenario:      {scenario}")
    print(f"Method:        {entry['method']}")
    print(f"Assumption:    {entry['assumption']}")
    print(f"Key checks:    {entry['check']}")
    print(f"Failure modes: {entry['failure_mode']}")

# Example: staged AI feature rollout across enterprise workspaces
select_method("staged_rollout")
print()

# Example: confidence-threshold routing between model tiers
select_method("threshold_routing")
#
# Scenario:      staged_rollout
# Method:        Difference-in-Differences (DiD)
# Assumption:    Parallel pre-treatment trends between treated and control cohorts
# Key checks:    Plot weekly means by cohort before treatment starts; run pre-trend placebo regression
# Failure modes: Non-parallel pre-trends, time-varying confounders, staggered adoption without Callaway-Sant'Anna correction
#
# Scenario:      threshold_routing
# Method:        Regression Discontinuity Design (RDD)
# Assumption:    Users cannot precisely manipulate their score across the cutoff
# Key checks:    McCrary density test; bandwidth sensitivity; quadratic spec robustness
# Failure modes: Score manipulation, other policies firing at same cutoff, extrapolation bias away from the cutoff
```

Each deployment scenario has a corresponding method, a main identifying assumption, the diagnostics that check whether the assumption holds, and the failure modes that invalidate the analysis.

The function is a decision aid that makes the method-selection step explicit, so the team agrees on the identification strategy before writing a single line of regression code. Without that agreement, you'll often discover mid-analysis that two people on the team were implicitly running different causal models on the same data.

### Pick the Wrong Method and Cleaner Data Won't Save You

Most teams pick the causal method they know best. That's the wrong heuristic, and the Netflix taxonomy exists precisely to short-circuit it.

An LLM team with DiD experience will reach for DiD even when they're running a threshold routing system where RDD would give a cleaner answer, and a defensible local treatment effect estimate rather than an averaged-out guess.

The taxonomy highlights a vital principle: the method of selection is determined by the assignment mechanism itself, rather than by the team's familiarity. If your assignment mechanism is a cutoff score, RDD is the first tool to try, regardless of what the team already knows how to run.

Getting this wrong doesn't just produce a noisier estimate. It produces a structurally invalid one that cleaner data won't fix.

---

## Case Study 3: Lyft's Doubly Robust Validation

### Why Single-Model Approaches Fail in Production

Shima Nassiri's post on the Lyft Engineering blog, [<VPIcon icon="fa-brands fa-lyft"/>"Trusting the Untestable: Validation and Diagnostics for Doubly Robust Models"](https://eng.lyft.com/trusting-the-untestable-validation-and-diagnostics-for-the-doubly-robust-models-00853df009df), starts from a practical observation: in most real production causal analyses, at least one of your nuisance models carries specification error.

When you run an observational causal analysis, you're almost always fitting two models: a propensity model (predicting treatment from covariates) and an outcome model (predicting the outcome from treatment and covariates).

Both models are approximations of unknown true functions. If either one is wrong in ways you haven't accounted for, your causal estimate is biased, and you won't know it from the standard output alone.

Doubly robust estimation, specifically the augmented inverse probability weighting estimator (AIPW), is the response to this. AIPW combines propensity weighting with regression adjustment: if either the propensity model or the outcome model is correctly specified, the AIPW estimate is consistent. One well-specified model is enough.

That said, AIPW offers no protection against unmeasured confounders, and it still requires unconfoundedness: all factors that affect both treatment assignment and the outcome must be observed and included in the model. If a key confounder isn't in your data, AIPW can't save you.

Nassiri's post goes further than the estimator itself. What makes it practically important is the diagnostic toolkit it describes for validating observational analyses before you act on them.

In a clean randomized experiment, you check balance and run power calculations. In an observational study, you have to work harder, because the design carries no randomization guarantee. I've seen teams skip this diagnostic step and then spend weeks explaining why their causal estimate was off by a factor of two.

### Lyft's Production Diagnostics Catch Model Failure Before it Reaches a Decision

The pipeline runs four checks:

#### 1. Weight distribution check

After fitting the propensity model, plot the distribution of IPW weights. Extreme weights, say, above 20 or 30, signal that some users have near-zero propensity, which violates the positivity assumption: every unit must have nonzero probability of both treatment and control assignment.

Those users lack a comparable counterfactual, and letting a single unusual observation dominate your causal conclusion undermines the analysis. Skipping this check is how a single power user with unusual behavior skews an ATE by 15 percentage points.

#### 2. Trim threshold

Set a maximum weight. Any observation whose weight exceeds the trim threshold is downweighted to the threshold value. Common choices are the 95th or 99th percentile of the weight distribution.

Trimming trades a small amount of bias for a large reduction in variance, making the estimate more stable under minor model misspecification. If you don't trim, you're letting the weirdest edge cases in your data drive the headline number.

#### 3. Covariate balance plots

Plot standardized mean differences before and after weighting for every covariate in the propensity model. The target is |SMD| < 0.1 after weighting.

Covariates still above that threshold after weighting indicate that the propensity model is missing that covariate's influence on treatment assignment. This is the check that catches the "but we adjusted for everything" blind spot.

#### 4. Placebo outcome test

Take an outcome that your treatment provably doesn't cause, for example, a pre-treatment metric from before the treatment existed, and run the full AIPW pipeline on it.

If the pipeline returns a significant effect on the placebo outcome, you have a problem: unmeasured confounders, a misspecified propensity model, or data leakage. A placebo failure is one of the clearest signals that your analysis isn't credible, and it's a signal you can get before you ship anything.

### Reference Implementation

The code below shows the weight distribution check and trimming step that Lyft's pipeline applies before trusting any causal estimate.

```py :collapsed-lines
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression

df = pd.read_csv("data/synthetic_llm_logs.csv")

# Estimate propensity for opt-in to agent mode
X = pd.get_dummies(
    df[["engagement_tier", "query_confidence"]], drop_first=True
).astype(float)
y = df["opt_in_agent_mode"]

ps_model = LogisticRegression(max_iter=1000).fit(X, y)
df["propensity"] = ps_model.predict_proba(X)[:, 1]

# ATE weights: 1/P(treat) for treated, 1/(1-P) for control
df["ipw"] = np.where(
    df.opt_in_agent_mode == 1,
    1 / df.propensity,
    1 / (1 - df.propensity),
)

# Diagnostic 1: weight distribution
print("IPW weight percentiles:")
for p in [50, 75, 90, 95, 99]:
    print(f"  {p}th pct: {np.percentile(df.ipw, p):.2f}")

fig, ax = plt.subplots(figsize=(8, 4))
ax.hist(df.ipw, bins=60, edgecolor="none", alpha=0.7)
ax.axvline(np.percentile(df.ipw, 99), color="red", linestyle="--",
           label="99th pct (trim threshold)")
ax.set_xlabel("IPW weight")
ax.set_ylabel("Count")
ax.set_title("Weight distribution: check for extreme values")
ax.legend()
plt.tight_layout()
plt.savefig("weight_distribution.png", dpi=140)
print("Saved weight_distribution.png")

# Diagnostic 2: trim extreme weights at 99th percentile
trim_threshold = np.percentile(df.ipw, 99)
df["ipw_trimmed"] = df.ipw.clip(upper=trim_threshold)

# Compare ATE before and after trimming
def weighted_ate(data):
    t = data[data.opt_in_agent_mode == 1]
    c = data[data.opt_in_agent_mode == 0]
    return (
        (t.task_completed * t.ipw_trimmed).sum() / t.ipw_trimmed.sum()
        - (c.task_completed * c.ipw_trimmed).sum() / c.ipw_trimmed.sum()
    )

# Untrimmed ATE using ipw column
df["ipw_trimmed_orig"] = df["ipw"].copy()   # backup before overwrite
ate_untrimmed = (
    (df[df.opt_in_agent_mode==1].task_completed * df[df.opt_in_agent_mode==1].ipw).sum()
    / df[df.opt_in_agent_mode==1].ipw.sum()
    - (df[df.opt_in_agent_mode==0].task_completed * df[df.opt_in_agent_mode==0].ipw).sum()
    / df[df.opt_in_agent_mode==0].ipw.sum()
)
ate_trimmed = weighted_ate(df)
print(f"\nATE (untrimmed): {ate_untrimmed:+.4f}")
print(f"ATE (trimmed):   {ate_trimmed:+.4f}")
print(f"Trim threshold:  {trim_threshold:.2f}")
#
# IPW weight percentiles:
#   50th pct: 1.52
#   75th pct: 1.57
#   90th pct: 2.88
#   95th pct: 8.14
#   99th pct: 8.58
# Saved weight_distribution.png
#
# ATE (untrimmed): +0.0851
# ATE (trimmed):   +0.0852
# Trim threshold:  8.58
```

![Figure 2: IPW weight distribution on the 50,000-user synthetic dataset. The bulk of the weights cluster between 1.0 and 3.0. 500 observations exceed the 99th-percentile trim threshold of 8.58. Trimming shifts the ATE by 0.0001, confirming extreme weights carry negligible influence on this estimate. Unlike Figure 1's conceptual map, this diagnostic runs directly on real data from the shared dataset.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/6eb953cd-d831-470c-b719-ae2c8bec5038.png)

Here's what's happening: you fit a propensity model, compute ATE weights, then plot the weight histogram to see whether any users have extreme weights that dominate the estimate.

The 99th percentile line is the visual trim threshold. You apply the trim and compare the untrimmed vs. trimmed ATE. If they're close, the extreme weights had minimal influence on the result. If they're far apart, you have a small cluster of influential observations, and the trimmed estimate is more trustworthy.

### Two Hours of Diagnostics Prevent a Quarter of Misdirected Engineering Work

When you're measuring the causal effect of an AI feature from observational logs, you're almost always in the regime where both your propensity model and your outcome model carry error. The AIPW structure gives you protection against one of them being wrong. The Lyft diagnostic toolkit tells you how much each model is carrying before you act on the estimate.

Running the weight diagnostic and the placebo test may add about 2 hours to a causal analysis. That two hours can prevent the kind of confident-but-wrong conclusion that sends an engineering team chasing the wrong feature for a quarter, and I've watched that happen. The cost of skipping diagnostics isn't abstract: it's six engineers working on something that wasn't the cause of the outcome you were measuring.

---

## Case Study 4: Uber's Causal Forecasting Pipeline

### Merging Causal Estimates with Forecasts

The standard output of a causal analysis is a point estimate and a confidence interval: the AI feature raised task completion by 6 percentage points, 95% CI [3.8, 8.2]. That number answers a backward-looking question: what happened?

Product decisions are forward-looking. If you're considering raising the model routing threshold from 0.85 to 0.90, you want to know what the cost and quality tradeoffs will look like next quarter, a projection forward grounded in what you learned from last month's experiment.

Totte Harinen and Bonnie Li's post [<VPIcon icon="fa-brands fa-uber"/>"Using Causal Inference to Improve the Uber User Experience"](https://uber.com/blog/causal-inference-at-uber/) on the Uber Engineering blog describes how Uber applies causal inference to production decisions, providing the foundation for embedding causal effect estimates into forward-looking scenario models.

The structural move is to treat the causal estimate as a parameter in the forecast. Forecasting cost and quality separately and assuming a stable relationship between them leaves the causal parameter unspecified. The structural move is to model the causal effect of the routing threshold on the cost-quality tradeoff directly, then project that parameter forward under different assumptions about query volume, query distribution, and model capability.

This matters specifically for LLM systems because the relationship between routing decisions and costs is nonlinear and distribution-dependent. A routing threshold that's cost-efficient at your current query volume may break down at 3x volume. A model you optimized routing for in Q1 may be replaced by a cheaper model in Q3, shifting the cost-quality Pareto frontier entirely. Embedding causal estimates into the forecast makes those structural changes visible before they arrive.

### Reference Implementation

The local comparison near the routing threshold rests on two identifying assumptions. First, engineers and users can't precisely manipulate `query_confidence` to cluster on one side of the 0.85 cutoff. Assignment must be as-good-as-random within a narrow band around the threshold.

Second, the potential outcome functions must be continuous across the cutoff, so the jump observed at 0.85 is attributable to routing assignment and not to any other policy firing at the same score level.

The code below illustrates the pattern: estimate the causal effect of a change in routing threshold on cost and quality, then project that effect across a range of future volume scenarios.

```py :collapsed-lines
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")

# Step 1: Estimate causal effect of premium routing on quality and cost
# (Using RDD logic: compare users near the routing threshold)
cutoff = 0.85
bw = 0.10
near = df[
    (df.query_confidence > cutoff - bw)
    & (df.query_confidence < cutoff + bw)
].copy()
# Low-confidence queries route to premium model (below-threshold queries need stronger handling)
near["routed_premium"] = (near.query_confidence < cutoff).astype(int)

# Causal effects from the local comparison near the threshold
quality_effect = (
    near[near.routed_premium == 1].task_completed.mean()
    - near[near.routed_premium == 0].task_completed.mean()
)
cost_effect = (
    near[near.routed_premium == 1].cost_usd.mean()
    - near[near.routed_premium == 0].cost_usd.mean()
)

print(f"Estimated quality effect of premium routing: {quality_effect:+.4f}")
print(f"Estimated cost effect of premium routing:    {cost_effect:+.4f}")

# Step 2: Embed into forward-looking scenarios
# Suppose we're evaluating: what if we raise threshold from 0.85 to 0.90?
# Queries with confidence 0.85 to 0.90 would shift from premium to cheap routing.
threshold_change_users = df[
    (df.query_confidence >= 0.85) & (df.query_confidence < 0.90)
]
n_shifted = len(threshold_change_users)
print(f"\nQueries that would shift at threshold 0.85 to 0.90: {n_shifted}")

# Volume scenarios (monthly queries)
monthly_query_volume = [500_000, 1_000_000, 2_000_000]
shifted_fraction = n_shifted / len(df)  # fraction of total traffic shifted

print("\nForward-looking scenario: raise threshold from 0.85 to 0.90")
print(f"{'Monthly volume':>20} {'Quality change':>16} {'Cost change ($/mo)':>20}")
for vol in monthly_query_volume:
    n_affected = vol * shifted_fraction
    delta_quality = quality_effect * n_affected / vol    # rate change in overall quality
    delta_cost = -cost_effect * n_affected               # negative: saving cost by de-premiuming
    print(f"{vol:>20,.0f} {delta_quality:>+16.4f} {delta_cost:>+20,.0f}")
#
# Estimated quality effect of premium routing: +0.0613
# Estimated cost effect of premium routing:    +0.0080
#
# Queries that would shift at threshold 0.85 to 0.90: 5415
#
# Forward-looking scenario: raise threshold from 0.85 to 0.90
#       Monthly volume   Quality change   Cost change ($/mo)
#              500,000          +0.0066                 -436
#            1,000,000          +0.0066                 -871
#            2,000,000          +0.0066               -1,742
```

Here's what's happening: you estimate the causal effect of premium routing on quality (task completion) and cost using a local comparison near the routing threshold. You then identify the fraction of queries that would shift routing assignment if you moved the threshold from 0.85 to 0.90. Finally, you project the quality and cost implications of that shift across different monthly query volume scenarios. The output is a scenario table that a product or finance team can read directly: raising the threshold saves roughly $X per month at current volume and costs approximately Y percentage points of task completion rate.

### Causal Forecasting in Capacity Planning

The causal forecasting pattern is most useful for routing and infrastructure decisions where cost and quality effects are both significant, and you need to make choices ahead of traffic scale you haven't reached yet. Running the causal estimate forward into volume scenarios turns a retrospective finding into an actionable projection.

Skip this step and causal estimates stay buried in analysis documents, disconnected from capacity planning and pricing decisions. I've watched useful analyses go unread for this exact reason. With it, the measurement team is producing inputs that actually matter to how the product is run.

---

## What These Four Teams Have in Common

These four teams built different methods but converged on the same operational discipline.

### Match the Method to the Deployment Structure

Start from the assignment mechanism (how was treatment assigned?) and work backward to the identification strategy. Airbnb moved past short-term A/B tests because their features affect long-term value beyond a 30-day window. Netflix uses RDD for threshold routing systems because the cutoff is the natural identification strategy.

Pick the technique because your system's design makes a particular identification strategy credible. Defaulting to the method the team knows best is how identification errors happen, and those errors don't announce themselves.

### Build Diagnostics Before Building Estimators

Run the assumption checks before reporting the estimate. Airbnb validates the leading-indicator model on historical cohorts. Lyft runs weight distributions and placebo tests before acting on an observational estimate.

An estimate reported without its diagnostic layer is an estimate you can't defend. That distinction matters when the product team challenges your number at the quarterly review.

### Design Every Causal Estimate Around a Specific Product Decision

Airbnb estimates long-term value to inform feature-shipping decisions. Netflix runs quasi-experiments to make rollout decisions.

Analyses that don't improve any specific product choice aren't worth running: they consume analyst time, create misleading signals in the reporting backlog, and erode stakeholder trust in the measurement function over time.

### Document Failure Modes Alongside Every Estimate

Each technique has a named list of ways it can break: non-parallel trends for DiD, manipulation at the cutoff for RDD, unmeasured confounders for propensity methods, and poor synthetic control fit for full-population upgrades.

Ship the estimate alongside its failure conditions labeled. The credibility of an analysis for a skeptical audience stems not from the confidence interval itself, but from a transparent disclosure of the specific assumptions that would need to be invalidated for the estimate to fail.

---

## How to Start Applying This in Your Own LLM Stack

Most LLM teams aren't starting from a mature causal pipeline. The steps below are ordered by impact.

### 1. Instrument Before You Need the Data

The biggest constraint in every observational causal analysis is that the data you needed wasn't collected. Before you can run a DiD on a staged rollout, you need pre-treatment data for both cohorts.

Before you can run an AIPW on an opt-in feature, you need a rich set of covariates that predict opt-in.

Instrument your system now for the analyses you'll want to run in six months: session length, query complexity, 7-day return rate, and model routing decisions. The instrument is cheap, but retroactive data collection is impossible.

### 2. Classify Your Deployment Mechanisms

Apply the Netflix taxonomy to every AI feature currently running in your product. For each feature, ask: how was treatment assigned? Which causal method does that assignment mechanism support?

What's the core assumption, and do you have the data to check it? The exercise usually reveals that most features are being measured with tools that don't match their assignment mechanism. That mismatch isn't academic. It means you don't know whether those features are working.

### 3. Run One Diagnostic-Rich Causal Analysis

Pick one feature, run balance checks and placebo tests, stress-test sensitivity to specification choices, and write up the results. The discipline of running every check once establishes the pattern for future analyses.

It also usually surfaces one uncomfortable finding about the feature you were most confident in. I've seen this happen on three separate teams: the "obviously working" feature turns out to have a confounded comparison group.

### 4. Separate Short-term and Long-term Metrics

Follow Airbnb's lead and identify at least one leading indicator of long-term value that you can measure in a 30-day experiment window. Seven-day retention, return query rate in week 3, or escalation rate trajectory are all candidates.

Report this alongside immediate engagement metrics in every experiment summary. Without it, you're optimizing a proxy and discovering the gap in the next quarter's retention numbers.

### 5. Make Causal Estimates Forward-Looking

When you produce a causal estimate, add one row: "Under 3x current volume, this effect implies X." That translation step forces the analysis to make contact with infrastructure and product planning, and it changes who reads it.

---

## When Production Causal Pipelines Break

Production causal pipelines break in a few predictable places.

### Organizational Failures

**First, no one owns the measurement design.** In most teams, the data scientist writes the analysis after the feature ships. Because that's the standard workflow, you're always running retrospective analyses on data that wasn't designed for causal identification.

The fix is a measurement design review before features ship: who's the control group, how long is the pre-period, what's the core assumption, and what diagnostic will falsify it? A 30-minute review prevents a common class of unrecoverable analyses.

**Second, causal results don't reach decision-makers.** A correct causal estimate that doesn't inform a product decision is a failed analysis, even if the statistics are right. You can't fix that with a better methodology. Causal pipelines need fast-path reporting alongside rigorous reporting.

### Technical Failures

**First, instrumentation gaps are discovered after the fact.** The most common technical failure is the need for a covariate that wasn't logged. You discover the gap when you try to check balance or run a propensity model, three weeks after the experiment ended.

The instrument-early principle above addresses this, but it requires buy-in from the infrastructure team to prioritize event logging that serves causal analysis as directly as it serves product dashboards. That buy-in is harder to get than the logging itself.

**Second, there's treatment leakage in the synthetic dataset.** For teams testing causal methods on synthetic or internal data, the data generation process can inadvertently bake in the causal effect you're trying to estimate, making any method appear to work.

Validate your analysis on external holdout data or on cohorts outside the generation window. This one is easy to miss because the synthetic data looks clean. Structural contamination within data rows can be subtle and difficult to detect.

### Interpretive Failures

**First, conflating LATE with ATE.** RDD estimates the local average treatment effect (LATE): the effect at the cutoff, for the specific users near the threshold. Propensity matching estimates ATT: the effect for users who were treated. The ATE for the full population requires a different approach.

When a PM asks "what's the effect of this feature," they usually mean ATE. When your causal analysis gives them LATE without explaining the difference, they'll apply the estimate to decisions it wasn't designed to support, and the resulting product choice will be wrong in ways you can't trace back to the analysis.

**Second, external validity assumptions that don't hold.** A causal estimate from last quarter's user population may not generalize to next quarter's, particularly when you're scaling into new segments or entering an international market.

The estimated effect on power users who opted in early, as the feature rolls out to light-engagement users. Document the population your estimate applies to. Flag explicitly when it's about to be applied outside that population.

**Third, reporting precision that overstates certainty.** A causal estimate with two-decimal precision reported from an observational study with residual confounding risk conveys more certainty than the analysis warrants.

Report confidence intervals alongside point estimates, the assumptions the estimates depend on, and the balance after weighting, all in the summary where decision-makers will actually see them. The analysis isn't done until the uncertainty is visible to the people acting on it.

---

## Bootstrap Confidence Intervals

Point estimates from observational analyses carry sampling uncertainty. The bootstrap below (500 replicates, seed=7) provides 95% confidence intervals for the three numerical estimates in this article: the Airbnb DiD effect on future-value score, the Lyft IPW ATE, and the Uber RDD quality effect.

```py
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression

rng = np.random.default_rng(7)
df = pd.read_csv("data/synthetic_llm_logs.csv")
n_boot = 500

# Bootstrap 1: DiD on future-value score (Airbnb)
historical = df[df.signup_week < 10].copy()
feature_cols = ["task_completed", "thumbs_up", "session_minutes"]
fv_model = LinearRegression().fit(historical[feature_cols].fillna(0), historical["retained_7d"].values)
df["future_value_score"] = fv_model.predict(df[feature_cols].fillna(0))
analysis = df[df.signup_week < 30].copy()
analysis["post"] = (analysis.signup_week >= 20).astype(int)
analysis["treated"] = (analysis.wave == 1).astype(int)

did_boots = []
for _ in range(n_boot):
    s = analysis.sample(frac=1, replace=True, random_state=rng.integers(1e9))
    c = s.groupby(["treated", "post"]).future_value_score.mean()
    try:
        did_boots.append((c.loc[(1, 1)] - c.loc[(1, 0)]) - (c.loc[(0, 1)] - c.loc[(0, 0)]))
    except KeyError:
        pass
ci_did = np.percentile(did_boots, [2.5, 97.5])
print(f"DiD future-value 95% CI: [{ci_did[0]:+.4f}, {ci_did[1]:+.4f}]")

# Bootstrap 2: IPW ATE trimmed (Lyft)
X = pd.get_dummies(df[["engagement_tier", "query_confidence"]], drop_first=True).astype(float)
ps_model = LogisticRegression(max_iter=1000).fit(X, df["opt_in_agent_mode"])
df["propensity"] = ps_model.predict_proba(X)[:, 1]
df["ipw"] = np.where(df.opt_in_agent_mode == 1, 1 / df.propensity, 1 / (1 - df.propensity))
trim_thr = np.percentile(df.ipw, 99)
df["ipw_trimmed"] = df.ipw.clip(upper=trim_thr)

ate_boots = []
for _ in range(n_boot):
    s = df.sample(frac=1, replace=True, random_state=rng.integers(1e9))
    t = s[s.opt_in_agent_mode == 1]
    c = s[s.opt_in_agent_mode == 0]
    ate_boots.append(
        (t.task_completed * t.ipw_trimmed).sum() / t.ipw_trimmed.sum()
        - (c.task_completed * c.ipw_trimmed).sum() / c.ipw_trimmed.sum()
    )
ci_ate = np.percentile(ate_boots, [2.5, 97.5])
print(f"IPW ATE trimmed 95% CI:  [{ci_ate[0]:+.4f}, {ci_ate[1]:+.4f}]")

# Bootstrap 3: RDD quality effect near routing cutoff (Uber)
cutoff = 0.85
bw = 0.10
near = df[(df.query_confidence > cutoff - bw) & (df.query_confidence < cutoff + bw)].copy()
near["routed_premium"] = (near.query_confidence < cutoff).astype(int)

qe_boots = []
for _ in range(n_boot):
    s = near.sample(frac=1, replace=True, random_state=rng.integers(1e9))
    qe_boots.append(
        s[s.routed_premium == 1].task_completed.mean()
        - s[s.routed_premium == 0].task_completed.mean()
    )
ci_qe = np.percentile(qe_boots, [2.5, 97.5])
print(f"RDD quality effect 95% CI: [{ci_qe[0]:+.4f}, {ci_qe[1]:+.4f}]")
#
# DiD future-value 95% CI: [+0.0023, +0.0093]
# IPW ATE trimmed 95% CI:  [+0.0727, +0.0966]
# RDD quality effect 95% CI: [+0.0490, +0.0748]
```

Here's what's happening: three separate bootstrap loops resample the analysis dataset 500 times each with a shared seed.

The DiD bootstrap resamples the full analysis cohort and recomputes the 2x2 cell means. The interval `[+0.0023, +0.0093]` confirms the future-value effect is statistically distinguishable from zero.

The IPW ATE bootstrap resamples all 50,000 users and reweights each draw. The interval `[+0.0727, +0.0966]` covers the ground-truth +0.08 opt-in effect and excludes zero.

The RDD bootstrap resamples only users within the bandwidth window near the 0.85 cutoff. The interval `[+0.0490, +0.0748]` confirms the local quality effect is nonzero.

All three intervals are tight enough to be actionable and wide enough to reflect the uncertainty of observational estimates. If you're reporting a point estimate without one of these intervals, you're understating the risk your stakeholders are absorbing.

---

## Run the Notebook, Then Instrument Your Next Feature

The companion notebook for this article lives at [<VPIcon icon="fas fa-code-branch"/>`main/`<VPIcon icon="fas fa-folder-open"/>`13_case_studies/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/13_case_studies/). Clone the repo, generate the synthetic dataset using the Prerequisites commands above, and run <VPIcon icon="iconfont icon-jupyter"/>`case_studies_demo.ipynb` to reproduce every code block from this article, including all four case-study implementations and the bootstrap validation. It also contains a decision function that extends the Netflix taxonomy into a more complete method-selection guide.

The source material for the four case studies is available directly from each team's engineering blog.

1. Jenny Chen's future value post is at ([Airbnb Tech Blog (<VPIcon icon="fa-brands fa-medium"/>`airbnb-engineering`)](https://medium.com/airbnb-engineering/how-airbnb-measures-future-value-to-standardize-tradeoffs-3aa99a941ba5)).
2. The quasi-experiment taxonomy is at ([<VPIcon icon="iconfont icon-netflix"/>Netflix Technology Blog](https://netflixtechblog.com/key-challenges-with-quasi-experiments-at-netflix-89b4f234b852)).
3. Nassiri's doubly robust validation piece is at ([<VPIcon icon="fa-brands fa-lyft"/>Lyft Engineering](https://eng.lyft.com/trusting-the-untestable-validation-and-diagnostics-for-the-doubly-robust-models-00853df009df)).
4. Harinen and Li's causal inference overview is at ([<VPIcon icon="fa-brands fa-uber"/>Uber Engineering](https://uber.com/blog/causal-inference-at-uber/)).

Reading the originals is worthwhile: they describe production systems in detail that a summary can't fully capture.

The teams that reliably measure AI impact share one practice: matching the method to the assignment mechanism, running diagnostics before trusting estimates, and connecting causal results to decisions before the decision window closes.

The bottleneck is almost always instrumentation. The data those analyses depend on has to exist before the feature ships. That's the gap the frameworks above can't close for you, and the reason the instrument-early step comes first.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation at Scale: How Airbnb, Netflix, Lyft, and Uber run Causal Inference on LLM-Based AI Features",
  "desc": "Causal inference for LLM-based AI features is no longer theoretical. Airbnb, Netflix, Lyft, and Uber have published detailed engineering blog posts describing exactly how they measure the causal impac",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/causal-inference-at-scale-with-case-studies.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
