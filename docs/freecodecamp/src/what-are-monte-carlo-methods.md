---
lang: en-US
title: "What Are Monte Carlo Methods? How to Predict the Future with Python Simulations"
description: "Article(s) > What Are Monte Carlo Methods? How to Predict the Future with Python Simulations"
icon: iconfont icon-tensorflow
category: 
  - Python
  - Tensorflow
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
  - tensorflow
  - py-tensorflow
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Are Monte Carlo Methods? How to Predict the Future with Python Simulations"
    - property: og:description
      content: "What Are Monte Carlo Methods? How to Predict the Future with Python Simulations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/what-are-monte-carlo-methods.html
prev: /programming/py-tensorflow/articles/README.md
date: 2024-07-17
isOriginal: false
author:
  - name: Tiago Capelo Monteiro
    url : https://freecodecamp.org/news/author/tiagomonteiro/
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/07/pexels-matej-117839-716661.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tensorflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-tensorflow/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---
<SiteInfo
  name="What Are Monte Carlo Methods? How to Predict the Future with Python Simulations"
  desc="Monte Carlo methods have revolutionized programming and engineering. These methods use the power of randomness, which makes them effective tools that help developers solve difficult problems in many fields. Monte Carlo methods have been adopted in ph..."
  url="https://freecodecamp.org/news/what-are-monte-carlo-methods/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2024/07/pexels-matej-117839-716661.jpg"/>

Monte Carlo methods have revolutionized programming and engineering.

These methods use the power of randomness, which makes them effective tools that help developers solve difficult problems in many fields.

Monte Carlo methods have been adopted in physics, finance, engineering and many other areas where deterministic methods are often impractical to solve problems.

With Monte Carlo methods, simulations and very complex computations have become efficient and easy to manage.

There are many variants of Monte Carlo methods. But all of them share the idea of using randomness to approximate solutions to hard problems. In this article, you'll learn all about Monte Carlo methods.

::: note Pre-requisites

You should have a basic knowledge of statistics to understand everything in this article.

If you need to brush up on your stats skills, I recommend checking out this freeCodeCamp course:

:::

---

## Understanding Monte Carlo Methods Through an Analogy

![Photo by [<VPIcon icon="fas fa-globe"/>veeterzy on Pexels](https://pexels.com/photo/green-leafed-tree-38136/)≈](https://freecodecamp.org/news/content/images/2024/07/2.jpg)

Imagine you want to find the average height of trees in a big forest.

Measuring every tree is impossible and impractical. But with Monte Carlo methods, it's possible to randomly select a few spots in the forest and measure the height of all the trees in those spots.

By doing this many times and averaging all these measurements, we can estimate the average height of all the trees in the forest.

This way, it's possible to make great estimations in large and complex populations by finding small and manageable samples and averaging them out.

---

## What Are Monte Carlo Methods? A Plain English Guide

![Photo by [<VPIcon icon="fas fa-globe"/>Jonathan Petersson on Pexels](https://pexels.com/photo/photo-of-two-red-dices-965879/)≈](https://freecodecamp.org/news/content/images/2024/07/pexels.jpg)

Monte Carlo methods are a type of computer algorithm that uses repeated random measurements to obtain approximate results for a given problem.

They are a part of the mathematical field called [**numerical analysis**](/freecodecamp.org/numerical-analysis-explained-how-to-apply-math-with-python.md) – the use of approximation methods to find solutions where deterministic methods are impractical.

The main idea is to find good enough approximate solutions to solve problems that are too hard or impossible to solve directly.

These solutions are obtained by getting an average of many randomly chosen samples from the population of the problem at hand.

This way, in systems with many uncertain factors and interacting parts, Monte Carlo methods are able to provide insights into how the system behaves and performs.

They are based on the mathematical idea of the [<VPIcon icon="fas fa-globe"/>Law of large numbers](https://investopedia.com/terms/l/lawoflargenumbers.asp) in probability theory:

::: info (<VPIcon icon="fas fa-globe"/><code>investopedia.com</code>)

> The average of many independent, identically distributed random variables converges to the expected value, if it exists.

<SiteInfo
  name="Law of Large Numbers: What It Is, How It's Used, and Examples"
  desc="Discover how the law of large numbers explains why larger samples lead to more accurate estimates of a population's true average."
  url="https://investopedia.com/terms/l/lawoflargenumbers.asp/"
  logo="https://investopedia.com/favicon.ico"
  preview="https://investopedia.com/thmb/8GjAKhjJc5DeW33VQA_JYQ5Ildk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/LargeNumbers_updated-866ea081bc2e47fca4807830bc5364db.png"/>

:::

The main problem of Monte Carlo methods is the lack of computer resources to make many simulations to get good results.

### Why are they called "Monte Carlo"?

Monte Carlo methods, named after the [<VPIcon icon="fas fa-globe"/>Monte Carlo Casino in Monaco](https://montecarlosbm.com/en/casino-monaco/casino-monte-carlo), were coined by mathematicians during the 1940s Manhattan Project.

[<VPIcon icon="fas fa-globe"/>Stanislaw Ulam](https://britannica.com/biography/Stanislaw-Ulam), [<VPIcon icon="fas fa-globe"/>John von Neumann](https://britannica.com/biography/John-von-Neumann), and others were involved in this project, which developed the American nuclear bomb.

The name reflects the randomness in their simulations, akin to the random outcomes in casino gambling.

---

## Real-World Applications of Monte Carlo Methods

### Circuit design in electrical engineering

![Photo from [<VPIcon icon="fas fa-globe"/>Pixabay](https://pexels.com/photo/close-up-photography-of-computer-motherboard-163125/)≈](https://freecodecamp.org/news/content/images/2024/07/circuit.jpg)

Circuits have many components. Here are some of them:

- Resistors
- Inductors
- Capacitors
- Diodes
- Transistors

Because of the temperatures of the environment they're in, sometimes the circuits may not work.

So, how do engineers design temperature-resilient circuits?

In other words: how can we test a circuit's performance at different temperatures?

Thanks to Monte Carlo methods, we can simulate many intervals of temperature conditions and see their effects on circuit components and how much they affect circuit performance.

This way, we can gather data on how the components should perform under different thermal stresses.

This way, we can optimize the circuit – whether to change the circuit design or choose different components – to work across many environmental conditions.

### Rocket design in aerospace engineering

![Photo from [<VPIcon icon="fas fa-globe"/>Pixabay](https://pexels.com/photo/white-rocket-2159/)≈](https://freecodecamp.org/news/content/images/2024/07/rocket.jpg)

Rocket design involves many different variables, such as:

- Material properties
- Aerodynamic forces
- Propulsion efficiency
- Environmental conditions.

Monte Carlo methods allow for numerous simulations with varying material properties, propulsion efficiency, and more design variables.

This helps in deeply understanding rocket behavior under diverse conditions.

In essence, this stochastic way of solving a big problem is key in understanding the probability behavior of the rocket's performance, like:

- Trajectory
- Stability
- Structural integrity

By analyzing how these design variables affect the probability behavior of crucial rocket flying performance metrics, engineers can make rockets safer and more reliable.

### Financial Portfolio optimization in finance and investing

![Photo by [<VPIcon icon="fas fa-globe"/>energepic.com](https://pexels.com/photo/close-up-photo-of-monitor-159888/)≈](https://freecodecamp.org/news/content/images/2024/07/finance.jpg)

In finance portfolio optimization, what is the best mix of assets in a portfolio to maximize returns while minimizing risk?

Monte Carlo methods are used to [<VPIcon icon="fas fa-globe"/>simulate](https://quantconnect.com/learning/articles/introduction-to-options/stochastic-processes-and-monte-carlo-method) how good a portfolio is at maximizing returns while minimizing risk under various market conditions.

By generating many random scenarios for asset prices and returns, banks and financial institutions can know, under different conditions, portfolio outcomes and manage risk.

This way, it's possible to make data-driven decisions to find a balance between risk and rewards.

---

## Exploring Different Types of Monte Carlo Methods

There are many variants of Monte Carlo methods. Here are some of the most important:

### Classical Monte Carlo

Classical Monte Carlo uses random samples to estimate values and simulate systems. It's useful for tasks where direct solutions are hard to find, like numerical integration

### Bayesian Monte Carlo

Bayesian Monte Carlo improves estimations by using existing information with new observations to make better predictions.

It is called Bayesian Monte Carlo because it uses [**Bayes' theorem**](/freecodecamp.org/bayes-rule-explained.md).

Bayes' theorem was created by the mathematician Thomas Bayes and it's very important in probability theory.

The main idea of the theorem is to **revise existing beliefs with new data.**

This method is ideal when you have some existing information about the problem.

### Markov Chain Monte Carlo (MCMC)

For large datasets, Monte Carlo methods often take too long to compute results.

One way to solve this problem is to use a smaller version of big datasets. This is kind of like how a summary **represents** the content of a book because it is quicker to read.

This smaller version is called a [**Markov Chain**](/freecodecamp.org/what-is-a-markov-chain.md).

In simple words, Markov Chains are models that show how a system moves between states.

A large dataset can be seen as a system and the states as patterns of data.

This way, Markov Chains are simple models that can **represent** a large dataset because they show how things change from one state to another.

This state change can represent, with fewer numbers, the important patterns in the data.

This way, from the Markov Chain, the Monte Carlo method computes its results.

Essentially, the Monte Carlo makes its predictions **indirectly** from the original data. The Markov Chain acts as a **data preprocessing** step to compute the Monte Carlo results.

In the end, MCMC is just a regular but far more computationally efficient Monte Carlo method.

### Other variants

Other methods like *Gradient, Semi-Gradient, and Quasi Monte Carlo* focus as well on computational efficiency. But in this article, I only seek to highlight the importance of Monte Carlo methods in science, engineering, and programming.

---

## Practical Implementation: Monte Carlo Methods in Python

In the code below, you will see how to implement an MCMC variant in Python.

I'll demo a popular variant of MCMC called Hamiltonian Monte Carlo (HMC).

It is called Hamiltonian because it uses concepts from Hamiltonian mechanics to propose new states for the Markov chains in the data pre-processing step.

### What is Hamiltonian Mechanics?

To answer this, you need to know a bit about classical mechanics.

Classical mechanics uses Newton's laws of motion to explain how physical systems behave and change over time.

Hamiltonian mechanics is another way to look at these systems. It often emphasizes the role of energy and its conservation by using different variables like generalized positions and momenta.

This unique way of describing a system's state and evolution is used in HMC.

### Main code example objective

We will create a target distribution from a 2D Gaussian distribution using TensorFlow Probability. This means that the HMC will model this target distribution.

The 2D Gaussian distribution is created with synthetic data to demonstrate the approximation process using Hamiltonian Monte Carlo.

In other words, HMC will represent this 2D Gaussian distribution accurately.

In real-life scenarios, from circuits to finance, all systems can be described as a probability distribution.

The Monte Carlo methods approximate these complex distributions. And the MCMC makes this process far faster.

In this simple code example, I am approximating a simple target distribution so that you can understand how, in a real life scenario, this would be applied.

Here is the full code (we'll walk through it step by step below):

```py :collapsed-lines
import tensorflow as tf
import tensorflow_probability as tfp

# Define the target distribution (2D Gaussian)
def target_log_prob(x, y):
    return -0.5 * (x**2 + y**2)

# Initialize the HMC transition kernel
num_results = 1000
num_burnin_steps = 500

hmc = tfp.mcmc.HamiltonianMonteCarlo(
    target_log_prob_fn=lambda x, y: target_log_prob(x, y),
    num_leapfrog_steps=3,
    step_size=0.1
)

# Define the trace function to record the state and kernel results
@tf.function
def run_chain(initial_state, kernel, num_results, num_burnin_steps):
    return tfp.mcmc.sample_chain(
        num_results=num_results,
        num_burnin_steps=num_burnin_steps,
        current_state=initial_state,
        kernel=kernel,
        trace_fn=lambda _, pkr: pkr
    )

# Run the MCMC chain
initial_state = [tf.zeros([]), tf.zeros([])]
samples, kernel_results = run_chain(initial_state, hmc, num_results, num_burnin_steps)

# Extract the samples and log
samples_ = [s.numpy() for s in samples]
samples_x, samples_y = samples_

print("Acceptance rate: ", kernel_results.is_accepted.numpy().mean())
print("Mean of x: ", samples_x.mean())
print("Mean of y: ", samples_y.mean())
```

![Pratical implementation of Markov Chain Monte Carlo Method](https://freecodecamp.org/news/content/images/2024/07/1-3.png)

Let's understand how the code works step by step.

### Import the libraries

```py
import tensorflow as tf
import tensorflow_probability as tfp
```

![Importing libraries](https://freecodecamp.org/news/content/images/2024/07/2-2.png)

In this code, we import two Python libraries:

- [<VPIcon icon="iconfont icon-tensorflow"/>TensorFlow](https://tensorflow.org/): Building and training machine learning models
- [<VPIcon icon="iconfont icon-tensorflow"/>TensorFlow Probability](https://tensorflow.org/probability): Probabilistic reasoning and statistical modeling

### Create a target distribution

```py
def target_log_prob(x, y):
    return -0.5 * (x**2 + y**2)
```

![Creating target distribution](https://freecodecamp.org/news/content/images/2024/07/3-1.png)

In this code, we define a 2D Gaussian distribution:

![2D Gaussian distribution](https://freecodecamp.org/news/content/images/2024/07/output-1.png)

This graph is defined by:

$$
-0.5\times\left(x^{2}+y{2}\right)
$$

By being a 2D Gaussian distribution, each data point is represented by two correlated variables that follow a joint Gaussian distribution.

If this were a real-life scenario, we would be modeling a system by finding its probability distribution based on two variables.

In many practical applications, such as circuits, there can be dozens of variables involved.

To model such systems correctly, we often use multivariate probability distributions, which generalize the concept of the Gaussian distribution to many dimensions.

### Initialize the Markov Chain Monte Carlo

```py
num_results = 1000
num_burnin_steps = 500

hmc = tfp.mcmc.HamiltonianMonteCarlo(
    target_log_prob_fn=lambda x, y: target_log_prob(x, y),
    num_leapfrog_steps=3,
    step_size=0.1
)
```

![Initializing the Markov Chain Monte Carlo](https://freecodecamp.org/news/content/images/2024/07/4-1.png)

This block of code sets up a Hamiltonian Monte Carlo (HMC) transition kernel using TensorFlow Probability.

It first defines two variables:

- `num_results` as 1000, indicating the number of samples to generate
- `num_burnin_steps` as 500, representing the number of initial samples to discard (burn-in period).

The HMC transition kernel is set up with:

- A target log probability function that takes two inputs and returns their log probability. In our case, the target log probability function is the 2D gaussian distribution. The log probability is the likelihood of a particular set of values.
- The algorithm takes 3 steps each time.
- Each step size (Change amount) is 0.1. ### Create the trace function to record the state and kernel results

```py
@tf.function
def run_chain(initial_state, kernel, num_results, num_burnin_steps):
    return tfp.mcmc.sample_chain(
        num_results=num_results,
        num_burnin_steps=num_burnin_steps,
        current_state=initial_state,
        kernel=kernel,
        trace_fn=lambda _, pkr: pkr
    )
```

![Creating the trace function to record the state and kernel results](https://freecodecamp.org/news/content/images/2024/07/5-1.png)

The function is decorated with `@tf.function`, which optimizes it for performance by compiling it into a TensorFlow graph.

The function `run_chain` takes four arguments:

1. `initial_state`: The initial state of the Markov Chain.
2. `kernel`: The MCMC transition kernel to use (such as Hamiltonian Monte Carlo).
3. `num_results`: The number of samples to generate.
4. `num_burnin_steps`: The number of initial samples to discard (burn-in period).

The function calls `tfp.mcmc.sample_chain` to perform the MCMC sampling:

- `num_results`: The number of samples to draw.
- `num_burnin_steps`: The number of burn-in steps.
- `current_state`: The starting state of the Markov Chain.
- `kernel`: The transition kernel that defines the sampling process.
- `trace_fn`: A function that specifies what to trace during sampling. In this case, it returns the previous kernel results (`pkr`), effectively tracing the internal state of the MCMC algorithm.

### Run the MCMC chain

```py
# Run the MCMC chain
initial_state = [tf.zeros([]), tf.zeros([])]
samples, kernel_results = run_chain(initial_state, hmc, num_results, num_burnin_steps)

# Extract the samples and log
samples_ = [s.numpy() for s in samples]
samples_x, samples_y = samples_

print("Acceptance rate: ", kernel_results.is_accepted.numpy().mean())
print("Mean of x: ", samples_x.mean())
print("Mean of y: ", samples_y.mean())
```

![Running the MCMC chain](https://freecodecamp.org/news/content/images/2024/07/6.png)

Alright let's break this down as there's a lot going on here:

#### Initialize the State

- `initial_state` is set to a list containing two zero tensors, which serves as the starting point for the Markov Chain.

#### Run the MCMC Chain

- The `run_chain` function is called with the initial state, the HMC kernel, the number of results, and the number of burn-in steps.
- The function returns two values: `samples`, which are the generated samples, and `kernel_results`, which contain the results from the kernel (including diagnostic information).

#### Extract and Convert Samples

- The samples are converted from TensorFlow tensors to NumPy arrays for easier manipulation and analysis.
- `samples_` is a list comprehension that converts each sample tensor to a numpy array.
- `samples_x` and `samples_y` are the extracted samples for the two dimensions.

#### Print Diagnostics

- The acceptance rate of the MCMC sampler is calculated and printed. It shows the proportion of accepted proposals during sampling.
- The means of the samples for both dimensions (`x` and `y`) are calculated and printed to provide a summary of the sampling results.

This gives as results:

- Acceptance rate: 1.0. This means all proposals made during sampling were accepted
- Mean of x: -0.11450629 and mean of y: -0.23079416. In a perfect 2D Gaussian distribution, the means of x and y are 0. With this MCMC variant, we are approximating the 2D Gaussian distribution. But it's close to zero. This means that, given more computational time, it probably would go to an even smaller number until it was so small it could be considered zero.

---

## Conclusion: The future of Monte Carlo methods

The future of Monte Carlo methods lies in the creation of variants that require fewer computational resources and save time.

With these advancements, Monte Carlo methods will find additional applications in more fields.

Thanks to Monte Carlo methods, we are able to model complex systems and phenomena that were previously impossible to do in an efficient manner.

If you want to know more, you can [**read this article on Monte Carlo methods**](/freecodecamp.org/solve-the-unsolvable-with-monte-carlo-methods-294de03c80cd/).

::: info

You can also check out the full code here:

<SiteInfo
  name="GitHub - tiagomonteiro0715/freecodecamp-my-articles-source-code: This repository holds the code I use in my freecodecamo news articles."
  desc="This repository holds the code I use in my freecodecamo news articles. - tiagomonteiro0715/freecodecamp-my-articles-source-code"
  url="https://github.com/tiagomonteiro0715/freecodecamp-my-articles-source-code/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/046cf80c1abd8872453c290307c29f2147b09e35f74a9b0c6ead1952f8163a18/tiagomonteiro0715/freecodecamp-my-articles-source-code"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Are Monte Carlo Methods? How to Predict the Future with Python Simulations",
  "desc": "Monte Carlo methods have revolutionized programming and engineering. These methods use the power of randomness, which makes them effective tools that help developers solve difficult problems in many fields. Monte Carlo methods have been adopted in ph...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/what-are-monte-carlo-methods.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
