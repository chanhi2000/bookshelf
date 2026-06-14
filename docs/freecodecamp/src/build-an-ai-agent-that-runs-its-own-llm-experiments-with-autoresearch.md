---
lang: en-US
title: "How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch"
description: "Article(s) > How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch"
icon: iconfont icon-pytorch
category:
  - Python
  - PyTorch
  - Pandas
  - NumPy
  - Matplotlib
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pytorch
  - py-torch
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - matplotlib
  - py-matplotlib
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch"
    - property: og:description
      content: "How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-agent-that-runs-its-own-llm-experiments-with-autoresearch.html
prev: /articles/README.md
date: 2026-06-30
isOriginal: false
author:
  - name: ishaan gupta
    url: https://freecodecamp.org/news/author/ishaangupta1201/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f910471-5f78-41c0-a30e-7630737bbb74.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch"
  desc="A few months ago, Andrej Karpathy released autoresearch. It's an open-source Python tool that lets an AI agent run experiments on one GPU while you sit back and wait for the results. Lately I've still"
  url="https://freecodecamp.org/news/build-an-ai-agent-that-runs-its-own-llm-experiments-with-autoresearch"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4f910471-5f78-41c0-a30e-7630737bbb74.png"/>

A few months ago, Andrej Karpathy released [<VPIcon icon="iconfont icon-github"/>`karpathy/autoresearch`](https://github.com/karpathy/autoresearch). It's an open-source Python tool that lets an AI agent run experiments on one GPU while you sit back and wait for the results.

Lately I've still seen folks on Twitter arguing about whether AI agents can build their *“million dollar idea”* or something about *Openclaw*. But here's a repo that lets you hand an agent a real GPT training setup and ask it to do the research itself.

Basically it edits the code, trains, reads the loss, makes a decision about the result, and repeats this process. And all this happens while you sleep, or dig into something else. And surprisingly, it does actually work.

On a depth-12 nanochat baseline (more on what "depth" means later), Karpathy left it running for about two days. Over roughly 700 experiments, the agent found about 20 changes that genuinely improved the model, and those changes stacked on top of each other.

In this article, I'll walk through what autoresearch is, why the way it measures success is the whole trick, what each file in the repo actually does, what the agent tends to discover, and a step-by-step guide to running it yourself. By the end you should be able to point an agent at your own GPU and let it run.

::: note Prerequisites

This article is a complete walkthrough of this repo. The goal is that by the end, you'll understand what autoresearch is and how you can run it on your own machine.

No prior ML research experience required, but if you have it then the deeper sections I wrote will be more meaningful to you. Just basic knowledge of GPU, VRAM and GPUs like H100/A100/4090 would suffice, but don't worry i have quoted the text below explaining every term i think a beginner needs to understand.

:::

---

## What is autoresearch?

![flowchart of the autoresearch loop](https://cdn.hashnode.com/uploads/covers/6a0065c6e3eebc2e20691ad8/4d4413c5-7264-49b0-bcb0-1cf8b7e763f7.png)

Simply put, autoresearch is just one specific idea executed cleanly. You take a small but real LLM training setup, put it in a single Python file, and let an AI agent edit that file.

The agent runs the file and reads the loss. When you train a language model, "loss" is just a single number that scores how badly the model is predicting the next chunk of text. A high number means it's guessing poorly, and a number close to zero means it's predicting almost perfectly.

Training is the process of nudging the model's millions of internal weights to push that number down. So when I say the agent "reads the loss," I mean it looks at that score to judge whether the change it just made helped or hurt.

Based on that score, the agent decides whether the change helped, and then either keeps the change or reverts it. Then it tries something else.

The flow runs top to bottom like this: A human (you) writes the playbook (a Markdown file called <VPIcon icon="fa-brands fa-markdown"/>`program.md`), which spells out the rules. An AI agent reads that playbook and starts an experiment loop.

In each pass of the loop, the agent edits the training code with a new idea, trains for five minutes, reads the resulting score, decides whether to keep or undo the change, and writes the outcome to a results file. Then it loops back and tries the next idea.

It does this on its own, around twelve times an hour. So a full night of sleep buys you roughly a hundred experiments and, with luck, a noticeably better model by morning.

The repo is laid out so the agent has exactly one knob to turn. It can't install new packages or change how the data is loaded or how the loss is measured. All of that is locked down on purpose. The only file the agent edits is <VPIcon icon="fa-brands fa-python"/>`train.py` which consists of the model architecture, the optimizer, the batch size, the learning rate, and the structure of the training loop itself.

The reason this design works is the same reason a controlled experiment in any field works. If the data, the metric, and the budget are all fixed, then any change in the result must be coming from the change the agent made. The agent is doing science the way a careful researcher would, only it doesn't get tired and doesn't need lunch.

---

## Why This Matters

It's tempting to read this as just another agent demo. But it's not, and the reason is the metric. That metric is called val_bpb, short for validation bits per byte. It's a specific way of scoring how well the model predicts text it has never seen during training (the "validation" set).

I'll break down exactly how it's calculated in the next section, but the one-line version is that it measures, on average, how many bits of information the model needs to encode each byte of text. Lower is better: a lower val_bpb means the model is surprised less often by real text, which is the whole goal.

The reason Karpathy uses bits per byte rather than the raw training loss is that bits per byte doesn't change just because you changed the vocabulary, so two very different models can still be compared fairly. The "lower is better" part and the "vocabulary-independent" part are two separate properties. The metric happens to have both.

When I say a baseline model from this repo "lands around 1.00 bpb," I mean that if you run the default untouched training script for its 5 minutes, the model it produces scores roughly 1.00 on this metric when measured on the held-out validation text. That's your starting line.

From there, an improvement of 0.005 bpb (so a score of about 0.995) is a small but real win, the kind the agent finds often. An improvement of 0.05 (a score near 0.95) would be enormous, the kind of jump you'd usually only get from a much bigger model or a much longer training run. So the numbers look tiny, but on this scale, thousandths of a bit genuinely matter.

Here's why optimizing this particular number is a big deal. The agent isn't chasing some artificial leaderboard that researchers spent years gaming. It's pushing down the same kind of validation loss curve that every major language model has been trained against since GPT-2 in 2019. A "loss curve" is just the plot of that score dropping over the course of training, and "the wave of LLMs since GPT-2" is shorthand for the fact that essentially all of the progress, from GPT-2 to today's frontier models, came from people finding ways to make that curve drop faster or lower for the same amount of compute. The agent is working on the exact same problem, just at a small, fast cheap scale.

And that's what makes the next part surprising. When the agent finds an improvement "here," I mean on the small depth-12 model it's allowed to edit. "Depth" is the number of transformer layers stacked in the model. depth-12 is a small model, and depth-24 is a bigger one with twice as many layers.

Karpathy took the roughly 20 tweaks the agent discovered on the small depth-12 model and applied them to the bigger depth-24 model. Being stacked cleanly means two things at once: the improvements were additive (turning on all 20 together gave you the sum of their individual gains, rather than cancelling each other out), and they transferred (gains found on the small model still showed up on the big one).

That's the signal that the agent found real insights about training, not lucky quirks that only help at one specific size. Stacked together, they cut Karpathy's "Time to GPT-2" benchmark from 2.02 hours to 1.80 hours, which is about an 11% speedup on code he'd already hand-tuned for a long time.

The other thing that's significant is the budget. Each experiment runs for exactly 5 minutes of wall-clock training time, no more, no less. That gives roughly 12 experiments per hour, or about 100 in a typical 8-hour sleep cycle.

### Exploring the Repo

Now if you clone the repo, you get a small handful of files. Most of them are plumbing. Three of them are the heart of the system and the difference between them is who edits what.

Only three files matter, and they differ by who edits them.

1. .<VPIcon icon="fa-brands fa-python"/>`train.py` is the file the agent edits. it holds the GPT model, the optimizer, and the training loop, and everything in it is fair game.
2. .<VPIcon icon="fa-brands fa-python"/>`prepare.py` is the fixed foundation that nobody edits during a run: it downloads the data, trains the tokenizer, and defines the metric.
3. .<VPIcon icon="fa-brands fa-markdown"/>`program.md` is the file you, the human, edit: it's the playbook of rules the agent follows.

The remaining files (README.md, pyproject.toml, uv.lock, .gitignore, .python-version, the analysis.ipynb notebook, and the progress.png image) are plumbing and documentation that neither you nor the agent needs to touch during a run.

![three main files that we need to understand](https://cdn.hashnode.com/uploads/covers/6a0065c6e3eebc2e20691ad8/1a8acbf9-87a3-428e-9cc1-53aaee2adc91.png)

There are a few other files in the repo which don't need attention from you or the agent during a run.

---

## What Exactly is `val_bpb`?

Before going further, it helps to understand what val_bpb is. If you've read other LLM articles, you have probably seen terms like **“perplexity”** or **“cross-entropy loss”** thrown around.

Bits per byte is like their cousin. When a language model predicts text, it assigns probabilities to what comes next. If the model is confident and right, it gets a low loss. If it's confident and wrong, it gets a high loss, a large penalty. Add up those penalties across all the text and you get the model's total loss. Lower is better, because a lower total means the model assigned high probability to the words that actually appeared.

Cross-entropy loss is the standard scoring function for training language models. For each token, the model assigns a probability to every possible next token and the loss is the negative logarithm of the probability it gave to the token that actually came next. Predict the right token confidently and the loss is near zero. Assign low probability to the correct token and the loss is large. The model's total loss is the average of this across all tokens.

Cross-entropy loss measures this in nats. A nat is the unit you get when that logarithm is taken in base e (the natural log) instead of base 2. It measures the same quantity of "surprise" on a different scale (one nat is about 1.44 bits). Dividing the loss by the natural log of 2 is what rescales nats into bits, which is the conversion bits per byte performs.

Bits per byte takes that loss and divides it by the number of bytes the text actually contains, then converts to log base 2. The result is a number that tells you, on average, how many bits of information the model needs to encode each byte of text.

A perfect model would need close to zero, while a random model would need around 8 bits per byte (since a byte has 8 bits).

The reason Karpathy chose bpb instead of plain cross-entropy is that bpb is **vocabulary-size-independent**. If the agent decides to change the tokenizer or the vocabulary, the cross-entropy loss would be completely different even for the same model quality. Bits per byte normalizes that out, so a depth-8 model with vocab 8192 and a depth-12 model with vocab 16384 are directly comparable.

The function that computes this, evaluate_bpb, lives in prepare.py, which the agent is never allowed to edit. It can only touch train.py. Because the metric's definition sits in a file the agent can't modify, it can't lower its score by quietly changing how the score is calculated. The scoring rule stays identical for every experiment, which is what makes the comparison honest.

### The 5 Minute Rule

There's one design choice in autoresearch that deserves its own section, because it's the choice that makes the whole thing work in practice. Every experiment runs for exactly 5 minutes of wall-clock training time regardless of what the agent is doing.

Wall-clock time means real elapsed time: what a clock on the wall measures, and not the number of training steps or tokens processed. 5 minutes of wall-clock time is 5 literal minutes regardless, of how much the model does in them.

If you trained for a fixed number of steps instead, the agent could “win” by making the model so small that it ripped through more steps than the baseline. If you trained for a fixed number of tokens, the agent could win by lowering the sequence length.

The agent isn't competing against another agent as we might think of it. Its only objective is to push val_bpb below the previous best score on this exact setup. So "winning" means producing a lower score, and the risk is that it lowers the score through a degenerate shortcut that games whichever budget you chose rather than a real efficiency gain. If you trained until convergence, the agent’s run would take wildly different amounts of time and you would never finish 100 experiments in a night.

A fixed wall clock budget cuts through all of this. The agent is forced to optimize for actual training efficiency on the actual hardware in front of it. If it makes the model slightly bigger but the per-step compute drops because of a smarter attention pattern, that's a real win. If it speeds up the per-step compute but the model now learns less per step, that shows up as a worse val_bpb. The two effects get netted out automatically in the end.

The H100 and A100 are NVIDIA datacenter GPUs and the RTX 4090 is a high-end consumer card. They differ sharply in speed and memory, and that's the whole point: in a fixed 5 minute budget, a faster card processes more data and reaches a lower val_bpb. So a score from one GPU can't be compared head-to-head with a score from another.

There's a tradeoff, though. Because the budget is wall-clock, the val_bpb you get on an H100 isn't directly comparable to the val_bpb you get on a 4090 or an A100. The system is designed to find the best model **for your specific compute platform** in 5 minutes, not to be a global benchmark.

If you want to compare across hardware, you would need to fix a different budget. For the autonomous research use case, this is exactly right.

Let’s get into each of the files in depth now.

### 1. <VPIcon icon="fa-brands fa-python"/>`prepare.py`

Nobody touches this file but everything depends on it. It mainly performs three jobs.

The first job is downloading data. The training corpus is ClimbMix-400B, a high-quality web dataset hosted on HuggingFace and shuffled into 6,543 parquet shards. By default <VPIcon icon="fa-brands fa-python"/>`prepare.py` downloads only 10 of these (about a few gigabytes), which is plenty for running thousands of 5-minute experiments.

The very last shard is always downloaded and pinned as the validation set. That pinning matters, since every experiment (no matter what changes) evaluates on the exact same held-out data.

The second job is training a tokenizer. The repo uses **rustbpe,** a fast Rust implementation of byte-pair encoding, to learn a vocabulary of 8,192 tokens from a sample of the training data. The result is exported as a tiktoken-compatible encoding so it integrates cleanly with PyTorch downstream. There's also a small precomputed lookup table called `token_bytes.pt` that maps each token id to its UTF-8 byte length. This is what makes the bpb calculation honest.

The third job is providing utilities that <VPIcon icon="fa-brands fa-python"/>`train.py` imports at runtime. The dataloader is the interesting one. It does what's called **best-fit packing**: every row in the batch starts with a special BOS (beginning of sequence) token and the loader fills the row by greedily picking documents that fit in the remaining space. Only when no document fits does it crop the shortest available document to fill the gap.

The result is 100% utilization with no padding. This is meaningfully faster than the naïve approach of just truncating long documents and padding short ones. The constants at the top of <VPIcon icon="fa-brands fa-python"/>`prepare.py` are deliberately simple. Three numbers and a sequence length define the entire experimental contract.

If you run autoresearch on different hardware and want to compare results with a friend, the only thing both of you need to share is these constants. That's the whole point of putting them here and nowhere else.

### 2. <VPIcon icon="fa-brands fa-python"/>`train.py`

This is the file the agent lives in. It breaks naturally into four parts: the model, the optimizer (Muon for the matrix weights, AdamW for the embeddings and scalar parameters), the hyperparameters, and the training loop. We'll walk through each one with the goal of understanding why each piece exists.

![you can see in the image that the agent only controls the two green boxes in the middle, the model and the loop](https://cdn.hashnode.com/uploads/covers/6a0065c6e3eebc2e20691ad8/a4847be2-2007-42e0-91bd-9599125b5ffc.png)

The model is a fairly modern GPT written from scratch with no library dependencies beyond PyTorch and a Flash Attention 3 kernel. If you've read other GPT implementations the high-level structure will look familiar: a token embedding, a stack of transformer blocks, a normalization layer, and a linear head that projects back to vocabulary logits.

The interesting parts are in the details. I don’t think explaining the architecture or code is required for this repo, so I’ll just draw out a small architecture diagram for those of you who want to visualize it. Then I'll explain how the training loop is written.

![simple explanation of the  model in train.py- token embedding feeding a stack of transformer blocks, then a normalization layer, then a linear head producing vocabulary logits](https://cdn.hashnode.com/uploads/covers/6a0065c6e3eebc2e20691ad8/42663aea-dace-4d97-8bf4-7294d61f8a0d.png)

The loop itself is short and almost pleasant to read. The skeleton is:

```py
while True:
    # accumulate gradient over micro-batches to hit TOTAL_BATCH_SIZE
    for micro_step in range(grad_accum_steps):
        with autocast_ctx:
            loss = model(x, y)
        loss = loss / grad_accum_steps
        loss.backward()
        x, y, epoch = next(train_loader)

    # update LR / momentum / weight decay based on time elapsed
    progress = min(total_training_time / TIME_BUDGET, 1.0)
    # ... set group["lr"], group["momentum"], group["weight_decay"] ...

    optimizer.step()
    model.zero_grad(set_to_none=True)

    # log step metrics
    # ...

    if step > 10 and total_training_time >= TIME_BUDGET:
        break
```

There are a few things worth noticing here. First, the time budget is checked after the first 10 steps. This is so the budget doesn't include the initial PyTorch compilation (which can take 30 seconds or more). Without this, fast experiments would get penalized for spending half their budget on warmup.

Second, the loop has a fast-fail check. If the loss explodes or hits NaN it prints “FAIL” and exits. The agent then sees a crash and logs it. This is a defense against the agent doing something that diverges spectacularly.

Third, after the loop ends, there's a single final call to `evaluate_bpb` and then a structured summary printed to stdout.

That summary is the whole API between the training script and the agent:

```yaml
---
val_bpb:          0.997900
training_seconds: 300.1
total_seconds:    325.9
peak_vram_mb:     45060.2
mfu_percent:      39.80
total_tokens_M:   499.6
num_steps:        953
num_params_M:     50.3
depth:            8
```

This is what the grep extracts and the agent reads. The whole experimental contract is seven lines of this plain text.

#### The Hyperparameters

The hyperparameters live in their own clearly-marked section near the bottom of <VPIcon icon="fa-brands fa-python"/>`train.py`, with a comment that says "edit these directly, no CLI flags needed." They look like this:

```py title="train.py"
# Model architecture
ASPECT_RATIO = 64       # model_dim = depth * ASPECT_RATIO
HEAD_DIM = 128          # target head dimension for attention
WINDOW_PATTERN = "SSSL" # sliding window pattern: L=full, S=half context

# Optimization
TOTAL_BATCH_SIZE = 2**19 # ~524K tokens per optimizer step
EMBEDDING_LR = 0.6
UNEMBEDDING_LR = 0.004
MATRIX_LR = 0.04
SCALAR_LR = 0.5
WEIGHT_DECAY = 0.2
ADAM_BETAS = (0.8, 0.95)
WARMUP_RATIO = 0.0
WARMDOWN_RATIO = 0.5
FINAL_LR_FRAC = 0.0

# Model size
DEPTH = 8
DEVICE_BATCH_SIZE = 128
```

Everything here is a deliberate single point of truth. The model dimension is computed from depth (`depth × 64`, rounded to the head dimension). The number of heads is computed from model dimension. This means that the agent can change one number `DEPTH`, and the model rescales itself coherently.

That kind of "one knob to scale the model" parameterization is exactly what makes a search space tractable.

### 3. `program.md`

`program.md` is the shortest of the three files and is arguably the most important. It's the file that we edit and it contains everything the agent needs to know about how to behave during a run.

The structure of `program.md` mirrors the lifecycle of a research session. It opens with **setup,** agrees on a run tag, creates a Git branch named `autoresearch/<tag>`, reads the in-scope files, verifies that the data exists, and initializes a results file. It then describes the experimentation rules, like what the agent can and can't modify, that VRAM is a soft constraint, and crucially a simplicity criterion that says all else being equal, simpler is better.

A 0.001 bpb improvement that adds 20 lines of hacky code isn't worth keeping. A 0.001 bpb improvement that **removes** 20 lines is definitely worth keeping.

Then comes the actual loop. The agent is told to run training with `uv run train.py > run.log 2>&1` and never to use `tee` or stream the output because that would flood the agent's context window. It's also told to extract metrics with `grep "^val_bpb:\|^peak_vram_mb:" run.log`, which gives just the one or two lines that matter.

If the grep produces nothing, that means the run crashed and the agent is told to read the last 50 lines of the log and try to fix the issue (but it should give up after a few attempts and move on). The result of every experiment is logged to `results.tsv`.

The decision rule is simple: if val_bpb improved (got lower) then the agent advances the branch by keeping its commit. If it didn't improve, the agent runs `git reset` to undo the commit. If it crashed, the agent logs that and tries something else.

The last paragraph of `program.md` is the one that makes autoresearch what it is. It's titled **NEVER STOP**. The agent is explicitly told not to ask the human (you) if it should keep going, not to ask for any permissions, and not to pause for confirmation. If the agent runs out of ideas, it should think harder, look at the failures, combine near-misses, and try more radical changes.

The loop runs until we interrupt it. This single instruction is more interesting than any line of Python in the repo. It's the difference between an agent that does a few experiments and asks if you want to continue and an agent that genuinely does autonomous research overnight.

There is no contradiction with the 5 minute budget. 5 minutes governs a single experiment, one training run. The "Never stop" instruction governs the outer loop. The moment one run finishes and the agent logs the result, it launches the next one. It keeps starting fresh 5 minute experiments back-to-back until you interrupt it.

Nothing ever trains for more than five minutes. The agent simply never stops starting new 5 minute trainings.

Now that you understand how it works, let’s start using it.

---

## Setup Guide

I'm assuming you have a single NVIDIA GPU with enough VRAM to run these experiments. Anything with 24GB or more should work with the default settings. Smaller GPUs need some tuning, which I'll cover later on.

### Step 1: Install uv, the Python Project Manager the Repo Uses

uv is much faster than pip and handles virtual environments transparently. After you install it, then clone the repo and install dependencies:

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh

git clone https://github.com/karpathy/autoresearch.git
cd autoresearch
uv sync
```

This will create a <VPIcon icon="fas fa-folder-open"/>`.venv` and install pyTorch, Flash Attention, rustbpe, tiktoken, pyarrow, and a few other packages. It pulls PyTorch from the CUDA 12.8 wheel index, so make sure your driver supports that.

### Step 2: Run the Data Preparation

This downloads 10 ClimbMix shards plus the validation shard and then trains our tokenizer.

```sh
uv run prepare.py
```

It takes about 2 minutes on a decent connection. If you have limited disk space, you can pass `--num-shards 4` for a smaller download. The data and tokenizer get cached in <VPIcon icon="fas fa-folder-open"/>`~/.cache/autoresearch/`.

### Step 3: Run a Manual Training Experiement

Now, you'll run a single training experiment manually, just to confirm that everything works end-to-end.

```sh
uv run train.py
```

You should see the model compile (this takes 30 seconds or so the first time), then training output that looks something like this: `step 00050 (8.3%) | loss: 5.123456 | lrm: 1.00 | dt: 240ms | tok/sec: 2,184,533 | mfu: 39.8% | epoch: 1 | remaining: 275s`.

After about 5 minutes of training, plus an evaluation pass at the end, you'll get the summary block with `val_bpb` printed. That's your baseline.

### Step 4: Hand the Repo to an Agent

In practice, this means opening Claude Code or your tool of choice in the repo directory, ideally with permissions disabled or scoped tightly to the repo, and prompting it with something like this:

```plaintext
Have a look at program.md and let's kick off a new experiment.
Let's do the setup first.
```

The agent will read `program.md`, walk through the setup steps (creating the autoresearch branch and initializing `results.tsv`), confirm with you, and then start running. From this point on, you can leave it alone. When you come back, check `results.tsv` and the Git log on the autoresearch branch.

### Tuning autoresearch for Smaller GPUs

The default configuration assumes an H100. If you have a 4090, 3090, or anything with less than 80GB of VRAM, you'll need to dial things down.

1. Lower the sequence length first: `MAX_SEQ_LEN = 2048` in <VPIcon icon="fa-brands fa-python"/>`prepare.py` is the biggest VRAM lever since attention scales quadratically with it. Try 512 or even 256 on a small GPU and bump `DEVICE_BATCH_SIZE` in <VPIcon icon="fa-brands fa-python"/>`train.py` slightly to compensate. The product of these two is the tokens-per-forward-pass.
2. Lower the depth: `DEPTH = 8` in <VPIcon icon="fa-brands fa-python"/>`train.py` is the master knob for model size. Drop it to 4 on a small GPU and the model dimension automatically scales down with it.
3. Switch the window pattern: `WINDOW_PATTERN = "SSSL"` uses banded attention which is fast on H100 but can be slow on consumer GPUs, depending on the kernel implementation. Just `"L"` (always full attention) is simpler and often faster on smaller cards.
4. Lower the total batch size: `TOTAL_BATCH_SIZE = 2**19` is roughly 524K tokens per optimizer step. On a small GPU, drop it to 2^14 (~16K) to start.
5. Consider switching the dataset: climbMix is a hard broad web corpus. On a tiny model, the loss curve is noisy and bpb numbers are hard to interpret. Karpathy specifically recommends his own TinyStories-GPT4-Clean dataset for small-scale experimentation. The text is narrower in scope (children’s stories) so a small model can actually learn to generate something coherent in 5 minutes.

There are already several community forks that have done the consumer-GPU tuning for you which you can check out in the repo's readme.md file.

---

## What the Agent Actually Finds

It's one thing to describe how the loop works, and another to see what it produces. Karpathy was open about this on Twitter in his depth-12 run: the agent found about 20 changes that improved validation loss, all of which transferred to depth-24. Specific examples from his post-run analysis include adding a learnable scalar to the parameterless QK-norm to sharpen attention, applying regularization to the value embeddings, widening the banded attention window, correcting the AdamW betas for certain parameter groups, tuning weight decay schedules, and adjusting initialization.

None of these would headline a research paper, but all of them showed up as 0.001 to 0.005 bpb improvements that stacked.

So it's not that an AI agent invented a new architecture. It's that the slow patient hill-climbing that real researchers spend months doing can be done by an agent in a couple of days. The result is the same boring detail-tuning that has always been where most of the actual progress in ML comes from.

---

## Final Thoughts

autoresearch doesn't introduce a new model or a new optimizer or a new dataset. It just defines a kind of contract between a human researcher and an AI agent and it shows that the contract can be enough. That contract is something like *“here is the fixed part of reality, the metric that judges you, a budget, and within those rules, do whatever you want and tell me what worked.”*

There are two questions I still ponder that are worth thinking about. One is **overfitting to the validation set**. If you run hundreds of experiments against the same fixed validation shard, eventually the agent will start finding tweaks that look like wins on this shard but don't transfer. Karpathy himself called the results “fragile” in some sessions.

There's no obvious fix here yet beyond rotating validation data which would break comparability.

The other question is **what the human’s role becomes**. If the agent does the experiments, the human’s contribution shifts to shaping the search space and the rules. That is what `program.md` is. It's a pretty good preview of what research looks like when the loop is automated.

Well, that’s it for today. See you folks in my next article!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Agent That Runs its Own LLM Experiments with autoresearch",
  "desc": "A few months ago, Andrej Karpathy released autoresearch. It's an open-source Python tool that lets an AI agent run experiments on one GPU while you sit back and wait for the results. Lately I've still",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-agent-that-runs-its-own-llm-experiments-with-autoresearch.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
