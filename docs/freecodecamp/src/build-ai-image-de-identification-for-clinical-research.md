---
lang: en-US
title: "How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research"
description: "Article(s) > How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research"
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
      content: "Article(s) > How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research"
    - property: og:description
      content: "How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-image-de-identification-for-clinical-research.html
prev: /programming/py/articles/README.md
date: 2026-05-23
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/04f2b51b-5590-4bde-9d2c-4af3a6d4237c.png
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
  name="How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research"
  desc="Medical imaging is transforming healthcare. Researchers are training deep learning models to detect pneumonia from chest X-rays, estimate cardiac function from echocardiograms, and identify tumors fro"
  url="https://freecodecamp.org/news/build-ai-image-de-identification-for-clinical-research"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/04f2b51b-5590-4bde-9d2c-4af3a6d4237c.png"/>

Medical imaging is transforming healthcare. Researchers are training deep learning models to detect pneumonia from chest X-rays, estimate cardiac function from echocardiograms, and identify tumors from MRI scans. But before any of these images can be shared with researchers or used to train machine learning models, one critical challenge must be solved.

::: info How Do We Protect Patient Privacy?

Medical images often contain sensitive information such as patient names, dates of birth, hospital identifiers, and accession numbers. Some of this information is stored in DICOM (**Digital Imaging and Communications in Medicine**) metadata, but much of it is also burned directly into the image pixels.

:::

In this tutorial, you’ll learn how to build an AI-powered de-identification pipeline that removes PHI from both metadata and image pixels. Along the way, we’ll explore OCR (Optical Character Recognition), NER (Named Entity Recognition), and standards-based DICOM processing.

At the end, I’ll show how I combined these ideas into an open-source PyTorch project called Aegis.

---

## What You’ll Build

In this tutorial, you’ll build a custom MONAI (PyTorch) preprocessing pipeline that automatically de-identifies medical images before they are used for clinical research or AI model training.

The pipeline will:

- Discover DICOM studies
- Load metadata and pixel data
- Detect burned-in text using OCR
- Classify text as PHI or non-PHI
- Redact sensitive pixel regions
- Remove PHI from DICOM metadata and pixel data
- Save privacy-safe images for downstream AI workflows

By the end, you’ll have a reusable MONAI transform that can be integrated directly into any medical imaging workflow to prepare privacy-safe datasets for research and deep learning.

::: note Prerequisites

To follow this tutorial, you should have:

- Intermediate Python experience
- Basic understanding of PyTorch
- Familiarity with medical imaging concepts
- Python 3.10 or later

We’ll use:

- MONAI
- pydicom
- EasyOCR
- NumPy
- Transformers
- Stanford NER

**Set Up the Environment**

```sh
# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Upgrade pip
pip install --upgrade pip

# Install the core libraries used in this tutorial
pip install \
monai \
pydicom \
easyocr \
numpy \
transformers \
torch 

# Download the Stanford medical de-identification model from Hugging Face
python -c "
from transformers import AutoTokenizer, AutoModelForTokenClassification

model_name = 'StanfordAIMI/stanford-deidentifier-base'
AutoTokenizer.from_pretrained(model_name)
AutoModelForTokenClassification.from_pretrained(model_name)
print('Stanford NER model downloaded successfully.')
"
```

:::

---

## Why Privacy Matters in Medical Imaging

Healthcare organizations generate enormous volumes of imaging data every day. These datasets are invaluable for:

- Clinical research
- Multi-center collaborations
- Regulatory submissions
- Artificial intelligence model development
- Educational datasets

But privacy regulations such as the HIPAA (Health Insurance Portability and Accountability Act) in the United States require that PHI (Protected Health Information) be removed before data can be shared. This creates a significant bottleneck.

Many hospitals still rely on manual review to inspect thousands of images, searching for patient identifiers hidden in metadata and image annotations. This process is slow, expensive, and prone to human error.

Automated de-identification solves this problem by combining software engineering, computer vision, and natural language processing.

## Understanding PHI, HIPAA, and DICOM

### What Is PHI?

Protected Health Information (PHI) includes any information that can identify a patient, such as:

```plaintext
Name
Medical record number
Date of birth
Study date
Hospital ID
Accession number
```

### What Is HIPAA?

The Health Insurance Portability and Accountability Act (HIPAA) defines rules for safeguarding patient data. One common approach is the Safe Harbor method, which requires removing specific identifiers before data is shared.

### What Is DICOM?

Medical images such as **Computed Tomography (CT)**, **Magnetic Resonance Imaging (MRI)**, and **Ultrasound (US)** are commonly stored in the DICOM **(Digital Imaging and Communications in Medicine)** format, the international standard for storing and exchanging medical imaging data.

Unlike ordinary image formats such as JPEG or PNG, a DICOM file contains both the image itself and a rich set of structured metadata that describes the patient, the study, and the imaging procedure.

A typical DICOM file contains two main components:

1. **Pixel Data** – the actual medical image, such as a CT slice, MRI volume, or ultrasound frame.
2. **Metadata** – structured fields that may include:
    - Patient name and medical record number
    - Date of birth
    - Study and acquisition dates
    - Imaging modality (CT, MRI, US)
    - Scanner manufacturer and technical acquisition parameters

This combination makes DICOM far more than just an image format. It serves as a standardized container that allows imaging devices, hospital systems, and research software to exchange data reliably and consistently.

Because DICOM metadata often contains protected health information (PHI), and because identifiers may also be burned directly into the image pixels, particularly in ultrasound studies, both the metadata and the pixel data must be addressed during de-identification before images can be safely shared for clinical research or AI development.

---

## Why Metadata Anonymization Is Not Enough in DICOM format

Many tools remove PHI only from metadata. For example, deleting the PatientName tag may appear sufficient.

But in modalities such as ultrasound, fluoroscopy, and some X-ray workflows, identifying information is often burned directly into the image.

Common examples include:

```plaintext
NAME: JOHN DOE
DOB: 01/01/1980
MRN: 123456
HOSPITAL: ABC
```

If these annotations remain, privacy is still compromised. This means a complete solution must inspect both:

- DICOM metadata
- Image pixels

---

## OCR and AI for Identifying PHI

To detect PHI embedded in pixels, we first need to find all visible text.

### Step 1: Optical Character Recognition (OCR)

OCR converts image text into machine-readable strings.

```py
import easyocr
reader = easyocr.Reader(['en'])
results = reader.readtext('ultrasound.png')
```

Each OCR result typically includes:

- Bounding box coordinates – where the text appears in the image
- Extracted text – the recognized characters
- Confidence score – how certain the model is about the result

Example:

```py
[
  ([[10, 20], [120, 20], [120, 45], [10, 45]], 'JOHN DOE', 0.98)
]
```

### Step 2: Determine Whether the Text Is PHI

Not all detected text should be removed.

Medical images also contain clinically relevant labels such as:

```plaintext
LEFT VENTRICLE
APICAL VIEW
B-MODE
```

To distinguish PHI from legitimate clinical text, we can combine:

1. Allowlists of known clinical terms
2. Regular-expression heuristics
3. Named Entity Recognition (NER)

### Step 3: Named Entity Recognition

NER models identify entities such as:

```plaintext
PERSON
DATE
LOCATION
ID
```

```py
def contains_phi(text): 
    if looks_like_date(text): 
    return True 
    if looks_like_identifier(text): 
    return True 
    return ner_model.predict(text) 
```

This hybrid approach reduces both false positives and false negatives.

---

## Pixel Redaction and DICOM Scrubbing

**Pixel Redaction**

Once PHI is detected, the corresponding image regions can be masked.

```py
image[y1:y2, x1:x2] = 0
```

This replaces the sensitive area with black pixels.

### DICOM Metadata Scrubbing

Using pydicom, metadata fields can be modified or removed.

```py
import pydicom

ds = pydicom.dcmread('study.dcm')
ds.PatientName = 'ANONYMIZED'
del ds.PatientBirthDate
```

Additional steps may include:

- Removing private tags
- Replacing UIDs
- Recursively processing nested sequences

Together, metadata scrubbing and pixel redaction provide comprehensive de-identification.

---

## Building the Complete Pipeline

![Step-by-step workflow for medical image de-identification: discover files, load DICOM metadata, run OCR, classify PHI, redact pixels, scrub metadata, and save de-identified output.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/74b371d7-cb4a-47b5-afa6-d9e39331d03f.png)

The overall workflow looks like this:

1. Discover medical image files
2. Load DICOM metadata and pixel data
3. Run OCR on annotation regions
4. Classify text as PHI or non-PHI
5. Redact sensitive pixel regions
6. Remove PHI from metadata
7. Save the de-identified output

---

## Challenges and Lessons Learned

Building a production-ready de-identification system involves many practical challenges.

- **Clinical Terminology**: OCR may detect legitimate labels that should not be removed.
- **OCR Errors**; Low-contrast text and ultrasound overlays can produce inaccurate detections.
- **Nested DICOM Sequences**: PHI may appear in deeply nested metadata structures.
- **Multi-Frame Studies**: Ultrasound cine loops may contain dozens or hundreds of frames.
- **Deterministic Pseudonymization**: Researchers often need the same patient to receive the same replacement identifier across studies.

These challenges require thoughtful engineering rather than a single machine learning model.

---

## How I Built Aegis

While exploring this problem, I developed an open-source MONAI (PyTorch based) project called **Aegis**.

Aegis combines:

- OCR-based text detection
- AI-driven PHI classification
- Pixel-level redaction
- Standards-based DICOM de-identification
- Batch processing for research workflows

::: important Key Design Decisions

- **Standards First**: I aligned metadata scrubbing with the DICOM confidentiality profile to follow established healthcare standards.
- **Hybrid AI + Rules**: Clinical allowlists, heuristics, and NER models work together to improve accuracy.
- **Ultrasound-Specific Optimization**: Aegis uses `SequenceOfUltrasoundRegions` to focus OCR on annotation areas instead of scanning the entire image.
- **Deterministic Identity Management**: Consistent pseudonyms enable longitudinal research while protecting privacy.
- **Open Source Architecture**: The project is modular, testable, and designed to integrate with research pipelines.

:::

::: info

You can explore the full implementation in the Aegis GitHub repository:

<SiteInfo
  name="lakshmi-mahabaleshwara/aegis"
  desc="Aegis: A configurable pipeline for anonymization and preprocessing of medical imaging datasets (DICOM, JPEG/PNG) for AI training."
  url="https://github.com/lakshmi-mahabaleshwara/aegis/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/dc09b74f7188bb9ef2d04cae13f9085b46cb80b268f64738147809d59b2fdb93/lakshmi-mahabaleshwara/aegis"/>

:::

---

## Future Directions

Automated de-identification continues to evolve.

Future enhancements may include:

- Multilingual OCR
- Handwriting recognition
- Vision-language models
- Human-in-the-loop review
- Cloud-native deployment
- Integration with AI training pipelines

As healthcare AI expands, privacy-preserving data preparation will become even more important.

---

## Conclusion

Clinical research depends on access to high-quality medical imaging data.

But privacy regulations require that patient identifiers be removed from both DICOM metadata and image pixels.

By combining OCR, named entity recognition, pixel redaction, and standards-based DICOM processing, we can automate this task and dramatically reduce the burden of manual review.

The techniques covered in this tutorial are applicable far beyond a single project.

Whether you’re building a hospital data pipeline, preparing research datasets, or training the next generation of healthcare AI models, automated de-identification is a foundational capability.

To put these ideas into practice, I built Aegis as an open source reference implementation.

More importantly, the underlying concepts can help developers and researchers create privacy-safe workflows that accelerate innovation while respecting patient confidentiality.

::: info References

```component VPCard
{
  "title": "Pydicom",
  "desc": "Pydicom Dicom (Digital Imaging in Medicine) is the bread and butter of medical image datasets, storage and transfer. This is the future home of the Pydicom documentation. If you are a Python developer looking to get started with Dicom and Python, this will be the place to learn and contribute! For now, here are some helpful links, and general plan for some of the code bases in the organization. If you want to come and chat, find our community on Gitter, or post an issue on one of our repos.ModulesPydicomIf you want to work with dicom datasets, you should use pydicom. We have started a base of docs here, and see the documentation for you to get started.Pynetdicompynetdicom3 is where you want to start if you want to create Service Class Providers (SCPs) or Service Class Users (SCUs). ...",
  "link": "https://pydicom.github.io/",
  "logo": "https://pydicom.github.io/images/favicon/favicon.ico",
  "background": "rgba(63,124,173,0.2)"
}
```

<SiteInfo
  name="MONAI - Medical Open Network for AI"
  desc="MONAI is the leading open-source framework for healthcare imaging AI, trusted by researchers and clinicians worldwide. Build, train, and deploy medical AI solutions with industry-standard tools."
  url="https://project-monai.github.io/"
  logo="https://project-monai.github.io/assets/logo/MONAI-logo_favicon.png"
  preview="https://project-monai.github.io/assets/img/MONAI-logo_color.png"/>

```component VPCard
{
  "title": "DICOM",
  "desc": "",
  "link": "https://dicomstandard.org/",
  "logo": "https://dicomstandard.org/ResourcePackages/Nema/assets/dist/images/DicomFavicon/favicon-128.png",
  "background": "rgba(0,130,122,0.2)"
}
```

<SiteInfo
  name="HIPAA Home"
  desc="Health Information Privacy"
  url="https://hhs.gov/hipaa/index.html/"
  logo="https://hhs.gov/themes/custom/hhs_uswds/favicon.ico"
  preview="https://hhs.gov/sites/default/files/styles/og_image_style/public/hhs-mark-og_0.png?h=457da100&itok=8h12Thnc"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI-Powered Medical Image De-Identification Pipeline for Clinical Research",
  "desc": "Medical imaging is transforming healthcare. Researchers are training deep learning models to detect pneumonia from chest X-rays, estimate cardiac function from echocardiograms, and identify tumors fro",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-ai-image-de-identification-for-clinical-research.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
