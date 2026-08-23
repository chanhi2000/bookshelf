---
lang: en-US
title: "What Happens to a Medical Image Before and After a Model Sees It"
description: "Article(s) > What Happens to a Medical Image Before and After a Model Sees It"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Happens to a Medical Image Before and After a Model Sees It"
    - property: og:description
      content: "What Happens to a Medical Image Before and After a Model Sees It"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-happens-to-a-medical-image-before-and-after-a-model-sees-it.html
prev: /programming/py/articles/README.md
date: 2026-08-25
isOriginal: false
author:
  - name: Lakshmi Mahabaleshwara
    url: https://freecodecamp.org/news/author/lakshmi-mahabalesh/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9014bf41-16ea-4661-926a-4444a53484f8.png
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

[[toc]]

---

<SiteInfo
  name="What Happens to a Medical Image Before and After a Model Sees It"
  desc="Medical imaging papers are full of familiar-looking terms: normalization, labels, validation, annotation, and preprocessing. If you come from general machine learning, you may think you already know w"
  url="https://freecodecamp.org/news/what-happens-to-a-medical-image-before-and-after-a-model-sees-it"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9014bf41-16ea-4661-926a-4444a53484f8.png"/>

Medical imaging papers are full of familiar-looking terms: normalization, labels, validation, annotation, and preprocessing.

If you come from general machine learning, you may think you already know what these words mean. And sometimes you do.

But medical imaging adds a few twists. Some terms have a different meaning, and some are used in more than one way depending on the context.

This article follows a chest X-ray from the moment it's acquired to the point where a model makes a prediction. Along the way, we'll look at the common terms you'll see in medical imaging papers and what they actually mean.

A companion [notebook (<VPIcon icon="iconfont icon-github"/>`lakshmi-mahabaleshwara/healthtech-playground`)](https://github.com/lakshmi-mahabaleshwara/healthtech-playground/blob/main/what_happens_before_the_model.ipynb) lets you run most of these steps yourself instead of just reading about them.

::: info What You'll Learn

- What each stage of a medical imaging pipeline is called, and what actually happens at each stage
- The difference between anonymization, de-identification, and pseudonymization
- Why "annotation" and "normalization" can mean different things depending on the context
- How classification, detection, and segmentation differ on the same image
- What harmonization fixes, and why validation design can matter more than model choice

:::

---

## From Image to Dataset

### 1. Acquisition

Acquisition is when the image is created. It includes the imaging machine, its settings, and how the patient is positioned.

Two chest X-rays of the same patient may look different if they were taken using different machines. The manufacturer, detector, exposure settings, and image-processing software can all affect the final image.

Patient's position matters too. For example, a standing **PA (Posteroanterior)** chest X-ray can look very different from a portable **AP (Anteroposterior)** X-ray taken while a patient is lying in bed.

One important difference is the apparent size of the heart. This can affect what a model learns.

A lot of this information is stored in the **DICOM** file.

DICOM (Digital Imaging and Communications in Medicine) is the standard format used to store and communicate medical images. A DICOM file contains much more than pixels. It can also contain information about the patient, scanner, study, image orientation, pixel spacing, and other details.

The image used in this tutorial originally arrived as a JPEG, so the original clinical DICOM metadata wasn't available. For demonstration, the notebook wraps the image in a new DICOM file and adds a few useful fields.

```py
ds = pydicom.dcmread("synthetic_cxr.dcm")

for tag in ["Modality", "BodyPartExamined", "ViewPosition",
            "Manufacturer", "ManufacturerModelName", "KVP", "PixelSpacing"]:
    print(f"{tag:24s} {ds[tag].value}")
```

One field worth paying attention to is **PixelSpacing**. It tells you the physical size represented by each pixel, usually in millimeters. Two images can both be 512 × 512 pixels but cover different physical areas.

So if you want to measure something in millimeters, you can't simply count pixels. You also need to know the pixel spacing.

### 2. Anonymization, De-identification, and Pseudonymization

These three terms are often used interchangeably, but they have different meanings.

#### De-identification

De-identification removes or changes information that could identify a person.

For example:

```plaintext
Patient name
Medical record number
Date of birth
Phone numbers
Other identifying information
```

The goal is to reduce the chance that the data can be linked back to a person.

#### Pseudonymization

Pseudonymization replaces an identifier with a code.

For example:

```plaintext
Jane Doe → SUBJ_0041
```

The important difference is that a separate key can still connect `SUBJ_0041` back to Jane Doe.

Hospitals may need this because they sometimes need to find the original patient again.

#### Anonymization

Anonymization aims to make re-identification no longer reasonably possible.

Unlike pseudonymization, there's no retained key that can be used to reconnect the data to the person.

A simple question can help:

> Can this data still be linked back to the person using additional information?

If the answer is yes because a separate key exists, you're generally dealing with pseudonymization rather than true anonymization.

The exact legal meaning depends on the country and regulation, so researchers should be careful when using these terms.

#### The pixels can contain identifiers, too

Removing information from the DICOM header is only one part of the job.

Sometimes text is actually drawn into the image.

For example:

```plaintext
Patient name
Date
Hospital name
R
PORTABLE
```

This is called **burned-in annotation.**

Removing the DICOM metadata does nothing to this text. You have to find the text in the pixels and remove it.

This is harder than it sounds. A simple rule such as "look for bright pixels near the top of the image" will find more than just text. Bones such as the clavicle and ribs are also bright.

![Chest X-ray showing identifying text and anatomical structures, illustrating why burned-in annotations cannot be removed by simply deleting DICOM metadata.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/f7c468f5-87bf-43ed-b035-40658803e6d2.png)

That means a real de-identification pipeline usually combines several techniques:

```plaintext
Text detection
OCR
Image-region rules
DICOM metadata removal
Validation
```

The goal isn't just to remove text. It's to prove that the text was actually removed.

For example:

```py
IDENTIFIERS = [
    "PatientName",
    "PatientID",
    "PatientBirthDate",
    "PatientSex",
    "InstitutionName",
    "ReferringPhysicianName",
    "StudyDate",
    "StudyTime",
    "AccessionNumber"
]

for tag in IDENTIFIERS:
    if tag in ds:
        ds[tag].value = ""

# Records that an identity-removal process was performed.
# This field alone does not make the dataset de-identified.
ds.PatientIdentityRemoved = "YES"
```

The pixel-level part is where a simple demo and a real production pipeline are very different.

### 3. Safe Harbor and Expert Determination

If you work with US healthcare data, you'll often see two HIPAA terms: **Safe Harbor** and **Expert Determination**.

They are two ways to determine whether protected health information has been de-identified under HIPAA.

#### Safe Harbor

Safe Harbor is a checklist. It requires removing 18 categories of identifiers, including things such as:

```plaintext
Names
Geographic information smaller than a state
Certain dates
Phone numbers
Medical record numbers
Device identifiers
Full-face photographs
```

It's relatively straightforward because you can follow a defined list.

#### Expert Determination

Expert Determination takes a different approach. A qualified expert evaluates the risk of re-identification and documents why the remaining risk is very small. This can allow researchers to keep information that Safe Harbor would require them to remove.

For example, exact dates can be very useful when studying how a disease changes over time.

So there's a trade-off:

**Safe Harbor is simpler and more restrictive**

**Expert Determination is more flexible, but requires a documented risk assessment**

These are US HIPAA concepts. Other countries have different privacy laws and definitions.

For example, the GDPR in the EU and India's DPDP Act have their own approaches to anonymous and pseudonymous data.

---

## From Dataset to Model Input

### 4. Preprocessing

Preprocessing is what you do to an image before giving it to a model.

Common preprocessing steps include:

- Resizing
- Windowing
- Changing orientation
- Normalizing pixel values

![Chest X-ray before and after preprocessing, illustrating changes such as resizing, windowing, and orientation.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/09d29749-7e91-4be6-8569-bcea52249e4a.png)

#### Resizing

Models usually expect images of a fixed size. Medical images can come in many different sizes, so they're often resized.

But resizing changes the relationship between pixels and physical space.

For example, if you resize an image from 1024 × 1024 to 512 × 512, each pixel now represents a different physical area.

So if you need physical measurements, such as distances or areas in millimeters, you need to account for the original or resampled pixel spacing.

#### Windowing

Windowing selects a range of intensity values and maps that range to the display range. Values outside the range are clipped.

Radiologists commonly use different window settings when looking at CT images because different tissues become easier to see under different windows.

Windowing changes how the image is represented or displayed. It doesn't mean the original image data has been changed.

The notebook demonstrates windowing using the 2nd and 98th percentiles:

```py
lo, hi = np.percentile(img, [2, 98])
windowed = np.clip(
    (img.astype(float) - lo) / (hi - lo),
    0,
    1
)
```

#### Orientation

Medical images also contain information about orientation. Getting this wrong means left and right are swapped, which, for a chest X-ray, is a serious mistake.

### 5. Normalization

Here's the first word with dual meanings.

In machine learning, normalization usually means transforming numerical values into a more consistent scale or distribution so that training behaves more predictably. Two common versions:

![Chest X-ray showing different pixel-value normalization methods, comparing the original image with min-max and z-score normalized versions.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/a5015387-4f30-482e-bf9b-54fde7d56b15.png)

- **Min-max**: rescale so the lowest value becomes 0 and the highest becomes 1.

```py
f = img.astype(np.float32)

minmax = (f - f.min()) / (f.max() - f.min())
```

- **Z-score**: subtract the mean and divide by the standard deviation, giving a mean of 0 and a standard deviation of 1.

```py
zscore = (f - f.mean()) / f.std()
```

Min-max normalization has one weakness. It depends directly on the minimum and maximum values. A very bright pixel, such as one caused by a device or noise, can change the range and squeeze most of the image into a smaller part of the scale.

Z-score normalization is less dependent on the minimum and maximum, although extreme values can still affect the mean and standard deviation.

In medical imaging, normalization can also be applied consistently across images or datasets, but making images from different scanners or institutions comparable is more specifically described as **harmonization**. The distinction becomes important when you are dealing with multiple sites, as explained in section 10. ### 6. Annotation and Label

Both describe information associated with an image, but they differ in what that information represents.

![Chest X-ray illustrating the difference between an image-level label and a spatial annotation, with a lung region marked on the image.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/9c7da7a1-5382-4136-8b3b-07293e794010.png)

A **label** usually describes the image as a whole.

For example:

```plaintext
Image → Pneumonia
```

An **annotation** usually tells you where something is in the image.

It could be:

- A point
- Bounding box
- Polygon
- Contour
- Pixel-level mask

For example:

```plaintext
Image → Lung mask
```

The key difference is **location**.

A label tells you *what* is present while an annotation can tell you *what* is present and *where* it is.

Annotations also take much more effort to create.

A large dataset may have millions of image-level labels extracted from radiology reports, but only a small subset may have detailed masks created by clinicians.

That shortcut has a cost. A report may say "pneumonia," but that doesn't necessarily tell you exactly which pixels show pneumonia. This can lead to **noisy labels**.

### 7. Dataset Splitting

One of the most important decisions in a medical imaging study is **how you split the data**.

The split should usually happen at the **patient level**, not the image level.

Imagine a patient has five X-rays. If you put three images into training and two into testing, the model has already seen images from that patient during training. Patient-specific characteristics can appear in both sets. This is a form of **data leakage**.

The same idea applies to:

- Multiple scans from the same patient
- Multiple images from the same study
- Images derived from the same original scan

The goal is simple: the test set should contain patients the model didn't see during training.

So instead of:

**Split images and assign patients**

do this:

**Split patients and assign their images**

This is one of those details that can have a bigger effect on your results than changing the model architecture.

---

## From Model to Prediction

### 8. Classification, Detection, and Segmentation

Take the same chest X-ray and ask three different questions.

![Chest X-ray showing three model outputs: an image-level classification label, a bounding box for detection, and a pixel-level segmentation mask.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/a06f3760-0fa8-4b37-ba1a-567a77c2ae25.png)

#### Classification

Is there pneumonia?

The model returns a label or probability.

```plaintext
Pneumonia: 0.92
```

It tells you **what** is in the image. It doesn't tell you where.

#### Detection

Where is the abnormality? The model returns a bounding box.

```plaintext
[x, y, width, height]
```

It tells you roughly where the finding is. It doesn't describe its exact shape.

#### Segmentation

Which pixels belong to the abnormality?

The model returns a pixel-level mask. This gives you the shape and location of the finding.

A simple way to remember it:

**Classification = What?**

**Detection = Where?**

**Segmentation = Which pixels?**

The amount of annotation work usually increases as you move from classification to detection to segmentation.

So choose the simplest task that answers your question. If you only need to know whether a scan is abnormal, you probably don't need segmentation.

### 9. Augmentation

Augmentation creates new training examples by transforming existing images.

Common transformations include:

- Rotation
- Translation
- Zoom
- Brightness changes

This can be useful when medical datasets are small.

![Chest X-ray showing examples of image augmentation, including rotation and horizontal flipping, demonstrating how transformations can change anatomical orientation.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/4eb5cc4a-b415-4d97-8f8a-341ce433576e.png)

But medical images have an important constraint: the transformed image should still look like something that could realistically happen to a patient.

For example, a horizontal flip is common in natural-image machine learning.

Flip a photo of a cat and you still have a cat.

But flip a chest X-ray and the heart moves to the other side. You may have just created an image that looks like **dextrocardia**, where the heart is on the right side.

The same problem happens with markers. A right-side marker can suddenly appear on the left. The letter itself is also mirrored. A model doesn't automatically understand that this is anatomically wrong.

Other augmentations can cause problems, too. A large brightness change might hide important findings. An aggressive crop might remove part of the lungs.

So before using an augmentation, ask: could this image realistically come from a real scanner and a real patient?

If not, don't use it.

```py
# Reasonable: small rotation
M = cv2.getRotationMatrix2D((cx, cy), 7, 1.0)
rotated = cv2.warpAffine(
    img,
    M,
    (w, h),
    borderMode=cv2.BORDER_REPLICATE
)

# Potentially problematic for a chest X-ray:
flipped = img[:, ::-1]
```

### 10. Postprocessing

Postprocessing happens after the model produces its output.

A segmentation model usually produces a probability for every pixel. After applying a threshold, the mask may contain small unwanted regions or holes.

![Lung segmentation mask before and after postprocessing, showing removal of small connected regions and filling of holes.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/262a38f4-9da2-416e-98ba-7828b19df58f.png)

For example, the notebook's raw mask contains:

- Two large lung regions
- Fourteen small unwanted regions

A common cleanup step is to keep only the largest connected components.

Since we expect two lungs, we can keep the two largest regions. We can also fill small holes.

```py
labelled, n = ndimage.label(mask > 0)

sizes = ndimage.sum(
    mask > 0,
    labelled,
    range(1, n + 1)
)

keep = np.isin(
    labelled,
    np.argsort(sizes)[-2:] + 1
)

clean = ndimage.binary_fill_holes(keep)
```

In this example, the cleanup reduces the number of connected components from 16 to 2 while changing less than 5% of the pixels.

That illustrates an **important point about evaluation:** pixel-overlap metric might barely change, even though the structure of the prediction has changed significantly.

For some applications, the number and shape of connected regions matter more than a small change in pixel overlap. So choose metrics that match the errors you actually care about.

Also, be careful with postprocessing. If your model needs a lot of cleanup before the result looks good, the cleanup may be hiding problems in the model.

Always look at the raw output, too.

---

## From One Hospital to the Real World

### 11. Harmonization

Imagine two hospitals use different scanners.

The images may have different:

- Brightness
- Contrast
- Noise
- Resolution
- Image-processing characteristics

A model trained mostly on Hospital A may learn some of these differences instead of learning features related to the disease. It may perform well on Hospital A but fail on Hospital B.

This is where **harmonization** can help.

![Chest X-rays from different imaging sources before and after harmonization, illustrating differences in brightness and contrast between sites.](https://cdn.hashnode.com/uploads/covers/69fd77e89f93a850a46d376f/309ae26c-a241-4af2-a59f-3004cad885d5.png)

Harmonization tries to make data from different sources more comparable while preserving the information that matters.

One simple example is **histogram matching**.

It adjusts the pixel-value distribution of one image to look more like a reference image.

```py
from skimage.exposure import match_histograms

harmonized = match_histograms(
    image_from_hospital_b,
    reference_from_hospital_a
)
```

This can help with brightness and contrast differences, but it can't solve everything.

If two scanners have different resolution, noise characteristics, or image-processing pipelines, histogram matching alone isn't enough.

And if information was lost during image acquisition or clipping, harmonization can't magically recover it.

A useful rule of thumb is:

**Normalization makes numerical values more consistent.**

**Harmonization addresses systematic differences between data sources.**

### 12. Retrospective and Prospective Validation

This section is about study design.

#### Retrospective

A retrospective study uses data that already exists.

For example:

> We collected 4,000 chest X-rays from the hospital archive and tested our model on them.

This is common in medical AI because it's relatively fast and inexpensive.

But it also creates opportunities for bias. Researchers may make decisions about which patients to include, which scans to exclude, which hospital to use, and which threshold to choose.

These decisions can unintentionally make the results look better.

#### Prospective

In a prospective study, you define the study plan first and then collect data going forward.

For example:

> We define the patient population, evaluation criteria, and success metrics before collecting the images.

This can reduce some sources of bias because important decisions are made before seeing the results.

#### External validation

You'll also see the term **external validation**.

This means testing the model on data that is independent of the data used to develop it.

For example:

```plaintext
Hospital A → Training
Hospital A → Internal test
Hospital B → External validation
```

An even stronger test might be:

```plaintext
Hospital A + B → Development
Hospital C → External validation
```

A model that performs well on its own hospital's data but poorly at another hospital may have learned site-specific patterns instead of general disease features.

External validation is therefore often much more informative than simply creating another random split from the same dataset.

---

## Putting it Together

Now consider this sentence from a hypothetical medical imaging paper:

> We retrospectively collected 4,120 de-identified frontal chest radiographs from two institutions. Images were resampled to 512 × 512, intensity-normalized, and harmonized across sites by histogram matching. Lung fields were manually annotated by two radiologists; segmentation output was postprocessed by largest-component selection. The model was externally validated on 890 studies from a third site.

That paragraph contains a lot of information, but now you can decode it:

1. **Retrospectively collected:** The researchers used images that already existed.
2. **De-identified:** Identifying information was removed or changed.
3. **Two institutions:** The dataset comes from more than one source.
4. **Resampled to 512 × 512:** Images were converted to a common image size.
5. **Intensity-normalized:** Pixel values were transformed to a more consistent numerical scale.
6. **Harmonized:** The researchers tried to reduce systematic differences between the two sites.
7. **Manually annotated by two radiologists:** Experts created spatial information showing where the lung fields are.
8. **Postprocessed:** The model's raw segmentation output was cleaned up.
9. **Externally validated:** The model was tested on independent data from another site.

And that last part is especially important. A model that works well only on the data it was developed on tells you much less about how it will perform in the real world.

---

## Conclusion

A medical imaging paper can describe an entire data pipeline in just a few sentences.

Once you understand the terminology, you can start reading those sentences differently.

Instead of just looking at the model and its accuracy, you can ask:

- Where did the images come from?
- What scanner was used?
- Were patients kept separate between training and testing?
- How were identifiers removed?
- Could there be burned-in text?
- Who created the labels or annotations?
- What preprocessing was performed?
- How were pixel values normalized?
- Were different hospitals or scanners harmonized?
- Was the model externally validated?
- Was the test data truly independent?
- What happened to the model's output after prediction?

The model is only one part of a medical imaging pipeline. Very often, the more important questions come **before the model ever sees an image**.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Happens to a Medical Image Before and After a Model Sees It",
  "desc": "Medical imaging papers are full of familiar-looking terms: normalization, labels, validation, annotation, and preprocessing. If you come from general machine learning, you may think you already know w",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-happens-to-a-medical-image-before-and-after-a-model-sees-it.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
