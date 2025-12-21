---
lang: en-US
title: "Convert a Script Into a Web Application"
description: "Article(s) > (4/5) Python Web Applications: Deploy Your Script as a Flask App"
category:
  - Python
  - Flask
  - DevOps
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
  - devops
  - google
  - google-cloud
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/5) Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Convert a Script Into a Web Application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/convert-a-script-into-a-web-application.html
date: 2021-02-01
isOriginal: false
author:
  - name: Martin Breuss
    url : https://realpython.com/team/mbreuss/
cover: https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Web Applications: Deploy Your Script as a Flask App",
  "desc": "In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world.",
  "link": "/realpython.com/python-web-applications/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Web Applications: Deploy Your Script as a Flask App"
  desc="In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/python-web-applications#convert-a-script-into-a-web-application"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

Since this tutorial is about creating and deploying Python web applications from code you already have, the Python code for the temperature converter script is provided for you here:

```py
def fahrenheit_from(celsius):
 """Convert Celsius to Fahrenheit degrees."""
    try:
        fahrenheit = float(celsius) * 9 / 5 + 32
        fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
        return str(fahrenheit)
    except ValueError:
        return "invalid input"

if __name__ == "__main__":
    celsius = input("Celsius: ")
    print("Fahrenheit:", fahrenheit_from(celsius))
```

This is a short script that allows a user to convert a Celsius temperature to the equivalent Fahrenheit temperature.

::: details Exercise: Practice and Explore

Save the code as a Python script and give it a spin. Make sure that it works as expected and that you understand what it does. Feel free to improve the code.

:::

With this working script in hand, you’ll now need to change the code to integrate it into your Flask app. There are two main points to consider for doing that:

- **Execution:** How will the web app know when to run the code?
- **User input:** How will the web app collect user input?

You already learned how to tell Flask to execute a specific piece of code by adding the code to a function that you assign a route to. Start by tackling this task first.

---

## Add Code as a Function

Flask separates different tasks into different functions that are each assigned a route through the `@app.route` decorator. When the user visits the specified route via its URL, the code inside the corresponding function gets executed.

Start by adding `fahrenheit_from()` to your <VPIcon icon="fa-brands fa-python"/>`main.py` file and wrapping it with the `@app.route` decorator:

```py{9}
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Congratulations, it's a web app!"

@app.route("/") 
def fahrenheit_from(celsius):
 """Convert Celsius to Fahrenheit degrees."""
    try:
        fahrenheit = float(celsius) * 9 / 5 + 32
        fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
        return str(fahrenheit)
    except ValueError:
        return "invalid input"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

So far, you’ve only copied the code of your Python script into a function in your Flask app and added the `@app.route` decorator.

However, there’s already a problem with this setup. What happens when you run the code in your development server? Give it a try.

Currently, both of your functions are triggered by the same route (`"/"`). When a user visits that route, Flask picks the first function that matches it and executes that code. In your case, this means that `fahrenheit_from()` never gets executed because `index()` matches the same route and gets called first.

Your second function will need its own unique route to be accessible. Additionally, you still need to allow your users to provide input to your function.

---

## Pass Values to Your Code

You can solve both of these tasks by telling Flask to treat any remaining part of the URL following the base URL as a value and pass it on to your function. This requires only a small change to the parameter of the `@app.route` decorator before `fahrenheit_from()`:

```py{1}
@app.route("/<celsius>")
def fahrenheit_from(celsius):
    # -- snip --
```

The angle bracket syntax (`<>`) tells Flask to capture any text following the base URL (`"/"`) and pass it on to the function the decorator wraps as the variable `celsius`. Note that `fahrenheit_from()` requires `celsius` as an input.

::: note

Make sure that the URL path component you’re capturing has the same name as the parameter you’re passing to your function. Otherwise, Flask will be confused and will let you know about it by presenting you with an error message.

:::

Head back to your web browser and try out the new functionality using Flask’s development server. You’re now able to access both of your functions through your web app using different URL endpoints:

- **Index (`/`):** If you go to the base URL, then you’ll see the short encouraging message from before.
- **Celsius (`/42`):** If you add a number after the forward slash, then you’ll see the converted temperature appear in your browser.

Play around with it some more and try entering different inputs. Even the error handling from your script is still functional and displays a message when a user enters a nonnumeric input. Your web app handles the same functionality as your Python script did locally, only now you can deploy it to the Internet.

---

## Refactor Your Code

Flask is a mature web framework that allows you to hand over a lot of tasks to its internals. For example, you can let Flask take care of **type checking** the input to your function and returning an error message if it doesn’t fit. All this can be done with a concise syntax inside of the parameter to `@app.route`. Add the following to your path capturer:

```py
@app.route("/<int:celsius>")
```

Adding `int:` before the variable name tells Flask to check whether the input it receives from the URL can be converted to an integer. If it can, then the content is passed on to `fahrenheit_from()`. If it can’t, then Flask displays a `Not Found` error page.

::: note

The `Not Found` error means that Flask attempted to match the path component it snipped off from the URL with any of the functions it knows about.

However, the only patterns it currently knows about are the empty base path (`/`) and the base path followed by a number, such as `/42`. Since a text like `/hello` doesn’t match any of these patterns, it tells you that the requested URL was not found on the server.

:::

After applying Flask’s type check, you can now safely remove the `try` … `except` block in `fahrenheit_from()`. Only integers will ever be passed on to the function by Flask:

```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Congratulations, it's a web app!"

@app.route("/<int:celsius>")
def fahrenheit_from(celsius):
 """Convert Celsius to Fahrenheit degrees."""
    fahrenheit = float(celsius) * 9 / 5 + 32
    fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
    return str(fahrenheit)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

With this, you’ve completed converting your temperature conversion script into a web app. Confirm that everything works as expected locally, then deploy your app again to Google App Engine.

::: details Exercise: Practice and Explore

Refactor `index()`. It should return text that explains how to use the temperature converter web app. Keep in mind that you can use HTML tags in the return string. The HTML will render properly on your landing page.

:::

After successfully deploying your temperature conversion web app to the Internet, you now have a link that you can share with other people and allow them to convert Celsius temperatures to Fahrenheit temperatures.

However, the interface still looks quite basic and the web app functions more like an [<VPIcon icon="fas fa-globe"/>API](https://realpython.com/tutorials/api/) than a front-end web app. Many users might not know how to interact with your Python web application in its current state. This shows you the limitations of using pure Python for web development.

If you want to create more intuitive interfaces, then you’ll need to start using at least a little bit of HTML.

In the next section, you’ll keep iterating over your code and use HTML to create an **input box** that allows users to enter a number directly on the page rather than through the URL.
