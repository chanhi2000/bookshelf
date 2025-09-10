---
lang: en-US
title: "8. Modules, Packages, and Dependency Management"
description: "Article(s) > (8/12) How to Learn Python for JavaScript Developers [Full Handbook]"
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
      content: "Article(s) > (8/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "8. Modules, Packages, and Dependency Management"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-python-for-javascript-developers-handbook/8-modules-packages-and-dependency-management.html
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
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-8-modules-packages-and-dependency-management"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Both Python and JavaScript encourage modular programming, allowing developers to divide code into reusable and maintainable components.

Managing modules, packages, and dependencies is essential for any non-trivial project, and both languages provide robust systems to handle these needs. But the tools and ecosystems differ significantly.

---

## Node.js Modules vs. Python Packages

### <FontIcon icon="fa-brands fa-js"/>

JavaScript uses the **Node.js module system**, which allows developers to organize code into modules. Modules can be imported using `require` (CommonJS) or `import` (ES6 modules).

::: tip Example: Exporting and Importing Modules in JavaScript

```js title="Exporting from a module (utils.js)"
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}
```

```js title="Importing in another file (main.js)"
import { add, multiply } from './utils.js';

console.log(add(2, 3));       // Output: 5
console.log(multiply(2, 3));  // Output: 6
```

**CommonJS** uses `module.exports` and `require()`:

```js
// utils.js
module.exports = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
};

// main.js
const { add, multiply } = require('./utils');
console.log(add(2, 3));       // Output: 5
console.log(multiply(2, 3));  // Output: 6
```

:::

### <FontIcon icon="fa-brands fa-python"/>

Python organizes reusable code into **modules** and **packages**. A module is simply a `.py` file, and a package is a directory containing a special <FontIcon icon="fa-brands fa-python"/>`__init__.py` file, which can include one or more modules.

::: tip Example: Exporting and Importing Modules in Python

```py title="Exporting from a module (utils.py)"
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

```py title="Importing in another file (main.py)"
from utils import add, multiply

print(add(2, 3))       # Output: 5
print(multiply(2, 3))  # Output: 6
```

Python uses `import` for loading modules and supports relative imports for packages.

:::

---

## Package Managers: NPM vs. pip

Both languages provide package managers for installing and managing third-party libraries and dependencies.

### <FontIcon icon="fa-brands fa-js"/>NPM

- **Node Package Manager (NPM)** is JavaScript’s default package manager, and it comes bundled with Node.js.
- It uses a `package.json` file to define dependencies, scripts, and metadata for a project.

```sh title="Installing a Library with NPM"
npm install express
```

```json title="Example: Defining Dependencies in package.json"
{
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### <FontIcon icon="fa-brands fa-python"/>pip\

- Python uses **pip** (Python Installer Package) to manage libraries and frameworks.
- Python projects commonly use a <FontIcon icon="fas fa-file-lines"/>`requirements.txt` file to list dependencies.

```sh title="Example: Installing a Library with pip"
pip install flask
```

```plaintext title="Defining Dependencies in requirements.txt"
flask==2.3.0
requests==2.31.0
```

To install all dependencies in <FontIcon icon="fas fa-file-lines"/>`requirements.txt`:

```sh
bashCopy codepip install -r requirements.txt
```

::: note Comparison

- NPM allows version ranges and automatically creates <FontIcon icon="fas fa-folder-open"/>`node_modules` to manage dependencies. It also supports both development (`--save-dev`) and production dependencies.
- pip installs libraries globally or in a virtual environment but lacks the automatic distinction between dev and production dependencies, which must be handled manually.

:::

---

## Managing Dependencies in Python with Virtual Environments

Python has a unique feature for isolating dependencies: **virtual environments**. Virtual environments ensure that dependencies for one project don’t interfere with another, avoiding conflicts.

### Creating a Virtual Environment

```sh
python -m venv myenv
```

### Activating the Virtual Environment

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```batchfile
myenv\Scripts\activate
```

@tab <FontIcon icon="iconfont icon-macos"/>/<FontIcon icon="fa-brands fa-linux"/>

```sh
source myenv/bin/activate
```

:::

### Installing Libraries in the Virtual Environment

```sh
pip install flask
```

### Deactivating the Virtual Environment

```sh
deactivate
```

### JavaScript Alternative

While JavaScript does not require virtual environments, tools like `nvm` (Node Version Manager) can be used to manage different Node.js versions for projects.

---

## Project Structures and Best Practices

### <FontIcon icon="fa-brands fa-js"/>JavaScript Project Structure

A typical Node.js project includes:

```plaintext title="project structure"
my-node-project/
├── node_modules/  # Installed dependencies
├── src/           # Source code
│   ├── app.js     # Entry point
│   ├── utils.js   # Utility module
├── package.json   # Dependency and project metadata
├── package-lock.json  # Dependency tree for consistency
```

### <FontIcon icon="fa-brands fa-python"/>Python Project Structure

```plaintext title="project structure"
my-python-project/
├── venv/            # Virtual environment
├── src/             # Source code
│   ├── __init__.py  # Package initializer
│   ├── app.py       # Entry point
│   ├── utils.py     # Utility module
├── requirements.txt # Dependency list
```

::: important Key Takeaways:

1. **Modules**: Both languages support modular programming. Python modules are simple <FontIcon icon="fa-brands fa-python"/>`.py` files, while JavaScript has both CommonJS and ES6 modules.
2. **Package Managers**: NPM and pip serve similar purposes but have different approaches. NPM is more feature-rich, supporting scripts and version management, while pip is simpler but relies on virtual environments for isolation.
3. **Dependency Isolation**: Python’s virtual environments ensure clean project separation, a feature not natively required in JavaScript due to its global Node.js architecture.

:::
