---
lang: en-US
title: "How to Build a Machine Learning System on Serverless Architecture"
description: "Article(s) > How to Build a Machine Learning System on Serverless Architecture"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Python
  - PyTorch
  - Pandas
  - NumPy
  - Flask
  - Node.js
  - React.js
  - DevOps
  - AWS
  - Docker
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - py
  - python
  - torch
  - py-torch
  - pandas
  - py-pandas
  - numpy
  - py-numpy
  - flask
  - py-flask
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - devops
  - amazon
  - aws
  - amazon-web-services
  - docker
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Machine Learning System on Serverless Architecture"
    - property: og:description
      content: "How to Build a Machine Learning System on Serverless Architecture"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-machine-learning-system-on-serverless-architecture/
prev: /academics/system-design/articles/README.md
date: 2025-08-27
isOriginal: false
author:
  - name: Kuriko Iwai
    url : https://freecodecamp.org/news/author/kuriko/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756225357023/04572f1b-b9a7-43e0-aabc-2842faa2703f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
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
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
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
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Machine Learning System on Serverless Architecture"
  desc="Let’s say you’ve built a fantastic machine learning model that performs beautifully in notebooks. But a model isn’t truly valuable until it’s in production, serving real users and solving real problems. In this article, you’ll learn how to ship a pro..."
  url="https://freecodecamp.org/news/how-to-build-a-machine-learning-system-on-serverless-architecture"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756225357023/04572f1b-b9a7-43e0-aabc-2842faa2703f.png"/>

Let’s say you’ve built a fantastic machine learning model that performs beautifully in notebooks.

But a model isn’t truly valuable until it’s in production, serving real users and solving real problems.

In this article, you’ll learn how to ship a production-ready ML application built on serverless architecture.

- [What We’re Building](#heading-what-were-building)
- [The System Architecture](#heading-the-system-architecture)
- [The Deployment Workflow in Action](#heading-the-deployment-workflow-in-action)
- [Building a Client Application (Optional)](#heading-building-a-client-application-optional)

::: note Prerequisites

This project requires some basic experience with:

- **Machine Learning / Deep Learning**: The full lifecycle, including data handling, model training, tuning, and validation.
- **Coding**: Proficiency in Python, with experience using major ML libraries such as PyTorch and Scikit-Learn.
- **Full-stack deployment**: Experience deploying applications using RESTful APIs.

:::

---

## What We’re Building

### AI Pricing for Retailers

This project aims to help a middle-sized retailer compete with large players like Amazon.

Smaller companies often can’t afford significant price discounts, so they can face challenges finding optimal price points as they expand their product lines.

Our goal is to leverage AI models to recommend the best price for a selected product to maximize sales for the retailer, and display it on a client-side user interface (UI):

![What the UI will look like](https://cdn.hashnode.com/res/hashnode/image/upload/v1755873936847/ecf696ef-e161-4453-a6ad-e97d92ac1677.png)

You can explore the UI from [<FontIcon icon="fas fa-globe"/>here](https://kuriko-iwai.vercel.app/online-commerce-intelligence-hub).

### The Models

I’ll train and tune multiple models so that when the primary model fails, a backup model gets loaded to serve predictions.

- **Primary Model**: Multi-layered feedforward network (on the **PyTorch** library)
- **Backup Models (Backups)**: LightGBM, SVR, and Elastic Net (on the **Scikit-Learn** library)

The backup models are prioritized based on learning capabilities.

### Tuning and Training

The primary model was trained on a dataset of around 500,000 samples ([<FontIcon icon="fas fa-globe"/>source)](https://archive.ics.uci.edu/dataset/352/online+retail) and fine-tuned using `Optuna`'s Bayesian Optimization, with grid search available for further refinement.

The backups are also trained on the same samples and tuned using the `Scikit-Optimize` framework.

### The Prediction

All models serve predictions on **logged quantity values.**

Logarithmic transformations of the quantity data make the distribution denser, which helps models learn patterns more effectively. This is because logarithms reduce the impact of extreme values, or outliers, and can help normalize skewed data.

### Performance Validation

We’ll evaluate model performance using different metrics for the transformed and original data, with a lower value always indicating better performance.

- **Logged values**: Mean Squared Error (MSE)
- **Actual values**: Root Mean Squared Log Error (RMSLE) and Mean Absolute Error (MAE)

---

## The System Architecture

We’re going to build a complete ecosystem around an **AWS Lambda function** to create a scalable ML system:

![Fig. The system architecture (Created by [<FontIcon icon="fas fa-globe"/>Kuriko IWAI](https://kuriko-iwai.vercel.app/))](https://miro.medium.com/v2/resize:fit:4680/0*ulcNtwJeU5EOfhTg.png)

**AWS Lambda** is a **serverless production** where a service provider can run the application without managing servers. Once they upload the code, AWS takes on the responsibility of managing the underlying infrastructure.

In the serverless production, the code is deployed as **a stateless function** that runs only when it’s triggered by an event like HTTP requests or scheduled tasks.

This event-driven nature makes serverless production extremely efficient in resource allocation because:

- **There’s no server management**: The cloud provider takes care of operational tasks.
- **You have automatic scaling**: Serverless applications automatically scale up or down based on demand.
- **You have pay-per-use billing**: Charged for the exact amount of compute resources the application consumes.

Note that other cloud ecosystems like Google Cloud Platform (GCP) and Microsoft Azure offer comprehensive alternatives to AWS. Which one you choose depends on your budget, project type, and familiarity with each ecosystem.

### Core AWS Resources in the Architecture

The system architecture focuses on the following points:

- The application is fully containerized on Docker for universal accessibility.
- The container image is stored in AWS Elastic Container Registry (ECR).
- The API Gateway’s REST API endpoints trigger an event to invoke the Lambda function.
- The Lambda function loads the container image from ECR and perform inference.
- Trained models, processors, and input features are stored in AWS S3 buckets.
- A Redis client serves cached analytical data and past predictions stored in the ElastiCache.

And to build the system, we’ll use the following AWS resources:

- **Lamda**: Serves a function to perform inference.
- **API Gateway**: Routes API calls to the Lambda function.
- **S3 Storage**: Serves feature store and model store.
- **ElastiCache**: Store cached predictions and analytical data.
- **ECR**: Stores Docker container images to allow Lambda to pull the image.

Each resource requires configuration. I’ll explore those details in the next section.

---

## The Deployment Workflow in Action

The deployment workflow involves the following steps:

1. Draft data preparation, model training, and serialization scripts
2. Configure designated feature store and model store in S3
3. Create a Flask application with API endpoints
4. Publish a Docker image to ECR
5. Create a Lambda function
6. Configure related AWS resources

We’ll now walk through each of these steps to help you fully understand the process.

For your reference, here is the repository structure:

```sh title="file structure"
.
.venv/                  [.gitignore]    # stores uv venv
│
└── data/               [.gitignore]
│     └──raw/                           # stores raw data
│     └──preprocessed/                  # stores processed data after imputation and engineering
│
└── models/             [.gitignore]    # stores serialized model after training and tuning
│     └──dfn/                           # deep feedforward network
│     └──gbm/                           # light gbm
│     └──en/                            # elastic net
│     └──production/                    # models to be stored in S3 for production use
|
└── notebooks/                          # stores experimentation notebooks
│
└── src/                                # core functions
│     └──_utils/                        # utility functions
│     └──data_handling/                 # functions to engineer features
│     └──model/                         # functions to train, tune, validate models
│     │     └── sklearn_model
│     │     └── torch_model
│     │     └── ...
│     └──main.py                        # main script to run the inference locally
│
└──app.py                               # Flask application (API endpoints)
└──pyproject.toml                       # project configuration
└──.env                [.gitignore]     # environment variables
└──uv.lock                              # dependency locking
└──Dockerfile                           # for Docker container image
└──.dockerignore
└──requirements.txt
└──.python-version                      # python version locking (3.12)
```

### Step 1: Draft Python Scripts

The first step is to draft Python scripts for data preparation, model training and tuning.

We’ll run these scripts in a **batch process** because these are resource-intensive and stateful tasks that aren’t suitable for serverless functions optimized for short-lived, stateless, and event-driven tasks.

Serverless functions also can experience [**cold starts**](/freecodecamp.org/cold-start-problem-in-recommender-systems.md). With heavy tasks in the function, the API gateway would timeout before serving predictions.

```py :collapsed-lines title="main.py"
import os
import torch
import warnings
import pickle
import joblib
import numpy as np
import lightgbm as lgb
from sklearn.linear_model import ElasticNet
from sklearn.svm import SVR
from skopt.space import Real, Integer, Categorical
from dotenv import load_dotenv

import src.data_handling as data_handling
import src.model.torch_model as t
import src.model.sklearn_model as sk


if __name__ == '__main__': 
    load_dotenv(override=True)
    os.makedirs(PRODUCTION_MODEL_FOLDER_PATH, exist_ok=True)

    # create train, validation, test datasets
    X_train, X_val, X_test, y_train, y_val, y_test, preprocessor = data_handling.main_script()

    # store the trained preprocessor in local storage
    joblib.dump(preprocessor, PREPROCESSOR_PATH)

    # model tuning and training
    best_dfn_full_trained, checkpoint = t.main_script(X_train, X_val, y_train, y_val)

    # serialize the trained model
    torch.save(checkpoint, DFN_FILE_PATH)

    # svr
    best_svr_trained, best_hparams_svr = sk.main_script(
        X_train, X_val, y_train, y_val, **sklearn_models[1]
    )
    if best_svr_trained is not None:
        with open(SVR_FILE_PATH, 'wb') as f:
            pickle.dump({ 'best_model': best_svr_trained, 'best_hparams': best_hparams_svr }, f)

    # elastic net
    best_en_trained, best_hparams_en = sk.main_script(
        X_train, X_val, y_train, y_val, **sklearn_models[0]
    )
    if best_en_trained is not None:
        with open(EN_FILE_PATH, 'wb') as f:
            pickle.dump({ 'best_model': best_en_trained, 'best_hparams': best_hparams_en }, f)

    # light gbm
    best_gbm_trained, best_hparams_gbm = sk.main_script(
        X_train, X_val, y_train, y_val, **sklearn_models[2]
    )

    if best_gbm_trained is not None:
        with open(GBM_FILE_PATH, 'wb') as f:
            pickle.dump({'best_model': best_gbm_trained, 'best_hparams': best_hparams_gbm }, f)
```

Run the script to train and serialize the models using the `uv` package management:

```sh
uv venv
source .venv/bin/activate
uv run src/main.py
```

The <FontIcon icon="fa-brands fa-python"/>`main.py` script includes several key components.

#### Scripts for Data Handling

These scripts involve loading original data, structure missing values, and engineer features necessary for the future prediction.

```py :collapsed-lines title="data_handling/main.py"
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

import src.data_handling.scripts as scripts
from src._utils import main_logger


# load and save the original data frame in parquet
df = scripts.load_original_dataframe()
df.to_parquet(ORIGINAL_DF_PATH, index=False)

# imputation
df = scripts.structure_missing_values(df=df)

# feature engineering
df = scripts.handle_feature_engineering(df=df)

# save processed df in csv and parquet
scripts.save_df_to_csv(df=df)
df.to_parquet(PROCESSED_DF_PATH, index=False)


# for preprocessing, classify numerical and categorical columns
num_cols, cat_cols = scripts.categorize_num_cat_cols(df=df, target_col=target_col)
if cat_cols:
    for col in cat_cols: df[col] = df[col].astype('string')

# creates training, validation, and test datasets (test dataset is for inference only)
y = df[target_col]
X = df.copy().drop(target_col, axis='columns')
test_size, random_state = 50000, 42
X_tv, X_test, y_tv, y_test = train_test_split(
    X, y, test_size=test_size, random_state=random_state
)
X_train, X_val, y_train, y_val = train_test_split(
    X_tv, y_tv, test_size=test_size, random_state=random_state
)

# transform the input datasets
X_train, X_val, X_test, preprocessor = scripts.transform_input(
    X_train, X_val, X_test, num_cols=num_cols, cat_cols=cat_cols
)

# retrain and serialize the preprocessor
if preprocessor is not None: preprocessor.fit(X)
joblib.dump(preprocessor, PREPROCESSOR_PATH)
```

#### Scripts for Model Training and Tuning (PyTorch Model)

The scripts involve initiating the model, searching optimal neural architecture and hyperparameters, and serializing the fully-trained model so that the system can load the trained model when performing inference.

Because the primary model is built on PyTorch and the backups use Scikit-Learn, we’re drafting the scripts separately.

#### 1. PyTorch Models

**The training script** contains training the model with the validation over a subset of training data.

It contains the early stopping logic when the loss history is not improved for a given consecutive epochs (that is, 10 epochs).

```py :collapsed-lines title="model/torch_model/scripts/training.py"
import torch
import torch.nn as nn
import optuna # type: ignore
from sklearn.model_selection import train_test_split

from src._utils import main_logger

# device
device_type = device_type if device_type else 'cuda' if torch.cuda.is_available() else 'mps' if torch.backends.mps.is_available() else 'cpu'
device = torch.device(device_type)

# gradient scaler for stability (only applicable for cuba)
scaler = torch.GradScaler(device=device_type) if device_type == 'cuba' else None

# start training
best_val_loss = float('inf')
epochs_no_improve = 0
for epoch in range(num_epochs):
    model.train()
    for batch_X, batch_y in train_data_loader:
        batch_X, batch_y = batch_X.to(device), batch_y.to(device)
        optimizer.zero_grad()

        try:
            # pytorch's AMP system automatically handles the casting of tensors to Float16 or Float32
            with torch.autocast(device_type=device_type):
                outputs = model(batch_X)
                loss = criterion(outputs, batch_y)

                # break the training loop when models return nan or inf
                if torch.any(torch.isnan(outputs)) or torch.any(torch.isinf(outputs)):
                    main_logger.error(
                        'pytorch model returns nan or inf. break the training loop.'
                    )
                    break

            # create scaled gradients of losses
            if scaler is not None:
                scaler.scale(loss).backward()
                scaler.unscale_(optimizer)  # cliping grad
                nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
                scaler.step(optimizer)  # unscales the gradients
                scaler.update()  # updates the scale

            else:
                loss.backward()
                nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) # cliping grad
                optimizer.step()

        except:
            outputs = model(batch_X)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()


    # run validation on a subset of the training dataset
    model.eval()
    val_loss = 0.0

    # switch the torch mode
    with torch.inference_mode():
        for batch_X_val, batch_y_val in val_data_loader:
            batch_X_val, batch_y_val = batch_X_val.to(device), batch_y_val.to(device)
            outputs_val = model(batch_X_val)
            val_loss += criterion(outputs_val, batch_y_val).item()

    val_loss /= len(val_data_loader)

    # check if early stop
    if val_loss < best_val_loss - min_delta:
        best_val_loss = val_loss
        epochs_no_improve = 0
    else:
        epochs_no_improve += 1
        if epochs_no_improve >= patience:
            main_logger.info(f'early stopping at epoch {epoch + 1}')
            break
```

**The tuning script** uses the `study` component from the `Optuna` library to run the Bayesian Optimization.

The `study` component choose a neural architecture and hyperparameter set to test from the global search space.

Then, it builds, trains, and validates the model to find the optimal neural architecture that can minimize the loss (MSE, for instance).

```py :collapsed-lines title="model/torch_model/scripts/tuning.py"
import itertools
import pandas as pd
import numpy as np
import optuna
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split

from src.model.torch_model.scripts.pretrained_base import DFN
from src.model.torch_model.scripts.training import train_model
from src._utils import main_logger

# device
device_type = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
device = torch.device(device_type)

# loss function
criterion = nn.MSELoss()

# define objective function for optuna
def objective(trial):
    # model
    num_layers = trial.suggest_int('num_layers', 1, 20)
    batch_norm = trial.suggest_categorical('batch_norm', [True, False])
    dropout_rates = []
    hidden_units_per_layer = []
    for i in range(num_layers):
        dropout_rates.append(trial.suggest_float(f'dropout_rate_layer_{i}', 0.0, 0.6))
        hidden_units_per_layer.append(trial.suggest_int(f'n_units_layer_{i}', 8, 256)) # hidden units per layer

    model = DFN(
        input_dim=X_train.shape[1],
        num_layers=num_layers,
        dropout_rates=dropout_rates,
        batch_norm=batch_norm,
        hidden_units_per_layer=hidden_units_per_layer
    ).to(device)

    # optimizer
    learning_rate = trial.suggest_float('learning_rate', 1e-10, 1e-1, log=True)
    optimizer_name = trial.suggest_categorical('optimizer', ['adam', 'rmsprop', 'sgd', 'adamw', 'adamax', 'adadelta', 'radam'])
    optimizer = _handle_optimizer(optimizer_name=optimizer_name, model=model, lr=learning_rate)

    # data loaders
    batch_size = trial.suggest_categorical('batch_size', [32, 64, 128, 256])
    test_size = 10000 if len(X_train) > 15000 else int(len(X_train) * 0.2)
    X_train_search, X_val_search, y_train_search, y_val_search = train_test_split(X_train, y_train, test_size=test_size, random_state=42)
    train_data_loader = create_torch_data_loader(X=X_train_search, y=y_train_search, batch_size=batch_size)
    val_data_loader = create_torch_data_loader(X=X_val_search, y=y_val_search, batch_size=batch_size)

    # training
    num_epochs = 3000 # ensure enough epochs (early stopping would stop the loop when overfitting)
    _, best_val_loss = train_model(
        train_data_loader=train_data_loader,
        val_data_loader=val_data_loader,
        model=model,
        optimizer=optimizer,
        criterion = criterion,
        num_epochs=num_epochs,
        trial=trial,
    )
    return best_val_loss


# start to optimize hyperparameters and architecture
study = optuna.create_study(direction='minimize', sampler=optuna.samplers.TPESampler())
study.optimize(objective, n_trials=50, timeout=600)

# best 
best_trial = study.best_trial
best_hparams = best_trial.params

# construct the model based on the tuning results
best_lr = best_hparams['learning_rate']
best_batch_size = best_hparams['batch_size']
input_dim = X_train.shape[1]
best_model = DFN(
    input_dim=input_dim,
    num_layers=best_hparams['num_layers'],
    hidden_units_per_layer=[v for k, v in best_hparams.items() if 'n_units_layer_' in k],
    batch_norm=best_hparams['batch_norm'],
    dropout_rates=[v for k, v in best_hparams.items() if 'dropout_rate_layer_' in k],
).to(device)

# construct an optimizer based on the tuning results
best_optimizer_name = best_hparams['optimizer']
best_optimizer = _handle_optimizer(
    optimizer_name=best_optimizer_name, model=best_model, lr=best_lr
)

# create torch data loaders
train_data_loader = create_torch_data_loader(
    X=X_train, y=y_train, batch_size=best_batch_size
)
val_data_loader = create_torch_data_loader(
    X=X_val, y=y_val, batch_size=best_batch_size
)

# retrain the best model with full training dataset applying the optimal batch size and optimizer
best_model, _ = train_model(
    train_data_loader=train_data_loader,
    val_data_loader=val_data_loader,
    model=best_model,
    optimizer=best_optimizer,
    criterion = criterion,
    num_epochs=1000
)

# create a checkpoint for serialization (reconstruct the model using the checkpoint)
checkpoint = {
    'state_dict': best_model.state_dict(),
    'hparams': best_hparams,
    'input_dim': X_train.shape[1],
    'optimizer': best_optimizer,
    'batch_size': best_batch_size
}

# serialize the model w/ checkpoint
torch.save(checkpoint, FILE_PATH)
```

#### 2. Scikit-Learn Models (Backups)

For Scikit-Learn models, we’ll run **k-fold cross validation** during training to prevent overfitting.

K-fold cross-validation is a technique for evaluating a machine learning model's performance by training and testing it on different subsets of training data.

We define the `run_kfold_validation` function where the model is trained and validated using **5-fold cross-validation**.

```py :collapsed-lines title="model/sklearn_model/scripts/tuning.py"
from sklearn.model_selection import KFold
from sklearn.metrics import mean_squared_error

def run_kfold_validation(
        X_train,
        y_train,
        base_model,
        hparams: dict,
        n_splits: int = 5, # the number of folds 
        early_stopping_rounds: int = 10,
        max_iters: int = 200
    ) -> float:

    mses = 0.0

    # create k-fold component
    kf = KFold(n_splits=n_splits, shuffle=True, random_state=42)

    for fold, (train_index, val_index) in enumerate(kf.split(X_train)):
        # create a subset of training and validation datasets from the entire training data
        X_train_fold, X_val_fold = X_train.iloc[train_index], X_train.iloc[val_index]
        y_train_fold, y_val_fold = y_train.iloc[train_index], y_train.iloc[val_index]

        # reconstruct a model
        model = base_model(**hparams)

        # start the cross validation
        best_val_mse = float('inf')
        patience_counter = 0
        best_model_state = None
        best_iteration = 0

        for iteration in range(max_iters):
            # train on a subset of the training data
            try:
                model.train_one_step(X_train_fold, y_train_fold, iteration)
            except:
                model.fit(X_train_fold, y_train_fold)

            # make a prediction on validation data 
            y_pred_val_kf = model.predict(X_val_fold)

            # compute validation loss (MSE)
            current_val_mse = mean_squared_error(y_val_fold, y_pred_val_kf)

            # check if epochs should be stopped (early stopping)
           if current_val_mse < best_val_mse:
                best_val_mse = current_val_mse
                patience_counter = 0
                best_model_state = model.get_params()
                best_iteration = iteration
           else:
                patience_counter += 1

           # execute early stopping when patience_counter exceeds early_stopping_rounds
           if patience_counter >= early_stopping_rounds:
                main_logger.info(f"Fold {fold}: Early stopping triggered at iteration {iteration} (best at {best_iteration}). Best MSE: {best_val_mse:.4f}")
                break


        # after training epochs, reconstruct the best performing model 
        if best_model_state: model.set_params(**best_model_state)

        # make prediction
        y_pred_val_kf = model.predict(X_val_fold)

        # add MSEs
        mses += mean_squared_error(y_pred_val_kf, y_val_fold)

    # compute the final loss (avarage of MSEs across folds)
    ave_mse = mses / n_splits
    return ave_mse
```

Then, for the **tuning script**, we use the `gp_minimize` function from the `Scikit-Optimize` library.

The `gp_minimize` function is used to tune hyperparameters with Bayesian optimization.

This function intelligently searches the best hyperparameter set that can minimize the model's error, which is calculated using the `run_kfold_validation` function defined earlier.

The best-performing hyperparameters are then used to reconstruct and train the final model.

```py :collapsed-lines title="model/sklearn_model/scripts/tuning.py"
from functools import partial
from skopt import gp_minimize


# define the objective function for Bayesian Optimization using Scikit-Optimize
def objective(params, X_train, y_train, base_model, hparam_names):
    hparams = {item: params[i] for i, item in enumerate(hparam_names)}
    ave_mse = run_kfold_validation(X_train=X_train, y_train=y_train, base_model=base_model, hparams=hparams)
    return ave_mse

# create the search space
hparam_names = [s.name for s in space]
objective_partial = partial(objective, X_train=X_train, y_train=y_train, base_model=base_model, hparam_names=hparam_names)

# search the optimal hyperparameters
results = gp_minimize(
    func=objective_partial,
    dimensions=space,
    n_calls=n_calls,
    random_state=42,
    verbose=False,
    n_initial_points=10,
)
# results
best_hparams = dict(zip(hparam_names, results.x))
best_mse = results.fun

# reconstruct the model with the best hyperparameters
best_model = base_model(**best_hparams)

# retrain the model with full training dataset
best_model.fit(X_train, y_train)
```

### Step 2: Configure Feature/Model Stores in S3

The trained models and processed data are stored in the S3 bucket as a **Parquet file**.

We’ll draft the `s3_upload` function where the **Boto3 client**, a low-level interface to an AWS service, initiates the connection to S3:

```py
import os
import boto3
from dotenv import load_dotenv

from src._utils import main_logger

def s3_upload(file_path: str):
    # initiate the boto3 client
    load_dotenv(override=True)
    S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME') # the bucket created in s3
    s3_client = boto3.client('s3', region_name=os.environ.get('AWS_REGION_NAME')) # your default region

    if s3_client:
        # create s3 key and upload the file to the bucket
        s3_key = file_path if file_path[0] != '/' else file_path[1:]
        s3_client.upload_file(file_path, S3_BUCKET_NAME, s3_key)
        main_logger.info(f"file uploaded to s3://{S3_BUCKET_NAME}/{s3_key}")
    else:
        main_logger.error('failed to create an S3 client.')
```

#### Model Store

Trained PyTorch models are serialized (converted) into `.pth` files.

Then, these files are uploaded to the S3 bucket, enabling the system to load the trained model when it performs inference in production.

```py
import torch

from src._utils import s3_upload

# model serialization, store in local
torch.save(trained_model.state_dict(), MODEL_FILE_PATH)

# upload to s3 model store
s3_upload(file_path=MODEL_FILE_PATH)
```

#### Feature Store

The processed data is converted into a CSV and Parquet file format.

Then, the Parquet files are uploaded to the S3 bucket, enabling the system to load the lightweight data when it creates prediction data to perform inference in production.

```py
from src._utils import s3_upload

# store csv and parquet files in local
df.to_csv(file_path, index=False)
df.to_parquet(DATA_FILE_PATH, index=False)

# store in s3 feature store
s3_upload(file_path=DATA_FILE_PATH)

# trained preprocessor is also stored to transform the prediction data
s3_upload(file_path=PROCESSOR_PATH)
```

### Step 3: Create a Flask Application with API Endpoints

Next, we’ll create a Flask application with API endpoints.

Flask needs to configure Python scripts in the <FontIcon icon="fa-brands fa-python"/>`app.py` file located at the root of the project repository.

As showed in the code snippets, the <FontIcon icon="fa-brands fa-python"/>`app.py` file needs to contain the components in order of:

1. AWS Boto3 client setup,
2. Flask app configuration and API endpoint setup,
3. Loading the trained preprocessor, processed input data `X_test`, and trained models,
4. Invoke the Lambda function via API Gateway, and
5. The local test section.

Note that `X_test` should never be used during model training to avoid data leakage.

```py :collapsed-lines title="app.py"
from flask import Flask
from flask_cors import cross_origin
from waitress import serve
from dotenv import load_dotenv

from src._utils import main_logger

# global variables (will be loaded from the S3 buckets)
_redis_client = None
X_test = None
preprocessor = None
model = None
backup_model = None

# load env if local else skip (lambda refers to env in production)
AWS_LAMBDA_RUNTIME_API = os.environ.get('AWS_LAMBDA_RUNTIME_API', None)
if AWS_LAMBDA_RUNTIME_API is None: load_dotenv(override=True)


#### <---- 1. AWS BOTO3 CLIENT ---->
# boto3 client 
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'ml-sales-pred')
s3_client = boto3.client('s3', region_name=os.environ.get('AWS_REGION_NAME', 'us-east-1'))
try:
    # test connection to boto3 client
    sts_client = boto3.client('sts')
    identity = sts_client.get_caller_identity()
    main_logger.info(f"Lambda is using role: {identity['Arn']}")
except Exception as e:
    main_logger.error(f"Lambda credentials/permissions error: {e}")

#### <---- 2. FLASK CONFIGURATION & API ENDPOINTS ---->
# configure the flask app
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# add a simple API endpoint to serve the prediction by price point to test
@app.route('/v1/predict-price/<string:stockcode>', methods=['GET', 'OPTIONS'])
@cross_origin(origins=origins, methods=['GET', 'OPTIONS'], supports_credentials=True)
def predict_price(stockcode):
    df_stockcode = None

    # fetch request params
    data = request.args.to_dict()

    try:
        # fetch cache
        if _redis_client is not None:
            # returns cached prediction results if any without performing inference
            cached_prediction_result = _redis_client.get(cache_key_prediction_result_by_stockcode)
            if cached_prediction_result: 
                return jsonify(json.loads(json.dumps(cached_prediction_result)))

            # historical data of the selected product
            cached_df_stockcode = _redis_client.get(cache_key_df_stockcode)
            if cached_df_stockcode: df_stockcode = json.loads(json.dumps(cached_df_stockcode))


        # define the price range to make predictions. can be a request param, or historical min/max prices
        min_price = float(data.get('unitprice_min', df_stockcode['unitprice_min'][0]))
        max_price = float(data.get('unitprice_max', df_stockcode['unitprice_max'][0]))

        # create bins in the price range. when the number of the bins increase, the prediction becomes more smooth, but requires more computational cost
        NUM_PRICE_BINS = int(data.get('num_price_bins', 100))
        price_range = np.linspace(min_price, max_price, NUM_PRICE_BINS)

        # create a prediction dataset by merging X_test (dataset never used in model training) and df_stockcode
        price_range_df = pd.DataFrame({ 'unitprice': price_range })
        test_sample = X_test.sample(n=1000, random_state=42)
        test_sample_merged = test_sample.merge(price_range_df, how='cross') if X_test is not None else price_range_df
        test_sample_merged.drop('unitprice_x', axis=1, inplace=True)
        test_sample_merged.rename(columns={'unitprice_y': 'unitprice'}, inplace=True)

        # preprocess the dataset
        X = preprocessor.transform(test_sample_merged) if preprocessor else test_sample_merged

        # perform inference
        y_pred_actual = None
        epsilon = 0
        # try using the primary model
        if model:
            input_tensor = torch.tensor(X, dtype=torch.float32)
            model.eval()
            with torch.inference_mode():
                y_pred = model(input_tensor)
                y_pred = y_pred.cpu().numpy().flatten()
                y_pred_actual = np.exp(y_pred + epsilon)

        # if not, use backups
        elif backup_model:
            y_pred = backup_model.predict(X)
            y_pred_actual = np.exp(y_pred + epsilon)


        # finalize the outcome for client app
        df_ = test_sample_merged.copy()
        df_['quantity'] = np.floor(y_pred_actual) # quantity must be an integer
        df_['sales'] = df_['quantity'] * df_['unitprice'] # compute sales
        df_ = df_.sort_values(by='unitprice')

        # aggregate the results by the unitprice in the price range
        df_results = df_.groupby('unitprice').agg(
            quantity=('quantity', 'median'),
            quantity_min=('quantity', 'min'),
            quantity_max=('quantity', 'max'),
            sales=('sales', 'median'),
        ).reset_index()

        # find the optimal price point
        optimal_row = df_results.loc[df_results['sales'].idxmax()]
        optimal_price = optimal_row['unitprice']
        optimal_quantity = optimal_row['quantity']
        best_sales = optimal_row['sales']

        all_outputs = []
        for _, row in df_results.iterrows():
            current_output = {
                "stockcode": stockcode,
                "unit_price": float(row['unitprice']),
                'quantity': int(row['quantity']),
                'quantity_min': int(row['quantity_min']),
                'quantity_max': int(row['quantity_max']),
                "predicted_sales": float(row['sales']),
            }
            all_outputs.append(current_output)

        # store the prediction results in cache
        if all_outputs and _redis_client is not None:
             serialized_data = json.dumps(all_outputs)
            _redis_client.set(
                cache_key_prediction_result_by_stockcode, 
                serialized_data,
                ex=3600     # expire in an hour
            )

        # return a list of all outputs
        return jsonify(all_outputs)

    except Exception as e: return jsonify([])


# request header management (for the process from API gateway to the Lambda)
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'public, max-age=0'
    response.headers['Access-Control-Allow-Origin'] = CLIENT_A
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Origin'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONSS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

#### <---- 3. LOADING PROCESSOR, DATASET, AND MODELS ---->
load_processor()
load_x_test()
load_model()

#### <---- 4. INVOKE LAMBDA ---->
def handler(event, context):
    logger.info("lambda handler invoked.")
    try:
        # connecting the redis client after the lambda is invoked
        get_redis_client()
    except Exception as e:
        logger.critical(f"failed to establish initial Redis connection in handler: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Failed to initialize Redis client. Check environment variables and network config.'})
        }

    # use the awsgi package to convert JSON to WSGI
    return awsgi.response(app, event, context)


#### <---- 5. FOR LOCAL TEST ---->
# serve the application locally on WSGI server, waitress
# lambda will ignore this section.
if __name__ == '__main__':   
    if os.getenv('ENV') == 'local':
        main_logger.info("...start the operation (local)...")
        serve(app, host='0.0.0.0', port=5002)
    else:
        app.run(host='0.0.0.0', port=8080)
```

I’ll test the endpoint locally using the `uv` package manager:

```sh
uv run app.py --cache-clear
curl http://localhost:5002/v1/predict-price/{STOCKCODE}
```

The system provided a list of sales predictions for each price point:

![Fig. Screenshot of the Flask app local response](https://cdn.hashnode.com/res/hashnode/image/upload/v1755607075000/e0e8cbcb-8817-4aa5-b3d1-37b76cc684fb.png)

#### Key Points on Flask App Configuration

There are various points you should take into consideration when configuring a Flask application with Lambda. Let’s go over them now:

##### 1. A Few API Endpoints Per Container

Adding many API endpoints to a single serverless instance can lead to **monolithic function concern** where issues in one endpoint impact others.

In this project, we’ll focus on a single endpoint per container - and if needed, we can add separate Lambda functions to the system.

##### 2. Understanding the `handler` Function and the role of AWSGI

The `handler` function is invoked every time the Lambda function receives a client request from the API Gateway.

The function takes the `event` argument that includes the request details in a **JSON dictionary** and passes it to the Flask application.

**AWSGI** acts as an adapter, translating a Lambda event in JSON format into a WSGI request that a Flask application can understand, and converts the application’s response back into a JSON format that Lambda and API Gateway can process.

##### 3. Using Cache Storage

The `get_redis_client` function is called once the `handler` function is called by the API Gateway. This allows the Flask application to store or fetch a cache from the Redis client:

```py :collapsed-lines
import redis
import redis.cluster
from redis.cluster import ClusterNode

_redis_client = None

def get_redis_client():
    global _redis_client
    if _redis_client is None:
        REDIS_HOST = os.environ.get("REDIS_HOST")
        REDIS_PORT = int(os.environ.get("REDIS_PORT", 6379))
        REDIS_TLS = os.environ.get("REDIS_TLS", "true").lower() == "true"
        try:
            startup_nodes = [ClusterNode(host=REDIS_HOST, port=REDIS_PORT)]
            _redis_client = redis.cluster.RedisCluster(
                startup_nodes=startup_nodes,
                decode_responses=True,
                skip_full_coverage_check=True,
                ssl=REDIS_TLS,                  # elasticache has encryption in transit: enabled -> must be true
                ssl_cert_reqs=None,
                socket_connect_timeout=5,
                socket_timeout=5,
                health_check_interval=30,
                retry_on_timeout=True,
                retry_on_error=[
                    redis.exceptions.ConnectionError,
                    redis.exceptions.TimeoutError
                ],
                max_connections=10,            # limit connections for Lambda
                max_connections_per_node=2     # limit per node
            )
            _redis_client.ping()
            main_logger.info("successfully connected to ElastiCache Redis Cluster (Configuration Endpoint)")
        except Exception as e:
            main_logger.error(f"an unexpected error occurred during Redis Cluster connection: {e}", exc_info=True)
            _redis_client = None
    return _redis_client
```

##### 4. Handling Heavy Tasks Outside of the `handler` Function

Serverless functions can experience a **cold start duration**.

While a Lambda function can run for up to 15 minutes, its associated API Gateway has a timeout of 29 seconds (29,000 ms) for a RESTful API.

So, any heavy tasks like loading preprocessors, input data, or models should be performed once outside of the `handler` function, ensuring they are ready *before* the API endpoint is called.

Here are the loading functions called in <FontIcon icon="fa-brands fa-python"/>`app.py`.

```py :collapsed-liens title="app.py"
import joblib

from src._utils import s3_load, s3_load_to_temp_file

preprocessor = None
X_test = None
model = None
backup_model = None


# load processor
def load_preprocessor():
    global preprocessor
    preprocessor_tempfile_path = s3_load_to_temp_file(PREPROCESSOR_PATH)
    preprocessor = joblib.load(preprocessor_tempfile_path)
    os.remove(preprocessor_tempfile_path)


# load input data
def load_x_test():
    global X_test
    x_test_io = s3_load(file_path=X_TEST_PATH)
    X_test = pd.read_parquet(x_test_io)


# load model
def load_model():
    global model, backup_model
    # try loading & reconstructing the primary model
    try:
        # first load io file from the s3 bucket
        model_data_bytes_io_ = s3_load(file_path=DFN_FILE_PATH)
        # convert to checkpoint dictionary (containing hyperparameter set)
        checkpoint_ = torch.load(
            model_data_bytes_io_, 
            weights_only=False, 
            map_location=device
        )
        # reconstruct the model
        model = t.scripts.load_model(checkpoint=checkpoint_, file_path=DFN_FILE_PATH)
        # set the model evaluation mode
        model.eval()

    # else, backup model
     except:
        load_artifacts_backup_model()
```

### Step 4: Publish a Docker Image to ECR

After configuring the Flask application, we’ll containerize the entire application on **Docker**.

Containerization makes a package of the application, including models, its dependencies, and configuration in machine learning context, as a container**.**

Docker creates a container image based on the instructions defined in a Dockerfile, and the Docker engine uses the image to run the isolated container.

In this project, we’ll upload the Docker container image to ECR, so the Lambda function can access it in production.

After this, we’ll define the <FontIcon icon="fa-brands fa-docker"/>`.dockerignore` file to optimize the container image:

```dockerignore title=".dockerignore"
# any irrelevant data
__pycache__/
.ruff_cache/
.DS_Store/
.venv/
dist/
.vscode
*.psd
*.pdf
[a-f]*.log
tmp/
awscli-bundle/

# add any experimental models, unnecessary data
dfn_bayesian/
dfn_grid/
data/
notebooks/
```

```dockerfile title="Dockerfile"
# serve from aws ecr 
FROM public.ecr.aws/lambda/python:3.12

# define a working directory in the container
WORKDIR /app

# copy the entire repository (except .dockerignore) into the container at /app
COPY . /app/

# install dependencies defined in the requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# define commands
ENTRYPOINT [ "python" ]
CMD [ "-m", "awslambdaric", "app.handler" ]
```

#### Test in Local

Next, we’ll test the Docker image by building the container named `my-app` locally:

```sh
docker build -t my-app -f Dockerfile .
```

Then, we’ll run the container with the `waitress` server in local:

```sh
docker run -p 5002:5002 -e ENV=local my-app app.py
```

The `-e ENV=local` flag sets the environment variable inside the container, which will trigger the `waitress.serve()` call in the <FontIcon icon="fa-brands fa-python"/>`app.py`.

In the terminal, you’ll find a message saying the following:

![Flask app response](https://miro.medium.com/v2/resize:fit:1260/0*zu8mamgKMKOUxwCA.png)

You can also call the endpoint created to see the results returned:

```sh
uv run app.py --cache-clear
curl http://localhost:5002/v1/predict-price/{STOCKCODE}
```

#### Publish the Docker Image to ECR

To publish the Docker image, we first need to configure the default AWS credentials and region:

- From the AWS account console, issue an access token and check the default region.
- Store them in the <FontIcon icon="fas fa-folder-open"/>`~/aws/`<FontIcon icon="fas fa-file-lines"/>`credentials` and <FontIcon icon="fas fa-folder-open"/>`~/aws/`<FontIcon icon="fas fa-file-lines"/>`config` files:

```ini title="~/aws/credentials"
[default] 
aws_secret_access_key=
aws_access_key_id=
```

```ini title="~/aws/config"
[default]
region=
```

After the configuration, we’ll publish the Docker image to ECR.

```sh
# authenticate the docker client to ECR
aws ecr get-login-password --region <your-aws-region> | docker login --username AWS --password-stdin <your-aws-account-id>.dkr.ecr.<your-aws-region>.amazonaws.com

# create repository
aws ecr create-repository --repository-name <your-repo-name> --region <your-aws-region>

# tag the docker image
docker tag <your-repo-name>:<your-app-version>  <your-aws-account-id>.dkr.ecr.<your-aws-region>.amazonaws.com/<your-app-name>:<your-app-version>

# push
docker push <your-aws-account-id>.dkr.ecr.<your-aws-region>.amazonaws.com/<your-repo-name>:<your-app-version>
```

Here’s what’s going on:

- `<your-aws-region>`: Your default AWS region (for example, `us-east-1` ).
- `<your-aws-account-id>`: 12-digit AWS account ID.
- `<your-repo-name>`: Your desired repository name.
- `<your-app-version>`: Your desired tag name (for example, `v1.0`).

Now, the Docker image is stored in ECR with the tag:

![Fig. Screenshot of the AWS ECR console](https://miro.medium.com/v2/resize:fit:1260/0*tUQkbDW-uAmrjBfx.png)

Fig. Screenshot of the AWS ECR console

### Step 5: Create a Lambda Function

Next, we’ll create a Lambda function.

From the Lambda console, choose:

- The `Container Image` option,
- The container image URL from the pull down list,
- A function name of our choice, and
- An architecture type (arm64 is recommended for a better price-performance).

![Fig. Screenshot of AWS Lambda function configuration](https://miro.medium.com/v2/resize:fit:1260/0*3b-wIEUzRooQcvN_.png)

The Lambda function `my-app` was successfully launched.

#### Connect the Lambda function to API Gateway

Next, we’ll add API gateway as an event trigger to the Lambda function.

First, visit the API Gateway console and create **REST API methods** using the ARN of the Lambda function (press enter or click to view image in full size):

![Fig. Screenshot of the AWS API Gateway configuration](https://miro.medium.com/v2/resize:fit:1260/0*60TP64gdSjhKfiO8.png)

Then, add resources to the created API gateway to create an endpoint:  
`API Gateway > APIs > Resources > Create Resource`

- Align the resource endpoint with the API endpoint defined in the <FontIcon icon="fa-brands fa-python"/>`app.py`.
- Configure CORS (for example, accept specific origins).
- Deploy the resource to the stage.

Going back to the Lambda console, you’ll find the API Gateway is connected as an event trigger:  

```plaintext
Lambda > Function > my-app (your function name)
```

![Fig. Screenshot of the AWS Lambda dashboard](https://miro.medium.com/v2/resize:fit:1260/0*DlfiEieZArmYlOuT.png)

### Step 6: Configure AWS Resources

Lastly, we’ll configure the related AWS resources to make the system work in production.

This process involves the following steps:

#### 1. The IAM Role: Controls Who to Access Resources

AWS requires **IAM roles** to grant temporary, secure permissions to users, mitigating security risks related to long-term credentials like passwords.

The IAM role leverages policies to grant accesses to the selected service. Policies can be issued by AWS or customized by the user by defining the inline policy.

It is important to avoid overly permissive access rights for the IAM role.

1. In the Lambda function console, check the execution role:<br/>`Lambda > Function > <FUNCTION> > Permission > The execution role`.
2. Set up the following policies to allow the Lambda’s IAM role to handle necessary operations:
    - **Lambda** `AWSLambdaExecute`: Allows executing the function.
    - **EC2** `Inline policy`: Allows controlling the security group and the VPC of the Lambda function.
    - **ECR** `AmazonElasticContainerRegistryPublicFullAccess` + `Inline policy`: Allows storing and pulling the Docker image.
    - **ElastiCache** `AmazonElastiCacheFullAccess` + `Inline policy`: Allows storing and pulling caches.
    - **S3**: `AmazonS3ReadOnlyAccess` + `Inline policy`: Allows reading and storing contents.

Now, the IAM role can access these resources and perfo the allowed actions.

#### 2. The Security Group: Controls Network Traffic

A **security group** is a virtual firewall that controls inbound and outbound network traffic for AWS resources.

It uses stateful (allowing return traffic automatically) “allow-only” rules based on protocol, port, and IP address, where it denies all traffic by default.

Create a new security group for the Lambda function:<br/>`EC2 > Security Groups > <YOUR SECURITY GROUP>`

Now, we’ll want to setup inbound / outbound traffic rules.

The inbound rules:

- **`S3 → Lambda:Type*`**: `HTTPS /*` **`Protocol*`**: `TCP /*` **`Port range*`**: `443 / Source: Custom**`
- **`ElastiCache → Lambda:Type*`**: `Custom TCP /*` **`Port range*`**: `6379 / Source: Custom**`

::: note

Choose the created security group for the Lambda function as a custom source.

::

The outbound rules:

- **`Lambda → Internet: Type*`**: `HTTPS /*` **`Protocol*`**: `TCP /*` **`Port range*`**: `443 /*` **`Destination*`**: `0.0.0.0/0*`
- **`ElastiCache → Internet: Type*`**: `All Traffic /*` **`Destination*`**: `0.0.0.0/0*`

#### 3. The Virtual Private Cloud (VPC)

A **Virtual Private Cloud (VPC)** provides a logically isolated private network for the AWS resources, acting as our own private data center within AWS.

AWS can create a **Hyperplane ENI** (Elastic Network Interface) for the Lambda function and its connected resources in the subnets of the VPC.

Though it’s optional, we’ll use the VPC to connect the Lambda function to the S3 storage and ElastiCache.

This process involves:

1) Creating a VPC endpoint from the VPC console:`VPC > Create VPC`.
2) Creating an STS (Security Token Service) endpoint:  

```
VPC > PrivateLink and Lattice > Endpoints > Create Endpoint >
```

- **`Type*`**: `AWS Service*`
- **`Service name*`**: `com.amazonaws.<YOUR REGION>.sts*`
- **`Type*`**: `Interface*`
- **`VPC`**: Select the VPC created earlier.
- **`Subnets*`**: Select all subnets.\*
- **Security groups**\*: Select the security group of the Lambda function.\*
- **`Policy*`**: Full access\*
- **Enable DNS names**

The VPC must have a dedicated endpoint for STS to receive temporary credentials from STS.

3) Create an S3 endpoint in the VPC:  

```
VPC > PrivateLink and Lattice > Endpoints > Create Endpoint >
```

- **`Type*`**: `AWS Service*`
- **`Service name*`**: `com.amazonaws.<YOUR REGION>.s3*`
- **`Type*`**: `Gateway*`
- **`VPC`**: Select the VPC created earlier.
- **`Subnets*`**: Select all subnets.\*
- **Security groups**\*: Select the security group of the Lambda function.\*
- **`Policy*`**: Full access\*

Lastly, check the security group of the Lambda function and ensure that its VPC ID directs to the VPC created: `EC2 > Security Group > <YOUR SECURITY GROUP FOR THE LAMDA FUNCTION> > VPC ID`.

That’s all for the deployment flow.

We can now test the API endpoint in production. Copy the **Invoke URL** of the deployed API endpoint: `API Gateway > APIs > Stages > Invoke URL`. Then call the API endpoint and check if it responds predictions:

```sh
curl -H 'Authorization: Bearer YOUR_API_TOKEN' -H 'Accept: application/json' \
'<INVOKE URL>/<ENDPOINT>'
```

For logging and debugging, we’ll use the LiveTail of CloudWatch: `CloudWatch > LiveTail`.

---

## Building a Client Application (Optional)

For full-stack deployment, we’ll build a simple React application to display the prediction using the [<FontIcon icon="fas fa-globe"/>recharts](https://recharts.org/en-US) library for visualization.

Other options for quick frontend deployment include [<FontIcon icon="fas fa-globe"/>Streamlit](https://streamlit.io/) or [<FontIcon icon="fas fa-globe"/>Gradio](https://gradio.app/).

### The React Application

The React application creates a web page that fetches and visualizes sales predictions from an external API, recommending an optimal price point.

The app uses `useState` to manage its data and state, including the selected product, the list of sales predictions, and the loading/error status.

When the user initiates a request, a `useEffect` hook triggers a `fetch` request to a Flask backend. It handles the API response as a **data stream**, processing it line by line to progressively update the predictions.

The `AreaChart` from the `recharts` library then visualizes this data. The X-axis represents the `price` and the Y-axis represents the `sales`. The chart updates in real-time as the data streams in. Finally, the app displays the optimal price once all the predictions are received.

```jsx :collapsed-lines title="App.jsx"
import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'


function App() {
  // state
  const [predictions, setPredictions] = useState([])
  const [start, setStart] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // product data
  let selectedStockcode = '85123A'
  let selectedProduct = productOptions.filter(item => item.id === selectedStockcode)[0]

  // api endpoint
  const flaskBackendUrl = "YOUR FLASK BACKEND URL"

  // create chart data to display
  const chartDataSales = predictions && predictions.length > 0
    ? predictions
      .map(item => ({
        price: item.unit_price,
        sales: item.predicted_sales,
        volume: item.unit_price !== 0 ? item.predicted_sales / item.unit_price : 0
      }))
      .sort((a, b) => a.price - b.price)
    : [...selectedProduct['histPrices']]

  // optimal price to display
  const optimalPrice = predictions.length > 0
    ? predictions.sort((a, b) => b.predicted_sales - a.predicted_sales)[0]['unit_price']
    : 0

  // fetch prediction results
  useEffect(() => {
    const handlePrediction = async () => {
      setIsLoading(true)
      setPredictions([])
      const errorPrices = selectedProduct['errorPrices']

      await fetch(flaskBackendUrl)
        .then(res => {
          if (res.status !== 200) { setPredictions(errorPrices); setIsLoading(false); setStart(false) }
          else return Promise.resolve(res.clone().json())
        })
        .then(res => {
          if (res && res.length > 0) setPredictions(res)
          else setPredictions(errorPrices)
          setIsLoading(false); setStart(false)
        })
        .catch(err => { setPredictions(errorPrices); setIsLoading(false); setStart(false) })
        .finally(setStart(false))
    }

    if (start) handlePrediction()
    if (predictions && predictions.length > 0) setStart(false)
  }, [flaskBackendUrl, start])


  // render
  if (isLoading) return <Loading />
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          key={chartDataSales.length}
          data={chartDataSales.sort(data => data.unit_price)}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.6} />

          <XAxis
            dataKey="price"
            label={{ value: "Unit Price ($)", position: "insideBottom", offset: 0, fontSize: 12, marginTop: 10 }}
            tickFormatter={(tick) => `$${parseFloat(tick).toFixed(2)}`}
            tick={{ fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
          />

          <YAxis
            label={{ value: "Predicted Sales ($)", angle: -90, position: "insideLeft", fontSize: 12 }}
            tick={{ fontSize: 12 }}
            tickFormatter={(tick) => `$${tick.toLocaleString()}`}
          />

          {/* tooltips with the prediction result data */}
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0px 0px 15px rgba(0,0,0,0.5)'
            }}
            formatter={(value, name) => {
              if (name === 'sales') {
                return [`$${value.toFixed(4)}`, 'Predicted Sales']
              }
              if (name === 'volume') {
                return [`${value.toFixed(0)}`, 'Volume']
              }
              return value
            }}
            labelFormatter={(label) => `Price: $${label.toFixed(2)}`}
          />

          {/* chart area = sales */}
          <Area
            type="monotone"
            dataKey="sales"
            fillOpacity={1}
            fill="url(#colorSales)"
          />

          {/* vertical line for the optimal price */}
          {optimalPrice &&
            <ReferenceLine
              x={optimalPrice}
              strokeDasharray="4 4"
              ifOverflow="visible"
              label={{
                value: `Optimal Price: $${optimalPrice !== null && optimalPrice > 0 ? Math.ceil(optimalPrice * 10000) / 10000 : ''}`,
                position: "right",
                fontSize: 12,
                offset: 10
              }}
            />
          }
        </AreaChart>
      </ResponsiveContainer>

      {optimalPrice && <p>Optimal Price: $ {Math.ceil(optimalPrice * 10000) / 10000}</p>}

    </div>
  )
}

export default App
```

::: info Final Results

Now, the application is ready to serve.

You can explore the UI from [<FontIcon icon="fas fa-globe"/>here](https://kuriko-iwai.vercel.app/online-commerce-intelligence-hub).

All code (backend) is available in [my Github Repo (<FontIcon icon="iconfont icon-github"/>`krik8235/ml-sales-prediction`)](https://github.com/krik8235/ml-sales-prediction).

<SiteInfo
  name="krik8235/ml-sales-prediction"
  desc="Predict optimal price points based on sales volume prediction by the multi-layered feedforward network. Served on AWS Lambda and its ecosystem."
  url="https://github.com/krik8235/ml-sales-prediction/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/61cae326bca67309ad5955c3cf94bfd29e7ef0b9f3ea1bbc4d1e5e3e196fa60c/krik8235/ml-sales-prediction"/>

:::

---

## Conclusion

Building a machine learning system requires thoughtful project scoping and architecture design.

In this article, we built a dynamic pricing system as a simple single interface on containerized serverless architecture.

Moving forward, we’d need to consider potential drawbacks of this minimal architecture:

- **Increase in cold start duration**: The WSGI adapter `awsgi` layer adds a small overhead. Loading a larger container image takes longer time.
- **Monolithic function**: Adding endpoints to the Lambda function can lead to a monolithic function where an issue in one endpoint impacts others.
- **Less granular observability**: AWS CloudWatch cannot provide individual invocation/error metrics per API endpoint without custom instrumentation.

To scale the application effectively, extracting functionalities into a new microservice can be a good strategy to the next step.

I’m Kuriko IWAI, and you can find more of my work and learn more about me here:

- [<FontIcon icon="fas fa-globe"/>Portfolio](https://kuriko-iwai.vercel.app/) 
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`k-i-i`)](https://linkedin.com/in/k-i-i/)
- [Github (<FontIcon icon="iconfont icon-github"/>`krik8235`)](https://github.com/krik8235)

::: note

All images, unless otherwise noted, are by the author. This application utilizes synthetic dataset licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license.

This information about AWS is current as of August 2025 and is subject to change.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Machine Learning System on Serverless Architecture",
  "desc": "Let’s say you’ve built a fantastic machine learning model that performs beautifully in notebooks. But a model isn’t truly valuable until it’s in production, serving real users and solving real problems. In this article, you’ll learn how to ship a pro...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-machine-learning-system-on-serverless-architecture.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
