---
lang: en-US
title: "What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance"
description: "Article(s) > What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance"
icon: iconfont icon-numpy
category: 
  - Python
  - NumPy
  - Finance
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance"
    - property: og:description`
      content: "What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/what-is-a-kalman-filter-with-python-code-examples.html
prev: /programming/py-numpy/articles/README.md
date: 2024-08-07
isOriginal: false
author:
  - name: Tiago Capelo Monteiro
    url : https://freecodecamp.org/news/author/tiagomonteiro/
cover: https://freecodecamp.org/news/content/images/size/w1000/2024/08/pexels-skitterphoto-63901.jpg
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
  "title": "Finance > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/fnce/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance"
  desc="In a world where precision is key, handling noisy data effectively is crucial for solving complex problems. Whether you're trying to control a rocket or forecast the stock market, the ability to get good data from an uncertain environment is importan..."
  url="https://freecodecamp.org/news/what-is-a-kalman-filter-with-python-code-examples/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w1000/2024/08/pexels-skitterphoto-63901.jpg"/>

In a world where precision is key, handling noisy data effectively is crucial for solving complex problems.

Whether you're trying to control a rocket or forecast the stock market, the ability to get good data from an uncertain environment is important.

This is exactly the problem Kalman filters help solve. Kalman filters offer a solution that help you deal with noisy data in many fields.

In this article, we'll discuss:

---

## Driving Through Fog: Kalman Filters as Your Headlights

![Photo by [<VPIcon icon="fas fa-globe"/>eberhard grossgasteiger](https://pexels.com/photo/forest-under-clouds-1287075)](https://freecodecamp.org/news/content/images/2024/08/pexels-eberhardgross-1287075.jpg)

Imagine you are driving through a dense fog with limited visibility.

To reach the destination, you rely on your senses and your car's navigation system that combines real-time data with a predetermined map.

As you move, the car navigation system is always constantly adjusting to get the destination, and you are always relying on your senses to drive the car well.

This process is very similar to how a Kalman Filter works.

It is constantly updating, and it refines estimates based on incoming data. Even though that data is full of noise and uncertainty.

By integrating past information with current information, a Kalman Filter gives you a clear picture of where you are and where you're headed.

---

## What are Kalman Filters?

![Photo by [<VPIcon icon="fas fa-globe"/>Mike Bird on Pexels](https://pexels.com/photo/blue-bmw-sedan-near-green-lawn-grass-170811/)](https://freecodecamp.org/news/content/images/2024/08/pexels-mikebirdy-170811.jpg)

A Kalman filter is a math algorithm used to find the state of a dynamic system from many noisy measurements.

It is often used for systems that change over time – like tracking the position of a moving object.

### How Does a Kalman Filter Work?

The Kalman filter predicts your current state based on past data, like the map and your previous location.

When new data appears, like new GPS signals, the filter compares the new data with its prediction and adjusts its estimate.

Even if the data is noisy, the Kalman filter uses a smart averaging process to improve the estimation. Like how you balance what your navigation system tells you and what you see on the road.

By always integrating new data with past data, Kalman filters help you know where you are and where you are going. This way, it is possible to predict things even in uncertain conditions.

### Why are Kalman Filters used in engineering?

Since Kalman filters are able to handle incomplete data, they are widely used to make good predictions even when the measurements are not certain.

This makes them very useful for:

- **Navigation Systems**: Estimating the position and velocity of vehicles.
- **Robotics**: Helping robots understand their environment and position.
- **Finance**: Filtering out noise from stock price data to predict trends.

This way, they are very adaptive and can process real-time information

### What problem did Kalman Filters solve?

Kalman filters were developed by Rudolf Kalman in the early 1960s to solve the problem of managing uncertainty and noise in data

Nowadays, they are great for extracting meaningful information from noisy data.

Mathematically, Kalman Filters are called linear quadratic estimators.

This is because, in the process of estimating the future based on current and past data, Kalman filters use:

- Linear algebra: The study of vectors and matrices used to solve linear equations.
- Quadratic optimization: Finding the optimal solution for problems with squared terms

---

## Kalman Filters in Action: A Step-by-Step Code Tutorial

![Photo by [<VPIcon icon="fas fa-globe"/>capt.sopon](https://pexels.com/photo/gray-airplane-control-panel-3402846/)](https://freecodecamp.org/news/content/images/2024/08/pexels-captainsopon-3402846.jpg)

Kalman Filters were created to handle linear systems – that is, systems that follow predictable patterns.

In this code example, we will implement an Extended Kalman Filter. This is a variant that was created to handle non-linear data (in other words, systems that have unpredictable or changing patterns).

Here's the full code (which we'll break down below):

```py :collapsed-lines
import numpy as np
from filterpy.kalman import ExtendedKalmanFilter as EKF
from filterpy.common import Q_discrete_white_noise

def fx(x, dt):
    """ State transition function for the nonlinear system. """
    # Example: x' = [x[0] + x[1]*dt, x[1]]
    F = np.array([x[0] + x[1]*dt, x[1]])
    return F

def hx(x):
    """ Measurement function for the nonlinear system. """
    # Example: z = [x[0]]
    return np.array([x[0]])

def jacobian_F(x, dt):
    """ Jacobian of the state transition function. """
    return np.array([[1, dt],
                     [0, 1]])

def jacobian_H(x):
    """ Jacobian of the measurement function. """
    return np.array([[1, 0]])

# Initialize EKF
ekf = EKF(dim_x=2, dim_z=1)

# Initial state
ekf.x = np.array([0, 1])

# Initial state covariance
ekf.P = np.eye(2)

# Process noise covariance
ekf.Q = Q_discrete_white_noise(dim=2, dt=1, var=0.1)

# Measurement noise covariance
ekf.R = np.array([[0.1]])

# Define the state transition and measurement functions
ekf.F = jacobian_F
ekf.H = jacobian_H

# Control input
dt = 1.0  # time step

# Simulated measurements
measurements = [1, 2, 3, 4, 5]

for z in measurements:
    # Predict step
    ekf.predict_update(z, HJacobian=jacobian_H, Hx=hx, Fx=fx, args=(dt,), hx_args=())

    # Print the current state estimate
    print("Estimated state:", ekf.x)
```

![Full code](https://freecodecamp.org/news/content/images/2024/08/1-2.png)

Let's see the code block by block.

### Import the Libraries

```py
import numpy as np
from filterpy.kalman import ExtendedKalmanFilter as EKF
from filterpy.common import Q_discrete_white_noise
```

![Importing Libraries](https://freecodecamp.org/news/content/images/2024/08/2-2.png)

In this part of the code we import the Python libraries we need:

- `import numpy as np`: This imports a tool called [<VPIcon icon="iconfont icon-numpy"/>NumPy](https://numpy.org/), which helps us work with numbers and lists of numbers (like a spreadsheet).
- `from filterpy.kalman import ExtendedKalmanFilter as EKF`: This brings in a tool called `ExtendedKalmanFilter` from the `filterpy` library. We will use this tool, named `EKF` here, to track things that change over time in a way that's not straight-line simple.
- `from filterpy.common import Q_discrete_white_noise`: This imports a function that helps us set up noise, which is like the natural "fuzziness" or uncertainty in our system.

### Define How the System Works

```py
def fx(x, dt):
    """ State transition function for the nonlinear system. """
    # Example: x' = [x[0] + x[1]*dt, x[1]]
    return np.array([x[0] + x[1]*dt, x[1]])

def hx(x):
    """ Measurement function for the nonlinear system. """
    # Example: z = [x[0]]
    return np.array([x[0]])
```

![Define How the System Works](https://freecodecamp.org/news/content/images/2024/08/3-3.png)

In this code we define how the system will work:

- `fx(x, dt)`: This function describes how our system changes over time. It says the new position is the old position plus speed times time (`x[0] + x[1]*dt`). The speed (`x[1]`) stays the same.
- `hx(x)`: This function tells us what we can measure from the system. Here, it says we can measure the position (`x[0]`).

### Define How Changes Affect the System

```py
def jacobian_F(x, dt):
    """ Jacobian of the state transition function. """
    return np.array([[1, dt],
                     [0, 1]])

def jacobian_H(x):
    """ Jacobian of the measurement function. """
    return np.array([[1, 0]])
```

![Define How the System Works](https://freecodecamp.org/news/content/images/2024/08/4-2.png)

In this code we define how changes affect the system:

- `jacobian_F(x, dt)`: This function shows us how sensitive the system is to changes in time and position. It helps the filter predict changes more accurately by considering these sensitivities.
- `jacobian_H(x)`: This function tells us how sensitive our measurement is to changes in position. It helps the filter adjust the prediction based on new measurements.

### Set Up the Kalman Filter

```py
# Initialize EKF
ekf = EKF(dim_x=2, dim_z=1)

# Initial state
ekf.x = np.array([0, 1])
print("Initial state:", ekf.x)
#
# Initial state: [0 1]

# Initial state covariance
ekf.P = np.eye(2)
print("Initial state covariance:\n", ekf.P)
#
# Initial state covariance:
#  [[1. 0.]
#  [0. 1.]]
```

![Set Up the Kalman Filter](https://freecodecamp.org/news/content/images/2024/08/5-2.png)

In this part of the code, we create a very simple Kalman filter:

- `ekf = EKF(dim_x=2, dim_z=1)`: This creates an Extended Kalman Filter that tracks two things (position and speed) and one measurement (position).
- `ekf.x = np.array([0, 1])`: This sets the starting position to `0` and speed to `1`.
- `ekf.P = np.eye(2)`: This is a way of saying we aren't very sure about our starting guesses. It's like saying "let's start from here, but we are open to changes."

### Describe Uncertainty in the System

```py
# Process noise covariance
ekf.Q = Q_discrete_white_noise(dim=2, dt=1, var=0.1)
print("Process noise covariance:\n", ekf.Q)
#
# Process noise covariance:
# [[0.025 0.05 ]
# [0.05  0.1  ]]

# Measurement noise covariance
ekf.R = np.array([[0.1]])
print("Measurement noise covariance:\n", ekf.R)
#
# Measurement noise covariance:
# [[0.1]]
```

![Describe Uncertainty in the System](https://freecodecamp.org/news/content/images/2024/08/6-2.png)

- `ekf.Q = Q_discrete_white_noise(dim=2, dt=1, var=0.1)`: This sets how much randomness or unpredictability we expect in the system itself. It's like saying, "things might not move exactly as we think."
- `ekf.R = np.array([[0.1]])`: This sets how much we trust our measurements. A smaller number means we trust them more.

### Simulate Data and Initial State

```py
# Control input
dt = 1.0  # time step

# Simulated measurements
measurements = [1, 2, 3, 4, 5]

# True initial state for comparison (not used in the EKF)
true_state = np.array([0, 1])
print("\nTrue initial state:", true_state)
#
# True initial state: [0 1]
```

![Simulate Data and Initial State](https://freecodecamp.org/news/content/images/2024/08/7-2.png)

- `dt = 1.0`: This is the time between each step of our simulation.
- `measurements = [1, 2, 3, 4, 5]`: These are the pretend measurements we will use to test the filter.
- `true_state = np.array([0, 1])`: This is the real starting position and speed of our system, used for comparison.

### Simulate Real System Changes

```py
# Simulate the true state evolution (for comparison)
true_states = [true_state[0]]
for _ in range(len(measurements) - 1):
    true_state = fx(true_state, dt)
    true_states.append(true_state[0])

print("\nSimulated true states (for reference):", true_states)
#
# Simulated true states (for reference): [0, 1.0, 2.0, 3.0, 4.0]
```

![Simulate Real System Changes](https://freecodecamp.org/news/content/images/2024/08/8-1.png)

- **Simulating True States**: This part calculates what the real position should be over time using the way the system works (`fx`). It's like having a perfect GPS to check against our estimates.

### Filter Steps to Estimate the State

```py
for i, z in enumerate(measurements):
    print(f"\nStep {i+1}:")
    print("Measurement:", z)

    # Predict step
    ekf.predict(u=0)  # Use predict_x if you need to customize the prediction
    print("Predicted state before update:", ekf.x)

    # Update step
    ekf.update(z, HJacobian=jacobian_H, Hx=hx, args=(), hx_args=())
    print("Updated state after measurement:", ekf.x)
    print("State covariance after update:\n", ekf.P)
#
# Step 1:
# Measurement: 1
# Predicted state before update: [0. 1.]
# Updated state after measurement: [0.91111111 1.04444444]
# State covariance after update:
#  [[0.09111111 0.00444444]
#  [0.00444444 1.09777778]]
# 
# Step 2:
# Measurement: 2
# Predicted state before update: [0.91111111 1.04444444]
# Updated state after measurement: [1.49614396 1.31876607]
# State covariance after update:
#  [[0.05372751 0.0251928 ]
#  [0.0251928  1.1840617 ]]
# 
# Step 3:
# Measurement: 3
# Predicted state before update: [1.49614396 1.31876607]
# Updated state after measurement: [2.15857605 1.95145631]
# State covariance after update:
#  [[0.0440489  0.0420712 ]
#  [0.0420712  1.25242718]]
# 
# Step 4:
# Measurement: 4
# Predicted state before update: [2.15857605 1.95145631]
# Updated state after measurement: [2.91071524 2.95437384]
# State covariance after update:
#  [[0.04084552 0.05446424]
#  [0.05446424 1.30228131]]
# 
# Step 5:
# Measurement: 5
# Predicted state before update: [2.91071524 2.95437384]
# Updated state after measurement: [3.74022237 4.27039095]
# State covariance after update:
#  [[0.03970292 0.06298888]
#  [0.06298888 1.33648045]]
```

![Filter Steps to Estimate the State](https://freecodecamp.org/news/content/images/2024/08/9.png)

**Loop Through Measurements**: This loop goes through each fake measurement one by one.

- **Predict Step (`ekf.predict(u=0)`)**: Before looking at the new measurement, the filter makes a guess about where the position and speed are now.
- **Update Step (`ekf.update`)**: After the guess, the filter sees the new measurement and adjusts its guess to be closer to this measurement, balancing the new information with what it previously predicted.

---

## Conclusion: Navigating Nonlinear Data with Advanced Techniques

![Photo by [<VPIcon icon="fas fa-globe"/>Noelle Otto on Pexels](https://pexels.com/photo/close-up-photography-of-magnifying-glass-906055/)](https://freecodecamp.org/news/content/images/2024/08/pexels-noellegracephotos-906055.jpg)

Kalman Filters are a powerful tool for extracting accurate estimates from noisy and incomplete data.

Variants like the Extended Kalman Filter (EKF) and Unscented Kalman Filter (UKF) have been developed to address non-linearities in data.

However, these variants can still face challenges related to stability and accuracy when applied to complex non-linear systems.

This is due to their reliance on linear approximations, which may not capture the full dynamics of highly non-linear processes.

To overcome these limitations, alternative methods such Neural Network-based approaches have gained attention.

Neural Networks can learn complex patterns directly from data, offering a robust solution for highly non-linear scenarios.

Despite these advancements, Kalman Filters remain an important tool in various fields of science and economics due to their simplicity, efficiency, and effectiveness in a wide range of applications.

As technology continues to evolve, the integration of Kalman Filters with other advanced techniques will likely enhance their capability to navigate the challenges of non-linear data more effectively.

::: info Here is the full code:

<SiteInfo
  name="tiagomonteiro0715/freecodecamp-my-articles-source-code"
  desc="This repository holds the code I use in my freecodecamo news articles."
  url="https://github.com/tiagomonteiro0715/freecodecamp-my-articles-source-code/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/046cf80c1abd8872453c290307c29f2147b09e35f74a9b0c6ead1952f8163a18/tiagomonteiro0715/freecodecamp-my-articles-source-code"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is a Kalman Filter? How to Simplify Noisy Data in Navigation and Finance",
  "desc": "In a world where precision is key, handling noisy data effectively is crucial for solving complex problems. Whether you're trying to control a rocket or forecast the stock market, the ability to get good data from an uncertain environment is importan...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/what-is-a-kalman-filter-with-python-code-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
