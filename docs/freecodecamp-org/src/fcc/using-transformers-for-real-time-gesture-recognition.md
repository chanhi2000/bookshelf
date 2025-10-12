---
lang: en-US
title: "How to Use Transformers for Real-Time Gesture Recognition"
description: "Article(s) > How to Use Transformers for Real-Time Gesture Recognition"
icon: iconfont icon-tensorflow
category:
  - Python
  - Tensorflow
  - NumPy
  - Matplotlib
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - tensorflow
  - py-tensorflow
  - numpy
  - py-numpy
  - matplotlib
  - py-matplotlib
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Transformers for Real-Time Gesture Recognition"
    - property: og:description
      content: "How to Use Transformers for Real-Time Gesture Recognition"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/using-transformers-for-real-time-gesture-recognition.html
prev: /programming/py-tensorflow/articles/README.md
date: 2025-10-06
isOriginal: false
author:
  - name: OMOTAYO OMOYEMI
    url : https://freecodecamp.org/news/author/tayo4christ/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759757931295/5f19fd4e-93c0-4bd7-a75c-a7858e061ecd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tensorflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-tensorflow/articles/README.md",
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
  name="How to Use Transformers for Real-Time Gesture Recognition"
  desc="Gesture and sign recognition is a growing field in computer vision, powering accessibility tools and natural user interfaces. Most beginner projects rely on hand landmarks or small CNNs, but these often miss the bigger picture because gestures are no..."
  url="https://freecodecamp.org/news/using-transformers-for-real-time-gesture-recognition"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759757931295/5f19fd4e-93c0-4bd7-a75c-a7858e061ecd.png"/>

Gesture and sign recognition is a growing field in computer vision, powering accessibility tools and natural user interfaces. Most beginner projects rely on hand landmarks or small CNNs, but these often miss the bigger picture because gestures are not static images. Rather, they unfold over time. To build more robust, real-time systems, we need models that can capture both spatial details and temporal context.

This is where Transformers come in. Originally built for language, they’ve become state-of-the-art in vision tasks thanks to models like the Vision Transformer (ViT) and video-focused variants such as TimeSformer.

In this tutorial, we’ll use a Transformer backbone to create a lightweight real-time gesture recognition tool, optimized for small datasets and deployable on a regular laptop webcam.

---

## Why Transformers for Gestures?

Transformers are powerful because they use self-attention to model relationships across a sequence. For gestures, this means the model doesn’t just see isolated frames, but also learns how movements evolve over time. A wave, for example, looks different from a raised hand only when viewed as a sequence.

Vision Transformers process images as patches, while video Transformers extend this to multiple frames with temporal attention. Even a simple approach, like applying ViT to each frame and pooling across time, can outperform traditional CNN-based methods for small datasets.

Combined with Hugging Face’s pre-trained models and ONNX Runtime for optimization, Transformers make it possible to train on a modest dataset and still achieve smooth real-time recognition.

::: info What You’ll Learn

In this tutorial, you’ll build a gesture recognition system using Transformers. By the end, you’ll know how to:

- Create (or record) a tiny gesture dataset
- Train a Vision Transformer (ViT) with temporal pooling
- Export the model to ONNX for faster inference
- Build a real-time Gradio app that classifies gestures from your webcam
- Evaluate your model’s accuracy and latency with simple scripts
- Understand the accessibility potential and ethical limits of gesture recognition

:::

::: note Prerequisites

To follow along, you should have:

- Basic Python knowledge (functions, scripts, virtual environments)
- Familiarity with PyTorch (tensors, datasets, training loops) – helpful but not required
- Python 3.8+ installed on your system
- A webcam (for the live demo in Gradio)
- Optionally: GPU access (training on CPU works, but is slower)

:::

---

## Project Setup

Create a new project folder and install the required libraries.

```sh
# Create a new project directory and navigate into it
mkdir transformer-gesture && cd transformer-gesture

# Set up a Python virtual environment
python -m venv .venv
```

Activate the virtual environment

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```sh
.venv\Scripts\Activate.ps1
```

@tab <FontIcon icon="iconfont icon-macos"/>,<FontIcon icon="fa-brands fa-linux"/>

```sh
source .venv/bin/activate
```

:::

The provided code snippet is a set of commands for setting up a new Python project with a virtual environment. Here's a breakdown of each part:

1. `mkdir transformer-gesture && cd transformer-gesture`: This command creates a new directory named "transformer-gesture" and then navigates into it.
2. `python -m venv .venv`: This command creates a new virtual environment in the current directory. The virtual environment is stored in a folder named ".venv".
3. Activating the virtual environment:
    - For Windows PowerShell, you can use `.venv\Scripts\Activate.ps1` to activate the virtual environment.
    - For macOS/Linux, use `source .venv/bin/activate` to activate the virtual environment.

Activating a virtual environment ensures that the Python interpreter and any packages you install are isolated to this specific project, preventing conflicts with other projects or system-wide packages.

Create a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file:

```plaintext title="requirements.txt"
torch>=2.0
torchvision
torchaudio
timm
huggingface_hub

onnx
onnxruntime

gradio

numpy
opencv-python
pillow

matplotlib
seaborn
scikit-learn
```

The list provided is a set of package dependencies typically found in a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file for a Python project. Here's a brief explanation of each package:

1. **torch>=2.0**: PyTorch is a popular open-source deep learning framework that provides a flexible and efficient platform for building and training neural networks. Version 2.0 and above includes improvements in performance and new features.
2. **torchvision**: This library is part of the PyTorch ecosystem and provides tools for computer vision tasks, including datasets, model architectures, and image transformations.
3. **torchaudio**: Also part of the PyTorch ecosystem, Torchaudio provides audio processing tools and datasets, making it easier to work with audio data in deep learning projects.
4. **timm**: The PyTorch Image Models (timm) library offers a collection of pre-trained models and utilities for computer vision tasks, facilitating quick experimentation and deployment.
5. **huggingface_hub**: This library allows easy access to models and datasets hosted on the Hugging Face Hub, a platform for sharing and collaborating on machine learning models and datasets.
6. **onnx**: The Open Neural Network Exchange (ONNX) format is used to represent machine learning models, enabling interoperability between different frameworks.
7. **onnxruntime**: This is a high-performance runtime for executing ONNX models, allowing for efficient deployment across various platforms.
8. **gradio**: Gradio is a library for creating user interfaces for machine learning models, making them accessible through a web interface for easy interaction and testing.
9. **numpy**: A fundamental package for numerical computing in Python, providing support for arrays and a wide range of mathematical functions.
10. **opencv-python**: OpenCV is a library for computer vision and image processing tasks, widely used for real-time applications.
11. **pillow**: A Python Imaging Library (PIL) fork, Pillow provides tools for opening, manipulating, and saving many different image file formats.
12. **matplotlib**: A plotting library for Python, Matplotlib is used for creating static, interactive, and animated visualizations in Python.
13. **seaborn**: Built on top of Matplotlib, Seaborn provides a high-level interface for drawing attractive and informative statistical graphics.
14. **scikit-learn**: A machine learning library in Python that provides simple and efficient tools for data analysis and modeling, including classification, regression, clustering, and dimensionality reduction.

Install dependencies:

```sh
pip install -r requirements.txt
```

The command `pip install -r requirements.txt` is used to install all the Python packages listed in a file named <FontIcon icon="fas fa-file-lines"/>`requirements.txt`. This file typically contains a list of package dependencies required for a Python project, each specified with a package name and optionally a version number.

By running this command, `pip`, which is the Python package installer, reads the file and installs each package listed, ensuring that the project has all the necessary dependencies to run properly. This is a common practice in Python projects to manage and share dependencies easily.

---

## Generate a Gesture Dataset

To train our Transformer-based gesture recognizer, we need some data. Instead of downloading a huge dataset, we’ll start with a tiny synthetic dataset you can generate in seconds. This makes the tutorial lightweight and ensures that everyone can follow along without dealing with multi-gigabyte downloads.

---

## Option 1: Generate a Synthetic Dataset

We’ll use a small Python script that creates short `.mp4` clips of a moving (or still) coloured box. Each class represents a gesture:

- **swipe_left**: box moves from right to left
- **swipe_right**: box moves from left to right
- **stop**: box stays still in the center

Save this script as <FontIcon icon="fa-brands fa-python"/>`generate_synthetic_gestures.py` in your project root:

```py :collapsed-liens title="generate_synthetic_gestures.py"
import os, cv2, numpy as np, random, argparse

def ensure_dir(p): os.makedirs(p, exist_ok=True)

def make_clip(mode, out_path, seconds=1.5, fps=16, size=224, box_size=60, seed=0, codec="mp4v"):
    rng = random.Random(seed)
    frames = int(seconds * fps)
    H = W = size

    # background + box color
    bg_val = rng.randint(160, 220)
    bg = np.full((H, W, 3), bg_val, dtype=np.uint8)
    color = (rng.randint(20, 80), rng.randint(20, 80), rng.randint(20, 80))

    # path of motion
    y = rng.randint(40, H - 40 - box_size)
    if mode == "swipe_left":
        x_start, x_end = W - 20 - box_size, 20
    elif mode == "swipe_right":
        x_start, x_end = 20, W - 20 - box_size
    elif mode == "stop":
        x_start = x_end = (W - box_size) // 2
    else:
        raise ValueError(f"Unknown mode: {mode}")

    fourcc = cv2.VideoWriter_fourcc(*codec)
    vw = cv2.VideoWriter(out_path, fourcc, fps, (W, H))
    if not vw.isOpened():
        raise RuntimeError(
            f"Could not open VideoWriter with codec '{codec}'. "
            "Try --codec XVID and use .avi extension, e.g. out.avi"
        )

    for t in range(frames):
        alpha = t / max(1, frames - 1)
        x = int((1 - alpha) * x_start + alpha * x_end)
        # small jitter to avoid being too synthetic
        jitter_x, jitter_y = rng.randint(-2, 2), rng.randint(-2, 2)
        frame = bg.copy()
        cv2.rectangle(frame, (x + jitter_x, y + jitter_y),
                      (x + jitter_x + box_size, y + jitter_y + box_size),
                      color, thickness=-1)
        # overlay text
        cv2.putText(frame, mode, (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2, cv2.LINE_AA)
        cv2.putText(frame, mode, (8, 24), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 1, cv2.LINE_AA)
        vw.write(frame)

    vw.release()

def write_labels(labels, out_dir):
    with open(os.path.join(out_dir, "labels.txt"), "w", encoding="utf-8") as f:
        for c in labels:
            f.write(c + "\n")

def main():
    ap = argparse.ArgumentParser(description="Generate a tiny synthetic gesture dataset.")
    ap.add_argument("--out", default="data", help="Output directory (default: data)")
    ap.add_argument("--classes", nargs="+",
                    default=["swipe_left", "swipe_right", "stop"],
                    help="Class names (default: swipe_left swipe_right stop)")
    ap.add_argument("--clips", type=int, default=16, help="Clips per class (default: 16)")
    ap.add_argument("--seconds", type=float, default=1.5, help="Seconds per clip (default: 1.5)")
    ap.add_argument("--fps", type=int, default=16, help="Frames per second (default: 16)")
    ap.add_argument("--size", type=int, default=224, help="Frame size WxH (default: 224)")
    ap.add_argument("--box", type=int, default=60, help="Box size (default: 60)")
    ap.add_argument("--codec", default="mp4v", help="Codec fourcc (mp4v or XVID)")
    ap.add_argument("--ext", default=".mp4", help="File extension (.mp4 or .avi)")
    args = ap.parse_args()

    ensure_dir(args.out)
    write_labels(args.classes, ".")  # writes labels.txt to project root

    print(f"Generating synthetic dataset -> {args.out}")
    for cls in args.classes:
        cls_dir = os.path.join(args.out, cls)
        ensure_dir(cls_dir)
        mode = "stop" if cls == "stop" else ("swipe_left" if "left" in cls else ("swipe_right" if "right" in cls else "stop"))
        for i in range(args.clips):
            filename = os.path.join(cls_dir, f"{cls}_{i+1:03d}{args.ext}")
            make_clip(
                mode=mode,
                out_path=filename,
                seconds=args.seconds,
                fps=args.fps,
                size=args.size,
                box_size=args.box,
                seed=i + 1,
                codec=args.codec
            )
        print(f"  {cls}: {args.clips} clips")

    print("Done. You can now run: python train.py, python export_onnx.py, python app.py")

if __name__ == "__main__":
    main()
```

The script generates a synthetic gesture dataset by creating video clips of a moving or stationary coloured box, simulating gestures like "swipe left," "swipe right," and "stop," and saves them in a specified output directory.

Now run it inside your virtual environment:

```sh
python generate_synthetic_gestures.py --out data --clips 16 --seconds 1.5
```

The command above runs a Python script named <FontIcon icon="fa-brands fa-python"/>`generate_synthetic_gestures.py`, which generates a synthetic gesture dataset with 16 clips per gesture, each lasting 1.5 seconds, and saves the output in a directory named "data".

This creates a dataset like:

```plaintext
data/
  swipe_left/*.mp4
  swipe_right/*.mp4
  stop/*.mp4
labels.txt
```

Each folder contains short clips of a moving (or still) box that simulate gestures. This is perfect for testing the pipeline.

### Training Script: <FontIcon icon="fa-brands fa-python"/>`train.py`

Now that we have our dataset, let’s fine-tune a Vision Transformer with temporal pooling. This model applies ViT frame-by-frame, averages embeddings across time, and trains a classification head on your gestures.

Here’s the full training script:

```py :collapsed-lines title="train.py"
import torch, torch.nn as nn, torch.optim as optim
from torch.utils.data import DataLoader
import timm
from dataset import GestureClips, read_labels

class ViTTemporal(nn.Module):
    """Frame-wise ViT encoder -> mean pool over time -> linear head."""
    def __init__(self, num_classes, vit_name="vit_tiny_patch16_224"):
        super().__init__()
        self.vit = timm.create_model(vit_name, pretrained=True, num_classes=0, global_pool="avg")
        feat_dim = self.vit.num_features
        self.head = nn.Linear(feat_dim, num_classes)

    def forward(self, x):  # x: (B,T,C,H,W)
        B, T, C, H, W = x.shape
        x = x.view(B * T, C, H, W)
        feats = self.vit(x)                  # (B*T, D)
        feats = feats.view(B, T, -1).mean(dim=1)  # (B, D)
        return self.head(feats)

def train():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    labels, _ = read_labels("labels.txt")
    n_classes = len(labels)

    train_ds = GestureClips(train=True)
    val_ds   = GestureClips(train=False)
    print(f"Train clips: {len(train_ds)} | Val clips: {len(val_ds)}")

    # Windows/CPU friendly
    train_dl = DataLoader(train_ds, batch_size=2, shuffle=True,  num_workers=0, pin_memory=False)
    val_dl   = DataLoader(val_ds,   batch_size=2, shuffle=False, num_workers=0, pin_memory=False)

    model = ViTTemporal(num_classes=n_classes).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.05)

    best_acc = 0.0
    epochs = 5
    for epoch in range(1, epochs + 1):
        # ---- Train ----
        model.train()
        total, correct, loss_sum = 0, 0, 0.0
        for x, y in train_dl:
            x, y = x.to(device), y.to(device)
            optimizer.zero_grad()
            logits = model(x)
            loss = criterion(logits, y)
            loss.backward()
            optimizer.step()

            loss_sum += loss.item() * x.size(0)
            correct += (logits.argmax(1) == y).sum().item()
            total += x.size(0)

        train_acc = correct / total if total else 0.0
        train_loss = loss_sum / total if total else 0.0

        # ---- Validate ----
        model.eval()
        vtotal, vcorrect = 0, 0
        with torch.no_grad():
            for x, y in val_dl:
                x, y = x.to(device), y.to(device)
                vcorrect += (model(x).argmax(1) == y).sum().item()
                vtotal += x.size(0)
        val_acc = vcorrect / vtotal if vtotal else 0.0

        print(f"Epoch {epoch:02d} | train_loss {train_loss:.4f} "
              f"| train_acc {train_acc:.3f} | val_acc {val_acc:.3f}")

        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), "vit_temporal_best.pt")

    print("Best val acc:", best_acc)

if __name__ == "__main__":
    train()
```

Running the command `python train.py` initiates the training process for your gesture recognition model. Here's a breakdown of what happens:

1. **Load your dataset from data/**: The script will access and load the gesture dataset stored in the "data" directory. This dataset is used to train the model.
2. **Fine-tune a pre-trained Vision Transformer**: The training script will take a Vision Transformer model that has been pre-trained on a larger dataset and fine-tune it using your specific gesture dataset. Fine-tuning helps the model adapt to the nuances of your data, improving its performance on the specific task of gesture recognition.
3. **Save the best checkpoint as vit_temporal_best.pt**: During training, the script will evaluate the model's performance on a validation set. The best-performing version of the model (based on some metric like accuracy) will be saved as a checkpoint file named "vit_temporal_best.pt". This file can later be used for inference or further training.

#### What Training Looks Like

You should see logs similar to this:

```plaintext
Train clips: 38 | Val clips: 10
Epoch 01 | train_loss 1.4508 | train_acc 0.395 | val_acc 0.200
Epoch 02 | train_loss 1.2466 | train_acc 0.263 | val_acc 0.200
Epoch 03 | train_loss 1.1361 | train_acc 0.368 | val_acc 0.200
Best val acc: 0.200
```

Don’t worry if your accuracy is low at first, as with the synthetic dataset that’s normal. The key is proving that the Transformer pipeline works. You can boost results later by:

- Adding more clips per class
- Training for more epochs
- Switching to real recorded gestures

![Training logs](https://github.com/tayo4christ/transformer-gesture/blob/07c7071bdb17bc08585baeb60d787eadc3936ef5/images/training-logs.png?raw=true)

Figure 1. Example training logs from <FontIcon icon="fa-brands fa-python"/>`train.py`, where the Vision Transformer with temporal pooling is fine-tuned on a tiny synthetic dataset.

### Export the Model to ONNX

To make our model easier to run in real time (and lighter on CPU), we’ll export it to the ONNX format.

::: note

ONNX, which stands for Open Neural Network Exchange, is an open-source format designed to facilitate the interchange of deep learning models between different frameworks. It lets you train a model in one framework, such as PyTorch or TensorFlow, and then deploy it in another, like Caffe2 or MXNet, without needing to completely rewrite the model. This interoperability is achieved by providing a standardized representation of the model's architecture and parameters.

:::

ONNX supports a wide range of operators and is continually updated to include new features, making it a versatile choice for deploying machine learning models across various platforms and devices.

Create a file called <FontIcon icon="fa-brands fa-python"/>`export_onnx.py`:

```py title="export_onnx.py"
import torch
from train import ViTTemporal
from dataset import read_labels

labels, _ = read_labels("labels.txt")
n_classes = len(labels)

# Load trained model
model = ViTTemporal(num_classes=n_classes)
model.load_state_dict(torch.load("vit_temporal_best.pt", map_location="cpu"))
model.eval()

# Dummy input: batch=1, 16 frames, 3x224x224
dummy = torch.randn(1, 16, 3, 224, 224)

# Export
torch.onnx.export(
    model, dummy, "vit_temporal.onnx",
    input_names=["video"], output_names=["logits"],
    dynamic_axes={"video": {0: "batch"}},
    opset_version=13
)

print("Exported vit_temporal.onnx")
```

Run it with `python export_onnx.py`.

This generates a file `vit_temporal.onnx` in your project folder. ONNX lets us use onnxruntime, which is much faster for inference.

Create a file called <FontIcon icon="fa-brands fa-python"/>`app.py`:

```py :collapsed-lines title="app.py"
import os, tempfile, cv2, torch, onnxruntime, numpy as np
import gradio as gr
from dataset import read_labels

T = 16
SIZE = 224
MODEL_PATH = "vit_temporal.onnx"

labels, _ = read_labels("labels.txt")

# --- ONNX session + auto-detect names ---
ort_session = onnxruntime.InferenceSession(MODEL_PATH, providers=["CPUExecutionProvider"])
# detect first input and first output names to avoid mismatches
INPUT_NAME = ort_session.get_inputs()[0].name   # e.g. "input" or "video"
OUTPUT_NAME = ort_session.get_outputs()[0].name # e.g. "logits" or something else

def preprocess_clip(frames_rgb):
    if len(frames_rgb) == 0:
        frames_rgb = [np.zeros((SIZE, SIZE, 3), dtype=np.uint8)]
    if len(frames_rgb) < T:
        frames_rgb = frames_rgb + [frames_rgb[-1]] * (T - len(frames_rgb))
    frames_rgb = frames_rgb[:T]
    clip = [cv2.resize(f, (SIZE, SIZE), interpolation=cv2.INTER_AREA) for f in frames_rgb]
    clip = np.stack(clip, axis=0)                                    # (T,H,W,3)
    clip = np.transpose(clip, (0, 3, 1, 2)).astype(np.float32) / 255 # (T,3,H,W)
    clip = (clip - 0.5) / 0.5
    clip = np.expand_dims(clip, 0)                                   # (1,T,3,H,W)
    return clip

def _extract_path_from_gradio_video(inp):
    if isinstance(inp, str) and os.path.exists(inp):
        return inp
    if isinstance(inp, dict):
        for key in ("video", "name", "path", "filepath"):
            v = inp.get(key)
            if isinstance(v, str) and os.path.exists(v):
                return v
        for key in ("data", "video"):
            v = inp.get(key)
            if isinstance(v, (bytes, bytearray)):
                tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
                tmp.write(v); tmp.flush(); tmp.close()
                return tmp.name
    if isinstance(inp, (list, tuple)) and inp and isinstance(inp[0], str) and os.path.exists(inp[0]):
        return inp[0]
    return None

def _read_uniform_frames(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
    idxs = np.linspace(0, total - 1, max(T, 1)).astype(int)
    want = set(int(i) for i in idxs.tolist())
    j = 0
    while True:
        ok, bgr = cap.read()
        if not ok: break
        if j in want:
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            frames.append(rgb)
        j += 1
    cap.release()
    return frames

def predict_from_video(gradio_video):
    video_path = _extract_path_from_gradio_video(gradio_video)
    if not video_path or not os.path.exists(video_path):
        return {}
    frames = _read_uniform_frames(video_path)

    # If OpenCV choked on the codec (common with recorded webm), re-encode once:
    if len(frames) == 0:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4"); tmp_name = tmp.name; tmp.close()
        cap = cv2.VideoCapture(video_path)
        fourcc = cv2.VideoWriter_fourcc(*"mp4v")
        w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) or 640
        h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) or 480
        out = cv2.VideoWriter(tmp_name, fourcc, 20.0, (w, h))
        while True:
            ok, frame = cap.read()
            if not ok: break
            out.write(frame)
        cap.release(); out.release()
        frames = _read_uniform_frames(tmp_name)

    clip = preprocess_clip(frames)
    # >>> use the detected ONNX input/output names <<<
    logits = ort_session.run([OUTPUT_NAME], {INPUT_NAME: clip})[0]  # (1, C)
    probs = torch.softmax(torch.from_numpy(logits), dim=1)[0].numpy().tolist()
    return {labels[i]: float(probs[i]) for i in range(len(labels))}

def predict_from_image(image):
    if image is None:
        return {}
    clip = preprocess_clip([image] * T)
    logits = ort_session.run([OUTPUT_NAME], {INPUT_NAME: clip})[0]
    probs = torch.softmax(torch.from_numpy(logits), dim=1)[0].numpy().tolist()
    return {labels[i]: float(probs[i]) for i in range(len(labels))}

with gr.Blocks() as demo:
    gr.Markdown("# Gesture Classifier (ONNX)\nRecord or upload a short video, then click **Classify Video**.")
    with gr.Tab("Video (record or upload)"):
        vid_in = gr.Video(label="Record from webcam or upload a short clip")
        vid_out = gr.Label(num_top_classes=3, label="Prediction")
        gr.Button("Classify Video").click(fn=predict_from_video, inputs=vid_in, outputs=vid_out)
    with gr.Tab("Single Image (fallback)"):
        img_in = gr.Image(label="Upload an image frame", type="numpy")
        img_out = gr.Label(num_top_classes=3, label="Prediction")
        gr.Button("Classify Image").click(fn=predict_from_image, inputs=img_in, outputs=img_out)

if __name__ == "__main__":
    demo.launch()
```

Running the command `python app.py` launches a Gradio application in your web browser. Here's what happens:

1. **Webcam feed streams live**: The application accesses your webcam to provide a live video feed. This allows you to perform gestures in front of the camera in real-time.
2. **Predictions update continuously**: As you perform gestures, the model processes the video frames continuously, updating its predictions in real-time.
3. **Top 3 gesture classes displayed with probabilities**: The application displays the top three predicted gesture classes along with their probabilities, giving you an idea of the model's confidence in its predictions.

When you open the app in your browser, you'll find two tabs. In the **Video tab**, you can click *Record from webcam* to capture a short clip of your gesture, typically lasting 2–4 seconds. After recording, click **Classify Video**. The model will then process the captured frames using the Transformer model and display the predicted gesture probabilities. This setup allows for interactive testing and demonstration of the gesture recognition system.

Here’s an example where I raised my hand for a **stop** gesture, and the model predicts “stop” as the top class:

![Gradio demo output](https://github.com/tayo4christ/transformer-gesture/blob/07c7071bdb17bc08585baeb60d787eadc3936ef5/images/realtime-demo.png?raw=true)

Figure 2. The Gradio app running locally. After recording a short clip, the Transformer model predicts the gesture with class probabilities.

### Evaluate Accuracy + Latency

Now that the model runs in a demo app, let’s check how well it performs. There are two sides to this:

- **Accuracy**: does the model predict the right gesture class?
- **Latency**: how fast does it respond, especially on CPU vs GPU?

#### 1. Quick Accuracy Check

Save this as <FontIcon icon="fa-brands fa-python"/>`eval.py` in the same folder as your other scripts:

```py title="eval.py"
import torch
from dataset import GestureClips, read_labels
from train import ViTTemporal

labels, _ = read_labels("labels.txt")
n_classes = len(labels)

# Load validation data
val_ds = GestureClips(train=False)
val_dl = torch.utils.data.DataLoader(val_ds, batch_size=2, shuffle=False)

# Load trained model
model = ViTTemporal(num_classes=n_classes)
model.load_state_dict(torch.load("vit_temporal_best.pt", map_location="cpu"))
model.eval()

correct, total = 0, 0
all_preds, all_labels = [], []

with torch.no_grad():
    for x, y in val_dl:
        logits = model(x)
        preds = logits.argmax(dim=1)
        correct += (preds == y).sum().item()
        total += y.size(0)
        all_preds.extend(preds.tolist())
        all_labels.extend(y.tolist())

print(f"Validation accuracy: {correct/total:.2%}")
```

#### 2. Confusion Matrix

Let’s also visualize which gestures are confused. Add this snippet at the bottom of <FontIcon icon="fa-brands fa-python"/>`eval.py`:

```py title="eval.py"
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix

cm = confusion_matrix(all_labels, all_preds)

plt.figure(figsize=(6,6))
sns.heatmap(cm, annot=True, fmt="d", xticklabels=labels, yticklabels=labels, cmap="Blues")
plt.xlabel("Predicted")
plt.ylabel("True")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.show()
```

When you run `python eval.py`, a heatmap like this will pop up:

![Confusion matrix](https://github.com/tayo4christ/transformer-gesture/blob/07c7071bdb17bc08585baeb60d787eadc3936ef5/images/confusion-matrix.png?raw=true)

Figure 3. Confusion matrix on the validation set. Correct predictions appear along the diagonal. Off-diagonal counts show gesture confusions.

#### 3. Latency Benchmark

Finally, let’s see how fast inference runs. Save the following as <FontIcon icon="fa-brands fa-python"/>`benchmark.py`:

```py title="benchmark.py"
import time, numpy as np, onnxruntime
from dataset import read_labels

labels, _ = read_labels("labels.txt")

ort = onnxruntime.InferenceSession("vit_temporal.onnx", providers=["CPUExecutionProvider"])
INPUT_NAME = ort.get_inputs()[0].name
OUTPUT_NAME = ort.get_outputs()[0].name

dummy = np.random.randn(1, 16, 3, 224, 224).astype(np.float32)

# Warmup
for _ in range(3):
    ort.run([OUTPUT_NAME], {INPUT_NAME: dummy})

# Benchmark
t0 = time.time()
for _ in range(50):
    ort.run([OUTPUT_NAME], {INPUT_NAME: dummy})
t1 = time.time()

print(f"Average latency: {(t1 - t0)/50:.3f} seconds per clip")
```

Run: `python benchmark.py`

On CPU, you might see ~0.05–0.15s per clip; on GPU it’s much faster.

::: note

If latency is high, you can enable **quantization** in ONNX to shrink the model and speed up inference.

:::

---

## Option 2: Use Small Samples from Public Gesture Datasets

If you’d prefer to see your model trained on *real* gesture clips instead of synthetic moving boxes, you can grab a handful of videos from open datasets. You don’t need to download the entire dataset (which can be several GB) just a few `.mp4` samples are enough to follow along.

### Recommended sources

- **20BN Jester Dataset**: Contains short clips of hand gestures like swiping, clapping, and pointing.
- **WLASL**: A large-scale dataset of isolated sign language words.

Both projects provide small `.mp4` videos you can use as realistic training examples. I’ve linked them below.

### Setting up your dataset folder

Once you download a few clips, place them in the <FontIcon icon="fas fa-folder-open"/>`data/` folder under subfolders named after each gesture class. For example:

```plaintext title="file structure"
data/
├── swipe_left/
│   ├── clip1.mp4
│   └── clip2.mp4
├── swipe_right/
│   ├── clip1.mp4
│   └── clip2.mp4
└── stop/
    ├── clip1.mp4
    └── clip2.mp4
```

And update <FontIcon icon="fas fa-file-lines"/>`labels.txt` to match the folder names:

```plaintext title="labels.txt"
swipe_left
swipe_right
stop
```

Now your dataset is ready, and the same training scripts from earlier (<FontIcon icon="fa-brands fa-python"/>`train.py`, <FontIcon icon="fa-brands fa-python"/>`eval.py`) will work without modification.

### Why choose this option?

- Gives more realistic results than synthetic coloured boxes
- Lets you see how the model handles *actual human hand movements*
- It just requires a bit more effort (downloading clips, trimming them if needed)

::: tip

If downloading from these datasets feels too heavy, you can also record your own short gestures using your laptop webcam. Just save them as `.mp4` files and organize them in the same folder structure.

:::

---

## Accessibility Notes & Ethical Limits

While this project shows the technical workflow for gesture recognition with Transformers, it’s important to step back and consider the **human context**:

- **Accessibility first**: Tools like this can help students with speech or motor difficulties, but they should always be co-designed with the people who will use them. Don’t assume one-size-fits-all.
- **Dataset sensitivity**: Using publicly available sign or gesture datasets is fine for prototyping, but deploying such a system requires careful consideration of consent and representation.
- **Error tolerance**: Even small misclassifications can have big consequences in accessibility contexts (for example, confusing *stop* with *go*). Always plan for fallback options (like manual input or confirmation).
- **Bias and inclusivity**: Models trained on narrow datasets may fail for different skin tones, lighting conditions, or cultural gesture variations. Broad and diverse training data is essential for fairness.

In other words: this demo is a **teaching scaffold**, not a production-ready accessibility tool. Responsible deployment requires collaboration with educators, therapists, and end users.

---

## Next Steps

If you’d like to push this project further, here are some directions to explore:

- **Better models**: Try video-focused Transformers like [<FontIcon icon="fas fa-globe"/>TimeSformer](https://arxiv.org/abs/2102.05095) or [<FontIcon icon="fas fa-globe"/>VideoMAE](https://arxiv.org/abs/2203.12602) for stronger temporal reasoning.
- **Larger vocabularies**: Add more gesture classes, build your own dataset, or use portions of public datasets like [<FontIcon icon="iconfont icon-kaggle"/>20BN Jester](https://kaggle.com/datasets/toxicmender/20bn-jester) or [<FontIcon icon="iconfont icon-kaggle"/>WLASL](https://kaggle.com/datasets/risangbaskoro/wlasl-processed).
- **Pose fusion**: Combine gesture video with human pose keypoints from [<FontIcon icon="fas fa-globe"/>MediaPipe](https://mediapipe.readthedocs.io/en/latest/solutions/hands.html) or [<FontIcon icon="iconfont icon-github"/>`CMU-Perceptual-Computing-Lab/openpose`](https://github.com/CMU-Perceptual-Computing-Lab/openpose) for more robust predictions.
- **Real-time smoothing**: Implement temporal smoothing or debounce logic in the app so predictions are more stable during live use.
- **Quantization + edge devices**: Convert your ONNX model to an INT8 quantized version and deploy it on a Raspberry Pi or Jetson Nano for classroom-ready prototypes.

---

## Conclusion

In this tutorial, you learned how to create a gesture recognition system using Transformer models, demonstrating the potential of cutting-edge machine learning techniques. By preparing a small dataset, training a Vision Transformer with temporal pooling, exporting the model to ONNX for efficient inference, and deploying a real-time Gradio app, you showcased a practical application of these technologies. The evaluation of accuracy and latency further highlighted the system's effectiveness and responsiveness.

This project illustrates how you can leverage advanced ML methods to enhance accessibility and communication, paving the way for more inclusive learning environments.

::: note Remember

While this demo works with small datasets, real-world applications need larger, more diverse data and careful consideration of accessibility, inclusivity, and ethics.

:::

::: info

Here’s the GitHub repo for full source code: [<FontIcon icon="iconfont icon-github"/>`tayo4christ/transformer-gesture`](https://github.com/tayo4christ/transformer-gesture).

<SiteInfo
  name="tayo4christ/transformer-gesture"
  desc="Real-time gesture recognition system using Vision Transformers, ONNX, and Gradio. Includes dataset preparation, training, evaluation, and a browser-based demo app."
  url="https://github.com/tayo4christ/transformer-gesture/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/93391e829c023377ae28a0adb55c1e24793f799487a617baf8ad7396862bfec2/tayo4christ/transformer-gesture"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Transformers for Real-Time Gesture Recognition",
  "desc": "Gesture and sign recognition is a growing field in computer vision, powering accessibility tools and natural user interfaces. Most beginner projects rely on hand landmarks or small CNNs, but these often miss the bigger picture because gestures are no...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/using-transformers-for-real-time-gesture-recognition.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
