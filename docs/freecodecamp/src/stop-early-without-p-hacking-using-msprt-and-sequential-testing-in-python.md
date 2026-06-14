---
lang: en-US
title: "Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python"
description: "Article(s) > Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python"
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
      content: "Article(s) > Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python"
    - property: og:description
      content: "Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-early-without-p-hacking-using-msprt-and-sequential-testing-in-python.html
prev: /programming/py-pandas/articles/README.md
date: 2026-07-03
isOriginal: false
author:
  - name: Rudrendu Paul
    url: https://freecodecamp.org/news/author/rudrendupaul/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8df7e6a8-923c-4cbf-9e5b-56a68f5ad96e.png
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
  name="Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python"
  desc="Your AI product experiment reaches statistical significance on day 14 of a planned 30-day run, measuring a causal inference question: did the LLM-based feature genuinely improve outcomes? Every produc"
  url="https://freecodecamp.org/news/stop-early-without-p-hacking-using-msprt-and-sequential-testing-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8df7e6a8-923c-4cbf-9e5b-56a68f5ad96e.png"/>

Your AI product experiment reaches statistical significance on day 14 of a planned 30-day run, measuring a causal inference question: did the LLM-based feature genuinely improve outcomes? Every product manager in the room wants to ship. Your statistician says to wait the full 30 days, or the $p$-value is invalid.

You wait. On day 30, the effect is still there. But you spent 16 days running a feature you already knew worked with 95% confidence, delaying the next experiment and burning opportunity cost.

The statistician is technically right, if you're running a classical fixed-sample test. The $p$-value in a standard t-test is valid only when you commit to a sample size in advance and look at the results exactly once. Look earlier and stop when p < 0.05, and your false positive rate climbs toward 30%.

The $p$-value was designed for a single pre-committed look: it was built for a static experiment with a fixed endpoint. Applying it to a live stream where you can check at any point requires a different mathematical object entirely.

Sequential testing was designed for exactly this situation. The mixture Sequential Probability Ratio Test (mSPRT) ([<VPIcon icon="iconfont icon-arxiv"/>Johari et al.](https://arxiv.org/abs/1512.04922)) produces always-valid inference using a mathematical object called an $e$-value: you can check results every day, stop when the evidence is strong enough, and your false positive rate stays at 5%.

Netflix has documented the production use of always-valid sequential testing frameworks ([<VPIcon icon="fas fa-globe"/>Lindon et al.](https://netflixtechblog.com/sequential-a-b-testing-keeps-the-world-streaming-netflix-part-1-continuous-data-cba6c7ed49df)), and the underlying ideas trace back to Wald's 1945 work on sequential analysis and Ville's 1939 inequality.

This tutorial makes the connection explicit. You'll simulate the peeking problem to see the inflated error rate directly, implement a working mSPRT from scratch in Python, apply it to the shared synthetic LLM product dataset, and understand exactly when sequential testing fails.

::: note Companion notebook

every code block in this article runs end-to-end in [`msprt_demo.ipynb` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/07_sequential_msprt/) in the companion repo.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/07_sequential_msprt at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/07_sequential_msprt/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f60e44431af2d481a610a5962d64eb8adcf952744e03d546cc72d3186012b91a/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

---

## Why Optional Stopping Breaks Classical Tests

Peeking at running $p$-values inflates your false positive rate toward 30%. That's the number that should give you pause, and you'll reproduce it in Step 1 below.

The $p$-value in a classical hypothesis test answers a specific question: given the null is true, what's the probability of seeing data this extreme when you run the experiment exactly as planned with the sample size you committed to upfront?

The "exactly as planned" clause is the problem. When you check results on day 5, day 10, day 14, and stop on day 14 because $p<0.05$, you haven't run the experiment you planned. You've run 14 different experiments, looked at the results of each, and stopped at the one that passed your threshold. The $p$-value formula doesn't know that.

Here's the intuition. Under the null hypothesis (no effect), your $p$-value bounces around randomly between 0 and 1. It doesn't stay parked at $0.5$. Over a 30-day run, a null experiment will dip below $0.05$ at some point with high probability. If you're watching every day and ready to stop the moment you see $p<0.05$, you'll almost always catch one of those dips. You'll declare a winner. But the effect isn't real.

Looking less often just delays the same problem. You need to look often: products move fast, and running an experiment 16 days longer than necessary costs real money, delays launches, and burns opportunity cost. You need a test statistic that stays valid regardless of when you stop.

---

## What a Sequential Test Actually Does

Sequential tests are designed for optional stopping by replacing the $p$-value with an alternative statistic called an $e$-value.

Unlike a $p$-value, an $e$-value is nonnegative, and the process formed by $e$-values over time satisfies a supermartingale property under the null: conditional on the history, the expected next $e$-value is at most the current one.

This path-level supermartingale condition is what makes optional stopping safe. Having a marginal mean below 1 at each step is necessary but not sufficient: the supermartingale condition is strictly stronger, holding the bound uniformly across all stopping times.

Here's why. If the $e$-value process is a nonneg supermartingale with $E[e_t]\le{1}$ under $H_{0}$, then a classical result called Ville's inequality gives: the probability that the running maximum of the process ever exceeds $\tfrac{1}{\alpha}$ is at most $\alpha$. With $\alpha=0.05$ and stopping threshold $\tfrac{1}{\alpha}=20$, the probability that a null $e$-value process ever reaches 20 is at most 5%.

That Type I error bound holds no matter when you stop or how many times you check. The guarantee is time-uniform: it covers all possible stopping times simultaneously.

A classical $p$-value's guarantee applies only at the pre-committed sample size. Check repeatedly and the bound dissolves. There is no time-uniform analog.

The mSPRT computes the $e$-value as a Bayes factor: the ratio of the likelihood of the observed data under the alternative to that under the null.

The "mixture" part means you don't specify a single effect size under $H_1$. You average the likelihood ratio over a prior distribution on effect sizes.

For Bernoulli outcomes (did the task complete: yes or no), placing a Beta(1,1) prior on each arm's completion rate makes the Bayes factor tractable in closed form using the log-beta function. The math is less intimidating than it looks: the entire computation reduces to four calls to `betaln`, as Step 2 shows.

The practical consequence is concrete: accumulate data, compute the running $e$-value each day, and stop when it crosses 20. When it remains below 20 across your maximum sample size, you fail to reject the null. Check every day, every hour, or every minute. The Type I error rate holds at 5%.

---

## Identification Assumptions

mSPRT's always-valid guarantee rests on four conditions. Each can break, and the failure modes section below maps each failure mode to the condition it violates.

1. **Nonneg supermartingale property under $H_{0}$.** The $e$-value process must satisfy $E[e_{t+1}|e_1,\:\cdots,\:e_t]\le{e_t}$ under $H_{0}$. For the Beta-Binomial Bayes factor used here, this holds as long as the prior is proper (Beta(1,1) qualifies) and the observations are i.i.d. within each arm.
2. **Stationarity.** The data-generating process must be stationary across the experiment window. If the underlying completion rate shifts mid-experiment due to an unrelated change (a model update, a cohort shift from a marketing campaign, or a day-of-week effect), the $e$-value picks up noise that your experiment can't separate from the treatment effect.
3. **Independent observations within each arm.** Each user's outcome must be independent of other users'. Network effects, shared workspaces, or spillover from recommendation systems can violate this.
4. **Prior specification.** The Beta(1,1) prior is a modeling assumption. The mSPRT's power depends on whether the prior places reasonable mass on the true effect size. A badly misspecified prior won't break the Type I error guarantee, but it can make the $e$-value grow so slowly that you exhaust your sample budget without crossing the threshold.

::: note Prerequisites

- Python 3.11+
- pandas 2.x (`pip install pandas`)
- numpy 1.26+ (`pip install numpy`)
- scipy 1.12+ (`pip install scipy`)
- matplotlib 3.8+ (`pip install matplotlib`)

:::

Clone the companion repo to get the synthetic dataset:

```sh
git clone https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm.git
cd product-experimentation-causal-inference-genai-llm
python data/generate_data.py --seed 42 --n-users 50000 --out data/synthetic_llm_logs.csv
```

::: info Here's what's happening

This clones the repo that contains all 13 companion notebooks for this series, generates the shared 50,000-user synthetic dataset, and saves it to <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`synthetic_llm_logs.csv`. Every article in the series runs against this same CSV so the methods are directly comparable. The data generator bakes in a +5 percentage-point causal effect on task completion for wave 1 users.

:::

---

## Setting Up the Working Example

The synthetic dataset simulates a SaaS AI assistant product with 50,000 users. The `task_completed` column records whether the AI successfully completed the user's task (1) or not (0). The `wave` column assigns users to groups: wave 1 receives the new AI feature, wave 2 is the holdout control.

![Figure 1: conceptual $e$-value trajectories. The blue path (real effect) rises and crosses the stopping threshold at the green dashed line. The purple path (weaker effect) grows but doesn't cross in 30 days. The grey path (null) meanders near 1 throughout. The red dashed line is the stopping boundary at $\tfrac{1}{\alpha}=20$. Compare this to Figure 2 below, which shows the actual $e$-value trajectory on the real dataset.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/422306d0-efbc-44d6-a0a1-f8415f2d5e6d.png)

```py
import pandas as pd
import numpy as np

df = pd.read_csv("data/synthetic_llm_logs.csv")

treated = df[df["wave"] == 1]["task_completed"].values
control = df[df["wave"] == 2]["task_completed"].values

print(f"Treated: n={len(treated):,}, mean={treated.mean():.4f}")
print(f"Control: n={len(control):,}, mean={control.mean():.4f}")
print(f"Observed lift: {treated.mean() - control.mean():.4f}")
#
# Treated: n=24,937, mean=0.6202
# Control: n=25,063, mean=0.5718
# Observed lift: 0.0485
```

::: info Here's what's happening

you load the 50,000-row dataset and split by wave. Wave 1 has 24,937 treated users with a 62.0% task completion rate. Wave 2 has 25,063 control users *with a 57.2% task completion rate*. The observed 4.85 percentage-point lift is close to the ground-truth 5pp baked into the data generator, with the small gap due to sampling noise. These arrays feed the sequential test one observation at a time, as outlined in the steps below.

:::

---

## Step 1: Simulate the Peeking Problem

The peeking problem is real and measurable: 30 days of daily monitoring inflates your false positive rate from 4.2% to 30.2%, confirmed by the simulation below.

This simulation runs 1,000 null experiments (in which the treatment has zero effect) and checks every day whether the running $p$-value has dropped below 0.05. The scenario uses 60 users per arm per day across a 30-day experiment: 1,800 total observations per arm, a realistic scale for a mid-sized SaaS product.

```py :collapsed-lines
from scipy import stats
import numpy as np

np.random.seed(42)

N_SIMS = 1000
N_DAYS = 30
USERS_PER_ARM_PER_DAY = 60
NULL_RATE = 0.60

false_positives_peeking = 0
false_positives_single_look = 0

for _ in range(N_SIMS):
    control_outcomes = []
    treated_outcomes = []
    stopped_early = False

    for day in range(N_DAYS):
        control_outcomes.extend(np.random.binomial(1, NULL_RATE, USERS_PER_ARM_PER_DAY))
        treated_outcomes.extend(np.random.binomial(1, NULL_RATE, USERS_PER_ARM_PER_DAY))

        # The peeking problem: checking the test every single day
        if len(control_outcomes) >= 10:
            _, p = stats.ttest_ind(treated_outcomes, control_outcomes)
            if p < 0.05 and not stopped_early:
                false_positives_peeking += 1
                stopped_early = True

    # The fixed-sample approach: checking only once at the very end
    _, p_final = stats.ttest_ind(treated_outcomes, control_outcomes)
    if p_final < 0.05:
        false_positives_single_look += 1

print(f"False positive rate (peeking daily):  {false_positives_peeking / N_SIMS:.1%}")
print(f"False positive rate (single look):    {false_positives_single_look / N_SIMS:.1%}")
#
# False positive rate (peeking daily):  30.2%
# False positive rate (single look):    4.2%
```

::: info Here's what's happening

Each simulation generates null data, with both arms drawn from the same 60% completion rate, so any detected effect is pure noise. The inner loop adds 60 observations per arm per day and runs a t-test on the accumulated data for that day.

:::

When the $p$-value falls below $0.05$ for the first time, the simulation flags a false positive and stops (mimicking a team that ships when it detects significance).

The single-look check at day 30 is the honest fixed-sample test. One look gives 4.2% false positives, close to nominal. Daily peeking reaches 30.2%, meaning more than one in four "significant" experiments is detecting noise.

---

## Step 2: Implement the mSPRT $e$-value

The mSPRT computes a Bayes factor at each time step: how much more likely are the observed data under a mixture of alternatives than under the null? For binary outcomes with a Beta(1,1) prior on each arm's completion rate, the running Bayes factor has a closed form using the log-beta function.

```py :collapsed-lines
from scipy.special import betaln

def compute_evalue_running(outcomes_treated, outcomes_control,
                           alpha_prior=1.0, beta_prior=1.0):
    """
    Compute the running mSPRT $e$-value for two Bernoulli arms.

    Parameters
    ----------
    outcomes_treated : array-like of 0/1
    outcomes_control : array-like of 0/1
    alpha_prior, beta_prior : Beta prior hyperparameters (default: uniform)

    Returns
    -------
    e_values : np.ndarray of shape (n,), one $e$-value per observation
    """
    outcomes_treated = np.asarray(outcomes_treated, dtype=float)
    outcomes_control = np.asarray(outcomes_control, dtype=float)
    n = min(len(outcomes_treated), len(outcomes_control))

    cum_t = np.cumsum(outcomes_treated[:n])
    cum_c = np.cumsum(outcomes_control[:n])
    t_arr = np.arange(1, n + 1, dtype=float)

    # Alternative hypothesis: each arm has its own independent Beta prior on completion rate
    log_ml_t = (betaln(alpha_prior + cum_t, beta_prior + t_arr - cum_t)
                - betaln(alpha_prior, beta_prior))
    log_ml_c = (betaln(alpha_prior + cum_c, beta_prior + t_arr - cum_c)
                - betaln(alpha_prior, beta_prior))

    # Null hypothesis: both arms share a single pooled Beta prior on the common rate
    pooled_successes = cum_t + cum_c
    pooled_n = 2 * t_arr
    log_ml_h0 = (betaln(alpha_prior + pooled_successes,
                        beta_prior + pooled_n - pooled_successes)
                 - betaln(alpha_prior, beta_prior))

    # Log Bayes factor is the difference in log marginal likelihoods
    log_bf = log_ml_t + log_ml_c - log_ml_h0

    return np.exp(log_bf)
```

::: info Here's what's happening

the function takes two arrays of 0/1 outcomes arriving in temporal order. For each time step t, it computes the cumulative number of successes and trials for each arm.

:::

`betaln` gives the log of the beta function, which is the normalizing constant for the Beta-Binomial marginal likelihood. $H_1$ integrates over independent Beta priors on each arm's rate;.H0 integrates over a single shared-rate prior.

The log Bayes factor is the difference. Exponentiating gives the $e$-value. When the treatment has a real effect, the $e$-value grows over time. With no effect, it bounces near 1 and is a non-negative supermartingale under $H_{0}$. A quick sanity check on null data confirms the expected behavior:

```py
np.random.seed(0)
null_t = np.random.binomial(1, 0.60, 500)
null_c = np.random.binomial(1, 0.60, 500)
ev_null = compute_evalue_running(null_t, null_c)
print(f"E-value at end under null (should be near 1): {ev_null[-1]:.3f}")
print(f"Max $e$-value under null: {ev_null.max():.3f}")
#
# $E$-value at end under null (should be near 1): 0.078
# Max $e$-value under null: 2.188
```

::: info Here's what's happening

under the null, the final $e$-value ends near 1 (0.078 here, due to sampling variation), and the maximum over 500 observations stays well below the stopping threshold of 20. By Ville's inequality, the probability that a valid null $e$-value process ever reaches 20 is at most 5%, consistent with a 5% Type I error rate. In this single 500-observation run, the max is 2.188, which is expected behavior.

:::

---

## Step 3: Apply mSPRT to the Real Dataset

Now apply the test to the synthetic data where a real treatment effect exists. You'll compute the running $e$-value day by day and find the first day it crosses the stopping threshold.

```py :collapsed-lines
import matplotlib.pyplot as plt

np.random.seed(42)
treated_shuffled = treated.copy()
control_shuffled = control.copy()
np.random.shuffle(treated_shuffled)
np.random.shuffle(control_shuffled)

USERS_PER_ARM_PER_DAY = 60
N_DAYS_RUN = 30
n_per_arm = USERS_PER_ARM_PER_DAY * N_DAYS_RUN  # 1,800

treated_seq = treated_shuffled[:n_per_arm]
control_seq = control_shuffled[:n_per_arm]

e_values = compute_evalue_running(treated_seq, control_seq)

ALPHA = 0.05
THRESHOLD = 1 / ALPHA  # = 20

days = np.arange(1, len(e_values) + 1) / USERS_PER_ARM_PER_DAY
cross_indices = np.where(e_values >= THRESHOLD)[0]
if len(cross_indices) > 0:
    stopping_day = days[cross_indices[0]]
    print(f"mSPRT stopping day: {stopping_day:.1f}")
    print(f"E-value at stopping: {e_values[cross_indices[0]]:.1f}")
else:
    stopping_day = None
    print("mSPRT did not cross threshold in this window")

print(f"Final $e$-value on day {N_DAYS_RUN}: {e_values[-1]:.2f}")
#
# mSPRT stopping day: 25.9
# $E$-value at stopping: 20.9
# Final $e$-value on day 30: 75.64
```

::: info Here's what's happening

you shuffle the treatment and control arrays to simulate random daily arrival of users (real experiments don't deliver users in any particular order), then feed the first 1,800 per arm into `compute_evalue_running` one observation at a time. The $e$-value crosses the threshold of 20 on day 25.9, meaning you could have called the experiment 4 days early with a fully valid inference guarantee. By day 30, the $e$-value has climbed to 75.64, far above the threshold.

:::

![Figure 2: actual mSPRT $e$-value trajectory on the real 50,000-user synthetic dataset (wave 1 treatment vs. wave 2 control). The blue line is the running $e$-value on a log scale. The red dashed line is the stopping threshold at $\tfrac{1}{\alpha}$ = 20.<br/>The dotted green vertical line marks day 25.9, when the $e$-value first crosses the threshold. The bottom panel shows cumulative task completion rates per arm converging as data accumulates. Unlike the schematic in Figure 1, these are real data from the shared dataset, with a true 4.85 pp lift.](https://cdn.hashnode.com/uploads/covers/69cc82ffe4688e4edd796adb/82ae7b10-c598-4597-80e6-375fa76b209d.png)

---

## Step 4: Compare Power Against a Fixed-Sample Test

The mSPRT carries a real cost. When the effect is active, it lets you stop earlier than the scheduled end time. When the effect is smaller than your prior expects, or when you're working with modest sample sizes, the power penalty is substantial. This simulation quantifies the trade-off honestly.

```py :collapsed-lines
from scipy.stats import ttest_ind

np.random.seed(42)

N_SIMS = 1000
TRUE_EFFECT = 0.05
BASE_RATE = 0.60
N_PER_ARM = 1800          # 30 days x 60 users/arm/day
DAILY_BATCH = 60
THRESHOLD = 20

msprt_stopping_days = []
msprt_detected = 0
ttest_detected = 0

for sim in range(N_SIMS):
    t_obs = np.random.binomial(1, BASE_RATE + TRUE_EFFECT, N_PER_ARM)
    c_obs = np.random.binomial(1, BASE_RATE, N_PER_ARM)

    e_vals = compute_evalue_running(t_obs, c_obs)
    days = np.arange(1, N_PER_ARM + 1) / DAILY_BATCH
    crosses = np.where(e_vals >= THRESHOLD)[0]
    if len(crosses) > 0:
        msprt_detected += 1
        msprt_stopping_days.append(days[crosses[0]])
    else:
        msprt_stopping_days.append(30.0)

    _, p = ttest_ind(t_obs, c_obs)
    if p < 0.05:
        ttest_detected += 1

msprt_power = msprt_detected / N_SIMS
ttest_power = ttest_detected / N_SIMS
median_stop = np.median(msprt_stopping_days)
pct_stopped_early = np.mean(np.array(msprt_stopping_days) < 30.0)

print(f"mSPRT power:               {msprt_power:.1%}")
print(f"Fixed-sample t-test power: {ttest_power:.1%}")
print(f"Median mSPRT stop day:     {median_stop:.1f} / 30")
print(f"Fraction stopping early:   {pct_stopped_early:.1%}")
#
# mSPRT power:               49.3%
# Fixed-sample t-test power: 88.7%
# Median mSPRT stop day:     30.0 / 30
# Fraction stopping early:   49.3%
```

::: info Here's what's happening

you run 1,000 simulations with a true 5pp lift. For mSPRT, the running $e$-value is computed, and the first crossing of 20 is recorded.

:::

For the fixed-sample test, you look once at the end of day 30. The results show a meaningful power gap: mSPRT detects the effect in 49.3% of experiments, whereas the fixed-sample test detects it in 88.7%. With a 5pp lift and 1,800 observations per arm, the mSPRT requires roughly twice as many observations to match the fixed-sample test's power.

That's the price of the always-valid guarantee. What you gain is the Type I error control when you check daily: a fixed-sample test peeked at daily inflates to 30.2% false positives. mSPRT stays at 5% regardless of when you stop.

The right choice depends on which is more expensive for your team: running experiments longer, or shipping false positives. Most teams underestimate the cost of power until they run this simulation themselves.

---

## Validate Against Ground Truth

The synthetic dataset incorporates a known 5pp lift, so you can check whether mSPRT correctly identifies the effect when given more data beyond the 30-day window.

```py
np.random.seed(0)
t_full = treated_shuffled
c_full = control_shuffled[:len(t_full)]

e_full = compute_evalue_running(t_full, c_full)
days_full = np.arange(1, len(e_full) + 1) / USERS_PER_ARM_PER_DAY

cross_full = np.where(e_full >= THRESHOLD)[0]
if len(cross_full) > 0:
    print(f"mSPRT correctly detected the effect.")
    print(f"Could have stopped on day {days_full[cross_full[0]]:.1f}")
    print(f"True effect in data: {treated.mean() - control.mean():.4f}")
    print(f"E-value at stopping point: {e_full[cross_full[0]]:.1f}")
else:
    print("mSPRT did not cross threshold with this data slice.")
#
# mSPRT correctly detected the effect.
# Could have stopped on day 27.1
# True effect in data: 0.0485
# $E$-value at stopping point: 22.2
```

::: info Here's what's happening

running mSPRT on the full shuffled arrays (24,937 treated, 25,063 control), the $e$-value crosses the threshold at day 27.1. The true causal effect in the data, 4.85 pp, is close to the generator's ground truth of 5 pp and is correctly detected.

:::

A fixed-sample test designed for 30 days holds you to day 30 even when the evidence has already accumulated. With 60 users per arm per day, mSPRT would have let you ship on day 27.1, saving almost 3 days on a feature that was always going to ship.

---

## Step 5: Bootstrap Confidence Intervals

A stopping day tells you when to call the experiment, but it doesn't tell you how large the effect is or how precisely it's estimated. Bootstrap confidence intervals give you both.

```py
rng = np.random.default_rng(7)
point_est = treated.mean() - control.mean()

boot_diffs = np.array([
    rng.choice(treated, size=len(treated), replace=True).mean() -
    rng.choice(control, size=len(control), replace=True).mean()
    for _ in range(500)
])

lower = float(np.percentile(boot_diffs, 2.5))
upper = float(np.percentile(boot_diffs, 97.5))

print(f"Point estimate (treated - control): {point_est:.4f} ({point_est*100:.2f}pp)")
print(f"95% bootstrap CI: [{lower:.4f}, {upper:.4f}]  "
      f"([{lower*100:.2f}pp, {upper*100:.2f}pp])")
print(f"Ground-truth 5pp is {'inside' if lower <= 0.05 <= upper else 'outside'} the CI.")
#
# Point estimate (treated - control): 0.0485 (4.85pp)
# 95% bootstrap CI: [0.0407, 0.0581]  ([4.07pp, 5.81pp])
# Ground-truth 5pp is inside the CI.
```

::: info Here's what's happening

you resample the treated and control arrays independently with replacement 500 times, computing the difference in means each time. The 2.5th and 97.5th percentiles of the 500 differences form the confidence interval. The CI runs from 4.07pp to 5.81pp, covering the ground-truth 5pp and excluding zero, confirming the effect is real. The interval is reasonably tight given 25k users per arm, giving you both the "did it work" answer (yes) and the "how much" answer (between 4.07 and 5.81 percentage points) in a single step.

:::

---

## When mSPRT Fails

Sequential tests still demand experimental rigor. Four situations either break the guarantee or make the method practically useless.

### Badly Misspecified Prior

The mSPRT assumes a Beta(1,1) prior on each arm's completion rate, a modeling choice with real consequences. This violates the prior specification assumption when your true effect is far outside the range the prior expects.

A uniform Beta(1,1) prior performs reasonably well for moderate effects in the 3–10 pp range at base rates around 60%. If your true effect is a 0.3pp lift, a realistic outcome for a marginal AI feature change, the $e$-value grows extremely slowly. You'll exhaust your sample budget before crossing the threshold.

Calibrate the prior against historical A/B test data from your product: fit Beta hyperparameters to the distribution of past effect sizes using maximum likelihood, and verify that the resulting prior puts meaningful mass near your minimum detectable effect.

### Non-Stationary Outcomes

The guarantee requires the $e$-value process to be a non-negative supermartingale under the null, which requires the data-generating process to be stationary. If your AI model updates mid-experiment, if the user population shifts (a marketing campaign brings in a different cohort on day 12), or if there's a day-of-week effect in task difficulty, the $e$-value absorbs environment noise that your experiment can't separate from the treatment effect.

Diagnose non-stationarity by running your $e$-value implementation on holdout A/A experiments: if the null $e$-value process trends upward when it should stay near 1, your environment isn't stationary enough for the method to be reliable.

### Multiple Metrics Without Multiplicity Correction

mSPRT controls Type I error for a single comparison. The method itself doesn't fail when you test 20 metrics, so each individual $e$-value remains valid. What fails is your familywise error rate: running mSPRT on 20 metrics simultaneously and stopping when any one crosses 20 inflates the probability of at least one false positive well above 5%.

Apply a Bonferroni correction by raising the threshold to 1/(α/m) = 400 for m=20 metrics at α=0.05, or use a Benjamini-Hochberg procedure on the final $e$-values when the experiment ends.

The multiplicity problem is identical to the one you'd face with fixed-sample tests. mSPRT doesn't make it worse, and it doesn't solve it either. This is a common misconception worth naming explicitly.

### Minimum Runtime is Still Real

Because the always-valid guarantee applies regardless of when you check, it's tempting to start monitoring immediately. Don't. The guarantee holds whenever you check, but low power means the test rarely rejects even when the effect is real.

The Step 4 simulation shows this directly: with 1,800 observations per arm and a 5 pp lift, mSPRT has only 49.3% power. Before starting an mSPRT-monitored experiment, compute the minimum sample size for 80% power at your expected effect size using a standard power calculator, and set that as your floor before you start monitoring. Don't check the $e$-value until you've reached that floor.

---

## What to Do Next

Apply mSPRT to your primary metric, with a minimum runtime floor set to the sample size required for 80% power at your expected effect size.

Run A/A tests on historical holdout data first: the calibration check costs you nothing and catches non-stationary environments before they corrupt a real experiment. Teams that skip the A/A test discover calibration failures during live experiments. That's an expensive way to learn about non-stationary data.

::: info

For the full implementation including bootstrap confidence intervals, see [`07_sequential_msprt/` (<VPIcon icon="iconfont icon-github"/>`RudrenduPaul/product-experimentation-causal-inference-genai-llm`)](https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/07_sequential_msprt/) in the companion repo.

<SiteInfo
  name="product-experimentation-causal-inference-genai-llm/07_sequential_msprt at main · RudrenduPaul/product-experimentation-causal-inference-genai-llm"
  desc="Companion notebooks for the FreeCodeCamp causal inference for GenAI/LLM series — Difference-in-Differences, propensity scores, RDD, synthetic control, and more - RudrenduPaul/product-experimentatio..."
  url="https://github.com/RudrenduPaul/product-experimentation-causal-inference-genai-llm/tree/main/07_sequential_msprt/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f60e44431af2d481a610a5962d64eb8adcf952744e03d546cc72d3186012b91a/RudrenduPaul/product-experimentation-causal-inference-genai-llm"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Product Experimentation: Stop Early Without P-Hacking Using mSPRT and Sequential Testing in Python",
  "desc": "Your AI product experiment reaches statistical significance on day 14 of a planned 30-day run, measuring a causal inference question: did the LLM-based feature genuinely improve outcomes? Every produc",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-early-without-p-hacking-using-msprt-and-sequential-testing-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
