---
lang: en-US
title: "How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection"
description: "Article(s) > How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection"
icon: iconfont icon-numpy
category:
  - Python
  - NumPy
  - Pandas
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
  - pandas
  - py-pandas
  - ai
  - aritificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection"
    - property: og:description
      content: "How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-create-a-python-siem-system-using-ai-and-llms.html
prev: /programming/py-numpy/articles/README.md
date: 2025-03-08
isOriginal: false
author:
  - name: Chaitanya Rahalkar
    url : https://freecodecamp.org/news/author/chaitanyarahalkar/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741368457380/900d7d5b-cffc-4175-b5a5-4d7361ea383d.png
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
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
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
  name="How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection"
  desc="In this tutorial, we’ll build a simplified, AI-flavored SIEM log analysis system using Python. Our focus will be on log analysis and anomaly detection. We’ll walk through ingesting logs, detecting anomalies with a lightweight machine learning model, ..."
  url="https://freecodecamp.org/news/how-to-create-a-python-siem-system-using-ai-and-llms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741368457380/900d7d5b-cffc-4175-b5a5-4d7361ea383d.png"/>

In this tutorial, we’ll build a simplified, AI-flavored SIEM log analysis system using Python. Our focus will be on log analysis and anomaly detection.

We’ll walk through ingesting logs, detecting anomalies with a lightweight machine learning model, and even touch on how the system could respond automatically.

This hands-on proof-of-concept will illustrate how AI can enhance security monitoring in a practical, accessible way.

---

## What Are SIEM Systems?

Security Information and Event Management (SIEM) systems are the central nervous system of modern security operations. A SIEM aggregates and correlates security logs and events from across an IT environment to provide real-time insights into potential incidents. This helps organizations detect threats faster and respond sooner.

These systems pull together huge volumes of log data — from firewall alerts to application logs — and analyze them for signs of trouble. Anomaly detection in this context is crucial, and unusual patterns in logs can reveal incidents that might slip past static rules. For example, a sudden spike in network requests might indicate a DDoS attack, while multiple failed login attempts could point to unauthorized access attempts.

AI takes SIEM capabilities a step further. By leveraging advanced AI models (like large language models), an AI-powered SIEM can intelligently parse and interpret logs, learn what “normal” behavior looks like, and flag the “weird” stuff that warrants attention.

In essence, AI can act as a smart co-pilot for analysts, spotting subtle anomalies and even summarizing findings in plain language. Recent advancements in large language models allow SIEMs to reason over countless data points much like a human analyst would — but with far greater speed and scale. The result is a powerful digital security assistant that helps cut through the noise and focus on real threats.

::: note Prerequisites

Before we dive in, make sure you have the following:

- Python 3.x installed on your system. The code examples should work in any recent Python version.
- Basic familiarity with Python programming (looping, functions, using libraries) and an understanding of logs (for example, what a log entry looks like) will be helpful.
- Python libraries: We’ll use a few common libraries that are lightweight and don’t require special hardware:
  - [<VPIcon icon="iconfont icon-pandas"/>pandas](https://pandas.pydata.org/) for basic data handling (if your logs are in CSV or similar format).
  - [<VPIcon icon="iconfont icon-numpy"/>numpy](https://numpy.org/) for numeric operations.
  - [<VPIcon icon="fas fa-globe"/>scikit-learn](https://scikit-learn.org/) for the anomaly detection model (specifically, we’ll use the IsolationForest algorithm).
- A set of log data to analyze. You can use any log file (system logs, application logs, and so on) in plain text or CSV format. For demonstration, we’ll simulate a small log dataset so you can follow along even without a ready-made log file.

:::

::: note

If you don’t have the libraries above, install them via pip:

```sh
pip install pandas numpy scikit-learn
```

:::

---

## Setting Up the Project

Let’s set up a simple project structure. Create a new directory for this SIEM anomaly detection project and navigate into it. Inside, you can have a Python script (for example, <VPIcon icon="fa-brands fa-python"/>`siem_anomaly_demo.py`) or a Jupyter Notebook to run the code step by step.

Make sure your working directory contains or can access your log data. If you’re using a log file, it might be a good idea to place a copy in this project folder. For our proof-of-concept, since we will generate synthetic log data, we won’t need an external file — but in a real scenario you would.

### Project setup steps

#### 1. Initialize the environment

If you prefer, create a virtual environment for this project (optional but good practice):

```sh
python -m venv venv
source venv/bin/activate  # On Windows use "venv\Scripts\activate"
```

Then install the required packages in this virtual environment.

#### 2. Prepare a data source

Identify the log source you want to analyze. This could be a path to a log file or database. Ensure you know the format of the logs (for example, are they comma-separated, JSON lines, or plain text?). For illustration, we will fabricate some log entries.

#### 3. Set up your script or notebook

Open your Python file or notebook. We’ll start by importing the necessary libraries and setting up any configurations (like random seeds for reproducibility).

By the end of this setup, you should have a Python environment ready to run our SIEM log analysis code, and either a real log dataset or the intention to simulate data along with me.

---

## Implementing Log Analysis

In a full SIEM system, log analysis involves collecting logs from various sources and parsing them into a uniform format for further processing. Logs often contain fields like timestamp, severity level, source, event message, user ID, IP address, and so on. The first task is to ingest and preprocess these logs.

### 1. Log Ingestion

If your logs are in a text file, you can read them in Python. For example, if each log entry is a line in the file, you could do:

```py
with open("my_logs.txt") as f:
    raw_logs = f.readlines()
```

If the logs are structured (say, CSV format with columns), Pandas can greatly simplify reading:

```py
import pandas as pd
df = pd.read_csv("my_logs.csv")
print(df.head())
```

This will give you a DataFrame `df` with your log entries organized in columns. But many logs are semi-structured (for example, components separated by spaces or special characters). In such cases, you might need to split each line by a delimiter or use regex to extract fields. For instance, imagine a log line:

```plaintext title="output"
2025-03-06 08:00:00, INFO, User login success, user: admin
```

This has a timestamp, a log level, a message, and a user. We can parse such lines with Python’s string methods:

```py :collapsed-lines
logs = [
  "2025-03-06 08:00:00, INFO, User login success, user: admin",
  "2025-03-06 08:01:23, INFO, User login success, user: alice",
  "2025-03-06 08:02:45, ERROR, Failed login attempt, user: alice",
  # ... (more log lines)
]
parsed_logs = []
for line in logs:
    parts = [p.strip() for p in line.split(",")]
    timestamp = parts[0]
    level = parts[1]
    message = parts[2]
    user = parts[3].split(":")[1].strip() if "user:" in parts[3] else None
    parsed_logs.append({"timestamp": timestamp, "level": level, "message": message, "user": user})

# Convert to DataFrame for easier analysis
df_logs = pd.DataFrame(parsed_logs)
print(df_logs.head())
```

Running the above on our sample list would output something like:

```plaintext title="output"
            timestamp  level                 message   user
0  2025-03-06 08:00:00   INFO    User login success   admin
1  2025-03-06 08:01:23   INFO    User login success   alice
2  2025-03-06 08:02:45  ERROR  Failed login attempt   alice
...
```

Now we have structured the logs into a table. In a real scenario, you would continue parsing all relevant fields from your logs (for example, IP addresses, error codes, and so on) depending on what you want to analyze.

### 2. Preprocessing and Feature Extraction

With the logs in a structured format, the next step is to derive features for anomaly detection. Raw log messages (strings) by themselves are hard for an algorithm to learn from directly. We often extract numeric features or categories that can be quantified. Some examples of features could be:

- **Event counts:** number of events per minute/hour, number of login failures for each user, and so on.
- **Duration or size:** if logs include durations or data sizes (for example, file transfer size, query execution time), those numeric values can be directly used.
- **Categorical encoding:** log levels (INFO, ERROR, DEBUG) could be mapped to numbers, or specific event types could be one-hot encoded.

For this proof-of-concept, let’s focus on a simple numeric feature: the count of login attempts per minute for a given user. We’ll simulate this as our feature data.

In a real system, you would compute this by grouping the parsed log entries by time window and user. The goal is to get an array of numbers where each number represents "how many login attempts occurred in a given minute." Most of the time this number will be low (normal behavior), but if a particular minute saw an unusually high number of attempts, that’s an anomaly (possibly a brute-force attack).

To simulate, we’ll generate a list of 50 values representing normal behavior, and then append a few values that are abnormally high:

```py
import numpy as np

# Simulate 50 minutes of normal login attempt counts (around 5 per minute on average)
np.random.seed(42)  # for reproducible example
normal_counts = np.random.poisson(lam=5, size=50)

# Simulate anomaly: a spike in login attempts (e.g., an attacker tries 30+ times in a minute)
anomalous_counts = np.array([30, 40, 50])

# Combine the data
login_attempts = np.concatenate([normal_counts, anomalous_counts])
print("Login attempts per minute:", login_attempts)
```

When you run the above, `login_attempts` might look like:

```py
Login attempts per minute: [ 5  4  4  5  5  3  5  ...  4 30 40 50]
```

Most values are in the single digits, but at the end we have three minutes with 30, 40, and 50 attempts - clear outliers. This is our prepared data for anomaly detection. In a real log analysis, this kind of data might come from counting events in your logs over time or extracting some metric from the log content.

Now that our data is ready, we can move on to building the anomaly detection model.

---

## How to Build the Anomaly Detection Model

To detect anomalies in our log-derived data, we’ll use a machine learning approach. Specifically, we’ll use an Isolation Forest - a popular algorithm for unsupervised anomaly detection.

The Isolation Forest works by randomly partitioning the data and isolating points. Anomalies are those points that get isolated (separated from others) quickly, that is, in fewer random splits. This makes it great for identifying outliers in a dataset without needing any labels (we don’t have to know in advance which log entries are “bad”).

Why Isolation Forest?

- It’s efficient and works well even if we have a lot of data.
- It doesn’t assume any specific data distribution (unlike some statistical methods).
- It gives us a straightforward way to score anomalies.

Let’s train an Isolation Forest on our `login_attempts` data:

```py
from sklearn.ensemble import IsolationForest

# Prepare the data in the shape the model expects (samples, features)
X = login_attempts.reshape(-1, 1)  # each sample is a 1-dimensional [count]

# Initialize the Isolation Forest model
model = IsolationForest(contamination=0.05, random_state=42)
# contamination=0.05 means we expect about 5% of the data to be anomalies

# Train the model on the data
model.fit(X)
```

A couple of notes on the code:

- We reshaped `login_attempts` to a 2D array `X` with one feature column because scikit-learn requires a 2D array for training (`fit`).
- We set `contamination=0.05` to give the model a hint that roughly 5% of the data might be anomalies. In our synthetic data we added 3 anomalies out of 53 points, which is ~5.7%, so 5% is a reasonable guess. (If you don’t specify contamination, the algorithm will choose a default based on assumption or use a default 0.1 in some versions.)
- `random_state=42` just ensures reproducibility.

At this point, the Isolation Forest model has been trained on our data. Internally, it has built an ensemble of random trees that partition the data. Points that are hard to isolate (that is, in the dense cluster of normal points) end up deep in these trees, while points that are easy to isolate (the outliers) end up with shorter paths.

Next, we’ll use this model to identify which data points are considered anomalous.

---

## Testing and Visualizing Results

Now comes the exciting part: using our trained model to detect anomalies in the log data. We’ll have the model predict labels for each data point and then filter out the ones flagged as outliers.

```py
# Use the model to predict anomalies
labels = model.predict(X)
# The model outputs +1 for normal points and -1 for anomalies

# Extract the anomaly indices and values
anomaly_indices = np.where(labels == -1)[0]
anomaly_values = login_attempts[anomaly_indices]

print("Anomaly indices:", anomaly_indices)
print("Anomaly values (login attempts):", anomaly_values)
```

In our case, we expect the anomalies to be the large numbers we inserted (30, 40, 50). The output might look like:

```py
Anomaly indices: [50 51 52]
Anomaly values (login attempts): [30 40 50]
```

Even without knowing anything about “login attempts” specifically, the Isolation Forest recognized those values as out-of-line with the rest of the data.

This is the power of anomaly detection in a security context: we don’t always know what a new attack will look like, but if it causes something to drift far from normal patterns (like a user suddenly making 10 times more login attempts than usual), the anomaly detector shines a spotlight on it.

### Visualizing the results

In a real analysis, it’s often useful to visualize the data and the anomalies. For instance, we could plot the `login_attempts` values over time (minute by minute) and highlight the anomalies in a different color.

In this simple case, a line chart would show a mostly flat line around 3-8 logins/min with three huge spikes at the end. Those spikes are our anomalies. You could achieve this with Matplotlib if you’re running this in a notebook:

```py
import matplotlib.pyplot as plt

plt.plot(login_attempts, label="Login attempts per minute")
plt.scatter(anomaly_indices, anomaly_values, color='red', label="Anomalies")
plt.xlabel("Time (minute index)")
plt.ylabel("Login attempts")
plt.legend()
plt.show()
```

For text-based output as we have here, the printed results already confirm that the high values were caught. In more complex cases, anomaly detection models also provide an anomaly score for each point (for example, how far it is from the normal range). Scikit-learn’s IsolationForest, for example, has a `decision_function` method that yields a score (where lower scores mean more abnormal).

For simplicity, we won’t delve into the scores here, but it’s good to know you can retrieve them to rank anomalies by severity.

With the anomaly detection working, what can we do when we find an anomaly? That leads us to thinking about automated responses.

---

## Automated Response Possibilities

Detecting an anomaly is only half the battle — the next step is responding to it. In enterprise SIEM systems, automated response (often associated with SOAR - Security Orchestration, Automation, and Response) can dramatically reduce reaction time to incidents.

What could an AI-powered SIEM do when it flags something unusual? Here are some possibilities:

- **Alerting:** The simplest action is to send an alert to security personnel. This could be an email, a Slack message, or creating a ticket in an incident management system. The alert would contain details of the anomaly (for example, “User *alice* had 50 failed login attempts in 1 minute, which is abnormal”). GenAI can help here by generating a clear natural-language summary of the incident for the analyst.
- **Automated mitigation:** More advanced systems might take direct action. For instance, if an IP address is showing malicious behavior in logs, the system could automatically block that IP on the firewall. In our login spike example, the system might temporarily lock the user account or prompt for additional authentication, under the assumption that it might be a bot attack. AI-based SIEMs today can indeed trigger predefined response actions or even orchestrate complex workflows when certain threats are detected (refer to [<VPIcon icon="fas fa-globe"/>AI SIEM: How SIEM with AI/ML is Revolutionizing the SOC | Exabeam](https://exabeam.com/explainers/siem/ai-siem-how-siem-with-ai-ml-is-revolutionizing-the-soc/#:~:text=automatically%20trigger%20alerts%2C%20implement%20predefined,even%20orchestrate%20complex%20response%20workflows) for more information).
- **Investigation support:** Generative AI could also be used to automatically gather context. For example, upon detecting the anomaly, the system could pull related logs (surrounding events, other actions by the same user or from the same IP) and provide an aggregated report. This saves the analyst from manually querying multiple data sources.

It’s important to implement automated responses carefully — you don’t want the system to overreact to false positives. A common strategy is a tiered response: low-confidence anomalies might just log a warning or send a low-priority alert, whereas high-confidence anomalies (or combinations of anomalies) trigger active defense measures.

In practice, a AI-powered SIEM would integrate with your infrastructure (via APIs, scripts, and so on) to execute these actions. For our Python PoC, you could simulate an automated response by, say, printing a message or calling a dummy function when an anomaly is detected. For example:

```py
if len(anomaly_indices) > 0:
    print(f"Alert! Detected {len(anomaly_indices)} anomalous events. Initiating response procedures...")
    # Here, you could add code to disable a user or notify an admin, etc.
```

While our demonstration is simple, it’s easy to imagine scaling this up. The SIEM could, for instance, feed anomalies into a larger generative model that assesses the situation and decides on the best course of action (like a chatbot Ops assistant that knows your runbooks). The possibilities for automation are expanding as AI becomes more sophisticated.

---

## Conclusion

In this tutorial, we built a basic AI-powered SIEM component that ingests log data, analyzes it for anomalies using a machine learning model, and identifies unusual events that could represent security threats.

We started by parsing and preparing log data, then used an Isolation Forest model to detect outliers in a stream of login attempt counts. The model successfully flagged out-of-norm behavior without any prior knowledge of what an “attack” looks like - it purely relied on deviations from learned normal patterns.

We also discussed how such a system could respond to detected anomalies, from alerting humans to automatically taking action.

Modern SIEM systems augmented with AI/ML are moving in this direction: not only do they detect issues, but they also help triage and respond to them. Generative AI further enhances this by learning from analysts and providing intelligent summaries and decisions, effectively becoming a tireless assistant in the Security Operations Center.

For next steps and improvements:

- You can try this approach on real log data. For example, take a system log file and extract a feature like “number of error logs per hour” or “bytes transferred per session” and run anomaly detection on that.
- Experiment with other algorithms like One-Class SVM or Local Outlier Factor for anomaly detection to see how they compare.
- Incorporate a simple language model to parse log lines or to explain anomalies. For instance, an LLM could read an anomalous log entry and suggest what might be wrong (“This error usually means the database is unreachable”).
- Extend the features: in a real SIEM, you’d use many signals at once (failed login counts, unusual IP geolocation, rare process names in logs, and so on). More features and data can improve the context for detection.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Python SIEM System Using AI and LLMs for Log Analysis and Anomaly Detection",
  "desc": "In this tutorial, we’ll build a simplified, AI-flavored SIEM log analysis system using Python. Our focus will be on log analysis and anomaly detection. We’ll walk through ingesting logs, detecting anomalies with a lightweight machine learning model, ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-create-a-python-siem-system-using-ai-and-llms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
