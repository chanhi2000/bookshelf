---
lang: en-US
title: "How Neural Networks Work: Why Straight Lines Aren't Enough"
description: "Article(s) > How Neural Networks Work: Why Straight Lines Aren't Enough"
icon: fas fa-brain
category:
  - Science
  - Mathematics
  - AI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - science
  - math
  - mathematics
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Neural Networks Work: Why Straight Lines Aren't Enough"
    - property: og:description
      content: "How Neural Networks Work: Why Straight Lines Aren't Enough"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-neural-networks-work-why-straight-lines-aren-t-enough.html
prev: /ai/articles/README.md
date: 2026-10-21
isOriginal: false
author:
  - name: Samyukta Hegde
    url: https://freecodecamp.org/news/author/samyuktashegde/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0220c2ae-5938-458c-9a87-b97a66c7945e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Mathematics > Article(s)",
  "desc": "Article(s)",
  "link": "/academcis/math/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "AI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Neural Networks Work: Why Straight Lines Aren't Enough"
  desc="A straight line equation is a good place to start understanding how a neural network works. It's what we explored in my previous article, How Neural Networks Work – Explained Using the Straight Line E"
  url="https://freecodecamp.org/news/how-neural-networks-work-why-straight-lines-aren-t-enough"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0220c2ae-5938-458c-9a87-b97a66c7945e.png"/>

A straight line equation is a good place to start understanding how a neural network works. It's what we explored in my previous article, [**How Neural Networks Work – Explained Using the Straight Line Equation (y=ax+b)**](/freecodecamp.org/neural-networks-explained-using-y-ax-b.md).

But, what if the relationship between the input and the output **isn't linear?**

We all know that in the real world, the data doesn't always follow a straight line pattern. This is where things start getting interesting: sometimes a single rule isn't enough to describe the relationship between the variables.

That’s where non-linearity comes in. It allows neural networks to capture changing behaviour in data.

In this article, we'll explore the concept of non-linearity that can capture complex relationships in data. Using a simple example, we'll try to understand piecewise linear curves, ReLU functions, S-shaped curves, and sigmoid functions in relation to how they help neural networks learn patterns that a straight line can't describe.

::: note Prerequisites

- Basic understanding of linear functions
- Familiarity with the concept of deep neural networks

:::

---

## When a Straight Line Is Enough

A straight line equation means that the same rule applies throughout the relationship.

y = ax + b

```plaintext
y => Output variable
x => Input variable
a => Amount by which y changes when x changes (slope)
b => Value of y when x is 0 (y intercept)
```

We can look at an example to understand it better.

Ms. Poly is a math teacher who wants to come up with a study plan for her students to help them ace the final exam. She creates a rule of thumb using one factor: the number of hours studied per week. This means that the mark scored by a student is directly proportionate to the hours they spend studying.

Based on her assumption, she comes up with an equation in the form y=ax+b.

```plaintext
y => Marks scored
x => Number of hours studied
a => Increase in marks for every hour studied
b => Minimum marks every student is capable of scoring without studying.
```

So, after a quarterly exam, she interviews her students and collects information on how many hours they studied math per week. She creates a table with two columns: number of hours studied (x) per week and marks scored (y) and plots them.

| Number of Hours Studied | Marks Scored |
| --- | --- |
| 0 | 40 |
| 1 | 40 |
| 2 | 41 |
| 3 | 40 |
| 4 | 48 |
| 5 | 58 |
| 6 | 69 |
| 7 | 80 |
| 8 | 80 |

But when she tries to apply her simple formula, it doesn't seem to align with the data she collected, proving that real-life data is rarely that straightforward.

---

## When a Straight Line Isn't Enough

Ms. Poly observes the graph closely and identifies a few patterns. Students who study for only a few hours may not see much improvement. Once they cross a certain point, their marks begin to increase with additional study. And again after a certain point, the marks remain fairly constant.

![Input Data: Marks scored Vs Study Hours](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/958b4685-d030-4efa-bc16-50ab231272b3.png)

Thus, Ms Poly’s simple straight line equation isn’t enough to describe the relation between number of hours studied (x) per week and marks scored (y).

Instead, it can be divided into three parts,

```plaintext
Less than t_{1} hours: Marks remain constant
t_{1} to t_{2} hours: Marks increase with study time
More than t_{2} hours: Marks remain constant
```

![Input Data: Points of Change](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/8c2fb722-bbf7-4ceb-856d-5a352190674d.png)

So, she can have separate equations for each range and write them like this:

```plaintext
y = 1st equation, x<t_{1}
y = 2nd equation, t_{1}<=x<t_{2}
y = 3rd equation, x>=t_{2}
```

This example gives us our first glimpse of non-linearity. There are changes in the relationship at specific points, so a single straight line equation is insufficient as the behaviour needs to change at different points.

A simple way to handle this is using a **piecewise linear function**.

### Piecewise Linear Curve

To begin with, for simplicity, Ms. Poly decides to consider only two regions.

```plaintext
Region1: Hours of study < t_{1}
Region2: Hours of study >= t_{1}
```

The values in the first region hover around a particular value. Even though they don’t lie perfectly in a line, she can make an approximation and represent that region as a line with slope=0. This indicates that the marks remain roughly the same.

In the second region, there seems to be a positive slope. So she decides on another straight line equation for that steep upward sloping line.

Ms. Poly ends up having two equations for the above graph because one equation can't define it. The rule changes for different ranges as the pattern changes.

So, she can write it like this:

```plaintext
y = 1st equation, x<t_{1}
y = 2nd equation, x>=t_{1}
```

![Piecewise Linear Curve](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/fe83f93e-2592-4300-b0ab-45dbcac0982c.png)

Individually, these may seem like straight line equations. But when put together, the overall relationship is no longer a straight line. When x crosses a certain value, the equation changes. This is called **piecewise linear function.** It's a function that's made up of different rules for different ranges of input.

This idea appears in one of the most widely used activation functions in neural networks: $\text{ReLU}$.

### What is a ReLU Function?

ReLU stands for Rectified Linear Unit. Mathematically, it's this:

$$
y=\text{ReLU}\left(x\right)=\text{max}\left(0,x\right)
$$

It keeps positive inputs unchanged and turns negative inputs to zero.

Here too, the individual piece is linear but the overall function is non-linear. So, ReLU is a piecewise linear function that introduces non-linearity.

The graph below shows the ReLU function:

![ReLU Function](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/589adfcc-fa25-4517-a647-ad40933ea2b4.png)

This simple change in behaviour allows a neuron to respond differently to different ranges of input, giving neural networks a way to move beyond a single straight-line relationship.

### S-Shaped Curve

Now, a piecewise linear curve does the job but Ms. Poly sees that there's quite a sharp transition from one region to the other. She had also only considered two regions for simplicity, even though the distribution can be divided into three regions.

So, she draws a smooth curve roughly passing through all the points as shown below:

![S-Shaped Curve](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/7f1fab69-ca10-43be-83a0-d490fa2de057.png)

This shape shows that the marks remain almost the same when a student studies for up to t_{1} number of hours. Then, an increase in hours of study from t_{1} to t_{2}, increases the marks scored, so there's a slope. In the end at t_{2}, it flattens out again. This transition is gradual and continuous unlike the piecewise linear curve which changes directions using simple straight lines.

The curve that Ms Poly drew isn't some random pattern. It can be represented mathematically, too. One of the functions that produces this kind of shape is the **sigmoid** function.

### What is a Sigmoid Function?

A sigmoid function is a mathematical formula that takes any real-valued input and maps it to values between 0 and 1. It slowly increases from values close to 0, rises quickly in the middle and gradually levels off at values close to 1

$$
y=\sigma\left(x\right)=\frac{1}{\left(1+\text{exp}\left(-x\right))\right)}
$$

The graph below shows the sigmoid function:

![Sigmoid Function](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/851d09c8-34ed-4757-a875-debf18cfd3b8.png)

The sigmoid function is significant in neural networks because it introduces non-linearity while also restricting the output between 0 and 1. This makes it useful when the output needs to represent a probability such as the likelihood of a student passing an exam. A higher sigmoid output indicates a higher probability of the student passing, and vice versa.

---

## Modeling a Deep Neural Network

Ms Poly should now combine the concepts of linear and non-linear equations to model a deep neural network. She has to take two separate approaches to ,

1. Predict the marks scored in the exam
2. Predict Pass/Fail in the exam

She uses two very simple untrained neural networks with manually chosen weights and biases for each. She is just trying it out to illustrate how calculations work. In reality she wouldn't choose the parameters herself. She would set up the network with weights and biases being learnt during training by repeatedly comparing the predicted values with the actual values and adjusting the parameters to minimise the error.

### Predicting Marks Using ReLU

#### Step #1: Set up the network

Ms Poly has the set up the deep neural network with simple equations in the following way:

- Input Layer: The number of hours studied (x) is received here.
- Hidden Layer: Linear transformation and ReLU is applied to the input.

$$
\begin{align*}
z&=w_{1}x+b_{1}=x-3&&\left(w_{1}=1,\:b_{1}=-3\right)\\
h&=\text{ReLU}\left(z\right)=\text{max}\left(0,z\right)
\end{align*}
$$

- Output Layer: The marks scored is predicted after applying a linear transformation to the hidden layer's output(h).

$$
\begin{aling*}
\hat{y}&=w_{2}h+b_{2}=10h+40&&\left(w_{2}=10,\:b_{2}=40\right)
\end{aling*}
$$

![](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/39480008-d925-4963-a521-5dea5988e461.png)

#### Step #2: Calculate the Predicted Marks

Suppose she wants to calculate the marks scored by a student who studies for 5 hours. This is how she does it:

$$
\begin{aling*}
z&=w_{1}x+b_{1}=x-3=5-3=2\\
h&=\text{ReLU}(z)=\text{max}\left(0,z\right)=\text{max\left(0,2\right)}=2
\end{aling*}
$$

Finally calculate the predicted marks:

$$
\begin{aling*}
\hat{y}&=w_{2}h+b_{2}=10h+40=10(2)+40=60
\end{aling*}
$$

The neural network predicts 60 marks whereas the actual marks in the dataset is 58.

#### Step #3: Compare Predictions with Actual Marks

After Ms Poly gets all the marks predicted by the neural network, she compares them with the actual data in the table below:

| Number of Hours Studied | Marks Scored | Predicted Marks |
| --- | --- | --- |
| 0 | 40 | 40 |
| 1 | 40 | 40 |
| 2 | 41 | 40 |
| 3 | 40 | 40 |
| 4 | 48 | 50 |
| 5 | 58 | 60 |
| 6 | 69 | 70 |
| 7 | 80 | 80 |
| 8 | 80 | 90 |

![](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/b0210710-a870-4b3d-a829-054d9f091538.png)

The actual and predicted marks don't match exactly, but they're close. The marks keep increasing and don't flatten out in the end because the value keeps increasing after the ReLU threshold.

Through this example Ms Poly has demonstrated how ReLU helps in modeling non-linear relationships in the data.

### Predicting Pass/Fail Using ReLU and Sigmoid

Here Ms Poly will use a neural network to predict whether a student passes or fails in the final exam. She assumes a student needs to score a minimum of 50 marks to pass. This network will be used to predict the probability of passing the exam.

#### Step #1: Set Up the Network

Ms Poly has the set up the deep neural network with simple equations in the following way:

- Input Layer: The number of hours studied (x) is received here.
- Hidden Layer: Linear transformation and ReLU is applied to the input.

$$
\begin{align*}
z_{1}&= w_{1}x + b_{1}, = x - 4      (w_{1}=1, b_{1}=-4)
h&=\text{ReLU}(z_{1}) = max(0, z_{1})
\end{align*}
$$

- Output Layer: The pass/fail is predicted after applying sigmoid activation to the linear transformation of the hidden layer's output(h).

$$
\begin{align*}
z_{2}&=w_{2}h+b_{2}=2h-1&&\left(w_{2}=2,\:b_{2}=-1)\\
p&=\sigma(z_{2})=\frac{1}{\left(1+\text{exp}\left(-z_{2}\right)\right)\\
ŷ&=\text{Pass},\:\text{if}\:p\ge{0.5}\\
ŷ&=\text{Fail},\:\text{if}\:p<0.5
\end{align*}
$$

![](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/c4508adf-b2c4-42ae-b297-29afd8ec3409.png)

#### Step #2: Calculate the Pass/Fail Prediction

Suppose she wants to predict the result for a student who studies for 3 hours. This is how she does it:

$$
\begin{align*}
z_{1}&=w_{1}x+b_{1}=x-4=3-4=-1\\
h&=\text{ReLU}\left(z_{1}\right)=\text{max}\left(0,\:z_{1}\right)=\text{max}\left(0,\:-1\right)=0
\end{align*}
$$

Predicting if the student passes/fails:

$$
\begin{align*}
z_{2}&=w_{2}h+b_{2}=2h-1=2(0)-1=-1\\
p&=\sigma\left(z_{2}\right)=\frac{1}{\left(1+\text{exp}\left(-z_{2}\right)\right)}=\frac{1}{\left(1+\text{exp}\left(-(-1))\right)\approx{0.269}
\end{align*}
$$

Since 0.269<0.5, the student's result is **Fail**.

Now for the result of a student who studies for 5 hours:

$$
\begin{align*}
z_{1}&=w_{1}x+b_{1}=x-4=5-4=1\\
h=\text{ReLU}\left(z_{1}\right)=\text{max}\left(0,z_{1}\right)=\text{max}\left(0,1\right)=1
\end{align*}
$$

Predicting if the student passes/fails:

$$
\begin{align*}
z_{2}&=w_{2}h+b_{2}=2h-1=2(1)-1=1\\
p&=\sigma\left(z_{2}\right)=\frac{1}{\left(1+\text{exp}(-z_{2})\right)}=\frac{1}{\left(1+\text{exp}(-1)\right)\approx{0.731}
\end{align*}
$$

Since 0.731>0.5, the student's result is **Pass**.

#### Step #3: Compare Predictions with Actual Results

| Number of Hours Studied | Marks Scored | Actual Result | Predicted Score | Predicted Result |
| --- | --- | --- | --- | --- |
| 0 | 40 | Fail | 0.269 | Fail |
| 1 | 40 | Fail | 0.269 | Fail |
| 2 | 41 | Fail | 0.269 | Fail |
| 3 | 40 | Fail | 0.269 | Fail |
| 4 | 48 | Fail | 0.269 | Fail |
| 5 | 58 | Pass | 0.731 | Pass |
| 6 | 69 | Pass | 0.953 | Pass |
| 7 | 80 | Pass | 0.993 | Pass |
| 8 | 80 | Pass | 0.999 | Pass |

![](https://cdn.hashnode.com/uploads/covers/681473bee25e59d34a17668b/2bf27e7a-4a54-4671-b853-6bf16b0b0ec0.png)

The network correctly classifies the result of all the students in this example. As the study hours increase beyond 4, the predicted score increases, making pass prediction more likely.

Through this example Ms Poly has demonstrated how ReLU and sigmoid work together. ReLU transforms the input in the hidden layer and sigmoid helps in converting the output to a score that can be used to make Pass/Fail prediction.

---

## Final Thoughts

The simple examples shown above help us understand an important rule about neural networks: the relationship between the outputs and the inputs can behave differently across different parts of the input. They need to be captured in order to produce meaningful results from real-world data.

A straight line equation is enough when the relationship in data is simple and consistent. But real-life data isn't always that straightforward. By introducing non-linearity, neural networks can move beyond straight-line relationships and learn complex relationships hidden in data.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Neural Networks Work: Why Straight Lines Aren't Enough",
  "desc": "A straight line equation is a good place to start understanding how a neural network works. It's what we explored in my previous article, How Neural Networks Work – Explained Using the Straight Line E",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-neural-networks-work-why-straight-lines-aren-t-enough.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
