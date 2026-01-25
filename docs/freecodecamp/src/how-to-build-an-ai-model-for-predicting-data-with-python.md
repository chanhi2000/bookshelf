---
lang: en-US
title: "How to Build a Quantum AI Model for Predicting Iris Flower Data with Python"
description: "Article(s) > How to Build a Quantum AI Model for Predicting Iris Flower Data with Python"
icon: iconfont icon-numpy
category: 
  - Python
  - NumPy
  - AI
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - py-numpy
  - ai
  - artificial-intelligence
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Quantum AI Model for Predicting Iris Flower Data with Python"
    - property: og:description`
      content: "How to Build a Quantum AI Model for Predicting Iris Flower Data with Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.how-to-build-an-ai-model-for-predicting-data-with-python.html
prev: /programming/py-numpy/articles/README.md
date: 2024-08-08
isOriginal: false
author:
  - name: Tiago Capelo Monteiro
    url : https://freecodecamp.org/news/author/tiagomonteiro/
cover: https://freecodecamp.org/news/content/images/2024/08/pexels-guvo-20731157.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Quantum AI Model for Predicting Iris Flower Data with Python"
  desc="Machine learning is an area of AI where the likes of ChatGPT and other famous models were created. These systems were all created with neural networks. The field of machine learning that deals with the creation of these neural networks is called deep..."
  url="https://freecodecamp.org/news/how-to-build-an-ai-model-for-predicting-data-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/08/pexels-guvo-20731157.jpg"/>

Machine learning is an area of AI where the likes of ChatGPT and other famous models were created. These systems were all created with neural networks.

The field of machine learning that deals with the creation of these neural networks is called deep learning.

In this blog post, we'll create a neural network with some neurons that run on a classical computer and others in quantum computers.

This way, creating and training a neural network with both types of neurons will create an AI model based on quantum computing, as most of the processing will occur in the quantum neurons.

::: note

We'll create a simple neural network, avoiding complex architectures like transformers, deep dives into quantum physics, or advanced AI model optimization techniques.

:::

::: info

The full code is available [here (<VPIcon icon="iconfont icon-github" />`tiagomonteiro0715/freecodecamp-my-articles-source-code`)](https://github.com/tiagomonteiro0715/freecodecamp-my-articles-source-code).

<SiteInfo
  name="tiagomonteiro0715/freecodecamp-my-articles-source-code"
  desc="This repository holds the code I use in my freecodecamo news articles."
  url="https://github.com/tiagomonteiro0715/freecodecamp-my-articles-source-code/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5224ca80692df1ac3e35699beb8a4297c8d6db277043cf402004d4035745fbbc/tiagomonteiro0715/freecodecamp-my-articles-source-code"/>

:::

---

## Introduction to AI, Hybrid Neural Networks and Its Benefits

![Photo by [<VPIcon icon="fas fa-globe"/>Pavel Danilyuk](https://pexels.com/photo/elderly-man-thinking-while-looking-at-a-chessboard-8438918/)](https://freecodecamp.org/news/content/images/2024/08/pexels-pavel-danilyuk-8438918.jpg)

### What is Deep Learning in Artificial Intelligence?

Deep learning is a subfield of AI that uses neural networks to predict complex patterns like weather, classifying images, responding to text, and so on.

The bigger the neural network, the more complex things it can do. Like ChatGPT, which can process natural language to interact with users.

### Neural Networks

![Simple Neural Network](https://freecodecamp.org/news/content/images/2024/08/Firefox_Screenshot_2024-08-03T13-56-12.699Z.png)

Deep learning is the training of neural networks to predict future data. Training a neural network involves feeding it data, allowing it to learn, and then making predictions.

Neural networks are composed of many neurons organized in layers. All layers get different patterns of the data.

This layer type structure allows AI models to interpret complex data and patterns. For example, the neural network in the image above can, for example, with 8 characteristics of data from the weather, be trained to predict whether if it will rain or not.

The layer that takes data is called the input layer and the final one is called the output layer. Between these are the hidden layers that capture complex patterns.

Of course, this is a very simple neural network, but the idea of training a neural network is the same for any complex architecture.

### Hybrid Neural Networks - Combining Quantum and Classical Computing

We'll now create a hybrid neural network. Essentially, the input and outputs layers will operate on classical computers while the hidden layer will process data on a quantum computer.

This approach uses the best of classical and quantum computing to train a neural network.

### Why Choose Hybrid Neural Networks Over Traditional Neural Networks?

![Photo by [<VPIcon icon="fas fa-globe"/>Burak The Weekender](https://pexels.com/photo/lighted-light-bulb-in-selective-focus-photography-45072/)](https://freecodecamp.org/news/content/images/2024/08/pexels-weekendplayer-45072.jpg) **

The main idea of using a hybrid neural network is to make the processing of data occur in a quantum computer, which is a lot faster than a classical computer.

In addition, quantum computers perform certain tasks with far less energy consumption. This efficiency in processing and energy usage allows the creation of smaller and more reliable AI models.

This is the main idea of a hybrid neural network: to create smaller and more efficient AI models.

---

## Quantum AI in Action: Predicting Iris Flower Data with Python

![Photo by [<VPIcon icon="fas fa-globe"/>Google DeepMind](https://pexels.com/photo/quantum-computing-and-ai-25626507/)](https://freecodecamp.org/news/content/images/2024/08/pexels-googledeepmind-25626507.jpg)

In this code, we'll create a quantum based AI model to predict the species of iris flowers from the famous Iris dataset.

The code uses a quantum simulator called `default.qubit`, which mimics a quantum computer behavior on a classical computer.

This is possible because of the use of mathematical models to simulate quantum operations.

However, with some code alterations, you can run this code on the IBM, Amazon or Microsoft platforms to make it actually run on a quantum computer

```py
import pennylane as qml
import numpy as np
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load and preprocess the Iris dataset
data = load_iris()
X = data.data
y = data.target

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# One-hot encode the labels
encoder = OneHotEncoder(sparse=False)
y_onehot = encoder.fit_transform(y.reshape(-1, 1))

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_onehot, test_size=0.2, random_state=42)

# Define a quantum device
n_qubits = 4
dev = qml.device('default.qubit', wires=n_qubits)

# Define a quantum node
@qml.qnode(dev)
def quantum_circuit(inputs, weights):
    for i in range(len(inputs)):
        qml.RY(inputs[i], wires=i)

    for i in range(n_qubits):
        qml.RX(weights[i], wires=i)
        qml.RY(weights[n_qubits + i], wires=i)

    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

# Define a hybrid quantum-classical model
def hybrid_model(inputs, weights):
    return quantum_circuit(inputs, weights)

# Initialize weights
np.random.seed(0)
weights = np.random.normal(0, np.pi, (2 * n_qubits,))

# Define a cost function
def cost(weights):
    predictions = np.array([hybrid_model(x, weights) for x in X_train])
    loss = np.mean((predictions - y_train) ** 2)
    return loss

# Optimize the weights using gradient descent
opt = qml.GradientDescentOptimizer(stepsize=0.1)
steps = 100
for i in range(steps):
    weights = opt.step(cost, weights)
    if i % 10 == 0:
        print(f"Step {i}, Cost: {cost(weights)}")

# Test the model
predictions = np.array([hybrid_model(x, weights) for x in X_test])
predicted_labels = np.argmax(predictions, axis=1)
true_labels = np.argmax(y_test, axis=1)

# Calculate the accuracy
accuracy = accuracy_score(true_labels, predicted_labels)
print(f"Test Accuracy: {accuracy * 100:.2f}%")
```

![](https://freecodecamp.org/news/content/images/2024/08/1-1.png)

Let's see the code block by block!

### Import Libraries

```py
import pennylane as qml
import numpy as np
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
```

::: info In this part of the code we imported the necessary libraries:

- `pennylane` and `pennylane.numpy`: For creating and manipulating quantum circuits.
- `sklearn.datasets`: To load the Iris dataset.
- `sklearn.preprocessing`: For data preprocessing like scaling and encoding.
- `sklearn.model_selection`: For splitting the data into training and testing sets.
- `sklearn.metrics`: To evaluate the model's accuracy.

:::

### Load and Preprocess the Iris Dataset

```py
# Load and preprocess the Iris dataset
data = load_iris()
X = data.data
y = data.target

# Standardize the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# One-hot encode the labels
encoder = OneHotEncoder(sparse=False)
y_onehot = encoder.fit_transform(y.reshape(-1, 1))

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_onehot, test_size=0.2, random_state=42)
```

::: info Here, we prepared the data for training the neural network:

- Loads the Iris dataset and extracts features (`X`) and labels (`y`).
- Standardizes the features to have zero mean and unit variance using `StandardScaler`.
- One-hot encodes the labels for multi-class classification using `OneHotEncoder`.
- Splits the dataset into training and test sets with a ratio of 80/20. ### Define the Quantum Device and Circuit

:::

```py
# Define a quantum device
n_qubits = 4
dev = qml.device('default.qubit', wires=n_qubits)

# Define a quantum node
@qml.qnode(dev)
def quantum_circuit(inputs, weights):
    for i in range(len(inputs)):
        qml.RY(inputs[i], wires=i)

    for i in range(n_qubits):
        qml.RX(weights[i], wires=i)
        qml.RY(weights[n_qubits + i], wires=i)

    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]
```

::: info This segment defines the quantum device and circuit:

- Sets up a quantum device with 4 qubits using PennyLane's default simulator.
- Defines a quantum circuit (`quantum_circuit`) that takes inputs and weights. The circuit applies rotation gates (`RY`, `RX`) to encode inputs and parameters, and measures the expectation values of `PauliZ` operators on each qubit.

:::

### Define the Hybrid Model and Initialize Weights

```py
# Define a hybrid quantum-classical model
def hybrid_model(inputs, weights):
    return quantum_circuit(inputs, weights)

# Initialize weights
np.random.seed(0)
weights = np.random.normal(0, np.pi, (2 * n_qubits,))
```

::: info Here, we actually created the model and started its weights.

- Defines a hybrid model function that utilizes the quantum circuit.
- Initializes the weights for the model using a normal distribution with a specified seed for reproducibility.

:::

### Define the Cost Function and Optimize Weights

```py
# Define a cost function
def cost(weights):
    predictions = np.array([hybrid_model(x, weights) for x in X_train])
    loss = np.mean((predictions - y_train) ** 2)
    return loss

# Optimize the weights using gradient descent
opt = qml.GradientDescentOptimizer(stepsize=0.1)
steps = 100
for i in range(steps):
    weights = opt.step(cost, weights)
    if i % 10 == 0:
        print(f"Step {i}, Cost: {cost(weights)}")
```

::: info Finally, we started training the quantum based neural network.

- Defines a cost function that calculates the mean squared error between predictions and true labels.
- Uses PennyLane's `GradientDescentOptimizer` to minimize the cost function by updating weights iteratively. It prints the cost every 10 steps to track progress.

:::

It prints out:

```plaintext title="output"
Step 0, Cost: 0.35359229278282217
Step 10, Cost: 0.3145818194833503
Step 20, Cost: 0.28937668289628116
Step 30, Cost: 0.2733108557682183
Step 40, Cost: 0.26273285477208475
Step 50, Cost: 0.25532913470009133
Step 60, Cost: 0.24973939376050813
Step 70, Cost: 0.24517135825709957
Step 80, Cost: 0.2411459409849017
Step 90, Cost: 0.23735091263019087
```

### Test the Model and Evaluate Accuracy

```py
# Test the model
predictions = np.array([hybrid_model(x, weights) for x in X_test])
predicted_labels = np.argmax(predictions, axis=1)
true_labels = np.argmax(y_test, axis=1)

# Calculate the accuracy
accuracy = accuracy_score(true_labels, predicted_labels)
print(f"Test Accuracy: {accuracy * 100:.2f}%")
```

::: info Next, we evaluate the trained model:

- Makes predictions on the test set using the optimized weights.
- Converts one-hot encoded predictions and true labels back to class labels.
- Calculates and prints the accuracy of the model using `accuracy_score`.

:::

And the final results gave:

```plaintext title="output"
Test Accuracy: 66.67%
```

An accuracy of 67% is not a good AI model result. This is because we did not optimize this neural network for this data.

We would need to change the neural network structure to get better results.

However, for this dataset, with just normal neural networks and a library like [<VPIcon icon="fas fa-globe"/>optuna](https://optuna.org/) for hyperparameter optimization, a far bigger accuracy surpassing 98% is possible and can be easily achieved.

Nevertheless, we created a simple quantum AI model.

---

## Conclusion: The Future of Efficient AI Models

![<VPIcon icon="fas fa-globe"/>Photo by [Pixabay](https://pexels.com/photo/low-angle-photography-of-grey-and-black-tunnel-overlooking-white-cloudy-and-blue-sky-210158/)](https://freecodecamp.org/news/content/images/2024/08/pexels-pixabay-210158.jpg)

Integrating quantum computing in AI allows the creation of smaller and more efficient AI models. With further advances in quantum technology, it will be more and more applied in AI.

In my point of view, the future of AI will eventually be integrated with quantum computers.

::: info Here is the full code

<SiteInfo
  name="tiagomonteiro0715/freecodecamp-my-articles-source-code"
  desc="This repository holds the code I use in my freecodecamo news articles."
  url="https://github.com/tiagomonteiro0715/freecodecamp-my-articles-source-code/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5224ca80692df1ac3e35699beb8a4297c8d6db277043cf402004d4035745fbbc/tiagomonteiro0715/freecodecamp-my-articles-source-code"/>
:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Quantum AI Model for Predicting Iris Flower Data with Python",
  "desc": "Machine learning is an area of AI where the likes of ChatGPT and other famous models were created. These systems were all created with neural networks. The field of machine learning that deals with the creation of these neural networks is called deep...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-model-for-predicting-data-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
