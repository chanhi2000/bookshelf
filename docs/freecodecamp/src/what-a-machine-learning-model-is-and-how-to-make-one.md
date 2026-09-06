---
lang: en-US
title: "What a Machine Learning Model is and How to Make One"
description: "Article(s) > What a Machine Learning Model is and How to Make One"
icon: 
category:
  - 
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What a Machine Learning Model is and How to Make One"
    - property: og:description
      content: "What a Machine Learning Model is and How to Make One"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-a-machine-learning-model-is-and-how-to-make-one.html
prev: /articles/README.md
date: 2026-09-10
isOriginal: false
author:
  - name: Eva J Patel
    url: https://freecodecamp.org/news/author/evapatel123/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0b0f8408-22bc-483a-9c7f-9a6db2c37640.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What a Machine Learning Model is and How to Make One"
  desc="Machine learning can sound much more complicated than it actually is. You hear words like models, training, features, datasets, predictions, and algorithms, and it can feel like you need a PhD in math"
  url="https://freecodecamp.org/news/what-a-machine-learning-model-is-and-how-to-make-one"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0b0f8408-22bc-483a-9c7f-9a6db2c37640.png"/>

Machine learning can sound much more complicated than it actually is. You hear words like *models*, *training*, *features*, *datasets*, *predictions*, and *algorithms*, and it can feel like you need a PhD in mathematics before you're allowed to write your first machine learning program.

But at its core, machine learning is about getting a computer to learn patterns from examples and then use those patterns to make predictions about new examples. If you've ever learned to recognize a cat after seeing lots of cats, you already understand the basic idea.

In this tutorial, we're going to build a real machine learning model in Python. We'll start with a tiny dataset, train a model to predict whether a student might pass an exam based on the number of hours they studied, and then use the trained model to make predictions about new students.

---

## Prerequisites

You don't need any previous machine learning experience to follow this tutorial. We'll introduce each machine learning concept as we go.

But having a basic understanding of Python will make the tutorial easier to follow. You should be comfortable with:

- Creating and using variables
- Working with Python lists
- Writing basic `if`/`else` statements
- Calling functions
- Reading and running a Python program
- Using a terminal or command prompt to run commands
    

You should also have:

- **Python** installed on your computer
- A text editor or code editor, such as VS Code
- A terminal or command prompt
- An internet connection to install the required Python library
    

You **do not** need prior knowledge of machine learning, scikit-learn, statistics, or advanced mathematics. I'll explain the machine learning concepts and code step by step.

---

## What You Will Learn

- [What Is a Machine Learning Model?](#heading-what-is-a-machine-learning-model)
- [Machine Learning vs Traditional Programming](#heading-machine-learning-vs-traditional-programming)
- [What Does "Training" Mean?](#heading-what-does-training-mean)
- [What Is a Dataset?](#heading-what-is-a-dataset)
- [What Are Features and Labels?](#heading-what-are-features-and-labels)
- [What Kind of Machine Learning Are We Using?](#heading-what-kind-of-machine-learning-are-we-using)
- [What Are We Actually Going to Build?](#heading-what-are-we-actually-going-to-build)
- [Step 1: Install Python](#heading-step-1-install-python)
- [Step 2: Create a Project Folder](#heading-step-2-create-a-project-folder)
- [Step 3: Install scikit-learn](#heading-step-3-install-scikit-learn)
- [Step 4: Import the Model](#heading-step-4-import-the-model)
- [Step 5: Create Our Dataset](#heading-step-5-create-our-dataset)
- [Step 6: Understand Why the Data Structure Matters](#heading-step-6-understand-why-the-data-structure-matters)
- [Step 7: Split the Data](#heading-step-7-split-the-data)
- [Step 8: Create the Model](#heading-step-8-create-the-model)
- [Step 9: Train the Model](#heading-step-9-train-the-model)
- [Step 10: Make Predictions](#heading-step-10-make-predictions)
- [Step 11: Convert the Prediction Into Human-Friendly Text](#heading-step-11-convert-the-prediction-into-human-friendly-text)
- [Step 12: Test the Model](#heading-step-12-test-the-model)
    
    - [A Very Important Warning About Accuracy](#heading-a-very-important-warning-about-accuracy)
- [Step 13: Put Everything Together](#heading-step-13-put-everything-together)
    
    - [Reading the Complete Code From Top to Bottom](#heading-reading-the-complete-code-from-top-to-bottom)
        
    - [What Is Actually Happening Inside the Model?](#heading-what-is-actually-happening-inside-the-model)
        
    - [What Does "Learning" Actually Mean?](#heading-what-does-learning-actually-mean)
        
    - [What Is a Parameter?](#heading-what-is-a-parameter)
        
        - [Parameters vs Hyperparameters](#heading-parameters-vs-hyperparameters)
    - [Why Do We Need Training and Testing Data?](#heading-why-do-we-need-training-and-testing-data)
        
        - [What Is Overfitting?](#heading-what-is-overfitting)
            
        - [What Is Underfitting?](#heading-what-is-underfitting)
            
    - [Why Our Dataset Is Not a Real Machine Learning Dataset](#heading-why-our-dataset-is-not-a-real-machine-learning-dataset)
    - [Step 14: Add More Features](#heading-step-14-add-more-features)
- [Step 15: Make a Prediction With Multiple Features](#heading-step-15-make-a-prediction-with-multiple-features)
    
    - [What Happens When You Have Hundreds of Features?](#heading-what-happens-when-you-have-hundreds-of-features)
        
    - [What Is Regression?](#heading-what-is-regression)
        
    - [A Simple Regression Example](#heading-a-simple-regression-example)
    - [The General Machine Learning Workflow](#heading-the-general-machine-learning-workflow)
- [How Machine Learning Fits Into Real Applications](#heading-how-machine-learning-fits-into-real-applications)
- [What Should You Learn After This?](#heading-what-should-you-learn-after-this)
- [The Mental Model to Keep](#heading-the-mental-model-to-keep)
- [Final Thoughts](#heading-final-thoughts)
    

The goal isn't just to get the code working. We're going to understand what each important line does, why we need it, and what's actually happening behind the scenes.

By the end, you'll have a much clearer mental model of what machine learning actually is and how you can start building models yourself.

---

## What Is a Machine Learning Model?

A machine learning model is a program that has learned a pattern from data.

That definition is intentionally simple.

Suppose you show a child several animals and tell them which ones are cats. After seeing enough examples, the child might notice that cats usually have certain characteristics: whiskers, four legs, fur, a particular face shape, and so on. When they see a new animal, they can use what they learned to make a guess about whether it is a cat.

A machine learning model works in a similar way, except instead of looking at animals, it works with numbers and data.

For example, suppose we give a model information about students:

| Hours Studied | Exam Result |
| --- | --- |
| 1 | Fail |
| 2 | Fail |
| 3 | Fail |
| 4 | Pass |
| 5 | Pass |
| 6 | Pass |

The model can look at these examples and discover a relationship between studying time and exam results. It might learn that students who study more tend to have a higher chance of passing.

We aren't explicitly writing that rule into the program. The model learns the relationship from the examples.

That's the key idea behind machine learning.

---

## Machine Learning vs Traditional Programming

This becomes much clearer when you compare machine learning with traditional programming.

In traditional programming, you give the computer rules and data, and it produces an answer.

For example:

```text
Data + Rules → Answer
```

You might write:

```py
hours = 5

if hours >= 4:
    print("Likely to pass")
else:
    print("Likely to fail")
```

Here, you explicitly created the rule:

```py
hours >= 4
```

The computer isn't learning anything. You told it exactly what to do.

Machine learning flips this around. Instead of manually writing the rule, you give the computer examples:

```text
Examples + Correct Answers → Machine Learning Model
```

The model figures out a useful pattern from those examples.

Then you can give the trained model new data:

```text
New Data + Trained Model → Prediction
```

That difference is one of the most important concepts to understand.

---

## What Does "Training" Mean?

Training is simply the process of teaching a machine learning model using examples.

Imagine that you're teaching someone to recognize whether a student is likely to pass an exam.

You give them examples:

```text
1 hour → Fail
2 hours → Fail
3 hours → Fail
5 hours → Pass
6 hours → Pass
```

After looking at enough examples, they start noticing a pattern.

Machine learning training works similarly.

We give the algorithm data, and the algorithm adjusts the model so that its predictions become better at matching the examples it's been given.

The word *training* sounds fancy, but the basic idea is just to give the model examples and let it learn a useful pattern.

---

## What Is a Dataset?

A dataset is simply a collection of data.

For our project, we can represent our dataset using Python lists.

Suppose we have:

```py
hours = [1, 2, 3, 4, 5, 6, 7, 8]
```

and:

```py
results = [0, 0, 0, 1, 1, 1, 1, 1]
```

Here, we're using numbers to represent the exam results.

We'll use:

```text
0 = Fail
1 = Pass
```

So our data means:

```text
1 hour → Fail
2 hours → Fail
3 hours → Fail
4 hours → Pass
5 hours → Pass
6 hours → Pass
7 hours → Pass
8 hours → Pass
```

The first list contains our input information. The second list contains the answers we want the model to learn from.

---

## What Are Features and Labels?

Machine learning uses a few words that sound more complicated than they really are.

A **feature** is information that we use to make a prediction.

A **label** is the answer we want the model to predict.

In our example:

```text
Hours studied → Feature
Pass/fail → Label
```

If we had more information about each student, we could have multiple features, such as:

```text
Hours studied
Previous exam score
Homework completion rate
Attendance
```

Then the model could use all of those features to predict:

```text
Pass or fail
```

So you can think of it like this: Features are the clues. The label is the answer.

---

## What Kind of Machine Learning Are We Using?

Our example uses **supervised learning**. Supervised learning means we train the model using examples where we already know the correct answer.

For example:

```text
Hours studied: 2
Correct answer: Fail
```

and:

```text
Hours studied: 6
Correct answer: Pass
```

The model sees both the input and the correct output during training.

This is different from **unsupervised learning**, where the model receives data without being given the correct answers and tries to find patterns or groups on its own.

There are other types of machine learning too, including reinforcement learning, but supervised learning is a great place to start because the basic workflow is easy to understand.

---

## What Are We Actually Going to Build?

We're going to create a Python program that:

1. Creates a small dataset.
2. Separates the inputs from the answers.
3. Splits the data into training and testing data.
4. Creates a machine learning model.
5. Trains the model.
6. Tests how well it performs.
7. Gives the model new information.
8. Uses the model to make a prediction.
    

Our final program will use a **decision tree classifier** from the `scikit-learn` library.

A decision tree is a machine learning algorithm that makes decisions by asking a series of questions about the data.

For our simple example, the model might learn a pattern similar to:

```text
Did the student study enough hours?
        ↓
      Yes → Pass
      No  → Fail
```

Real decision trees can become much more complicated, but this gives you the basic idea.

Now let's get started building!

---

## Step 1: Install Python

To follow along here, you'll need Python installed on your computer.

You can check whether Python is already installed by running:

```sh
python --version
```

You should see something similar to:

```text
Python 3.12.0
```

The exact version doesn't have to match that example.

---

## Step 2: Create a Project Folder

Create a folder called:

```text
machine-learning-model
```

Inside that folder, create a file called:

```text
model.py
```

Our project will eventually look like:

```text
machine-learning-model/
└── model.py
```

---

## Step 3: Install scikit-learn

We're going to use a Python library called **scikit-learn**.

scikit-learn provides many machine learning algorithms and tools, so we don't have to implement everything from mathematical equations ourselves.

Install it with:

```sh
pip install scikit-learn
```

We could technically build a simple machine learning algorithm ourselves, and doing that can be useful for learning the mathematics later. For our first practical model, however, using a machine learning library lets us focus on understanding the workflow.

---

## Step 4: Import the Model

Open `model.py` and write:

```py
from sklearn.tree import DecisionTreeClassifier
```

This line imports the `DecisionTreeClassifier` class from scikit-learn.

This structure:

```py
from sklearn.tree
```

means we're getting something from scikit-learn's tree module.

Then:

```py
import DecisionTreeClassifier
```

means we want to use the decision tree classifier.

After importing it, we can create a machine learning model with:

```py
model = DecisionTreeClassifier()
```

The variable:

```py
model
```

will represent our machine learning model.

At this point, the model hasn't learned anything. It's basically an empty model waiting for training data.

---

## Step 5: Create Our Dataset

Now let's create the examples our model will learn from.

Add:

```py
hours = [1, 2, 3, 4, 5, 6, 7, 8]
```

This list represents how many hours each student studied.

Then:

```py
results = [0, 0, 0, 1, 1, 1, 1, 1]
```

This list represents whether each student passed.

Remember:

```text
0 = Fail
1 = Pass
```

So the first student studied for one hour and failed.

The fourth student studied for four hours and passed.

The eighth student studied for eight hours and passed.

We now have examples that the model can learn from.

---

## Step 6: Understand Why the Data Structure Matters

There's an important detail here. Machine learning libraries usually expect the input data to be structured in a particular way.

Our `hours` list looks like this:

```py
[1, 2, 3, 4, 5, 6, 7, 8]
```

But scikit-learn expects features to be represented as a two-dimensional structure.

Why?

Because a machine learning dataset can contain multiple features.

Imagine this dataset:

```text
Hours Studied | Attendance | Previous Score
2             | 80%        | 65
5             | 95%        | 82
7             | 98%        | 91
```

Each row represents one example.

Each column represents one feature.

So even though our current model only has one feature, we still need to represent it as a two-dimensional dataset.

We can do this using nested lists:

```py
X = [
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8]
]
```

Each inner list represents one student.

The first student has:

```py
[1]
```

meaning they studied one hour.

The second has:

```py
[2]
```

and so on.

The uppercase `X` is a common convention for the feature data.

Now create the labels:

```py
y = [0, 0, 0, 1, 1, 1, 1, 1]
```

The lowercase `y` is commonly used for the target or label values.

So we now have:

```py
X = [
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8]
]

y = [0, 0, 0, 1, 1, 1, 1, 1]
```

You can think of `X` as:

> Here are the clues.

And `y` as:

> Here are the correct answers.

---

## Step 7: Split the Data

We don't want to train and test the model using exactly the same examples.

That would be a bit like giving a student the exact questions they'll see on an exam and then saying:

> “Wow, you got 100%. Great job.”

We haven't really tested whether they learned anything.

Instead, we'll separate our dataset into:

- Training data
- Testing data
    

The training data teaches the model, while the testing data checks whether the model can make predictions on examples it wasn't trained on.

Import the splitting function:

```py
from sklearn.model_selection import train_test_split
```

Now we can write:

```py
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42
)
```

There is a lot happening in this one line, so let's unpack it.

#### `train_test_split()`

This function randomly divides our data into training and testing portions.

We pass it:

```py
X
```

which contains our features.

Then:

```py
y
```

which contains our labels.

The argument:

```py
test_size=0.25
```

means we want approximately 25% of our data for testing.

The remaining 75% is used for training.

#### `random_state=42`

The data is randomly split.

If you run the program multiple times without controlling the randomness, you might get a different split each time.

Setting:

```py
random_state=42
```

makes the random split reproducible.

The number `42` isn't magical. You could use another integer.

For example:

```py
random_state=10
```

would also work.

We use `42` simply because it's a common example value.

### The Four Variables

The function returns four pieces of data:

```py
X_train
X_test
y_train
y_test
```

`X_train` contains the features used to train the model.

`y_train` contains the correct answers for those training examples.

`X_test` contains the features used to test the model.

`y_test` contains the correct answers so we can compare them with the model's predictions.

---

## Step 8: Create the Model

Now create our decision tree:

```py
model = DecisionTreeClassifier()
```

This creates the model object.

Again, nothing has been learned yet. Think of it like buying a blank notebook: the notebook exists, but it doesn't contain your notes yet.

---

## Step 9: Train the Model

Now we get to the line that actually teaches the model:

```py
model.fit(X_train, y_train)
```

This is one of the most important lines in machine learning.

The `.fit()` method trains the model using the data we provide.

We give it:

```py
X_train
```

which contains the examples.

Then:

```py
y_train
```

which contains the correct answers.

The model looks for patterns connecting the features to the labels.

In our case, it's trying to discover a relationship between:

```text
Hours studied
```

and:

```text
Pass/fail
```

The exact internal process depends on the algorithm. A decision tree learns decision rules that split the training data into groups that become increasingly useful for predicting the target.

The important thing to understand right now is:

```py
model.fit(X_train, y_train)
```

means:

> Learn from these examples and their correct answers.

---

## Step 10: Make Predictions

After training, we can give the model new data.

Suppose a student studied for five hours.

We can write:

```py
prediction = model.predict([[5]])
```

Notice that we used:

```py
[[5]]
```

instead of:

```py
[5]
```

The outer list represents the collection of examples. The inner list represents the features for one example.

Since our model has one feature, that example contains one value:

```py
[5]
```

So:

```py
[[5]]
```

means:

> Predict the result for one student whose feature value is five hours.

The model returns a prediction.

We can print it:

```py
print(prediction)
```

You might see:

```text
[1]
```

Remember:

```text
1 = Pass
0 = Fail
```

So the model predicted that the student would pass.

---

## Step 11: Convert the Prediction Into Human-Friendly Text

A prediction of:

```text
1
```

isn't particularly friendly.

We can write:

```py
if prediction[0] == 1:
    print("The model predicts: Pass")
else:
    print("The model predicts: Fail")
```

Let's look at:

```py
prediction[0]
```

The model returns a list containing the prediction:

```py
[1]
```

The `[0]` gets the first item.

Python starts counting list positions at zero.

So:

```py
prediction[0]
```

means:

> Give me the first prediction.

Then:

```py
if prediction[0] == 1:
```

checks whether the model predicted `1`.

If it did, we print:

```text
The model predicts: Pass
```

Otherwise, we print:

```text
The model predicts: Fail
```

---

## Step 12: Test the Model

We shouldn't just make one prediction and assume the model is good.

We need to evaluate it.

First, make predictions for the test dataset:

```py
predictions = model.predict(X_test)
```

Now:

```py
predictions
```

contains the model's predictions for the examples it didn't see during training.

We can compare these predictions with:

```py
y_test
```

which contains the actual answers.

scikit-learn provides an accuracy function:

```py
from sklearn.metrics import accuracy_score
```

Then:

```py
accuracy = accuracy_score(y_test, predictions)
```

The function compares the correct answers with the model's predictions.

If the model gets:

```text
8 out of 10
```

correct, the accuracy would be:

```text
0.8
```

We can turn that into a percentage:

```py
print(f"Model accuracy: {accuracy * 100:.2f}%")
```

The `* 100` converts:

```text
0.8
```

into:

```text
80
```

The:

```py
:.2f
```

means we want two decimal places.

So the output could look like:

```text
Model accuracy: 80.00%
```

### A Very Important Warning About Accuracy

Accuracy is useful, but it doesn't tell you everything about a model.

Imagine you're trying to detect a rare disease.

Suppose:

```text
99 people are healthy
1 person is sick
```

A terrible model could simply predict:

```text
Everyone is healthy.
```

It would be 99% accurate.

But it completely failed at the thing we actually care about: identifying the sick person.

This is why machine learning developers use other evaluation metrics depending on the problem, including precision, recall, F1 score, mean squared error, and others.

For our beginner example, accuracy is enough to understand the basic workflow.

---

## Step 13: Put Everything Together

Our complete beginner machine learning program looks like this:

```py
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# Dataset
X = [
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8]
]

y = [
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1
]


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42
)


# Create the machine learning model
model = DecisionTreeClassifier()


# Train the model
model.fit(X_train, y_train)


# Make predictions on the test data
predictions = model.predict(X_test)


# Calculate accuracy
accuracy = accuracy_score(y_test, predictions)


print(f"Model accuracy: {accuracy * 100:.2f}%")


# Make a prediction for a new student
hours_studied = [[5]]

prediction = model.predict(hours_studied)


# Display the prediction
if prediction[0] == 1:
    print("The model predicts: Pass")
else:
    print("The model predicts: Fail")
```

### Reading the Complete Code From Top to Bottom

The first three lines:

```py
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
```

import the tools we need.

Then:

```py
X = [
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8]
]
```

creates the feature data.

Then:

```py
y = [
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1
]
```

creates the labels.

Next:

```py
X_train, X_test, y_train, y_test = train_test_split(...)
```

divides the dataset into training and testing data.

Then:

```py
model = DecisionTreeClassifier()
```

creates the model.

Next:

```py
model.fit(X_train, y_train)
```

trains it.

Then:

```py
predictions = model.predict(X_test)
```

asks the trained model to make predictions about the testing examples.

Next:

```py
accuracy = accuracy_score(y_test, predictions)
```

measures how many of those predictions were correct.

Finally:

```py
prediction = model.predict([[5]])
```

asks the model to predict the result for a new student who studied for five hours.

That's the entire machine learning workflow.

### What Is Actually Happening Inside the Model?

This is where machine learning gets more interesting.

When we run:

```py
model.fit(X_train, y_train)
```

the decision tree doesn't simply memorize the phrase:

```text
4 hours = Pass
```

It analyzes the training examples and looks for useful ways to split them.

For example, it might discover a rule similar to:

```text
Is hours studied <= 3.5?
```

If yes:

```text
Predict Fail
```

If no:

```text
Predict Pass
```

The exact tree depends on the training data and algorithm settings.

If we added more features, the tree could make decisions using several pieces of information.

For example:

```text
Is study time <= 3.5?

       Yes
        ↓
    Predict Fail

       No
        ↓
Is attendance <= 80%?

       Yes
        ↓
    Predict Fail

       No
        ↓
    Predict Pass
```

Again, our actual code doesn't manually create these rules.

The algorithm learns them from the training data.

### What Does "Learning" Actually Mean?

This is one of the most misunderstood parts of machine learning.

The computer isn't learning in exactly the same way a human does. A machine learning algorithm uses mathematical procedures to adjust a model based on data.

Different algorithms learn in different ways. A decision tree searches for useful splits. A linear regression model learns numerical parameters that describe a relationship. A neural network adjusts many parameters using optimization algorithms. And da clustering algorithm groups similar examples together.

So "learning" is a convenient word for:

> Using an algorithm to adjust a model so that it captures useful patterns in data.

### What Is a Parameter?

A parameter is a value inside a machine learning model that is learned from data.

For example, in a simple linear model:

```text
y = mx + b
```

the model might learn values for:

```text
m
b
```

Those values determine the relationship between the input and output.

Neural networks can have millions or billions of learned parameters.

The important idea is that the model's behavior is controlled by values that are learned or adjusted during training.

#### Parameters vs Hyperparameters

These two terms are easy to confuse.

A **parameter** is generally learned from the training data, while a **hyperparameter** is something you configure before or during training.

For our decision tree, we could specify:

```py
model = DecisionTreeClassifier(
    max_depth=3
)
```

Here:

```py
max_depth=3
```

is a hyperparameter.

We're telling the algorithm:

> Don't allow the decision tree to grow beyond a depth of three.

The model learns its internal decision rules from the data, while we choose the hyperparameter.

This distinction becomes increasingly important as you build more advanced models.

### Why Do We Need Training and Testing Data?

Imagine you're studying for a math exam.

Your teacher gives you ten practice questions, and you memorize all ten answers.

Then the exam contains those exact ten questions, so you get everything correct.

Does that prove you understand mathematics? Not really. You might simply have memorized the examples.

Machine learning has a similar problem called **overfitting**. A model can become extremely good at the training data without becoming good at handling new data.

That's why we keep some examples separate. The model doesn't see the test examples during training. Then we can ask:

> Can the model generalize what it learned to examples it hasn't seen before?

That ability to work on new data is one of the most important goals of machine learning.

#### What Is Overfitting?

Overfitting happens when a model learns the training data too specifically.

Imagine we give the model a very small dataset. Instead of learning the general pattern:

```text
More studying tends to increase the chance of passing.
```

it might effectively memorize the specific examples.

That can make training performance look excellent while performance on new data is poor.

A model that performs well on training data but poorly on unseen data is often overfitting.

#### What Is Underfitting?

Underfitting is basically the opposite. The model is too simple to capture the important patterns in the data.

Imagine trying to predict someone's exam result using only one or two results.

That doesn't give the model enough useful information, and it might perform poorly on both training and testing data.

Good machine learning involves finding a model that's complex enough to learn useful patterns but not so complex that it simply memorizes the training examples.

### Why Our Dataset Is Not a Real Machine Learning Dataset

Our eight examples are intentionally tiny.

A real machine learning project would usually use much more data.

For example, you might collect:

```text
10,000 students
```

with features such as:

```text
Hours studied
Attendance
Homework completion
Previous scores
Sleep duration
```

and a label such as:

```text
Passed
```

Then the model could learn from thousands of examples.

Our tiny dataset is useful because we can understand every part of the process.

---

## Step 14: Add More Features

Let's make our example slightly more realistic.

Instead of only using hours studied, suppose we have:

```text
Hours studied
Attendance
```

We can represent each student like this:

```py
X = [
    [2, 70],
    [3, 75],
    [4, 80],
    [5, 85],
    [6, 90],
    [7, 95]
]
```

Now each row contains two features.

For example:

```py
[5, 85]
```

means:

```text
5 hours studied
85% attendance
```

Our labels could still be:

```py
y = [0, 0, 1, 1, 1, 1]
```

Now the model has more information to work with.

We could train it exactly the same way:

```py
model.fit(X_train, y_train)
```

The difference is that the model now has two features instead of one.

---

## Step 15: Make a Prediction With Multiple Features

Suppose we want to predict the result of a student who:

```text
Studied for 5 hours
Had 90% attendance
```

We represent that as:

```py
new_student = [[5, 90]]
```

Then:

```py
prediction = model.predict(new_student)
```

The model uses both features to make the prediction.

This is how machine learning scales from simple examples to datasets with many columns.

### What Happens When You Have Hundreds of Features?

The exact same basic concept applies.

Imagine predicting house prices using:

```text
Number of bedrooms
Square footage
Number of bathrooms
Location
Age of house
Garage size
Lot size
Distance to school
```

Each one can become a feature. Then the model uses those features to predict a target:

```text
House price
```

The basic structure remains:

```text
Features → Model → Prediction
```

The difficult part becomes choosing useful data, selecting an appropriate algorithm, cleaning the data, evaluating the model, and making sure the model works well outside the training dataset.

### What Is Regression?

So far, our model predicts categories:

```text
Pass
Fail
```

This is a **classification** problem. Classification means predicting a category.

Examples include:

```text
Spam / Not Spam
Cat / Dog
Fraud / Not Fraud
Pass / Fail
```

Regression is different. It predicts a numerical value.

For example:

```text
House price = $425,000
```

or:

```text
Temperature = 82.4°F
```

or:

```text
Sales = $17,500
```

So a useful distinction is:

```text
Classification → Predict a category

Regression → Predict a number
```

### A Simple Regression Example

scikit-learn provides a model called `LinearRegression`.

Import it:

```py
from sklearn.linear_model import LinearRegression
```

Create the model:

```py
model = LinearRegression()
```

Then train it:

```py
model.fit(X_train, y_train)
```

And make a prediction:

```py
prediction = model.predict([[5]])
```

The workflow is almost identical.

That's one reason machine learning libraries are useful: once you understand the general workflow, learning new algorithms becomes much easier.

---

## The General Machine Learning Workflow

Most beginner machine learning projects can be thought about using this sequence:

### 1. Collect Data

Get examples related to the problem you want to solve.

### 2. Clean the Data

Fix missing, incorrect, duplicated, or inconsistent information.

### 3. Select Features

Choose the information you want the model to use.

### 4. Choose a Model

Select an algorithm appropriate for the problem.

### 5. Split the Data

Separate training and testing examples.

### 6. Train

Use the training data to fit the model.

### 7. Evaluate

Measure how well the model performs.

### 8. Improve

Change the data, features, model, or hyperparameters.

### 9. Make Predictions

Use the trained model on new data.

### 10. Deploy

If the model is useful, integrate it into an application.

This workflow is much more important than memorizing the name of a particular algorithm.

---

## How Machine Learning Fits Into Real Applications

A trained model is usually not the entire application.

Imagine you build a model that predicts whether an email is spam. You might eventually create:

```text
Email
 ↓
Backend
 ↓
Machine Learning Model
 ↓
Prediction
 ↓
User Interface
```

The model is one component inside a larger software system.

The same idea applies to:

```text
Recommendation systems
Fraud detection
Search engines
AI assistants
Image classification
Demand forecasting
Customer analytics
```

This is important for developers because machine learning engineering isn't only about training models. You also need to know how to build software around those models.

---

## What Should You Learn After This?

Once you understand this basic project, there are several useful directions to explore.

### Learn NumPy

[**NumPy is one of the fundamental Python libraries**](/freecodecamp.org/numpy-crash-course-build-powerful-n-d-arrays-with-numpy.md) for numerical computing. You'll encounter arrays everywhere in machine learning.

### Learn pandas

[**pandas is extremely useful**](/freecodecamp.org/learn-pandas-for-data-science.md) for working with datasets.

For example:

```py
import pandas as pd
```

You can load a CSV file:

```py
data = pd.read_csv("students.csv")
```

and inspect it:

```py
print(data.head())
```

This becomes much more useful once you start working with real datasets.

### Learn Data Visualization

Libraries such as [**Matplotlib**](/freecodecamp.org/getting-started-with-matplotlib.md) can help you visualize your data. For example, you might want to see whether exam scores increase as study hours increase.

[**Visualizing data**](/freecodecamp.org/learn-interactive-data-visualization-with-svelte-and-d3.md) can help you understand patterns before you even train a model.

### Learn More Algorithms

Once decision trees make sense, explore:

```text
Linear Regression
Logistic Regression
Random Forests
K-Nearest Neighbors
Support Vector Machines
Gradient Boosting
Neural Networks
```

You don't need to memorize all of them.

Focus on understanding what kind of problem each algorithm is designed to solve and what assumptions or tradeoffs come with it.

### Learn the Mathematics

You can build useful machine learning applications without deriving every equation from scratch.

But if you want to understand machine learning deeply, [**mathematics becomes increasingly valuable**](/freecodecamp.org/linear-algebra-crash-course-mathematics-for-machine-learning-and-generative-ai.md).

Start with:

```text
Algebra
Functions
Probability
Statistics
Linear Algebra
Calculus
```

Concepts such as derivatives and gradients become especially important when you start learning how neural networks train.

Here's a [**calculus course**](/freecodecamp.org/learn-college-calculus-and-implement-with-python.md) and a [**statistics handbook**](/freecodecamp.org/statistics-for-data-scientce-machine-learning-and-ai-handbook.md) as well to get you started.

---

## The Mental Model to Keep

When you're learning machine learning, don't let the terminology make everything feel more complicated than it is.

At the simplest level, think about machine learning like this:

You have examples, and each example contains information called **features**. Some examples also have known answers called **labels**.

You give those examples to a learning algorithm. The algorithm creates a model that captures patterns in the examples.

Then you give the trained model new information. The model uses the patterns it learned to make a prediction.

In code, the basic workflow looks like:

```py
model = SomeMachineLearningModel()

model.fit(X_train, y_train)

predictions = model.predict(X_test)
```

That three-part structure is worth remembering.

```py
model = ...
```

creates the model.

```py
model.fit(...)
```

trains the model.

```py
model.predict(...)
```

uses the trained model.

Everything else you learn about machine learning builds on this foundation.

---

## Final Thoughts

A machine learning model isn't a magical brain sitting inside your computer. It's a mathematical model created by an algorithm that has learned patterns from data.

The most important shift in thinking is understanding that you don't always need to program every rule yourself.

With traditional programming, you might explicitly write:

```py
if hours >= 4:
    result = "Pass"
```

With machine learning, you provide examples:

```text
1 hour → Fail
2 hours → Fail
3 hours → Fail
4 hours → Pass
5 hours → Pass
```

and let the learning algorithm find a useful pattern.

Our project was intentionally small, but the same basic ideas appear in much larger systems. A recommendation engine, fraud detector, image classifier, and many other machine learning applications still have to deal with data, features, training, evaluation, and predictions.

Once you understand those fundamentals, terms like *training*, *features*, *labels*, *classification*, *regression*, *overfitting*, and *models* stop sounding like a collection of random AI vocabulary and start fitting into one connected idea.

You don't need to start by building the next giant AI system. Start with a tiny dataset, train one model, inspect its predictions, change something, and see what happens. That hands-on process is where machine learning starts becoming much easier to understand.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What a Machine Learning Model is and How to Make One",
  "desc": "Machine learning can sound much more complicated than it actually is. You hear words like models, training, features, datasets, predictions, and algorithms, and it can feel like you need a PhD in math",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-a-machine-learning-model-is-and-how-to-make-one.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
