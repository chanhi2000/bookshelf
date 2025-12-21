---
lang: en-US
title: "11. Practical Applications and Examples"
description: "Article(s) > (11/12) How to Learn Python for JavaScript Developers [Full Handbook]"
category:
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - javascript
  - js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (11/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "11. Practical Applications and Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-python-for-javascript-developers-handbook/11-practical-applications-and-examples.html
date: 2024-11-22
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Learn Python for JavaScript Developers [Full Handbook]",
  "desc": "As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m...",
  "link": "/freecodecamp.org/learn-python-for-javascript-developers-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Learn Python for JavaScript Developers [Full Handbook]"
  desc="As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m..."
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-11-practical-applications-and-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Both Python and JavaScript excel in various practical applications, but their strengths shine in different domains. This section explores common use cases for each language, providing hands-on examples to showcase their capabilities and differences.

---

## Writing a Simple Web Scraper

### <VPIcon icon="fa-brands fa-python"/>Python: Using BeautifulSoup

Python’s libraries, such as BeautifulSoup and Requests, make web scraping straightforward and efficient.

::: tip Example: Web Scraper in Python

```py
import requests
from bs4 import BeautifulSoup

# Fetch the webpage
url = "https://example.com"
response = requests.get(url)

# Parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")

# Extract specific data
titles = soup.find_all("h2")
for title in titles:
    print(title.text)
```

:::

### <VPIcon icon="fa-brands fa-js"/>JavaScript: Using Puppeteer

JavaScript can also scrape web content using libraries like Puppeteer, which allows headless browsing.

::: tip Example: Web Scraper in JavaScript

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');

  // Extract specific data
  const titles = await page.$$eval('h2', elements => elements.map(el => el.textContent));
  console.log(titles);

  await browser.close();
})();
```

:::

::: info Key Differences

- Python’s BeautifulSoup is simpler for static pages, while Puppeteer provides more flexibility for dynamic content rendered by JavaScript.

:::

---

## Creating a REST API

### <VPIcon icon="iconfont icon-flask"/>Python: Flask

Python’s Flask framework is lightweight and ideal for quickly building APIs.

::: tip Example: REST API in Python

```py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello, World!"})

if __name__ == '__main__':
    app.run(debug=True)
```

:::

### <VPIcon icon="iconfont icon-expressjs"/>JavaScript: Express

Express is a popular framework for creating REST APIs in JavaScript.

::: tip Example: REST API in JavaScript

```js
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

:::

::: info Key Differences

- Flask offers built-in simplicity with decorators for routing.
- Express requires more explicit configuration but is better suited for large-scale Node.js projects.

:::

---

## Automation Scripts: File Handling, Network Requests, and Scripting

### Python: Automation with `os` and `shutil`

Python excels at automation tasks, making file and system operations straightforward.

::: tip Example: File Automation in Python

```py
import os
import shutil

# Create a directory
os.makedirs("example_dir", exist_ok=True)

# Move a file
shutil.move("source.txt", "example_dir/destination.txt")

# List files in a directory
for file in os.listdir("example_dir"):
    print(file)
```

:::

### JavaScript: File System Module (`fs`)

JavaScript’s `fs` module allows file handling, but it requires more boilerplate.

::: tip Example: File Automation in JavaScript

```js
const fs = require('fs');
const path = require('path');

// Create a directory
fs.mkdirSync('example_dir', { recursive: true });

// Move a file
fs.renameSync('source.txt', path.join('example_dir', 'destination.txt'));

// List files in a directory
fs.readdirSync('example_dir').forEach(file => {
    console.log(file);
});
```

:::

::: info Key Differences

- Python’s `os` and `shutil` modules provide concise methods for file and system operations.
- JavaScript requires more explicit handling for similar tasks using Node.js modules.

:::

---

## Data Processing and Visualization

### Python: Data Science with Pandas and Matplotlib

Python dominates data processing and visualization with libraries like Pandas and Matplotlib.

::: tip Example: Data Analysis in Python

```py
import pandas as pd
import matplotlib.pyplot as plt

# Create a DataFrame
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)

# Plot the data
df.plot(x='Name', y='Age', kind='bar')
plt.show()
```

:::

### JavaScript: Data Visualization with D3.js

JavaScript excels at interactive web-based visualizations with D3.js.

::: tip Example: Data Visualization in JavaScript

```js
const d3 = require('d3');
const data = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

const svg = d3.create("svg")
    .attr("width", 500)
    .attr("height", 300);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 100)
    .attr("y", d => 300 - d.age * 5)
    .attr("width", 50)
    .attr("height", d => d.age * 5);

console.log(svg.node().outerHTML);
```

:::

::: info Key Differences

- Python’s data libraries are geared toward analysis and are simpler for static visualizations.
- JavaScript’s D3.js creates highly interactive visualizations for web applications.

:::

---

## Machine Learning and AI

### Python: TensorFlow

Python’s TensorFlow library simplifies building machine learning models.

::: tip Example: Machine Learning in Python

```py
import tensorflow as tf

# Define a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])

model.compile(optimizer='sgd', loss='mean_squared_error')

# Train the model
xs = [1, 2, 3, 4]
ys = [2, 4, 6, 8]
model.fit(xs, ys, epochs=500, verbose=0)

# Predict
print(model.predict([5]))  # Output: [[10]]
```

:::

### JavaScript: TensorFlow.js

TensorFlow.js brings machine learning capabilities to JavaScript.

::: tip Example: Machine Learning in JavaScript

```js
const tf = require('@tensorflow/tfjs-node');

// Define a simple model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

// Train the model
const xs = tf.tensor([1, 2, 3, 4]);
const ys = tf.tensor([2, 4, 6, 8]);
model.fit(xs, ys, { epochs: 500 }).then(() => {
    // Predict
    model.predict(tf.tensor([5])).print();  // Output: [[10]]
});
```

:::

::: info Key Differences

- Python dominates in machine learning due to its mature ecosystem and extensive documentation.
- TensorFlow.js allows machine learning in JavaScript, but it is less mature compared to Python’s TensorFlow.

:::

::: important Key Takeaways:

- **Web Scraping**: Python excels with BeautifulSoup for static content, while Puppeteer is better for dynamic content.
- **REST APIs**: Python’s Flask is lightweight and easy to use, while JavaScript’s Express offers flexibility and scalability.
- **Automation**: Python simplifies file and system operations with `os` and `shutil`, while JavaScript achieves similar results with Node.js modules.
- **Data Visualization**: Python’s libraries focus on analysis, while JavaScript’s D3.js creates interactive, web-based visualizations.
- **Machine Learning**: Python leads with TensorFlow and other ML frameworks, while TensorFlow.js brings ML capabilities to JavaScript.

:::
