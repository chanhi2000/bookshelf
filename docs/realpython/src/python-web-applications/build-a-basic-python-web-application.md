---
lang: en-US
title: "Build a Basic Python Web Application"
description: "Article(s) > (2/5) Python Web Applications: Deploy Your Script as a Flask App"
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
      content: "Article(s) > (2/5) Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Build a Basic Python Web Application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/build-a-basic-python-web-application.html
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
  url="https://realpython.com/python-web-applications#build-a-basic-python-web-application"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

Google App Engine requires you to use a web framework for creating your web application in a Python 3 environment. Since you’re trying to use a minimal setup to get your local Python code up on the Internet, a microframework such as [<VPIcon icon="iconfont icon-flask"/>Flask](https://flask.palletsprojects.com/en/1.1.x/) is a good choice. A minimal implementation of Flask is so small that you might not even notice that you’re using a web framework.

::: note

If you’ve previously worked with Google App Engine on a Python 2.7 environment, then you’ll notice that the process [<VPIcon icon="iconfont icon-gcp"/>has changed significantly](https://cloud.google.com/appengine/docs/standard/python/migrate-to-python3).

Two notable changes are that [<VPIcon icon="iconfont icon-gcp"/>webapp2](https://cloud.google.com/appengine/docs/standard/python/tools/webapp2) has been retired and that you’re no longer able to specify URLs for dynamic content in the <VPIcon icon="iconfont icon-yaml"/>`app.yaml` file. The reason for both of these changes is that Google App Engine now requires you to use a Python web framework.

:::

The application you’re going to create will rely on several different files, so the first thing you need to do is to create a project folder to hold all these files.

---

## Set Up Your Project

Create a project folder and give it a name that’s descriptive of your project. For this practice project, call the folder `hello-app`. You’ll need three files inside this folder:

1. <VPIcon icon="fa-brands fa-python"/>`main.py` contains your Python code wrapped in a minimal implementation of the Flask web framework.
2. <VPIcon icon="fas fa-file-lines"/>`requirements.txt` lists all the dependencies your code needs to work properly.
3. <VPIcon icon="iconfont icon-yaml"/>`app.yaml` helps Google App Engine decide which settings to use on its server.

While three files might sound like a lot, you’ll see that this project uses fewer than ten lines of code across all three files. This represents the minimal setup you need to provide to Google App Engine for any Python project you may launch. The rest will be your own Python code.

Next, you’ll take a look at the content of each of the files starting with the most complex one, <VPIcon icon="fa-brands fa-python"/>`main.py`.

---

## Create <VPIcon icon="fa-brands fa-python"/>`main.py`

<VPIcon icon="fa-brands fa-python"/>`main.py` is the file that Flask uses to deliver your content. At the top of the file, you [**import**](/realpython.com/python-import.md) the `Flask` class on line 1, then you create an instance of a Flask app on line 3:

```py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Congratulations, it's a web app!"
```

After you create the Flask `app`, you write a [**Python decorator**](/realpython.com/primer-on-python-decorators.md) on line 5 called `@app.route` that Flask uses to connect [<VPIcon icon="fa-brands fa-wikipedia-w"/>URL](https://en.wikipedia.org/wiki/URL) endpoints with code contained in functions. The argument to `@app.route` defines the URL’s path component, which is the root path (`"/"`) in this case.

The code on lines 6 and 7 makes up `index()`, which is wrapped by the decorator. This function defines what should be executed if the defined URL endpoint is requested by a user. Its [**return value**](/realpython.com/python-return-statement.md) determines what a user will see when they load the page.

::: note

The naming of `index()` is only a convention. It relates to how the main page of a website is often called `index.html`. You can choose a different function name if you want.

:::

In other words, if a user types the base URL of your web app into their browser, then Flask runs `index()` and the user sees the returned text. In this case, that text is just one sentence: `Congratulations, it's a web app!`

You can render more complex content, and you can also create more than one function so that users can visit different URL endpoints in your app to receive different responses. However, for this initial implementation, it’s fine to stick with this short and encouraging success message.

---

## Create <VPIcon icon="fas fa-file-lines"/>`requirements.txt`

The next file to look at is <VPIcon icon="fas fa-file-lines"/>`requirements.txt`. Since Flask is the only dependency of this project, that’s all you need to specify:

```plaintext title="requirements.txt"
Flask==2.1.2
```

If your app has other dependencies, then you’ll need to add them to your <VPIcon icon="fas fa-file-lines"/>`requirements.txt` file as well.

Google App Engine will use <VPIcon icon="fas fa-file-lines"/>`requirements.txt` to install the necessary Python dependencies for your project when setting it up on the server. This is similar to what you would do after creating and activating a new [**virtual environment**](/realpython.com/python-virtual-environments-a-primer.md) locally.

---

## Create <VPIcon icon="iconfont icon-yaml"/>`app.yaml`

The third file, <VPIcon icon="iconfont icon-yaml"/>`app.yaml`, helps Google App Engine set up the right server environment for your code. This file requires only one line, which defines the Python runtime:

```yaml title="app.yaml"
runtime: python38
```

The line shown above clarifies that the right runtime for your Python code is Python 3.8. This is enough for Google App Engine to do the necessary setup on its servers.

::: note

Make sure that the [<VPIcon icon="iconfont icon-gcp"/>Python 3 Runtime Environment](https://cloud.google.com/appengine/docs/standard/python3/runtime) you want to use is available on Google App Engine.

:::

You can use Google App Engine’s <VPIcon icon="iconfont icon-yaml"/>`app.yaml` file for additional setup, such as adding environment variables to your application. You can also use it to define the path to static content for your app, such as images, CSS or JavaScript files. This tutorial won’t go into these additional settings, but you can consult Google App Engine’s documentation on the [<VPIcon icon="iconfont icon-gcp"/>`app.yaml` Configuration File](https://cloud.google.com/appengine/docs/standard/python3/config/appref) if you want to add such functionality.

These nine lines of code complete the necessary setup for this app. Your project is now ready for deployment.

However, it’s good practice to test your code before putting it into production so you can catch potential errors. Next, you’ll check whether everything works as expected locally before deploying your code to the Internet.

---

## Test Locally

Flask comes packaged with a development web server. You can use this development server to double-check that your code works as expected. To be able to run the Flask development server locally, you need to complete two steps. Google App Engine will do the same steps on its servers once you deploy your code:

1. Set up a virtual environment.
2. Install the `flask` package.

To [**set up a Python 3 virtual environment**](/realpython.com/python-virtual-environments-a-primer.md), navigate to your project folder on your terminal and type the following command:

```sh
python3 -m venv venv
```

This will create a new virtual environment named `venv` using the version of Python 3 that you have installed on your system. Next, you need to activate the virtual environment by sourcing the activation script:

```sh
source venv/bin/activate
```

After executing this command, your prompt will change to indicate that you’re now operating from within the virtual environment. After you successfully set up and activate your virtual environment, you’re ready to install Flask:

```sh
python3 -m pip install -r requirements.txt
```

This command fetches all packages listed in <VPIcon icon="fas fa-file-lines"/>`requirements.txt` from PyPI and installs them in your virtual environment. In this case, the only package installed will be Flask.

Wait for the installation to complete, then open up <VPIcon icon="fa-brands fa-python"/>`main.py` and add the following two lines of code at the bottom of the file:

```py title="main.py"
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

These two lines tell Python to start Flask’s development server when the script is executed from the command line. It’ll be used only when you run the script locally. When you deploy the code to Google App Engine, a professional web server process, such as [<VPIcon icon="fas fa-globe"/>Gunicorn](https://gunicorn.org/), will serve the app instead. You won’t need to change anything to make this happen.

You can now start Flask’s development server and interact with your Python app in your browser. To do so, you need to run the Python script that starts the Flask app by typing the following command:

```sh
python3 main.py
```

Flask starts up the development server, and your terminal will display output similar to the text shown below:

```plaintext title="output"
 * Serving Flask app "main" (lazy loading)
 * Environment: production
 WARNING: This is a development server.
 Do not use it in a production deployment.
 Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 315-059-987
```

This output tells you three important pieces of information:

1. `WARNING`: This is Flask’s development server, which means you don’t want to use it to serve your code in production. Google App Engine will handle that for you instead.
2. `Running on http://127.0.0.1:8080/`: This is the URL where you can find your app. It’s the URL for your localhost, which means the app is running on your own computer. Navigate to that URL in your browser to see your code live.
3. `Press CTRL+C to quit`: The same line also tells you that you can exit the development server by pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> on your keyboard.

Follow the instructions and open a browser tab at `http://127.0.0.1:8080/`. You should see a page displaying the text that your function returns: `Congratulations, it's a web app!`

::: note

The URL `127.0.0.1` is also called the **localhost**, which means that it points to your own computer. The number `8080` that follows after the colon (`:`) is called the **port number**. The port can be thought of as a particular channel, similar to broadcasting a television or radio channel.

You’ve defined these values in `app.run()` in your <VPIcon icon="fa-brands fa-python"/>`main.py` file. Running the application on port `8080` means that you can tune in to this port number and receive communication from the development server. Port `8080` is commonly used for local testing, but you could also use a different number.

:::

You can use Flask’s development server to inspect any changes that you make to the code of your Python app. The server listens to changes you make in the code and will automatically reload to display them. If your app doesn’t render as you expect it to on the development server, then it won’t work in production either. So make sure that it looks good before you deploy it.

Also keep in mind that even if it works well locally, it might not work quite the same once deployed. This is because there are other factors involved when you deploy your code to Google App Engine. However, for a basic app such as the one you’re building in this tutorial, you can be confident that it’ll work in production if it works well locally.

::: details Exercise: Practice and Explore

Change the return value of `index()` and confirm that you can see the change reflected in your browser. Play around with it. What happens when you change the return value of `index()` to HTML code, such as `<h1>Hello</h1>`, instead of using a plain text string?

:::

After having checked your setup and the code’s functionality on your local development server, you’re prepared to deploy it to Google App Engine.
