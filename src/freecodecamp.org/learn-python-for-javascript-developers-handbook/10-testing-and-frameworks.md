---
lang: en-US
title: "10. Testing and Frameworks"
description: "Article(s) > (10/12) How to Learn Python for JavaScript Developers [Full Handbook]"
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
      content: "Article(s) > (10/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "10. Testing and Frameworks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-python-for-javascript-developers-handbook/10-testing-and-frameworks.html
date: 2024-11-22
isOriginal: false
author: German Cocca
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
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-10-testing-and-frameworks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Testing is an integral part of software development, ensuring that applications behave as expected and reducing the likelihood of bugs. Both Python and JavaScript have robust ecosystems for testing, offering various frameworks and tools to streamline the process.

---

## Popular Testing Frameworks: Mocha/Chai vs. Pytest/Unittest

Both Python and JavaScript have multiple testing frameworks, each tailored to specific needs. For JavaScript, **Mocha** and **Chai** are popular choices, while Python developers often use **Pytest** or the built-in **Unittest** module.

**JavaScript: Mocha and Chai**  
Mocha is a flexible testing framework for JavaScript, and Chai is often paired with it to provide assertion libraries for more readable test cases.

**Example: Mocha and Chai**

```js
const { expect } = require('chai');

// Function to test
function add(a, b) {
    return a + b;
}

// Mocha test
describe('Add Function', () => {
    it('should return the sum of two numbers', () => {
        expect(add(2, 3)).to.equal(5);
    });

    it('should handle negative numbers', () => {
        expect(add(-2, -3)).to.equal(-5);
    });
});
```

**Python: Pytest**  
Pytest is a widely used framework in Python that emphasizes simplicity and flexibility. Tests can be written as plain functions, and Pytest’s built-in fixtures streamline setup and teardown.

**Example: Pytest**

```py
import pytest

# Function to test
def add(a, b):
    return a + b

# Pytest functions
def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative_numbers():
    assert add(-2, -3) == -5
```

**Key Differences**:

1. **Syntax**: Mocha/Chai uses JavaScript syntax with chaining assertions (`expect`), while Pytest relies on Python’s `assert` keyword.
2. **Fixtures**: Pytest fixtures simplify test setup, whereas Mocha relies on manual setup functions (`before`, `beforeEach`).

---

## Writing Unit Tests and Test Coverage

Unit testing focuses on verifying individual components or functions in isolation. Both Python and JavaScript frameworks support unit tests, but the tools for measuring test coverage differ.

**JavaScript: nyc (Istanbul)**  
The `nyc` tool, built on Istanbul, is commonly used to measure test coverage in JavaScript projects.

**Example: Generating Coverage Reports with Mocha and nyc**

```bash
npm install --save-dev mocha nyc
```

Add a test script to `package.json`:

```js
"scripts": {
    "test": "mocha",
    "coverage": "nyc mocha"
}
```

Run the coverage command:

```bash
npm run coverage
```

This generates a report showing which parts of the code were covered during tests.

**Python:** [**Coverage.py**](http://Coverage.py)  
In Python, [`coverage.py`](http://coverage.py) is the standard tool for measuring test coverage.

**Example: Generating Coverage Reports with Pytest and** [**Coverage.py**](http://Coverage.py)

```bash
pip install pytest coverage
```

Run tests with coverage:

```bash
coverage run -m pytest
coverage report
```

This displays coverage percentages for each file and highlights untested lines.

**Key Differences**:

- JavaScript tools like nyc integrate easily with CI/CD pipelines, while [`coverage.py`](http://coverage.py) provides detailed line-by-line reports.

---

## Automation and CI/CD Compatibility

Modern development workflows often include automated testing integrated into CI/CD pipelines. Both Python and JavaScript testing frameworks are compatible with CI/CD tools like Jenkins, GitHub Actions, and GitLab CI.

**Example: Automating Tests in a CI/CD Pipeline**

**JavaScript (GitHub Actions)**:

```yaml
name: Node.js CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm install
    - run: npm test
    - run: npm run coverage
```

**Python (GitHub Actions)**:

```yaml
name: Python CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-python@v2
      with:
        python-version: '3.9'
    - run: pip install -r requirements.txt
    - run: pytest --cov=.
```

---

## Integration and End-to-End Testing

In addition to unit testing, both languages support integration and end-to-end (E2E) testing.

**JavaScript: Cypress for E2E Testing**  
Cypress is a popular tool for E2E testing of web applications, providing a developer-friendly interface and real-time browser interaction.

**Example: Cypress Test**

```js
describe('Login Page', () => {
    it('should log in with valid credentials', () => {
        cy.visit('/login');
        cy.get('#username').type('user');
        cy.get('#password').type('password');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });
});
```

**Python: Selenium for Browser Automation**  
Selenium is commonly used in Python for E2E testing of web applications, automating browser interactions.

**Example: Selenium Test**

```py
from selenium import webdriver

def test_login():
    driver = webdriver.Chrome()
    driver.get("http://example.com/login")
    driver.find_element_by_id("username").send_keys("user")
    driver.find_element_by_id("password").send_keys("password")
    driver.find_element_by_css_selector("button[type='submit']").click()
    assert "dashboard" in driver.current_url
    driver.quit()
```

### Key Takeaways:

1. **Unit Testing**: JavaScript (Mocha/Chai) and Python (Pytest) frameworks are highly flexible, but Pytest’s concise syntax makes it particularly beginner-friendly.
2. **Test Coverage**: Both `nyc` (JavaScript) and [`coverage.py`](http://coverage.py) (Python) are effective for measuring test coverage and identifying gaps.
3. **E2E Testing**: JavaScript developers can leverage Cypress for browser testing, while Python offers Selenium for automation.
4. **CI/CD Compatibility**: Both languages integrate seamlessly with modern CI/CD pipelines, enabling automated testing at every stage of development.

<!-- TODO: 작성 -->
