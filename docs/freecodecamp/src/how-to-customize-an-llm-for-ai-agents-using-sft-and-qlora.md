---
lang: en-US
title: "How to Customize an LLM for AI Agents using SFT and QLoRA"
description: "Article(s) > How to Customize an LLM for AI Agents using SFT and QLoRA"
icon: iconfont icon-pytorch
category:
  - Python
  - Pytorch
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
  - large-language-models
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Customize an LLM for AI Agents using SFT and QLoRA"
    - property: og:description
      content: "How to Customize an LLM for AI Agents using SFT and QLoRA"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-customize-an-llm-for-ai-agents-using-sft-and-qlora.html
prev: /programming/py-torch/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Darsh Shah
    url: https://freecodecamp.org/news/author/darshs/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a2d3b4d0-68fd-4e59-a62a-596d2ac27a01.png
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
  name="How to Customize an LLM for AI Agents using SFT and QLoRA"
  desc="In this tutorial, I’ll show you how to fine-tune a large language model for use in AI agents using supervised fine-tuning with QLoRA. This lets us customize a pre-trained model so it behaves the way w"
  url="https://freecodecamp.org/news/how-to-customize-an-llm-for-ai-agents-using-sft-and-qlora"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a2d3b4d0-68fd-4e59-a62a-596d2ac27a01.png"/>

In this tutorial, I’ll show you how to fine-tune a large language model for use in AI agents using supervised fine-tuning with QLoRA. This lets us customize a pre-trained model so it behaves the way we want. We’ll use a lightweight training workflow to update only a small part of the model.

We'll use Unsloth and the Hugging Face ecosystem to download a Qwen 1.5B base model, apply QLoRA-based supervised fine-tuning, and save the resulting LoRA adapter weights locally for inference. Everything runs locally, so you'll have no model API costs.

---

## Background

Training a language model means showing it many examples and updating its internal weights, called parameters, so it gets better at predicting the desired output. Modern LLMs can have millions or billions of parameters, which is one reason training them is expensive. The more parameters a model has, the more memory and compute are usually needed to train it.

Base large language models like Claude and ChatGPT are also trained to be general. It means their responses can feel broad, inconsistent, or not well aligned with a specific application. Even when prompting helps, there are cases where you want the model to learn a more consistent pattern directly from examples.

That is where fine-tuning comes in. Fine-tuning is the general process of adapting a pretrained model to behave more closely to your task. One common form of this is supervised fine-tuning, where the model is trained on labeled input/output examples that show the kind of behavior you want.

This tutorial works on macOS, Windows, and Linux. I’m using a MacBook Pro with 32 GB of RAM without an external GPU, but the workflow can also run on more limited hardware by using a smaller pre-trained model.

---

## What is Supervised Fine-Tuning?

Supervised fine-tuning, or SFT, means taking a pre-trained model and training it further on example input/output pairs. Instead of training a model from scratch, you start with one that already understands language reasonably well and teach it to respond in ways that better match your task. For example, you may want it to answer in a certain tone, follow a specific format, or behave more consistently on a narrow task. SFT helps push the model in that direction by showing it many examples of the behavior you want.

The amount of data you need depends on the task. For simple changes like tone or formatting, a few hundred strong examples can already help. For more complex behavior or domain adaptation, you usually need many more well-curated examples.

We'll use five examples in this tutorial to keep the training quick and easy, but the same code can be used with a much larger dataset in a real production workflow.

---

## What is LoRA?

Full fine-tuning can be expensive because large language models have a huge number of parameters. Updating all of them takes a lot of GPU memory, compute time, and storage.

LoRA, short for Low-Rank Adaptation, is a lighter way to fine-tune a model. It's one of the most common parameter-efficient fine-tuning (PEFT) methods, which means it adapts a pre-trained model without updating all of its original weights. Instead, the base model stays mostly frozen while LoRA adds a much smaller set of trainable adapter weights on top.

In this tutorial, we'll use QLoRA, which combines quantization with LoRA by loading the base model in low precision, usually 4-bit, and then training those LoRA adapters. This reduces memory use even further and makes fine-tuning much more practical on limited hardware.

We'll also use an open-source library called Unsloth that is designed to make large language model fine-tuning faster and more memory-efficient. It downloads the model weights, tokenizer, and config from the Hugging Face and is commonly used for workflows such as supervised fine-tuning with LoRA, especially when working with limited hardware.

---

## Motivation and Architecture

Once you build an AI agent, you may find that an off-the-shelf model needs long prompts, repeated instructions, and extra context just to produce the kind of output you want for your use case. That can increase token usage, latency, and cost while still giving inconsistent results. In cases like that, a natural next step is to train the model to respond in a way that's better aligned with your task.

The architecture is to load a quantized base model, format labeled chat examples, add LoRA adapters, train only those adapters with supervised fine-tuning, and save the resulting adapter weights so they can be loaded on top of the base model later for inference in your AI agent. The code is explained in the sections below.

---

## Step 1: Install Python Dependencies

Create a virtual environment and install the required packages:

```sh
python3 -m venv venv
source venv/bin/activate

pip install unsloth datasets transformers trl torch peft accelerate bitsandbytes
```

---

## Step 2: Training Code

We'll use `Qwen2.5-1.5B-Instruct` because it's a small instruction-tuned model that is practical for QLoRA fine-tuning on limited hardware.

At a high level, the cod loads the pre-trained `unsloth/Qwen2.5-1.5B-Instruct` model in 4-bit mode, which is what makes it a QLoRA-style workflow and keeps GPU memory usage low.

It then takes a small supervised fine-tuning dataset of five chat-style customer support examples (defined in top of the file), formats them with Qwen’s chat template, and attaches LoRA adapters to selected attention and MLP layers.

During training, `SFTTrainer` updates only those small LoRA adapter weights, not the full base model, using memory-efficient settings like gradient accumulation, 8-bit AdamW, and Unsloth gradient checkpointing.

Save this as train.py. I've included comments in the code to help you understand how it's all working:

```py :collapsed-lines
from unsloth import FastLanguageModel
from datasets import Dataset
from transformers import TrainingArguments
from trl import SFTConfig, SFTTrainer

max_seq_length = 2048

dataset = Dataset.from_list([
    {
        "messages": [
            {"role": "system",
             "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."},
            {"role": "user", "content": "Where is my order?"},
            {"role": "assistant", "content": "I can help with that. Please share your order number so I can check the latest shipping status."}
        ]
    },
    {
        "messages": [
            {"role": "system",
             "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."},
            {"role": "user", "content": "My package arrived damaged. What should I do?"},
            {"role": "assistant", "content": "I’m sorry about that. Please upload a photo of the damaged item and packaging, and I’ll guide you through a replacement or refund request."}
        ]
    },
    {
        "messages": [
            {"role": "system",
             "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."},
            {"role": "user", "content": "Can I return an item after 45 days?"},
            {"role": "assistant", "content": "Our standard return window is 30 days. If your item is defective or there was a shipping issue, please share the details and I can help review possible exceptions."}
        ]
    },
    {
        "messages": [
            {"role": "system",
             "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."},
            {"role": "user", "content": "I entered the wrong shipping address."},
            {"role": "assistant", "content": "If the order has not shipped yet, we may be able to update the address. Please send the order number and the correct shipping address as soon as possible."}
        ]
    },
    {
        "messages": [
            {"role": "system",
             "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."},
            {"role": "user", "content": "I was charged twice for my order."},
            {"role": "assistant", "content": "I’m sorry for the trouble. Please share your order number and the dates of the charges so we can review the duplicate payment and help resolve it quickly."}
        ]
    },
])

# Load a pretrained Qwen instruction model.
# Unsloth automatically configures efficient loading.
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/Qwen2.5-1.5B-Instruct",  # Pretrained model to load from Hugging Face / Unsloth

    max_seq_length=max_seq_length,               # Maximum sequence length the model should be prepared for
                                                 # Longer context = more memory usage

    load_in_4bit=True,                           # Load model weights in 4-bit quantized form
                                                 # Greatly reduces VRAM usage for training/inference
                                                 # Common for LoRA / QLoRA workflows

    dtype=None,                                  # Let Unsloth / Torch auto-pick the numeric precision
                                                 # Often chooses something suitable like float16/bfloat16
)


def format_example(example):
    text = tokenizer.apply_chat_template(
        example["messages"],          # Read the conversation from the "messages" field
        tokenize=False,               # Return a formatted string, not token IDs yet
        add_generation_prompt=False,  # Do not append an empty assistant prompt
                                      # because this example already includes the assistant response
    )
    return {"text": text}            # Return a new dataset field containing the formatted chat text


formatted_dataset = dataset.map(format_example)

# Instead of training billions of parameters,
# LoRA inserts small trainable matrices into attention layers.

model = FastLanguageModel.get_peft_model(
    model,  # Base pretrained model; LoRA adapters will be attached here

    r=16,   # LoRA rank:
            # size of the low-rank adapter matrices
            # higher = more capacity + more trainable params
            # lower = lighter/faster but less expressive

    target_modules=[
        "q_proj",    # Query projection in attention
        "k_proj",    # Key projection in attention
        "v_proj",    # Value projection in attention
        "o_proj",    # Output projection in attention
        "gate_proj", # Gating projection in MLP block
        "up_proj",   # Up projection in MLP block
        "down_proj", # Down projection in MLP block
    ],  # LoRA adapters are inserted only into these layers

    lora_alpha=16,  # LoRA scaling factor
                    # controls how strongly adapter updates affect the base weights
                    # often set equal to r

    lora_dropout=0, # Dropout on LoRA path during training
                    # 0 is common in Unsloth examples

    bias="none",    # Do not train bias parameters
                    # only LoRA adapter weights will be trainable

    use_gradient_checkpointing="unsloth",  # Use Unsloth's memory-saving checkpointing
                                           # lowers VRAM usage by recomputing activations during backprop

    max_seq_length=max_seq_length,  # Maximum token sequence length expected during training
)


trainer = SFTTrainer(
    model=model,                      # The model to fine-tune (base model + LoRA adapters)
    tokenizer=tokenizer,              # Converts text into token IDs the model can understand
    train_dataset=formatted_dataset,            # Your training data
    dataset_text_field="text",        # Column in the dataset that contains the training text
    max_seq_length=max_seq_length,    # Maximum number of tokens per example

    args=SFTConfig(
        output_dir="../outputs",         # Folder where checkpoints/logs/results will be saved

        per_device_train_batch_size=2, # Number of examples processed at once on each GPU
        gradient_accumulation_steps=4, # Accumulate gradients for 4 mini-batches before updating weights
                                       # Effective batch size ~= 2 * 4 = 8 on 1 GPU

        max_steps=30,                 # Stop training after 10 optimizer update steps
        logging_steps=1,              # Print/log training metrics every 1 step

        warmup_steps=5,               # Gradually increase learning rate for first 5 steps
        learning_rate=2e-4,           # Main learning rate for training

        optim="adamw_8bit",           # Memory-efficient AdamW optimizer (good for low VRAM setups)
        weight_decay=0.01,            # Small regularization to help prevent overfitting
        lr_scheduler_type="linear",   # After warmup, reduce learning rate linearly over time

        seed=3407,                    # Random seed for more reproducible training
        report_to="none",             # Disable external logging tools like WandB
    ),
)

trainer.train()


# Saves only the LoRA adapter weights, not the full base model.
model.save_pretrained("qwen2_0_5b_lora")

# Save the tokenizer so inference uses the same vocabulary.
tokenizer.save_pretrained("qwen2_0_5b_lora")
```

---

## Step 3: Inference Code

At a high level, the inference code contains the `generate_reply()` function that loads a model with Unsloth (optionally from either a base model name or a locally saved LoRA adapter directory), enables inference optimizations, formats the chat messages into the prompt structure expected by Qwen, tokenizes that prompt, moves it to the available device, and then generates a reply with `model.generate()`

Save this as inference.py:

```py :collapsed-lines
from unsloth import FastLanguageModel
import torch

messages = [
    {
        "role": "system",
        "content": "You are a helpful ecommerce customer support assistant. Be polite, concise, and do not invent order details."
    },
    {
        "role": "user",
        "content": "I want to cancel my order."
    }
]


def generate_reply(model_name, messages):
    # Load the base model and automatically attach the saved LoRA adapter.
    # "qwen2_0_5b_lora" is the directory created by model.save_pretrained().
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=model_name,  # Path or model name for your fine-tuned LoRA model/adapters
        max_seq_length=2048,  # Maximum context length the model should support. Longer context uses more memory
        load_in_4bit=True,  # Load weights in 4-bit quantized form. Reduces VRAM usage during inference
    )

    # Enable inference optimizations (faster generation, lower memory usage).
    FastLanguageModel.for_inference(model)


    # Convert the chat messages into the format expected by Qwen.
    inputs = tokenizer.apply_chat_template(
        messages,                       # List of chat messages: system / user / assistant turns
        tokenize=True,                  # Convert the formatted chat prompt into token IDs
        add_generation_prompt=True,     # Add the assistant prompt so the model knows to generate a reply
        return_tensors="pt",            # Return PyTorch tensors
    )

    # Move the input tensor to the same device as the model
    device = "cuda" if torch.cuda.is_available() else "cpu"
    inputs = inputs.to(device)

    # Generate the assistant's response.
    outputs = model.generate(
        input_ids=inputs,               # Tokenized prompt passed into the model
        max_new_tokens=80,              # Generate up to 80 new tokens in the response
        temperature=0.2,                # Low temperature = more deterministic / focused output
                                        # High temperature = more random / creative output
    )

    # Remove the prompt so that only the newly generated response remains.
    generated_tokens = outputs[0][inputs.shape[-1]:]
    # Convert token IDs back into readable text.
    response = tokenizer.decode(generated_tokens, skip_special_tokens=True)
    return response


before = generate_reply("unsloth/Qwen2-0.5B-Instruct-bnb-4bit", messages)
after = generate_reply("./qwen2_0_5b_lora", messages)

print("=== BEFORE SFT ===")
print(before)
print()
print("=== AFTER SFT ===")
print(after)
```

---

## Sample Output

The training run has the following output:

```plaintext
$ python train.py
...
Unsloth: LoRA applied — 18,464,768 trainable params (4.04% of 456,701,440 total)
...
Unsloth: Training for 30 steps, BS=2, grad_accum=4, seq_len=2048
Unsloth: Features: CCE, GC, LR=linear, opt=adamw
  Step 1/30 | Loss: 3.9350 | Grad: 4.8440 | LR: 0.00e+00 | Tok/s: 352 | Peak: 2.35 GB
  Step 2/30 | Loss: 4.0082 | Grad: 4.9456 | LR: 4.00e-05 | Tok/s: 388 | Peak: 2.50 GB
...
  Step 30/30 | Loss: 0.0646 | Grad: 0.6915 | LR: 8.00e-06 | Tok/s: 379 | Peak: 2.57 GB

Unsloth: Training complete! Avg loss: 1.2078 | Total time: 35.6s | Steps: 30 | Tokens: 14480
Unsloth: LoRA adapters saved to outputs
Unsloth: Saved final adapters to outputs
```

The output shows that LoRA was applied successfully and only about 4% of the model parameters were trained, which keeps the fine-tuning process lightweight.

During the 30 training steps, Unsloth logs useful metrics like loss, learning rate, tokens per second, and peak memory usage. The loss drops from around 3.9 to 0.06, showing that the model is learning from the small dataset, and the run completes in about 35 seconds using only around 2.6 GB of memory.

At the end, Unsloth saves the trained LoRA adapter weights to the `outputs` directory for later inference. You'll see a new dir `qwen2_0_5b_lora` with these files:

```plaintext
adapter_config.json
adapters.safetensors
chat_template.jinja
tokenizer.json
tokenizer_config.json
```

The saved LoRA output includes a few small but important files. `adapter_config.json` stores the LoRA adapter settings, such as which layers were adapted and how the adapter was configured. `adapters.safetensors` contains the actual trained LoRA weights. `chat_template.jinja` defines how system, user, and assistant messages are formatted into the prompt structure expected by the model. <VPIcon icon="iconfont icon-json"/>`tokenizer.json` stores the tokenizer vocabulary and tokenization rules, while <VPIcon icon="iconfont icon-json"/>`tokenizer_config.json` stores tokenizer settings such as special tokens and formatting behavior.

Together, these files are enough to reload the fine-tuned adapter and run inference with the same prompt and tokenization setup used during training.

Now run the inference script to test the fine-tuned model. It will load the LoRA adapter weights saved in the `qwen2_0_5b_lora` directory and apply them on top of the base model during inference.

The user prompt is "I want to cancel my order". The below output show both pre-SFT and post-SFT answer from the same model.

```sh
python inference.py
#
# === BEFORE SFT ===
# Sure, I'd be happy to help you with that! To cancel your order, please follow these steps:
# 
# 1. **Review Your Order**: Before you can cancel your order, you need to review it. Make sure you have all the necessary information, such as your order number, order date, and any other relevant details.
# 
# 2. **Review Your Order Details**: Once you've reviewed your order
# 
# === AFTER SFT ===
# If your order has not yet shipped, we may be able to cancel it for you. Please share your order number and the reason for cancellation so I can help process the refund or credit.
```

Before SFT, the base model gave a generic, somewhat verbose answer that sounded helpful but didn't follow a clear ecommerce support workflow.

After SFT, the model produced a more concise and operational response, correctly asking for the order number and framing cancellation around shipment status. This shows how SFT can improve role alignment and response style even with a relatively small domain-specific dataset

---

## Fine-Tuning vs Prompt Engineering vs Distillation

Prompt engineering, fine-tuning, and distillation all shape model behavior in different ways.

Prompt engineering works at inference time by changing the instructions you give the model. It's usually the fastest and cheapest place to start.

Fine-tuning goes further by training the model on examples so it learns the patterns you want more consistently.

Distillation is used when you want a smaller model to imitate the behavior of a stronger one.

In practice, prompt engineering is often the first step, fine-tuning is the main next step when you need stronger task alignment, and distillation matters when efficiency becomes a bigger goal.

---

## Conclusion

In this tutorial, we fine-tuned a pretrained language model with supervised fine-tuning using QLoRA. Instead of training a model from scratch, we started with a general-purpose instruction model, trained it on a small set of example conversations, and updated only the lightweight LoRA adapter weights. That made the workflow much more practical on limited hardware while still letting the model adapt to a specific customer support use case.

From here, you can experiment with larger datasets, different prompt/response styles, or a bigger base model to see how the behavior changes. Happy tinkering!

::: info About Author

If you enjoyed this tutorial, you can find more of my writing on my [blog](http://darshshah.org/blog) (recent posts include a system design paper series), my work on my personal [<VPIcon icon="fas fa-globe"/>website](https://darshshah.org/), and updates on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`darshs`)](https://linkedin.com/in/darshs).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Customize an LLM for AI Agents using SFT and QLoRA",
  "desc": "In this tutorial, I’ll show you how to fine-tune a large language model for use in AI agents using supervised fine-tuning with QLoRA. This lets us customize a pre-trained model so it behaves the way w",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-customize-an-llm-for-ai-agents-using-sft-and-qlora.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
