---
lang: en-US
title: "How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI"
description: "Article(s) > How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI"
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI"
    - property: og:description
      content: "How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-train-a-tumor-segmentation-model-on-ultrasound-data-with-monai.html
prev: /programming/py-torch/articles/README.md
date: 2026-07-23
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3e7cfe47-858c-4ce9-b8f9-1c5fc22f29b7.png
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
  name="How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI"
  desc="Most segmentation tutorials begin by choosing a model, feeding images into it, and tuning hyperparameters until the metric improves. But this skips the step that often matters most: understanding the "
  url="https://freecodecamp.org/news/how-to-train-a-tumor-segmentation-model-on-ultrasound-data-with-monai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3e7cfe47-858c-4ce9-b8f9-1c5fc22f29b7.png"/>

Most segmentation tutorials begin by choosing a model, feeding images into it, and tuning hyperparameters until the metric improves. But this skips the step that often matters most: understanding the data.

In this tutorial we’ll profile the dataset first, then let those observations drive every design decision in a MONAI segmentation pipeline.

---

## Who is This For?

This walkthrough assumes you have some comfort with Python and the basics of training a neural network. It explains the MONAI-specific pieces (dictionary transforms, `DiceCELoss`, `DiceMetric`) and the medical-imaging terms (BI-RADS, hypoechoic, patient-grouped folds) as they come up. No prior ultrasound experience is needed.

---

## About the Dataset

The dataset is [<VPIcon icon="iconfont icon-kaggle"/>BUS-BRA](https://kaggle.com/datasets/orvile/bus-bra-a-breast-ultrasound-dataset), a public collection of breast ultrasound images with biopsy-proven labels and tumor segmentation masks.

Each image carries a benign/malignant label, a BI-RADS (Breast Imaging Reporting and Data System) category (a radiologist's suspicion score from 2 to 5), a histology string, and a binary tumor mask. The CSV that ships with it also includes predefined cross-validation folds.

The task is binary: separate tumor from background. BUS-BRA contains 1,875 B-mode breast ultrasound images from 1,064 patients, acquired on four scanners at a cancer institute in Brazil.

![Example from the BUS-BRA dataset showing a breast ultrasound image, its binary tumor segmentation mask, and the mask overlaid on the original image.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/24ecadc1-13ff-4dfb-a6fc-61ab03785a7e.png)

---

## What is MONAI, and Why Use it?

MONAI (Medical Open Network for AI) is an open-source PyTorch framework built specifically for medical imaging. It's a domain-specific layer that sits on top of PyTorch: you still write standard PyTorch training loops, but MONAI provides the medical imaging-specific components so you don't have to build them yourself.

It gives you:

- **Transforms** for medical data, loading formats like DICOM and NIfTI, normalizing intensities, resizing, and augmenting, all in a dictionary-based pipeline that keeps an image and its mask in sync.
- **Network architectures** common in medical segmentation (U-Net, UNETR, SegResNet, and others) ready to instantiate.
- **Loss functions and metrics** designed for segmentation, including Dice-based losses and the Dice metric.

The result is less boilerplate and fewer chances for an image and its mask to drift out of alignment.

---

## What is Dice?

Dice (the Dice similarity coefficient) measures how much two regions overlap. In segmentation, it compares the model's predicted mask against the ground-truth mask and returns a score from 0 to 1: 0 means no overlap at all, 1 means a perfect match.

The formula is:

$$
\text{Dice}=2\times\frac{\text{overlap}}{\left(\text{predicted\:area}+\text{true\:area}\right)}
$$

The "2 ×" in the numerator is what keeps the score in the 0-to-1 range even though the denominator counts the overlapping pixels on both sides.

Two roles it plays in this tutorial:

- As a **metric**, Dice is how the run is scored. A validation Dice of 0.876 means the predicted tumor masks overlap the true masks by about 88% on average.
- As a **loss** (`DiceCELoss`), a Dice-based term is what the model trains against. This is the part that matters for the class-imbalance problem: because Dice measures overlap rather than per-pixel correctness, a model can't score well by labeling everything as background. A small tumor counts as much as a large one, so the model is pushed to actually find the tumor region.

---

## Part 1 — Data Profile Before Modeling

This first pass is data profiling. It reads every image and mask once and answers a short list of questions whose answers determine how the pipeline must be built. Running these checks takes a few seconds and saves a lot of guesswork later.

The snapshot below summarizes the properties that directly influenced the pipeline design. We’ll let these observations determine each step of the workflow.

| What the snapshot measured | The number | What it forces |
| --- | --- | --- |
| Distinct image resolutions | Hundreds of different (width, height) pairs | Images must be resized to a fixed size before batching |
| Class balance | Background : foreground ≈ 10.6 : 1 | A plain pixel-wise loss may converge toward predicting mostly background because doing so already yields high pixel accuracy on this imbalanced dataset. |
| Per-image brightness | Wide spread across the dataset | Intensity normalization belongs in the transform pipeline |
| Patients vs. images | 1,064 patients, 1,875 images (paired left/right views) | Splits must be grouped by patient, or the same person leaks across train and validation |
| Mask components | Every mask is a single connected region | A prediction with several disconnected blobs is provably wrong |
| Pixel format | Images are 8-bit grayscale, masks are 1-bit binary | Load as single-channel, binarize the mask after loading |

Two of these deserve a closer look because they shape the two most important decisions.

### Class Balance Drives the Toss

Tumors are small. Across the dataset, background pixels outnumber tumor pixels by more than ten to one.

A model trained with ordinary binary cross-entropy can score around 91% pixel accuracy by labeling everything as background. This high number reflects the imbalance rather than any ability to find the tumor.

The fix is a loss that rewards overlap with the actual tumor region, which points directly at Dice.

![Bar chart comparing foreground and background pixels in the BUS-BRA dataset. Background pixels outnumber tumor pixels by approximately 10.6 to 1, illustrating the strong class imbalance.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/69c14498-7119-4f15-a29b-9bf34fdcd51f.png)

### Patient Counts Drive the Split

There are fewer patients than images because many patients contribute both a left-side and a right-side scan. If a random split puts one patient's left scan in training and their right scan in validation, the validation score is inflated by leakage.

The dataset authors already solved this: the CSV ships a `K5P` column: a 5-fold split where **P** stands for patient-grouped, meaning every image from a given patient lands in the same fold. Reusing it is safer than rebuilding the same grouping by hand.

With those answers in hand, the pipeline has a specification to build now.

---

## Part 2 — Building the Pipeline

Everything below uses MONAI for the segmentation-specific work:  
transforms, dataset wrapping, the network, the loss, and the metric.

### A Single Config Object

The pipeline reads all its knobs from one dataclass. Nothing downstream hard-codes a constant, so re-running an experiment with a different fold or image size is a single edit.

```py
from dataclasses import dataclass
from typing import Tuple, Optional
from pathlib import Path

@dataclass
class TrainConfig:
    data_root: Optional[Path] = None
     fold_column: str = "K5P"          # patient-grouped 5-fold (dev set)
    val_fold: int = 1                 # which K5P fold is validation
    test_column: str = "HOP"          # patient-grouped hold-out partition
    test_group: int = 1               # HOP value reserved as the test set

    image_size: Tuple[int, int] = (256, 256)
    batch_size: int = 16
    lr: float = 1e-3
    epochs: int = 30
    use_amp: bool = True              # mixed precision
    ckpt_path: str = "best_model.pt"

cfg = TrainConfig()
```

The code above defines a `TrainConfig` dataclass holding every setting the pipeline needs: the fold column and which fold to validate on, the target image size, batch size, learning rate, epoch count, a mixed-precision switch, and where to save the best model. Creating `cfg` once gives every later step a single place to read its settings from.

### The Patient-grouped Split

The split uses two predefined columns. `HOP` (Hold-Out Partition) reserves a patient-disjoint slice as the test set, untouched until the very end. Within the remaining development set, one `K5P` fold becomes validation and the other four are training. Short assertions confirm no patient appears in more than one split.

```py
dev_df   = manifest[manifest[cfg.test_column] != cfg.test_group]
test_df  = manifest[manifest[cfg.test_column] == cfg.test_group]

train_df = dev_df[dev_df[cfg.fold_column] != cfg.val_fold]
val_df   = dev_df[dev_df[cfg.fold_column] == cfg.val_fold]

# no patient may appear in more than one split
for a, b in [(train_df, val_df), (train_df, test_df), (val_df, test_df)]:
    assert not (set(a["Case"]) & set(b["Case"])), "patient leakage"
```

The above code first splits off the `HOP` test set, then divides the remaining development rows into validation (the chosen `K5P` fold) and training (the rest). It then checks that every pair of splits shares no patient `Case`. If any does, the assertion fails immediately.

### Transforms, Chosen by the Snapshot

MONAI's dictionary transforms operate on records keyed by name (`"image"` and `"label"`) and apply matched operations to both. Each step here answers a **Part 1 data profile** finding.

```py
from monai.transforms import (
    Compose, LoadImaged, EnsureChannelFirstd, ScaleIntensityd,
    AsDiscreted, Resized, RandFlipd, EnsureTyped,
)
import torch

base = [
    LoadImaged(keys=["image", "label"], reader="PILReader", image_only=True),
    EnsureChannelFirstd(keys=["image", "label"]),
    ScaleIntensityd(keys="image"),                       # brightness spread
    AsDiscreted(keys="label", threshold=0.5),            # clean {0, 1} mask
    Resized(keys=["image", "label"],                     # hundreds of sizes
            spatial_size=cfg.image_size,
            mode=("bilinear", "nearest")),
]

train_transforms = Compose(base + [
    RandFlipd(keys=["image", "label"], prob=0.5, spatial_axis=1),  # horizontal
    EnsureTyped(keys=["image", "label"], dtype=torch.float32),
])
val_transforms = Compose(base + [
    EnsureTyped(keys=["image", "label"], dtype=torch.float32),
])
```

The above code builds a shared list of base steps, loads the PNG, moves the channel to the front, scales the image to [0, 1], binarizes the mask, and resizes both to 256×256. It then wraps that list in two pipelines. The training pipeline adds a random horizontal flip, and the validation pipeline does not, so evaluation always sees the image as-is.

Horizontal flips are a simple augmentation that preserve anatomical plausibility in this dataset. More aggressive augmentations, such as large rotations or elastic deformations, should be validated carefully because they may distort clinically meaningful structures.

Images use bilinear interpolation to preserve intensity gradients, while masks use nearest-neighbor interpolation so class labels remain strictly 0 or 1. Bilinear interpolation on masks would create artificial label values along object boundaries.

### Model, Loss, and Metric

The network is a MONAI `UNet` with one input channel (grayscale) and one output channel (the tumor logit). The loss is the one the class-balance finding pointed at.

U-Net consists of an encoder that captures context at progressively coarser resolutions and a decoder that reconstructs fine spatial detail. Skip connections transfer high-resolution features directly from encoder to decoder, making U-Net especially effective for medical segmentation where boundaries matter.

```py
from monai.networks.nets import UNet
from monai.losses import DiceCELoss
from monai.metrics import DiceMetric
from monai.transforms import Activations, AsDiscrete

model = UNet(
    spatial_dims=2, in_channels=1, out_channels=1,
    channels=(16, 32, 64, 128, 256), strides=(2, 2, 2, 2),
    num_res_units=2,
).to(device)

loss_fn = DiceCELoss(sigmoid=True)       # Dice handles the imbalance; CE smooths the gradient
metric  = DiceMetric(include_background=True, reduction="mean")
post_pred = Compose([Activations(sigmoid=True), AsDiscrete(threshold=0.5)])
   
```

The above code creates the U-Net (five resolution levels, one input and one output channel) and moves it to the GPU. It then defines the three pieces that surround it: the loss, the validation metric, and a `post_pred` step that turns raw model outputs into a clean 0/1 mask by applying a sigmoid and thresholding at 0.5. `DiceCELoss` combines two terms. The Dice part is scale-invariant in the foreground area, so a small tumor counts as much as a large one and the model can't win by ignoring tumors. The cross-entropy part adds a smoother gradient where Dice is flat. The `sigmoid=True` flag tells the loss to apply the activation itself, so the model outputs raw logits and the `post_pred` step handles the sigmoid-and-threshold at evaluation time. This U-Net comes out to about 1.6 million parameters.

The training loop itself is mostly standard PyTorch. MONAI stays out of the optimization logic, the only segmentation-specific pieces are the loss, transforms, and evaluation metric.

```py
for epoch in range(1, cfg.epochs + 1):
    model.train()
    for batch in train_loader:
        img, lab = batch["image"].to(device), batch["label"].to(device)
        optimizer.zero_grad(set_to_none=True)
        with torch.amp.autocast("cuda", enabled=cfg.use_amp):
            loss = loss_fn(model(img), lab)
        scaler.scale(loss).backward()
        scaler.step(optimizer); scaler.update()

    model.eval(); metric.reset()
    with torch.no_grad():
        for batch in val_loader:
            img, lab = batch["image"].to(device), batch["label"].to(device)
            pred = post_pred(model(img))
            metric(y_pred=pred, y=lab)
    val_dice = metric.aggregate().item()
    if val_dice > best_dice:
        best_dice = val_dice
        torch.save(model.state_dict(), cfg.ckpt_path)
```

In the above code, each epoch runs two passes. The training pass moves every batch to the GPU, computes the loss under mixed precision, and updates the weights through the gradient scaler. The validation pass then runs with gradients turned off, converts predictions with `post_pred`, and accumulates Dice across the fold. Whenever the epoch's Dice beats the best seen so far, the model weights are saved to disk.

---

## Reading the Results

Two curves summarize the run. Training loss falls steadily and flattens near 0.12. Validation Dice climbs from about 0.57 to a plateau, with a best of **0.866** reached at epoch 28. ![Training curves showing loss decreasing steadily over 30 epochs while validation Dice increases and plateaus around 0.866, indicating convergence with mild overfitting.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/2a70807b-9d3d-4ff1-9610-7100aaaac984.png)

A few things are worth reading off these curves:

- The loss decreasing monotonically means the model is learning. The gradient signal is real.
- The loss flattening above zero rather than reaching it is expected. `DiceCELoss` has a floor, because the cross-entropy term never fully vanishes on ambiguous boundary pixels. A loss that reached zero would be a warning sign, not a triumph.
- Validation Dice plateauing above ~0.85 while training loss keeps falling is the mild-overfitting signature. Extra epochs mostly lower train loss without moving val Dice. It's not severe here, so the 30-epoch budget is fine, but a patience-based early-stopping rule would be a reasonable add.

A validation Dice of 0.866 sits in a reasonable range for a plain 2D U-Net on this dataset. But validation Dice measures a checkpoint chosen using that same set, so it runs a little optimistic.

The final, untouched check is the `HOP` test set, scored exactly once, after all training and model selection are done. It comes in at **0.864**, essentially matching the 0.866 validation figure. The model generalizes to patients it never saw during training or selection, and the validation number wasn't hiding leakage.

---

## Prediction Visualization

Metrics summarize overall performance, but they don’t show *how* the model is segmenting individual tumors.

The figure below presents a representative validation example. From left to right are the input ultrasound image, the ground-truth mask, the model’s predicted mask, and the prediction overlaid on the original image.

The close agreement between the prediction and the ground-truth annotation illustrates how the model localizes both the position and the boundary of the lesion.

![Four-panel visualization showing a representative segmentation result: the original breast ultrasound image, the ground-truth tumor mask, the model’s predicted mask, and the predicted mask overlaid on the original image. The prediction closely matches the annotated tumor boundary.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/ada82859-b2ba-4fd4-bc45-086177990a3f.png)

---

## The Failure Modes Matter More Than the Average

An average Dice of 0.866 can hide very different behaviors. It could mean every case is mediocre, or most cases are excellent and a few fail badly.

To distinguish between those possibilities, sort the validation set by per-image Dice and inspect the lowest-scoring predictions.

On this fold, only 4 of 299 validation cases scored below 0.5, about 1%. Looking at those four overlays surfaces a clear pattern. Three of the four worst predictions are **fragmented**: the model outputs several disconnected blobs where the ground truth is a single region. The fourth confuses a dark acoustic shadow, a common ultrasound artifact, for tumor tissue.

That fragmentation pattern connects straight back to a snapshot finding: the data-quality pass measured that **every ground-truth mask in BUS-BRA is a single connected component**. So a multi-blob prediction is wrong by a property of the dataset, which points at keeping only the largest connected component as a post-processing step:

```py
from monai.transforms import KeepLargestConnectedComponent

post_pred = Compose([
    Activations(sigmoid=True),
    AsDiscrete(threshold=0.5),
    KeepLargestConnectedComponent(applied_labels=[1]),
])
```

This code rebuilds the `post_pred` pipeline with one extra step at the end. After the sigmoid and threshold produce a binary mask, `KeepLargestConnectedComponent` discards every predicted region except the largest one, so a prediction split into several blobs collapses to its single biggest piece. This matches the dataset's one-region-per-mask property.

I measured this on the validation set, and the honest result is more nuanced than "free accuracy." It recovers a few of the fragmented cases, but the net change in mean Dice is marginal and can even go slightly negative. When a real lesion is predicted as two touching pieces, discarding the smaller one throws away true-positive area. So it's a targeted lever for a specific failure mode, not a free boost: worth exploring, not adopting blindly.

The shadow-confusion case is harder still, telling a hypoechoic tumor from a dark shadow region sometimes needs context a small grayscale crop doesn't carry. This points toward higher resolution or a wider receptive field as directions for later experiments.

::: info Where to Go Next

Once you have a reliable baseline, the next experiments become much more meaningful. Rather than randomly trying larger models, start from the failure modes you observed:

- Replace the 2D U-Net with Attention U-Net or DynUNet.
- Train at higher resolution to better capture small lesions.
- Apply connected-component analysis selectively during inference.
- Explore test-time augmentation.
- Compare DiceCE with Focal Tversky loss for highly imbalanced lesions.

:::

---

## Takeaway

The through-line is profile the data, then let what you find make the decisions.

The resize came from a resolution check. The loss came from a class-balance check. The split came from a patient count. The most useful post-processing idea came from a mask-component check run before training started. None of these were guesses, and none of them needed a sweep to discover.

A model is easy to build. A model whose every choice has a reason behind it is easier to trust, easier to debug, and easier to explain to the person who reads it next.

:::: info Reference

The complete, runnable code for this walkthrough is available as a MONAI notebook: [<VPIcon icon="iconfont icon-jupyter"/>`busbra_segmentation_monai.ipynb` (<VPIcon icon="iconfont icon-github"/>`lakshmi-mahabaleshwara/wg-ultrasound`)](https://github.com/lakshmi-mahabaleshwara/wg-ultrasound/tree/bus_bra_tumor_segmentation/data_and_tutorials/bus_bra_tutor_segmentation). It runs top to bottom on Kaggle or Colab, and auto-downloads the dataset if it's not already attached.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Train a Tumor Segmentation Model on Ultrasound Data with MONAI",
  "desc": "Most segmentation tutorials begin by choosing a model, feeding images into it, and tuning hyperparameters until the metric improves. But this skips the step that often matters most: understanding the ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-train-a-tumor-segmentation-model-on-ultrasound-data-with-monai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
