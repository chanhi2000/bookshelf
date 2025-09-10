---
lang: en-US
title: "Learn Clustering in Python - A Machine Learning Engineering Handbook"
description: "Article(s) > Learn Clustering in Python - A Machine Learning Engineering Handbook"
icon: fa-brands fa-python
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
      content: "Article(s) > Learn Clustering in Python - A Machine Learning Engineering Handbook"
    - property: og:description
      content: "Learn Clustering in Python - A Machine Learning Engineering Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/
prev: /programming/py/articles/README.md
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
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Clustering in Python - A Machine Learning Engineering Handbook"
  desc="Want to learn how to discover and analyze the hidden patterns within your data? Clustering, an essential technique in Unsupervised Machine Learning, holds the key to discovering valuable insights that can revolutionize your understanding of complex d..."
  url="https://freecodecamp.org/news/clustering-in-python-a-machine-learning-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738794333226/0f8cd7d3-54d4-49a3-b864-e3e477446089.png"/>

Want to learn how to discover and analyze the hidden patterns within your data? Clustering, an essential technique in Unsupervised Machine Learning, holds the key to discovering valuable insights that can revolutionize your understanding of complex datasets.

In this comprehensive handbook, we’ll delve into the must-know clustering algorithms and techniques, along with some theory to back it all up. Then you’ll see how it all works with plenty of examples, Python implementations, and visualizations.

Whether you're a beginner or an experienced data scientist, this handbook is an invaluable resource for mastering clustering techniques. You can also [<VPIcon icon="fas fa-globe"/>download the handbook here.](https://join.lunartech.ai/clustering-in-python)

If you enjoy learning through listening as well, here’s a 15-minute podcast where we discuss clustering in more detail. In this episode, we explore the fundamental concepts of clustering, providing a deeper understanding of how these techniques can be applied to real-world data.

---

## By the end of this book, you’ll be able to:

1. **Understand the fundamentals of Unsupervised Learning** - You will grasp the key differences between supervised and unsupervised learning, and how clustering fits into the broader field of machine learning.
2. **Master important clustering terminology** - You will be familiar with essential concepts such as data points, centroids, distance metrics, and cluster evaluation methods.
3. **Prepare data for clustering** - You will learn how to handle missing values, normalize datasets, remove outliers, and apply dimensionality reduction techniques like PCA and t-SNE.
4. **Gain a deep understanding of clustering techniques** - You will explore various clustering methods, including K-Means, Hierarchical Clustering, and DBSCAN, and understand when to use each approach.
5. **Implement K-Means clustering in Python** - You will learn to apply the K-Means algorithm using Python, optimize the number of clusters with the Elbow Method, and visualize cluster results effectively.
6. **Apply hierarchical clustering** - You will understand Agglomerative and Divisive clustering, learn how to construct dendrograms, and use Python to implement hierarchical clustering.
7. **Use DBSCAN for density-based clustering** - You will master DBSCAN’s approach to clustering, including its ability to identify noise points and clusters of arbitrary shapes.
8. **Visualize clustering results** - You will be able to generate meaningful visualizations for clustering results using Matplotlib, Seaborn, and t-SNE to analyze and interpret data effectively.
9. **Evaluate clustering performance** - You will learn how to assess cluster quality using techniques like the Silhouette Score, Davies-Bouldin Index, and Calinski-Harabasz Index.
10. **Work with real-world datasets** - You will gain hands-on experience applying clustering techniques to real-world datasets, including customer segmentation, anomaly detection, and pattern recognition.
11. **Expand your knowledge beyond clustering** - You will be introduced to other unsupervised learning techniques, such as mixture models and topic modeling, broadening your expertise in machine learning.

By the end of this handbook, you will have a strong foundation in clustering and unsupervised learning, empowering you to analyze complex datasets and uncover hidden patterns with confidence!

::: note Prerequisites

Before diving into this handbook on clustering and unsupervised learning, you should have a solid understanding of machine learning concepts, data preprocessing techniques, and basic Python programming skills. These prerequisites will help you grasp the theoretical foundations and practical implementations covered throughout the book.

First and foremost, it’s important to be familiar with **machine learning fundamentals**. You should understand the difference between supervised and unsupervised learning, as well as the core principles behind clustering techniques.

Concepts such as data points, features, distance metrics (Euclidean, Manhattan), and similarity measures play a significant role in clustering algorithms. A basic understanding of probability, statistics, and linear algebra will also be beneficial since these mathematical concepts form the foundation of many machine learning models.

Next, **data preprocessing techniques** are essential for working with real-world datasets. Since clustering algorithms rely heavily on well-structured data, you need to know how to handle missing values, normalize or standardize numerical features, and remove outliers that could distort clustering results.

Techniques like feature scaling (Min-Max normalization, Standardization) and dimensionality reduction (PCA, t-SNE) can improve clustering accuracy and efficiency, making it easier for you to interpret the results.

Finally, **proficiency in Python programming and data science libraries** is required to follow the hands-on implementations in this handbook. You should be comfortable working with libraries like NumPy and Pandas for data manipulation, Matplotlib and Seaborn for visualization, and Scikit-learn for implementing machine learning algorithms.

:::

Since you’ll be applying clustering techniques such as K-Means, Hierarchical Clustering, and DBSCAN, familiarity with writing and executing Python scripts using Jupyter Notebooks, and interpreting clustering outputs, will enhance your learning experience.

By building a strong foundation in these areas, you’ll be well-prepared to unlock the power of clustering and gain deeper insights from your data.



```component VPCard
{
  "title": "Introduction to Unsupervised Learning",
  "desc": "(1/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/introduction-to-unsupervised-learning.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Supervised vs. Unsupervised Learning",
  "desc": "(2/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/supervised-vs-unsupervised-learning.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Important Terminology",
  "desc": "(3/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/important-terminology.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Prepare Data for Unsupervised Learning",
  "desc": "(4/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/how-to-prepare-data-for-unsupervised-learning.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Clustering Explained",
  "desc": "(5/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/clustering-explained.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "K-Means Clustering",
  "desc": "(6/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/k-means-clustering.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Elbow Method for Optimal Number of Clusters (K)",
  "desc": "(7/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/elbow-method-for-optimal-number-of-clusters-k.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Hierarchical Clustering",
  "desc": "(8/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/hierarchical-clustering.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "DBSCAN Clustering",
  "desc": "(9/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/dbscan-clustering.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## How to Evaluate the Performance of a Clustering Algorithm

Evaluating the performance of a clustering model can be challenging, as there are no ground truth labels available in unsupervised learning. But there are several evaluation metrics that can provide insights into the quality of the clustering results.

- **Silhouette coefficient**: Measures how well each data point fits into its assigned cluster compared to other clusters. A higher silhouette coefficient indicates better clustering.
- **Davies-Bouldin index:** Measures the average similarity between each cluster and its most similar cluster, while considering the separation between clusters. Lower values indicate better clustering.
- **Calinski-Harabasz index:** Evaluates the ratio of between-cluster dispersion to within-cluster dispersion. Higher values indicate better-defined clusters.
- **Visual assessment**: Inspecting visual representations of the clustering results, such as scatter plots or dendrograms, can also provide valuable insights into the quality and meaningfulness of the clusters.

I would recommended that you use a combination of evaluation metrics and visual assessments to comprehensively assess the performance of a clustering model.

---

## Difference Between K-Means, Hierarchical Clustering, and DBSCAN

K-Means, Hierarchical Clustering, and DBSCAN are three widely used clustering algorithms, each with their own approach to grouping data points. Understanding their differences is crucial in selecting the most suitable method based on data characteristics and analytical objectives.

### K-Means Clustering

K-Means clustering is a centroid-based algorithm that partitions data into K clusters based on similarity. The algorithm starts by randomly initializing K centroids and then iteratively assigns each data point to the nearest centroid. Once all data points are assigned, the centroids are recalculated based on the mean of the points within each cluster. This process continues until convergence is reached.

::: tabs

@tab:active Strengths

- Efficient and scalable for large datasets.
- Works well when clusters are spherical and evenly distributed.
- Computationally faster compared to hierarchical clustering.
- Easy to implement and interpret.

@tab Weaknesses

- Requires specifying the number of clusters (K) in advance.
- Sensitive to initial centroid positions, leading to varying results.
- Assumes clusters are of equal size and spherical, which is not always the case.
- Struggles with outliers and non-linear shaped clusters.

:::

### Hierarchical Clustering

Hierarchical clustering creates a nested hierarchy of clusters without requiring a predefined number of clusters. It starts by treating each data point as an individual cluster and progressively merges or splits clusters based on similarity. The results are often visualized using a dendrogram, which helps determine the optimal number of clusters.

::: tabs

@tab:active Strengths

- Does **not** require specifying the number of clusters in advance.
- Captures hierarchical relationships between clusters.
- Can handle different types of data, including numerical and categorical.
- Useful for exploratory analysis with a dendrogram for better interpretability.

@tab Weaknesses

- Computationally expensive for large datasets (O(n²) complexity).
- Hard to scale due to memory constraints when processing large numbers of data points.
- Choosing the right cut-off point for the dendrogram can be challenging.
- Sensitive to noise and outliers, which can distort the hierarchy.

:::

### DBSCAN (Density-Based Spatial Clustering of Applications with Noise)

DBSCAN is a density-based clustering algorithm that groups data points based on their proximity and density rather than predefined clusters. Unlike K-Means and Hierarchical Clustering, DBSCAN does not require specifying the number of clusters. Instead, it uses two key parameters: eps (the maximum distance between two points to be considered neighbors) and min_samples (the minimum number of points required to form a dense cluster). Points that do not meet these criteria are classified as noise.

::: tabs

@tab:active Strengths

- Does not require specifying the number of clusters in advance.
- Can detect arbitrarily shaped clusters, unlike K-Means which assumes spherical clusters.
- Effectively handles outliers, which are labeled as noise instead of forcing them into a cluster.
- Suitable for datasets with varying densities and non-linear structures.

@tab Weaknesses

- Struggles with varying cluster densities, as a single eps value may not fit all clusters.
- Can be sensitive to parameter tuning (eps and min_samples) which can impact clustering performance.
- Not ideal for high-dimensional data, as Euclidean distance loses meaning in high-dimensional spaces.
- May struggle with very large datasets, though it scales better than hierarchical clustering.

:::

### Choosing the Right Clustering Algorithm

| Feature | K-Means | Hierarchical Clustering | DBSCAN |
| --- | --- | --- | --- |
| **Cluster Shape** | Assumes spherical clusters | Works well with hierarchical structures | Handles arbitrary-shaped clusters |
| **Scalability** | Very scalable (fast for large datasets) | Not scalable (O(n²) complexity) | Moderately scalable (can struggle with very large datasets) |
| **Number of Clusters** | Must be predefined | No need to specify | No need to specify |
| **Handling Outliers** | Poor | Sensitive to noise | Good, detects outliers as noise |
| **Computation Complexity** | O(n) to O(n log n) | O(n²) | O(n log n) |
| **Interpretability** | Easy to interpret results | Dendrogram provides good insight | Less intuitive, requires parameter tuning |

Each clustering algorithm has its strengths and weaknesses. **K-Means** is ideal when dealing with large datasets and when clusters are spherical and well-separated. **Hierarchical Clustering** is useful when hierarchical relationships exist or when the number of clusters is unknown. **DBSCAN** excels in detecting arbitrarily shaped clusters and handling noise but requires careful tuning of parameters.

By understanding the characteristics of each algorithm, you can make an informed decision on which clustering method best suits your data analysis needs.

![t-SNE visualization with a perplexity of 50, showing clusters of data points. Labeled clusters highlight various years, scores, and film genres like Romance, Thriller, Action, and Adventure. - lunartech.ai](https://miro.medium.com/v2/resize:fit:1400/1*HpMauXQZe0ByFFSHs4wNLw.png)

```component VPCard
{
  "title": "How to Use t-SNE for Visualizing Clusters with Python",
  "desc": "(10/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/how-to-use-t-sne-for-visualizing-clusters-with-python.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "More Unsupervised Learning Techniques",
  "desc": "(11/11) Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "link": "/freecodecamp.org/clustering-in-python-a-machine-learning-handbook/more-unsupervised-learning-techniques.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## FAQs

::: details Q: What is the difference between supervised and unsupervised learning?

Supervised learning involves training a model on labeled data, where the inputs are paired with corresponding outputs. The goal is to predict the output for new, unseen inputs.

In contrast, unsupervised learning deals with unlabeled data, where the goal is to discover patterns, structures, or clusters within the data without any predefined output.

Essentially, supervised learning aims to learn a mapping function, while unsupervised learning focuses on uncovering hidden relationships or groupings in the data.

:::

::: details Q: Which clustering algorithm is best for my data?

The suitability of a clustering algorithm depends on various factors, such as the nature of the data, the desired number of clusters, and the specific problem you are trying to solve.

In this handbook, we discussed three commonly used clustering algorithms:

- **K-means** is a popular algorithm that aims to partition the data into K clusters, with each data point assigned to the nearest centroid. It works well for evenly distributed, spherical clusters and requires the number of clusters to be specified in advance.
- **Hierarchical clustering** builds a hierarchy of clusters by iteratively merging or splitting them. It provides a dendrogram to visualize the clustering process and can handle different shapes and sizes of clusters.
- **DBSCAN** is a density-based algorithm that groups together data points that are close to each other and separates outliers. It can discover clusters of arbitrary shape and does not require the number of clusters to be known beforehand.

To determine the best algorithm for your use case, I recommend that you experiment with different techniques and assess their performance based on metrics like cluster quality, computational efficiency, and interpretability.

:::

::: details Q: Can unsupervised learning be used for predictive analytics?

While unsupervised learning primarily focuses on discovering patterns and relationships within data without specific output labels, it can indirectly support predictive analytics. By uncovering hidden structures and clusters within the data, unsupervised learning can provide insights that enable better feature engineering, anomaly detection, or segmentation, which can subsequently enhance the performance of predictive models.

Unsupervised learning techniques like clustering can help identify distinct groups or patterns in the data, which can be used as input features for predictive models or serve as a basis for generating new predictive variables. So unsupervised learning plays a valuable role in predictive analytics by facilitating a deeper understanding of the data and enhancing the accuracy and effectiveness of predictive models.

:::

---

## Data Science and AI Resources

Want to learn more about a career in Data Science, Machine Learning, and AI, and learn how to secure a Data Science job? You can download this [<VPIcon icon="fas fa-globe"/>free Data Science and AI Career Handbook](https://downloads.tatevaslanyan.com/six-figure-data-science-ebook).

Want to learn Machine Learning from scratch, or refresh your memory? Download this [**free Machine Learning Fundamentals Handbook**](/freecodecamp.org/machine-learning-handbook/README.md) to get all Machine Learning fundamentals combiend with examples in Python in one place.

---

## About the Author

[Tatev Aslanyan (<VPIcon icon="fa-brands fa-linkedin"/>`tatev-karen-aslanyan`)](https://linkedin.com/in/tatev-karen-aslanyan/) is a Senior Machine Learning and AI Engineer, CEO, and Co-founder of [<VPIcon icon="fas fa-globe"/>LunarTech](https://lunartech.ai/), a Deep Tech Innovation startup committed to making Data Science and AI accessible globally. With over 6 years of experience in AI engineering and Data Science, Tatev has worked in the US, UK, Canada, and the Netherlands, applying her expertise to advance AI solutions in diverse industries.

[Tatev (<VPIcon icon="fa-brands fa-linkedin"/>`tatev-karen-aslanyan`)](https://linkedin.com/in/tatev-karen-aslanyan/) holds an MSc and BSc in Econometrics and Operational Research from top tier Dutch Universities, and has authored several scientific papers in Natural Language Processing (NLP), Machine Learning, and Recommender Systems, published in respected US scientific journals.

As a top open-source contributor, Tatev has co-authored courses and books, including resources on **freeCodeCamp for 2024**, and has played a pivotal role in educating over **30,000 learners across 144 countries** through [<VPIcon icon="fas fa-globe"/>LunarTech's programs](https://lunartech.ai/bootcamp/ai-engineering-bootcamp).

[<VPIcon icon="fas fa-globe"/>LunarTech](https://lunartech.ai/) is Deep Tech innovation company building AI-powered products and delivering educational tools to help enterprises and people innovate, reducing operational costs and increasing profitability.

::: info Connect With Us

- [Connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`tatev-karen-aslanyan`)](https://linkedin.com/in/tatev-karen-aslanyan/)
- [Check out YouTube Channel (<VPIcon icon="fa-brands fa-youtube"/>`LunarTech_ai`)](https://youtube.com/@LunarTech_ai)
- Subscribe to [<VPIcon icon="fas fa-globe"/>LunarTech Newsletter](https://substack.com/@lunartech) or [<VPIcon icon="fas fa-globe"/>LENS](https://lens.lunartech.ai/) - Our News Channel

:::

Want to discover everything about a career in Data Science, Machine Learning and AI, and learn how to secure a Data Science job? Download this free Data Science and AI Career Handbook.

Thank you for choosing this guide as your learning companion. As you continue to explore the vast field of Artificial Intelligence, I hope you do so with confidence, precision, and an innovative spirit.

---

## AI Engineering Bootcamp by LunarTech

If you are serious about becoming an AI Engineer and want an all-in-one bootcamp that combines deep theory with hands-on practice, then check out the [<VPIcon icon="fas fa-globe"/>LunarTech AI Engineering Bootcamp](https://lunartech.ai/bootcamp/ai-engineering-bootcamp) focused on Generative AI. This is not comprehensive and advanced program in AI Engineering, designed to equip you with everything you need to thrive in the most competitive AI roles and industries.

In just 3 to 6 months self-phased or cohort-based, you will learn Generative AI and foundational models like VAEs, GANs, transformers, and LLMs. Dive deep into mathematics, statistics, architecture, and the technical nuances of training these models using industry-standard frameworks like PyTorch and TensorFlow.

The curriculum includes pre-training, fine-tuning, prompt engineering, quantization, and optimization of large models, alongside cutting-edge techniques such as Retrieval-Augmented Generation (RAGs).

This Bootcamp positions you to bridge the gap between research and real-world applications, empowering you to design impactful solutions while building a stellar portfolio filled with advanced projects.

The program also prioritizes AI Ethics, preparing you to create sustainable, ethical models that align with responsible AI principles. This isn’t just another course—it’s a comprehensive journey designed to make you a leader in the AI revolution. [<VPIcon icon="fas fa-globe"/>Check out the Curriculum here](https://lunartech.ai/bootcamp/ai-engineering-bootcamp)

Spots are limited, and the demand for skilled AI engineers is higher than ever. Don’t wait—your future in AI engineering starts now. You can [<VPIcon icon="fas fa-globe"/>Apply Here](https://forms.fillout.com/t/frSHf9HUZCus).

> “Let’s Build The Future Together!“ - Tatev Aslanyan, CEO and Co-Founder at LunarTech

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Clustering in Python - A Machine Learning Engineering Handbook",
  "desc": "Want to learn how to discover and analyze the hidden patterns within your data? Clustering, an essential technique in Unsupervised Machine Learning, holds the key to discovering valuable insights that can revolutionize your understanding of complex d...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/clustering-in-python-a-machine-learning-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
