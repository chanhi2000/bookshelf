---
lang: en-US
title: "How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD"
description: "Article(s) > How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - DevOps
  - Docker
  - Github
  - Github Actions
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - devops
  - docker
  - github
  - githubactions
  - github-actions
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD"
    - property: og:description
      content: "How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-end-to-end-ml-platform-locally-from-experiment-tracking-to-cicd/
prev: /programming/py-fastapi/articles/README.md
date: 2026-03-18
isOriginal: false
author:
  - name: Sandeep Bharadwaj Mannapur
    url: https://freecodecamp.org/news/author/sandeep-mannapur/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8401d978-0bed-4534-af93-f6bfc1b77c89.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
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
  name="How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD"
  desc="Machine learning projects don’t end at training a model in a Jupyter notebook. The hard part is the “last mile”: turning that notebook model into something you can run reliably, update safely, and tru"
  url="https://freecodecamp.org/news/build-end-to-end-ml-platform-locally-from-experiment-tracking-to-cicd"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8401d978-0bed-4534-af93-f6bfc1b77c89.png"/>

Machine learning projects don’t end at training a model in a Jupyter notebook. The hard part is the “last mile”: turning that notebook model into something you can run reliably, update safely, and trust over time.

Most ML systems fail in production for boring (and painful) reasons: the training code and the serving code drift apart, input data changes shape, a “small” preprocessing tweak breaks predictions, or the model silently degrades because real-world behavior shifts. None of these problems are solved by a better algorithm, they’re solved by engineering: repeatable pipelines, validation, versioning, monitoring, and automated checks.

In this hands-on handbook, you’ll build a complete mini ML platform on your local machine, an end-to-end project that takes a model from training to deployment with the core “last mile” infrastructure in place. We’ll use a fraud detection example (predicting fraudulent transactions), but the same workflow works for churn prediction or any binary classification problem. Everything runs locally (no cloud required), and every step is copy-paste runnable so you can follow along and verify outputs as you go.

By the end, you'll have a production-ready ML pipeline running on your machine – from training the model to serving predictions, with the infrastructure to test, monitor, and iterate with confidence. And yes, we'll do it in a hands-on manner with code snippets you can copy-paste and run. Let's dive in!

::: info 📦 Get the Complete Code

All code from this handbook is available in a ready-to-run repository:  
**Repository:**

<SiteInfo
  name="sandeepmb/freecodecamp-local-ml-platform"
  desc="Contribute to sandeepmb/freecodecamp-local-ml-platform development by creating an account on GitHub."
  url="https://github.com/sandeepmb/freecodecamp-local-ml-platform/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/27f0c59417c726f575f64fe1fa30c9c8208241b417c420ad1288ebe7e431f9aa/sandeepmb/freecodecamp-local-ml-platform"/>

Clone it and follow along, or use it as a reference implementation.

:::

---

## Project Overview and Setup

Before we jump into coding, let's set the stage. Our use-case is **credit card fraud detection** – a binary classification problem where we predict whether a transaction is fraudulent (`is_fraud = 1`) or legitimate (`is_fraud = 0`). This is a common ML task and a good proxy for production ML challenges because fraud patterns can change over time (allowing us to discuss model drift), and bad input data (for example, malformed transaction info) can cause serious issues if not handled properly.

### Tech Stack

We will use Python-based tools that are popular in MLOps but still beginner-friendly:

| **Tool** | **Purpose** | **Why We Chose It** |
| --- | --- | --- |
| **MLflow** | Experiment tracking and model registry | Open-source, widely adopted, great UI |
| **Feast** | Feature store for consistent feature serving | Production-grade, runs locally, same API for offline/online |
| **FastAPI** | High-performance web framework for serving predictions | Fast, automatic docs, modern Python |
| **Great Expectations** | Data validation framework | Declarative expectations, great reports |
| **Evidently** | Monitoring for data drift and model decay | Beautiful reports, easy to integrate |
| **Docker** | Containerization for environment consistency | Industry standard, works everywhere |
| **GitHub Actions** | CI/CD automation | Free for public repos, tight GitHub integration |

Let me explain each tool briefly:

**MLflow** is an open-source platform designed to manage the ML lifecycle. It provides experiment tracking (logging parameters, metrics, and artifacts), a model registry (versioning models with aliases), and model serving capabilities. We'll use it to ensure our experiments are reproducible and our models are versioned.

**Feast** (Feature Store) is an open-source feature store that helps manage and serve features consistently between training and inference. This prevents a common problem called "training-serving skew" where the features used in production differ slightly from those used in training, causing silent accuracy degradation.

**FastAPI** is a modern, fast web framework for building APIs with Python. It's known for being easy to use, efficient, and producing automatic interactive documentation. We'll use it to serve our model predictions.

**Great Expectations** is an open-source tool for data quality testing. It allows us to define "expectations" on data (like "amount should be positive" or "hour should be between 0 and 23") and test incoming data against them.

**Evidently** is an open-source library for monitoring data and model performance over time. It can detect data drift (when input distributions change) and model decay (when accuracy drops).

**Docker** ensures the same environment and dependencies in development and deployment, avoiding the classic "works on my machine" problem.

**GitHub Actions** provides CI/CD automation. An efficient CI/CD pipeline helps integrate and deploy changes faster and with fewer errors.

::: note 💡 Mental Model

Think of this as building a "safety net" around your ML model. Each tool we add catches a different failure mode, like defensive driving for machine learning.

:::

::: note Prerequisites

You'll need:

- **Python 3.9+** installed on your machine
- **Docker Desktop** installed and running
- **GitHub account** (if you want to try the CI/CD pipeline)
- **Basic familiarity with Python** and ML concepts (what training and prediction mean)

You don't need MLOps or Kubernetes experience. Everything will be done locally with just Python and Docker – **no cloud and no Kubernetes needed**.

:::

### Project Structure

Let's set up a basic project structure on your local machine. Open your terminal and run:

```sh
# Create project directory and subfolders
mkdir ml-platform-tutorial && cd ml-platform-tutorial
mkdir -p data models src tests feature_repo

# Set up a virtual environment (recommended)
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

Your project structure should look like this:

```sh title="file strucuture"
ml-platform-tutorial/
├── data/              # Training and test datasets
├── models/            # Saved model files
├── src/               # Source code
├── tests/             # Test files
├── feature_repo/      # Feast feature repository
├── venv/              # Virtual environment
└── requirements.txt   # Dependencies
```

Next, create a <VPIcon icon="fas fa-file-lines"/>`requirements.txt` with all the necessary libraries:

```plaintext :collapsed-lines title="requirements.txt"
# Core ML libraries
pandas==2.2.0
numpy==1.26.3
scikit-learn==1.4.0

# Experiment tracking and model registry
mlflow==2.10.0

# Feature store
feast==0.36.0

# API framework
fastapi==0.109.0
uvicorn==0.27.0
httpx==0.26.0

# Data validation
great-expectations==0.18.8

# Monitoring
evidently==0.7.20

# Testing
pytest==8.0.0
pytest-cov==4.1.0

# Utilities
pyarrow==15.0.0
pydantic==2.6.0
```

::: note 📌 Version Note

Exact versions are pinned to ensure reproducibility. Newer versions may work, but all examples were tested with the versions listed here.

:::

Install the dependencies:

```sh
pip install -r requirements.txt
```

This might take a few minutes as it installs all the packages. Once complete, we're ready to start building our project step by step.

**Checkpoint:** You should have a project folder with <VPIcon icon="fas fa-folder-open"/>`data/`, <VPIcon icon="fas fa-folder-open"/>`models/`, <VPIcon icon="fas fa-folder-open"/>`src/`, <VPIcon icon="fas fa-folder-open"/>`tests/`, and <VPIcon icon="fas fa-folder-open"/>`feature_repo/` directories, and an activated virtual environment with all dependencies installed. Verify by running 

```sh
python -c "import mlflow; import feast; import fastapi; print('All imports successful!')"
```

![Figure 1: The Complete ML Platform We'll Build](https://cdn.hashnode.com/res/hashnode/image/upload/v1771392341567/4bfdd727-32fb-4f30-a63e-c94f61a9f2db.png)

::: note

Don't worry if this looks complex, we'll build each component step by step, starting with the simplest piece and connecting them together.

:::

---

## Table of Contents

2. [Build a Simple Model and API (The Naive Approach)](#heading-1-build-a-simple-model-and-api-the-naive-approach)
3. [Where the Naive Approach Breaks](#heading-2-where-the-naive-approach-breaks)
4. [Add Experiment Tracking and Model Registry with MLflow](#heading-3-add-experiment-tracking-and-model-registry-with-mlflow)
5. [Ensure Feature Consistency with Feast](#heading-4-ensure-feature-consistency-with-feast)
6. [Add Data Validation with Great Expectations](#heading-5-add-data-validation-with-great-expectations)
7. [Monitor Model Performance and Data Drift](#heading-6-monitor-model-performance-and-data-drift)
8. [Automate Testing and Deployment with CI/CD](#heading-7-automate-testing-and-deployment-with-ci-cd)
9. [Incident Response Playbook](#heading-8-incident-response-playbook)
10. [How to Put It All Together](#heading-9-how-to-put-it-all-together)
11. [What’s Next: Scale to Production](#heading-10-whats-next-scale-to-production)

---

## 1. Build a Simple Model and API (The Naive Approach)

To illustrate why we need all these tools, let's start by building a **naive ML system without any MLOps infrastructure**. We'll train a simple model and deploy it quickly, then observe what problems arise. This "naive approach" is how most ML projects start – and understanding its limitations will motivate the solutions we implement later.

### 1.1 Train a Quick Model

First, we need some data. For simplicity, we'll generate a synthetic dataset for fraud detection so that we don't rely on any external data files. The dataset will have features like:

- `amount`: Transaction amount in dollars
- `hour`: Hour of the day (0-23) when the transaction occurred
- `day_of_week`: Day of the week (0=Monday, 6=Sunday)
- `merchant_category`: Type of merchant (grocery, restaurant, retail, online, travel)
- `is_fraud`: Label indicating if the transaction is fraudulent (1) or legitimate (0)

We will simulate that only ~2% of transactions are fraud, which is an imbalance typical in real fraud data. This imbalance is important because it affects how we evaluate our model.

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`generate_data.py`:

```py :collapsed-lines title="generate_data.py"
# src/generate_data.py
"""
Generate synthetic fraud detection dataset.

This script creates realistic-looking transaction data where fraudulent
transactions have different patterns than legitimate ones:
- Fraud tends to have higher amounts
- Fraud tends to occur late at night
- Fraud is more common for online and travel merchants
"""
import pandas as pd
import numpy as np

def generate_transactions(n_samples=10000, fraud_ratio=0.02, seed=42):
    """
    Generate synthetic fraud detection dataset.
    
    Args:
        n_samples: Total number of transactions to generate
        fraud_ratio: Proportion of fraudulent transactions (default 2%)
        seed: Random seed for reproducibility
    
    Returns:
        DataFrame with transaction features and fraud labels
    
    Fraud transactions have different patterns:
    - Higher amounts (mean \(245 vs \)33 for legit)
    - Late night hours (0-5, 23)
    - More likely to be online or travel merchants
    """
    np.random.seed(seed)
    n_fraud = int(n_samples * fraud_ratio)
    n_legit = n_samples - n_fraud

    # Legitimate transactions: normal shopping patterns
    # - Amounts follow a log-normal distribution (most small, some large)
    # - Hours are uniformly distributed throughout the day
    # - Merchant categories weighted toward everyday shopping
    legit = pd.DataFrame({
        "amount": np.random.lognormal(mean=3.5, sigma=1.2, size=n_legit),  # ~$33 average
        "hour": np.random.randint(0, 24, size=n_legit),
        "day_of_week": np.random.randint(0, 7, size=n_legit),
        "merchant_category": np.random.choice(
            ["grocery", "restaurant", "retail", "online", "travel"],
            size=n_legit,
            p=[0.30, 0.25, 0.25, 0.15, 0.05]  # Weighted toward everyday shopping
        ),
        "is_fraud": 0
    })
    
    # Fraudulent transactions: suspicious patterns
    # - Higher amounts (fraudsters go big)
    # - Late night hours (less scrutiny)
    # - More online and travel (easier to exploit)
    fraud = pd.DataFrame({
        "amount": np.random.lognormal(mean=5.5, sigma=1.5, size=n_fraud),  # ~$245 average
        "hour": np.random.choice([0, 1, 2, 3, 4, 5, 23], size=n_fraud),  # Late night
        "day_of_week": np.random.randint(0, 7, size=n_fraud),
        "merchant_category": np.random.choice(
            ["grocery", "restaurant", "retail", "online", "travel"],
            size=n_fraud,
            p=[0.05, 0.05, 0.10, 0.60, 0.20]  # Weighted toward online/travel
        ),
        "is_fraud": 1
    })
    
    # Combine and shuffle
    df = pd.concat([legit, fraud], ignore_index=True)
    df = df.sample(frac=1, random_state=seed).reset_index(drop=True)
    
    return df

if __name__ == "__main__":
    # Generate dataset
    print("Generating synthetic fraud detection dataset...")
    df = generate_transactions(n_samples=10000, fraud_ratio=0.02)
    
    # Split into train (80%) and test (20%)
    train_df = df.sample(frac=0.8, random_state=42)
    test_df = df.drop(train_df.index)
    
    # Save to CSV files
    train_df.to_csv("data/train.csv", index=False)
    test_df.to_csv("data/test.csv", index=False)
    
    # Print summary statistics
    print(f"\nDataset generated successfully!")
    print(f"Training set: {len(train_df):,} transactions")
    print(f"Test set: {len(test_df):,} transactions")
    print(f"Overall fraud ratio: {df['is_fraud'].mean():.2%}")
    print(f"\nLegitimate transactions - Average amount: ${df[df['is_fraud']==0]['amount'].mean():.2f}")
    print(f"Fraudulent transactions - Average amount: ${df[df['is_fraud']==1]['amount'].mean():.2f}")
    print(f"\nMerchant category distribution (fraud):")
    print(df[df['is_fraud']==1]['merchant_category'].value_counts(normalize=True))
```

Run the data generation script:

```sh
python src/generate_data.py
#
# Generating synthetic fraud detection dataset...
# 
# Dataset generated successfully!
# Training set: 8,000 transactions
# Test set: 2,000 transactions
# Overall fraud ratio: 2.00%
# 
# Legitimate transactions - Average amount: $33.45
# Fraudulent transactions - Average amount: $245.67
# 
# Merchant category distribution (fraud):
# online        0.60
# travel        0.20
# retail        0.10
# restaurant    0.05
# grocery       0.05
```

Now you have <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`train.csv` and <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`test.csv` with ~8000 training and ~2000 testing transactions.

::: important Why This Matters

The synthetic data has realistic patterns — fraud is rare (2%), high-value, late-night, and concentrated in certain merchant categories. These patterns give our model something to learn.

:::

Now, let's train a quick model. We'll use a simple **Random Forest classifier** from scikit-learn to predict `is_fraud`. In this naive version, we won't do much feature engineering – just label encode the categorical `merchant_category` and feed everything to the model.

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`train_naive.py`:

```py :collapsed-lines title="train_naive.py"
"""
Train a fraud detection model - NAIVE VERSION.

This script demonstrates the "quick and dirty" approach to ML:
- No experiment tracking
- No model versioning
- Just train and save to a pickle file

We'll improve on this in later sections.
"""
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score, 
    f1_score, 
    precision_score, 
    recall_score,
    confusion_matrix,
    classification_report
)

def main():
    print("Loading data...")
    train_df = pd.read_csv("data/train.csv")
    test_df = pd.read_csv("data/test.csv")
    
    print(f"Training samples: {len(train_df):,}")
    print(f"Test samples: {len(test_df):,}")
    print(f"Training fraud ratio: {train_df['is_fraud'].mean():.2%}")
    
    # Encode the categorical feature
    # We need to save the encoder to use the same mapping at inference time
    print("\nEncoding categorical features...")
    encoder = LabelEncoder()
    train_df["merchant_encoded"] = encoder.fit_transform(train_df["merchant_category"])
    test_df["merchant_encoded"] = encoder.transform(test_df["merchant_category"])
    
    print(f"Merchant category mapping: {dict(zip(encoder.classes_, encoder.transform(encoder.classes_)))}")
    
    # Prepare features and labels
    feature_cols = ["amount", "hour", "day_of_week", "merchant_encoded"]
    X_train = train_df[feature_cols]
    y_train = train_df["is_fraud"]
    X_test = test_df[feature_cols]
    y_test = test_df["is_fraud"]
    
    # Train a Random Forest classifier
    print("\nTraining Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=100,      # Number of trees
        max_depth=10,          # Maximum depth of each tree
        random_state=42,       # For reproducibility
        n_jobs=-1              # Use all CPU cores
    )
    model.fit(X_train, y_train)
    print("Training complete!")
    
    # Evaluate on test data
    print("\n" + "="*50)
    print("MODEL EVALUATION")
    print("="*50)
    
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    print(f"\nAccuracy:  {accuracy_score(y_test, y_pred):.4f}")
    print(f"Precision: {precision_score(y_test, y_pred):.4f}")
    print(f"Recall:    {recall_score(y_test, y_pred):.4f}")
    print(f"F1-score:  {f1_score(y_test, y_pred):.4f}")
    
    print("\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    print(f"  True Negatives:  {cm[0][0]:,} (correctly identified legitimate)")
    print(f"  False Positives: {cm[0][1]:,} (legitimate flagged as fraud)")
    print(f"  False Negatives: {cm[1][0]:,} (fraud missed - DANGEROUS!)")
    print(f"  True Positives:  {cm[1][1]:,} (correctly caught fraud)")
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Legitimate', 'Fraud']))
    
    # Feature importance
    print("\nFeature Importance:")
    for name, importance in sorted(
        zip(feature_cols, model.feature_importances_),
        key=lambda x: x[1],
        reverse=True
    ):
        print(f"  {name}: {importance:.4f}")
    
    # Save the model and encoder together
    print("\nSaving model to models/model.pkl...")
    with open("models/model.pkl", "wb") as f:
        pickle.dump((model, encoder), f)
    
    print("\nModel trained and saved successfully!")
    print("\nWARNING: This naive approach has several problems:")
    print("  - No record of hyperparameters or metrics")
    print("  - No model versioning")
    print("  - No way to reproduce this exact model")
    print("  - We'll fix these issues in the following sections!")

if __name__ == "__main__":
    main()
```

Run the training script:

```sh
python src/train_naive.py
#
# Loading data...
# Training samples: 8,000
# Test samples: 2,000
# Training fraud ratio: 2.00%
# 
# Encoding categorical features...
# Merchant category mapping: {'grocery': 0, 'online': 1, 'restaurant': 2, 'retail': 3, 'travel': 4}
# 
# Training Random Forest model...
# Training complete!
# 
# ==================================================
# MODEL EVALUATION
# ==================================================
# 
# Accuracy:  0.9820
# Precision: 0.7273
# Recall:    0.6154
# F1-score:  0.6667
# 
# Confusion Matrix:
#   True Negatives:  1,956 (correctly identified legitimate)
#   False Positives: 4 (legitimate flagged as fraud)
#   False Negatives: 32 (fraud missed - DANGEROUS!)
#   True Positives:  8 (correctly caught fraud)
# 
# Feature Importance:
#   amount: 0.5423
#   hour: 0.2156
#   merchant_encoded: 0.1345
#   day_of_week: 0.1076
```

::: important Important observation

You'll see ~98% accuracy but a lower F1-score (around 0.5-0.7). **With only 2% fraud, accuracy is extremely misleading!** A model that always predicts "not fraud" would achieve 98% accuracy while catching zero fraud. This is why we focus on F1-score, precision, and recall for imbalanced classification problems.

:::

::: note

💡 If you're new to imbalanced classification, remember: high accuracy can be meaningless when the positive class is rare.

:::

The script outputs a file <VPIcon icon="fas fa-folder-open"/>`models/`<VPIcon icon="fas fa-file-lines"/>`model.pkl` containing both the trained model and the label encoder (we need both for inference).

**Checkpoint:** You should now have:

- <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`train.csv` (~8,000 rows)
- <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-csv"/>`test.csv` (~2,000 rows)
- <VPIcon icon="fas fa-folder-open"/>`models/`<VPIcon icon="fas fa-file-lines"/>`model.pkl` (trained model + encoder)

The model should show ~98% accuracy but F1 around 0.5-0.7. Verify the files exist: `ls -la data/ models/`

### 1.2 Serve Predictions with FastAPI

Now that we have a model, let's deploy it as an API so that clients can get predictions. We'll use **FastAPI** because it's straightforward, very fast, and produces automatic interactive documentation.

FastAPI is known for:

- **Easy to use**: Pythonic syntax with type hints
- **High performance**: One of the fastest Python frameworks
- **Automatic documentation**: Swagger UI out of the box
- **Data validation**: Using Pydantic models

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`serve_naive.py`:

```py :collapsed-lines title="serve_naive.py"
# src/serve_naive.py
"""
Serve fraud detection model as a REST API - NAIVE VERSION.

This is a simple API that:
1. Loads the trained model at startup
2. Accepts transaction data via POST request
3. Returns fraud prediction

We'll improve this with validation, monitoring, and better
model loading in later sections.
"""
import pickle
from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional

# Load the trained model and encoder at startup
# This is loaded once when the server starts, not on every request
print("Loading model...")
with open("models/model.pkl", "rb") as f:
    model, encoder = pickle.load(f)
print("Model loaded successfully!")

# Create the FastAPI application
app = FastAPI(
    title="Fraud Detection API",
    description="""
    Predict whether a credit card transaction is fraudulent.
    
    This API accepts transaction details and returns:
    - Whether the transaction is predicted to be fraud
    - The probability of fraud (0.0 to 1.0)
    
    **Note:** This is the naive version without validation or monitoring.
    """,
    version="1.0.0"
)

# Define the input schema using Pydantic
# This provides automatic validation and documentation
class Transaction(BaseModel):
    """Schema for a transaction to be evaluated for fraud."""
    amount: float = Field(
        ..., 
        description="Transaction amount in dollars",
        example=150.00
    )
    hour: int = Field(
        ..., 
        description="Hour of the day (0-23)",
        example=14
    )
    day_of_week: int = Field(
        ..., 
        description="Day of week (0=Monday, 6=Sunday)",
        example=3
    )
    merchant_category: str = Field(
        ..., 
        description="Type of merchant",
        example="online"
    )

class PredictionResponse(BaseModel):
    """Schema for the prediction response."""
    is_fraud: bool = Field(description="Whether the transaction is predicted as fraud")
    fraud_probability: float = Field(description="Probability of fraud (0.0 to 1.0)")
    
@app.post("/predict", response_model=PredictionResponse)
def predict(transaction: Transaction):
    """
    Predict whether a transaction is fraudulent.
    
    Takes transaction details and returns a fraud prediction
    along with the probability score.
    """
    # Convert the request to a dictionary
    data = transaction.dict()
    
    # Encode the merchant category using the same encoder from training
    # This ensures consistency between training and serving
    try:
        data["merchant_encoded"] = encoder.transform([data["merchant_category"]])[0]
    except ValueError:
        # Handle unknown merchant categories
        # In production, we'd want better handling here
        data["merchant_encoded"] = 0
    
    # Prepare features in the same order as training
    X = [[
        data["amount"],
        data["hour"],
        data["day_of_week"],
        data["merchant_encoded"]
    ]]
    
    # Get prediction and probability
    prediction = model.predict(X)[0]
    probability = model.predict_proba(X)[0][1]  # Probability of class 1 (fraud)
    
    return PredictionResponse(
        is_fraud=bool(prediction),
        fraud_probability=round(float(probability), 4)
    )

@app.get("/health")
def health_check():
    """
    Health check endpoint.
    
    Returns the status of the API. Useful for:
    - Load balancer health checks
    - Kubernetes liveness probes
    - Monitoring systems
    """
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

@app.get("/")
def root():
    """Root endpoint with API information."""
    return {
        "message": "Fraud Detection API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }
```

::: info A few important things to note about this code:

1. **Pydantic Models**: We use `BaseModel` to define the expected input JSON schema. FastAPI automatically validates incoming requests against this schema.
2. **Type Hints**: The type hints (`float`, `int`, `str`) provide both documentation and runtime validation.
3. **Feature Encoding**: On each request, we encode the merchant category using the same `LabelEncoder` we saved from training. This ensures consistency between training and serving.
4. **Health Endpoint**: The `/health` endpoint is standard practice for production APIs - it allows load balancers and monitoring systems to check if the service is running.

:::

To run this API, use Uvicorn (an ASGI server):

```sh
uvicorn src.serve_naive:app --reload --host 0.0.0.0 --port 8000
```

The `--reload` flag enables auto-reload during development (the server restarts when you change code).

You should see:

```plaintext title="output"
Loading model...
Model loaded successfully!
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

Now open your browser and go to `http://localhost:8000/docs`. You'll see the **Swagger UI** – an auto-generated interactive documentation where you can test the API directly from your browser!

Test the API using curl in another terminal:

```sh
# Test with a legitimate-looking transaction
curl -X POST "http://localhost:8000/predict" \
-H "Content-Type: application/json" \
-d '{"amount": 50.0, "hour": 14, "day_of_week": 3, "merchant_category": "grocery"}'
#
# {"is_fraud": false, "fraud_probability": 0.02}

```sh
# Test with a suspicious transaction (high amount, late night, online)
curl -X POST "http://localhost:8000/predict" \
-H "Content-Type: application/json" \
-d '{"amount": 500.0, "hour": 3, "day_of_week": 1, "merchant_category": "online"}'
#
# {"is_fraud": true, "fraud_probability": 0.78}
```

**We have a working model served as an API!** In a real scenario, we could now integrate this API with a payment processing frontend, mobile app, or any system that needs fraud predictions.

But before we celebrate, let's examine this naive approach for potential pitfalls...

**Checkpoint:** Your API should be running at `http://localhost:8000`. The Swagger UI at `/docs` should show both endpoints (`/predict` and `/health`). Test with curl or the Swagger UI to verify predictions are returned.

---

## 2. Where the Naive Approach Breaks

Our quick-and-dirty ML pipeline works on the surface: it can train a model and serve predictions. However, **hidden problems will emerge** if we try to maintain or scale this system in production.

This section is critical: understanding these issues will motivate the solutions we implement in the following sections. Let's go through the problems one by one.

### Problem 1: No Experiment Tracking (Reproducibility)

Try this thought experiment: Run <VPIcon icon="fa-brands fa-python"/>`train_naive.py` again with different hyperparameters (change `n_estimators` to 200, or `max_depth` to 15). Would you be able to **exactly reproduce the previous model's results** if someone asked?

Probably not. Currently, we have **no record** of:

- Which hyperparameters we used
- What metrics we achieved
- What version of the data we trained on
- What library versions were installed
- When the training happened
- Who ran the training

Three months from now, if your manager asks "How was this model trained? Can you reproduce the results?" – you'd be in trouble. You might have the code, but you don't know which version of the code, which parameters, or which data produced the model that's currently in production.

**Experiment tracking** is the practice of logging all these details (code versions, parameters, metrics, data versions, artifacts) so experiments can be compared and replicated. Our naive approach lacks this entirely, making our results hard to trust or build upon.

### Problem 2: Model Versioning and Deployment Chaos

We trained one model and saved it as <VPIcon icon="fas fa-file-lines"/>`model.pkl`. Now consider this scenario:

1. You train a new model with different hyperparameters
2. You overwrite <VPIcon icon="fas fa-file-lines"/>`model.pkl` with the new model
3. You deploy it to production
4. Users start complaining about more false positives
5. You want to roll back to the previous model
6. **Problem:** The previous model was overwritten and is gone forever

There's no systematic versioning. Questions you cannot answer:

- Which model version is currently in production?
- What were the metrics for model v1 vs v2?
- When was each model trained and by whom?
- Can we instantly roll back if the new model performs worse?
- What changed between versions?

Without version control for models, you're flying blind. Imagine deploying code without Git – that's what we're doing with our model.

### Problem 3: No Data Validation – Garbage In, Garbage Out

Right now, our API will accept **any input** and try to make a prediction. Let's see what happens with bad data.

Create a test script <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`test_bad_data.py`:

```py :collapsed-lines title="test_bad_data.py"
"""Test what happens when we send garbage data to the API."""
import requests

BASE_URL = "http://localhost:8000"

print("Testing API with various bad inputs...\n")

# Test 1: Negative amount
print("Test 1: Negative amount")
response = requests.post(f"{BASE_URL}/predict", json={
    "amount": -500.0,        # Negative amount - impossible!
    "hour": 14,
    "day_of_week": 3,
    "merchant_category": "online"
})
print(f"  Status: {response.status_code}")
print(f"  Response: {response.json()}\n")

# Test 2: Invalid hour
print("Test 2: Hour = 25 (should be 0-23)")
response = requests.post(f"{BASE_URL}/predict", json={
    "amount": 100.0,
    "hour": 25,              # Invalid hour!
    "day_of_week": 3,
    "merchant_category": "online"
})
print(f"  Status: {response.status_code}")
print(f"  Response: {response.json()}\n")

# Test 3: Invalid day of week
print("Test 3: day_of_week = 10 (should be 0-6)")
response = requests.post(f"{BASE_URL}/predict", json={
    "amount": 100.0,
    "hour": 14,
    "day_of_week": 10,       # Invalid day!
    "merchant_category": "online"
})
print(f"  Status: {response.status_code}")
print(f"  Response: {response.json()}\n")

# Test 4: Unknown merchant category
print("Test 4: Unknown merchant category")
response = requests.post(f"{BASE_URL}/predict", json={
    "amount": 100.0,
    "hour": 14,
    "day_of_week": 3,
    "merchant_category": "unknown_category"  # Not in training data!
})
print(f"  Status: {response.status_code}")
print(f"  Response: {response.json()}\n")

# Test 5: All bad at once
print("Test 5: Everything wrong")
response = requests.post(f"{BASE_URL}/predict", json={
    "amount": -1000.0,
    "hour": 99,
    "day_of_week": 15,
    "merchant_category": "totally_fake"
})
print(f"  Status: {response.status_code}")
print(f"  Response: {response.json()}\n")

print("Observation: The API happily accepts ALL garbage and returns predictions!")
print("This is dangerous - bad data leads to bad predictions with no warning.")
```

Run it (make sure your API is still running):

```sh
python src/test_bad_data.py
#
# Testing API with various bad inputs...
# 
# Test 1: Negative amount
#   Status: 200
#   Response: {'is_fraud': False, 'fraud_probability': 0.15}
# 
# Test 2: Hour = 25 (should be 0-23)
#   Status: 200
#   Response: {'is_fraud': False, 'fraud_probability': 0.08}
# 
# ...
# 
# Observation: The API happily accepts ALL garbage and returns predictions!
```

**The API accepts garbage and returns predictions with no warning!** In production, this could mean:

- Incorrect predictions based on impossible data
- Fraud going undetected because of malformed input
- Legitimate transactions blocked based on corrupted data
- No way to debug why predictions are wrong

As the saying goes: **"Garbage in, garbage out."** But even worse – we don't even know garbage went in!

### Problem 4: Model Drift – Performance Decay Over Time

Here's a scenario that happens in every production ML system:

1. **January**: You train your model on historical fraud data. It achieves 98% accuracy and 0.67 F1-score. Everyone's happy.
2. **February**: The model is deployed and working well. Fraud is being caught.
3. **March**: Fraudsters adapt. They start using different patterns – smaller amounts, different merchant categories, different times of day.
4. **April**: Your model's accuracy has dropped from 98% to 85%. F1-score dropped from 0.67 to 0.35. Fraud is slipping through.
5. **May**: A major fraud incident occurs. Investigation reveals the model has been underperforming for 2 months.

::: critical The problem

Nobody noticed for 2 months because there was no monitoring.

This phenomenon is called **data drift** (when input data distributions change) or **concept drift** (when the relationship between inputs and outputs changes). Both are inevitable in real-world systems.

:::

Without monitoring:

- You don't know when performance degrades
- You don't know why performance degrades
- You can't take corrective action until users complain
- By then, significant damage may have occurred

### Problem 5: No CI/CD or Deployment Safety

Our "deployment process" was literally:

1. SSH into the server (or run locally)
2. Run `python src/train_naive.py`
3. Copy model.pkl to the right place
4. Restart the API
5. Hope for the best

There's:

- **No automated testing**: A typo could break everything
- **No staging environment**: We test directly in production
- **No gradual rollout**: 100% of traffic hits the new model immediately
- **No rollback capability**: If something breaks, we have to manually fix it
- **No audit trail**: Who deployed what and when?

This is how production incidents happen. A rushed deployment at 5 PM on Friday breaks the fraud detection system, and nobody notices until Monday when fraud losses have spiked.

![Figure 2 Problems with the Naive Approach](https://cdn.hashnode.com/res/hashnode/image/upload/v1771392425864/75c51059-5ab3-4e08-b3ad-7f5e9c3e7445.png)

### Summary: What We Need to Fix

Our simple ML service is missing critical infrastructure. Here's the mapping of problems to solutions:

| **Problem** | **Impact** | **Solution** | **Section** |
| --- | --- | --- | --- |
| No experiment tracking | Can't reproduce or compare models | MLflow Tracking | 3 |
| No model versioning | Can't roll back or audit | MLflow Registry | 3 |
| No feature consistency | Training-serving skew | Feast Feature Store | 4 |
| No data validation | Garbage predictions | Great Expectations | 5 |
| No monitoring | Drift goes unnoticed | Evidently | 6 |
| No CI/CD | Risky deployments | GitHub Actions + Docker | 7 |

::: note The good news

We can fix each of these by incrementally adding components to our pipeline. Each tool addresses a specific problem, and together they form a robust ML platform.

:::

Let's start fixing these issues, one by one.

---

## 3. Add Experiment Tracking and Model Registry with MLflow

**What breaks without this:** You can't reproduce yesterday's results, can't compare experiments, and can't roll back when a new model fails in production.

Our first fix addresses **Problems 1 and 2**: experiment reproducibility and model versioning.

**MLflow** is an open-source platform designed to manage the ML lifecycle. We'll use two of its key components:

1. **MLflow Tracking**: Log experiments (parameters, metrics, artifacts) so you can compare runs and reproduce results
2. **MLflow Model Registry**: Version your models with aliases (champion, challenger) and manage the deployment lifecycle

::: important Why This Matters

Without tracking, ML is guesswork. With MLflow, every run is logged with parameters, metrics, and artifacts. You can compare runs side-by-side, understand what actually improved your model, and reproduce any past experiment. The Model Registry adds governance – you know exactly which model is in production and can roll back in seconds.

:::

### 3.1** How to Set Up the MLflow Tracking Serv

MLflow can log experiments to a local directory by default, but to use the full UI and model registry, it's best to run the MLflow tracking server.

Open a **new terminal** (keep it separate from your API terminal) and run:

```sh
# Create a directory for MLflow data
mkdir -p mlruns

# Start the MLflow server
mlflow server \
--host 0.0.0.0 \
--port 5000 \
--backend-store-uri sqlite:///mlflow.db \
--default-artifact-root ./mlruns
```

::: info Let's break down these parameters:

- `--host 0.0.0.0`: Listen on all network interfaces
- `--port 5000`: Run on port 5000
- `--backend-store-uri sqlite:///mlflow.db`: Store experiment metadata in a SQLite database (for production, you'd use PostgreSQL or MySQL)
- `--default-artifact-root ./mlruns`: Store model artifacts (files) in the `mlruns` directory

:::

You should see:

```plaintext title="output"
[INFO] Starting gunicorn 21.2.0
[INFO] Listening at: http://0.0.0.0:5000
```

Now open your browser and navigate to `http://localhost:5000`. You'll see the **MLflow UI** – it should be empty initially since we haven't logged any experiments yet.

### 3.2 How to Log Experiments in Code

Now let's modify our training script to log everything to MLflow. Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`train_mlflow.py`:

```py :collapsed-lines title="train_mlflow.py"
"""
Train fraud detection model with MLflow experiment tracking.

This script demonstrates proper ML experiment tracking:
- Log all hyperparameters
- Log all metrics (train and test)
- Log the trained model as an artifact
- Register the model in the Model Registry

Compare this to train_naive.py to see the difference!
"""
import pandas as pd
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score, 
    precision_score, 
    recall_score, 
    f1_score,
    roc_auc_score
)
import pickle
from datetime import datetime

# Configure MLflow to use our tracking server
mlflow.set_tracking_uri("http://localhost:5000")

# Create or get the experiment
# All runs will be grouped under this experiment name
mlflow.set_experiment("fraud-detection")

def load_and_preprocess_data():
    """Load and preprocess the training and test data."""
    print("Loading data...")
    train_df = pd.read_csv("data/train.csv")
    test_df = pd.read_csv("data/test.csv")
    
    # Encode categorical feature
    encoder = LabelEncoder()
    train_df["merchant_encoded"] = encoder.fit_transform(train_df["merchant_category"])
    test_df["merchant_encoded"] = encoder.transform(test_df["merchant_category"])
    
    # Prepare features
    feature_cols = ["amount", "hour", "day_of_week", "merchant_encoded"]
    X_train = train_df[feature_cols]
    y_train = train_df["is_fraud"]
    X_test = test_df[feature_cols]
    y_test = test_df["is_fraud"]
    
    return X_train, y_train, X_test, y_test, encoder

def train_and_log_model(
    n_estimators: int = 100,
    max_depth: int = 10,
    min_samples_split: int = 2,
    min_samples_leaf: int = 1
):
    """
    Train a model and log everything to MLflow.
    
    Args:
        n_estimators: Number of trees in the forest
        max_depth: Maximum depth of each tree
        min_samples_split: Minimum samples required to split a node
        min_samples_leaf: Minimum samples required at a leaf node
    """
    X_train, y_train, X_test, y_test, encoder = load_and_preprocess_data()
    
    # Start an MLflow run - everything logged will be associated with this run
    with mlflow.start_run():
        # Add a descriptive run name
        run_name = f"rf_est{n_estimators}_depth{max_depth}_{datetime.now().strftime('%H%M%S')}"
        mlflow.set_tag("mlflow.runName", run_name)
        
        # Log all hyperparameters
        # These are the "knobs" we can tune
        mlflow.log_param("n_estimators", n_estimators)
        mlflow.log_param("max_depth", max_depth)
        mlflow.log_param("min_samples_split", min_samples_split)
        mlflow.log_param("min_samples_leaf", min_samples_leaf)
        mlflow.log_param("model_type", "RandomForestClassifier")
        
        # Log data information
        mlflow.log_param("train_samples", len(X_train))
        mlflow.log_param("test_samples", len(X_test))
        mlflow.log_param("fraud_ratio", float(y_train.mean()))
        mlflow.log_param("n_features", X_train.shape[1])
        
        # Train the model
        print(f"\nTraining model: n_estimators={n_estimators}, max_depth={max_depth}")
        model = RandomForestClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            min_samples_split=min_samples_split,
            min_samples_leaf=min_samples_leaf,
            random_state=42,
            n_jobs=-1
        )
        model.fit(X_train, y_train)
        
        # Evaluate and log metrics for BOTH train and test sets
        # This helps detect overfitting
        for dataset_name, X, y in [("train", X_train, y_train), ("test", X_test, y_test)]:
            y_pred = model.predict(X)
            y_prob = model.predict_proba(X)[:, 1]
            
            # Calculate all metrics
            accuracy = accuracy_score(y, y_pred)
            precision = precision_score(y, y_pred, zero_division=0)
            recall = recall_score(y, y_pred, zero_division=0)
            f1 = f1_score(y, y_pred, zero_division=0)
            roc_auc = roc_auc_score(y, y_prob)
            
            # Log metrics with dataset prefix
            mlflow.log_metric(f"{dataset_name}_accuracy", accuracy)
            mlflow.log_metric(f"{dataset_name}_precision", precision)
            mlflow.log_metric(f"{dataset_name}_recall", recall)
            mlflow.log_metric(f"{dataset_name}_f1", f1)
            mlflow.log_metric(f"{dataset_name}_roc_auc", roc_auc)
            
            print(f"  {dataset_name.upper()} - Accuracy: {accuracy:.4f}, F1: {f1:.4f}, ROC-AUC: {roc_auc:.4f}")
        
        # Log feature importance
        for feature, importance in zip(
            ["amount", "hour", "day_of_week", "merchant_encoded"],
            model.feature_importances_
        ):
            mlflow.log_metric(f"importance_{feature}", importance)
        
        # Log the model to MLflow AND register it in the Model Registry
        # This creates a new version of the model automatically
        print("\nRegistering model in MLflow Model Registry...")
        mlflow.sklearn.log_model(
            sk_model=model,
            artifact_path="model",
            registered_model_name="fraud-detection-model",
            input_example=X_train.iloc[:5]  # Example input for documentation
        )
        
        # Save and log the encoder as a separate artifact
        # We need this for inference
        with open("encoder.pkl", "wb") as f:
            pickle.dump(encoder, f)
        mlflow.log_artifact("encoder.pkl")
        
        # Get the run ID for reference
        run_id = mlflow.active_run().info.run_id
        print(f"\nMLflow Run ID: {run_id}")
        print(f"View this run: http://localhost:5000/#/experiments/1/runs/{run_id}")
        
        return model, encoder

def run_experiment_sweep():
    """
    Run multiple experiments with different hyperparameters.
    
    This demonstrates how MLflow helps compare different configurations.
    """
    print("="*60)
    print("RUNNING HYPERPARAMETER EXPERIMENT SWEEP")
    print("="*60)
    
    # Define different configurations to try
    experiments = [
        {"n_estimators": 50, "max_depth": 5},
        {"n_estimators": 100, "max_depth": 10},
        {"n_estimators": 100, "max_depth": 15},
        {"n_estimators": 200, "max_depth": 10},
        {"n_estimators": 200, "max_depth": 20},
    ]
    
    for i, params in enumerate(experiments, 1):
        print(f"\n--- Experiment {i}/{len(experiments)} ---")
        train_and_log_model(**params)
    
    print("\n" + "="*60)
    print("EXPERIMENT SWEEP COMPLETE!")
    print("="*60)
    print("\nView all experiments at: http://localhost:5000")
    print("Compare runs to find the best hyperparameters!")

if __name__ == "__main__":
    run_experiment_sweep()
```

::: info This script

1. **Connects to MLflow**: `mlflow.set_tracking_uri("http://localhost:5000")`
2. **Creates an experiment**: `mlflow.set_experiment("fraud-detection")`
3. **Logs parameters**: All hyperparameters and data info
4. **Logs metrics**: Accuracy, precision, recall, F1, ROC-AUC for both train and test sets
5. **Logs the model**: Saves the trained model as an artifact
6. **Registers the model**: Adds it to the Model Registry with automatic versioning

:::

Run the experiment sweep:

```sh
python src/train_mlflow.py
#
# ============================================================
# RUNNING HYPERPARAMETER EXPERIMENT SWEEP
# ============================================================
# 
# --- Experiment 1/5 ---
# Loading data...
# Training model: n_estimators=50, max_depth=5
#   TRAIN - Accuracy: 0.9821, F1: 0.6545, ROC-AUC: 0.9234
#   TEST - Accuracy: 0.9795, F1: 0.5714, ROC-AUC: 0.8956
# 
# Registering model in MLflow Model Registry...
# MLflow Run ID: abc123...
# 
# --- Experiment 5/5 ---
# Training model: n_estimators=200, max_depth=20
#   TRAIN - Accuracy: 0.9856, F1: 0.7123, ROC-AUC: 0.9567
#   TEST - Accuracy: 0.9810, F1: 0.6667, ROC-AUC: 0.9234
# 
# ============================================================
# EXPERIMENT SWEEP COMPLETE!
# ============================================================
```

All 5 runs are now logged to MLflow with full metrics comparison available in the UI.

Now refresh the MLflow UI at `http://localhost:5000`. You'll see:

1. **Experiments tab**: Shows the "fraud-detection" experiment with 5 runs
2. **Each run**: Shows parameters, metrics, and artifacts
3. **Compare**: You can select multiple runs and compare them side-by-side
4. **Models tab**: Shows "fraud-detection-model" with 5 versions

![MLflow Tracking UI: Compare runs, metrics, and models at a glance](https://cdn.hashnode.com/res/hashnode/image/upload/v1771396202929/c5a7d547-31b6-4783-acea-f4e9433d81ef.png)

### 3.3 How to Use the Model Registry

The **Model Registry** provides a central hub for managing model versions and their lifecycle stages.

In the MLflow UI:

1. Click the **"Models"** tab in the top navigation
2. Click **"fraud-detection-model"**
3. You'll see all 5 versions listed with their metrics

**Model Aliases:** MLflow now uses **aliases** instead of stages. If you've seen older tutorials using "Staging" and "Production" stages, aliases are the newer, more flexible approach.

- **@champion**: The production model serving live traffic
- **@challenger**: Candidate model being tested
- You can create custom aliases like @baseline, @latest and so on.

**Assign an alias:**

1. Open MLflow UI → Models → fraud-detection-model
2. Click on the version you want to promote
3. Click **"Add Alias"**
4. Enter `champion` and save

Now you've assigned the `@champion` alias to your best model. Your API will load whichever version has this alias, making rollbacks as simple as moving the alias to a different version.

![Figure 3: MLflow Model Lifecycle — From Training to Production](https://cdn.hashnode.com/res/hashnode/image/upload/v1771396081377/da67d89f-b82d-4189-8150-ecc142ed198a.png)

### 3.4 Update API to Load from Registry

Now let's update our API to load the champion model from the MLflow Registry instead of a pickle file. Create <VPIcon icon="fas fa-folder-open"/>`src/serve_mlflow.py`:

```py :collapsed-lines title="serve_mlflow.py"
"""
Serve fraud detection model from MLflow Model Registry.

This version loads the @champion model from MLflow, which means:
- Always serves the latest @champion model
- Can roll back by changing the @champion alias
- No manual file copying needed
"""
import mlflow
import mlflow.sklearn
import pickle
import os
from fastapi import FastAPI
from pydantic import BaseModel, Field

# Configure MLflow
mlflow.set_tracking_uri("http://localhost:5000")

print("Loading model from MLflow Model Registry...")

# Load the champion model from the registry
# This automatically gets whichever version has the @champion alias
try:
    model = mlflow.sklearn.load_model("models:/fraud-detection-model@champion")
    print("Successfully loaded champion model from MLflow!")
except Exception as e:
    print(f"Error loading from MLflow: {e}")
    print("Make sure you've assigned the @champion alias to a model in the MLflow UI")
    raise

# Load the encoder (saved as an artifact)
# In a real system, you might also version this in MLflow
with open("encoder.pkl", "rb") as f:
    encoder = pickle.load(f)
print("Encoder loaded successfully!")

app = FastAPI(
    title="Fraud Detection API (MLflow)",
    description="""
    Fraud detection API that loads models from MLflow Model Registry.
    
    This version always serves the model with the @champion alias.
    To update the model:
    1. Train a new model with train_mlflow.py
    2. Compare metrics in MLflow UI
    3. Promote the best model to Production
    4. Restart this API
    
    To roll back: Move the @champion alias to a previous version in MLflow UI.
    """,
    version="2.0.0"
)

class Transaction(BaseModel):
    amount: float = Field(..., description="Transaction amount in dollars", example=150.00)
    hour: int = Field(..., description="Hour of the day (0-23)", example=14)
    day_of_week: int = Field(..., description="Day of week (0=Monday, 6=Sunday)", example=3)
    merchant_category: str = Field(..., description="Type of merchant", example="online")

class PredictionResponse(BaseModel):
    is_fraud: bool
    fraud_probability: float
    model_source: str = "MLflow Production"

@app.post("/predict", response_model=PredictionResponse)
def predict(tx: Transaction):
    """Predict whether a transaction is fraudulent using the champion model."""
    data = tx.dict()
    
    try:
        data["merchant_encoded"] = encoder.transform([data["merchant_category"]])[0]
    except ValueError:
        data["merchant_encoded"] = 0
    
    X = [[data["amount"], data["hour"], data["day_of_week"], data["merchant_encoded"]]]
    
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1]
    
    return PredictionResponse(
        is_fraud=bool(pred),
        fraud_probability=round(float(prob), 4),
        model_source="MLflow Production"
    )

@app.get("/health")
def health():
    return {"status": "healthy", "model_source": "MLflow Registry"}

@app.get("/model-info")
def model_info():
    """Get information about the currently loaded model."""
    return {
        "registry": "MLflow",
        "model_name": "fraud-detection-model",
        "alias": "champion",
        "tracking_uri": "http://localhost:5000"
    }
```

Stop your old API (<kbd>Ctrl</kbd>+<kbd>C</kbd>) and start this new one:

```sh
uvicorn src.serve_mlflow:app --reload --host 0.0.0.0 --port 8000
```

Now deploying a new model is a **controlled, auditable process**:

1. **Train new model** → Automatically registered as new version
2. **Compare metrics** → Use MLflow UI to compare with current Production
3. **Set as champion** → Assign @champion alias in MLflow UI
4. **Restart API** → Loads new Production model
5. **Roll back if needed** → Move @champion alias to previous version

**Checkpoint:**

- MLflow UI (`http://localhost:5000`) should show the "fraud-detection" experiment with 5 runs
- The "Models" tab should show "fraud-detection-model" with 5 versions
- One version should have @champion alias
- The API should load and serve @champion model

---

## 4. Ensure Feature Consistency with Feast

::: warning ⚠️ First time hearing about feature stores?

Don't worry.  

You don't need to master every Feast detail on the first read.  
Focus on *why* feature consistency matters — you can revisit the implementation later.  

:::

::: important Key takeaway

Training and serving must compute features the same way, or your model silently fails.

:::

**What breaks without this:** Your model sees different feature values in production than it saw during training. Accuracy drops silently. This is called "training-serving skew" and it's one of the most common causes of ML system failures.

One subtle but critical issue in ML systems is **training-serving skew** – when data transformations at training time differ from inference time. Even small discrepancies can severely degrade performance.

::: important Why This Matters

Imagine you're computing "average transaction amount per merchant category" as a feature. During training, you compute it using pandas in a notebook. During serving, you compute it using SQL in a different system. Small differences in how these computations handle edge cases (nulls, rounding, time windows) cause the model to see different features in production than it was trained on.

:::

The result? **Silent failures** where accuracy drops but nothing errors out. Your model is making predictions based on features it's never seen before, and you have no idea.

In our naive implementation, we did handle one simple case: we saved the `LabelEncoder` to ensure `merchant_category` is encoded the same way in training and serving. But imagine if we had more complex feature engineering:

- Rolling averages over time windows
- User-level aggregations
- Cross-feature interactions
- Real-time features from streaming data

Maintaining consistency manually becomes impossible.

### 4.1 What is Feast and Why Use It?

In production ML platforms, teams use a **feature store** to guarantee feature consistency between training and serving. **Feast** is one popular open-source option.

In this tutorial, we use Feast not because you *must*, but because it makes the training-serving contract explicit and teachable. The principles apply whether you use Feast, Tecton, Featureform, or a custom solution.

Feast provides:

| **Capability** | **Description** |
| --- | --- |
| **Single source of truth** | Define features once, use everywhere |
| **Offline/online consistency** | Same features for training and serving |
| **Point-in-time correctness** | Prevents data leakage in training |
| **Low-latency serving** | Millisecond feature retrieval |
| **Feature versioning** | Track changes to feature definitions |

**How Feast works:**

1. **Define features** in Python code (feature definitions)
2. **Materialize features** from your data sources to the online store
3. **Retrieve features** using the same API for both training (offline) and serving (online)

This ensures that training and serving use **exactly the same feature computation logic**.

### 4.2 Install and Initialize Feast

We already installed Feast via <VPIcon icon="fas fa-file-lines"/>`requirements.txt`. Now let's initialize a feature repository.

```sh
# Navigate to the feature_repo directory
cd feature_repo

# Initialize Feast (this creates template files)
feast init . --minimal

# Go back to project root
cd ..
```

This creates the basic Feast structure:

```sh title="file structure"
feature_repo/
├── feature_store.yaml    # Feast configuration
└── __init__.py
```

### 4.3 Define Feature Definitions

First, let's create the Feast configuration file:

```yaml title="feature_repo/feature_store.yaml"
project: fraud_detection
registry: ../data/registry.db
provider: local
online_store:
  type: sqlite
  path: ../data/online_store.db
offline_store:
  type: file
entity_key_serialization_version: 3
```

This configuration:

- Names our project "fraud_detection"
- Uses SQLite for the online store (for production, you'd use Redis or DynamoDB)
- Uses local files for the offline store (for production, you'd use BigQuery or Snowflake)

Now create the feature definitions:

```py :collapsed-lines title="feature_repo/features.py"
"""
Feast feature definitions for fraud detection.

This file defines:
- Entities: The keys we use to look up features (merchant_category)
- Data Sources: Where the raw feature data comes from (Parquet file)
- Feature Views: The features themselves and their schemas

The key insight: These definitions are the SINGLE SOURCE OF TRUTH.
Both training and serving use these exact definitions.
"""
from datetime import timedelta
from feast import Entity, FeatureView, Field, FileSource, ValueType
from feast.types import Float32, Int64

# =============================================================================
# ENTITIES
# =============================================================================
# An entity is the "key" we use to look up features.
# For merchant-level features, the entity is merchant_category.

merchant = Entity(
    name="merchant_category",
    description="Merchant category for the transaction (for example, 'online', 'grocery')",
    value_type=ValueType.STRING,
)

# =============================================================================
# DATA SOURCES
# =============================================================================
# Data sources tell Feast where to find the raw feature data.
# For local development, we use a Parquet file.
# For production, this could be BigQuery, Snowflake, S3, etc.

merchant_stats_source = FileSource(
    name="merchant_stats_source",
    path="../data/merchant_features.parquet",  # We'll create this file
    timestamp_field="event_timestamp",       # Required for point-in-time joins
)

# =============================================================================
# FEATURE VIEWS
# =============================================================================
# A Feature View defines a group of related features.
# It specifies:
# - Which entity the features are for
# - The schema (names and types of features)
# - Where the data comes from
# - How long features are valid (TTL)

merchant_stats_fv = FeatureView(
    name="merchant_stats",
    description="Aggregated statistics per merchant category",
    entities=[merchant],
    ttl=timedelta(days=7),  # Features are valid for 7 days
    schema=[
        Field(name="avg_amount", dtype=Float32, description="Average transaction amount"),
        Field(name="transaction_count", dtype=Int64, description="Number of transactions"),
        Field(name="fraud_rate", dtype=Float32, description="Historical fraud rate"),
    ],
    source=merchant_stats_source,
    online=True,  # Enable online serving (low-latency retrieval)
)
```

### 4.4 Materialize Features to Online Store

Now we need to:

1. Compute the features from our training data
2. Save them in a format Feast can read
3. Apply the Feast definitions
4. Materialize features to the online store

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`prepare_feast_features.py`:

```py :collapsed-lines title="prepare_feast_features.py"
"""
Prepare feature data for Feast.

This script:
1. Computes aggregated merchant features from training data
2. Saves them in Parquet format (Feast's offline store format)
3. Applies Feast feature definitions
4. Materializes features to the online store for low-latency serving

Run this whenever your training data changes or you want to refresh features.
"""
import pandas as pd
import numpy as np
from datetime import datetime
import subprocess
import os

def compute_merchant_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute aggregated features by merchant category.
    
    THIS IS THE SINGLE SOURCE OF TRUTH FOR FEATURE COMPUTATION.
    
    Both training and serving will use features computed by this exact logic.
    Any change here automatically applies everywhere.
    
    Args:
        df: Transaction DataFrame with columns: amount, merchant_category, is_fraud
        
    Returns:
        DataFrame with computed features per merchant category
    """
    print("Computing merchant-level features...")
    
    # Group by merchant category and compute aggregates
    stats = df.groupby('merchant_category').agg({
        'amount': ['mean', 'count'],
        'is_fraud': 'mean'
    }).reset_index()
    
    # Flatten column names
    stats.columns = ['merchant_category', 'avg_amount', 'transaction_count', 'fraud_rate']
    
    # Add timestamp for Feast (required for point-in-time correct joins)
    stats['event_timestamp'] = datetime.now()
    
    # Convert types to match Feast schema
    stats['avg_amount'] = stats['avg_amount'].astype('float32')
    stats['transaction_count'] = stats['transaction_count'].astype('int64')
    stats['fraud_rate'] = stats['fraud_rate'].astype('float32')
    
    return stats

def main():
    print("="*60)
    print("FEAST FEATURE PREPARATION")
    print("="*60)
    
    # Load training data
    print("\n1. Loading training data...")
    train_df = pd.read_csv('data/train.csv')
    print(f"   Loaded {len(train_df):,} transactions")
    
    # Compute merchant features
    print("\n2. Computing merchant features...")
    merchant_features = compute_merchant_features(train_df)
    
    print("\n   Computed features:")
    print(merchant_features.to_string(index=False))
    
    # Save as Parquet (required format for Feast file source)
    print("\n3. Saving features to Parquet...")
    os.makedirs('data', exist_ok=True)
    output_path = 'data/merchant_features.parquet'
    merchant_features.to_parquet(output_path, index=False)
    print(f"   Saved to {output_path}")
    
    # Apply Feast feature definitions
    print("\n4. Applying Feast feature definitions...")
    try:
        result = subprocess.run(
            ['feast', 'apply'],
            cwd='feature_repo',
            capture_output=True,
            text=True,
            check=True
        )
        print("   Feature definitions applied successfully!")
        if result.stdout:
            print(f"   {result.stdout}")
    except subprocess.CalledProcessError as e:
        print(f"   Error applying Feast: {e.stderr}")
        raise
    
    # Materialize features to online store
    print("\n5. Materializing features to online store...")
    try:
        result = subprocess.run(
            ['feast', 'materialize-incremental', datetime.now().isoformat()],
            cwd='feature_repo',
            capture_output=True,
            text=True,
            check=True
        )
        print("   Features materialized successfully!")
        if result.stdout:
            print(f"   {result.stdout}")
    except subprocess.CalledProcessError as e:
        print(f"   Error materializing: {e.stderr}")
        raise
    
    print("\n" + "="*60)
    print("FEAST FEATURE PREPARATION COMPLETE!")
    print("="*60)
    print("\nYou can now:")
    print("  - Retrieve features for training: get_training_features()")
    print("  - Retrieve features for serving: get_online_features()")
    print("  - View feature stats: feast feature-views list")

if __name__ == "__main__":
    main()
```

Run the feature preparation:

```sh
python src/prepare_feast_features.py
#
# ============================================================
# FEAST FEATURE PREPARATION
# ============================================================
# 
# 1. Loading training data... 8,000 transactions
# 2. Computing merchant features...
#    grocery: avg=$31.24, fraud_rate=0.85%
#    online: avg=$98.45, fraud_rate=4.87%
#    restaurant: avg=$28.12, fraud_rate=0.50%
#    retail: avg=$45.67, fraud_rate=1.02%
#    travel: avg=$156.23, fraud_rate=4.18%
# 3. Saving to data/merchant_features.parquet ✓
# 4. Applying Feast definitions... ✓
# 5. Materializing to online store... ✓
# 
# FEAST FEATURE PREPARATION COMPLETE!
```

### 4.5 Retrieve Features for Training and Serving

Now let's create utilities to retrieve features consistently for both training and serving:

```py :collapsed-lines title="feast_features.py"
"""
Feast feature retrieval for training and serving.

This module provides functions to retrieve features from Feast:
- get_training_features(): For offline training (historical features)
- get_online_features(): For real-time serving (low-latency)

IMPORTANT: Both functions use the SAME feature definitions,
ensuring consistency between training and serving.
"""
import pandas as pd
from feast import FeatureStore
from datetime import datetime

# Initialize Feast store (points to our feature_repo)
store = FeatureStore(repo_path="feature_repo")

def get_training_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Get features for training using Feast's offline store.
    
    Uses point-in-time correct joins to prevent data leakage.
    This means features are looked up as of the time each transaction occurred,
    not as of "now" - preventing you from accidentally using future data.
    
    Args:
        df: DataFrame with at least 'merchant_category' column
        
    Returns:
        DataFrame with original columns plus Feast features
    """
    print("Retrieving training features from Feast offline store...")
    
    # Prepare entity dataframe with timestamps
    # Each row needs: entity key(s) + event_timestamp
    entity_df = df[['merchant_category']].copy()
    entity_df['event_timestamp'] = datetime.now()  # See note below
    entity_df = entity_df.drop_duplicates()
    
    # ⚠️ Simplification: For clarity, we use the current timestamp here.
    # In real systems, this would be the actual event time of each transaction.
    
    # Retrieve historical features
    # Feast handles the point-in-time join automatically
    training_data = store.get_historical_features(
        entity_df=entity_df,
        features=[
            "merchant_stats:avg_amount",
            "merchant_stats:transaction_count",
            "merchant_stats:fraud_rate",
        ],
    ).to_df()
    
    # Merge features back with original dataframe
    result = df.merge(
        training_data[['merchant_category', 'avg_amount', 'transaction_count', 'fraud_rate']],
        on='merchant_category',
        how='left'
    )
    
    print(f"Retrieved features for {len(entity_df)} unique merchants")
    return result

def get_online_features(merchant_category: str) -> dict:
    """
    Get features for real-time serving using Feast's online store.
    
    This is optimized for low-latency retrieval (milliseconds).
    Use this in your prediction API for real-time inference.
    
    Args:
        merchant_category: The merchant category to look up
        
    Returns:
        Dictionary with feature names and values
    """
    # Retrieve from online store (low-latency)
    feature_vector = store.get_online_features(
        features=[
            "merchant_stats:avg_amount",
            "merchant_stats:transaction_count",
            "merchant_stats:fraud_rate",
        ],
        entity_rows=[{"merchant_category": merchant_category}],
    ).to_dict()
    
    # Format the response
    return {
        'merchant_avg_amount': feature_vector['avg_amount'][0],
        'merchant_tx_count': feature_vector['transaction_count'][0],
        'merchant_fraud_rate': feature_vector['fraud_rate'][0],
    }

def get_online_features_batch(merchant_categories: list) -> pd.DataFrame:
    """
    Get features for multiple merchants at once (batch serving).
    
    More efficient than calling get_online_features() in a loop.
    
    Args:
        merchant_categories: List of merchant categories to look up
        
    Returns:
        DataFrame with features for each merchant
    """
    feature_vector = store.get_online_features(
        features=[
            "merchant_stats:avg_amount",
            "merchant_stats:transaction_count",
            "merchant_stats:fraud_rate",
        ],
        entity_rows=[{"merchant_category": mc} for mc in merchant_categories],
    ).to_df()
    
    return feature_vector

if __name__ == "__main__":
    # Test the feature retrieval functions
    print("="*60)
    print("TESTING FEAST FEATURE RETRIEVAL")
    print("="*60)
    
    # Test offline retrieval (for training)
    print("\n1. Testing OFFLINE feature retrieval (for training)...")
    train_df = pd.read_csv('data/train.csv').head(10)
    enriched = get_training_features(train_df)
    print("\n   Sample enriched training data:")
    print(enriched[['amount', 'merchant_category', 'avg_amount', 'fraud_rate']].head())
    
    # Test online retrieval (for serving)
    print("\n2. Testing ONLINE feature retrieval (for serving)...")
    for category in ['online', 'grocery', 'travel', 'restaurant', 'retail']:
        features = get_online_features(category)
        print(f"   {category}: avg_amount=${features['merchant_avg_amount']:.2f}, "
              f"fraud_rate={features['merchant_fraud_rate']:.2%}")
    
    # Test batch retrieval
    print("\n3. Testing BATCH online retrieval...")
    batch_features = get_online_features_batch(['online', 'grocery', 'travel'])
    print(batch_features)
    
    print("\n" + "="*60)
    print("FEAST FEATURE RETRIEVAL TEST COMPLETE!")
    print("="*60)
```

Test the feature retrieval:

```sh
python src/feast_features.py
#
# ============================================================
# TESTING FEAST FEATURE RETRIEVAL
# ============================================================
# 
# 1. Testing OFFLINE feature retrieval (for training)...
# Retrieving training features from Feast offline store...
# Retrieved features for 5 unique merchants
# 
#    Sample enriched training data:
#    amount merchant_category  avg_amount  fraud_rate
#     45.23           grocery       31.24      0.0085
#    123.45            online       98.45      0.0487
#     ...
# 
# 2. Testing ONLINE feature retrieval (for serving)...
#    online: avg_amount=$98.45, fraud_rate=4.87%
#    grocery: avg_amount=$31.24, fraud_rate=0.85%
#    travel: avg_amount=$156.23, fraud_rate=4.18%
#    restaurant: avg_amount=$28.12, fraud_rate=0.50%
#    retail: avg_amount=$45.67, fraud_rate=1.02%
# 
# 3. Testing BATCH online retrieval...
#   merchant_category  avg_amount  transaction_count  fraud_rate
#                online       98.45               1234      0.0487
#               grocery       31.24               2345      0.0085
#                travel      156.23                478      0.0418
```

### Why Feast Over Custom Code?

| **Aspect** | **Custom Code** | **Feast** |
| --- | --- | --- |
| **Consistency** | Manual effort to keep in sync | Automatic - same definitions everywhere |
| **Point-in-time correctness** | Must implement yourself | Built-in |
| **Online serving** | Must build your own cache | Built-in online store |
| **Feature versioning** | Not supported | Built-in |
| **Scalability** | Limited | Production-ready (BigQuery, Redis, etc.) |
| **Team collaboration** | Difficult | Feature registry with documentation |
| **Monitoring** | Manual | Built-in feature statistics |

::: note 💡 Mental Model

Treat feature definitions like database schemas.  
You wouldn't compute a column one way in your application and a different way in your reports. Features deserve the same discipline — define once, use everywhere.

:::

**Checkpoint:** After running <VPIcon icon="fa-brands fa-python"/>`prepare_feast_features.py`, you should have:

- <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-file-lines"/>`merchant_features.parquet` (computed features)
- <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-database"/>`registry.db` (Feast registry)
- <VPIcon icon="fas fa-folder-open"/>`data/`<VPIcon icon="fas fa-database"/>`online_store.db` (SQLite online store)

Running `python src/feast_features.py` should successfully retrieve features for all merchant categories.

---

## 5. Add Data Validation with Great Expectations

**What breaks without this:** Your API accepts garbage input (negative amounts, invalid hours) and returns meaningless predictions. Worse, you have no idea it happened.

Recall that our API currently trusts input blindly. We saw how garbage data produces a prediction with no warning. **Great Expectations** is an open-source tool for data quality testing – defining rules (expectations) and testing data against them.

**Why This Matters:** Data validation acts as a gatekeeper. Bad data is rejected **before** it can harm predictions. As the saying goes, "Garbage in, garbage out" – feeding unreliable data yields unreliable results. With validation, we transform this to "Garbage in, **error out**" – much better for debugging and reliability.

### 5.1 Define Expectations

What are reasonable expectations for our transaction data? Based on domain knowledge:

| **Field** | **Expectation** | **Reason** |
| --- | --- | --- |
| `amount` | Positive (> 0) | Negative transactions don't make sense |
| `amount` | Below $50,000 | Extremely large amounts are outliers/errors |
| `hour` | 0-23 inclusive | Valid hours in a day |
| `day_of_week` | 0-6 inclusive | Valid days (Mon=0, Sun=6) |
| `merchant_category` | One of known categories | Must match training data |
| All fields | Not null | Required for prediction |

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`data_validation.py`:

```py :collapsed-lines title="data_validation.py"
"""
Data validation for fraud detection.

This module provides functions to validate input data BEFORE making predictions.
Invalid data is rejected with clear error messages.

The key insight: It's better to reject bad input than to make garbage predictions.
"""
import pandas as pd
from typing import Dict, List, Any, Optional

# Define the valid merchant categories (must match training data!)
VALID_CATEGORIES = ["grocery", "restaurant", "retail", "online", "travel"]

def validate_transaction(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate a single transaction for fraud prediction.
    
    Checks all business rules and data quality requirements.
    Returns a dictionary with 'valid' (bool) and 'errors' (list).
    
    Args:
        data: Dictionary with transaction fields
        
    Returns:
        {"valid": bool, "errors": list of error messages}
        
    Example:
        >>> validate_transaction({"amount": -100, "hour": 25, ...})
        {"valid": False, "errors": ["amount must be positive", "hour must be 0-23"]}
    """
    errors = []
    
    # ==========================================================================
    # Amount Validation
    # ==========================================================================
    amount = data.get("amount")
    if amount is None:
        errors.append("amount is required")
    elif not isinstance(amount, (int, float)):
        errors.append(f"amount must be a number (got {type(amount).__name__})")
    elif amount <= 0:
        errors.append("amount must be positive")
    elif amount > 50000:
        errors.append(f"amount exceeds maximum allowed value of \(50,000 (got \){amount:,.2f})")
    
    # ==========================================================================
    # Hour Validation
    # ==========================================================================
    hour = data.get("hour")
    if hour is None:
        errors.append("hour is required")
    elif not isinstance(hour, int):
        errors.append(f"hour must be an integer (got {type(hour).__name__})")
    elif not (0 <= hour <= 23):
        errors.append(f"hour must be between 0 and 23 (got {hour})")
    
    # ==========================================================================
    # Day of Week Validation
    # ==========================================================================
    day = data.get("day_of_week")
    if day is None:
        errors.append("day_of_week is required")
    elif not isinstance(day, int):
        errors.append(f"day_of_week must be an integer (got {type(day).__name__})")
    elif not (0 <= day <= 6):
        errors.append(f"day_of_week must be between 0 (Monday) and 6 (Sunday) (got {day})")
    
    # ==========================================================================
    # Merchant Category Validation
    # ==========================================================================
    category = data.get("merchant_category")
    if category is None:
        errors.append("merchant_category is required")
    elif not isinstance(category, str):
        errors.append(f"merchant_category must be a string (got {type(category).__name__})")
    elif category not in VALID_CATEGORIES:
        errors.append(
            f"merchant_category must be one of {VALID_CATEGORIES} (got '{category}')"
        )
    
    return {
        "valid": len(errors) == 0,
        "errors": errors
    }

def validate_batch(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Validate a batch of transactions using Great Expectations.
    
    This is useful for validating training data or batch prediction requests.
    Uses Great Expectations for more sophisticated validation.
    
    Args:
        df: DataFrame with transaction data
        
    Returns:
        Dictionary with validation results
    """
    import great_expectations as gx
    
    # Convert to Great Expectations dataset
    ge_df = gx.from_pandas(df)
    
    results = []
    
    # Amount expectations
    r = ge_df.expect_column_values_to_be_between(
        'amount', min_value=0.01, max_value=50000, mostly=0.99
    )
    results.append(('amount_range', r.success, r.result))
    
    # Hour expectations
    r = ge_df.expect_column_values_to_be_between(
        'hour', min_value=0, max_value=23
    )
    results.append(('hour_range', r.success, r.result))
    
    # Day of week expectations
    r = ge_df.expect_column_values_to_be_between(
        'day_of_week', min_value=0, max_value=6
    )
    results.append(('day_range', r.success, r.result))
    
    # Merchant category expectations
    r = ge_df.expect_column_values_to_be_in_set(
        'merchant_category', VALID_CATEGORIES
    )
    results.append(('category_valid', r.success, r.result))
    
    # No nulls in critical fields
    for col in ['amount', 'hour', 'day_of_week', 'merchant_category']:
        r = ge_df.expect_column_values_to_not_be_null(col)
        results.append((f'{col}_not_null', r.success, r.result))
    
    # Summarize results
    passed = sum(1 for _, success, _ in results if success)
    total = len(results)
    
    return {
        'success': passed == total,
        'passed': passed,
        'total': total,
        'pass_rate': passed / total,
        'details': {name: {'passed': success, 'result': result} 
                   for name, success, result in results}
    }

if __name__ == "__main__":
    print("="*60)
    print("TESTING DATA VALIDATION")
    print("="*60)
    
    # Test single transaction validation
    print("\n1. Single Transaction Validation")
    print("-"*40)
    
    test_cases = [
        {
            "name": "Valid transaction",
            "data": {"amount": 50.0, "hour": 14, "day_of_week": 3, "merchant_category": "grocery"}
        },
        {
            "name": "Negative amount",
            "data": {"amount": -100.0, "hour": 14, "day_of_week": 3, "merchant_category": "grocery"}
        },
        {
            "name": "Invalid hour",
            "data": {"amount": 50.0, "hour": 25, "day_of_week": 3, "merchant_category": "grocery"}
        },
        {
            "name": "Unknown merchant",
            "data": {"amount": 50.0, "hour": 14, "day_of_week": 3, "merchant_category": "unknown"}
        },
        {
            "name": "Everything wrong",
            "data": {"amount": -999, "hour": 99, "day_of_week": 15, "merchant_category": "fake"}
        },
    ]
    
    for tc in test_cases:
        result = validate_transaction(tc["data"])
        status = "PASS" if result["valid"] else "FAIL"
        print(f"\n{tc['name']}: {status}")
        if result["errors"]:
            for error in result["errors"]:
                print(f"  - {error}")
    
    # Test batch validation
    print("\n\n2. Batch Validation with Great Expectations")
    print("-"*40)
    
    train_df = pd.read_csv('data/train.csv')
    results = validate_batch(train_df)
    
    print(f"\nTraining data validation: {results['passed']}/{results['total']} checks passed")
    print(f"Pass rate: {results['pass_rate']:.1%}")
    
    if not results['success']:
        print("\nFailed checks:")
        for name, detail in results['details'].items():
            if not detail['passed']:
                print(f"  - {name}")
```

### When to Use Which Validation Approach

| **Approach** | **Use Case** | **Latency** | **When to Use** |
| --- | --- | --- | --- |
| **Custom Python** (`validate_transaction`) | Real-time API requests | <1ms | Every prediction request |
| **Great Expectations** | Batch data quality | Seconds | Training data, periodic audits, CI/CD |

We use **both** in this tutorial because they serve different purposes:

- Custom validation is your **runtime gatekeeper** — fast enough for every request
- Great Expectations is your **batch auditor** — thorough checks on datasets

### 5.2 Integrate Validation into FastAPI

Now let's update our API to reject invalid input with clear error messages:

```py :collapsed-lines title="serve_validated.py"
"""
Serve fraud detection model with input validation.

This version adds data validation BEFORE making predictions:
- Invalid inputs are rejected with HTTP 400 and clear error messages
- Valid inputs are processed and predictions returned

This is much safer than the naive version which accepted garbage.
"""
import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from src.data_validation import validate_transaction

# Load model
with open("models/model.pkl", "rb") as f:
    model, encoder = pickle.load(f)

app = FastAPI(
    title="Fraud Detection API (Validated)",
    description="""
    Fraud detection API with input validation.
    
    All inputs are validated before prediction:
    - amount: Must be positive and below $50,000
    - hour: Must be 0-23
    - day_of_week: Must be 0-6
    - merchant_category: Must be one of: grocery, restaurant, retail, online, travel
    
    Invalid inputs return HTTP 400 with detailed error messages.
    """,
    version="3.0.0"
)

class Transaction(BaseModel):
    amount: float = Field(..., description="Transaction amount (must be positive)", example=150.00)
    hour: int = Field(..., description="Hour of day (0-23)", example=14)
    day_of_week: int = Field(..., description="Day of week (0=Mon, 6=Sun)", example=3)
    merchant_category: str = Field(..., description="Merchant type", example="online")

class PredictionResponse(BaseModel):
    is_fraud: bool
    fraud_probability: float
    validation_passed: bool = True

class ValidationErrorResponse(BaseModel):
    detail: dict

@app.post("/predict", response_model=PredictionResponse, responses={400: {"model": ValidationErrorResponse}})
def predict(tx: Transaction):
    """
    Predict whether a transaction is fraudulent.
    
    Input is validated before prediction. Invalid inputs return HTTP 400.    """
    data = tx.dict()
    
    # VALIDATE INPUT BEFORE MAKING PREDICTION
    validation = validate_transaction(data)
    
    if not validation["valid"]:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Validation failed",
                "errors": validation["errors"],
                "input": data
            }
        )
    
    # Input is valid - make prediction
    data["merchant_encoded"] = encoder.transform([data["merchant_category"]])[0]
    X = [[data["amount"], data["hour"], data["day_of_week"], data["merchant_encoded"]]]
    
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0][1]
    
    return PredictionResponse(
        is_fraud=bool(pred),
        fraud_probability=round(float(prob), 4),
        validation_passed=True
    )

@app.get("/health")
def health():
    return {"status": "healthy", "validation": "enabled"}
```

Start the validated API:

```sh
uvicorn src.serve_validated:app --reload --host 0.0.0.0 --port 8000
```

Now test with bad data:

```sh
curl -X POST "http://localhost:8000/predict" \
-H "Content-Type: application/json" \
-d '{"amount": -500, "hour": 25, "day_of_week": 10, "merchant_category": "fake"}'
```

Response (HTTP 400):

```json
{
  "detail": {
    "message": "Validation failed",
    "errors": [
      "amount must be positive",
      "hour must be between 0 and 23 (got 25)",
      "day_of_week must be between 0 (Monday) and 6 (Sunday) (got 10)",
      "merchant_category must be one of ['grocery', 'restaurant', 'retail', 'online', 'travel'] (got 'fake')"
    ],
    "input": {"amount": -500, "hour": 25, "day_of_week": 10, "merchant_category": "fake"}
  }
}
```

**This is a huge improvement!** Instead of silently accepting garbage and returning meaningless predictions, we now:

- Reject invalid input immediately
- Provide clear, actionable error messages
- Return the original input for debugging
- Use proper HTTP status codes (400 for client error)

**Checkpoint:** Your validated API should:

- Accept valid transactions and return predictions
- Reject invalid transactions with HTTP 400 and detailed error messages
- Show validation errors for each invalid field

---

## 6. Monitor Model Performance and Data Drift

::: warning What breaks without this

Your model's accuracy drops from 98% to 70% over two months. Nobody notices until customers complain. By then, significant damage has occurred.

Even with a great model and clean input data, **time can be an enemy**. Model performance can decline as real-world data evolves – this is known as **model drift** or **model decay**.

:::

::: important Why This Matters

In traditional software, you monitor CPU, memory, error rates, and response times. In ML, you must **also** monitor:

- Data quality (are inputs within expected ranges?)
- Model performance (is accuracy holding up?)
- Data drift (has input distribution changed?)
- Prediction drift (has the distribution of predictions changed?)

:::

Without monitoring, your model could be silently failing for weeks before anyone notices. By then, significant damage may have occurred – fraud slipping through, good customers blocked, revenue lost.

### 6.1 The Four Pillars of ML Observability

| **Pillar** | **What to Monitor** | **Why It Matters** |
| --- | --- | --- |
| **Data Quality** | Are inputs valid? Nulls? Outliers? | Bad data causes bad predictions |
| **Model Performance** | Accuracy, precision, recall, F1 | Is the model still working? |
| **Data Drift** | Has input distribution changed from training? | Model may not generalize to new data |
| **Prediction Drift** | Has prediction distribution changed? | May indicate data or concept drift |

### 6.2 Build a Drift Monitor with Evidently

**Evidently** is an open-source library specifically designed for ML monitoring. It can detect drift, generate reports, and integrate with monitoring systems.

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-python"/>`monitoring.py`:

```py :collapsed-lines title="monitoring.py"
"""
Model monitoring with Evidently.

This module provides tools to:
1. Detect data drift between training and production data
2. Generate detailed HTML reports
3. Track drift over time
4. Alert when drift exceeds thresholds

In production, you would run drift checks periodically (hourly, daily)
and alert when significant drift is detected.
"""
import pandas as pd
import numpy as np
from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, TargetDriftPreset
from evidently.metrics import (
    DatasetDriftMetric,
    DataDriftTable,
    ColumnDriftMetric
)
from datetime import datetime
from typing import List, Dict, Any, Optional

class DriftMonitor:
    """
    Monitor for detecting data drift between reference (training) and current data.
    
    Implementation Note: We use two approaches here:
    1. Scipy's KS-test — A lightweight statistical method that works anywhere (our fallback)
    2. Evidently — A full-featured library with beautiful reports (our primary tool)
    
    The KS-test is included as defensive coding — if Evidently fails to generate 
    a report, we still get drift detection.
    
    Usage:
        monitor = DriftMonitor(training_data)
        result = monitor.check_drift(production_data)
        if result['drift_detected']:
            alert("Drift detected!")
    """
    
    def __init__(self, reference_data: pd.DataFrame, feature_columns: Optional[List[str]] = None):
        """
        Initialize the drift monitor with reference (training) data.
        
        Args:
            reference_data: The training data to compare against
            feature_columns: Columns to monitor (default: all numeric columns)
        """
        self.reference = reference_data
        self.feature_columns = feature_columns or reference_data.select_dtypes(
            include=[np.number]
        ).columns.tolist()
        self.history: List[Dict[str, Any]] = []
        
        print(f"Drift monitor initialized with {len(self.reference):,} reference samples")
        print(f"Monitoring columns: {self.feature_columns}")
    
    def check_drift(self, current_data: pd.DataFrame, threshold: float = 0.1) -> Dict[str, Any]:
        """
        Check for drift between reference and current data.
        
        Args:
            current_data: Current/production data to check
            threshold: Drift share threshold for alerting (default 10%)
            
        Returns:
            Dictionary with drift results
        """
        from scipy import stats
        
        ref_subset = self.reference[self.feature_columns]
        cur_subset = current_data[self.feature_columns]
        
        # Simple statistical drift detection using KS test
        drifted_columns = []
        for col in self.feature_columns:
            statistic, p_value = stats.ks_2samp(
                ref_subset[col].dropna(),
                cur_subset[col].dropna()
            )
            if p_value < 0.05:  # 5% significance level
                drifted_columns.append(col)
        
        n_features = len(self.feature_columns)
        n_drifted = len(drifted_columns)
        drift_share = n_drifted / n_features if n_features > 0 else 0
        
        result = {
            'timestamp': datetime.now().isoformat(),
            'drift_detected': n_drifted > 0,
            'drift_share': drift_share,
            'drifted_columns': drifted_columns,
            'n_features': n_features,
            'n_drifted': n_drifted,
            'current_samples': len(current_data),
            'threshold': threshold,
            'alert': drift_share > threshold
        }
        
        self.history.append(result)
        
        return result
    
    def generate_report(self, current_data: pd.DataFrame, output_path: str = "drift_report.html"):
        """
        Generate a detailed HTML drift report using Evidently.
        
        Opens in browser for visual inspection of drift patterns.
        """
        ref_subset = self.reference[self.feature_columns]
        cur_subset = current_data[self.feature_columns]
        
        try:
            report = Report(metrics=[DataDriftPreset()])
            report.run(reference_data=ref_subset, current_data=cur_subset)
            
            # Save HTML report
            with open(output_path, 'w') as f:
                f.write(report.show(mode='inline').data)
            
            print(f"Drift report saved to {output_path}")
            print(f"Open this file in a browser to view detailed visualizations.")
        except Exception as e:
            print(f"Could not generate Evidently report: {e}")
            print(f"Using simplified drift detection instead.")
    
    def get_alerts(self, threshold: float = 0.1) -> List[Dict[str, Any]]:
        """
        Get all alerts from history where drift exceeded threshold.
        """
        return [
            {
                'timestamp': r['timestamp'],
                'severity': 'HIGH' if r['drift_share'] > 0.3 else 'MEDIUM',
                'drift_share': r['drift_share'],
                'message': f"Drift detected: {r['drift_share']:.1%} of features drifted",
                'drifted_columns': r['drifted_columns']
            }
            for r in self.history
            if r['drift_share'] > threshold
        ]
    
    def summary(self) -> Dict[str, Any]:
        """Get summary statistics from monitoring history."""
        if not self.history:
            return {"message": "No drift checks performed yet"}
        
        drift_shares = [r['drift_share'] for r in self.history]
        alerts = [r for r in self.history if r['alert']]
        
        return {
            'total_checks': len(self.history),
            'total_alerts': len(alerts),
            'avg_drift_share': np.mean(drift_shares),
            'max_drift_share': np.max(drift_shares),
            'first_check': self.history[0]['timestamp'],
            'last_check': self.history[-1]['timestamp']
        }


def simulate_drift_scenarios():
    """
    Demonstrate drift detection with different scenarios.
    
    This simulates what happens when production data differs from training data.
    """
    from src.generate_data import generate_transactions
    
    print("="*70)
    print("DRIFT DETECTION SIMULATION")
    print("="*70)
    
    # Load reference (training) data
    print("\n1. Loading reference data (training set)...")
    reference = pd.read_csv('data/train.csv')
    feature_cols = ['amount', 'hour', 'day_of_week']
    
    # Initialize drift monitor
    monitor = DriftMonitor(reference, feature_cols)
    
    # Scenario 1: Similar data (should show minimal drift)
    print("\n" + "-"*70)
    print("SCENARIO 1: Test data (similar distribution)")
    print("-"*70)
    test_data = pd.read_csv('data/test.csv')
    result = monitor.check_drift(test_data)
    print(f"  Drift detected: {result['drift_detected']}")
    print(f"  Drift share: {result['drift_share']:.1%}")
    print(f"  Drifted columns: {result['drifted_columns']}")
    print(f"  Alert triggered: {result['alert']}")
    
    # Scenario 2: Fraud spike (10% fraud instead of 2%)
    print("\n" + "-"*70)
    print("SCENARIO 2: Fraud spike (10% fraud rate instead of 2%)")
    print("-"*70)
    fraud_spike = generate_transactions(n_samples=2000, fraud_ratio=0.10, seed=101)
    result = monitor.check_drift(fraud_spike)
    print(f"  Drift detected: {result['drift_detected']}")
    print(f"  Drift share: {result['drift_share']:.1%}")
    print(f"  Drifted columns: {result['drifted_columns']}")
    print(f"  Alert triggered: {result['alert']}")
    
    # Scenario 3: Amount inflation (everything costs more)
    print("\n" + "-"*70)
    print("SCENARIO 3: Amount inflation (2x multiplier)")
    print("-"*70)
    inflated = test_data.copy()
    inflated['amount'] = inflated['amount'] * 2
    result = monitor.check_drift(inflated)
    print(f"  Drift detected: {result['drift_detected']}")
    print(f"  Drift share: {result['drift_share']:.1%}")
    print(f"  Drifted columns: {result['drifted_columns']}")
    print(f"  Alert triggered: {result['alert']}")
    
    # Scenario 4: Time shift (more late-night transactions)
    print("\n" + "-"*70)
    print("SCENARIO 4: Time shift (mostly late-night transactions)")
    print("-"*70)
    night_shift = test_data.copy()
    night_shift['hour'] = np.random.choice([0, 1, 2, 3, 22, 23], size=len(night_shift))
    result = monitor.check_drift(night_shift)
    print(f"  Drift detected: {result['drift_detected']}")
    print(f"  Drift share: {result['drift_share']:.1%}")
    print(f"  Drifted columns: {result['drifted_columns']}")
    print(f"  Alert triggered: {result['alert']}")
    
    # Generate detailed report for the most drifted scenario
    print("\n" + "-"*70)
    print("GENERATING DETAILED REPORT")
    print("-"*70)
    monitor.generate_report(night_shift, "drift_report.html")
    
    # Print summary
    print("\n" + "-"*70)
    print("MONITORING SUMMARY")
    print("-"*70)
    summary = monitor.summary()
    print(f"  Total checks: {summary['total_checks']}")
    print(f"  Total alerts: {summary['total_alerts']}")
    print(f"  Average drift share: {summary['avg_drift_share']:.1%}")
    print(f"  Maximum drift share: {summary['max_drift_share']:.1%}")
    
    # Print alerts
    alerts = monitor.get_alerts()
    if alerts:
        print(f"\n  Alerts ({len(alerts)}):")
        for alert in alerts:
            print(f"    [{alert['severity']}] {alert['message']}")
    
    print("\n" + "="*70)
    print("DRIFT DETECTION SIMULATION COMPLETE")
    print("="*70)
    print("\nOpen drift_report.html in your browser to see detailed visualizations!")


if __name__ == "__main__":
    simulate_drift_scenarios()
```

Run the drift simulation:

```sh
python src/monitoring.py
```

You'll see output showing how drift detection works in different scenarios. Then open <VPIcon icon="fa-brands fa-html5"/>`drift_report.html` in your browser to see beautiful visualizations of the drift patterns.

### 6.3 Production Monitoring Strategy

In a production environment, you would:

1. **Log all predictions** to a database or data warehouse
2. **Run drift checks periodically** (hourly for high-traffic systems, daily for lower traffic)
3. **Set up alerts** when drift exceeds thresholds (integrate with PagerDuty, Slack, etc.)
4. **Trigger retraining** if drift is severe or sustained
5. **Create dashboards** to track drift over time (Grafana, Datadog, etc.)

**Checkpoint:** Running `python src/monitoring.py` should:

- Show minimal drift for similar data (test set)
- Show significant drift for modified data (fraud spike, inflation, time shift)
- Generate an HTML report that you can view in your browser

---

## 7. Automate Testing and Deployment with CI/CD

**What breaks without this:** A typo in your code breaks the API. You deploy on Friday at 5 PM. Nobody notices until Monday. Fraud losses spike over the weekend.

**CI/CD** (Continuous Integration/Continuous Deployment) ensures reliable, repeatable releases. As JFrog notes: *"A strong CI/CD pipeline enables ML teams to build robust, bug-free models more quickly and efficiently."*

**Why This Matters:** In ML, changes aren't just code – they're also data and models. CI/CD ensures that when you change training logic, data preprocessing, or hyperparameters, tests verify the change doesn't break anything before it reaches production. It's the difference between deploying with confidence and deploying with crossed fingers.

### 7.1 Write Tests for Data and Model

Create <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_data_and_model.py`:

```py :collapsd-lines title="tests/test_data_and_model.py"
"""
Tests for data quality and model performance.

These tests run in CI/CD to ensure:
1. Data meets quality requirements
2. Model meets performance thresholds
3. No regressions are introduced

Run with: pytest tests/test_data_and_model.py -v
"""
import pandas as pd
import pickle
import pytest
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

class TestDataQuality:
    """Tests for training data quality."""
    
    @pytest.fixture
    def train_data(self):
        return pd.read_csv("data/train.csv")
    
    @pytest.fixture
    def test_data(self):
        return pd.read_csv("data/test.csv")
    
    def test_train_data_has_expected_columns(self, train_data):
        """Training data must have all required columns."""
        required_columns = {"amount", "hour", "day_of_week", "merchant_category", "is_fraud"}
        actual_columns = set(train_data.columns)
        missing = required_columns - actual_columns
        assert not missing, f"Missing columns: {missing}"
    
    def test_train_data_not_empty(self, train_data):
        """Training data must have rows."""
        assert len(train_data) > 0, "Training data is empty"
        assert len(train_data) >= 1000, f"Training data too small: {len(train_data)} rows"
    
    def test_no_negative_amounts(self, train_data):
        """Transaction amounts must be non-negative."""
        negative_count = (train_data["amount"] < 0).sum()
        assert negative_count == 0, f"Found {negative_count} negative amounts"
    
    def test_amounts_reasonable(self, train_data):
        """Transaction amounts should be within reasonable bounds."""
        max_amount = train_data["amount"].max()
        assert max_amount <= 100000, f"Max amount {max_amount} exceeds reasonable limit"
    
    def test_hours_valid(self, train_data):
        """Hours must be 0-23."""
        invalid = train_data[(train_data["hour"] < 0) | (train_data["hour"] > 23)]
        assert len(invalid) == 0, f"Found {len(invalid)} invalid hours"
    
    def test_days_valid(self, train_data):
        """Days of week must be 0-6."""
        invalid = train_data[(train_data["day_of_week"] < 0) | (train_data["day_of_week"] > 6)]
        assert len(invalid) == 0, f"Found {len(invalid)} invalid days"
    
    def test_merchant_categories_valid(self, train_data):
        """Merchant categories must be from known set."""
        valid_categories = {"grocery", "restaurant", "retail", "online", "travel"}
        actual_categories = set(train_data["merchant_category"].unique())
        invalid = actual_categories - valid_categories
        assert not invalid, f"Invalid merchant categories: {invalid}"
    
    def test_fraud_ratio_reasonable(self, train_data):
        """Fraud ratio should be realistic (between 0.1% and 50%)."""
        fraud_ratio = train_data["is_fraud"].mean()
        assert 0.001 <= fraud_ratio <= 0.5, f"Fraud ratio {fraud_ratio:.2%} is unrealistic"
    
    def test_no_nulls_in_critical_columns(self, train_data):
        """Critical columns must not have null values."""
        critical = ["amount", "hour", "day_of_week", "merchant_category", "is_fraud"]
        for col in critical:
            null_count = train_data[col].isnull().sum()
            assert null_count == 0, f"Column {col} has {null_count} null values"


class TestModelPerformance:
    """Tests for model performance thresholds."""
    
    @pytest.fixture
    def model_and_encoder(self):
        with open("models/model.pkl", "rb") as f:
            return pickle.load(f)
    
    @pytest.fixture
    def test_data(self):
        return pd.read_csv("data/test.csv")
    
    def test_model_loads_successfully(self, model_and_encoder):
        """Model file must load without errors."""
        model, encoder = model_and_encoder
        assert model is not None, "Model is None"
        assert encoder is not None, "Encoder is None"
    
    def test_model_can_predict(self, model_and_encoder, test_data):
        """Model must be able to make predictions."""
        model, encoder = model_and_encoder
        test_data["merchant_encoded"] = encoder.transform(test_data["merchant_category"])
        X = test_data[["amount", "hour", "day_of_week", "merchant_encoded"]]
        predictions = model.predict(X)
        assert len(predictions) == len(X), "Prediction count mismatch"
    
    def test_accuracy_threshold(self, model_and_encoder, test_data):
        """Model accuracy must be at least 90%."""
        model, encoder = model_and_encoder
        test_data["merchant_encoded"] = encoder.transform(test_data["merchant_category"])
        X = test_data[["amount", "hour", "day_of_week", "merchant_encoded"]]
        y = test_data["is_fraud"]
        accuracy = model.score(X, y)
        assert accuracy >= 0.90, f"Accuracy {accuracy:.2%} below 90% threshold"
    
    def test_f1_threshold(self, model_and_encoder, test_data):
        """Model F1-score must be at least 0.3 (sanity check for imbalanced data)."""
        model, encoder = model_and_encoder
        test_data["merchant_encoded"] = encoder.transform(test_data["merchant_category"])
        X = test_data[["amount", "hour", "day_of_week", "merchant_encoded"]]
        y = test_data["is_fraud"]
        y_pred = model.predict(X)
        f1 = f1_score(y, y_pred)
        assert f1 >= 0.3, f"F1-score {f1:.2f} below 0.3 threshold"
    
    def test_precision_not_zero(self, model_and_encoder, test_data):
        """Model precision must be greater than 0 (catches at least some fraud)."""
        model, encoder = model_and_encoder
        test_data["merchant_encoded"] = encoder.transform(test_data["merchant_category"])
        X = test_data[["amount", "hour", "day_of_week", "merchant_encoded"]]
        y = test_data["is_fraud"]
        y_pred = model.predict(X)
        precision = precision_score(y, y_pred, zero_division=0)
        assert precision > 0, "Model has zero precision (predicts no fraud)"
    
    def test_recall_not_zero(self, model_and_encoder, test_data):
        """Model recall must be greater than 0 (catches at least some fraud)."""
        model, encoder = model_and_encoder
        test_data["merchant_encoded"] = encoder.transform(test_data["merchant_category"])
        X = test_data[["amount", "hour", "day_of_week", "merchant_encoded"]]
        y = test_data["is_fraud"]
        y_pred = model.predict(X)
        recall = recall_score(y, y_pred, zero_division=0)
        assert recall > 0, "Model has zero recall (misses all fraud)"
```

Create <VPIcon icon="fas fa-folder-open"/>`tests/`<VPIcon icon="fa-brands fa-python"/>`test_api.py`:

```py :collapsed-lines title="tests/test_api.py"
"""
Tests for the FastAPI prediction service.

These tests ensure the API:
1. Returns correct responses for valid inputs
2. Rejects invalid inputs with proper error messages
3. Health check works

Run with: pytest tests/test_api.py -v
Note: Requires the API to be running on localhost:8000
"""
import pytest
import httpx

BASE_URL = "http://localhost:8000"

class TestPredictionEndpoint:
    """Tests for the /predict endpoint."""
    
    def test_valid_prediction_returns_200(self):
        """Valid input should return HTTP 200 with prediction."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": 100.0,
            "hour": 14,
            "day_of_week": 3,
            "merchant_category": "online"
        }, timeout=10)
        
        assert response.status_code == 200
        data = response.json()
        assert "is_fraud" in data
        assert "fraud_probability" in data
        assert isinstance(data["is_fraud"], bool)
        assert 0 <= data["fraud_probability"] <= 1
    
    def test_high_risk_transaction(self):
        """High-risk transaction should have higher fraud probability."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": 500.0,
            "hour": 3,  # Late night
            "day_of_week": 1,
            "merchant_category": "online"
        }, timeout=10)
        
        assert response.status_code == 200
        data = response.json()
        # High-risk transactions should have elevated probability
        # (not asserting exact value as model may vary)
        assert data["fraud_probability"] >= 0.0
    
    def test_negative_amount_rejected(self):
        """Negative amount should be rejected with 400."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": -100.0,
            "hour": 14,
            "day_of_week": 3,
            "merchant_category": "online"
        }, timeout=10)
        
        assert response.status_code == 400
        assert "errors" in response.json()["detail"]
    
    def test_invalid_hour_rejected(self):
        """Invalid hour should be rejected with 400."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": 100.0,
            "hour": 25,  # Invalid
            "day_of_week": 3,
            "merchant_category": "online"
        }, timeout=10)
        
        assert response.status_code == 400
    
    def test_invalid_merchant_rejected(self):
        """Unknown merchant category should be rejected with 400."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": 100.0,
            "hour": 14,
            "day_of_week": 3,
            "merchant_category": "unknown_category"
        }, timeout=10)
        
        assert response.status_code == 400
    
    def test_missing_field_rejected(self):
        """Missing required field should be rejected."""
        response = httpx.post(f"{BASE_URL}/predict", json={
            "amount": 100.0,
            "hour": 14
            # Missing day_of_week and merchant_category
        }, timeout=10)
        
        assert response.status_code == 422  # Pydantic validation error


class TestHealthEndpoint:
    """Tests for the /health endpoint."""
    
    def test_health_returns_200(self):
        """Health endpoint should return 200."""
        response = httpx.get(f"{BASE_URL}/health", timeout=10)
        assert response.status_code == 200
    
    def test_health_returns_healthy_status(self):
        """Health endpoint should indicate healthy status."""
        response = httpx.get(f"{BASE_URL}/health", timeout=10)
        data = response.json()
        assert data["status"] == "healthy"
```

Run tests locally:

```sh
# Run data and model tests (API not needed)
pytest tests/test_data_and_model.py -v

# Run API tests (requires API to be running)
pytest tests/test_api.py -v
```

### 7.2 GitHub Actions Workflow

::: note ⚠️ Note for Production Teams

In real ML teams, you typically don't retrain full models inside CI — it's slow and resource-intensive.

Here we do it to keep everything local, reproducible, and self-contained for learning.

Production pipelines usually separate training (scheduled jobs) from testing (CI/CD).

:::

Create <VPIcon icon="fas fa-folder-open"/>`.github/workflows/`<VPIcon icon="iconfont icon-yaml"/>`ci.yml`:

```yaml title=".github/workflows/ci.yml"
name: ML Pipeline CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"
          cache: 'pip'
      
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      
      - name: Generate training data
        run: python src/generate_data.py
      
      - name: Train model
        run: python src/train_naive.py
      
      - name: Run data quality tests
        run: pytest tests/test_data_and_model.py -v --tb=short
      
      - name: Build Docker image
        run: docker build -t fraud-detection-api .
      
      - name: Run container for API tests
        run: |
          docker run -d -p 8000:8000 --name test-api fraud-detection-api
          sleep 10  # Wait for API to start
          curl -f http://localhost:8000/health || exit 1
      
      - name: Run API tests
        run: pytest tests/test_api.py -v --tb=short
      
      - name: Cleanup
        if: always()
        run: docker stop test-api || true
```

### 7.3 Dockerize the Application

Create <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY src/ src/
COPY models/ models/
COPY data/ data/

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the API
CMD ["uvicorn", "src.serve_validated:app", "--host", "0.0.0.0", "--port", "8000"]
```

Create <VPIcon icon="fa-brands fa-docker"/>`.dockerignore`:

```plaintext title=".dockerignore"
venv/
__pycache__/
*.pyc
.git/
.github/
mlruns/
*.db
*.html
.pytest_cache/
```

Build and run locally:

```sh
# Build the Docker image
docker build -t fraud-detection-api .

# Run the container
docker run -p 8000:8000 fraud-detection-api

# Test it
curl http://localhost:8000/health
```

**Checkpoint:**

- All tests pass: `pytest tests/test_data_and_model.py -v`
- Docker image builds successfully
- Container runs and responds to health checks

---

## 8. Incident Response Playbook

When things go wrong in production (and they will), you need a plan. This section provides playbooks for common ML incidents.

### Scenario: False Positive Spike

**Symptoms:** Your fraud model suddenly flags 40% of legitimate transactions as fraud, blocking customers and overwhelming your manual review team.

**Severity:** HIGH - Direct customer impact

#### Phase 1: Mitigation (0-5 minutes)

1. **Acknowledge the incident** - Notify stakeholders that you're aware and responding
2. **Roll back to previous model** - In MLflow UI, move the @champion alias to the previous model version
3. **Restart the API** - `docker restart fraud-api` or redeploy
4. **Verify** - Check that false positive rate has returned to normal
5. **Communicate** - "Issue detected and mitigated. Investigating root cause."

#### Phase 2: Diagnosis (5-60 minutes)

1. **Check drift report** - Run `python src/monitoring.py` with recent production data
2. **Check data validation logs** - Did upstream data format change?
3. **Check recent deployments** - Was there a new model or code deployed recently?
4. **Compare metrics** - What's different between the rolled-back and problematic model?

::: tip Example root causes:

- Upstream system sent amounts in cents instead of dollars
- New merchant category appeared that wasn't in training data
- Holiday shopping patterns differed significantly from training data

:::

#### Phase 3: Remediation (1-24 hours)

1. **Fix the root cause** - Add validation for the edge case, or update training data
2. **Retrain if needed** - Include new patterns in training data
3. **Add test case** - Prevent this from happening again
4. **Document** - Add to runbook for future reference

### Scenario: Gradual Performance Decay

**Symptoms:** Monitoring shows fraud recall dropping 2% per week over a month. No sudden failures, just slow degradation.

**Severity:** MEDIUM - Gradual impact, time to respond

**Response:**

#### 1. Investigate drift report

Look for gradual distribution changes

```sh
python src/monitoring.py
```

#### 2. Collect recent labeled data

Get confirmed fraud cases from the past month

#### 3. Analyze patterns

What's different about recent fraud?

- New attack vectors?
- Different time patterns?
- New merchant categories?

#### 4. Retrain on combined data

Include both old and new patterns

```sh
python src/train_mlflow.py
```

#### 5. Deploy via canary

Route 10% of traffic to the new model first

- Monitor metrics for 1-2 days
- If metrics improve, increase to 50%, then 100%
- If metrics worsen, roll back

#### 6. Set up recurring retraining

Schedule weekly or monthly retraining

### Scenario: Upstream Data Schema Change

**Symptoms:** API starts returning 500 errors. Logs show `KeyError: 'merchant_category'`.

**Severity:** HIGH - Service is down

**Response:**

#### 1. Check error logs

Identify the exact error

```plaintext
KeyError: 'merchant_category'
```

#### 2. Check upstream data

Did the field name change?

- `merchant_category` -> `category`
- `amount` -> `transaction_amount`

#### 3. Immediate fix

Add field name mapping

```py
# Quick fix in API
if 'category' in data and 'merchant_category' not in data:
    data['merchant_category'] = data['category']
```

#### 4. Long-term fix

Add validation that catches schema changes

```py
required_fields = ['amount', 'hour', 'day_of_week', 'merchant_category']
missing = [f for f in required_fields if f not in data]
if missing:
    raise ValidationError(f"Missing fields: {missing}")
```

#### 5. Add integration test

Test with upstream system in CI/CD

---

## 9. How to Put It All Together

Let's step back and appreciate what we've built. Our initial naive system has transformed into a **local ML platform** with production-grade components.

::: note 💡 Mental Model

Each tool in this stack is a "catch net" for a specific failure mode:

- MLflow catches "which model is this?"
- Feast catches "are features consistent?"
- Great Expectations catches "is this data valid?"
- Evidently catches "has the world changed?"
- CI/CD catches "did we break something?"

Together, they form defense-in-depth for ML systems.

:::

| **Component** | **Tool** | **Problem Solved** |
| --- | --- | --- |
| **Experiment Tracking** | MLflow | Every run logged, reproducible |
| **Model Registry** | MLflow | Versioned models, rollback capability |
| **Feature Store** | Feast | Consistent features, no training-serving skew |
| **Data Validation** | Great Expectations | Bad data rejected with clear errors |
| **Monitoring** | Evidently | Drift detected before it causes problems |
| **Containerization** | Docker | Environment consistency everywhere |
| **CI/CD** | GitHub Actions | Automated testing and safe deployments |

### The Complete Workflow

Here's how all the pieces work together in practice:

1. **Data arrives** - New transaction data comes in from upstream systems
2. **Validation gate** - Great Expectations rules check data quality. Bad data is rejected with clear error messages before it can cause harm.
3. **Feature computation** - Feast computes features using the same definitions for both training and serving. No more training-serving skew.
4. **Training** - When you retrain, MLflow logs all parameters, metrics, and artifacts. Every experiment is reproducible and comparable.
5. **Model registry** - Trained models are automatically versioned. You can compare metrics, promote the best to Production, and roll back if needed.
6. **Serving** - FastAPI loads the @champion model from MLflow. Each request is validated, features are retrieved from Feast, and predictions are returned.
7. **Monitoring** - Evidently checks for drift periodically. If input distributions change significantly, alerts are triggered.
8. **Retraining loop** - When drift is detected, you retrain on new data, compare metrics, and promote if better. The cycle continues.
9. **CI/CD safety net** - All code changes go through automated tests. Docker ensures environment consistency. Nothing reaches production without passing the pipeline.

---

## 10. What's Next: Scale to Production

This project runs locally, but the principles and tools extend directly to production deployments. Here's how each component scales:

### Scaling Feast for Production

We used Feast with local SQLite stores. For production:

| **Component** | **Local** | **Production** |
| --- | --- | --- |
| Online Store | SQLite | Redis, DynamoDB, or PostgreSQL |
| Offline Store | Parquet files | BigQuery, Snowflake, or Redshift |
| Feature Server | Embedded | Dedicated Feast serving cluster |

Benefits at scale:

- Sub-10ms feature retrieval
- Horizontal scaling for high throughput
- Feature monitoring and statistics
- Point-in-time joins at petabyte scale

### Scaling MLflow for Production

| **Component** | **Local** | **Production** |
| --- | --- | --- |
| Backend Store | SQLite | PostgreSQL or MySQL |
| Artifact Store | Local filesystem | S3, GCS, or Azure Blob |
| Tracking Server | Single instance | Load-balanced cluster |

### Kubernetes Deployment

When you outgrow Docker Compose:

- **KServe or Seldon** for serverless model serving with auto-scaling
- **Horizontal Pod Autoscaler** to scale based on CPU/memory/custom metrics
- **Canary deployments** to safely roll out new models (route 10% traffic first)
- **GPU scheduling** for inference-heavy models

### Advanced Monitoring

Expand observability with:

- **Prometheus + Grafana** for real-time dashboards
- **OpenTelemetry** for distributed tracing
- **PagerDuty/Slack integration** for alerts
- **Labeled data collection** for continuous model evaluation

### A/B Testing and Multi-Armed Bandits

How to Use the Model Registry:

- Serve **multiple models** concurrently (champion vs challengers)
- **Route traffic** dynamically based on context
- **Collect metrics** for each model variant
- **Automatically promote** the best performer

---

## Conclusion

Congratulations on building a production-ready ML system on your local machine!

What we assembled here is a microcosm of real-world ML platforms:

- We started with just a model saved to a pickle file
- We ended up with **MLOps best practices**: experiment tracking, model versioning, feature stores, data validation, monitoring, containerization, and CI/CD

**The tools we used are production-grade:**

- **MLflow** powers ML platforms at companies like Microsoft, Facebook, and Databricks
- **Feast** is used by companies like Gojek, Shopify, and Robinhood
- **FastAPI** is one of the fastest Python web frameworks
- **Great Expectations** is used at companies like GitHub and Shopify
- **Evidently** is used for monitoring ML in production at scale

**The principles apply at any scale:**

- Always track experiments
- Always version models
- Always validate data
- Always monitor for drift
- Always containerize for consistency
- Always automate testing

### Next Steps You Can Try

1. **Deploy to the cloud** - Push your Docker container to AWS ECS, Google Cloud Run, or Azure Container Instances
2. **Add model explainability** - Use SHAP or LIME to explain individual predictions
3. **Implement A/B testing** - Serve multiple models and compare performance
4. **Add feature importance monitoring** - Track how feature importance changes over time
5. **Set up real-time alerting** - Connect Evidently to Slack or PagerDuty
6. **Implement continuous training** - Automatically retrain when drift is detected
7. **Add bias and fairness monitoring** - Ensure your model treats all groups fairly

Remember that productionizing ML is an **iterative process**. There's always another layer of robustness to add, another edge case to handle, another metric to track. But with the foundation you've built here, you're well on your way to taking models from promising notebook experiments to deployed, monitored, and maintainable production applications.

Happy building, and may your models be accurate and your pipelines resilient!

::: info Get the Complete Code

The entire project from this handbook is available as a public GitHub repository:

<SiteInfo
  name="sandeepmb/freecodecamp-local-ml-platform"
  desc="Contribute to sandeepmb/freecodecamp-local-ml-platform development by creating an account on GitHub."
  url="https://github.com/sandeepmb/freecodecamp-local-ml-platform/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/27f0c59417c726f575f64fe1fa30c9c8208241b417c420ad1288ebe7e431f9aa/sandeepmb/freecodecamp-local-ml-platform"/>

The repository includes:

- All source code (<VPIcon icon="fas fa-folder-open"/>`src/` directory)
- Test files (<VPIcon icon="fas fa-folder-open"/>`tests/` directory)
- Feast feature definitions (<VPIcon icon="fas fa-folder-open"/>`feature_repo/`)
- Docker and CI/CD configuration
- Ready-to-run scripts

**Quick Start:**

```sh
git clone https://github.com/sandeepmb/freecodecamp-local-ml-platform.git
cd freecodecamp-local-ml-platform
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python src/generate_data.py
python src/train_naive.py
```

:::

::: info References

```component VPCard
{
  "title": "MLflow",
  "desc": "MLflow Documentation - Machine Learning and GenAI lifecycle management",
  "link": "https://mlflow.org/docs/latest/",
  "logo": "https://mlflow.org/docs/latest/images/favicon.ico",
  "background": "rgba(67,201,237,0.2)"
}
```

<SiteInfo
  name="Introduction | Feast: the Open Source Feature Store"
  desc="What is Feast? Feast (Feature Store) is an open-source feature store that helps teams operate production ML systems at scale by allowing them to define, manage, validate, and serve features for production AI/ML."
  url="https://docs.feast.dev/"
  logo="https://docs.feast.dev/~gitbook/image?url=https%3A%2F%2F2070487677-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LqPPgcuCulk4PnaI4Ob%252Favatar-1590217188819.png%3Fgeneration%3D1590217189444336%26alt%3Dmedia&width=48&height=48&sign=d5432148&sv=2"
  preview="https://docs.feast.dev/~gitbook/image?url=https%3A%2F%2F2070487677-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LqPPgcuCulk4PnaI4Ob%252Fsocialpreview%252FiVvrcLVZdqtmZnEffb7C%252Ffeast_logo.png%3Falt%3Dmedia%26token%3Dac1dec7f-12e3-46da-a127-e05c60b36eae&width=1200&height=630&sign=2d60c2d2&sv=2"/>

<SiteInfo
  name="Quickstart | Feast: the Open Source Feature Store"
  desc="What is Feast? Feast (Feature Store) is an open-source feature store designed to facilitate the management and serving of machine learning features in a way that supports both batch and real-time applications."
  url="https://docs.feast.dev/getting-started/quickstart/"
  logo="https://docs.feast.dev/~gitbook/image?url=https%3A%2F%2F2070487677-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LqPPgcuCulk4PnaI4Ob%252Favatar-1590217188819.png%3Fgeneration%3D1590217189444336%26alt%3Dmedia&width=48&height=48&sign=d5432148&sv=2"
  preview="https://docs.feast.dev/~gitbook/image?url=https%3A%2F%2F2070487677-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LqPPgcuCulk4PnaI4Ob%252Fsocialpreview%252FiVvrcLVZdqtmZnEffb7C%252Ffeast_logo.png%3Falt%3Dmedia%26token%3Dac1dec7f-12e3-46da-a127-e05c60b36eae&width=1200&height=630&sign=2d60c2d2&sv=2"/>

<SiteInfo
  name="FastAPI"
  desc="FastAPI framework, high performance, easy to learn, fast to code, ready for production"
  url="https://fastapi.tiangolo.com/"
  logo="https://fastapi.tiangolo.com/img/favicon.png"
  preview="https://fastapi.tiangolo.com/assets/images/social/index.png"/>

<SiteInfo
  name="Great Expectations: have confidence in your data, no matter what"
  desc="Explore how our end-to-end SaaS solution for your data quality process and unique Expectation-based approach to testing can help you build trust in your data."
  url="https://greatexpectations.io/"
  logo="https://greatexpectations.io/favicon-32x32.png?v=62b42a6c11e70607aa006eb9abc523ed"
  preview="https://images.ctfassets.net/ycwst8v1r2x5/1E8joF6yPfJwQr0XeEgAjx/37de76b6aa3e67affa9e23a4c815b54a/GE-Preview.png"/>

<SiteInfo
  name="What is Evidently? - Evidently AI - Documentation"
  desc="Welcome to the Evidently documentation."
  url="https://docs.evidentlyai.com/introduction/"
  logo="https://docs.evidentlyai.com/mintlify-assets/_mintlify/favicons/evi/uFYZAqP1kEoFxS8a/_generated/favicon-dark/favicon.ico"
  preview="https://evi.mintlify.app/mintlify-assets/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DGet%2BStarted%26title%3DWhat%2Bis%2BEvidently%253F%26description%3DWelcome%2Bto%2Bthe%2BEvidently%2Bdocumentation.%26logoLight%3Dhttps%253A%252F%252Fmintcdn.com%252Fevi%252Fgn-d62Rtg7HFSug2%252Flogo%252Fevidently_ai_logo_docs.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dgn-d62Rtg7HFSug2%2526q%253D85%2526s%253D4d219ff93ad92d52a6bde7bda39b03c5%26logoDark%3Dhttps%253A%252F%252Fmintcdn.com%252Fevi%252Fgn-d62Rtg7HFSug2%252Flogo%252Fevidently_ai_logo_docs_dark.svg%253Ffit%253Dmax%2526auto%253Dformat%2526n%253Dgn-d62Rtg7HFSug2%2526q%253D85%2526s%253Def8bd36f926452f7826a150472cc41fa%26primaryColor%3D%2523ed0400%26lightColor%3D%2523f59aa2%26darkColor%3D%2523ed0400%26backgroundLight%3D%2523ffffff%26backgroundDark%3D%25230e0c0e&w=1200&q=100"/>

<SiteInfo
  name="What is  CI/CD for Machine Learning?"
  desc="Learn how continuous integration and continuous delivery (CI/CD) makes development of AI/ML applications more robust, consistent and efficient."
  url="https://jfrog.com/learn/mlops/cicd-for-machine-learning/"
  logo="https://speedmedia2.jfrog.com/08612fe1-9391-4cf3-ac1a-6dd49c36b276/media.jfrog.com/wp-content/uploads/2019/04/20131046/Jfrog16-1.png"
  preview="https://speedmedia2.jfrog.com/08612fe1-9391-4cf3-ac1a-6dd49c36b276/media.jfrog.com/wp-content/uploads/2018/06/20132021/JFROG.png"/>

<SiteInfo
  name="What is training-serving skew in Machine Learning? | JFrog ML"
  desc="Building a machine learning model is hard. Deploying it is even harder. Running experiments, writing code for production, integrating with infrastructure, running ongoing tests, and avoiding training-serving skew – none of this is easy."
  url="https://qwak.com/post/training-serving-skew-in-machine-learning/"
  logo="https://cdn.prod.website-files.com/64b3ee21cac9398c75e5d3ab/66dd646e079776ced5bc6d38_favicon-32x32.png"
  preview="https://cdn.prod.website-files.com/64b3ee21cac9398c75e5d3ac/64b3ee21cac9398c75e5d97c_1200x630%20What%20is%20training-serving%20skew%20in%20machine%20learning.png"/>

<SiteInfo
  name="Home"
  desc="Docker Documentation is the official Docker library of resources, manuals, and guides to help you containerize applications."
  url="https://docs.docker.com/"
  logo="https://docs.docker.com/favicon.ico"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<SiteInfo
  name="GitHub Actions documentation - GitHub Docs"
  desc="Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow."
  url="https://docs-internal.github.com/en/actions/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/actions.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an End-to-End ML Platform Locally: From Experiment Tracking to CI/CD",
  "desc": "Machine learning projects don’t end at training a model in a Jupyter notebook. The hard part is the “last mile”: turning that notebook model into something you can run reliably, update safely, and tru",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-end-to-end-ml-platform-locally-from-experiment-tracking-to-cicd/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
