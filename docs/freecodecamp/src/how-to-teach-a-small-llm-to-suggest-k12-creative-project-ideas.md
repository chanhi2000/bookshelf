---
lang: en-US
title: "How to Teach a Small LLM to Suggest K12 Creative Project Ideas"
description: "Article(s) > How to Teach a Small LLM to Suggest K12 Creative Project Ideas"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Teach a Small LLM to Suggest K12 Creative Project Ideas"
    - property: og:description
      content: "How to Teach a Small LLM to Suggest K12 Creative Project Ideas"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-teach-a-small-llm-to-suggest-k12-creative-project-ideas.html
prev: /programming/py/articles/README.md
date: 2026-06-24
isOriginal: false
author:
  - name: Srishti Sethi
    url: https://freecodecamp.org/news/author/srishakatux/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/381c2b8d-ed7d-4f88-b0d4-f4ba90878758.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
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
  name="How to Teach a Small LLM to Suggest K12 Creative Project Ideas"
  desc="Recently, I wrote a post about an educational app I'd developed using AI tools, and the design decisions I made along the way. When I showed the prototype of my activity-based learning app to a few ed"
  url="https://freecodecamp.org/news/how-to-teach-a-small-llm-to-suggest-k12-creative-project-ideas"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/381c2b8d-ed7d-4f88-b0d4-f4ba90878758.png"/>

Recently, I [**wrote a post about an educational app**](/freecodecamp.org/technical-design-decisions-educational-app-llms.md#) I'd developed using AI tools, and the design decisions I made along the way.

When I showed the prototype of my activity-based learning app to a few educators, one suggestion came up repeatedly that was drawn from their own experience hunting for creative ideas on platforms like Pinterest and TikTok. They wanted a feature that could pull project ideas from across the internet based on practical search criteria: the materials they have access to, and what they'd like the end product to look like.

The app already has a basic search that returns results from its own activity data, but that data is still limited at this stage. Generating results from outside the app felt like something LLMs are well suited to handle.

I was also curious to learn how you actually teach a K12 LLM – not the kind that needs enormous datasets and compute (which I don't have access to), but the mechanics of it, for learning's sake. And, like in my previous post, I wanted to think through the design choices that go into it:

- What are the technicalities behind teaching a small LLM to handle a K12 use case?
- How, and on what data, do you train such a model?
- How do you ensure the model is child friendly?
- What does it take to integrate the model into your app?

In this post, I'll document everything I learned about training such a model and integrating it as a feature in my educational prototype.

::: note Prerequisites

This is a hands-on tutorial, so here's what will help you follow along or train the model yourself.

**Skills you'll want**

- Using Claude on the command line.
- Basic Python: reading code, installing and using packages, calling APIs, and making sense of output like log files.
- Reading a bit of TypeScript, since that's what the app's frontend is built in.
- Most importantly, being comfortable following Claude's reasoning, weighing the options it lays out, and deciding what to do next. That back-and-forth, not any single command, is really the core skill this kind of project asks for.

You don't need a background in machine learning. The post tries to explain the ML concepts as it goes, in plain language.

**Setup you'll need**

- An Apple Silicon Mac (M1/M2/M3 or newer). The fine-tuning step uses MLX, Apple's framework, which only runs on Apple Silicon.
- Python 3 with a virtual environment (`python3 -m venv`).
- Ollama installed, with the Qwen 2.5 7B model pulled (`ollama pull qwen2.5:7b`), for generating the training data locally. You'll want enough RAM to run a 7B model.
- Claude on the command line, for working through the build.

:::

---

## Dataset Preparation

For this experiment, I wanted the activity data to be grounded in local cultures from around the world. This would help the model suggest creative project ideas that inspire the facilitation of cultural activities in educational settings.

I'd come across a lot of Wikipedia articles on local arts and traditions over the years. Wikipedia is my favorite resource for information: it's human-first, its content is updated frequently, and as an open source project its APIs are free to use. So I decided to use Wikipedia data to teach my model.

The genuinely hands-on part of this stage was seeding the right categories. In a Python script, I defined ~40 seed categories and grouped them under 9 STEAM labels with suggestions from Claude on which categories to scrape and how to avoid noise in the fetched data.

For extracting text from the sections of each article, Claude suggested a Python wrapper for the Wikipedia API. This let me fetch each article as a section-structured record. To keep noise down, I limited the crawl to one sub-category level deep and only kept articles above a certain content size.

```py
# Seed categories grouped by STEAM domain.
SEED_CATEGORIES = {
    "Crafts & making": [
        "Category:Crafts",
        "Category:Origami",
        "Category:Pottery",
        "Category:Kites",
    ],
    "Arts": [
        "Category:Folk art",
        "Category:Textile arts",
        "Category:Indigenous art",
        "Category:Masks",
    ],
    "Science": [
        "Category:Ethnobotany",
        "Category:Food preservation",
        "Category:Gardening",
    ],                                                            
# ... Media arts, Engineering, Mathematics, Music & sky, Play & learning
}

MAX_DEPTH = 1             # descend only one sub-category level
MIN_CONTENT_CHARS = 800   # skip stubs (summary + sections)
```

---

## Filtering the Corpus

The previous step wrote ~19,000 articles during scraping. This step makes sure the content stays relevant to STEAM topics. Relevance filtering itself runs in two stages: removing obvious noise, then semantic filtering.

The first stage drops obvious non-activity content like music, films, TV, biographies, plant/animal species using category, title, and section-heading patterns.

The second, semantic stage converts each article's title and summary into a vector using a small sentence-transformer model (all-MiniLM-L6-v2). It then compares it against two sets of example sentences: positive and negative anchors.

The positive anchors describe sentences relevant to STEAM activities and the negative anchors describe less relevant ones. Each article gets a score based on how close it sits to the positive examples versus the negative ones, and we keep every article that leans positive. We do this with the sentence-transformers library.

Writing these anchor sentences is the most human step in the process. With this filtering, I brought the corpus down to ~6,600 articles.

```py
# Filtering the raw scrape to articles useful for STEAM activity suggestions.

POSITIVE_ANCHORS = [
    "a hands-on craft that children can make using simple materials and a technique",
    "a traditional cultural art or making technique such as weaving, carving, pottery or paper folding",
]
NEGATIVE_ANCHORS = [
    "a species of plant, animal or fungus",
    "a biography of a person",
    "a city, region, building or geographic place",
]

    # Embed article + anchors, then keep whatever leans positive.
    pos_sim = util.cos_sim(emb, pos).max(dim=1).values # closest positive anchor 
    neg_sim = util.cos_sim(emb, neg).max(dim=1).values # closest negative anchor
    scores = (pos_sim - neg_sim).tolist()
```

---

## Generating Training Pairs

The next step is to generate input → output training pairs from the filtered corpus. We do this by distilling it through a pretrained, local open-source model (Qwen 2.5 7B, running via Ollama).

For each article, you send the model the title, summary, cultural context, and a few content sections. You also send it a system prompt that explains the task, specifies the output format (valid JSON, in this case), and includes one example training pair to anchor the format.

Constructing this prompt well is where human intervention matters most: the schema, the rules, and that single worked example are what determine the quality of every pair the model generates.

After generation, we cleaned and prepared the pairs for fine-tuning. The local model tended to invent its own category labels ("Ceramics," "Crafts & Making," "Circuits (metaphorical)"…). So this step maps every category onto the app's fixed set of 10 canonical categories (Art, Science, Coding, Circuits, Engineering, Storytelling, Drama, Film, Music, Nature), clamps each activity's age range into the K12 band, converts the pairs into chat format, and finally splits the data into three sets: train, validate, and test.

```json
# The schema every generated training pair must match (valid JSON only).
  {
    "input": {
      "materials": ["3-6 realistic classroom materials"],
      "age_range": [min_int, max_int],
      "theme": "optional string or null"
    },
    "output": {
      "ideas": [{
        "title": "catchy, max 60 chars",
        "description": "2-3 sentences",
        "category": "one of: Art, Science, Coding, Circuits, Engineering, ...",
        "cultural_origin": "specific region or culture",
        "materials_used": ["subset of input materials"],
        "materials_missing": ["anything else needed"],
        "estimated_minutes": integer,
        "steps": ["3-6 short steps, one sentence each"],
        "learning_objectives": ["2-4 objectives"],
        "safety_note": "string or null"
      }]
    }
  }
```

---

## Fine-Tuning

This is the step where the model learns how to behave and generate a desired response in the appropriate format. It involves fine-tuning a pretrained model (Qwen2.5-1.5B-Instruct-4bit in this case) via MLX on my dataset using the LoRA technique.

Fine-tuning with LoRA is a cheap and lightweight approach: it doesn't retrain the whole model, but instead adds a tiny correction layer that adjusts the final behavior while the original model stays frozen.

Given the constraints of this project, working on a personal laptop with a small dataset of ~400 pairs, full fine-tuning would have needed significantly more memory and compute, which would be overkill here. So LoRA was the right choice.

### The LoRA Fine-tuning Cycle:

![Flowchart showing the LoRA fine-tuning cycle](https://cdn.hashnode.com/uploads/covers/6a172a9fbadcd8afcb11f314/bb1b995b-ff56-4364-8246-c885449c7399.png)

Training runs many iterations over the training pairs, and each iteration is the same short cycle. For each input, the model produces a prediction by assigning a probability score to every possible next word, based on the input and the model's current weights. During training it is then graded on how much probability it gave the actual correct next word from the training data.

(Note: in a neural network, [<VPIcon icon="fa-brands fa-youtube"/>weights and biases](https://youtu.be/nEt5_8V_wpY) are the numbers that determine how the model processes an input, makes a prediction, and generates a response.).

From that comparison it calculates the train loss. It then updates the weights accordingly, specifically the small LoRA adapter weights, while the frozen base model stays untouched, so that next time the guess is a little closer. The lower the loss, the better the model is fitting the data.

Then it moves on to the next iteration, and the cycle repeats. At the end, the trained adapter weights are saved out to a safetensors file.

For example, here is how the validation loss moved over my run: 2.532 → 0.842 → 0.823 → 0.814 → 0.820 → 0.831 → 0.845. It dropped sharply at first (the model was genuinely learning), bottomed out at 0.814 around iteration 300, then ticked back up to 0.845 by the end. This was early sign that the model was starting to overfit, that is memorize the training data rather than continue improving.

So the sweet spot was the middle of the run, not the very end. This is where human review mattered most: I saved checkpoints at iterations 200, 400, and 600, and chose the 400 checkpoint, the one with the lowest validation loss among them, to evaluate and serve.

```yaml
# Base model — small, instruction-tuned, 4-bit (runs on a laptop)
  model: "mlx-community/Qwen2.5-1.5B-Instruct-4bit"

  train: true
  data: "data/mlx"            # training data: train.jsonl + valid.jsonl
  adapter_path: "adapters"    # <- the trained LoRA weights get saved here

  fine_tune_type: lora
  num_layers: 8               # apply LoRA to the last 8 transformer layers only
  lora_parameters:
    rank: 8                   # adapter size — bigger = more capacity, more overfit risk

  # Training loop
  batch_size: 4               # 400 train examples / 4 = 100 iterations per epoch
  iters: 600                  # ~6 passes over the training set
  learning_rate: 1e-5

  # Watch validation loss to catch overfitting
  steps_per_eval: 100         # check validation loss every 100 steps
  save_every: 200             # checkpoint adapters at 200 / 400 / 600
```

Above is the configuration file. It shows the model used, the adapter path, the fine-tuning and LoRA settings, the training loop, and the validation pass.

Below is the command, run with MLX (Apple's machine learning framework), that kicks off the fine-tuning process:

```sh
mlx_lm.lora --config lora_config.yaml
```

The output below shows the result: the trained weights land in the <VPIcon icon="iconfont icon-folder-open"/>`adapters/` folder, with a checkpoint saved every 200 iterations at 200, 400, and 600.

```sh
adapters/
├── 0000200_adapters.safetensors
├── 0000400_adapters.safetensors   # the one you serve (lowest val loss of the three)
├── 0000600_adapters.safetensors
└── adapters.safetensors           # copy of the final (600) weights
```

---

## Evaluating the Fine-tuned Model

Once fine-tuning was done, the model needed to be evaluated on the held-out test set, the 50 examples set aside during the training-pair generation step and never seen during training.

In this step, the user message is fed to the model, the model generates its own JSON answer, and that answer is compared against the gold (correct/reference) answer already stored in the file.

The evaluation checks and reports whether the JSON is valid, whether it has the expected keys, how much the predicted materials overlap with the gold answer, how often the prediction names a specific cultural origin, and so on.

It runs this for every example in the test set, printing a short per-example line and a summary at the end. It saves the full results, including each predicted idea alongside the actual (gold) idea, so you can read them side by side.

```json
// Fine-tuned model on 50 held-out test examples:
{
  "json_valid_rate":            1.00,   // always valid JSON
  "schema_match_rate":          1.00,   // always the right keys
  "avg_n_steps":                4.74,   // ~5 steps per idea
  "avg_materials_jaccard":      0.653,  // decent overlap with gold materials
  "pred_culture_specific_rate": 0.52,   // names a specific culture about half the time
  "culture_loose_match_rate":   0.108,  // but it's usually the WRONG one  <-- the gap RAG tries to close
}
```

---

## Building the Index & RAG Retrieval

In the previous step we found that `culture_loose_match_rate_when_gold_specific` was low: the model is bad at recalling the right cultural origin for a suggested activity.

In this step, we'll try to address that weakness with RAG (retrieval-augmented generation). Instead of hoping that the model has memorized that Raku is Japanese, we'll look up the real Wikipedia article at query time, hand it to the model, and then test whether retrieval actually helps.

This happens in two parts. First, we'll build a retrieval index, turning the Wikipedia corpus we collected earlier into a searchable "meaning database." For each article we compute an embedding by passing its title and summary through a small embedding model, all-MiniLM-L6-v2. An embedding is a numeric fingerprint of meaning, a row of 384 numbers, and articles with similar meaning end up with similar numbers. These are computed once, offline, and saved to disk.

Second comes the retrieval itself. At query time, we turn the query into the same kind of vector, score every article by how similar it is, and return the few with the highest scores (that is, the articles whose meaning is closest to what the user asked for). We then run the same evaluation as the previous phase, but with these retrieved articles pasted into the prompt, to answer the core question: when the model is handed the right Wikipedia article, does it do better?

In a nutshell, this phase is: retrieve the relevant articles, augment the prompt with them, and let the model generate.

```py
def retrieve(query, embedder, embeddings, meta, k):
    # 1. turn the query into the same kind of 384-number vector
    q = embedder.encode([query], normalize_embeddings=True,
                        convert_to_numpy=True)[0]
    # 2. score every article by similarity (dot product of unit vectors = cosine)
    sims = embeddings @ q
    # 3. take the k closest, return them with their scores
    top = np.argsort(-sims)[:k]
    return [(meta[i], float(sims[i])) for i in top]
```

So with RAG, the materials overlap improved and the model named a specific culture more often – but the exact cultural match barely moved. This is something I would like to improve in future versions of the app.

```plaintext
Metric                        Plain     + RAG     Change
materials_jaccard             0.653     0.752     better
pred_culture_specific_rate    0.52      0.64      better
culture_loose_match_rate      0.108     0.135     barely
```

---

## Integrate the Model with the Feature

Now it's time to integrate the fine-tuned model into the app and see what cultural activities it can generate to inspire educators.

The end-to-end flow starts on a "Suggest" screen, where an educator enters the materials they have on hand and, optionally, a theme for the activity. From there, the suggestion happens in two phases: retrieval, then generation.

First, the app does a vector search over the Wikipedia index and populates a grid of culturally-specific articles that match the educator's input. No model is involved, so the grid appears instantly.

Then, when you tap a card, you land on a detail screen where the fine-tuned model generates a full STEAM activity grounded in that single tradition: a title, description, materials, step-by-step instructions, learning objectives, and a safety note. Everything needed to guide the activity in the classroom.

```ts
 // Step 1 — RETRIEVAL: educator's materials -> grid of cultural articles.
  // Pure vector search on the server, no model, so the grid appears instantly.
  export async function fetchInspiration(materials: string[], theme?: string) {
    const res = await fetch(`${BASE_URL}/suggest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materials, theme: theme ?? null }),
    });
    return res.json();   // { results: [...articles] }
  }

  // Step 2 — GENERATION: runs only when the educator taps ONE card.
  // The fine-tuned model generates a full activity grounded in that article.
  export async function fetchActivity(
    articleId: number,
    materials: string[],
    ageRange: [number, number],
  ) {
    const res = await fetch(`${BASE_URL}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article_id: articleId, materials, age_range: ageRange }),
    });
    return res.json();   // { activity: {...}, article: {...} }
  }
```

Splitting browsing from generation this way is both a cost and a quality choice: retrieval is essentially free, so the model runs just once on the tradition the educator actually commits to, rather than once for every card on the grid.

![Screenshots showing steps to generate cultural STEAM activities using the app](https://cdn.hashnode.com/uploads/covers/6a172a9fbadcd8afcb11f314/b56489af-0450-48eb-b8f6-04c7a1a15781.png)

---

## Making Content Safe

I wanted to talk about this topic explicitly at the end, even though many phases of the pipeline already involve steps to keep the model's content safe.

Even though the direct users of the app are educators, anything this feature produces can end up in front of kids. So we never want to surface or generate steps for intoxicants, drugs, tobacco, weapons, explosives, or poisons – basically any content that isn't age-appropriate.

This is something the model won't automatically handle on its own. The fine-tuned model was trained only on cultural-craft examples, so it has no built-in instinct to refuse an unsafe request, and the general knowledge of things like alcohol and weapons still lives in the base model's weights underneath.

As a builder, you have to put the necessary guards and checkpoints in place, and remind the model how to behave. We do this in two phases:

- Pre-filter the data to reduce risk at the source, the same way we dropped unrelated categories earlier. Screening the corpus (and the generated training pairs) means we never teach the model unsafe content in the first place. This matters especially if you ever plan to publish your model or dataset somewhere like Hugging Face, where it should already be filtered. This step removed ~850 unsafe articles from the ~19,000 scraped.
- Keep runtime guardrails in the ZubHub app as the actual guarantee. Because data filtering reduces risk but can't erase what the base model already knows, the live app screens every input before retrieval and every generated output before display. This means that nothing built around unsafe terms is ever retrieved or shown.

```py
# safety.py — one shared list of what we never surface to kids...
  UNSAFE_TERMS = { 
      # ...
  }

  # ...matched whole-word, so "twine" != "wine" and "gunny sack" != "gun".
  def screen_text(text):
      """Return the first unsafe category found, or None if the text is clear."""
      for category, pattern in _PATTERNS.items():   # _PATTERNS built from UNSAFE_TERMS
          if pattern.search(text):
              return category
      return None

  # Phase 1, data: drop unsafe articles before they ever reach training.
  for article in corpus:
      if screen_text(article["title"] + article["summary"]):
          continue                      # never taught to the model

  # Phase 2, runtime: screen the educator's input AND the model's output.
  if screen_text(user_input):           # before retrieval
      return BLOCK_MESSAGE
  answer = model.generate(...)
  if screen_text(answer):               # before anything is shown
      return BLOCK_MESSAGE
```

---

## Conclusion

In a nutshell, this article walked through how you teach a small LLM to suggest creative, hands-on projects for an educational app.

We started from a pretrained model, Qwen2.5-1.5B-Instruct, and taught it on a dataset we built from Wikipedia's STEAM and cultural articles.

The goal was to get it to take a simple input (the materials an educator has, the children's age range, and an optional theme) and respond with a structured JSON activity: a title, description, step-by-step instructions, learning objectives, and a safety note.

Along the way, we worked through the technicalities of adapting a small LLM for a K12 use case end to end: building the dataset with the Wikipedia API, filtering out irrelevant categories and unsafe content, generating training pairs, fine-tuning the model with LoRA, evaluating its quality, building a retrieval index and adding RAG to make the suggestions more grounded and specific, and finally integrating the model into the app.

Most importantly, building it this way as a hands-on project is what made the core ideas of the ML/LLM space click for me, rather than staying abstract. I hope it does the same for you!

::: info Resources

Check out the source code in this [specific PR (<VPIcon icon="iconfont icon-github"/>`unstructuredstudio/zubhub-mobile`)](https://github.com/unstructuredstudio/zubhub-mobile/commit/296729c6bf981b0aa4ed6418f7c771a667170e77).

<SiteInfo
  name="Merge pull request #1 from unstructuredstudio/ml-idea-model · unstructuredstudio/zubhub-mobile@296729c"
  desc="ML idea model and app integration to suggest K12 creative STEAM activities"
  url="https://github.com/unstructuredstudio/zubhub-mobile/commit/296729c6bf981b0aa4ed6418f7c771a667170e77"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/dc070e9a7c8b6d89796d03896963c76fd8cac6a247c738298be4cdb62f3ca9b4/unstructuredstudio/zubhub-mobile/commit/296729c6bf981b0aa4ed6418f7c771a667170e77"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Teach a Small LLM to Suggest K12 Creative Project Ideas",
  "desc": "Recently, I wrote a post about an educational app I'd developed using AI tools, and the design decisions I made along the way. When I showed the prototype of my activity-based learning app to a few ed",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-teach-a-small-llm-to-suggest-k12-creative-project-ideas.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
