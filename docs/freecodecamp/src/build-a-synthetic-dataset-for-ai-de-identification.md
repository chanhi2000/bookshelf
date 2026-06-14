---
lang: en-US
title: "The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification"
description: "Article(s) > The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification"
icon: fa-brands fa-python
category:
  - Python
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification"
    - property: og:description
      content: "The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-synthetic-dataset-for-ai-de-identification.html
prev: /programming/py/articles/README.md
date: 2026-06-20
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/74f053ea-3efc-4ef0-932b-d423dccba44a.png
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
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification"
  desc="In this article, you'll learn how my team built a synthetic PHI generation pipeline to create privacy-safe training and validation data for medical imaging AI. The Problem Imagine you’re building an A"
  url="https://freecodecamp.org/news/build-a-synthetic-dataset-for-ai-de-identification"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/74f053ea-3efc-4ef0-932b-d423dccba44a.png"/>

In this article, you'll learn how my team built a synthetic PHI generation pipeline to create privacy-safe training and validation data for medical imaging AI.

::: critical The Problem

Imagine you’re building an AI system that removes patient information from medical images.

The model needs thousands of examples showing where Protected Health Information (PHI) appears and what it looks like. The more examples it sees, the better it becomes at finding and removing sensitive information.

But there is a problem:

**The data you need to train the model is the same data you’re not allowed to share freely.**

Healthcare organizations must protect patient privacy. Regulations like HIPAA require that patient identifiers are removed before medical images can be shared for research, AI development, or external collaboration.

This creates an interesting engineering challenge: How do you build and test de-identification systems when the data needed to train those systems can't be easily used?

:::

One practical solution is **Synthetic PHI.**

In this article, I’ll show why synthetic PHI is valuable, explain the hidden PHI problem inside medical images, and walk through a pipeline my team built that generates realistic ultrasound datasets with fully controlled synthetic patient information.

::: info What You'll Learn in This Tutorial

By the end of this tutorial, you'll understand:

- The hidden PHI challenges in medical imaging data.
- Why synthetic PHI is useful for building and testing healthcare AI systems.
- How to generate realistic synthetic patient identities using Python and Faker.
- How to inject PHI into both image pixels and DICOM metadata.
- How to create ground-truth labels for AI model training and evaluation.
- How to validate synthetic medical imaging datasets before using them in downstream workflows.

:::

---

## Source Images: OpenPOCUS

The synthetic PHI generation uses lung point-of-care ultrasound (POCUS) frames from [<VPIcon icon="iconfont icon-github"/>`kumarandre/OpenPOCUS`](https://github.com/kumarandre/OpenPOCUS), an openly licensed collection of real ultrasound images contributed by the POCUS community.

These images carry no real PHI. OpenPOCUS provides clinically authentic ultrasound images while avoiding patient privacy concerns. This makes it an ideal foundation for synthetic PHI generation because we can focus entirely on creating and tracking identifiers without risking exposure of real patient information.

---

## The Iceberg Problem: Most PHI Is Hidden

When people think about PHI in medical images, they usually think about visible text overlays.

These include:

```plaintext
Patient name
Medical Record Number (MRN)
Date of birth
Study date
```

These identifiers are often burned directly into image pixels by ultrasound, X-ray, CT, and MRI systems.

But visible text is only the tip of the iceberg. Much of the remaining PHI lives inside the DICOM header, a collection of metadata fields that describe the image and the study. These fields contains identifiers such as `PatientName`, `PatientID`, `StudyDate`, `institution names`, and other sensitive information.

Unlike burned-in text, header PHI isn't visible when looking at the image itself, but it travels with the file and must also be removed during de-identification.

![Iceberg illustration showing visible PHI in image pixels and hidden PHI in DICOM metadata.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/4f1036fd-009f-4be7-944a-af5380dfdfcb.png)

A de-identification system must handle both.

Removing visible text while leaving PHI inside DICOM metadata still creates a privacy risk. Likewise, stripping metadata while leaving patient names burned into image pixels is equally problematic.

This hidden PHI challenge makes testing de-identification software much harder than it first appears.

---

## Why Synthetic PHI Matters

At first glance, it seems hospitals already have plenty of real-world data available. So why not simply use that?

The answer comes down to three challenges.

### Challenge 1: Privacy Regulations

Medical images often contain patient identifiers.

Sharing those images outside secure clinical environments introduces significant legal and compliance risk.

The more institutions involved, the more difficult governance becomes.

### Challenge 2: Annotation at Scale

Modern AI systems require labeled examples.

Someone must identify:

- Where PHI appears
- What type of PHI is it
- Which DICOM tags contain PHI

Creating these annotations manually is expensive and time-consuming.

### Challenge 3: Validation

Suppose you’re evaluating a de-identification tool. How do you know whether it successfully removed every identifier?

With real patient data, you often don’t know exactly where every piece of PHI exists. Without ground truth, measuring accuracy becomes difficult.

---

## Synthetic PHI Solves All Three Problems

Instead of starting with real patient identifiers, we can generate realistic fake identities and intentionally inject them into medical images.

Because the pipeline creates the PHI itself, we know:

- Every identifier value
- Every pixel location
- Every DICOM tag
- Every expected output

This gives us perfect ground truth.

Now, a de-identification system can be evaluated objectively. If a patient name remains after processing, we know it failed. If clinical content is accidentally removed, we know that too.

Synthetic PHI creates a privacy-safe dataset that can be used for:

- Training AI models
- Benchmarking de-identification software
- Regression testing
- Validation before deployment

---

## Building a Synthetic PHI Pipeline

To explore this problem, my team built a pipeline that generates synthetic PHI for lung Point-of-Care Ultrasound (POCUS) images.

The goal was to:

1. Start with ultrasound images containing no patient information.
2. Generate realistic synthetic patient identities.
3. Burn PHI into image pixels.
4. Insert matching PHI into DICOM metadata.
5. Automatically generate ground truth labels.
6. Validate the resulting DICOM files.

The output looks realistic from the perspective of a de-identification system while containing no real patient information.

---

## Pipeline Architecture

The workflow looks like this (we'll go over each step in detail below):

![Workflow for generating synthetic PHI in ultrasound images and DICOM files.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/f293fb38-b09f-451c-b6ee-75c71e9a7e66.png)

Each stage produces artifacts consumed by the next stage. Failures are quarantined rather than silently ignored.

---

## Safety Checks Before Burning

Before writing synthetic PHI onto an image, the pipeline performs a safety check to ensure that the selected region to insert PHI lies outside the ultrasound fan.

The top-left corner of a lung POCUS image is usually outside the imaging fan, a dark border, safe to burn PHI onto without obscuring clinical content.

To make sure this region holds good for every image, the pipeline runs two checks per image:

- **Brightness check:** If the average intensity of the configured burn region exceeds a threshold, the region likely overlaps the ultrasound fan rather than the dark border.
- **Boundary check:** The pipeline verifies that the configured burn region fits entirely within the image. Images that are smaller than the expected burn area are quarantined.

In either case, the image is quarantined with the reason recorded into the manifest. There are no partial burns, no overwritten clinical content, and no silent corruption of test data.

This prevents synthetic identifiers from accidentally obscuring anatomy.

```py
def burn_region_is_safe(arr):
    """Check the burn region is dark enough to be outside the fan."""
    h, w = arr.shape
    y2 = min(BURN_REGION_Y + BURN_REGION_H, h)
    x2 = min(BURN_REGION_X + BURN_REGION_W, w)
    region = arr[BURN_REGION_Y:y2, BURN_REGION_X:x2]
    if region.size == 0:
        return False, float("nan")
    mean = float(region.mean())
    return mean <= BRIGHTNESS_SKIP_THRESHOLD, mean
```

The function extracts the configured burn region and computes its average brightness. If the region is too bright, it likely overlaps the ultrasound fan rather than the border.

### Step 1: Generate Synthetic Patient Identities

The synthetic identity is produced by [<VPIcon icon="fas fa-globe"/>Faker](https://faker.readthedocs.io/) and seeded per case, so the same image always yields the same fake patient.

Determinism matters because:

- Reproducing a test result requires reproducing the test data.
- Debugging downstream tools is easier when the input doesn't change between runs.
- Comparing two de-identification tools fairly requires both to see the same planted PHI.

```py
def case_seed(global_seed: int, source_id: str) -> int:
    """Per-image deterministic seed derived from global seed and source path."""
    h = hashlib.sha256(f"{global_seed}|{source_id}".encode()).hexdigest()
    return int(h[:8], 16)


def generate_phi(seed: int) -> dict:
    fake = Faker()
    Faker.seed(seed)
    rng = random.Random(seed)

    last = fake.last_name()
    first = fake.first_name()
    middle = fake.random_letter().upper()
    mrn = f"{rng.randint(1000000, 9999999)}"
    dob = fake.date_of_birth(minimum_age=18, maximum_age=95)
    study_date = fake.date_time_this_decade()
    institution = rng.choice(INSTITUTION_POOL)

    return {
        "case_uuid": f"SYNTH-{uuid.UUID(int=rng.getrandbits(128))}",
        "patient_name_display": f"{last}, {first} {middle}.",
        "patient_name_dicom": f"{last}^{first}^{middle}",   # DICOM PN VR format
        "patient_id": mrn,
        "dob": dob,
        "study_date": study_date,
        "institution_name": institution,
    }
```

The `case_seed()` function generates a deterministic seed from the source image path. That seed is then used by Faker to create a synthetic identity.

Because the seed is repeatable, the same input image always receives the same synthetic patient information. This makes debugging and benchmarking reproducible.

### Step 2: Burn PHI into Image Pixels

Rendering text onto an image is comparatively expensive. For a single zone containing 30+ frames, repeating that work per frame is wasteful.

The pipeline instead renders the PHI overlay onto a transparent canvas one time per zone. This mirrors how many ultrasound systems operate in practice, where patient information remains fixed while the underlying image content changes from frame to frame.

```py
def make_phi_overlay(shape, phi):
    """Render PHI ONCE onto a canvas. Returns (overlay_array, overlays_meta)."""
    h, w = shape
    canvas = Image.new("L", (w, h), 0)  # blank canvas
    draw = ImageDraw.Draw(canvas)

    overlays, x, y = [], BURN_REGION_X, BURN_REGION_Y
    for entry in _phi_text_block(phi):
        x0, y0, x1, y1 = draw.textbbox((x, y), entry["line"], font=FONT)
        tw, th = x1 - x0, y1 - y0

        if x + tw > w or y + th > h:
            raise ValueError(
                f"rendered PHI overflows image: '{entry['line']}' "
                f"at ({x},{y}) size ({tw}x{th}), image {w}x{h}"
            )

        draw.text((x, y), entry["line"], font=FONT, fill=TEXT_COLOR)
        overlays.append({
            "phi_category": entry["phi_category"],
            "rendered_text": entry["line"],
            "phi_value": entry["value"],
            "bbox": [x, y, tw, th],
            "dicom_tag": entry["dicom_tag"],
        })
        y += th + LINE_GAP
    return np.array(canvas), overlays
```

The `make_phi_overlay()` function creates a blank canvas and renders each PHI line onto it. At the same time, it records metadata such as the rendered text, bounding box coordinates, and corresponding DICOM tag.

The function returns both the image overlay and the annotation metadata, ensuring that the ground truth always matches the pixels that were actually drawn.

Rendering once and reusing the overlay provides several advantages:

- Faster processing
- Consistent PHI placement across frames
- Simplified ground-truth generation
- Behavior that more closely matches real ultrasound devices

An additional benefit is that the pipeline automatically records the location of every burned identifier.

### Step 3: Add PHI to DICOM Headers

The DICOM standard supports two ways to represent a cine ultrasound loop: as a sequence of single-frame DICOMs that share a series UID, or as one multi-frame DICOM where the pixel data holds every frame stacked together.

The pipeline uses the multi-frame approach because:

- It matches how real ultrasound devices write cine loops.
- One header serves all frames — no duplication of patient metadata.
- Storage and transfer are more efficient.

```py
ds.PatientName = phi["patient_name_dicom"]
ds.PatientID = deid_patient_id
ds.PatientBirthDate = phi["dob"].strftime("%Y%m%d")

ds.StudyInstanceUID = study_uid
ds.StudyDate = phi["study_date"].strftime("%Y%m%d")
ds.InstitutionName = phi["institution_name"]
```

These fields populate the DICOM header with the same synthetic identity used in the image overlay. This ensures that visible PHI and hidden metadata remain consistent, producing realistic test data.

A few details that the DICOM standard enforces but the spec doesn't make obvious:

- `StudyID` is required and must be a short string, distinct from `StudyInstanceUID`. It's easy to forget.
- `ImageType` must be present. `["DERIVED", "SECONDARY"]` is the honest value for synthetic data because it wasn't acquired by a device.
- `Manufacturer` is part of the General Equipment IOD module and is required even though the data is synthetic. Setting it to a clearly synthetic value (`SYNTHETIC-DEID-TUTORIAL`) makes the origin unambiguous.

![Synthetic ultrasound DICOM containing generated PHI in image overlays and metadata.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/f6c75149-c287-479a-895b-5572fbd6afbf.png)

### Step 4: Identity Mapping: The De-Identified PatientID

To support downstream evaluation, every source patient receives a stable identifier such as `DEID-0001`. A mapping file links source patients, synthetic studies, and generated DICOM objects. This allows evaluators to compare a de-identification tool’s output against the original ground truth.

```plaintext
source_patient,deid_patient_id,study_instance_uid
patient_001,DEID-0001,1.2.826.0.1.3680043.8.498.1234...
patient_002,DEID-0002,1.2.826.0.1.3680043.8.498.5678...
```

### Step 5: Ground Truth: Structured CSV Output

One major advantage of synthetic PHI is automatic label generation. Because the pipeline creates every identifier, it already knows the text value, bounding box coordinates, and corresponding DICOM tag.

These annotations are exported as structured CSV files and become the ground truth used for training and evaluation.

```py
def build_overlay_rows(*, case_uuid, sop_instance_uid, source_id, source_relpath, output_dicom_relpath, overlays,
                      image_shape):
    h, w = image_shape
    rows = []
    for ov in overlays:
        x, y, ow, oh = ov["bbox"]
        rows.append({
            "case_uuid": case_uuid,
            "sop_instance_uid": sop_instance_uid,
            "source_id": source_id,
            "source_relpath": source_relpath,
            "output_dicom_relpath": output_dicom_relpath,
            "image_h": h,
            "image_w": w,
            "region": "top_left_banner",
            "phi_category": ov["phi_category"],
            "phi_value": ov["phi_value"],
            "rendered_text": ov["rendered_text"],
            "bbox_x": x, "bbox_y": y,
            "bbox_w": ow, "bbox_h": oh,
            "dicom_tag": ov["dicom_tag"],
            "seed": SEED,
            "pipeline_version": PIPELINE_VERSION,
            "run_id": RUN_ID,
        })
    return rows
```

`build_overlay_rows` function converts each overlay into a row of structured metadata. Along with the text and bounding box coordinates, it records identifiers and reproducibility information such as the pipeline version and random seed.

These CSV files become the ground truth used for training and evaluating de-identification systems.

At the end of the run, the accumulated rows are grouped by de-identified patient ID and written into per-patient CSV files. Each patient folder receives its own `phi_overlays.csv` covering all of that patient's zones, alongside a `run_manifest.csv` summarizing zone-level status (processed, quarantined, failed) and paths.

---

## Three-Tier DICOM Validation

A synthetic DICOM file is only useful if it actually conforms to the DICOM standard. Otherwise, downstream tools that consume it will fail or worse silently mis-handle it.

The pipeline uses a three-tier validation chain that gracefully degrades depending on what's available in the environment:

1. `dciodvfy` from dicom3tools: the most rigorous standards-conformance validator, written by David Clunie. It's not pip-installable. It checks against the full DICOM IOD definitions. If it's available on `PATH`, this is the preferred check.
2. [<VPIcon icon="iconfont icon-pypi"/>`dicom-validator`](https://pypi.org/project/dicom-validator/) CLI: this is pip-installable. It downloads the DICOM standard definitions on first run, then validates IOD compliance. it's used when `dciodvfy` isn't available.
3. `pydicom` re-read: the minimal fallback. It confirms that every file can be re-opened, decoded, and that pixel data round-trips correctly. It doesn't check standards compliance, but catches gross corruption.

---

## A Surprising Bug: MONAI vs PIL

Originally, I planned to use MONAI for image loading because it's widely used in medical imaging workflows.

During testing, I discovered an issue: MONAI’s image loading conventions caused non-square images to appear rotated when downstream code assumed traditional image layouts.

At the same time, many ultrasound images contained EXIF orientation metadata that required correction.

Switching to PIL solved both issues.

```py
from PIL import Image, ImageOps

img = Image.open(path)
img = ImageOps.exif_transpose(img)
```

---

## Final Thoughts

Synthetic PHI does not replace real-world testing, but it provides something healthcare AI teams rarely have: a safe, shareable, and fully labeled dataset with known answers.

By generating realistic identifiers and embedding them into both image pixels and DICOM metadata, we can build reproducible benchmarks for de-identification systems without exposing real patient data.

As AI systems become increasingly responsible for handling sensitive medical information, synthetic PHI may become one of the most important tools for building trustworthy healthcare AI workflows.

The complete implementation is available as a Jupyter notebook in the [MONAI Ultrasound Working Group (<VPIcon icon="iconfont icon-github"/>`Project-MONAI/wg-ultrasound`)](https://github.com/Project-MONAI/wg-ultrasound/tree/main/annotation_and_anonymization) repository. You can explore the notebook and experiment with the pipeline yourself.

Sometimes the safest way to test whether a system can remove PHI is to create the PHI yourself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Hidden PHI Problem in Medical Images: Building a Synthetic Dataset for AI De-Identification",
  "desc": "In this article, you'll learn how my team built a synthetic PHI generation pipeline to create privacy-safe training and validation data for medical imaging AI. The Problem Imagine you’re building an A",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-synthetic-dataset-for-ai-de-identification.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
