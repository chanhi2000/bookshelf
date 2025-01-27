---
lang: en-US
title: "How to Use t-SNE for Visualizing Clusters with Python"
description: "(10/11) Learn Clustering in Python – A Machine Learning Engineering Handbook"
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "(10/11) Learn Clustering in Python – A Machine Learning Engineering Handbook"
    - property: og:description
      content: "How to Use t-SNE for Visualizing Clusters with Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/how-to-use-t-sne-for-visualizing-clusters-with-python.html
date: 2025-02-06
isOriginal: false
author:
  - name: Tatev Aslanyan
    url : https://freecodecamp.org/news/author/tatevaslanyan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738794333226/0f8cd7d3-54d4-49a3-b864-e3e477446089.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn Clustering in Python – A Machine Learning Engineering Handbook",
  "desc": "Want to learn how to discover and analyze the hidden patterns within your data? Clustering, an essential technique in Unsupervised Machine Learning, holds the key to discovering valuable insights that can revolutionize your understanding of complex d...",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Clustering in Python – A Machine Learning Engineering Handbook"
  desc="Want to learn how to discover and analyze the hidden patterns within your data? Clustering, an essential technique in Unsupervised Machine Learning, holds the key to discovering valuable insights that can revolutionize your understanding of complex d..."
  url="https://freecodecamp.org/news/clustering-in-python-a-machine-learning-handbook#heading-how-to-use-t-sne-for-visualizing-clusters-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738794333226/0f8cd7d3-54d4-49a3-b864-e3e477446089.png"/>

After applying clustering algorithms like K-Means, Hierarchical Clustering, and DBSCAN, you’ll often want to visualize the resulting clusters to gain a better understanding of the underlying data structure.

While scatter plots work well for datasets with two or three dimensions, real-world datasets often contain high-dimensional features that are difficult to interpret visually.

To address this challenge, you can use dimensionality reduction techniques like **t-SNE** (t-Distributed Stochastic Neighbor Embedding) to project high-dimensional data into a lower-dimensional space while preserving its structure. This allows you to visualize clusters more effectively and identify hidden patterns that may not be immediately apparent in raw data.

In this section, we will explore the theory behind t-SNE and its implementation in Python.

---

## Understanding t-SNE

t-SNE was introduced by Laurens van der Maaten and Geoffrey Hinton in 2008 as a method to visualize complex data structures. It aims to represent high-dimensional data points in a lower-dimensional space while preserving the local structure and pairwise similarities among the data points.

t-SNE achieves this by modeling the similarity between data points in the high-dimensional space and the low-dimensional space.

---

## The t-SNE Algorithm

The t-SNE algorithm proceeds in the following steps:

1. Compute pairwise similarities between data points in the high-dimensional space. This is typically done using a Gaussian kernel to measure the similarity based on the Euclidean distances between data points.
2. Initialize the low-dimensional embedding randomly.
3. Define a cost function that represents the similarity between data points in the high-dimensional space and the low-dimensional space.
4. Optimize the cost function using gradient descent to minimize the divergence between the high-dimensional and low-dimensional similarities.
5. Iterate steps 3 and 4 until the cost function converges.

Implementing t-SNE in Python is relatively straightforward with the help of libraries such as scikit-learn. The scikit-learn library provides a user-friendly API for applying t-SNE to your data. By following the scikit-learn documentation and examples, you can easily incorporate t-SNE into your machine learning pipeline.

---

## 2D t-SNE Visualisation

```py :collapsed-lines
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.manifold import TSNE

# Load dataset
digits = datasets.load_digits()
X, y = digits.data, digits.target

# Apply t-SNE
tsne = TSNE(n_components=2, random_state=0)
X_tsne = tsne.fit_transform(X)

# Visualize the results on 2D plane
plt.figure(figsize=(10, 6))
scatter = plt.scatter(X_tsne[:, 0], X_tsne[:, 1], c=y, edgecolor='none', alpha=0.7, cmap=plt.cm.get_cmap('jet', 10))
plt.colorbar(scatter)
plt.title("t-SNE of Digits Dataset")
plt.show()
```

![Python code snippet for visualizing the t-SNE transformation of the digits dataset using Matplotlib and scikit-learn. The code loads the dataset, applies t-SNE, and plots the results on a 2D plane. - lunartech.ai](https://cdn.hashnode.com/res/hashnode/image/upload/v1738529609503/e4a5dac2-0c31-4e9c-b8cd-9d243736ee67.png)

![Scatter plot showing a t-SNE visualization of the Digits Dataset. Clusters of colored points represent different digits, with colors ranging from dark red to light blue, corresponding to numbers 0 to 9. A color bar on the right indicates the digit each color represents. - lunartech.ai](https://miro.medium.com/v2/resize:fit:1400/1*vFccfsJFgXl3rulHs93MKA.png)

In this example:

1. We load the `digits` dataset.
2. We apply t-SNE to reduce the data from 64 dimensions (since each image is 8x8) to 2 dimensions.
3. We then plot the transformed data, coloring each point by its true digit label.

The resulting visualization will show clusters, each corresponding to one of the digits (0 through 9). This helps to understand how well-separated the different digits are in the original high-dimensional space.

---

## Visualizing High-Dimensional Data

One of the main advantages of t-SNE is its ability to visualize high-dimensional data in a lower-dimensional space. By reducing the dimensionality of the data, t-SNE enables us to identify clusters and patterns that may not be apparent in the original high-dimensional space. The resulting visualization can provide valuable insights into the structure of the data and aid in decision-making processes.

```py :collapsed-lines
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.manifold import TSNE
from mpl_toolkits.mplot3d import Axes3D

# Load dataset
digits = datasets.load_digits()
X, y = digits.data, digits.target

# Apply t-SNE
tsne = TSNE(n_components=3, random_state=0)
X_tsne = tsne.fit_transform(X)

# Visualize the results on 3D plane
fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')
scatter = ax.scatter(X_tsne[:, 0], X_tsne[:, 1], X_tsne[:, 2], c=y, edgecolor='none', alpha=0.7, cmap=plt.cm.get_cmap('jet', 10))
plt.colorbar(scatter)
plt.title("3D t-SNE of Digits Dataset")
plt.show()
```

![A code snippet in Python using libraries such as matplotlib, sklearn, and mpl_toolkits.mplot3d. It loads the digits dataset, applies t-SNE for dimensionality reduction, and visualizes results on a 3D plane. - lunartech.ai](https://cdn.hashnode.com/res/hashnode/image/upload/v1738529676545/772f6b94-655b-4ae3-bdb5-a5334442c970.png)

In this revised code:

1. We set `n_components=3` for t-SNE to get a 3D transformation.
2. We use `mpl_toolkits.mplot3d.Axes3D` to create a 3D scatter plot.

After executing this code, you’ll see a 3D scatter plot where points are positioned based on their t-SNE coordinates, and they’re colored based on their true digit label.

Rotating the 3D visualization can help us understand the spatial distribution of the data points better.

![3D scatter plot of t-SNE projection for a digits dataset. Data points are in clusters with varied colors representing different numbers. A color bar on the right indicates the numeric values from 0 to 9.](https://miro.medium.com/v2/resize:fit:1400/1*aw8wAIvC2CXwXO7Ixjy1JQ.png)

t-SNE is a powerful tool for dimensionality reduction and visualization of high-dimensional data. By leveraging its capabilities, you can gain a deeper understanding of complex datasets and uncover hidden patterns that may not be immediately obvious. With its Python implementation and ease of use, t-SNE is a valuable asset for any data scientist or machine learning practitioner.

![Scatter matrix plot showing relationships between sepal width, sepal length, petal width, and petal length for iris species: setosa (blue), versicolor (red), and virginica (green). - lunartech.ai](https://cdn-images-1.medium.com/max/1600/1*sNHaMTQBe3plUhk3k2dnYg.gif)
