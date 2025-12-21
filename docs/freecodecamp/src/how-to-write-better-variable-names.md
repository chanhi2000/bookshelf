---
lang: en-US
title: "How to Write Better Names for Your Variables, Functions, and Classes - With Examples"
description: "Article(s) > How to Write Better Names for Your Variables, Functions, and Classes - With Examples"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Better Names for Your Variables, Functions, and Classes - With Examples"
    - property: og:description
      content: "How to Write Better Names for Your Variables, Functions, and Classes - With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-write-better-variable-names.html
prev: /programming/js/articles/README.md
date: 2024-12-05
isOriginal: false
author: Asfak Ahmed
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733325693047/f3dff206-f0cf-47b0-9345-991b4d980d71.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Better Names for Your Variables, Functions, and Classes - With Examples"
  desc="Naming is one of the most important and challenging parts of writing clean, maintainable, and scalable code. A well-thought-out variable name, for example, can act as self-documenting code, saving time and effort in understanding the logic. But poorl..."
  url="https://freecodecamp.org/news/how-to-write-better-variable-names"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733325693047/f3dff206-f0cf-47b0-9345-991b4d980d71.png"/>

Naming is one of the most important and challenging parts of writing clean, maintainable, and scalable code. A well-thought-out variable name, for example, can act as self-documenting code, saving time and effort in understanding the logic. But poorly chosen names, on the other hand, can lead to confusion and bugs.

This article will serve as a comprehensive guide on how to come up with meaningful names for class names, variables, and functions with examples and best practices.

---

## Why Does Naming Matter?

- **Readability:** Good names make your code intuitive and reduce the learning curve for others.
- **Maintainability:** It is easier to refactor or debug well-named code.
- **Collaboration:** Clear names improve team communication and productivity.
- **Scalability:** Meaningful names help keep large projects manageable.

---

## Different Naming Convention Styles

Different naming convention styles are crucial in improving code readability and maintainability across various programming languages.

Styles like camelCase, PascalCase, snake_case, and kebab-case are tailored to specific contexts and practices.

**camelCase** is widely used for variables and functions, while **PascalCase** is preferred for classes. **snake_case** is a favorite in Python for its clarity, and **kebab-case** dominates CSS for HTML element styling.

Each style ensures consistency, making code intuitive for teams and future developers. Here’s a quick summary table of some popular naming conventions along with their use cases and examples:

| **Style** | **Example** | **Common Usage** |
| :--- | :--- | :--- |
| camelCase | `userName` | Variables, functions, object properties |
| PascalCase | `UserName` | Classes, components, constructors |
| kebab-case | `primary-button` | CSS classes, HTML IDs, file names |
| snake_case | `user_name` | Variables, function names in Python |
| SCREAMING_SNAKE_CASE | `MAX_CONNECTIONS` | Constants |
| dot.case | `config.file.path` | Configurations, keys |
| Train-Case | `Primary-Button` | Titles rarely used |
| Hungarian Notation | `bIsActive` | Legacy code |
| UPPERCASE with Spaces | `USER ACCOUNT DETAILS` | Rare, mostly for old-style documentation |
| Flatcase | `username` | Minimalist, filenames, identifiers |

### How to Choose the Right Style

1. **Language-Specific:** Follow the conventions of your programming language or framework. For example:
    - JavaScript: `camelCase` for variables and functions, `PascalCase` for components.
    - Python: `snake_case` for variables and functions.
    - CSS/HTML: `kebab-case` for class names and IDs.
2. **Team or Project Standards:** Consistency is key. Use the agreed style for your team/project.
3. **Purpose-Specific:** Use naming styles that best represent the entity being named (for example, constants in `SCREAMING_SNAKE_CASE`).

---

## General Naming Guidelines

Before diving into specific naming conventions for class names, variables, and functions, let’s explore some universal principles:

::: tab

@tab:active 1.

**Be descriptive and concise:**

Names should convey the purpose or role of the variable/function/etc:
    
```js
// Bad
let x = 10;

// Good
let maxUsersAllowed = 10;
```

@tab 2.

**Avoid cryptic abbreviations** that might be hard for other devs to understand (or even your future self):

```js
// Bad
let usrNm = "John";

// Good
let userName = "John";
```

@tab 3.

**Use consistent naming conventions:**

Choose a naming style (camelCase, PascalCase, kebab-case, snake_case) and stick with it throughout your project.

@tab 4.

**Avoid reserved keywords or confusing names:**

```js
// Bad
let let = 5;

// Good
let variableName = 5;
```

:::

Alright, now that we’ve covered the basis, lets dig deeper into some helpful naming conventions.

---

## How to Create Good Class Names

Class names define the visual or structural behavior of elements in your application. Writing clear class names ensures your HTML and CSS are easy to understand and maintain.

### 1. Use Descriptive Names

Class names should describe the purpose of the element, not its appearance.

```xml
<!-- Bad -->
<div class="red-button"></div>

<!-- Good -->
<div class="primary-button"></div>
```

### 2. Follow the BEM (Block-Element-Modifier) Methodology

BEM is a popular convention for writing scalable and maintainable CSS. It separates components into:

- **Block:** Represents the component (for example, `card`).
- **Element:** Represents child elements of the block (for example, `card__title`).
- **Modifier:** Represents variations of the block or element (for example, `card__title--highlighted`).

::: tip Example

```xml
<div class="card">
  <h1 class="card__title card__title--highlighted">Welcome</h1>
  <p class="card__description">This is a card component.</p>
</div>
```

:::

### 3. Use kebab-case

CSS class names are traditionally written in kebab-case for better readability.

```xml
<!-- Bad -->
<div class="primaryButton"></div>

<!-- Good -->
<div class="primary-button"></div>
```

---

## How to Create Good Variable Names

Variables hold data and should have meaningful names that describe what they represent.

### 1. Use Nouns for Variables

Variables are typically nouns because they represent entities or data.

```js
// Bad
let a = "John";

// Good
let userName = "John";
```

### 2. Use Prefixes to Add Context

Adding prefixes helps clarify the type or purpose of a variable:

- **Boolean:** `is`, `has`, `can`
- **Numbers:** `max`, `min`, `total`
- **Arrays:** Use plural forms (for example, `users`, `items`).

:: tip Example

```js
let isUserLoggedIn = true;
const maxUploadLimit = 5; // MB
const usersList = ["John", "Jane"];
```

### 3. Avoid Generic Names

Avoid names like `data`, `value`, or `item` unless they’re necessary.

```js
// Bad
let data = 42;

// Good
let userAge = 42;
```

---

## How to Create Good Function Names

Functions perform actions, so their names should reflect the operation or process they execute.

### 1. Use Verbs for Functions

Functions are action-oriented, so their names should begin with a verb:

```js
// Bad
function userData() {
  // ...
}

// Good
function fetchUserData() {
  // ...
}
```

### 2. Be Specific About Functionality

Function names should indicate what they do.

```js
// Bad
function handle() {
  // ...
}

// Good
function handleFormSubmit() {
  // ...
}
```

### 3. Use Prefixes for Intent

- For event handlers: `handle`, `on`
- For utilities: `calculate`, `convert`, `format`
- For fetch operations: `fetch`, `get`, `load`
- For setters and getters: `set`, `get`

::: tip Example

```js
function handleButtonClick() {
  console.log("Button clicked!");
}

function calculateDiscount(price, discountPercentage) {
  return price * (discountPercentage / 100);
}
```

:::

---

## How to Know if a Name is Good for a Variable, Function, or Class

To understand if a name is good for a variable, function, or class, evaluating it using several key principles is important. Here’s a guide to help you decide whether a name is appropriate and meaningful in your programming context:

### 1. Does It Represent the Purpose?

**Purpose-driven names** are the most important characteristic of good naming. A name should immediately tell you what the variable, function, or class represents or does without needing to read additional comments or documentation.

**How to Assess:**

Ask yourself: "When I read this name, can I immediately understand its purpose?"

:: tip Example

`userAge` is better than `a` because `userAge` tells you what the variable represents, whereas `a` is too ambiguous.

:::

### 2. Is It Specific Enough?

The name should be **specific enough** to reflect the exact role of the entity in your code. Overly generic names like `data` or `temp` can be confusing because they don’t provide enough context.

**How to Assess:**

Ask: "Is this name specific to what this variable, function, or class represents in my application?"

:: tip Example

- `calculateTaxAmount()` is better than `calculate()` because it’s clear what the function is calculating.

:::

### 3. Does It Follow a Consistent Naming Convention?

**Consistency** in naming conventions is vital. When all team members follow the same conventions, the code is easier to understand and navigate.

**How to Assess:**

Ask: "Is this name consistent with the naming conventions used in the rest of the project?" Follow project guidelines such as:

- `camelCase` for variables and functions (e.g., `userAge`)
- `PascalCase` for classes (e.g., `UserProfile`)
- `UPPERCASE_SNAKE_CASE` for constants (e.g., `MAX_USERS`)

:: tip Example

If your team follows `camelCase`, `userData` is better than `UserData`.

:::

### 4. Does it Avoid Ambiguity?

A good name **eliminates ambiguity**. It should not be open to multiple interpretations. If it can mean different things in different contexts, it will lead to confusion.

**How to Assess:**

Ask: "Could someone unfamiliar with the codebase misinterpret what this name refers to?"

:: tip Example

Instead of naming a boolean `isValid`, use `isUserLoggedIn` or `isEmailVerified` to make it clearer what is being checked.

:::

### 5. Is It Easy to Read and Pronounce?

While not strictly necessary, **ease of reading and pronunciation** can improve the overall readability and maintainability of your code.

**How to Assess:**

Ask: "Is this name easy to read aloud, and can I understand it at a glance?"

Avoid long names, and use common abbreviations only when they are widely accepted.

:: tip Example

`maxRetries` is better than `maximumNumberOfAttemptsToReconnect`.

:::

### 6. Does It Avoid Redundancy?

**Avoid redundancy** in names. Don’t repeat information that is already implied or described by the context.

**How to Assess:**

Ask: "Am I repeating information that is already clear from the surrounding context?"

:: tip Example

If you have a class named `User`, naming a method `userGetData()` is redundant. Instead, use `getData()`.

:::

### 7. Is It Self-Documenting?

The best names **document themselves**. Good names reduce the need for additional comments or explanations.

**How to Assess:**

Ask: "Does this name fully describe the variable, function, or class without requiring a comment to explain what it does?"

:: tip Example

`calculateTotalPrice` is self-explanatory, so there’s no need for an additional comment like “This function calculates the total price after discount.”

:::

### 8. Is It Contextual and Relevant to the Domain?

The name should fit within the context of your project and its domain. For example, naming conventions for a web application may differ from those for a mobile app or a machine learning model.

**How to Assess:**

Ask: "Is this name aligned with the domain and context of my project?"

If you’re working in a specific domain (for example, finance, health, gaming), use domain-specific terms that are easily recognizable.

:: tip Example

In a gaming app, `healthPoints` is more appropriate than `hp`, as it reflects its meaning.

:::

### 9. Is It Future-Proof?

Think about how your code will evolve. Names should be flexible enough to accommodate future changes without requiring refactoring.

**How to Assess:**

Ask: "Will this name still make sense if the functionality changes or the project grows?"

:: tip Example

`userInfo` could become outdated if the data structure changes. It’s better to use `userProfile` if you expect more fields to be added.

:::

### 10. Does It Avoid Magic Numbers and Hard-Coded Values?

**Magic numbers** (numbers with unclear meaning) should be avoided in favor of named constants.

**How to Assess:**

Ask: "Does this name represent a meaningful constant, or is it just a raw number?"

:: tip Example

Instead of using `1000`, use a constant like `MAX_FILE_SIZE` to explain the meaning behind the number.

:::

---

## Practical Examples

### CSS Example

The following CSS example demonstrates how to apply **BEM (Block-Element-Modifier)** naming conventions to maintain a structured and scalable class hierarchy in your stylesheet:

```xml
<!-- HTML -->
<div class="navbar">
  <ul class="navbar__list">
    <li class="navbar__item navbar__item--active">Home</li>
    <li class="navbar__item">About</li>
    <li class="navbar__item">Contact</li>
  </ul>
</div>
```

```css
/* CSS */
.navbar {
  background-color: #333;
  padding: 10px;
}

.navbar__list {
  list-style: none;
}

.navbar__item {
  display: inline-block;
  padding: 10px;
}

.navbar__item--active {
  color: orange;
}
```

Here’s what’s going on in this code:

- **BEM Naming**: `navbar` is the **Block**, representing the main navigation component.
- `navbar__list` is the **Element**, a child of the block, representing the list of navigation items.
- `navbar__item` is another **Element** representing individual list items.
- `navbar__item--active` is a **Modifier**, used to highlight the active menu item. <br/>This approach makes it easy to understand relationships and roles within the HTML and CSS, supporting modular and reusable styles.

### JavaScript Example

This JavaScript example shows how to use meaningful and consistent naming conventions for variables and functions to make the code self-explanatory:

```js
// Variables
let isUserLoggedIn = false;
const maxAllowedItems = 10;

// Functions
function fetchUserDetails(userId) {
  // Fetch user data from the API
}

function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0);
}
```

Here’s what’s going on in the code:

- **Variables**:
  - `isUserLoggedIn`: A boolean variable named to clearly indicate its purpose. Prefixing with `is` helps identify it as a boolean.
  - `maxAllowedItems`: A constant with an uppercase `max` prefix shows it's a limit, making its intent clear.
- **Functions**:
  - `fetchUserDetails(userId)`: The name reflects the purpose of the function, that is retrieving user details. The parameter `userId` is descriptive and avoids ambiguity.
  - `calculateTotalPrice(cartItems)`: The function name explicitly states the action performed. The `cartItems` parameter is contextually relevant to the e-commerce domain.

::: note Why It’s Good

These conventions ensure the code is readable and intuitive, reducing the cognitive load for other developers working on the same project.

:::

---

## Conclusion

Meaningful naming is both an important convention and an art form that significantly impacts your code's readability and maintainability.

Try to follow these basic principles:

- Use descriptive, concise names.
- Adhere to consistent conventions like BEM for class names and camelCase for variables and functions.
- Use prefixes to add context and clarity.

These and the other tips we’ve discussed here will make your code a joy to work with, whether you revisit it months later or collaborate with a team. Start applying these tips today, and watch your code quality soar.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Better Names for Your Variables, Functions, and Classes - With Examples",
  "desc": "Naming is one of the most important and challenging parts of writing clean, maintainable, and scalable code. A well-thought-out variable name, for example, can act as self-documenting code, saving time and effort in understanding the logic. But poorl...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-write-better-variable-names.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
