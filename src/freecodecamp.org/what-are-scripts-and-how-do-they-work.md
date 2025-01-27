---
lang: en-US
title: "What Are Scripts and How Do They Work? Improve Your Productivity with Scripting"
description: "Article(s) > What Are Scripts and How Do They Work? Improve Your Productivity with Scripting"
icon: iconfont icon-shell
category:
  - Shell
  - Node.js
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - shell
  - node
  - nodejs
  - node-js
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Are Scripts and How Do They Work? Improve Your Productivity with Scripting"
    - property: og:description
      content: "What Are Scripts and How Do They Work? Improve Your Productivity with Scripting"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-scripts-and-how-do-they-work.html
prev: /programming/sh/articles/README.md
date: 2025-01-27
isOriginal: false
author:
  - name: Arunachalam B
    url : https://freecodecamp.org/news/author/arunachalamb/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737988076418/347e6d8a-1dd8-45d1-854b-fbc576eeed5f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="What Are Scripts and How Do They Work? Improve Your Productivity with Scripting"
  desc="Developers who have a lot of experience building rigid, quality software tend to automate most of their work by writing scripts. These scripts range from simple alias bash commands to repetitive cron triggers that run on a server. In this tutorial, y..."
  url="https://freecodecamp.org/news/what-are-scripts-and-how-do-they-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737988076418/347e6d8a-1dd8-45d1-854b-fbc576eeed5f.png"/>

Developers who have a lot of experience building rigid, quality software tend to automate most of their work by writing scripts. These scripts range from simple alias bash commands to repetitive cron triggers that run on a server.

In this tutorial, you’ll learn about what scripting is, its many use cases, and some advantages and disadvantages of using scripts. We’ll also go through a few example scripts so you can see them in action.

---

## What is a Script?

A script is a set of instructions written in any scripting language (like Bash, Python, JavaScript, and others) that helps you automate tasks or control processes. Unlike compiled programs, scripts are typically [**interpreted**](/freecodecamp.org/compiled-versus-interpreted-languages.md), meaning they are executed directly by a runtime environment without prior compilation.

Scripts are powerful tools for automating repetitive tasks, managing workflows, and solving small (and sometimes large) problems efficiently. Whether you’re a beginner or an experienced developer, understanding how to write scripts can enhance your productivity and broaden your technical capabilities.

---

## Why Write Scripts?

I’ve already touched on what you can do with scripts. So let’s look at some of their advantages (and challenges, too) so you understand why they’re so powerful – and when to use them.

### Advantages of scripts

1. Automation: Scripts can help you simplify repetitive tasks such as data processing or file management.
2. Efficiency: they can also save you time by automating tasks that you would otherwise have to do manually.
3. Error reduction: Scripts can help reduce human errors through consistent execution of instructions.
4. Flexibility: Scripts can adapt to a wide variety of tasks with minimal modification.
5. Integration: They can also seamlessly integrate with other systems, tools, or workflows.

### Challenges with scripts

1. Performance: Scripts can be slower than compiled programs due to interpretation overhead.
2. Scalability: They’re not always suitable for large-scale or highly complex tasks.
3. Debugging: Debugging scripts can sometimes be challenging due to their dynamic nature.
4. Security risks: Poorly written scripts can expose vulnerabilities, especially if they execute system-level commands.

### When to Use vs Not Use Scripts

::: tabs

@tab:active ideal

Scripts are ideal for:

1. Tasks are simple, well-defined, or one-off
2. Prototyping or quickly automating a process
3. The scope is small enough to avoid complexity


@tab NOT ideal

Scripts are **not** ideal for:

1. Performance-critical tasks requiring high efficiency. Instead of a script, try using a dedicated ETL (Extract, Transform, Load) tool or a message broker, or similar alternative tools that fit your use-case.
2. Applications with extensive user interfaces. Instead, you can build a small application or a modular system with proper logging, testing, and documentation.
3. Scenarios needing long-term maintenance, where compiled programs might be more stable. Instead, use task schedulers or workflow managers like CRON, Airflow, AWS Lambda/GCP Functions.

:::

---

## How to Write Effective Scripts

This is the process I use for writing helpful scripts. After we go through this, we’ll see some examples of scripts in different languages so you can get some hands-on practice.

1. Define the problem: Before writing a script, identify the problem it will solve. Be clear about the tasks to automate and the expected outcomes.
2. Choose the right language:
    - **Bash:** Ideal for system-level tasks like file operations or server management.
    - **Python:** Great for data processing, web scraping, and more complex automation.
    - **JavaScript:** Suited for web development and browser-based automation.
3. Write the script: Use a text editor or an Integrated Development Environment (IDE), and make sure you follow best practices like using comments, meaningful variable names, and modular code. We’ll cover these below.
4. Test the script: Test the script in a controlled environment to ensure it performs as expected without causing errors.
5. Execute and deploy: Run the script in its intended environment. If necessary, schedule its execution using tools like Cron (for Bash) or task schedulers.

---

## Example Scripts

Now that you know the basics, let's have some practice. Assume you have around 100 files with the names "book-part-1.pdf", "book-part-2.pdf", …, "book-part-100.pdf". You want to replace all the hyphens (`-`) in the file names with underscores (`_`), because the website where you're trying to upload these documents doesn’t allow you to upload files with names containing hyphens.

Here are scripts written in three different languages that all perform the same operation. The process looks like this:

1. find all the files in a directory,
2. check if they contain hyphens (`-`) in their name, and
3. replace any hyphens with underscores (`_`).

Here are the file names to start (containing hyphens):

![File names with hyphen](https://cdn.hashnode.com/res/hashnode/image/upload/v1737563509852/e9b1e671-465d-43ed-a831-3034852de624.png)

### Bash Script

We’ll start with a bash script. Here it is:

```sh
#!/bin/bash
# Replace "-" with "_" in file names
DIRECTORY="/path/to/your/folder"
for FILE in "$DIRECTORY"/*; do
    if [[ "$FILE" == *-* ]]; then
        NEW_NAME=$(echo "$FILE" | sed 's/-/_/g')
        mv "$FILE" "$NEW_NAME"
        echo "Renamed: $FILE -> $NEW_NAME"
    fi
done
```

We define the directory (folder) at the top where our files reside. For each file in the directory, we check if the name contains a `-`. In such case, we create a new file name and store it in the variable `NEW_NAME` by copying the old file name using the `echo` command and replace the `-` with `_` using the `sed` command. Finally we use the move command `mv` with the old and new file names as arguments.

### Python Script

Next, let’s see what it would look like in Python:

```py
import os
# Replace "-" with "_" in file names
directory = "/path/to/your/folder"
for filename in os.listdir(directory):
    if "-" in filename:
        old_path = os.path.join(directory, filename)
        new_filename = filename.replace("-", "_")
        new_path = os.path.join(directory, new_filename)
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_filename}")
```

The steps are pretty similar in Python. First, we define the directory and then iterate through each file in the directory. To find all files in the directory, we have to use the `listdir` method from the `os` package.

Then we check if the file name contains a `-` in the next line. In such a case, we find the current path (`old_path`) of the file by merging the directory and its file name. We can create the new file name by replacing the `-` with `_` using the `replace` method.

We then generate the new file path (`new_path`) in the similar way we generate the `old_path`. Finally, we call the `rename` method in `os` package with old and new file paths as arguments.

### JavaScript Script

And now let’s see how it would look in JavaScript:

```js :collapsed-lines
const fs = require('fs');
const path = require('path');
const directory = '/path/to/your/folder';

fs.readdir(directory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    files.forEach(file => {
        if (file.includes('-')) {
            const oldPath = path.join(directory, file);
            const newFilename = file.replace(/-/g, '_');
            const newPath = path.join(directory, newFilename);
            fs.rename(oldPath, newPath, err => {
                if (err) {
                    console.error(`Error renaming ${file}:`, err);
                } else {
                    console.log(`Renamed: ${file} -> ${newFilename}`);
                }
            });
        }
    });
});
```

The JavaScript implementation is somewhat similar to the Python implementation – but you’ll need to write more code. Generally, devs don’t prefer JavaScript for these kind of scripts. Most of them rely on Bash/Python. JavaScript is better-suited for browser-based automation scripts.

Still, let’s see what we have here. In this JavaScript code, you have to use two different packages, `fs` and `path`. We define the directory at the top, read the files in the directory using the `readdir` method from the `fs` package, and pass the directory as the argument. Along with directory, we also pass a callback function that will be executed once the files are read.

Inside the callback function, we loop through each file and check if the file name includes a hyphen (`-`). If it does, we find the old path using the `path` package with the directory and file names as arguments. We then construct the new file name by replacing all hyphens with underscores using the `replace` method.

Similar to the old path, we find the new path using the new file name as an argument. Then we use the `rename` method from the `fs` package to rename the file by passing both the old and new file names. If there are errors during renaming or reading the files in a directory, we log the error message. Otherwise, we log the success message.

#### How to run these scripts

Ok, here’s how you can actually use these scripts:

1. Replace <FontIcon icon="fas fa-folder-open"/>`/path/to/your/folder` with the actual directory containing the files.
2. Run the script in the corresponding environment:
    - **Bash:** Save as a `.sh` file, then execute with `bash script.sh`
    - **Python:** Save as a `.py` file, then execute with `python script.py`
    - **JavaScript:** Save as a `.js` file, then execute with `node script.js`

The screenshot below shows running the bash script to change the names of the files.

![Change the name of files using bash script](https://cdn.hashnode.com/res/hashnode/image/upload/v1737563774216/f31158ab-da77-4b18-8625-ee0b2522e3e6.png)

![After running the script, the hyphens in file name are replaced with underscores](https://cdn.hashnode.com/res/hashnode/image/upload/v1737563640766/4aa508af-1f0e-4fad-8b2c-ac2369cbe337.png)

---

## Recurring Scripts

Recurring scripts are designed to execute at regular intervals, like checking a system’s status weekly, cleaning up logs, or fetching data updates. These scripts typically use some form of task scheduler.

### Common Approaches

1. CRON jobs: Most operating systems support CRON, which can trigger scripts based on a defined schedule.
2. Task queues: Tools like Celery (Python), Bull (Node.js), or Sidekiq (Ruby) can handle scheduled jobs with more flexibility.
3. Cloud schedulers: Services like AWS Lambda with EventBridge, Google Cloud Scheduler, or Azure Logic Apps allow you to set up recurring scripts in a serverless architecture.

One good example use case for recurring scripts would be sending a daily/weekly report of your system’s usage/performance. You could write a script that finds the number of users who have joined and subscribed to your product and send that report as an email every day/week.

---

## Best Practices for Writing Scripts

Here are some things to keep in mind when you’re writing scripts:

### 1. Use comments

Explain complex parts of the script with comments.

In the below example, without the comment, someone might have to spend extra time figuring out why the tax rate is a decimal and not a percentage.

```py
# Calculate the total price with tax
def calculate_price_with_tax(price, tax_rate):
    # Tax rate is expressed as a decimal (e.g., 0.07 for 7%)
    return price + (price * tax_rate)
```

### 2. Error handling

Account for possible errors and handle them gracefully.

In the below example, if the file is missing, the script won’t crash – instead, it will show a helpful error message.

```py
try:
    with open('data.csv', 'r') as file:
        data = file.readlines()
except FileNotFoundError:
    print("Error: 'data.csv' file not found. Make sure the file exists before running the script.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

### 3. Modular design

Break down the script into reusable functions or modules.

In the below example, by separating functionality into smaller, reusable functions, you can debug or reuse parts of the script independently.

```py :collapsed-lines
def fetch_data_from_api(api_url):
    # Fetch data from the given API
    pass

def process_data(data):
    # Process the data into the desired format
    pass

def save_to_file(data, filename):
    # Save processed data to a file
    pass

# Main script
if __name__ == "__main__":
    data = fetch_data_from_api("https://example.com/api")
    processed_data = process_data(data)
    save_to_file(processed_data, "output.json")
```

### 4. Input validation

Validate user inputs to prevent unexpected errors or security risks.

Without validation, someone could input invalid or malicious data (for example, SQL injection strings in certain scenarios).

```py
import re

# Validate that the input is a valid email address
def validate_email(email):
    pattern = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(pattern, email):
        raise ValueError("Invalid email address format")
    return email

# Example usage
try:
    user_email = validate_email(input("Enter your email: "))
    print(f"Valid email: {user_email}")
except ValueError as e:
    print(e)
```

### 5. Version control

Use Git or other version control tools to track changes.

If a change breaks the script, you can easily revert to a previous commit using `git checkout`. Plus, you can collaborate seamlessly with team members.

```sh
git init
git add script.py
git commit -m "Initial commit"
```

---

## Conclusion

Writing scripts is a skill that can significantly boost your productivity and problem-solving abilities. By understanding the basics of scripting languages like Bash, Python, and JavaScript, you can automate tasks, streamline workflows, and save valuable time. Start small, build incrementally, and practice writing scripts for different use cases to master this invaluable skill.

I have an exercise for you. To run and verify this example script, you may think you have to manually create 100 files. That consumes a lot of time.

I wrote a script to generate those 100 files. I would also recommend that you try writing a script to generate 100 files with hyphens in their file names. Then try to run the example script to convert the hyphens to underscores.

This may sound difficult at the beginning, but believe me you just need to write 5 lines of bash code to generate 100 files. Not just 100 – you can even generate a million/billion/trillion files with just 5 lines of code.

If you wish to learn more about Scripts, subscribe to my [<FontIcon icon="iconfont icon-globe"/>email newsletter](https://5minslearn.gogosoon.com/) and follow me on social media.

Happy scripting!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Are Scripts and How Do They Work? Improve Your Productivity with Scripting",
  "desc": "Developers who have a lot of experience building rigid, quality software tend to automate most of their work by writing scripts. These scripts range from simple alias bash commands to repetitive cron triggers that run on a server. In this tutorial, y...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-scripts-and-how-do-they-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
