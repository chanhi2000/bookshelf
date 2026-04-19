---
lang: en-US
title: "How to Build Your Own Language-Specific LLM [Full Handbook]"
description: "Article(s) > How to Build Your Own Language-Specific LLM [Full Handbook]"
icon: fas fa-language
category:
  - Python
  - PyTorch
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-model
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own Language-Specific LLM [Full Handbook]"
    - property: og:description
      content: "How to Build Your Own Language-Specific LLM [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-language-specific-llm-handbook/
prev: /ai/llm/articles/README.md
date: 2026-04-25
isOriginal: false
author:
  - name: Wisamul Haque
    url: https://freecodecamp.org/news/author/Wisamulhaque/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bbdca07e-40a3-4b6e-955f-9573f895154a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/llm/articles/README.md",
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
  name="How to Build Your Own Language-Specific LLM [Full Handbook]"
  desc="What if you could build your own LLM, one that speaks your native language, all from scratch? That's exactly what we'll do in this tutorial. The best way to understand how LLMs work is by actually bui"
  url="https://freecodecamp.org/news/how-to-build-your-own-language-specific-llm-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/bbdca07e-40a3-4b6e-955f-9573f895154a.png"/>

What if you could build your own LLM, one that speaks your native language, all from scratch? That's exactly what we'll do in this tutorial. The best way to understand how LLMs work is by actually building one.

We'll go through each step of creating your own LLM in a specific language (Urdu in this case). This will help you understand what goes on inside an LLM.

Modern LLMs trace back to the research paper that changed everything: [<VPIcon icon="iconfont icon-arxiv"/>"Attention Is All You Need"](https://arxiv.org/abs/1706.03762). But rather than getting lost in the math (I am bad at math, sadly), we'll learn by building one from scratch.

::: info Who is This Handbook For?

Software engineers, product owners, or anyone curious about how LLMs work. If you have a little machine learning knowledge, that would be great, but if not, no worries. I've written this so that you don't have to go anywhere outside this tutorial.

By the end, you will have a **working Urdu LLM chatbot** deployed and running. You can create one for your own native language as well by following the steps defined below.

:::

::: note A Note on Expectations:

The goal here is to educate ourselves on how LLMs work by practically going through all the steps.

The goal is **not** that your LLM will act like ChatGPT. That has multiple constraints like massive datasets, months of training, and reinforcement learning from human feedback (RLHF), all of which you'll understand better by going through this tutorial.

:::

::: note A Note on the Code:

The code in this tutorial was largely generated using Claude Opus 4. This is worth highlighting because it shows that LLMs are not just coding assistants that help you ship features faster. They can also be powerful learning tools.

By prompting Claude to generate, explain, and iterate on each component, I was able to understand the internals of LLM training far more deeply than reading documentation alone.

If you're following along, I encourage you to do the same: use an LLM for your learning.

:::

### What We'll Cover:

- [1. Data Preparation](#heading-1-data-preparation)
- [2. Tokenization](#heading-2-tokenization)
- [3. Pre-Training](#heading-3-pre-training)
- [4. Supervised Fine-Tuning (SFT)](#heading-4-supervised-fine-tuning-sft)
- [5. Deployment](#heading-5-deployment)

---

## Components of LLM Training

In this tutorial, we'll be covering the following components one by one with code examples for better understanding:

1. Data Preparation
2. Tokenization
3. Pre-Training
4. Supervised Fine-Tuning (SFT)
5. Deployment

### Tech Stack Required

Before starting the steps, here is the tech stack you need:

1. Python 3.9+
2. PyTorch
3. Tokenizers / SentencePiece
4. Hugging Face Datasets & Hub
5. regex, BeautifulSoup4, requests (for data cleaning)
6. tqdm, matplotlib (for training utilities)
7. Gradio (for chat UI deployment)
8. Google Colab (free T4 GPU for training)

::: note

Make sure to install all the dependencies listed in the <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file of the repository before getting started.

:::

---

## 1. Data Preparation

In data preparation, the first and foremost step is **data collection**. An LLM needs to be trained on a large amount of text data. There is no single place to get this data. Depending on the type of model you want to build, you can collect text from many sources:

- **Digital libraries and archives:** [<VPIcon icon="fas fa-globe"/>Internet Archive](https://archive.org/) or Wikipedia dumps
- **Code repositories:** GitHub, GitLab (useful if your model needs to understand code)
- **Web scraping:** Crawling websites, blogs, and forums using automated scripts
- **Academic datasets:** Research papers, open-access journals
- **Pre-built datasets:** Platforms like [<VPIcon icon="iconfont icon-huggingface"/><VPIcon icon="iconfont icon-kaggle"/>Hugging Face Datasets](https://huggingface.co/datasets) and [<VPIcon icon="iconfont icon-kaggle"/>Kaggle](https://kaggle.com/datasets) host thousands of ready-to-use datasets

In practice, large-scale LLMs like GPT and LLaMA rely heavily on web scraping from many sources using automated pipelines. But there's one important rule to follow: **only use publicly available, open-source data.** Don't scrape private or personal user information. Stick to data that's explicitly shared for public use or falls under permissive licenses.

**Also,** keep this principle in mind: **garbage in, garbage out**. Just getting the data isn't enough. It should be correct, clean, and without noise.

In actual practice, you can collect data from different sources. In my case, I found good enough data from **Hugging Face**. Hugging Face has [<VPIcon icon="iconfont icon-huggingface"/>CulturaX](https://huggingface.co/datasets/uonlp/CulturaX) that has multilingual datasets. The dataset was huge, so I didn't download all of it and only downloaded a small portion.

For this tutorial, I used **Hugging Face** as my data source. I chose it for a few reasons.

First, since the goal was to learn how LLMs work, I wanted to spend my time on the model, not on writing web scrapers. Hugging Face already has a large collection of datasets in a cleaned and structured format, which saves a lot of upfront work.

Second, Hugging Face offers language-specific datasets. Since I was building an Urdu LLM, I needed Urdu text specifically, and Hugging Face has [<VPIcon icon="iconfont icon-huggingface"/>**CulturaX**](https://huggingface.co/datasets/uonlp/CulturaX) which provides multilingual datasets including Urdu and many other languages. The dataset was huge, so I avoided downloading all of it and only downloaded a small portion.

**Important:** Before you start downloading the dataset from Hugging Face, you need to create an account. Then log into the CLI, from where you'll be able to download the dataset.

In the script below, we load the dataset from Hugging Face and turn streaming to `True`. The purpose of doing this is so that we don't have to download all the data but only chunks of samples as defined in `NUM_SAMPLES`.

```py
# ============================================================
# Option A: Download from CulturaX (recommended, high quality)
# ============================================================
# CulturaX is a cleaned version of mC4 + OSCAR
# We stream it to avoid downloading the entire dataset

NUM_SAMPLES = 100_000  # Start with 100K samples (~50-100MB text)

print("Loading CulturaX Urdu dataset (streaming)...")
dataset = load_dataset(
    "uonlp/CulturaX",
    "ur",                    # Urdu language code
    split="train",
    streaming=True,          # Don't download everything
    trust_remote_code=True
)

# Collect samples
raw_texts = []
for i, sample in enumerate(tqdm(dataset, total=NUM_SAMPLES, desc="Downloading")):
    if i >= NUM_SAMPLES:
        break
    raw_texts.append(sample["text"])

print(f"\nDownloaded {len(raw_texts)} samples")
print(f"Total characters: {sum(len(t) for t in raw_texts):,}")
print(f"\nSample text (first 500 chars):")
print(raw_texts[0][:500])
```

### Data Cleaning

Simply having the data is not enough to start training your model. The next step is probably the most important one: **data cleaning**. The goal is to make the data as pure as possible.

As I was building a language-specific Urdu LLM, I had to write cleaning logic to remove non-Urdu text, HTML links, special characters, duplicate content, and excess whitespace. All these factors pollute the training data and can cause issues during training.

Based on the type of dataset, some language-specific or use-case cleaning will be required.

One thing that might be new to you is the **NFKC Unicode normalization** step. This normalizes text that appears the same but exists in different Unicode forms, keeping one canonical form.

You'll also see some regex patterns that are used to keep only the Urdu text. As Urdu script is based on Arabic, we'll use Arabic Unicode ranges. I also removed artifacts like `//`, `--`, and extra empty spaces that were present in the raw data.

This cleaning took multiple iterations. I reviewed the results manually each time and identified issues like inconsistent spacing, long dashes, and stray punctuation. All of these can negatively impact the next stages, so it's important to clean thoroughly.

This also gives you an idea of how important the data part still is and how much LLMs depend on data.

Here is the cleaning function I used:

```py :collapsed-lines
def clean_urdu_text(text: str) -> str:
    """
    Clean a single Urdu text document.
    
    Steps:
    1. Remove URLs
    2. Remove HTML tags and entities
    3. Remove email addresses
    4. Normalize Unicode (NFKC normalization)
    5. Remove non-Urdu characters (keep Urdu + punctuation + digits)
    6. Normalize repeated punctuation (۔۔۔, ..., - -, etc.)
    7. Normalize whitespace
    """
    import unicodedata
    
    # Step 1: Remove URLs
    text = re.sub(r'https?://\S+|www.\S+', '', text)
    
    # Step 2: Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove HTML entities
    text = re.sub(r'&[a-zA-Z]+;', ' ', text)
    text = re.sub(r'&#\d+;', ' ', text)
    
    # Step 3: Remove email addresses
    text = re.sub(r'\S+@\S+', '', text)
    
    # Step 4: Unicode normalization (NFKC)
    # This normalizes different representations of the same character
    text = unicodedata.normalize('NFKC', text)
    
    # Step 5: Keep only Urdu characters, basic punctuation, digits, and whitespace
    # Urdu Unicode ranges + Arabic punctuation + Western digits + basic punctuation
    urdu_pattern = regex.compile(
        r'[^'
        r'\u0600-\u06FF'    # Arabic (includes Urdu)
        r'\u0750-\u077F'    # Arabic Supplement
        r'\u08A0-\u08FF'    # Arabic Extended-A
        r'\uFB50-\uFDFF'    # Arabic Presentation Forms-A
        r'\uFE70-\uFEFF'    # Arabic Presentation Forms-B
        r'0-9۰-۹'           # Western and Eastern Arabic-Indic digits
        r'\s'               # Whitespace
        r'۔،؟!٪'           # Urdu punctuation (full stop, comma, question mark, etc.)
        r'.,:;!?-\(\)"\']'  # Basic Latin punctuation
    )
    text = urdu_pattern.sub(' ', text)
    
    # Step 6: Normalize repeated punctuation
    text = re.sub(r'۔{2,}', '۔', text)
    text = re.sub(r'.{2,}', '.', text)
    text = re.sub(r'-\s*-+', '-', text)
    text = re.sub(r'-{2,}', '-', text)
    text = re.sub(r'،{2,}', '،', text)
    text = re.sub(r',{2,}', ',', text)
    text = re.sub(r'\s+[۔.-,،]\s+', ' ', text)
    
    # Step 7: Normalize whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)  # Max 2 newlines
    text = re.sub(r'[^\S\n]+', ' ', text)    # Collapse spaces (but keep newlines)
    text = text.strip()
    
    return text


def is_mostly_urdu(text: str, threshold: float = 0.5) -> bool:
    """
    Check if text is mostly Urdu characters.
    This filters out documents that are primarily English/other languages.
    
    threshold: minimum fraction of characters that must be Urdu
    """
    if len(text) == 0:
        return False
    urdu_chars = len(regex.findall(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]', text))
    return (urdu_chars / len(text)) > threshold


# Test the cleaning function
sample = raw_texts[0]
print("=== BEFORE CLEANING ===")
print(sample[:300])
print("\n=== AFTER CLEANING ===")
cleaned = clean_urdu_text(sample)
print(cleaned[:300])
print(f"\nIs mostly Urdu: {is_mostly_urdu(cleaned)}")
```

After cleaning, I stored the data in two formats: a **text file** (used for tokenizer training) and a **JSONL file** (used for pre-training). Each format serves a specific purpose in the upcoming steps.

---

## 2. Tokenization

The next step after cleaning is **tokenization**. Tokenization converts text into numbers, and provides a way to convert those numbers back into text.

This is necessary because neural networks can't understand text – they only understand numbers. So tokenization is essentially a translation layer between human language and what the model can process.

For example:

```plaintext
"hello world"  →  ["hel", "lo", " world"]  →  [1245, 532, 995]
"اردو زبان"   ←  ["ار", "دو", "زب", "ان"]  ←  [412, 87, 953, 201]
```

### Tokenization Approaches

There are three main approaches to tokenization:

#### Approach 1: Character-level

With this approach, you split text into individual characters:

- `hello` -> `['h', 'e', 'l', 'l', 'o']`
- `اردو` -> `['ا', 'ر', 'د', 'و']`

The problem is that sequences become very long. A 1000-word document might be 5000+ tokens. The model has to learn to combine characters into words, which is very hard.

#### Approach 2: Word-level

In this approach, you split based on spaces between words:

- `hello how are you` -> `['hello', 'how', 'are', 'you']`
- `اردو بہت اچھی زبان ہے` -> `['اردو', 'بہت', 'اچھی', 'زبان', 'ہے']`

This problem is that a language's vocabulary is huge (Urdu has 100K+ unique words, English has 170K+). The model can't handle new or rare words (the out-of-vocabulary problem).

#### Approach 3: Subword using BPE (Byte Pair Encoding)

With this approach, the model learns common character sequences from data.

- `unhappiness` might split as `['un', 'happi', 'ness']`
- `مکمل` might split as `['مکم', 'ل']` or stay whole if common enough.

This is a smaller vocabulary (we use 32K tokens), and it can handle any word, even new ones. Common words stay as single tokens.

BPE is the industry standard, used by GPT, LLaMA, and most modern LLMs. Here is how it works step by step:

1. **Start with characters**: vocabulary = all individual characters
2. **Count pairs**: find the most frequent adjacent pair of tokens
3. **Merge**: combine that pair into a new token
4. **Repeat**: until vocabulary reaches desired size

Here's an example:

```plaintext
Start:  ا ر د و   ز ب ا ن
Merge 1: 'ا ر' -> 'ار'    (most common pair)
Result: ار د و   ز ب ا ن
Merge 2: 'ز ب' -> 'زب'    (next most common)
Result: ار د و   زب ا ن
...and so on for 32,000 merges
```

This is the approach we'll use for our Urdu LLM. I trained a BPE tokenizer with a vocabulary size of 32K tokens on the cleaned Urdu corpus.

### Special Tokens

Along with BPE, we also need to add some **special tokens**. These tokens give the model structural information it needs during training and inference.

| Token | Purpose | Why It Is Needed |
| --- | --- | --- |
| `<pad>` | Padding for equal-length sequences | Batching requires all sequences to be the same length. Shorter sequences are filled with `<pad>` tokens. |
| `<unk>` | Unknown word fallback | If the model encounters a token not in the vocabulary, it maps to `<unk>` instead of failing. |
| `<bos>` | Marks the start of a sequence | Tells the model where the input begins, leading to more stable generation. |
| `<eos>` | Marks the end of a sequence | Tells the model when to stop generating. Without it, output may run forever or stop randomly. |
| `<sep>` | Separates segments | In chat format, separates the system prompt, user message, and assistant response so the model knows which role is which. |
| `< | user | >` |
| `< | assistant | >` |
| `< | system | >` |

### BPE Tokenizer Configuration

I set vocab size to **32K**. What does that mean? It means the model will have 32K tokens in its vocabulary lookup table.

This is a good balance between language coverage and model size. If we increase vocab size, the embedding layer and output layer both grow, which means more parameters to train. For a learning project, 32K keeps things manageable.

`MIN_FREQUENCY` is set to 2, meaning a token must appear at least twice in the corpus to be included. This filters out one-off noise tokens that would waste vocabulary slots.

**For reference:** GPT-2 uses a vocabulary of 50K tokens, and LLaMA uses 32K. Our choice of 32K is in line with production models.

```py
VOCAB_SIZE = 32_000  # Number of tokens in our vocabulary
MIN_FREQUENCY = 2    # Token must appear at least twice (filters noise)

# Special tokens - these have reserved IDs
SPECIAL_TOKENS = [
    "<pad>",    # ID 0: padding
    "<unk>",    # ID 1: unknown
    "<bos>",    # ID 2: beginning of sequence 
    "<eos>",    # ID 3: end of sequence
    "<sep>",    # ID 4: separator (for chat format)
    "<|user|>",     # ID 5: user turn marker (for chat)
    "<|assistant|>", # ID 6: assistant turn marker (for chat)
    "<|system|>",    # ID 7: system prompt marker (for chat)
]
```

### Building the Tokenizer

Next up is creating the tokenizer using the cleaned text file we created earlier. First, we'll import the required libraries and set up the file paths:

```py
import os
from pathlib import Path
from tokenizers import (
    Tokenizer,
    models,
    trainers,
    pre_tokenizers,
    decoders,
    processors,
    normalizers,
)

PROJECT_ROOT = Path(".").resolve().parent
CLEANED_DIR = PROJECT_ROOT / "data" / "cleaned"
TOKENIZER_DIR = PROJECT_ROOT / "tokenizer" / "urdu_tokenizer"
TOKENIZER_DIR.mkdir(parents=True, exist_ok=True)

CORPUS_FILE = str(CLEANED_DIR / "urdu_corpus.txt")
print(f"Corpus file: {CORPUS_FILE}")
print(f"Tokenizer output: {TOKENIZER_DIR}")

# Verify corpus exists
assert os.path.exists(CORPUS_FILE), f"Corpus not found at {CORPUS_FILE}. Run notebook 01 first!"
file_size_mb = os.path.getsize(CORPUS_FILE) / 1024 / 1024
print(f"Corpus size: {file_size_mb:.1f} MB")
```

Now we'll configure the tokenizer components:

```py
# ============================================================
# Build the tokenizer
# ============================================================

# Step 1: Create a BPE model (the core algorithm)
tokenizer = Tokenizer(models.BPE(unk_token="<unk>"))

# Step 2: Add normalizer (text cleaning before tokenization)
# NFKC normalizes Unicode (e.g., different forms of the same Arabic letter)
tokenizer.normalizer = normalizers.NFKC()

# Step 3: Pre-tokenizer (how to split text before BPE)
# We use Metaspace which replaces spaces with ▁ and splits on them
# This preserves space information so we can reconstruct the original text
tokenizer.pre_tokenizer = pre_tokenizers.Metaspace()

# Step 4: Decoder (how to convert tokens back to text)
# Metaspace decoder converts ▁ back to spaces
tokenizer.decoder = decoders.Metaspace()

# Step 5: Configure the trainer
trainer = trainers.BpeTrainer(
    vocab_size=VOCAB_SIZE,
    min_frequency=MIN_FREQUENCY,
    special_tokens=SPECIAL_TOKENS,
    show_progress=True,
    initial_alphabet=[]  # Learn alphabet from data
)

print("Tokenizer configured. Ready to train!")
```

### Training the Tokenizer

Once the tokenizer is configured, the next step is to run it. This will take roughly 5 to 10 minutes depending on your device.

```py
print("Training tokenizer... (this may take a few minutes)")
tokenizer.train([CORPUS_FILE], trainer)

print(f"\n Tokenizer trained!")
print(f"  Vocabulary size: {tokenizer.get_vocab_size():,}")
```

### Configuring Post-Processing (Auto-Wrapping with BOS/EOS)

Next, we'll configure post-processing so the tokenizer automatically wraps every sequence with `<bos>` and `<eos>` tokens. This means we don't have to manually add them each time we encode text:

```py
bos_id = tokenizer.token_to_id("<bos>")
eos_id = tokenizer.token_to_id("<eos>")

tokenizer.post_processor = processors.TemplateProcessing(
    single=f"<bos>:0 $A:0 <eos>:0",
    pair=f"<bos>:0 \(A:0 <sep>:0 \)B:1 <eos>:1",
    special_tokens=[
        ("<bos>", bos_id),
        ("<eos>", eos_id),
        ("<sep>", tokenizer.token_to_id("<sep>")),
    ],
)

print("Post-processor configured (auto-adds <bos> and <eos>)")
```

**Note:** You might wonder why we need this step when we already defined `<bos>` and `<eos>` in `SPECIAL_TOKENS`. The `SPECIAL_TOKENS` list only **reserves vocabulary slots** for these tokens (assigns them IDs). Post-processing tells the tokenizer to **automatically insert** them into every encoded sequence.

Without this step, the tokens would exist in the vocabulary but never appear in your data unless you added them manually each time.

### Testing the Tokenizer

The final step in tokenization is to test it. The test encodes Urdu sentences into token IDs, then decodes those IDs back into text. If the decoded text matches the original input, the tokenizer is working correctly. This roundtrip test confirms that no information is lost during encoding and decoding:

```py
test_sentences = [
    "اردو ایک بہت خوبصورت زبان ہے",           # "Urdu is a very beautiful language"
    "پاکستان کا دارالحکومت اسلام آباد ہے",      # "The capital of Pakistan is Islamabad"
    "آج موسم بہت اچھا ہے",                     # "The weather is very nice today"
    "مصنوعی ذہانت مستقبل کی ٹیکنالوجی ہے",     # "AI is the technology of the future"
    "السلام علیکم! آپ کیسے ہیں؟",               # "Peace be upon you! How are you?"
]

print("=" * 70)
print("TOKENIZER TEST RESULTS")
print("=" * 70)

for sentence in test_sentences:
    encoded = tokenizer.encode(sentence)
    decoded = tokenizer.decode(encoded.ids)
    
    print(f"\n Input:    {sentence}")
    print(f" Token IDs: {encoded.ids}")
    print(f"  Tokens:   {encoded.tokens}")
    print(f" Decoded:  {decoded}")
    print(f"   Num tokens: {len(encoded.ids)}")
    print(f"   Roundtrip OK: {sentence in decoded}")
    print("-" * 70)
```

Here is what the output looks like:

```plaintext
======================================================================
TOKENIZER TEST RESULTS
======================================================================

 Input:    اردو ایک بہت خوبصورت زبان ہے
 Token IDs: [2, 1418, 324, 431, 2965, 1430, 276, 3]
 Tokens:   ['<bos>', '▁اردو', '▁ایک', '▁بہت', '▁خوبصورت', '▁زبان', '▁ہے', '<eos>']
 Decoded:  اردو ایک بہت خوبصورت زبان ہے
   Num tokens: 8
   Roundtrip OK: True
----------------------------------------------------------------------

 Input:    پاکستان کا دارالحکومت اسلام آباد ہے
 Token IDs: [2, 474, 289, 3699, 616, 1004, 276, 3]
 Tokens:   ['<bos>', '▁پاکستان', '▁کا', '▁دارالحکومت', '▁اسلام', '▁آباد', '▁ہے', '<eos>']
 Decoded:  پاکستان کا دارالحکومت اسلام آباد ہے
   Num tokens: 8
   Roundtrip OK: True
```

Notice how `<bos>` and `<eos>` are automatically added (thanks to our post-processing step), common Urdu words like `پاکستان` stay as single tokens, and the `▁` prefix marks word boundaries from the Metaspace pre-tokenizer. Most importantly, every roundtrip succeeds, meaning decoded text matches the original input exactly.

### Fertility Score

Fertility is the average number of tokens per word.

- A fertility of 1 means each word maps to one token (ideal but unrealistic in modern subword tokenizers).
- In modern LLMs, fertility is usually around 1.3–2.5 depending on the language.
- Higher fertility means more token splitting, which increases cost and reduces efficiency, but it's also influenced by language complexity, not just tokenizer quality.

```py
# ============================================================
# Calculate fertility score on training corpus
# ============================================================
import json

jsonl_file = CLEANED_DIR / "urdu_corpus.jsonl"
corpus_words = 0
corpus_tokens = 0
sample_size = 10000  # Sample 10K documents for speed

print(f"Calculating fertility on {sample_size:,} documents from corpus...")

with open(jsonl_file, "r", encoding="utf-8") as f:
    for i, line in enumerate(f):
        if i >= sample_size:
            break
        doc = json.loads(line)
        text = doc["text"]
        
        words = text.split()
        tokens = tokenizer.encode(text).tokens
        n_tokens = len(tokens) - 2  # Remove <bos> and <eos>
        
        corpus_words += len(words)
        corpus_tokens += n_tokens

corpus_fertility = corpus_tokens / corpus_words
print(f"\n📊 Fertility Score (corpus): {corpus_fertility:.2f} tokens/word")
print(f"   (Total: {corpus_words:,} words → {corpus_tokens:,} tokens)")
print(f"   Documents sampled: {min(i+1, sample_size):,}")

if corpus_fertility < 2.0:
    print("   ✅ Excellent! Tokenizer is well-optimized for Urdu.")
elif corpus_fertility < 3.0:
    print("   ⚠️ Good, but could be better. Consider larger vocab.")
else:
    print("   ❌ High fertility. The tokenizer needs improvement.")
```

The fertility score we get here is 1.04, which is quite good. But keep in mind that this number is artificially low because the tokenizer was trained on the same small corpus it's being evaluated on. With a larger or unseen dataset, fertility would likely be higher (closer to the 1.3-2.5 range typical for production tokenizers).

### Saving the Tokenizer

The final step is to save the tokenizer in JSON format and verify that it loads correctly:

```py
# ============================================================
# Save the tokenizer
# ============================================================

tokenizer_path = str(TOKENIZER_DIR / "urdu_bpe_tokenizer.json")
tokenizer.save(tokenizer_path)

print(f" Tokenizer saved to: {tokenizer_path}")
print(f"   File size: {os.path.getsize(tokenizer_path) / 1024:.0f} KB")

# Verify we can load it back
loaded_tokenizer = Tokenizer.from_file(tokenizer_path)
test = loaded_tokenizer.encode("اردو ایک خوبصورت زبان ہے")
print(f"\n   Verification: {test.tokens}")
print(f"    Tokenizer loads correctly!")
```

Once saved, we have a lookup table. Using this, along with our corpus of data, we can perform the next important step: **pre-training**.

---

## 3. Pre-Training

In this part, the model learns the language, grammar, patterns, and vocabulary. Once training is done, the model is able to predict the next word in a sequence, and this is where we start to see raw data turning into an LLM.

**LLMs are actually next-word predictors.** Given a sequence of words, they predict the most probable next word.

With the help of training, the model learns:

- The syntax of the language
- Semantics, the contextual meaning
- Frequently used expressions
- Facts from the training dataset

For training, you have some options. As the model is small, you can train it on your local machine. It will be slower but will get the job done.

The other option is using Google Colab. This is the one I used – the free version was enough for the training I required, using a T4 GPU.

### Steps to Do Pre-Training

1. Upload the dataset JSONL file and tokenizer to Google Drive.
2. Set the model configuration (vocab size, layers, heads, and so on).
3. Define the transformer architecture (attention, feed-forward, blocks).
4. Load and tokenize the corpus into training/validation splits.
5. Run the training loop with optimizer, LR schedule, and checkpointing.

### Model Configuration

```py
from dataclasses import dataclass

@dataclass
class UrduLLMConfig:
    # Vocabulary
    vocab_size: int = 32_000
    pad_token_id: int = 0
    bos_token_id: int = 2
    eos_token_id: int = 3

    # Model Architecture
    d_model: int = 384
    n_layers: int = 6
    n_heads: int = 6
    d_ff: int = 1536  # 4 * d_model
    dropout: float = 0.1
    max_seq_len: int = 256

    # Training
    batch_size: int = 32
    learning_rate: float = 3e-4
    weight_decay: float = 0.1
    max_epochs: int = 10
    warmup_steps: int = 500
    grad_clip: float = 1.0
```

#### Configuration parameters explained:

The vocabulary parameters (`vocab_size`, `pad_token_id`, `bos_token_id`, `eos_token_id`) simply match the tokenizer we built earlier. `vocab_size` is 32K (our BPE vocabulary), and the special token IDs (0, 2, 3) correspond to the positions we assigned during tokenizer training.

#### Model architecture parameters:

| Variable | What it Means | Example | Impact of Value |
| --- | --- | --- | --- |
| `d_model` | Embedding/vector size per token | 384 | Higher: better understanding but slower & more memory. Lowe: faster but less expressive |
| `n_layers` | Number of transformer layers | 6 | More layers: deeper understanding but higher latency. Fewer: faster but less powerful |
| `n_heads` | Attention heads per layer | 6 | More heads: better context capture. Too few: limited attention diversity |
| `d_ff` | Feedforward layer size | 1536 | Larger: more computation power. Smaller: faster but weaker transformations |
| `dropout` | % of neurons dropped during training | 0.1 | Higher: prevents overfitting but may underfit. Lower: better training fit but risk of overfitting |
| `max_seq_len` | Maximum tokens per input | 256 | Higher: more context but slower & costly. Lower: faster but limited context |

#### Training hyperparameters:

| Variable | What it Means | Example | Impact of Value |
| --- | --- | --- | --- |
| `batch_size` | Samples per training step | 32 | Larger: faster training but needs more memory. Smaller: stable but slower |
| `learning_rate` | Step size for updates | 0.0003 | Too high: unstable training. Too low: very slow learning |
| `weight_decay` | Regularization strength | 0.1 | Higher: reduces overfitting. Lower: risk of overfitting |
| `max_epochs` | Full dataset passes | 10 | More: better learning but risk of overfitting. Fewer: undertrained model |
| `warmup_steps` | Gradual LR increase steps | 500 | More: smoother start, safer training. Less: risk of early instability |
| `grad_clip` | Max gradient value | 1.0 | Lower: stable but slower learning. Higher: risk of exploding gradients |

### Transformer Architecture

Next up is the main part of training: writing the **transformer architecture**. Before jumping into code, it's important to know what a transformer architecture is.

To learn in depth about what transformers are and how they differ from RNNs and CNNs, I would recommend going through this article: [<VPIcon icon="fa-brands fa-aws"/>AWS: What is Transformers in Artificial Intelligence](https://aws.amazon.com/what-is/transformers-in-artificial-intelligence/)

But in short:

> *"Transformers are a type of neural network architecture that transforms or changes an input sequence into an output sequence."*

The original Transformer paper introduced both an **encoder** (reads input) and a **decoder** (generates output). But GPT-style models like ours use only the decoder part. This is called a **decoder-only** architecture.

The decoder takes a sequence of tokens, applies [<VPIcon icon="iconfont icon-ibm"/>self-attention](https://ibm.com/think/topics/self-attention) to understand relationships between them, and predicts the next token.

Self-attention is what makes transformers powerful: instead of processing tokens one by one in order (like RNNs), the model looks at all previous tokens simultaneously and determines which ones are most relevant for the current prediction.

Here's the complete transformer code. A detailed breakdown of each component follows:

```py :collapsed-lines
import math
import torch
import torch.nn as nn
import torch.nn.functional as F


class MultiHeadSelfAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.n_heads = config.n_heads
        self.d_model = config.d_model
        self.head_dim = config.d_model // config.n_heads

        self.qkv_proj = nn.Linear(config.d_model, 3 * config.d_model)
        self.out_proj = nn.Linear(config.d_model, config.d_model)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x, mask=None):
        B, T, C = x.shape

        qkv = self.qkv_proj(x)
        qkv = qkv.reshape(B, T, 3, self.n_heads, self.head_dim)
        qkv = qkv.permute(2, 0, 3, 1, 4)
        q, k, v = qkv[0], qkv[1], qkv[2]

        attn = (q @ k.transpose(-2, -1)) * (self.head_dim ** -0.5)

        if mask is not None:
            attn = attn.masked_fill(mask == 0, float('-inf'))

        attn = F.softmax(attn, dim=-1)
        attn = self.dropout(attn)

        out = attn @ v
        out = out.transpose(1, 2).reshape(B, T, C)
        out = self.out_proj(out)
        return out


class FeedForward(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.fc1 = nn.Linear(config.d_model, config.d_ff)
        self.fc2 = nn.Linear(config.d_ff, config.d_model)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x):
        x = F.gelu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x


class TransformerBlock(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.ln1 = nn.LayerNorm(config.d_model)
        self.attn = MultiHeadSelfAttention(config)
        self.ln2 = nn.LayerNorm(config.d_model)
        self.ff = FeedForward(config)
        self.dropout = nn.Dropout(config.dropout)

    def forward(self, x, mask=None):
        x = x + self.dropout(self.attn(self.ln1(x), mask))
        x = x + self.dropout(self.ff(self.ln2(x)))
        return x


class UrduGPT(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config

        self.token_emb = nn.Embedding(config.vocab_size, config.d_model)
        self.pos_emb = nn.Embedding(config.max_seq_len, config.d_model)
        self.dropout = nn.Dropout(config.dropout)

        self.blocks = nn.ModuleList([
            TransformerBlock(config) for _ in range(config.n_layers)
        ])

        self.ln_f = nn.LayerNorm(config.d_model)
        self.head = nn.Linear(config.d_model, config.vocab_size, bias=False)

        # Weight tying
        self.head.weight = self.token_emb.weight

        self.apply(self._init_weights)

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
        elif isinstance(module, nn.Embedding):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)

    def forward(self, input_ids, targets=None):
        B, T = input_ids.shape
        device = input_ids.device

        tok_emb = self.token_emb(input_ids)
        pos = torch.arange(0, T, dtype=torch.long, device=device)
        pos_emb = self.pos_emb(pos)

        x = self.dropout(tok_emb + pos_emb)

        # Causal mask
        mask = torch.tril(torch.ones(T, T, device=device)).unsqueeze(0).unsqueeze(0)

        for block in self.blocks:
            x = block(x, mask)

        x = self.ln_f(x)
        logits = self.head(x)

        loss = None
        if targets is not None:
            loss = F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))

        return {'logits': logits, 'loss': loss}

    @torch.no_grad()
    def generate(self, input_ids, max_new_tokens=100, temperature=0.8,
                 top_k=50, top_p=0.9, eos_token_id=None):
        """
        Generate text autoregressively.

        Sampling strategies:
        - temperature: Controls randomness (low = deterministic, high = creative)
        - top_k: Only consider the top K most likely tokens
        - top_p (nucleus): Only consider tokens whose cumulative probability <= p
        - eos_token_id: Stop generating when this token is produced
        """
        self.eval()
        eos_token_id = eos_token_id or getattr(self.config, 'eos_token_id', None)

        for _ in range(max_new_tokens):
            idx_cond = input_ids if input_ids.size(1) <= self.config.max_seq_len \
                       else input_ids[:, -self.config.max_seq_len:]

            outputs = self.forward(idx_cond)
            logits = outputs["logits"][:, -1, :] / temperature

            # Top-K filtering
            if top_k > 0:
                v, _ = torch.topk(logits, min(top_k, logits.size(-1)))
                logits[logits < v[:, [-1]]] = float('-inf')

            # Top-P (nucleus) filtering
            if top_p < 1.0:
                sorted_logits, sorted_indices = torch.sort(logits, descending=True)
                cumulative_probs = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)
                sorted_indices_to_remove = cumulative_probs > top_p
                sorted_indices_to_remove[:, 1:] = sorted_indices_to_remove[:, :-1].clone()
                sorted_indices_to_remove[:, 0] = 0
                indices_to_remove = sorted_indices_to_remove.scatter(
                    1, sorted_indices, sorted_indices_to_remove
                )
                logits[indices_to_remove] = float('-inf')

            probs = F.softmax(logits, dim=-1)
            next_token = torch.multinomial(probs, num_samples=1)
            input_ids = torch.cat([input_ids, next_token], dim=1)

            if eos_token_id is not None and next_token.item() == eos_token_id:
                break

        return input_ids
```

This code builds a text prediction machine. You give it some Urdu words, and it guesses the next word, over and over, until it forms a sentence. That's literally how ChatGPT works too, just much bigger.

### Transformer Code Breakdown

#### 1. MultiHeadSelfAttention: "The Lookback System"

Imagine reading a sentence. When you see the word "اس" (this), your brain looks back to figure out what "this" refers to. That's attention.

**Q, K, V**: Think of it like a library:

- **Query (Q):** "I'm looking for information about X"
- **Key (K):** Each previous word holds up a sign: "I have info about Y"
- **Value (V):** The actual information that word carries

**6 heads** = 6 different "readers" looking at the sentence simultaneously. One might focus on grammar, another on meaning, another on nearby words, and so on.

**Causal mask** = A rule that says: "You can only look at words that came before you, not after." (Because when generating, future words don't exist yet!)

**The math:** Multiply Q×K to get "how relevant is each word?", then use those scores to grab the most useful info from V.

#### 2. FeedForward: "The Thinking Step"

After attention figured out which words matter, this is where the model actually thinks about what they mean.

It's just two layers:

- **Expand (384 → 1536):** Give the model more "brain space" to think
- **Shrink (1536 → 384):** Compress the thought back down
- **GELU activation:** A filter that decides "keep this thought" or "discard it" (smoothly, not harshly)

#### 3. TransformerBlock: "One Round of Reading"

One pass of reading a sentence and thinking about it.

- **Step 1:** Look at other words (attention)
- **Step 2:** Think about what you saw (feed-forward)
- **LayerNorm:** Like resetting your brain between steps so numbers don't get too big or too small.
- **Residual connection (`x + ...`):** The model keeps its original thought AND adds the new insight. It's like taking notes: you don't erase old notes, you add new ones.

The model does this 6 times (6 blocks). Each round understands the text a little deeper.

#### 4. UrduGPT: "The Full Machine"

**Setup (`__init__`):**

- **Token embedding:** A giant lookup table. Each of 32,000 Urdu words/subwords gets a list of 384 numbers that represent its "meaning."
- **Position embedding:** Another lookup table that tells the model "this word is 1st, this is 2nd, this is 3rd..." (otherwise it wouldn't know word order).
- **6 Transformer blocks:** The 6 rounds of reading described above.
- **LM head:** At the end, converts the model's internal "thoughts" (384 numbers) back into a score for each of the 32,000 possible next words.
- **Weight tying:** The input lookup table and output scoring table share the same data. Saves memory and actually works better!

**Processing (**`forward`**):**

1. Look up each word's meaning (embedding)
2. Add position info
3. Run through 6 rounds of attention + thinking
4. Score every possible next word
5. If we know the correct answer, calculate how wrong we were (loss)

**Generating text (**`generate`**):** A simple loop:

1. Feed in the words so far
2. Get scores for the next word
3. **Temperature:** Controls creativity. Low = safe/predictable, high = wild/creative
4. **Top-K:** Only consider the K best options (ignore the 31,950 unlikely words)
5. **Top-P (nucleus):** Dynamically select the smallest set of tokens whose cumulative probability reaches the threshold
6. Randomly pick one word from the remaining options
7. Add it to the sentence, go back to step 1
8. Stop when `<eos>` is generated or `max_new_tokens` is reached

### Loading the Dataset and Training

First, we load the JSONL corpus and tokenize every document into one long sequence of token IDs. Then we split it 90/10 into training and validation sets, and wrap them in a PyTorch Dataset that creates fixed-length chunks for next-token prediction:

```py
import json
from tokenizers import Tokenizer
from torch.utils.data import Dataset, DataLoader
from tqdm import tqdm

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using: {device}")

# Load tokenizer
tokenizer = Tokenizer.from_file(TOKENIZER_PATH)
print(f"Tokenizer loaded. Vocab: {tokenizer.get_vocab_size():,}")

# Load and tokenize corpus
print("Loading corpus...")
all_token_ids = []
with open(DATA_PATH, "r", encoding="utf-8") as f:
    for line in tqdm(f, desc="Tokenizing"):
        doc = json.loads(line)
        encoded = tokenizer.encode(doc["text"])
        all_token_ids.extend(encoded.ids)

all_token_ids = torch.tensor(all_token_ids, dtype=torch.long)
print(f"Total tokens: {len(all_token_ids):,}")
```

```py
class UrduTextDataset(Dataset):
    def __init__(self, token_ids, seq_len):
        self.token_ids = token_ids
        self.seq_len = seq_len
        self.n_chunks = (len(token_ids) - 1) // seq_len

    def __len__(self):
        return self.n_chunks

    def __getitem__(self, idx):
        start = idx * self.seq_len
        chunk = self.token_ids[start:start + self.seq_len + 1]
        return chunk[:-1], chunk[1:]  # input, target (shifted by 1)

config = UrduLLMConfig()

# Split 90/10
split_idx = int(len(all_token_ids) * 0.9)
train_dataset = UrduTextDataset(all_token_ids[:split_idx], config.max_seq_len)
val_dataset = UrduTextDataset(all_token_ids[split_idx:], config.max_seq_len)

train_loader = DataLoader(train_dataset, batch_size=config.batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=config.batch_size)

print(f"Train: {len(train_dataset):,} chunks")
print(f"Val: {len(val_dataset):,} chunks")
```

Each chunk is 256 tokens long. `__getitem__` returns `(input, target)` where target is the input shifted by one position, which is exactly what next-token prediction needs.

Training for me took around 3 hours and completed 3 epochs. In essence, it should have done 10 epochs, but after 3 I reached the free limit of Google Colab. Since the purpose of training was learning, I used the model that was generated and saved it in Drive.

Here's the complete training code:

```py :collapsed-lines
# Optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=config.learning_rate, weight_decay=config.weight_decay)

# LR Schedule
total_steps = len(train_loader) * config.max_epochs
def get_lr(step):
    if step < config.warmup_steps:
        return config.learning_rate * step / config.warmup_steps
    progress = (step - config.warmup_steps) / (total_steps - config.warmup_steps)
    return config.learning_rate * 0.5 * (1 + math.cos(math.pi * progress))

# Training
history = {'train_loss': [], 'val_loss': []}
global_step = 0
best_val_loss = float('inf')

for epoch in range(config.max_epochs):
    model.train()
    epoch_loss = 0
    pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}")

    for input_ids, targets in pbar:
        input_ids, targets = input_ids.to(device), targets.to(device)

        lr = get_lr(global_step)
        for g in optimizer.param_groups:
            g['lr'] = lr

        outputs = model(input_ids, targets)
        loss = outputs['loss']

        optimizer.zero_grad()
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), config.grad_clip)
        optimizer.step()

        epoch_loss += loss.item()
        global_step += 1
        pbar.set_postfix({'loss': f'{loss.item():.4f}'})

    # Validation
    model.eval()
    val_loss = 0
    with torch.no_grad():
        for input_ids, targets in val_loader:
            input_ids, targets = input_ids.to(device), targets.to(device)
            val_loss += model(input_ids, targets)['loss'].item()
    val_loss /= len(val_loader)

    train_loss = epoch_loss / len(train_loader)
    history['train_loss'].append(train_loss)
    history['val_loss'].append(val_loss)

    print(f"Epoch {epoch+1}: Train={train_loss:.4f}, Val={val_loss:.4f}")

    # Save best
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), f"{DRIVE_PATH}/best_model.pt")
        print(f"Best model saved!")

print(f"\nDone! Best val loss: {best_val_loss:.4f}")
```

Now let's break down what each part of the training code does.

### Training Code Explained: Line by Line

#### 1. Optimizer Setup

```py
optimizer = torch.optim.AdamW(model.parameters(), lr=config.learning_rate, weight_decay=config.weight_decay)
```

`AdamW` maintains two running statistics per parameter (23M × 2 = 46M extra values in memory):

- **First moment (momentum):** Exponential moving average of gradients. Smooths out noisy updates so the optimizer doesn't zigzag.
- **Second moment:** Exponential moving average of squared gradients. Gives each parameter its own adaptive learning rate (frequently updated params get smaller steps, rare ones get larger).
- **Weight decay (0.1):** Each step, weights are multiplied by `(1 - lr × 0.1)`, shrinking them slightly. This is **L2 regularization**. It prevents any single weight from growing too large, which reduces overfitting. The "W" in AdamW means this decay is decoupled from the gradient update (applied directly to weights, not mixed into the gradient like vanilla Adam).

#### 2. Learning Rate Schedule

```py
total_steps = len(train_loader) * config.max_epochs  # e.g., 500 batches × 10 epochs = 5000 steps

def get_lr(step):
    if step < config.warmup_steps:                                      # Phase 1: steps 0–499
        return config.learning_rate * step / config.warmup_steps        # Linear ramp: 0 → 3e-4
    progress = (step - config.warmup_steps) / (total_steps - config.warmup_steps)  # 0.0 → 1.0
    return config.learning_rate * 0.5 * (1 + math.cos(math.pi * progress))        # 3e-4 → ~0
```

- **Warmup (first 500 steps):** At step 0, weights are random and gradients point in semi-random directions, so a large LR would cause destructive parameter updates. By linearly ramping from 0 to 3e-4, we let the loss landscape "stabilize" before making aggressive updates.
- **Cosine decay (remaining steps):** The formula `0.5 × (1 + cos(π × progress))` traces a smooth S-curve from 1.0 to 0.0 as progress goes from 0 to 1. Multiplied by peak LR, this gives:
  - **Early:** Large LR – big parameter changes which results in rapid loss reduction
  - **Late:** Tiny LR – small tweaks which results in fine-tuning without overshooting local minima

```plaintext
LR:  0 ──ramp──▶ peak ──smooth curve──▶ ~0
     |  warmup  |     cosine decay      |
```

#### 3. Tracking Variables

```py
history = {'train_loss': [], 'val_loss': []}   # For plotting curves later
global_step = 0                                 # Counts total batches across all epochs (for LR schedule)
best_val_loss = float('inf')                    # Tracks best validation; starts at infinity so any real loss beats it
```

#### 4. Training Loop

**Outer Loop: Epochs**

```py
for epoch in range(config.max_epochs):
    model.train()     # Enables dropout (randomly zeros 10% of activations for regularization)
```

Each epoch = one full pass through all training data. We repeat for `max_epochs` rounds.

**Inner Loop: Batches**

**1. Move to GPU:**

```py
input_ids, targets = input_ids.to(device), targets.to(device)
```

Transfers tensor data from CPU RAM to GPU VRAM. Matrix multiplications in transformers (attention, FFN) run 50–100× faster on GPU due to massive parallelism.

**2. Manual LR Update:**

```py
lr = get_lr(global_step)
for g in optimizer.param_groups:
    g['lr'] = lr
```

PyTorch's AdamW doesn't natively support custom schedules, so we manually override the LR each step. `param_groups` is a list (here just one group), and each group can have its own LR/weight decay.

**3. Forward Pass:**

```py
outputs = model(input_ids, targets)
loss = outputs['loss']
```

Input tokens flow through: embeddings → 6 transformer blocks → LM head → logits. Cross-entropy loss is computed between the logits (shape `[batch, seq_len, 32000]`) and target token IDs. This loss measures the negative log-probability the model assigns to the correct next token, averaged over all positions and batch elements.

**4. Backward Pass + Update:**

```py
optimizer.zero_grad()          # Reset all parameter gradients to zero (they accumulate by default)
loss.backward()                # Backpropagation: compute ∂loss/∂θ for all 23M parameters via chain rule
torch.nn.utils.clip_grad_norm_(model.parameters(), config.grad_clip)  # If ||gradient||₂ > 1.0, scale it down
optimizer.step()               # θ_new = θ_old - lr × adam_adjusted_gradient - lr × weight_decay × θ_old
```

- `zero_grad()`:** PyTorch accumulates gradients by default (useful for gradient accumulation across micro-batches). We must manually clear them before each new backward pass.
- `loss.backward()`:** Backpropagation traverses the computation graph in reverse, computing ∂loss/∂θ for every parameter using the chain rule. This is the most compute-intensive step alongside the forward pass.
- **Gradient clipping:** Computes the L2 norm across all parameter gradients concatenated into one vector. If the norm exceeds 1.0, every gradient is multiplied by `1.0/norm`, preserving direction but capping magnitude. This prevents rare batches (unusual token distributions) from causing catastrophically large updates that destabilize training.
- `optimizer.step()`: AdamW applies the update rule using momentum, adaptive per-parameter LR, and decoupled weight decay.

**5. Bookkeeping:**

```py
epoch_loss += loss.item()      # .item() extracts the Python float from the CUDA tensor (avoids GPU memory leak)
global_step += 1               # Increment for LR schedule
pbar.set_postfix({'loss': ...})  # Update the tqdm progress bar display
```

#### 6. Validation

```py
model.eval()                   # Disables dropout so we use full model capacity for honest evaluation
val_loss = 0
with torch.no_grad():          # Disables gradient tracking, saves ~50% memory and runs faster
    for input_ids, targets in val_loader:
        input_ids, targets = input_ids.to(device), targets.to(device)
        val_loss += model(input_ids, targets)['loss'].item()
val_loss /= len(val_loader)    # Average loss per batch
```

This tests on held-out data the model never trained on. Comparing train vs val loss reveals:

| Pattern | Meaning |
| --- | --- |
| Both decreasing | Model is learning generalizable patterns |
| Train ↓, Val stalling/↑ | Overfitting: memorizing, not learning |
| Both high and flat | Underfitting: model needs more capacity or data |

`model.eval()` turns OFF dropout so we evaluate with the full model. `torch.no_grad()` skips gradient computation since we're just measuring, not learning.

#### 7. Checkpointing

```py
if val_loss < best_val_loss:
    best_val_loss = val_loss
    torch.save(model.state_dict(), f"{DRIVE_PATH}/best_model.pt")
```

`model.state_dict()` returns an `OrderedDict` mapping parameter names onto tensors. `torch.save` serializes this to disk using Python's pickle + zip. We only save when val loss improves.

This is **early stopping** in spirit: we keep the checkpoint that generalizes best, regardless of what happens in later epochs.

#### Summary: One Batch in 6 Steps

1. Feed 32 Urdu sequences through the model → get predicted probabilities
2. Cross-entropy vs actual next tokens → scalar loss (how wrong?)
3. Backpropagate through 23M parameters → gradient per parameter (what to fix?)
4. Clip gradient norm to ≤ 1.0 → prevent instability
5. AdamW updates parameters with momentum + decay → the actual learning
6. Repeat ~5000 times, save the best checkpoint → done

### Key Metrics

**Cross-entropy loss** measures how far the predicted probability distribution is from the true next token. A random model over 32K vocab gets loss ≈ ln(32000) ≈ 10.4

**Perplexity = e^loss**, interpretable as "the model is choosing between N equally likely tokens"

- PPL 32,000 = random guessing
- PPL 100 = narrowed to ~100 candidates
- PPL 10 = quite confident predictions

Once training is completed and we've saved the model in Drive, the next step is to download the model to your local system to perform the next steps.

Now we have a model that's ready, but a question arises: Is it ready to where we can chat with it like we do with any AI tool like ChatGPT, Claude, or Copilot? The answer is **no**, it's not quite ready yet. Why?

The training part is done, but it doesn't know how to structure or write in a conversational manner, like it's answering user queries. This is the step we call **Supervised Fine-Tuning (SFT)**.

---

## 4. Supervised Fine-Tuning (SFT)

At a very high level, in SFT we teach the model how to respond to queries. It's like giving it examples from which it learns how to answer. The more examples you have, the better the responses will become. So essentially, supervised fine-tuning converts the model to a conversational agent.

To achieve this, we'll create a dataset of examples with the following key pairs and format:

```json
{
  "conversations": [
    {"role": "system", "content": "آپ ایک مددگار اردو اسسٹنٹ ہیں۔"},
    {"role": "user", "content": "سوال..."},
    {"role": "assistant", "content": "جواب..."}
  ]
}
```

Around **79 examples** get fed to the system and saved in JSONL format. In real cases, you would use many more examples. As I already mentioned, more examples lead to better results.

### Formatting Conversations for Training

The next step is formatting the conversations saved above for training. This is the conversation formatting step for SFT. It converts raw conversation JSON into token ID sequences with **loss masking**, so the model only learns to generate assistant responses.

Loss masking means we intentionally hide certain parts of the input from the training loss. In this case, we mask the system prompt and user message so the model isn't trained to memorize or reproduce them. The training signal comes only from the assistant's response, which is the useful part in teaching the model what to generate and when to stop.

#### Part 1: Disable Auto-Formatting & Get Special Token IDs

```py
tokenizer.no_padding()

BOS_ID = tokenizer.token_to_id("<bos>")       # 2
EOS_ID = tokenizer.token_to_id("<eos>")       # 3
SEP_ID = tokenizer.token_to_id("<sep>")       # 4
PAD_ID = tokenizer.token_to_id("<pad>")       # 0
USER_ID = tokenizer.token_to_id("<|user|>")          # 5
ASSISTANT_ID = tokenizer.token_to_id("<|assistant|>") # 6
SYSTEM_ID = tokenizer.token_to_id("<|system|>")       # 7

IGNORE_INDEX = -100
```

- `no_padding()`: Tells the tokenizer "don't add padding automatically, I'll handle it myself." We need full control over the token sequence.
- We fetch the integer IDs for each special token so we can manually insert them at the right positions.
- `IGNORE_INDEX = -100`: PyTorch's `cross_entropy` has a built-in feature: any label set to -100 is skipped in loss computation. This is how we implement loss masking.

#### Part 2: `format_conversation()`: The Core Function

This takes a conversation and produces two parallel arrays:

```plaintext
input_ids: [BOS, SYSTEM, آپ, ایک, مددگار, ..., SEP, USER, پاکستان, کا, ..., SEP, ASST, اسلام, آباد, ہے, EOS, PAD, PAD, ...]
labels:    [-100, -100, -100, -100, -100, ..., -100, -100, -100,    -100,..., -100, -100, اسلام, آباد, ہے, EOS, -100, -100, ...]
```

**Step-by-step inside the function:**

1. Start with BOS:

```py
input_ids = [BOS_ID]
labels = [IGNORE_INDEX]    # Don't learn to predict BOS
```

2. For each turn, encode the content and strip auto-added BOS/EOS:

```py
content_ids = tokenizer.encode(content).ids
if content_ids[0] == BOS_ID: content_ids = content_ids[1:]     # Remove if tokenizer auto-added
if content_ids[-1] == EOS_ID: content_ids = content_ids[:-1]
```

We strip these because we're manually placing special tokens at exact positions, so we don't want duplicates.

3. Build token sequence per role:

| Role | Token sequence | Labels |
| --- | --- | --- |
| system | `[SYSTEM_ID] + content + [SEP_ID]` | All -100 (masked) |
| user | `[USER_ID] + content + [SEP_ID]` | All -100 (masked) |
| assistant | `[ASST_ID] + content + [EOS_ID]` | `[-100] + content + [EOS_ID]` |

The assistant's role token (`<|assistant|>`) itself is masked because we don't want the model to learn to predict that. But the actual response content and the `<eos>` do have labels, so the model learns:

- **What to say** (the response content)
- **When to stop** (predicting `<eos>`)

4. Truncate and pad:

```py
input_ids = input_ids[:max_len]          # Cut to 256 tokens max
pad_len = max_len - len(input_ids)
input_ids = input_ids + [PAD_ID] * pad_len
labels = labels + [IGNORE_INDEX] * pad_len   # Don't learn from padding either
```

All sequences must be the same length for batched training. Padding labels are -100 so they're ignored in loss.

Here's the complete `format_conversation()` function:

```py :collapsed-lines
def format_conversation(conversation: dict, max_len: int = 256) -> dict:
    """
    Convert a conversation dict into token IDs + labels for SFT.

    Format: <bos><|system|>...<sep><|user|>...<sep><|assistant|>...<eos>
    Labels: -100 for system/user tokens (masked), actual IDs for assistant tokens.
    """
    input_ids = [BOS_ID]
    labels = [IGNORE_INDEX]

    for turn in conversation["conversations"]:
        role = turn["role"]
        content = turn["content"]

        content_ids = tokenizer.encode(content).ids
        if content_ids and content_ids[0] == BOS_ID:
            content_ids = content_ids[1:]
        if content_ids and content_ids[-1] == EOS_ID:
            content_ids = content_ids[:-1]

        if role == "system":
            role_ids = [SYSTEM_ID] + content_ids + [SEP_ID]
            role_labels = [IGNORE_INDEX] * len(role_ids)
        elif role == "user":
            role_ids = [USER_ID] + content_ids + [SEP_ID]
            role_labels = [IGNORE_INDEX] * len(role_ids)
        elif role == "assistant":
            role_ids = [ASSISTANT_ID] + content_ids + [EOS_ID]
            role_labels = [IGNORE_INDEX] + content_ids + [EOS_ID]

        input_ids.extend(role_ids)
        labels.extend(role_labels)

    # Truncate and pad to max_len
    input_ids = input_ids[:max_len]
    labels = labels[:max_len]
    pad_len = max_len - len(input_ids)
    input_ids = input_ids + [PAD_ID] * pad_len
    labels = labels + [IGNORE_INDEX] * pad_len

    return {"input_ids": input_ids, "labels": labels}
```

#### Part 3: Verification

```py
n_loss_tokens = sum(1 for l in test_formatted['labels'] if l != IGNORE_INDEX)
print(f"  Tokens with loss: {n_loss_tokens} / 256")
```

This confirms that only a small fraction of tokens (the assistant's words + EOS) contribute to the loss. For a typical example, you might see something like `Tokens with loss: 18 / 256`, meaning only ~7% of the sequence drives gradient updates. The rest (system prompt, user questions, special tokens, padding) is masked with `-100`.

This makes SFT extremely efficient: 100% of the learning signal comes from predicting the assistant's actual response and knowing when to stop (`<eos>`). That efficiency is especially critical when you only have 79 training examples.

### Formatting Summary

| Component | Purpose |
| --- | --- |
| `no_padding()` | Take manual control of token placement |
| Special token IDs | Insert chat structure markers at exact positions |
| `IGNORE_INDEX = -100` | PyTorch's built-in mechanism to skip positions in loss |
| System/User labels → -100 | Don't learn from these (context only) |
| Assistant labels → real IDs | Learn to generate responses + when to stop |
| Truncation to 256 | Match model's context window |
| Padding with -100 labels | Batch alignment without polluting the loss |

### SFT Dataset & DataLoader

```py
class SFTDataset(Dataset):
    def __init__(self, conversations: list, max_len: int = 256):
        self.examples = []
        for conv in conversations:
            formatted = format_conversation(conv, max_len)
            self.examples.append(formatted)

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        return (
            torch.tensor(self.examples[idx]['input_ids'], dtype=torch.long),
            torch.tensor(self.examples[idx]['labels'], dtype=torch.long),
        )
```

This wraps all 79 formatted conversations into a PyTorch Dataset. At init time, it pre-formats every conversation using `format_conversation()` and stores the results. When the DataLoader requests item `idx`, it returns `(input_ids, labels)` as tensors.

**DataLoader:**

```py
sft_loader = DataLoader(sft_dataset, batch_size=4, shuffle=True)
```

- `batch_size=4`: Small batch because we only have 79 examples. Larger batches would mean fewer gradient updates per epoch.
- `shuffle=True`: Randomize order each epoch so the model doesn't memorize a fixed sequence of examples.

### Loading the Pre-trained Model

```py
model = UrduGPT(config).to(device)
checkpoint = torch.load("best_model.pt", map_location=device)
state_dict = checkpoint['model_state_dict']

# Name mapping (Colab → local)
name_mapping = {
    'token_emb.weight': 'token_embedding.weight',
    'pos_emb.weight': 'position_embedding.weight',
    'ln_f.weight': 'ln_final.weight',
    'ln_f.bias': 'ln_final.bias',
    'head.weight': 'lm_head.weight',
}
```

This creates a fresh UrduGPT model and loads the pre-trained weights from Phase 3. You might be wondering: why the name mapping? The model was trained on Google Colab with slightly different variable names (for example, `token_emb` vs `token_embedding`). The mapping translates Colab's naming convention to the local code's convention. `strict=False` in `load_state_dict` allows loading even if some keys don't match exactly.

Also, why start from pre-trained? Well, SFT builds on top of pre-training. The model already knows Urdu grammar, vocabulary, and facts. SFT just teaches it the conversation format. Starting from random weights would require far more data and training.

### SFT Training Loop

Here's the complete SFT training loop:

```py :collapsed-lines
SFT_LR = 2e-5
SFT_EPOCHS = 50
optimizer = torch.optim.AdamW(model.parameters(), lr=SFT_LR, weight_decay=0.01)

sft_history = {'loss': []}
best_loss = float('inf')

for epoch in range(SFT_EPOCHS):
    model.train()
    epoch_loss = 0
    n_batches = 0

    for input_ids, labels in sft_loader:
        input_ids = input_ids.to(device)
        labels = labels.to(device)

        outputs = model(input_ids)
        logits = outputs['logits']

        shift_logits = logits[:, :-1, :].contiguous()
        shift_labels = labels[:, 1:].contiguous()

        loss = F.cross_entropy(
            shift_logits.view(-1, shift_logits.size(-1)),
            shift_labels.view(-1),
            ignore_index=IGNORE_INDEX,
        )

        optimizer.zero_grad(set_to_none=True)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()

        epoch_loss += loss.item()
        n_batches += 1

    avg_loss = epoch_loss / n_batches
    sft_history['loss'].append(avg_loss)

    if avg_loss < best_loss:
        best_loss = avg_loss
        torch.save({
            'model_state_dict': model.state_dict(),
            'config': config.__dict__,
            'epoch': epoch + 1,
            'loss': avg_loss,
        }, "sft_model.pt")

    if (epoch + 1) % 10 == 0 or epoch == 0:
        print(f"Epoch {epoch+1}/{SFT_EPOCHS} | Loss: {avg_loss:.4f}")

print(f"SFT complete! Best loss: {best_loss:.4f}")
```

Why these hyperparameters differ from pre-training:

| Parameter | Pre-training | SFT | Why different |
| --- | --- | --- | --- |
| Learning rate | 3e-4 | 2e-5 | Lower LR prevents catastrophic forgetting. Large updates would erase the Urdu knowledge learned during pre-training |
| Epochs | 3 | 50 | Only 79 examples vs millions of tokens. The model needs many passes to learn the conversation pattern |
| Weight decay | 0.1 | 0.01 | Less regularization needed since we want the model to fit these specific examples closely |
| LR schedule | Cosine warmup | Constant | Simple and effective for small-data fine-tuning |

Here's the training step (per batch):

```py
# Forward pass with no targets; we compute loss manually
outputs = model(input_ids)
logits = outputs['logits']

# Shift for next-token prediction
shift_logits = logits[:, :-1, :].contiguous()    # Predictions at positions 0..254
shift_labels = labels[:, 1:].contiguous()         # Targets at positions 1..255

# Loss with masking
loss = F.cross_entropy(
    shift_logits.view(-1, shift_logits.size(-1)),
    shift_labels.view(-1),
    ignore_index=IGNORE_INDEX,  # Skip -100 positions
)
```

There's a key difference from pre-training: in pre-training, we passed targets directly to `model(input_ids, targets)` which computed loss internally on ALL tokens. Here we compute loss manually so we can use `ignore_index=-100` to mask non-assistant positions.

**The shift:** `logits[:, :-1]` and `labels[:, 1:]` implement next-token prediction. The model's prediction at position `i` is compared against the actual token at position `i+1`.

Backward pass + update:

```py
optimizer.zero_grad(set_to_none=True)
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
optimizer.step()
```

This is the same as pre-training: clear gradients → backprop → clip to prevent instability → update parameters. Gradient clipping at 1.0 is especially important here since the model is being fine-tuned and some gradients can be large on small data.

Checkpointing:

```py
if avg_loss < best_loss:
    torch.save({'model_state_dict': model.state_dict(), ...}, "sft_model.pt")
```

Save whenever training loss improves. Unlike pre-training, we don't have a separate validation set (79 examples is too few to split), so we checkpoint on training loss.

### Chat Function: Inference

Here's the complete chat function:

```py :collapsed-lines
def chat(model, tokenizer, user_message: str, system_prompt: str = None,
         max_tokens: int = 100, temperature: float = 0.7) -> str:
    """Generate a chat response."""
    model.eval()

    if system_prompt is None:
        system_prompt = SYSTEM_PROMPT

    # Build the prompt
    prompt_ids = [BOS_ID, SYSTEM_ID]

    sys_ids = tokenizer.encode(system_prompt).ids
    if sys_ids and sys_ids[0] == BOS_ID: sys_ids = sys_ids[1:]
    if sys_ids and sys_ids[-1] == EOS_ID: sys_ids = sys_ids[:-1]
    prompt_ids.extend(sys_ids)
    prompt_ids.append(SEP_ID)

    prompt_ids.append(USER_ID)
    user_ids = tokenizer.encode(user_message).ids
    if user_ids and user_ids[0] == BOS_ID: user_ids = user_ids[1:]
    if user_ids and user_ids[-1] == EOS_ID: user_ids = user_ids[:-1]
    prompt_ids.extend(user_ids)
    prompt_ids.append(SEP_ID)

    prompt_ids.append(ASSISTANT_ID)

    # Generate
    input_tensor = torch.tensor([prompt_ids], dtype=torch.long).to(device)
    with torch.no_grad():
        output_ids = model.generate(
            input_tensor,
            max_new_tokens=max_tokens,
            temperature=temperature,
            top_k=50,
            top_p=0.9,
            eos_token_id=EOS_ID,
        )

    # Decode only the generated part
    generated_ids = output_ids[0][len(prompt_ids):].tolist()
    if EOS_ID in generated_ids:
        generated_ids = generated_ids[:generated_ids.index(EOS_ID)]

    return tokenizer.decode(generated_ids)
```

And here's a step-by-step breakdown:

#### 1. Build the prompt:

```py
prompt_ids = [BOS_ID, SYSTEM_ID]
prompt_ids.extend(sys_ids)          # System prompt content
prompt_ids.append(SEP_ID)
prompt_ids.append(USER_ID)
prompt_ids.extend(user_ids)          # User message content
prompt_ids.append(SEP_ID)
prompt_ids.append(ASSISTANT_ID)      # "Now respond..."
```

This constructs exactly the same format the model saw during SFT training:

```plaintext
<bos><|system|>آپ ایک مددگار...<sep><|user|>پاکستان کا دارالحکومت؟<sep><|assistant|>
```

The model sees `<|assistant|>` and knows "I should generate a response now" because during SFT, it learned that tokens after `<|assistant|>` are what it should produce.

#### 2. Generate autoregressively:

```py
with torch.no_grad():
    output_ids = model.generate(
        input_tensor,
        max_new_tokens=max_tokens,
        temperature=temperature,
        top_k=50,
        top_p=0.9,
        eos_token_id=EOS_ID,
    )
```

- `torch.no_grad()`: No gradients needed for inference, which saves memory and speed
- `temperature=0.7`: Slightly sharpened distribution for coherent but not robotic output
- `top_k=50`: Only sample from top 50 tokens to avoid low-probability noise
- `top_p=0.9`: Nucleus sampling that dynamically selects the smallest set of tokens whose cumulative probability ≥ 0.9
- `eos_token_id`: Stop generating when `<eos>` is produced

#### 3. Extract and decode:

```py
generated_ids = output_ids[0][len(prompt_ids):].tolist()    # Only the new tokens
if EOS_ID in generated_ids:
    generated_ids = generated_ids[:generated_ids.index(EOS_ID)]  # Trim at EOS
return tokenizer.decode(generated_ids)
```

We slice off the prompt (we don't want to return the system prompt and user message back), trim at `<eos>`, and decode token IDs back to Urdu text.

---

## 5. Deployment

At this point, you have your own LLM. That's a great milestone. But there's still the classic problem: "it works on my machine."

To make the model public so others can use it too, we need to deploy it and provide an interface for users to interact with.

While exploring deployment options, I came across Gradio, which provides a simple, clean interface for deploying machine learning models and applications. Gradio integrates directly with Hugging Face Spaces, giving us free hosting with minimal setup.

### Gradio Web Interface (<VPIcon icon="fa-brands fa-python"/>`app.py`)

The <VPIcon icon="fa-brands fa-python"/>`app.py` file ties everything together: it loads the tokenizer and model, defines the `chat()` function, and launches a Gradio UI. The model loading and `chat()` logic are identical to what we covered in the SFT section, so here we only show the Gradio-specific part:

```py title="app.py"
import gradio as gr

def respond(message, history):
    if not message.strip():
        return "براہ کرم کچھ لکھیں۔"
    return chat(message)

demo = gr.ChatInterface(
    fn=respond,
    title="🇵🇰 اردو LLM چیٹ بوٹ",
    description="""
    ### ایک چھوٹا اردو زبان ماڈل جو شروع سے تیار کیا گیا ہے
    **A small Urdu language model built from scratch (~23M parameters)**
    """,
    examples=[
        "السلام علیکم",
        "پاکستان کا دارالحکومت کیا ہے؟",
        "لاہور کے بارے میں بتائیں۔",
        "بریانی کیسے بنتی ہے؟",
        "کرکٹ کیسے کھیلی جاتی ہے؟",
        "چاند کیسے چمکتا ہے؟",
        "رمضان کیا ہے؟",
        "علامہ اقبال کون تھے؟",
        "خوش کیسے رہیں؟",
        "آپ کون ہیں؟",
    ],
    theme=gr.themes.Soft(),
)

if __name__ == "__main__":
    demo.launch()
```

- `respond()` wraps `chat()` with an empty-input guard, matching the signature Gradio's `ChatInterface` expects.
- `gr.ChatInterface` provides a ready-made chat UI with message history, input box, and send button.
- `examples` are pre-filled messages users can click to try.
- `theme=gr.themes.Soft()` gives a clean, modern visual theme.

::: note

Hugging Face Spaces runs <VPIcon icon="fa-brands fa-python"/>`app.py` as a standalone script, so the full <VPIcon icon="fa-brands fa-python"/>`app.py` in the repository inlines everything into one file: the model config, the complete transformer architecture, model loading with `gc.collect()` for memory optimization, the `chat()` function, and the Gradio interface above.

:::

We won't repeat all of that here since it was already covered in the Pre-Training and SFT sections.

**Running locally:**

```sh
python app.py
# Opens at http://127.0.0.1:7860
```

### Deployment Options

#### Option A: Hugging Face Spaces (Free, Recommended)

Hugging Face Spaces provides free CPU hosting for Gradio apps.

**What to upload:**

```sh title="file structure"
urdu-llm-chat/
├── app.py                          # Gradio web interface
├── requirements.txt                # torch, tokenizers, gradio
├── README.md                       # Space metadata (sdk: gradio)
├── model/
│   ├── __init__.py
│   ├── config.py
│   ├── transformer.py
│   └── checkpoints/sft_model.pt    # ~90MB trained model weights
└── tokenizer/
    └── urdu_tokenizer/
        └── urdu_bpe_tokenizer.json
```

::: info How it works

1. Create a free account on [<VPIcon icon="iconfont icon-huggingface"/>huggingface.co](https://huggingface.co)
2. Create a new Space (SDK: Gradio, Hardware: CPU Basic)
3. Push files via git: `git clone https://huggingface.co/spaces/USERNAME/urdu-llm-chat`
4. Copy project files into the cloned repo and push
5. Hugging Face automatically installs dependencies and runs <VPIcon icon="fa-brands fa-python"/>`app.py`
6. Your model is live at `https://huggingface.co/spaces/USERNAME/urdu-llm-chat`

:::

::: important Why CPU is fine

Our model is only 23M parameters (~90MB). Inference takes <1 second on CPU. No GPU needed for serving.

::::

#### Option B: Running Locally

```sh
cd your-project-directory
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Opens at `http://127.0.0.1:7860`. Works on any machine with Python 3.9+.

#### Option C: Terminal Chat (No UI)

A lightweight alternative with no Gradio dependency, just terminal input/output. Loads the model and enters an interactive loop:

```py :collapsed-lines
"""
Standalone Chat Inference Script for Urdu LLM

Usage:
    python inference/chat.py
"""

import sys
import torch
from pathlib import Path
from tokenizers import Tokenizer

# Add project root to path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from model.config import UrduLLMConfig
from model.transformer import UrduGPT


def load_model(checkpoint_path: str, device: str = None):
    """Load the fine-tuned model."""
    if device is None:
        if torch.cuda.is_available():
            device = "cuda"
        elif torch.backends.mps.is_available():
            device = "mps"
        else:
            device = "cpu"

    device = torch.device(device)

    config = UrduLLMConfig()
    model = UrduGPT(config).to(device)

    checkpoint = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()

    return model, config, device


def chat_response(model, tokenizer, config, device, user_message,
                  system_prompt="آپ ایک مددگار اردو اسسٹنٹ ہیں۔",
                  max_tokens=100, temperature=0.7):
    """Generate a chat response."""
    BOS_ID = tokenizer.token_to_id("<bos>")
    EOS_ID = tokenizer.token_to_id("<eos>")
    SEP_ID = tokenizer.token_to_id("<sep>")
    USER_ID = tokenizer.token_to_id("<|user|>")
    ASSISTANT_ID = tokenizer.token_to_id("<|assistant|>")
    SYSTEM_ID = tokenizer.token_to_id("<|system|>")

    # Build prompt
    prompt_ids = [BOS_ID, SYSTEM_ID]

    sys_ids = tokenizer.encode(system_prompt).ids
    if sys_ids and sys_ids[0] == BOS_ID: sys_ids = sys_ids[1:]
    if sys_ids and sys_ids[-1] == EOS_ID: sys_ids = sys_ids[:-1]
    prompt_ids.extend(sys_ids)
    prompt_ids.append(SEP_ID)

    prompt_ids.append(USER_ID)
    user_ids = tokenizer.encode(user_message).ids
    if user_ids and user_ids[0] == BOS_ID: user_ids = user_ids[1:]
    if user_ids and user_ids[-1] == EOS_ID: user_ids = user_ids[:-1]
    prompt_ids.extend(user_ids)
    prompt_ids.append(SEP_ID)

    prompt_ids.append(ASSISTANT_ID)

    # Generate
    input_tensor = torch.tensor([prompt_ids], dtype=torch.long).to(device)
    output_ids = model.generate(
        input_tensor,
        max_new_tokens=max_tokens,
        temperature=temperature,
        top_k=50,
        top_p=0.9,
        eos_token_id=EOS_ID,
    )

    generated_ids = output_ids[0][len(prompt_ids):].tolist()
    if EOS_ID in generated_ids:
        generated_ids = generated_ids[:generated_ids.index(EOS_ID)]

    return tokenizer.decode(generated_ids)


def main():
    print("=" * 60)
    print("🇵🇰  اردو LLM چیٹ بوٹ  🇵🇰")
    print("    Urdu LLM ChatBot")
    print("=" * 60)

    # Load model
    tokenizer_path = PROJECT_ROOT / "tokenizer" / "urdu_tokenizer" / "urdu_bpe_tokenizer.json"

    # Try SFT model first, fall back to pre-trained
    sft_path = PROJECT_ROOT / "model" / "checkpoints" / "sft_model.pt"
    pretrained_path = PROJECT_ROOT / "model" / "checkpoints" / "best_model.pt"

    if sft_path.exists():
        checkpoint_path = sft_path
        print("Loading SFT (conversational) model...")
    elif pretrained_path.exists():
        checkpoint_path = pretrained_path
        print("Loading pre-trained model (not fine-tuned for chat)...")
    else:
        print("❌ No model checkpoint found!")
        print("   Run notebooks 03 and 04 first to train the model.")
        sys.exit(1)

    model, config, device = load_model(str(checkpoint_path))
    tokenizer = Tokenizer.from_file(str(tokenizer_path))

    print(f"Model loaded on {device}")
    print("\nType your message in Urdu. Type 'quit' to exit.\n")
    print("-" * 60)

    while True:
        try:
            user_input = input("\n👤 آپ: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nخدا حافظ! 👋")
            break

        if user_input.lower() in ['quit', 'exit', 'q']:
            print("خدا حافظ! 👋")
            break

        if not user_input:
            continue

        response = chat_response(model, tokenizer, config, device, user_input)
        print(f"🤖 بوٹ: {response}")


if __name__ == "__main__":
    main()
```

Run it with:

```sh
python inference/chat.py
#
# 👤 آپ: السلام علیکم
# 🤖 بوٹ: وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟
```

---

## Full Pipeline Summary

| Phase | Description |
| --- | --- |
| **Phase 1** | Raw Urdu Text → Clean corpus |
| **Phase 2** | Corpus → BPE Tokenizer (32K vocab) |
| **Phase 3** | Tokenized chunks → Pre-train GPT (23M params, next-token prediction) |
| **Phase 4** | Conversations → SFT with loss masking → Chat model |
| **Deploy** | <VPIcon icon="fa-brands fa-python"/>`app.py` + model weights → Hugging Face Spaces / Local |

::: info

You can check out the deployed model here:

<SiteInfo
  name="Urdu LLM Chat Bot - a Hugging Face Space by Wisamul"
  desc="A small Urdu language model built from scratch (~23M parameters)"
  url="https://huggingface.co/spaces/Wisamul/urdu_llm/"
  logo="https://huggingface.co/favicon.ico"
  preview="https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/Wisamul/urdu_llm.png"/>

:::
---

## Results

The results were pretty interesting. As we had a small training sample, the chances of hallucinations were pretty high, and especially if you can understand Urdu, you'll appreciate the fun part of hallucination. But overall it was working fine.

Here are a few sample interactions with the deployed model:

```plaintext
👤 User: السلام علیکم
🤖 Assistant: وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟

👤 User: پاکستان کا دارالحکومت کیا ہے؟
🤖 Assistant: پاکستان کا دارالحکومت اسلام آباد ہے۔ یہ شہر 1960 کی دہائی میں تعمیر کیا گیا تھا۔

👤 User: تعلیم کی اہمیت کیا ہے؟
🤖 Assistant: تعلیم انسانی ترقی کی بنیاد ہے۔ یہ نہ صرف علم حاصل کرنے کا ذریعہ ہے بلکہ معاشرے کی تعمیر میں اہم کردار ادا کرتی ہے۔
```

For questions close to the training data, the model responds accurately and fluently. For out-of-distribution queries, it tends to hallucinate or repeat fragments. This is expected given the small SFT dataset (79 examples) and model size (23M parameters).

---

## Conclusion

The goal of all this was to discuss and explain all steps involved in the process of building an LLM. I hope it gives you clarity as to why everyone isn't making their own LLM: factors like cost, training, data collection, and so on. At the same time, going through this process has hopefully helped you appreciate the work that has been done before and what we've achieved here.

We went from raw Urdu text all the way to a deployed chatbot: data cleaning, BPE tokenization, pre-training a GPT-style transformer, supervised fine-tuning with loss masking, and finally a Gradio web interface.

The model is tiny and the dataset is small, but every concept here (attention, next-token prediction, SFT, chat formatting) is exactly what powers production LLMs like GPT-4 and Llama – just at a much larger scale.

If you want to improve on this, the highest-impact next steps would be:

1. more SFT data (thousands of examples instead of 79),
2. a larger model (100M+ parameters), and
3. RLHF/DPO alignment.

But even at this scale, you now have a concrete understanding of the full LLM pipeline.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own Language-Specific LLM [Full Handbook]",
  "desc": "What if you could build your own LLM, one that speaks your native language, all from scratch? That's exactly what we'll do in this tutorial. The best way to understand how LLMs work is by actually bui",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-language-specific-llm-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
