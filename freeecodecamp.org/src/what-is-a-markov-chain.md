---
lang: en-US
title: "What are Markov Chains? Explained With Python Code Examples"
description: "Article(s) > What are Markov Chains? Explained With Python Code Examples"
icon: iconfont icon-numpy
category:
  - Python
  - NumPy
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - numpy
  - py-numpy
  - markov
  - markov-chain
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What are Markov Chains? Explained With Python Code Examples"
    - property: og:description
      content: "What are Markov Chains? Explained With Python Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-markov-chain.html
prev: /programming/py-numpy/articles/README.md
isOriginal: false
author:
  - name: Tiago Capelo Monteiro
    url : https://freecodecamp.org/news/author/tiagomonteiro/
cover: https://freecodecamp.org/news/content/images/2024/07/miltiadis-fragkidis-2zGTh-S5moM-unsplash.jpg
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

[[toc]]

---

<SiteInfo
  name="What are Markov Chains? Explained With Python Code Examples"
  desc="There are various mathematical tools that can be used to predict the near future based on a current state. One of the most widely used are Markov chains. Markov chains allow you to predict the uncertainty of future events under certain conditions. Fo..."
  url="https://freecodecamp.org/news/what-is-a-markov-chain"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/miltiadis-fragkidis-2zGTh-S5moM-unsplash.jpg"/>

There are various mathematical tools that can be used to predict the near future based on a current state. One of the most widely used are Markov chains.

Markov chains allow you to predict the uncertainty of future events under certain conditions. For this reason, it is widely used in science, engineering, economics and many more areas.

However, there are many types of Markov Chains and each have their own applications.

This guide introduces what Markov chains are, different types of Markov chains, including Discrete-Time, Continuous-Time, Reversible, and a code example of Hidden Markov Models (HMMs).

We will see:

---

## Analogy

Imaging that you want to predict the weather tomorrow, and it **only** depends on the weather today. The weather can be either sunny or rainy.

Here are the probabilities:

- If it's sunny today, there's an 80% chance that it will be sunny again tomorrow, and a 20% chance that it will be rainy.
- If it's rainy today, there's a 50% chance that it will be sunny tomorrow, and a 50% chance that it will be rainy.

In this scenario, we can predict future states of the weather based on current states using probabilities.

This idea of predicting the future based solely probabilities of the present is called Markov chain.

Here, the states are either sunny or rainy and the probabilities describe the chances of the weather changing based on the current state.

---

## Markov Chain Explained in Plain English

A Markov chain describes random processes where systems move between states, and a new state only depends on the current state, not on how it got there.

Mathematically, Markov chains are called stochastic models because they model (simulate) real life events that are random by nature (stochastic).

Markov chains are very easy to implement and efficient at modeling complex systems.

Another key advantage is their "memoryless" property. This makes it faster to run on computers, and powerful to study random processes and make prediction based on current conditions.

---

## Applications of Markov Chains

At some level, almost all real-life events are stochastic. In other words, they involve randomness and uncertainty.

This is exactly why they are so widely used. They can predict the behavior of systems based on current conditions.

In finance, they are used to detect changes in credit ratings for forecasting market regimes.

In genetics, they help understand how proteins change over time. Which is important when studying genetic variations.

In robotics, they assist with decision-making by predicting the robot's next move based on current observation.

There, real life examples show how effective Markov chains can be used to solve real life problems in different fields.

---

## Types of Markov Chains

There are many types of Markov chains. In this section, we'll only discuss the most important variants of Markov chains.

### Discrete-Time Markov Chains (DTMCs)

In DTMCs, the system changes state at specific time steps. They are called discrete because the state transitions occur at distinct, separate time intervals.

They are used in queuing theory (study of the behavior of waiting lines), genetics, and economics because they are simple to analyze.

### Continuous-Time Markov Chains (CTMCs)

CTMCs differ from DTMCs in that state transitions can occur at any continuous time point, not at fixed intervals.

This makes them stochastic models where state changes happen continuously. This is important in chemical reactions and reliability engineering.

### Reversible Markov Chains

Reversible Markov chains are special. The process of state change is the same whether the direction is forwards or backwards, like rewinding a video and playing it again.

This property makes it easier to know when a system is stable and study how a system behaves over time. They are widely used in statistical physics and economics

### Doubly Stochastic Markov Chains

Doubly stochastic Markov chains are defined by a transition probability matrix. In the matrix, the sum of the probabilities in each row and each column equals 1. This means each row and each column represent a valid probability distribution. In other words, each row and column represent a list of chances for different outcomes.

This property is crucial in quantum computing and statistical mechanics.

Thanks to Doubly stochastic Markov chains, systems change in a way that preserves probabilities and symmetry, making the modeling and analysis of quantum computing systems far more accurate.

---

## Hidden Markov Chains Code Example

Before we jump into code examples, lets first understand what Hidden Markov Chains are.

### Hidden Markov Chains: Modeling Unseen States

The main idea behind hidden Markov chains is to model systems that have hidden states (states we do not know their values) which can only be discovered through observable events.

In other words, hidden Markov chains allow us to predict the behavior of a system by:

- Considering the likelihood of moving from one state to another.
- Knowing the probability of observing a certain event from each state

We can understand this by observing how the states change from an indirect point of view.

We many not know the states original values.

But by knowing the way they change, we can predict what their values will be in the future.

This way, hidden Markov chains are flexible in modeling sequences, capturing both the transitions between hidden states and the observable outcomes.

Because of this, hidden Markov models are used in fields such as engineering, financial modeling, speech recognition, bioinformatics, and many more.

### Code Example

In this code example, we will see a simple example with synthetic data.

Here is the full code:

```py :collapsed-lines
import numpy as np
from hmmlearn import hmm

# Set random seed for reproducibility
np.random.seed(42)

# Define the HMM parameters
n_components = 2  # Number of states
n_features = 1    # Number of observation features

# Create a Gaussian HMM
model = hmm.GaussianHMM(n_components=n_components, covariance_type="diag")

# Define transition matrix (rows must sum to 1)
model.startprob_ = np.array([0.6, 0.4])
model.transmat_ = np.array([[0.7, 0.3],
                            [0.4, 0.6]])

# Define means and covariances for each state
model.means_ = np.array([[0.0], [3.0]])
model.covars_ = np.array([[0.5], [0.5]])

# Generate synthetic observation data
X, Z = model.sample(100)  # 100 samples

# Create a new HMM instance
new_model = hmm.GaussianHMM(n_components=n_components, covariance_type="diag", n_iter=100)

# Fit the model to the data
new_model.fit(X)

# Print the learned parameters
print("Transition matrix:")
print(new_model.transmat_)
print("Means:")
print(new_model.means_)
print("Covariances:")
print(new_model.covars_)

# Predict the hidden states for the observed data
hidden_states = new_model.predict(X)

print("Hidden states:")
print(hidden_states)
```

![Full code](https://freecodecamp.org/news/content/images/2024/06/1.png)

Lets see the code block by block!

### Import libraries and set random seed

```py
import numpy as np
from hmmlearn import hmm

np.random.seed(42)
```

![Import libraries and set random seed](https://freecodecamp.org/news/content/images/2024/06/2.png)

In this block of code, we imported two python libraries:

- [<VPIcon icon="iconfont icon-numpy"/>NumPy](https://numpy.org/): For numerical operations.
- [<VPIcon icon="fas fa-globe"/>hmmlearn](https://hmmlearn.readthedocs.io/en/latest/index.html): For hidden Markov model implementation.

Next we defined with the `numpy` library a random seed.

#### What is a Random Seed?

A random seed is a value used to start a pseudorandom number generator.

With a fixed random seed, we ensure that the sequence of pseudorandom numbers generated is always the same.

This allows us to duplicate experiments and verify results.

The specific value of the seed does not matter as long as it remains consistent.

### Define the HMM parameters and create a Gaussian HMM

```py
n_components = 2  # Number of states
n_features = 1    # Number of observation features

model = hmm.GaussianHMM(n_components=n_components, covariance_type="diag")
```

![Define the HMM parameters and create a Gaussian HMM](https://freecodecamp.org/news/content/images/2024/06/3.png)

In this code block, we created a HMM with two hidden states and a single observed variable.

`covariance_type "diag"` means the matrices that represent covariance–how two variables change together–are diagonal. In other words, each row and column is assumed to be independent of the others.

This implies that the probability distributions of each row and column are independent of each other.

However, there is still something strange when we defined the hidden Markov chain.

#### What Does "Gaussian" Mean?

This is a very big topic in statistics, but in a few words, Markov chains can only be created when we specify the transition probabilities—chances of moving from one state to another in a Markov chain—and an initial probability distribution.

A Gaussian HMM assumes events are initially modeled by a Gaussian distribution, also called a normal distribution.

![Normal distribution](https://freecodecamp.org/news/content/images/2024/06/normal-distribution.png)

A normal distribution is like a bell-shaped curve that describes how things are often spread out in nature.

The normal distribution is crucial because it describes many natural occurrences like human heights, measurement errors, how likely a disease might spread and many more.

And while many natural events may not be described by a normal distribution with the [<VPIcon icon="fas fa-globe"/>central limit theorem](https://investopedia.com/terms/c/central_limit_theorem.asp), they can be approximated to be described by a normal distribution.

This way, many hidden Markov models (HMMs) are defined by a normal distribution, which represents many phenomena in nature and society

In the hmmlearn library, there is also the possibility of creating Markov chains based on Poisson distributions.

In simple words, Poisson distributions model probabilities that describe the occurrence of events over a fixed interval of time or space. This is widely used in telecommunications.

HMMs based on a Poisson distribution would predict events that often happen to be random and independent over a specified interval.

### Define transition matrix , means and covariances for each state

```py
model.startprob_ = np.array([0.6, 0.4])
model.transmat_ = np.array([[0.7, 0.3],
                            [0.4, 0.6]])

model.means_ = np.array([[0.0], [3.0]])
model.covars_ = np.array([[0.5], [0.5]])
```

![Define transition matrix , means and covariances for each state](https://freecodecamp.org/news/content/images/2024/06/4.png)

#### `model.startprob_ = np.array([0.6, 0.4])`

- This line sets the initial state probabilities for a Hidden Markov Model (HMM). It indicates that there is a 60% probability of starting in state 0 and a 40% probability of starting in state 1. `model.transmat_ = np.array([[0.7, 0.3], [0.4, 0.6]])`:

- This line sets the state transition probability matrix for the HMM. The matrix specifies the probabilities of moving from one state to another:
- From state 0, there is a 70% chance of staying in state 0 and a 30% chance of transitioning to state 1.
- From state 1, there is a 40% chance of transitioning to state 0 and a 60% chance of staying in state 1. `model.means_ = np.array([[0.0], [3.0]])`:

- This line sets the mean values for the observation distributions in each state. It indicates that the observations are normally distributed with a mean of 0.0 in state 0 and a mean of 3.0 in state 1. `model.covars_ = np.array([[0.5], [0.5]])`:

- This line sets the covariance values for the observation distributions in each state. It specifies that the variance (covariance in this 1-dimensional case) of the observations is 0.5 for both state 0 and state 1. ### Create data, new HMM instance and fit the model with the data

```py
X, Z = model.sample(100)  # 100 samples

new_model = hmm.GaussianHMM(n_components=n_components, covariance_type="diag", n_iter=100)

new_model.fit(X)

print("Transition matrix:")
print(new_model.transmat_)
print("Means:")
print(new_model.means_)
print("Covariances:")
print(new_model.covars_)
```

![Create data, new HMM instance and fit the model with the data](https://freecodecamp.org/news/content/images/2024/06/5.png)

In this code, we created a model with 100 samples, iterated it 100 times, and printed the new state transition matrix, means, and covariances.

In other words, we generated 100 samples from the original model, fit a new Hidden Markov Model (HMM) to these samples, and then printed the learned parameters of this new model.

- **X** means the observed data samples generated by the original model.
- **Z** means the hidden state sequences corresponding to the observed data samples generated by the original model.

**The transition matrix prints out:**

```plaintext
[[0.8100804  0.1899196 ]
 [0.49398918 0.50601082]]
```

Which means that the model tends to stay in state 0 and has nearly equal chances of switching or staying when in state 1. **The means print out:**

```plaintext
[[0.01577373]
 [3.06245496]]
```

Which means that the average observed value is approximately 0.016 in state 0 and 3.062 in state 1. **The covariances print out:**

```plaintext
[[[0.41987084]]
 [[0.53146802]]]
```

Which means that the observed values varies by about 0.420 in state 0 and 0.531 in state 1. This way, we may never know exactly the values of the states, but we know:

- How they tend to change with each other
- Their average observed value
- How they vary

### Predict the hidden states for the observed data

```plaintext
hidden_states = new_model.predict(X)

print("Hidden states:")
print(hidden_states)
```

![Predict the hidden states for the observed data](https://freecodecamp.org/news/content/images/2024/06/6.png)

In this code, based on the X observed data samples, we predicted the new states of the Markov model.

The hidden states print out:

```plaintext
[0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1 0 0 1 1 0 1 1 0 1 0 0 0 1
 1 1 1 1 0 0 0 1 1 0 0 1 1 1 1 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1 0 0 0 0
 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 0 0 0 0 0 1 1 0 0 0]
```

Which means that the hidden states switch between state 0 and state 1, showing how the system changes states over time.

---

## Conclusion: The Future of Markov Chains

Markov chains are widely used in STEM fields due to their ability to predict the future based on the present.

Markov chains have been integrated more with artificial intelligence, improving automation and predicative analytics of systems.

Additionally, the development of more computationally efficient Markov chains is a big priority, making them more accessible for real-time processing and large-scale simulations.

In summary, Markov chains are a very important tool in science due to their ability to predict the future.

With AI and more computational efficiency, Markov chains can be applied in many other fields and solve many problems.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Markov Chains? Explained With Python Code Examples",
  "desc": "There are various mathematical tools that can be used to predict the near future based on a current state. One of the most widely used are Markov chains. Markov chains allow you to predict the uncertainty of future events under certain conditions. Fo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-is-a-markov-chain.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
