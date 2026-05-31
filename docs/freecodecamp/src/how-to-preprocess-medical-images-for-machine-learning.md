---
lang: en-US
title: "How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays"
description: "Article(s) > How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays"
icon: 
category:
  - Python
  - NumPy
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - numpy
  - py-numpy
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays"
    - property: og:description
      content: "How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-preprocess-medical-images-for-machine-learning.html
prev: /programming/py-numpy/articles/README.md
date: 2026-06-05
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/eab58d7c-f63a-41ae-a01e-52a65b0be17c.png
---

# {{ $frontmatter.title }} 관련

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
  name="How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays"
  desc="Working with healthcare data introduces preprocessing challenges that go beyond those you might encounter with structured data. Some familiar techniques still apply, while others look very different o"
  url="https://freecodecamp.org/news/how-to-preprocess-medical-images-for-machine-learning"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/eab58d7c-f63a-41ae-a01e-52a65b0be17c.png"/>

Working with healthcare data introduces preprocessing challenges that go beyond those you might encounter with structured data. Some familiar techniques still apply, while others look very different once your data becomes medical images.

In this article, you’ll learn how to prepare a real-world medical imaging dataset for machine learning, from initial data validation to a complete preprocessing pipeline.

We’ll use the Chest X-Ray Pneumonia dataset as our running example, but the lessons apply broadly to healthcare imaging data, including ultrasound, MRI, CT, and dermatology images.

::: info What You'll Learn in This Article

By the end of this article, you'll know how to:

- Approach healthcare data preprocessing differently from preprocessing structured data, and recognize where standard techniques fall short
- Validate a medical imaging dataset before training to catch corrupted files, mislabels, and data leakage between train and test
- Apply six core preprocessing techniques for medical images
- Build a complete preprocessing pipeline for chest X-rays using Python with OpenCV.

:::

---

## Why Preprocessing Data Matters More in Healthcare

Imagine handing a toddler a jigsaw puzzle with missing pieces, warped edges, and pieces from three different puzzles mixed together. The toddler can't solve it, but that isn't really the toddler's fault.

The same thing happens when raw, messy data gets fed into a machine learning model. A bad prediction on a clinical image can mean a missed diagnosis.

![Illustration showing a healthcare data preprocessing workflow. Mixed medical images with different sizes, missing labels, noisy scans, and corrupted files enter a preprocessing pipeline and emerge as clean, standardized, model-ready images ready for machine learning.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/55671e0b-95ea-4f99-b507-a8742e8981d9.png)

Healthcare data tends to be messier than what most ML practitioners are used to:

- Images come from different machines, hospitals, and acquisition protocols
- Labels are inconsistent, sometimes missing, sometimes wrong
- Patient data is incomplete
- Image sizes, contrast levels, and orientations vary across sources

Poor preprocessing often leads to models that perform well on benchmark datasets but struggle to generalize to data collected from different hospitals or imaging devices.

---

## The Dataset

This guide uses the **Chest X-Ray Pneumonia dataset** by Paul Mooney on Kaggle. It's a strong choice for learning preprocessing because:

- It contains around 5,800 pediatric chest X-rays
- It has two clear classes — Normal and Pneumonia
- It's already organized into train, validation, and test folders
- The images are recognizable without specialized medical training
- It exhibits almost every preprocessing challenge worth learning

The dataset is available at [<VPIcon icon="iconfont icon-kaggle"/>Kaggle: Chest X-Ray Pneumonia](https://kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia).

### Folder Structure

After downloading, the dataset is organized like this:

```sh title="file structure"
chest_xray/
├── train/
│   ├── NORMAL/
│   └── PNEUMONIA/
├── val/
│   ├── NORMAL/
│   └── PNEUMONIA/
└── test/
    ├── NORMAL/
    └── PNEUMONIA/
```

Side-by-side comparison — Normal vs Pneumonia chest X-ray:

![Side-by-side chest X-ray images showing a normal lung scan on the left and a pneumonia scan on the right. The pneumonia image contains visible cloudy opacities compared with the clearer lung fields in the normal image.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/b92e1e14-ac24-4314-afce-bc2c3ce3ea32.png)

A quick first look at one of the images:

```py
import os
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import cv2

DATA_DIR = "chest_xray"
TRAIN_DIR = os.path.join(DATA_DIR, "train")

# Peek at a sample image
sample_path = os.path.join(TRAIN_DIR, "NORMAL", os.listdir(os.path.join(TRAIN_DIR, "NORMAL"))[0])
sample_image = cv2.imread(sample_path, cv2.IMREAD_GRAYSCALE)

print(f"Image shape: {sample_image.shape}")
print(f"Pixel range: {sample_image.min()} to {sample_image.max()}")
print(f"Data type: {sample_image.dtype}")
```

The output reveals a few useful things right away: most images are large (often around 1500×2000 pixels), pixel values fall in the 0–255 range, and image sizes vary across the dataset. Each of these observations will inform a preprocessing step.

---

## Before Preprocessing: Validate the Dataset

Before applying any transformations, it's worth checking that the data itself is intact. This step alone catches issues that would otherwise cause training to fail silently or produce misleading results.

A simple validation function:

```py :collapsed-lines
def validate_dataset(data_dir):
    """Scan a dataset folder and flag common data quality issues."""
    corrupted = []
    too_small = []
    nearly_black = []
    total = 0
    
    for class_name in os.listdir(data_dir):
        class_path = os.path.join(data_dir, class_name)
        if not os.path.isdir(class_path):
            continue
        for fname in os.listdir(class_path):
            fpath = os.path.join(class_path, fname)
            total += 1
            try:
                img = cv2.imread(fpath, cv2.IMREAD_GRAYSCALE)
                if img is None:
                    corrupted.append(fpath)
                    continue
                if img.shape[0] < 100 or img.shape[1] < 100:
                    too_small.append(fpath)
                if img.mean() < 5:
                    nearly_black.append(fpath)
            except Exception:
                corrupted.append(fpath)
    
    print(f"Total files scanned: {total}")
    print(f"Corrupted: {len(corrupted)}")
    print(f"Too small: {len(too_small)}")
    print(f"Nearly black: {len(nearly_black)}")
    return corrupted, too_small, nearly_black

validate_dataset(TRAIN_DIR)
```

Common issues this catches:

- **Corrupted files** — files that won't open at all
- **Empty or nearly-black images** — failed acquisitions or saved-as-blank files
- **Wrong dimensions** — thumbnails or partial downloads mixed in
- **Duplicate images** — the same scan appearing in both train and test (this causes data leakage)
- **Mislabeled images** — a normal X-ray placed in the pneumonia folder

::: critical ⚠️ This step is critical

One corrupted file can crash a training loop hours into a run. One duplicate between train and test can inflate accuracy scores by several percentage points without anyone noticing.

:::

---

## The Six Pillars of Healthcare Imaging Preprocessing

Preprocessing for medical images can be organized around six core concerns. Two of them carry over directly from preprocessing structured data. Two need to be adapted because the mechanics change when the input is an image. And two are entirely new, they only exist once the data becomes pictures of human bodies.

### Pillar 1: Scaling — Making the Numbers Play Fair

Imagine two children comparing their collections. One has 3 seashells. The other has 3,000 stickers. Asking who has more makes the answer seem obvious, but the *scales* are completely different. Comparing them meaningfully means putting both collections on the same measuring system.

In medical images, pixels usually range from 0 to 255 in 8-bit images, or 0 to 65,535 in some 16-bit medical DICOM images. Neural networks tend to train faster and more reliably when input values are small numbers close to zero.

![Histogram comparison showing chest X-ray pixel values before and after scaling. The left histogram displays values in the 0–255 range, while the right histogram shows the same distribution scaled to the 0–1 range used for machine learning.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/1d864b0d-992c-4637-8f43-7ca86c6fd93c.png)

::: tip The fix

Divide every pixel by its maximum possible value, bringing everything into the 0-to-1 range.

```py
image = cv2.imread(sample_path, cv2.IMREAD_GRAYSCALE)

# Scale to [0, 1]
image_scaled = image.astype(np.float32) / 255.0

print(f"Before scaling: {image.min()} to {image.max()}")
print(f"After scaling:  {image_scaled.min():.3f} to {image_scaled.max():.3f}")
```

:::

::: important Takeaway

Pixel scaling follows the same principle as scaling any numerical feature. The values simply happen to be arranged as an image rather than a column.

:::

### Pillar 2: Normalization — Centering the Data

Imagine a teacher asks a class to rate a movie from 1 to 10. One child always gives 9s and 10s. Another spreads ratings evenly from 1 to 10. Comparing their opinions fairly requires adjusting each child's score relative to their own average.

In medical imaging even after scaling to 0–1, the overall brightness of images can vary. Some X-rays are taken with stronger exposure than others. Normalization shifts and rescales each image (or each channel) so the values are centered around zero with a standard deviation of one.

::: tip The fix

Subtract the mean, divide by the standard deviation.

```py
# Compute mean and std from the TRAINING set only — never from validation or test
def compute_train_stats(train_dir, sample_limit=1000):
    """Compute pixel mean and std across the training set."""
    pixel_values = []
    count = 0
    for class_name in os.listdir(train_dir):
        class_path = os.path.join(train_dir, class_name)
        for fname in os.listdir(class_path):
            if count >= sample_limit:
                break
            img = cv2.imread(os.path.join(class_path, fname), cv2.IMREAD_GRAYSCALE)
            if img is not None:
                pixel_values.append(img.astype(np.float32).flatten() / 255.0)
                count += 1
    pixels = np.concatenate(pixel_values)
    return pixels.mean(), pixels.std()

train_mean, train_std = compute_train_stats(TRAIN_DIR)
image_normalized = (image_scaled - train_mean) / train_std
```

:::

::: warning

Avoid this common mistake: Statistics for normalization should be computed from the training set only, never from validation or test. Including those in the calculation leaks information from the evaluation data into the model. The same statistics should then be applied to validation, test, and any new data at inference time.

:::

::: important Takeaway

Centering and scaling each image around the dataset's statistics is the imaging equivalent of standardizing a feature column. The pixels are now comparable across images, regardless of how bright or dim each scan happened to be.

:::

### Pillar 3: Guiding the Model's Attention

Imagine a child walking into a crowded pet store. Instead of describing every animal in sight, a parent points to the features that matter: *“Look at the soft fur, the fluffy tail, and the nice small size.”* The child learns where to focus their attention.

Medical image preprocessing does something similar. It highlights the regions and features most relevant to the diagnostic task.

- **Region-of-interest (ROI) cropping** — focus on the lung field and discard the patient's arms, machine borders, and any imprinted text
- **Contrast enhancement** — use techniques like CLAHE (Contrast Limited Adaptive Histogram Equalization) to make subtle lung textures more visible
- **Channel selection** — for images stored as RGB but containing grayscale information, convert to single-channel input to reduce noise

![Three-panel illustration showing a chest X-ray before and after feature enhancement. The first panel shows the original image, the second highlights the lung region of interest, and the third shows the image after CLAHE contrast enhancement with lung textures appearing more visible.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/54cb1319-e794-472e-9ca4-22a063fd5092.png)

CLAHE applied to an X-ray:

```py
# CLAHE enhances local contrast — useful for X-rays
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
image_enhanced = clahe.apply(image)

# Visualize the difference
fig, axes = plt.subplots(1, 2, figsize=(12, 6))
axes[0].imshow(image, cmap='gray')
axes[0].set_title('Original')
axes[1].imshow(image_enhanced, cmap='gray')
axes[1].set_title('After CLAHE')
plt.show()
```

::: important Takeaway

The goal of teaching the model what to look at hasn't changed. With structured data, the answer is in new columns. With images, the answer is in cropping, enhancement, and emphasizing the regions that carry diagnostic signal.

:::

### Pillar 4: Handling Missing Data

Imagine reading a storybook with a few damaged pages. You don’t throw away the entire book, you decide whether to skip the page, infer what might be missing, or mark it for review.

In medical imaging, missing data can mean corrupted files, missing labels, or incomplete studies rather than empty spreadsheet cells.

The same three strategies — drop, impute, flag — still apply, just with different mechanics:

```py
# Strategy 1: Drop — remove unreadable or empty images
def is_valid_image(path):
    try:
        img = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return False
        if img.mean() < 5:           # nearly black
            return False
        if img.shape[0] < 50 or img.shape[1] < 50:  # too small
            return False
        return True
    except Exception:
        return False

# Strategy 2: Impute — rare for images, but possible (e.g., in painting to fill in missing patches). Generally avoided for diagnostic data.

# Strategy 3: Flag — track which patients are missing which modalities,
#   and let the model condition on availability. Common in multi-modal healthcare ML.
```

::: important Takeaway

"Missing" in imaging data is rarely just a NaN. It can be a broken file, an unlabeled scan, an absent modality, or a black corner inside an image. The same three strategies still apply.

:::

### Pillar 5: Resizing & Resampling — Fitting Everything in the Same Frame

Imagine displaying children’s drawings on a classroom wall. If every drawing is a different size, they won’t fit neatly into the display. You resize them while preserving their proportions.

Medical images must often be resized to a common input size, but anatomical structures should retain their original shape.

![Comparison of two chest X-ray resizing approaches. One image is stretched into a square shape, distorting the lungs, while the second preserves the original aspect ratio by adding padding around the image. The aspect-ratio-preserving approach is highlighted as the preferred method.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/d36b6f8c-4be0-41b7-ab7c-5ca30c01b3e0.png)

::: tip The fix

Resize all images to a common shape. For medical data, *how* the resizing is done matters.

```py
TARGET_SIZE = (224, 224)

# Simple resize (may distort aspect ratio)
image_resized = cv2.resize(image, TARGET_SIZE)

# Better: preserve aspect ratio with padding
def resize_with_padding(image, target_size):
    h, w = image.shape[:2]
    target_h, target_w = target_size
    scale = min(target_h / h, target_w / w)
    new_h, new_w = int(h * scale), int(w * scale)
    resized = cv2.resize(image, (new_w, new_h))
    
    pad_h = target_h - new_h
    pad_w = target_w - new_w
    top, bottom = pad_h // 2, pad_h - pad_h // 2
    left, right = pad_w // 2, pad_w - pad_w // 2
    padded = cv2.copyMakeBorder(resized, top, bottom, left, right,
                                 cv2.BORDER_CONSTANT, value=0)
    return padded

image_clean_resize = resize_with_padding(image, TARGET_SIZE)
```

:::

::: note ⚠️ Why aspect ratio matters in healthcare

Squishing a chest X-ray horizontally makes the lungs look unnatural. Models trained on distorted anatomy often perform worse on real scans. Preserving aspect ratio is generally the safer choice.

:::

::: important Takeaway

Models need a consistent input size, but the geometry of the anatomy needs to be preserved. Resize, but resize carefully.

:::

### Pillar 6: Denoising & Artifact Handling — Cleaning the Window

Imagine looking through a window with dust and smudges on the glass. Cleaning the window makes the view clearer, but scrubbing too aggressively could scratch the glass.

Similarly, medical images often contain noise and acquisition artifacts that should be reduced carefully without removing clinically important details.

For chest X-rays, the most common issues are mild noise and burned-in text or markers. A gentle median or bilateral filter helps with the first, while cropping or masking helps with the second.

```py
# Gentle denoising — careful not to blur away clinical detail
image_denoised = cv2.medianBlur(image, ksize=3)

# Bilateral filter preserves edges better than a median filter
image_bilateral = cv2.bilateralFilter(image, d=5, sigmaColor=50, sigmaSpace=50)
```

::: warning ⚠️ A note of caution

Aggressive denoising can erase the features a model needs to detect a disease. For diagnostic ML, gentle filtering is generally preferred. A useful rule of thumb: if a radiologist can't distinguish the cleaned image from the original, the filtering has gone too far.

:::

::: important Takeaway

Imaging data carries noise that structured data doesn't have. The window can be cleaned, but never so aggressively that the view is wiped away with the smudges.

:::

---

## Putting it All Together: A Complete Pipeline

![Workflow showing a chest X-ray progressing through a healthcare imaging preprocessing pipeline. The image moves through validation, resizing, denoising, contrast enhancement, scaling, and normalization before becoming a model-ready machine learning input.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/c532949b-000c-403e-acb9-f9dec689182e.png)

Here's how the six pillars combine into a single preprocessing function for chest X-ray images:

```py :collapsed-lines
def preprocess_xray(image_path, target_size=(224, 224),
                    train_mean=0.482, train_std=0.236):
    """
    Full preprocessing pipeline for chest X-ray images.
    Applies all six pillars in order.
    """
    # Pillar 4: Validate first — skip corrupted files
    if not is_valid_image(image_path):
        return None
    
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # Pillar 5: Resize with aspect ratio preserved
    image = resize_with_padding(image, target_size)
    
    # Pillar 6: Gentle denoising
    image = cv2.medianBlur(image, 3)
    
    # Pillar 3: Enhance contrast to highlight lung texture
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    image = clahe.apply(image)
    
    # Pillar 1: Scale to [0, 1]
    image = image.astype(np.float32) / 255.0
    
    # Pillar 2: Normalize using training set statistics
    image = (image - train_mean) / train_std
    
    return image
```

---

## Try it Yourself

Every code snippet in this article is bundled into a runnable Kaggle notebook: [<VPIcon icon="iconfont icon-kaggle"/>Chest X-Ray Preprocessing — Kaggle Notebook](https://kaggle.com/code/lakshmimahabaleshwar/chest-xray-preprocessing-kaggle). Fork it, attach the dataset, and run all the cells to see each preprocessing pillar in action on real chest X-rays.

---

## Conclusion

Here's a summary of what we've discussed in this article:

| **Pillar** | **Purpose** | **Example** |
| --- | --- | --- |
| Scaling | Standardize pixel ranges | 0-255 → 0-1 |
| Normalization | Center brightness distributions | z-score normalization |
| Attention Guidance | Highlight diagnostic regions | CLAHE |
| Missing Data Handling | Remove unusable scans | Corrupted files |
| Resizing | Consistent input size | 224×224 |
| Denoising | Reduce acquisition noise | Median filter |

Preprocessing for structured data is about making numbers play fair so a model can see them clearly.

Preprocessing for healthcare imaging is about respecting the messy reality of how medical data is captured, stored, and labeled. Some standard techniques carry over directly. Some need to be adapted. And a few preprocessing concerns only emerge once the data becomes pictures of human bodies.

Stepping back, whether it's a child learning to organize their toy box, or a model learning to spot pneumonia in a chest X-ray, the quality of learning depends on the quality of data preparation. Get the data right.

::: info

If this was useful, you can find a related conceptual primer on preprocessing more broadly here: [<VPIcon icon="fas fa-globe"/>Data Preprocessing for Machine Learning](https://lakshmimahabaleshwara.substack.com/p/data-preprocessing-for-machine-learning).

<SiteInfo
  name="Data Preprocessing for Machine Learning"
  desc="From messy real-world data to model-ready inputs — an intuitive exploration of Feature Engineering, Missing Values, Scaling, and Normalization through child-inspired analogies"
  url="https://lakshmimahabaleshwara.substack.com/p/data-preprocessing-for-machine-learning/"
  logo="https://substackcdn.com/icons/substack/icon.svg"
  preview="https://substackcdn.com/image/fetch/$s_!mkUj!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffaac014e-81c1-4769-80d4-1abb792e96e2_3360x1000.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Preprocess Medical Images for Machine Learning – A Guide Using Chest X-Rays",
  "desc": "Working with healthcare data introduces preprocessing challenges that go beyond those you might encounter with structured data. Some familiar techniques still apply, while others look very different o",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-preprocess-medical-images-for-machine-learning.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
