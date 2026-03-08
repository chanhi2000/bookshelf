---
lang: en-US
title: "How to Containerize Your MLOps Pipeline from Training to Serving"
description: "Article(s) > How to Containerize Your MLOps Pipeline from Training to Serving"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Amazon
  - AWS
  - Python
  - FastAPI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - amazon
  - aws
  - amazon-web-services
  - py
  - python
  - fastapi
  - py-fastapi
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Containerize Your MLOps Pipeline from Training to Serving"
    - property: og:description
      content: "How to Containerize Your MLOps Pipeline from Training to Serving"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-mlops-pipeline-from-training-to-serving.html
prev: /devops/docker/articles/README.md
date: 2026-03-13
isOriginal: false
author:
  - name: Balajee Asish Brahmandam
    url: https://freecodecamp.org/news/author/Balajeeasish/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/156eaca3-8884-4f57-9010-9766278dbf5a.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Containerize Your MLOps Pipeline from Training to Serving"
  desc="Last year, our ML team shipped a fraud detection model that worked perfectly in a Jupyter notebook. Precision was excellent. Recall numbers looked great. Everyone was excited – until we tried to deplo"
  url="https://freecodecamp.org/news/containerize-mlops-pipeline-from-training-to-serving"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/156eaca3-8884-4f57-9010-9766278dbf5a.png"/>

Last year, our ML team shipped a fraud detection model that worked perfectly in a Jupyter notebook. Precision was excellent. Recall numbers looked great. Everyone was excited – until we tried to deploy it.

The model depended on a specific version of scikit-learn that conflicted with the production Python environment. The feature engineering pipeline required a NumPy build compiled against OpenBLAS, but the deployment servers ran MKL. A preprocessing step used a system library that existed on the data scientist's MacBook but not on the Ubuntu deployment target.

Three weeks of debugging later, we had the model running in production. Three weeks. For a model that was technically finished.

That experience is what pushed me to containerize our entire MLOps pipeline end to end. Not because Docker is trendy in ML circles, but because the alternative (hand-tuning environments, writing installation scripts that break on the next OS update, praying that what worked in training works in production) was costing us more time than the actual model development.

In this tutorial, you'll learn how to structure training and serving containers with multi-stage builds, how to set up experiment tracking with MLflow, how to version your training data with DVC, how to configure GPU passthrough for training, and how to tie it all together into a single Compose file with profiles. This is based on a year of running containerized ML pipelines across three teams.

::: note Prerequisites

- Docker Engine 24+ or Docker Desktop 4.20+ with Compose v2.22.0+
- For GPU training, you'll need the [<VPIcon icon="iconfont icon-nvidia"/>NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed on the host and a compatible GPU driver. Run `nvidia-smi` to verify your GPU is visible, and `docker compose version` to check your Compose version.
- Familiarity with Python, basic Docker concepts, and ML workflows (training, evaluation, serving) is assumed.

:::

---


## The MLOps Lifecycle: Where Containers Fit

If you've built a machine learning model, you know the process has a lot of stages. But if you're coming from a software engineering background (or you're a data scientist who mostly works in notebooks), it helps to see the full picture of what an MLOps pipeline looks like and where Docker fits into each stage.

An MLOps pipeline is a chain of interdependent stages:

1. **Data ingestion and validation.** Raw data comes in from databases, APIs, or file systems. You clean it, validate it, and store it in a format your model can use.
2. **Feature engineering.** You transform raw data into features the model can learn from. This might be as simple as normalizing numbers or as complex as generating embeddings.
3. **Experiment tracking.** You log every training run's configuration (hyperparameters, data version, code version) and results (accuracy, loss, evaluation metrics) so you can compare experiments and reproduce the best ones.
4. **Model training.** The model learns from your features. This is the compute-heavy part that often needs GPUs.
5. **Evaluation.** You measure the trained model against test data to see if it's good enough to deploy.
6. **Packaging and serving.** You wrap the trained model in an API so other systems can send it data and get predictions back.
7. **Monitoring.** You watch the model in production to catch problems like data drift (when the real-world data starts looking different from the training data) or performance degradation.

Each stage has different computational needs. Training might require GPUs and terabytes of memory. Serving needs low latency and horizontal scaling. Feature engineering might need distributed processing tools like Spark or Dask.

The thing that changed our approach: you don't containerize the entire pipeline as one monolithic image. You containerize each stage independently, with shared interfaces between them.

Think of it like microservices applied to ML infrastructure. Each container does one thing, does it well, and communicates with the others through well-defined interfaces: model artifacts stored in a registry, metrics logged to MLflow, data versioned in object storage.

This gives you the flexibility to:

- Scale training on expensive GPU instances while running serving on cheaper CPU nodes
- Update your feature engineering code without rebuilding your training environment
- Version each stage independently in your container registry
- Let data scientists and ML engineers work on training while platform engineers optimize serving

---

## How to Build the Training Container

The training container is where most teams start, and where most teams make their first mistake.

The temptation is to create one massive image with every possible library, every CUDA version, every data processing tool. I've seen training images exceed 15GB. They take twenty minutes to build, ten minutes to push, and break whenever someone adds a new dependency.

Here's the pattern that works: use multi-stage builds to separate the build environment from the runtime environment, and use cache mounts to avoid re-downloading packages on every build.

If you're new to these concepts: a **multi-stage build** lets you use one Docker image to build your software and a different, smaller image to run it. You copy only the final artifacts from the build stage to the runtime stage, leaving behind compilers, build tools, and other things you don't need in production.

A **cache mount** tells Docker to keep a directory (like pip's download cache) between builds, so it doesn't re-download packages that haven't changed.

Here's the training Dockerfile:

```dockerfile title="Dockerfile"
# syntax=docker/dockerfile:1.4
FROM nvidia/cuda:12.6.3-runtime-ubuntu22.04 AS base

# System dependencies (rarely change)
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.11 python3.11-venv python3-pip git curl && \
    rm -rf /var/lib/apt/lists/*

RUN python3.11 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Dependencies (change occasionally)
COPY requirements-train.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements-train.txt

# Training code (changes frequently)
COPY src/ /app/src/
COPY configs/ /app/configs/

WORKDIR /app
ENTRYPOINT ["python", "-m", "src.train"]
```

Notice the layer ordering. Docker builds images in layers, and it caches each layer. If a layer hasn't changed, Docker reuses the cached version instead of rebuilding it. But here's the catch: if one layer changes, Docker rebuilds that layer and every layer after it.

That's why we put things in order of how often they change:

1. **System packages at the top** (they almost never change). Installing `python3.11` and `git` takes time, but you only do it once.
2. **Python dependencies in the middle** (they change when you add or update a library). This layer rebuilds when <VPIcon icon="fas fa-file-lines"/>`requirements-train.txt` changes.
3. **Your actual code at the bottom** (changes on every commit). This is the layer that rebuilds most often.

With this ordering, a code change only rebuilds the final layer, not the entire image. If you put `COPY src/` before `pip install`, every code change would trigger a full reinstall of all Python packages. That's the mistake I see most often in ML Dockerfiles.

The `--mount=type=cache,target=/root/.cache/pip` line on the `pip install` command tells Docker to persist pip's download cache between builds. When you do update requirements, pip checks the cache first and only downloads packages that are new or changed. On a project with hundreds of ML dependencies (PyTorch alone pulls in dozens of sub-packages), this saves five to ten minutes per build.

### Separate Training from Serving Requirements

Your training environment needs libraries that your serving environment does not. Training needs experiment tracking tools like MLflow, data processing libraries like pandas and polars, visualization libraries for debugging, and hyperparameter tuning frameworks. Serving needs a lightweight inference runtime, an API framework like FastAPI, health check endpoints, and minimal overhead.

It's a good idea to maintain separate requirements files:

```plaintext title="requirements-train.txt"
torch==2.5.1
scikit-learn==1.6.1
mlflow==2.19.0
pandas==2.2.3
polars==1.20.0
dvc[s3]==3.59.1
optuna==4.2.0
matplotlib==3.10.0
```

```plaintext title="requirements-serve.txt"
torch==2.5.1
scikit-learn==1.6.1
mlflow==2.19.0
fastapi==0.115.0
uvicorn[standard]==0.34.0
pydantic==2.10.0
```

The overlap is smaller than you'd think. `torch` and `scikit-learn` appear in both because the model needs them for inference. Everything else in the training file is baggage that slows down serving deployments and increases the attack surface.

### CUDA and Driver Compatibility

One thing that will bite you if you ignore it: the CUDA runtime version inside your container must be compatible with the GPU driver version on the host. The rule is that the host driver must be equal to or newer than the CUDA version in the container. For example, CUDA 12.6 requires driver version 560.28+ on Linux.

Make sure you check your host driver version before choosing your base image:

```sh
# On the host machine
nvidia-smi
# Look for "Driver Version: 560.35.03" and "CUDA Version: 12.6"

# The CUDA version shown by nvidia-smi is the maximum CUDA version
# your driver supports, not the version installed
```

If your host driver is 535.x, don't use a `cuda:12.6` base image. Use `cuda:12.2` or upgrade the driver. Mismatched versions produce cryptic errors like `CUDA error: no kernel image is available for execution on the device` that are painful to debug.

Pin your base images to specific tags (not `latest`) and document the minimum driver version in your README. When you deploy to new hardware, the driver version check should be part of your provisioning checklist.

---

## How to Set Up Experiment Tracking with MLflow

If you've ever trained a model and thought "wait, which hyperparameters gave me that good result last week?", you need experiment tracking. Without it, ML development turns into a mess of Jupyter notebooks, screenshots of metrics, and spreadsheets that nobody keeps up to date.

[<VPIcon icon="fas fa-globe"/>MLflow](https://mlflow.org/) is the most widely adopted open-source tool for this. It logs three things for every training run: **parameters** (learning rate, batch size, number of epochs), **metrics** (accuracy, loss, F1 score), and **artifacts** (the trained model file, plots, evaluation reports). It stores all of this in a database and gives you a web UI to compare runs side by side.

Running MLflow as a containerized service means the tracking server is persistent and shared across your team, not running on one person's laptop:

```yaml
services:
  mlflow:
    image: ghcr.io/mlflow/mlflow:v2.19.0
    command: >
      mlflow server
      --backend-store-uri postgresql://mlflow:secret@db/mlflow
      --default-artifact-root /mlflow/artifacts
      --host 0.0.0.0
    ports:
      - "5000:5000"
    volumes:
      - mlflow-artifacts:/mlflow/artifacts
    depends_on:
      db: { condition: service_healthy }

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mlflow
      POSTGRES_USER: mlflow
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mlflow"]
      interval: 5s
      timeout: 2s
      retries: 5
      start_period: 10s
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  mlflow-artifacts:
  postgres-data:
```

Let me break down what's happening here.

The `mlflow` service runs the MLflow tracking server. It stores experiment metadata (parameters, metrics) in a Postgres database and saves artifacts (model files, plots) to a Docker volume.

The `depends_on` with `condition: service_healthy` tells Compose to wait until Postgres is actually ready to accept connections before starting MLflow. Without this, MLflow would crash on startup because the database isn't ready yet.

The `db` service runs Postgres with a health check that uses `pg_isready`, a built-in Postgres utility that checks if the database is accepting connections. The `start_period` gives Postgres 10 seconds to initialize before health checks start counting failures.

Your training code connects to MLflow by setting one environment variable:

```py
import os
import mlflow

# This tells MLflow where to log experiments
# When running inside Docker Compose, "mlflow" resolves to the mlflow container
os.environ["MLFLOW_TRACKING_URI"] = "http://mlflow:5000"

# Example: logging a training run
with mlflow.start_run(run_name="fraud-detector-v2"):
    # Log hyperparameters
    mlflow.log_param("learning_rate", 0.001)
    mlflow.log_param("batch_size", 64)
    mlflow.log_param("epochs", 50)

    # ... train your model here ...

    # Log metrics
    mlflow.log_metric("accuracy", 0.94)
    mlflow.log_metric("f1_score", 0.91)
    mlflow.log_metric("precision", 0.93)
    mlflow.log_metric("recall", 0.89)

    # Log the trained model as an artifact
    mlflow.sklearn.log_model(model, "model")
    # Or for PyTorch: mlflow.pytorch.log_model(model, "model")
```

After the run completes, open `http://localhost:5000` in your browser. You'll see a table of all your runs with their parameters and metrics. Click any run to see details, compare it with other runs, or download the model artifact. No more "I think experiment 7 was the good one" conversations.

A note on the password in the YAML: for local development this is fine. For staging and production, use Docker secrets or inject the credentials from your CI environment. Don't commit real database passwords to your repo.

---

## How to Version Training Data with DVC

Models are reproducible only if you can also reproduce the data they were trained on. This is a problem Git can't solve on its own, because training datasets are often gigabytes or terabytes in size and Git isn't designed for large binary files.

[<VPIcon icon="fas fa-globe"/>DVC (Data Version Control)](https://dvc.org/) fills this gap. It works like Git, but for data. Here's the concept: instead of storing your 10GB training dataset in Git, DVC stores a small text file (a <VPIcon icon="fas fa-file-lines"/>`.dvc` file) that acts as a pointer to the actual data. The real data lives in cloud storage (S3, Google Cloud Storage, Azure Blob). When you check out a specific Git commit, DVC knows which version of the data goes with that commit and can pull it from remote storage.

The workflow on your local machine looks like this:

```sh
# Initialize DVC in your project (one time)
dvc init

# Add your training data to DVC tracking
dvc add data/training_data.parquet
# This creates data/training_data.parquet.dvc (small pointer file)
# and adds training_data.parquet to .gitignore

# Push the actual data to remote storage
dvc push

# Commit the pointer file to Git
git add data/training_data.parquet.dvc .gitignore
git commit -m "Add training data v1"
```

Now your Git repo contains the pointer file, and the real data lives in S3. When someone else (or a container) needs the data, they run `dvc pull` and DVC downloads it from remote storage.

The training Dockerfile includes DVC, and the entrypoint pulls the correct data version before training begins:

```dockerfile title="Dockerilfe"
# syntax=docker/dockerfile:1.4
FROM nvidia/cuda:12.6.3-runtime-ubuntu22.04 AS base

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.11 python3.11-venv python3-pip git curl && \
    rm -rf /var/lib/apt/lists/*

RUN python3.11 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements-train.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements-train.txt

COPY src/ /app/src/
COPY configs/ /app/configs/

# DVC tracking files (these are small text files in Git)
COPY data/*.dvc /app/data/
COPY .dvc/ /app/.dvc/

WORKDIR /app
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
```

The entrypoint script pulls the data and then starts training:

```sh
#!/bin/bash
set -e

echo "Pulling training data from remote storage..."
dvc pull data/

echo "Starting training run..."
python -m src.train "$@"
```

For DVC to pull from S3, the container needs AWS credentials. You can pass them as environment variables in your Compose file or mount them from the host:

```yaml
training:
  build: { context: ., dockerfile: Dockerfile.train }
  environment:
    - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
    - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    - AWS_DEFAULT_REGION=us-east-1
```

Combined with MLflow's experiment logging, you get a complete provenance chain: this model was trained on this version of the data (tracked by DVC), with these parameters (logged in MLflow), producing these metrics.

You can reproduce any past experiment by checking out the Git commit and running the training container.

---

## How to Build the Serving Container

"Serving" means wrapping your trained model in an API so other systems can send it data and get predictions back. For example, a fraud detection model might expose a `/predict` endpoint that accepts transaction data and returns a fraud probability.

The serving container has different priorities than the training container. Training optimizes for flexibility and raw compute. Serving optimizes for speed, small size, and reliability:

```dockerfile title="Dockerfile"
FROM python:3.11-slim AS serving

WORKDIR /app

# Install curl for healthcheck
RUN apt-get update && apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

COPY requirements-serve.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements-serve.txt

COPY src/serving/ /app/src/serving/

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000
CMD ["uvicorn", "src.serving.app:app", "--host", "0.0.0.0"]
```

A few things to understand if you're new to this:

`uvicorn` is a lightweight Python web server that runs [FastAPI](https://fastapi.tiangolo.com/) applications. FastAPI is a framework for building APIs in Python. Together, they let you turn your model into a web service that responds to HTTP requests.

`HEALTHCHECK` tells Docker to periodically check if your container is actually working, not just running. Every 30 seconds, Docker runs the `curl` command against the `/health` endpoint. If it fails three times in a row, Docker marks the container as unhealthy. This matters because your model server might be running but not ready (maybe the model file is still downloading), and you don't want to send traffic to a server that can't respond.

`start-period` of 60 seconds is important for ML serving containers. Model loading can take time, especially for large models (loading a 2GB model from a registry takes a while). Without `start-period`, the health check would start failing immediately, count those failures toward the retry limit, and the orchestrator might kill the container before the model finishes loading. The start period gives the container grace time to initialize.

Notice we're using `python:3.11-slim` here, not the NVIDIA CUDA image. Most trained models can run inference on CPU. If you need GPU inference (for example, running a large language model or doing real-time video processing), use the CUDA base image instead, but be aware that it makes the serving container much larger.

If you want to skip the `curl` dependency, use Python's built-in `urllib` for the health check:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1
```

### Decouple Models from Containers

This is one of the most important patterns in this article, and the one beginners most often get wrong.

The temptation is to copy your trained model file (the `.pkl`, `.pt`, or `.onnx` file that contains the learned weights) directly into the Docker image during the build. Don't do this. When you embed model files in your Docker image, every model update requires a new image build and push. For a 2GB model, that means rebuilding the container, uploading 2GB to a registry, and redeploying, even though only the model changed and the code is identical.

Instead, have your serving container download the model from a model registry (like MLflow) or cloud storage (like S3) at startup. The container image stays small and generic. Model updates become a configuration change (pointing to a new model version) rather than a deployment.

Here's a full serving app using FastAPI with the modern lifespan pattern. If you've used Flask, FastAPI is similar but faster and with built-in request validation:

```py :collapsed-lines
import os
from contextlib import asynccontextmanager

import mlflow
from fastapi import FastAPI

# MODEL_URI points to a specific model version in MLflow's registry
# Format: "models:/<model-name>/<stage>" where stage is Staging or Production
MODEL_URI = os.environ.get("MODEL_URI", "models:/fraud-detector/production")
model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # This runs once when the server starts up
    global model
    print(f"Loading model from {MODEL_URI}...")
    model = mlflow.pyfunc.load_model(MODEL_URI)
    print("Model loaded successfully.")
    yield
    # This runs when the server shuts down
    print("Shutting down model server.")


app = FastAPI(lifespan=lifespan)


@app.get("/health")
async def health():
    """Used by Docker HEALTHCHECK to verify the server is ready."""
    if model is None:
        return {"status": "loading"}, 503
    return {"status": "healthy"}


@app.post("/predict")
async def predict(features: dict):
    """Accept features as JSON, return model prediction."""
    import pandas as pd

    # Convert the input dict into a DataFrame (what most sklearn/mlflow models expect)
    df = pd.DataFrame([features])
    prediction = model.predict(df)
    return {"prediction": prediction.tolist()}
```

When a client sends a POST request to `/predict` with JSON like `{"amount": 500, "merchant_category": "electronics", "hour": 23}`, the model returns a prediction. The `/health` endpoint returns 503 while the model is loading and 200 once it's ready, which is exactly what the Docker `HEALTHCHECK` checks for.

Promoting a new model version means updating the `MODEL_URI` environment variable and restarting the container. The MLflow model registry supports stage transitions (Staging, Production, Archived), so you can promote a model in the MLflow UI and then point your serving container at the new version.

For zero-downtime model updates, implement a reload endpoint that swaps models without restarting:

```py
@app.post("/admin/reload")
async def reload_model():
    global model
    model = mlflow.pyfunc.load_model(MODEL_URI)
    return {"status": "reloaded"}
```

---

## How to Configure GPU Passthrough for Training

By default, Docker containers can't see the GPU hardware on the host machine. "GPU passthrough" means giving a container access to the host's GPUs so that libraries like PyTorch and TensorFlow can use them for accelerated computation.

This requires two things on the host (the machine running Docker, not inside the container):

1. **NVIDIA GPU drivers** installed and working. Verify with `nvidia-smi`. If that command shows your GPUs, you're good.
2. **NVIDIA Container Toolkit** installed. This is the bridge between Docker and the GPU drivers. Install it from the [<VPIcon icon="iconfont icon-nvidia"/>NVIDIA docs](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) and verify with `docker run --rm --gpus all nvidia/cuda:12.6.3-base-ubuntu22.04 nvidia-smi`. If you see your GPU listed, the toolkit is working.

Once the host is set up, GPU access in Docker Compose looks like this:

```yaml
services:
  training:
    build: { context: ., dockerfile: Dockerfile.train }
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    volumes:
      - ./data:/app/data
    environment:
      - MLFLOW_TRACKING_URI=http://mlflow:5000
```

The `deploy.resources.reservations.devices` block is saying: "this container needs all available NVIDIA GPUs." Inside the container, PyTorch and TensorFlow will see the GPUs and use them automatically. You can verify by adding `print(torch.cuda.is_available())` to your training script, which should print `True`.

If you're running Compose v2.30.0+, you can use the shorter `gpus` syntax:

```yaml
services:
  training:
    build: { context: ., dockerfile: Dockerfile.train }
    gpus: all
    volumes:
      - ./data:/app/data
    environment:
      - MLFLOW_TRACKING_URI=http://mlflow:5000
```

For multi-GPU training with frameworks like PyTorch's DistributedDataParallel, you can assign specific GPUs using `device_ids`. This matters when running multiple training jobs at the same time:

```yaml
services:
  training-job-1:
    build: { context: ., dockerfile: Dockerfile.train }
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ["0", "1"]
              capabilities: [gpu]
    environment:
      - CUDA_VISIBLE_DEVICES=0,1

  training-job-2:
    build: { context: ., dockerfile: Dockerfile.train }
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ["2", "3"]
              capabilities: [gpu]
    environment:
      - CUDA_VISIBLE_DEVICES=0,1
```

Note that `CUDA_VISIBLE_DEVICES` inside the container is relative to the devices assigned by Docker, not the host GPU indices. Both containers see their GPUs as device 0 and 1, even though they're using different physical GPUs.

---

## How to Tie It All Together with Compose Profiles

If you're new to Compose profiles: by default, `docker compose up` starts every service defined in your <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml`. But you don't always want everything running. Your MLflow server and serving API should run all the time, but the training container should only launch when you're actually training a model (and it needs a GPU, which you might not have on your laptop).

Profiles solve this. When you add `profiles: ["train"]` to a service, that service is excluded from `docker compose up` by default. It only starts when you explicitly activate the profile with `docker compose --profile train`. This means one file defines your entire ML infrastructure, but you control what runs and when.

Here's the complete <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` that ties every piece from this article together:

```yaml :collapsed-lines title="docker-compose.yml"
services:
  # --- Always-on infrastructure ---
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mlflow
      POSTGRES_USER: mlflow
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mlflow"]
      interval: 5s
      timeout: 2s
      retries: 5
      start_period: 10s
    volumes:
      - postgres-data:/var/lib/postgresql/data

  mlflow:
    image: ghcr.io/mlflow/mlflow:v2.19.0
    command: >
      mlflow server
      --backend-store-uri postgresql://mlflow:secret@db/mlflow
      --default-artifact-root /mlflow/artifacts
      --host 0.0.0.0
    ports:
      - "5000:5000"
    volumes:
      - mlflow-artifacts:/mlflow/artifacts
    depends_on:
      db: { condition: service_healthy }

  serving:
    build: { context: ., dockerfile: Dockerfile.serve }
    ports:
      - "8000:8000"
    environment:
      - MODEL_URI=models:/fraud-detector/production
      - MLFLOW_TRACKING_URI=http://mlflow:5000
    depends_on:
      mlflow: { condition: service_started }

  # --- Training (on-demand) ---
  training:
    build: { context: ., dockerfile: Dockerfile.train }
    profiles: ["train"]
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    volumes:
      - ./data:/app/data
      - ./configs:/app/configs
    environment:
      - MLFLOW_TRACKING_URI=http://mlflow:5000
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    depends_on:
      mlflow: { condition: service_started }

volumes:
  postgres-data:
  mlflow-artifacts:
```

The day-to-day workflow with this file:

```sh
# Step 1: Start the infrastructure (MLflow + Postgres + serving API)
# The -d flag runs everything in the background
docker compose up -d

# Step 2: Open the MLflow UI to see past experiments
open http://localhost:5000    # macOS
# xdg-open http://localhost:5000  # Linux

# Step 3: Check that the serving API is healthy
curl http://localhost:8000/health
# Should return: {"status":"healthy"}

# Step 4: Run a training job (pulls data via DVC, logs to MLflow)
# This only starts the "training" service because of the profile flag
docker compose --profile train run training

# Step 5: Watch training progress in the MLflow UI at localhost:5000
# You'll see metrics updating in real time if your training code logs them

# Step 6: After training completes, promote the model in MLflow UI
# Click the model, go to "Register Model", set stage to "Production"

# Step 7: Restart the serving container to pick up the new model version
docker compose restart serving

# Step 8: Test the new model
curl -X POST http://localhost:8000/predict \
-H "Content-Type: application/json" \
-d '{"amount": 500, "merchant_category": "electronics", "hour": 23}'
```

This single-file approach means a new team member can clone the repo, run `docker compose up -d`, and have the complete ML infrastructure running locally within minutes. The same containers deploy to staging and production with only environment variable changes (database credentials, model URIs, GPU allocation).

---

## Reproducibility: The Whole Point

Everything in this article serves one goal: reproducibility. The ability to take any commit hash, build the same containers, pull the same data, and produce the same model.

Here are the practices that make this work:

### Pin Everything

Pin your base images to specific digests, not just tags. Pin your Python packages to exact versions with `pip freeze > requirements.txt`. Use fixed random seeds in your training code and log them in MLflow.

### Log Everything

Every training run should log the exact library versions (`pip freeze`), the Git commit hash, the DVC data version, all hyperparameters, and all evaluation metrics to MLflow. You can automate this:

```py
import subprocess
import mlflow

with mlflow.start_run():
    # Log environment info automatically
    pip_freeze = subprocess.check_output(["pip", "freeze"]).decode()
    mlflow.log_text(pip_freeze, "pip_freeze.txt")

    git_hash = subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip()
    mlflow.log_param("git_commit", git_hash)

    # ... rest of training ...
```

### Version Everything

Git for code, DVC for data, MLflow for experiments, Docker digests for environments. The combination creates a complete provenance chain. When a stakeholder asks why a model made a particular prediction, you can trace it back to the exact code, data, and hyperparameters that produced it. For regulated industries like finance and healthcare, that traceability is a compliance requirement, not a nice-to-have.

---

## Where This Breaks Down

This approach works well for small-to-medium teams running on single hosts or small clusters. Here's where you'll hit walls:

### Large datasets

Don't mount multi-terabyte datasets into containers. Use object storage (S3, GCS) and stream data during training. DVC handles the versioning, but the data itself should live outside Docker entirely.

### GPU driver mismatches

Your container's CUDA version must be compatible with the host driver. Test on identical hardware and driver versions to what you'll run in production. Document the minimum driver version in your README.

### Multi-node training

When you need to distribute training across multiple machines, you'll outgrow Compose. Kubernetes with Kubeflow or KServe is the standard path for distributed training and auto-scaled serving.

### Serving at scale

A single container running uvicorn handles moderate traffic. For high-throughput inference, you'll need a load balancer, multiple replicas, and potentially a dedicated serving framework like NVIDIA Triton Inference Server or TensorFlow Serving. Compose can run multiple replicas with `docker compose up --scale serving=3`, but it doesn't give you the routing, health-based load balancing, or rolling updates that a real orchestrator provides.

### Secrets in production

The Compose file above uses plaintext passwords for local development. In production, use Docker secrets, HashiCorp Vault, or your cloud provider's secret manager. Never commit credentials to your repo.

---

## Conclusion

Containerizing your MLOps pipeline turns fragile, environment-dependent models into reproducible, deployable artifacts. Multi-stage builds keep images lean. MLflow gives you experiment tracking and model lineage. DVC links code to data. GPU passthrough preserves training performance. A single Compose file with profiles ties the whole workflow together.

That fraud detection model I mentioned at the start? We eventually containerized the entire pipeline around it. The next model we shipped went from "notebook finished" to "running in production" in two days instead of three weeks. Most of that time was spent on evaluation and review, not fighting environments.

Containerization doesn't make your models better. It gets the infrastructure out of the way so you can focus on the work that does.

But even with these caveats, containerized MLOps eliminates the most common source of ML project delays: environment mismatch between development and production. The three weeks we spent debugging that fraud detection model deployment? That doesn't happen anymore.

If you found this useful, you can find me writing about MLOps, containerized workflows, and production AI systems on my blog.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Containerize Your MLOps Pipeline from Training to Serving",
  "desc": "Last year, our ML team shipped a fraud detection model that worked perfectly in a Jupyter notebook. Precision was excellent. Recall numbers looked great. Everyone was excited – until we tried to deplo",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/containerize-mlops-pipeline-from-training-to-serving.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
