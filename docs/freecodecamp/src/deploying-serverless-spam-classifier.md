---
lang: en-US
title: "How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway"
description: "Article(s) > How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway"
icon: fa-brands fa-aws
category:
  - Python
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway"
    - property: og:description
      content: "How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploying-serverless-spam-classifier.html
prev: /devops/aws/articles/README.md
date: 2026-04-30
isOriginal: false
author:
  - name: Rakshath Naik
    url: https://freecodecamp.org/news/author/rakshath1/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/08672d22-a4df-4b99-8ef7-fffd18f5dc07.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway"
  desc="In today's digital world, spam is no longer just an annoyance - it's a growing security threat. To combat this, developers often turn to machine learning to build intelligent filters that can distingu"
  url="https://freecodecamp.org/news/deploying-serverless-spam-classifier"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/08672d22-a4df-4b99-8ef7-fffd18f5dc07.png"/>

In today's digital world, spam is no longer just an annoyance - it's a growing security threat. To combat this, developers often turn to machine learning to build intelligent filters that can distinguish legitimate emails from malicious ones.

While building a machine learning model in a notebook is relatively straightforward, the real challenge lies in the last mile: deploying that model into a scalable, production-ready system that users can actually interact with.

In this project, I built an end-to-end serverless spam classifier, combining Scikit-learn for model development with AWS Lambda, Amazon S3, and Amazon API Gateway for deployment. The result is a lightweight, scalable API that can classify messages in real time.

The system is designed to be modular and cost-efficient, allowing the model to be retrained and updated independently without affecting the live API. From detecting "free iPhone" scams to identifying phishing attempts, this project demonstrates how to bridge the gap between machine learning experimentation and real-world deployment.

::: note Prerequisites

1. **Fundamental skills:** Basic proficiency in Python and understanding of Machine Learning concepts like classification.
2. **AWS account:** Access to an AWS account with permissions for Lambda, S3, and API Gateway.
3. **Environment:** Python 3.11 installed, along with libraries like scikit-learn, pandas, and joblib.
4. **AWS CLI:** Configured on your local machine for file uploads.
5. **HuggingFace account:** You can directly download the model from my account.

:::

---

## 2. Building the Brain: The Model

![Photo by [<VPIcon icon="fas fa-globe"/>Steve A Johnson](https://unsplash.com/@steve_j) on [<VPIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com)](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/b43af198-1472-4914-9469-6cd5ca5384e2.png)

At the heart of this project lies a supervised learning approach. Instead of simply specifying which words are considered spam, we'll provide the computer with a dataset and an algorithm, enabling it to learn and identify spam patterns on its own.

### 1. Vectorization: Turning Text into Math

Machine Learning models can't **read** text. They require numerical input. To solve this, we used the [**TF-IDF**](/freecodecamp.org/how-to-extract-keywords-from-text-with-tf-idf-and-pythons-scikit-learn-b2a0f3d7e667.md) (Term Frequency-Inverse Document Frequency) Vectorizer.

```py
feature_extraction = TfidfVectorizer(min_df=1, stop_words='english', lowercase=True)
X_train_features = feature_extraction.fit_transform(X_train
```

Here's the mathematical formula:

$$
w_{i,j}=tf_{i,j}\times\log\left(\frac{N}{df_i}\right)
$$

TF-IDF term definitions:

- $w_{i,j}$ **(Weight):** The final importance score of a specific word in a document.
- $tf_{i,j}$ **(Term Frequency):** How often a word appears in a single email.
- $N$ **(Total Documents):** The total count of all emails in your dataset.
- $df_i$ **(Document Frequency):** The number of different emails that contain this specific word.
- $\log\left(\frac{N}{df_i}\right)$ **(IDF):** A penalty that lowers the score of common words like **the** or **is** that appear everywhere.

It cleans the data by removing common words, converts all text to lowercase for consistency, and assigns more importance to rare and meaningful words while giving less importance to frequently used words.

### 2. Training: The Logistic Regression Engine

We'll use **Logistic Regression** here, a classification algorithm that predicts the probability of an outcome.

In this stage, we feed our vectorized training data into the Logistic Regression algorithm. The goal is to establish a mathematical relationship between specific word weights and the **Spam** or **Ham** label.

During training, the model iteratively adjusts its internal parameters to minimize error, eventually learning that words like winner or free correlate highly with spam, while conversational language correlates with legitimate messages.

```py
model = LogisticRegression()
model.fit(X_train_features, Y_train)
```

In our case, it calculates the probability that an email belongs to spam or HAM.

The algorithm uses the Sigmoid function to map any real-valued number into a value between $0$ and $1$.

$$
P(y=1|x)=\frac{1}{1+e^{-(z)}}
$$

where $z=\beta_{0}+\beta_{1}x{1}+\cdots+\beta_{n}x_{n}$.

### 3. Evaluation: Testing the Intelligence

After training, we need to verify if the brain actually works on data it hasn't seen before.

```py
prediction_on_test_data = model.predict(X_test_features)
accuracy_on_test_data = accuracy_score(Y_test, prediction_on_test_data)
```

By comparing the model’s predictions against the actual labels in our test set, we calculate an Accuracy Score. This gives us the confidence that the model is ready for the real world (achieving ~94% accuracy in our tests).

### 4. Exporting the Logic (Serialization)

To move this brain from our local Python environment to the AWS Cloud, we'll use Joblib to save our work into binary files (.pkl).

```py
joblib.dump(model, 'spam_model.pkl')
joblib.dump(feature_extraction, 'vectorizer.pkl')
```

We use the Pickle format because it allows us to freeze complex Python objects (mathematical weights and word mappings) into a portable binary format that can be instantly re-animated in the cloud.

We need the Vectorizer to translate new user text into the exact numerical coordinates the Model was trained to understand. Using one without the other is like having a key but no lock.

The trained Logistic Regression model and TF-IDF vectorizer are openly available for the community on Hugging Face here: [<VPIcon icon="iconfont icon-huggingface"/>Get the model on HuggingFace](https://huggingface.co/rakshath1/mail-spam-detector).

---

## 3. Deploying the Model to AWS

Training a model is science, while deploying it is engineering. To make this classifier accessible to the world, we'll use a serverless stack that scales automatically and incurs nearly no maintenance costs.

### 1. Model Storage: Amazon S3

First, we'll uploade our .pkl files to an S3 bucket. By decoupling the model from the code, we can update the AI's intelligence (simply by overwriting the file in S3) without redeploying the backend code. It makes the system highly maintainable.

### 2. The Production Backend: AWS Lambda

To make the AI accessible, we'll move from a local script to a Serverless Cloud Architecture. This ensures the model is always available without the cost of a 24/7 server.

The deployment environment is AWS Lambda (Python 3.11). Since Lambda is a lightweight environment, it doesn't include Scikit-Learn or Joblib. To provide these, we'll download and store them in our S3 bucket and import them through the layers.

**Commands in AWS CLI:**

```sh
# 1. Create a workspace
mkdir ml_layer && cd ml_layer

# 2. Install scikit-learn and its dependencies into a folder
pip install \
--platform manylinux2014_x86_64 \
--target=python/lib/python3.11/site-packages \
--implementation cp \
--python-version 3.11 \
--only-binary=:all: \
scikit-learn joblib

# 3. Zip the folder
zip -r sklearn_lib.zip python

# 4. Upload to S3 (Using AWS CLI)
aws s3 cp sklearn_lib.zip s3://YOUR-BUCKET-NAME/
```

We store the Scikit-Learn library as a ZIP in S3 to bypass the AWS Lambda deployment package size limit. This allows the function to dynamically load heavy dependencies only when needed without bloating the core code.

**The Lambda Function:**

```py :collapsed-lines
import json
import boto3
import os
import sys
from io import BytesIO

# Ensures the custom Lambda layer(containing sklearn/joblib)
sys.path.append('/opt/python')

try:
    import joblib
except ImportError:
    # Fallback for specific Scikit-Learn distributions
    from sklearn.utils import _joblib as joblib

# Initialize S3 client
s3 = boto3.client('s3')

# Use placeholders for the article so readers can insert their own values
BUCKET_NAME = 'YOUR_S3_BUCKET_NAME' 
MODEL_KEY = 'spam_model.pkl'
VECTORIZER_KEY = 'vectorizer.pkl'

# Global variables for 'Warm Start' caching (improves performance by keeping model in RAM)
model = None
vectorizer = None

def load_model():
    """Downloads model files from S3 only if they aren't already in RAM"""
    global model, vectorizer
    if model is None or vectorizer is None:
        try:
            # 1. Load the Logistic Regression Model from S3
            m_obj = s3.get_object(Bucket=BUCKET_NAME, Key=MODEL_KEY)
            model = joblib.load(BytesIO(m_obj['Body'].read()))
            
            # 2. Load the TF-IDF Vectorizer directly from S3
            v_obj = s3.get_object(Bucket=BUCKET_NAME, Key=VECTORIZER_KEY)
            vectorizer = joblib.load(BytesIO(v_obj['Body'].read()))
        except Exception as e:
            raise Exception(f"Failed to load .pkl files from S3: {str(e)}")

def lambda_handler(event, context):
    try:
        # Ensure model and vectorizer are ready before processing
        load_model()
        
        # Handles both direct Lambda tests and API Gateway POST requests
        body = event.get('body', event)
        if isinstance(body, str):
            body = json.loads(body)
            
        text = body.get('text', '')
            
        if not text:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No text provided.'})
              }

        # 1. Transform input text to numeric features using the trained Vectorizer
        data_vec = vectorizer.transform([text])
        
        # 2. Predict using the Logistic Regression Model 
        prediction = int(model.predict(data_vec)[0])
        
      # 3. Map numeric result to human-readable label
        result_label = "HAM" if prediction == 1 else "SPAM"
        
        # RESPONSE WITH CORS
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' # needed for cross-domain web integration
            },
            'body': json.dumps({
                'status': 'success',
                'classification': result_label,
                'input_text': text
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error_message': f"Inference Error: {str(e)}"})
        }
```

::: important Key features of the Lambda function:

1. **Warm start caching:** By defining the model and vectorizer variables outside the lambda_handler, we store them in the container's memory. This significantly reduces cold start latency for subsequent requests.
2. **Dynamic dependency loading:** The **sys.path.append('/opt/python')** line allows us to import heavy libraries from S3/Layers without exceeding the upload limit.
3. **Bimodal input handling:** The function is designed to handle both direct JSON testing from the AWS console and stringified payloads sent via API Gateway.

:::

### 3. The API Gateway - The Bridge to the Web

![Photo by [<VPIcon icon="fas fa-globe"/>Growtika](https://unsplash.com/@growtika) on [<VPIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com)](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/8aa3e8d7-569a-4dd5-a6ac-184922474952.png)

#### Creating the REST API

Next we'll create a REST API with a single POST method. Why POST, you might be wondering? Well, we need to securely send a JSON payload containing the user’s text message to our model.

1. First navigate to the Amazon API Gateway console and select Create API -> REST API.
2. Give your API a name, such as EmailSpamPredictor-API, and set the Endpoint Type to Regional.
3. Then in the left sidebar, click Resources and enter a resource name (e.g: **/ predict** as entered by me)
4. Next click the create method and select POST and then select Lambda Function for integration type
5. Ensure Lambda Proxy integration is enabled (this allows the full request to pass through to your code).

##### The CORS Configuration (The Troubleshooting Hub)

This is where many developers encounter the dreaded **Connection Error**. Since our API is hosted on AWS, and if your front-end is on a separate website, the browser’s Same-Origin Policy will block the request by default.

To fix this, we'll enable **CORS:**

1. **Access-Control-Allow-Origin:** Set to `*` (or specifically to your domain) to tell the browser that the API is allowed to talk to your front-end.
2. **The OPTIONS method:** API Gateway creates an OPTIONS method automatically. This handles the Preflight request where the browser asks, “Are you allowed to receive data from me?” before sending the actual text.
3. **Access-Control-Allow-Headers:** In the screenshot, you'll notice headers like Content-Type and Authorization are allowed. This ensures that when our JavaScript fetch() call sets the content type to application/json, the API Gateway doesn't reject it.

![Image illustrates the CORS configuration for our project. (Image by author)](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/cf5c87c6-f374-4dda-8001-77a0aab52672.png)

#### Deployment Stages

Once the API is deployed to a production stage, AWS generates a permanent Invoke URL. This acts as the public gateway to our model and typically follows this structure:

```
https://[api-id].execute-api.[region].amazonaws.com/prod/classify.
```

#### Connecting the Frontend (The JavaScript Layer)

With the API live, we can now write a simple JavaScript function to talk to our model. This script runs whenever a user clicks the **Analyze** button on your site.

```js
async function checkSpam() {
  const message = document.getElementById("userInput").value;
  const apiUrl = "YOUR_API_GATEWAY_INVOKE_URL";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "text": message })
    });

    const data = await response.json();

    // Display result on the webpage
    const resultElement = document.getElementById("result");
    resultElement.innerText = `Prediction: ${data.classification}`;
    resultElement.style.color = data.classification === "SPAM" ? "red" : "green";

  } catch (error) {
    console.error("Error:", error);
    alert("Could not connect to the Spam Detector API.");
  }
}
```

---

## 4. How to Run The Project Locally

You can store the front-end as an HTML file. Once it's ready, you shouldn’t just double-click the .html file. Opening it as a **file** in your browser can cause security restrictions. Instead, you should host it using a simple local server.

::: tabs

@tab Step 1

Open the terminal or Command Prompt.

@tab Step 2

Navigate to your project folder

```sh
cd [PATH_TO_YOUR_FOLDER]
```

@tab Step 3

Start a local Python web server.

```sh
python -m http.server 8000
```

@tab Step 4

Access the application.

:::

Open your browser and navigate to: `http://localhost:8000/your-file-name.html`

::: info Watch the Demo:

<VidStack src="youtube/q2X_azntmzY" />

:::

---

## 5. Our Project Architecture

![The image illustrates the architecture of our project (Building a Serverless Spam Classifier). It shows the process that takes place from the client input to the final model output. (Image by Author)](https://cdn.hashnode.com/uploads/covers/6942c2903c5d674e359eaf1e/c17673d4-5dd0-43dc-8e8d-3015bcd31864.png)

### Client Front-End Interaction

The process starts on the far left. A user interacts with the web interface (for example, a website or a desktop app). They input text like **WIN free iPhone now** and trigger a request.

### The Entry Point: API Gateway

The request hits the Amazon API Gateway, which acts as the **security guard** and translator.

**(a)** CORS OPTIONS handles the pre-flight handshake to ensure the browser has permission to talk to the AWS cloud.
**(b)** Classification Request (POST) routes the actual message data to your backend logic.

### The Engine: AWS Lambda (Python 3.11)

The central “**lightbulb**” represents your Lambda function. This is where the code you wrote lives. It doesn’t run 24/7 – it only wakes up when a request arrives.

### Storage & Retrieval: S3 Bucket

Since Lambda is lightweight, it doesn’t store your heavy Machine Learning files internally.  

- **Dependency and Model Download:** The function reaches out to the S3 Bucket to pull in the <VPIcon icon="fas fa-file-zipper"/>`sklearn_lib.zip` (the engine) and the .pkl files (the intelligence).
- **Required Dependency and Model:** These assets are loaded into the Lambda’s temporary memory to prepare for the prediction.

### The Inference Pipeline

Inside the Lambda, a three-step mathematical cycle occurs:  
**(a) Text Vectorizer:** Translates the words into numbers.  
**(b) Logistic Regression:** Calculates the probability of spam based on those numbers.  
**(c) Label:** Assigns a final result (Spam or Ham).

### The Result Delivery

The result is sent back through the API Gateway, including the necessary CORS Headers to ensure the browser accepts it. The front-end then updates to show the “**Result: SPAM**” with a visual indicator.

---

## 6. Conclusion: The Power of Serverless AI

By merging the mathematical simplicity of Logistic Regression with the industrial strength of AWS Serverless Architecture, we have transformed a static Python script into a globally accessible, scalable API.

This project demonstrates that you don’t need a massive budget or a 24/7 dedicated server to deploy high-quality Machine Learning.

Using the S3-to-Lambda workaround allowed us to bypass common storage hurdles, ensuring that our Brain (the model) and its Muscle (Scikit-Learn) could function seamlessly within the cloud’s ephemeral environment. It bridges the gap between experimentation and real-world applications, making AI systems practical, efficient, and accessible.

---

## 7. Acknowledgment / References

<SiteInfo
  name="rakshath1/mail-spam-detector · Hugging Face"
  desc="We’re on a journey to advance and democratize artificial intelligence through open source and open science."
  url="https://huggingface.co/rakshath1/mail-spam-detector/"
  logo="https://huggingface.co/favicon.ico"
  preview="https://cdn-thumbnails.huggingface.co/social-thumbnails/models/rakshath1/mail-spam-detector.png"/>

<SiteInfo
  name="API Reference"
  desc="This is the class and function reference of scikit-learn. Please refer to the full user guide for further details, as the raw specifications of classes and functions may not be enough to give full ..."
  url="https://scikit-learn/stable/api/index.html/"
  logo="https://scikit-learn/_static/favicon.ico"
  preview="https://scikit-learn.org/stable/_static/scikit-learn-logo-notext.png"/>

```component VPCard
{
  "title": "Amazon S3 Documentation",
  "desc": "Amazon Simple Storage Service (Amazon S3) has various features you can use to organize and manage your data in ways that support specific use cases, enable cost efficiencies, enforce security, and meet compliance requirements. Data is stored as objects within resources called “buckets.” S3 features include capabilities to append metadata tags to objects, move and store data across the S3 Storage Classes, configure and enforce data access controls, help secure data against unauthorized users, run big data analytics, and monitor data at the object, bucket levels, and view storage usage and activity trends across your organization. Objects can be accessed through S3 Access Points or directly through the bucket hostname.",
  "link": "https://aws.amazon.com/documentation-overview/s3/",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

```component VPCard
{
  "title": "Amazon API Gateway Documentation",
  "desc": "",
  "link": "https://docs.aws.amazon.com/apigateway/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

::: info Connect With Me

- [Medium (<VPIcon icon="fa-brands fa-medium"/>`@rakshathnaik62`)](https://medium.com/@rakshathnaik62)
- [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`rakshath-`)](https://linkedin.com/in/rakshath-/)

:::

::: info You may also like

<SiteInfo
  name="Pandas v/s Polars | Backed by a 10 Million Row Study -"
  desc="The article discusses the differences between Python Polars and Pandas by executing them on a 10-million-row dataset"
  url="https://qubrica.com/python-polars-v-s-pandas-libraries-comparison//"
  logo="https://qubrica.com/wp-content/uploads/2025/10/cropped-Your-paragraph-text-7-192x192.png"
  preview="https://qubrica.com/wp-content/uploads/2026/04/Pandas-vs-Polars-comparision.png"/>

<SiteInfo
  name="The Rise of Platform Engineering: Why DevOps is Evolving (Not Dying) -"
  desc="Is DevOps dead or just evolving? Explore the shift to Platform Engineering in 2026, the ”Cognitive Tax” on developers, and how to build a scalable Golden Path."
  url="https://qubrica.com/devops-is-dead-platform-engineering-2026//"
  logo="https://qubrica.com/wp-content/uploads/2025/10/cropped-Your-paragraph-text-7-192x192.png"
  preview="https://qubrica.com/wp-content/uploads/2026/03/DevOps-vs-Platform-Engineering2.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Serverless Spam Classifier Using Scikit-Learn, AWS Lambda, & API Gateway",
  "desc": "In today's digital world, spam is no longer just an annoyance - it's a growing security threat. To combat this, developers often turn to machine learning to build intelligent filters that can distingu",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploying-serverless-spam-classifier.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
