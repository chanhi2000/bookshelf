---
lang: en-US
title: "Learn Software Design Basics: Key Phases and Best Practices"
description: "Article(s) > Learn Software Design Basics: Key Phases and Best Practices"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Python
  - NumPy
  - Pandas
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
  - py
  - python
  - numpy
  - py-numpy
  - pandas
  - py-pandas
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Software Design Basics: Key Phases and Best Practices"
    - property: og:description
      content: "Learn Software Design Basics: Key Phases and Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-software-design-basics.html
prev: /academics/system-design/articles/README.md
date: 2025-03-08
isOriginal: false
author:
  - name: Soham Banerjee
    url : https://freecodecamp.org/news/author/sohamstars/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1741188275855/9858518f-38c0-4e3b-8be1-7c56b68c77a7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "NumPy > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-numpy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Software Design Basics: Key Phases and Best Practices"
  desc="Coding has become one of the most common tasks in modern society. With computers now central to almost every field, more people are designing algorithms and writing code to solve various problems. From healthcare to finance, robust software systems p..."
  url="https://freecodecamp.org/news/learn-software-design-basics"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1741188275855/9858518f-38c0-4e3b-8be1-7c56b68c77a7.png"/>

Coding has become one of the most common tasks in modern society. With computers now central to almost every field, more people are designing algorithms and writing code to solve various problems.

From healthcare to finance, robust software systems power our daily operations, making good software design essential to avoid inefficiencies and bottlenecks. This involves not just writing code but also designing systems that are easy to scale, maintain, and debug, while allowing others to contribute effectively.

Inefficient or ineffective software design can lead to significant issues, like scope creep, miscommunication within teams, project delays, resource misallocation, and complex systems that are difficult to maintain or understand. Without a strong design, teams often accumulate technical debt, which hinders long-term progress and increases maintenance costs.

This article will introduce you to key software design elements that will help you and your team address these challenges and guide you in building efficient, scalable systems. By understanding and applying these elements correctly, you can set up a project for both short-term and long-term success.

::: note Prerequisites

I’ll explain these concepts through examples, but a basic understanding of programming in any language is required for this article (knowledge of Python will be especially beneficial).

:::

::: info Scope

The article will introduce key software design elements and explain them using an example. While I won’t provide a full software design for the example problem, I will include enough details to effectively illustrate each design element.

:::

---

## Overview of Key Software Design Elements

To fully understand the benefits of the software design process, you’ll need to understand some key elements and their scope.

Once you have a good grasp of these, the next step is to define them for the specific problem at hand. Accurately defining these elements reduces risks and simplifies the implementation phase.

Doing this groundwork before implementation helps prevent late discoveries, minimizes the need for rewriting, and makes sure that the design can handle constraints and corner cases.

Now let’s briefly go over the key elements of the software design process:

1. **Creating a problem statement**: This step involves creating a clear and concise description of the problem that needs to be solved, along with its scope. The scope is essential because it focuses on the exact problem to be addressed and includes assumptions that must be considered during design.
2. **Identifying use cases**: This step outlines all possible user interactions with the software to achieve the desired outcome. It is a critical input to the architecture, as it helps create a design that addresses both general and edge-case use cases.
3. **Stating requirements**: This step defines the expectations of the software, such as its limitations, behaviors, and capabilities for different use cases.
4. **Designing the architecture**: This step provides a high-level structure of the software design, focusing on how to meet the requirements. The architecture typically includes components, how they interact, and how data flows through the system.
5. **Drafting a detailed design**: This step refines the high-level architecture into detailed, component-specific designs, ready for implementation.

In addition to these core elements, there are two important factors you need to consider throughout the design phase.

First, you’ll need to identify and state any assumptions you have. Assumptions can be present at any stage in the design process. Making correct assumptions increases the likelihood of success, improves focus, and reduces complexity in the design.

Second, you’ll need to create good documentation. Documentation is one of the most important elements in the software design process. It’s essential to document each stage as you go along. Documentation serves as the only formal record of the software design and is invaluable for presentations to management, for onboarding new team members, and for anyone returning to the project after a break. It saves valuable time and ensures continuity, as we often overestimate our own memory.

The figure below provides a visual summary of the key software design elements discussed in this section.

![Figure 1: Key software design elements](https://cdn.hashnode.com/res/hashnode/image/upload/v1738540359869/2ee49614-84b1-439a-ae7e-af637c0f34dd.png?auto=compress,format&format=webp)

Next, we’ll apply these key software design elements to a practical example, demonstrating how each element contributes to building a robust and scalable system.

---

## A Walkthrough of the Software Design Process

In any well-structured software project, clearly defining the problem is the first crucial step before diving into design and implementation. A well-defined problem ensures that the software meets user needs, remains maintainable, and scales effectively over time.

For this walkthrough, we will focus on designing a financial expense categorization system that processes and analyzes transaction data. This system is a part of a larger financial management solution and needs to be easy to debug, maintain, and scale.

### Problem Statement

The problem statement provides a high-level goal for the software that we’ll design.

For this example, here’s our statement: Design a software solution that categorizes monthly expenses and generates a report from a list of transactions.

#### Define the scope

Defining the scope clarifies the smaller tasks that must be accomplished to meet the high-level goal. It outlines the focus of the software design and includes some assumptions.

::: tabs

@tab:active Includes

1. Implementing a parser to process a list of transactions provided as input.
2. Filtering transactions for a given month.
3. Analyzing, categorizing, and generating a report for each expense category.

@tab Excludes

Performance and memory optimization (excluded due to the limited scope of this article). While performance and memory optimizations are not the primary focus here, it’s important to keep future scalability in mind. Small design choices made now, such as selecting data structures, can help avoid significant refactoring later when the system grows.

@tab Assumptions

1. The list of transactions will be provided as a CSV file in the following format:  
    Columns: "Date, Description, Amount, Type, Category Label".
2. Expense categories will be provided as input through a JSON file.
3. The software will run in a shell environment, and inputs will be taken as command-line arguments.

:::

Now that the scope is clear, let’s examine how users will interact with the system through various use cases.

### Use Cases

Use cases define how users will interact with the system to accomplish specific goals. Identifying accurate and valid use cases is critical to creating comprehensive requirements. Failing to capture enough use cases can lead to a design that is incomplete and lacks robustness. This may result in the need for redesigns, which increases time and resource consumption.

On the other hand, identifying too many use cases without considering their feasibility can lead to overly complex designs that are difficult to maintain and implement in the short term.

For our specific problem, the user will need to provide the following inputs while running the software in a shell:

1. A CSV file containing a list of transactions.
2. A month number.
3. A JSON file containing expense categories.

We need to consider all possible ways the user can interact with the script to achieve the desired outcome. For each of the three inputs, there are two possibilities: valid input or invalid input. This gives us 8 potential use cases (2 possibilities per input: valid and invalid). It's important to define what constitutes valid and invalid inputs for this problem:

- CSV File: Valid if it is in the format described in Assumption 1 (columns: "Date, Description, Amount, Type, Category Label").
- Month Number: Valid if the value is between 1 and 12.
- JSON File: Valid if it contains expense categories in the correct JSON format.

An input is invalid if it doesn't meet these definitions or if the input is absent.

It’s also crucial to consider the correlation between inputs when evaluating the feasibility of certain use cases, as they may interact with each other in unforeseen ways. Based on these use cases, we can now define the specific requirements that the system must meet.

### Requirements

Now, let’s define the expected behaviors, limitations, and capabilities for each use case. Requirements serve as the foundation for architecture, specifications, and implementation. Based on our problem statement, the software will need to accomplish the following tasks:

1. The script shall take three inputs: a CSV file of transactions, a month number, and a JSON file of expense categories.
2. The script shall verify all inputs.
3. The script shall throw an error and exit if the CSV file cannot be opened or if it does not match the format in Assumption 1.
4. The script shall throw an error and exit if the JSON file cannot be opened.
5. The script shall throw an error if the month number is not between 1 and 12.
6. The script shall parse each transaction and load it into a data structure.
7. The script shall filter transactions by the specified month.
8. The script shall load the expense categories from the JSON file into a data structure.
9. The script shall categorize transactions based on the category label provided in the CSV file.
10. The script shall throw an exception if a category label in the CSV file is not present in the expense categories.
11. The script shall use a categorizing function to assign transactions to categories from the JSON file.
12. A class shall encapsulate categorized transactions, providing APIs to modify or access them.
13. The script shall support statistics calculation and report generation for categorized transactions.

With the requirements in place, we can now design a high-level architecture to meet those needs.

### High Level System Architecture

In this stage, we will design the system at a high level, much like creating a master plan. Architecture involves organizing the software's functions into distinct components, illustrating how they interact, and mapping the flow of control and data through the system. While designing the architecture in this tutorial, we’ll incorporate good design principles.

For this example, the high-level requirements include:

1. Loading inputs and verifying them.
2. Applying time-based filtering.
3. Categorizing transactions based on category labels and descriptions.
4. Managing categorized transactions in a finance registry.
5. Generating reports from the categorized data.

One important component of software architecture is telemetry. Telemetry gathers data on the software's behavior, which is invaluable for debugging and performance assessment in real-world environments.

For smaller systems, simpler logging mechanisms may be sufficient to track basic errors and monitor performance. The decision to implement telemetry should depend on the complexity of the system and operational requirements.

Since telemetry provides such a helpful feedback loop for improving the design in future iterations, we’ll add it to the list of components here.

We’ll build our system architecture around a Test-Driven Development (TDD) approach. We’ll design each component with testing in mind to ensure it meets our requirements.

Just keep in mind that while TDD is a strong practice for ensuring code quality, it may not be the best fit for all projects. In scenarios where you need rapid prototyping or exploratory development, testing might be prioritized after initial iterations. Balancing between TDD and other methodologies depends on the project context and team preferences.

Our architecture will follow a modular structure, meaning the system will be divided into self-contained components. Each component will be responsible for specific functionality, making the system easier to test, maintain, and scale.

To achieve this, the architecture will emphasize loose coupling between components. Each component will interact with others through well-defined interfaces or APIs, ensuring minimal dependencies. We’ll abstract and encapsulate internal implementation details, exposing only the necessary information for interaction. Also, each component will handle its own errors and exceptions to ensure robustness and fault isolation.

But it is also important to consider a centralized error-handling strategy in some cases. Centralizing error handling can reduce redundancy, improve consistency, and make maintenance easier. The choice between local and centralized error handling should depend on the system's complexity and how components interact. This will contribute to the overall scalability and maintainability of the system.

Below is a summary of each component's functionality in this architecture:

- Load and verify input: This component will take the CSV file, JSON file, and month number as input, verify their validity, and load the data into structures.
- Time-based filter: This component will filter transactions based on the input month and store the filtered transactions in a data structure.
- Label-based categorization: This component will categorize transactions based on the category label in the CSV file.
- Description-based categorization: This component will categorize transactions using an algorithm based on the transaction description.
- Finance registry: This component will store all categorized transactions for further processing. It isolates the post-processing of categorized transactions from the categorization process and provides methods for updating or retrieving datasets.
- Report generation: This component will generate expense reports from the categorized transaction data.
- Telemetry: This component will monitor the performance of other components. It will track the flow of transactions, ensuring that all transactions are categorized either by label or description. Additional parameters can be added as needed to monitor specific functionalities.

The diagram below demonstrates the flow of data through these components:

![Figure 2: Flow of data through various components defined in the architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1738540585066/6236b867-8c57-4a04-b5ea-4f9dd7f1fef3.png?auto=compress,format&format=webp)

### Detailed Software Design and Component Breakdown

While we won't cover the full system design, this section will highlight key components and their specifications. For this example, I will assume the role of both the designer and implementer of the software.

Software design and specifications depend on several factors, including the designer's knowledge, skill set, available time, and resources. We’ll define some of the design details for the system, starting with the choice of the implementation language.

Choosing the right language is based on several important factors:

1. The language must meet the software requirements.
2. It should be stable, and have strong support from an active developer community.
3. Additional considerations include performance (speed and memory), scalability (ability to grow with future requirements), and platform support (ability to run on all major operating systems).

If you’re the one implementing this design, you’ll need to be familiar with and confident using that programming language. For this project, I chose Python because it meets all the project requirements, has a robust developer community for support, it’s stable, and I’m confident in using it to complete the implementation successfully.

#### Data Structures

Now, let’s look at the fundamental data structures that we’ll use in the design. We need to load the contents of the CSV file into a data structure for further analysis and processing. In Python, the Pandas DataFrame from the Pandas library is ideal for analyzing and processing tables, so we will use it to store the transactions.

For generating report, we will encapsulate categorized transactions along with relevant statistics, such as the total number of transactions, mean amount, and maximum amount, within a dedicated dataset class. This approach ensures a clear separation of concerns, where the dataset class manages data processing, while the reporting component focuses on presentation.

By structuring the system this way, we enhance reusability, maintainability, and scalability, making it easier to extend and modify in the future.

This dataset class will include:

- Member variables: category name, category description, a Pandas DataFrame for transactions, total number of transactions, mean amount, and max amount of transactions.
- Member functions: set/get DataFrame, save dataset to CSV (useful for debugging).

Here’s an example of a Dataset class in Python for structured data management and processing:

```py :collapsed-lines
import pandas as pd  # Import Pandas for data handling

class Dataset:
    """
    A class representing a structured dataset with a name, predefined keys, 
    and a Pandas DataFrame.
    """

    def __init__(self, name, keys):
        """
        Initializes the Dataset object.

        Parameters:
        name (str): The name of the dataset.
        keys (list): A list of expected column names for the dataset.

        Attributes:
        self.name (str): Stores the dataset name as a string.
        self.keys (list): Stores the expected column names for data organization.
        self.mean_amt (float): Tracks the mean (average) transaction amount.
        self.max_amt (float): Tracks the maximum transaction amount.
        self.count (int): Stores the total number of transactions in the dataset.
        self.dataframe (pd.DataFrame): A Pandas DataFrame initialized with the specified column names.
        """
        self.name = str(name)  # Convert and store dataset name as a string
        self.keys = keys  # Store expected column names for consistency
        self.mean_amt = 0  # Initialize mean transaction amount to zero
        self.max_amt = 0  # Initialize max transaction amount to zero
        self.count = 0  # Initialize transaction count to zero
        self.dataframe = pd.DataFrame(columns=keys)  # Initialize empty DataFrame with predefined columns

    def getName(self):
        """
        Returns the name of the dataset.

        Returns:
        str: The name of the dataset.
        """
        return self.name  # Fixed: Removed incorrect parentheses

    def getValue(self, key):
        """
        Retrieves a specific column from the DataFrame.

        Parameters:
        key (str): The column name to retrieve.

        Returns:
        pandas.Series or None: The column data if the key exists, otherwise None.
        """
        if key in self.dataframe.columns:
            return self.dataframe[key]
        else:
            print(f"Warning: Key '{key}' not found in DataFrame.")
            return None  # Prevents KeyError

    def getKeys(self):
        """
        Returns the list of expected keys (column names) of the dataset.

        Returns:
        list: The keys defining the dataset.
        """
        return self.keys

    def setDataFrame(self, dataframe):
        """
        Sets the dataset's DataFrame while ensuring it contains only expected keys.

        Parameters:
        dataframe (pandas.DataFrame): The DataFrame to assign to the dataset.
        """
        if not isinstance(dataframe, pd.DataFrame):
            raise TypeError("Provided data is not a valid pandas DataFrame.")

        # Ensure only the expected columns are included
        self.dataframe = dataframe[self.keys].copy() if set(self.keys).issubset(dataframe.columns) else dataframe.copy()

    def getDataFrame(self):
        """
        Returns the DataFrame associated with the dataset.

        Returns:
        pandas.DataFrame: The dataset's DataFrame.
        """
        return self.dataframe

    def save_to_csv(self, file_name):
        """
        Saves the dataset's DataFrame to a CSV file.

        Parameters:
        file_name (str): The name of the CSV file to save.
        """
        self.dataframe.to_csv(file_name, mode='w', index=False)  # Save the DataFrame to CSV
```

In the previous section, we outlined the high-level system architecture, detailing the core components and their interactions. Now, let’s dive into the detailed design of some of the individual components, specifying how we’ll implement each one and how it’ll function within the system. We’ll also break down the components to explain how they work together to process the input and generate the report.

Below, you can see the flow diagram for the software, illustrating the interaction between the core components and the flow of data through the system.

![Figure 3 Software Flow Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1739209441033/60142953-c1f4-4146-b64e-c042039e1ef6.png?auto=compress,format&format=webp)

#### Category Label-Based Filtering Component

The Category Label-Based Filtering Component classifies transactions by matching their "Category Label" with predefined expense categories from a JSON file. Transactions with valid category labels are stored in the finance registry, while unmatched ones remain for further processing.

- Input: DataFrame of time-filtered transactions, expense categories from JSON.
- Libraries used: Pandas DataFrame.
- Software design: Filters transactions based on the "Category Label" column and assigns them to corresponding categories. Transactions that cannot be categorized remain for further processing.
- Output: DataFrame of remaining transactions with empty values in the "Category Label" field.
- Component tests: Validate handling of valid, invalid, and missing category labels.

#### Finance Registry Component

The Finance Registry Component manages categorized transactions by storing them as datasets for each expense category. It maintains a structured collection of DataFrames, each containing transactions and summary statistics such as total count, max amount, and mean amount.

- Input: Expense categories from JSON.
- Libraries used: Pandas DataFrame.
- Software design: Implements a class that organizes datasets for all expense categories, providing methods to set and retrieve DataFrames.
- Component tests: Validate dataset creation, ensuring correct storage and retrieval of categorized transactions.

Here’s a simple and efficient Finance Registry implementation in Python for managing categorized financial datasets:

```py :collapsed-lines
from Dataset import Dataset
import pandas as pd  # Ensure Pandas is imported if used elsewhere

# Define column structure for datasets
KEYS = ("Date", "Description", "Amount", "Transaction Type", "Category", "Account Name", "Labels", "Notes")

# Define dataset names for different financial categories
EXAMPLE_DATASET_NAMES = ("Investment", "Expense", "Savings")

class FinanceRegistry:
    """
    A class to manage categorized financial datasets, including investment, expense, and savings datasets.
    This registry allows structured access to transaction data and maintains aggregated financial metrics.
    """

    def __init__(self):
        """
        Initializes the FinanceRegistry object.

        Attributes:
        self.example_dataset (dict): A dictionary storing Dataset objects for financial datasets.
        """
        self.example_dataset = {name: Dataset(name, KEYS) for name in EXAMPLE_DATASET_NAMES}  # Create datasets for categories

    def setExampleDatasetToRegistry(self, name, dataframe):
        """
        Merges a new dataframe into the existing dataset for a given financial category.

        Parameters:
        name (str): The category name (e.g., "Investment", "Expense", or "Savings").
        dataframe (pd.DataFrame): The new data to be added.

        If the dataset already contains data, it concatenates the new dataframe to the existing one.

        Raises:
        ValueError: If the provided name is not a valid dataset category.
        """
        if name not in self.example_dataset:
            raise ValueError(f"Invalid dataset name: '{name}'. Expected one of {EXAMPLE_DATASET_NAMES}")

        df = self.example_dataset[name].getDataFrame()  # Get existing dataset

        if not dataframe.empty:  # Ensure the new dataframe is not empty
            dataframe = pd.concat([df, dataframe], axis=0, ignore_index=True)  # Append new data

        self.example_dataset[name].setDataFrame(dataframe)  # Update dataset in registry

    def getExampleDatasetFromRegistry(self, name):
        """
        Retrieves the dataset for a given financial category.

        Parameters:
        name (str): The category name (e.g., "Investment", "Expense", or "Savings").

        Returns:
        Dataset: The dataset corresponding to the given name.

        Raises:
        ValueError: If the provided name is not a valid dataset category.
        """
        if name not in self.example_dataset:
            raise ValueError(f"Invalid dataset name: '{name}'. Expected one of {EXAMPLE_DATASET_NAMES}")

        return self.example_dataset[name]
```

The diagram below illustrates how the Finance Registry organizes these datasets for further processing in the Report Generation component.

![Figure 4 Finance Registry datasets for expense category](https://cdn.hashnode.com/res/hashnode/image/upload/v1739209411075/7a772e4f-9687-4c96-8995-10a70e27a36d.png?auto=compress,format&format=webp)

#### Report Generation Component

The Report Generation Component processes categorized transaction datasets from the finance registry and generates summary statistics. It calculates key financial metrics such as maximum amount, mean amount, and total transaction count. It also provides functionality to display categorized transactions in a structured format within the shell.

- Input: Datasets of categorized transactions from the finance registry.
- Libraries used: Numpy for calculations, Tabulate for formatted shell output (if needed).
- Software design: Implements a class with methods to compute financial statistics and display transaction summaries per expense category.
- Component tests: Validate correct calculation of mean, max, and total transactions, and ensure accurate display of categorized datasets in the shell.

Here’s a function to compute transaction statistics, including mean, max, and count, from a dataset in the report generation component:

```py :collapsed-lines
from Dataset import Dataset
import numpy as np

def calculateStats(dataset):
    """
    Computes statistical metrics for a given dataset.

    Parameters:
    dataset: The dataset containing transaction data.

    Updates:
    - dataset.mean: Mean transaction amount.
    - dataset.max: Maximum transaction amount.
    - dataset.count: Number of transactions.
    """

    # Return early if the dataset has no transactions
    if dataset.dataframe.empty:
        return

    # Extract transaction amounts as a list
    tx_amount_list = dataset.dataframe['Amount'].astype(float).round(2).tolist()

    # Adjust transaction amounts based on "Transaction Type"
    for i, tx_type in enumerate(dataset.dataframe['Transaction Type']):
        if tx_type == 'debit':
            tx_amount_list[i] *= -1  # Convert debit transactions to negative values

    # Compute statistical metrics
    dataset.mean = round(np.mean(tx_amount_list), 2)
    dataset.max = max(tx_amount_list)
    dataset.count = len(tx_amount_list)
```

This concludes the design section, where we explored key software design elements with a practical example. The next step, implementation, is beyond the scope of this article. But it's crucial to recognize that new challenges often emerge during development, requiring updates to requirements, architecture, and specifications.

The purpose of this article is not to provide a full implementation, but to teach you some basic software design principles through an example. The focus is on understanding how to structure software, define clear requirements, and create scalable architectures, all before writing code.

By following a structured design process, you can shift complex problem-solving from implementation to the architecture phase, where you can explore solutions more effectively using flowcharts, block diagrams, and documentation. This makes the development process more organized, efficient, and maintainable, a crucial skill for real-world software engineering.

If you're learning to code, remember that good design is just as important as writing code itself!

---

## Conclusion: The Value of Thoughtful Software Design

With well-defined problem statements, scope, requirements, specifications, and design, even complex problems can be solved and maintained in a sustainable way.

The steps we went through in this article can help you break down any problem, regardless of its complexity, into smaller, actionable tasks that you and your team can efficiently tackle.

Without proper planning, projects are often plagued by scope creep, wasted time and resources, miscommunication between teams, overly complicated designs, technical debt, and frequent redesigns.  
Good design is often simple design, but achieving simplicity is difficult without thorough planning.

Approaching each problem with the mindset of defining a Problem Statement, Scope, Use Cases, Requirements, Architecture, and Specifications helps cultivate a strong software design mindset. This mindset is crucial for developing software that is scalable, maintainable, and high quality.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Software Design Basics: Key Phases and Best Practices",
  "desc": "Coding has become one of the most common tasks in modern society. With computers now central to almost every field, more people are designing algorithms and writing code to solve various problems. From healthcare to finance, robust software systems p...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-software-design-basics.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
