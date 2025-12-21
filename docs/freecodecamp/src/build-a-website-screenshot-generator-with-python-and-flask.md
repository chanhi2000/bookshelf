---
lang: en-US
title: "Build a Website Screenshot Generator with Python and Flask"
description: "Article(s) > Build a Website Screenshot Generator with Python and Flask"
icon: iconfont icon-flask
category:
  - Python
  - Flask
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - flask
  - py-flask
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Build a Website Screenshot Generator with Python and Flask"
    - property: og:description
      content: "Build a Website Screenshot Generator with Python and Flask"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-website-screenshot-generator-with-python-and-flask.html
prev: /programming/py-flask/articles/README.md
date: 2025-10-30
isOriginal: false
author:
  - name: Ashutosh Krishna
    url : https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761756575904/17a940c5-352e-47a2-992e-a1973c030c05.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build a Website Screenshot Generator with Python and Flask"
  desc="Have you ever needed to take screenshots of websites automatically – maybe to track visual changes, include them in reports, or generate previews? Doing this manually can be time-consuming, especially if you need to capture multiple pages regularly. ..."
  url="https://freecodecamp.org/news/build-a-website-screenshot-generator-with-python-and-flask"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761756575904/17a940c5-352e-47a2-992e-a1973c030c05.png"/>

Have you ever needed to take screenshots of websites automatically – maybe to track visual changes, include them in reports, or generate previews? Doing this manually can be time-consuming, especially if you need to capture multiple pages regularly.

In this tutorial, you’ll learn how to build a simple website screenshot generator using Python and Flask. The app will let users enter any website URL and instantly get a screenshot of that page – all powered by a screenshot API.

You’ll use [<VPIcon icon="fas fa-globe"/>Flask](https://blog.ashutoshkrris.in/getting-started-with-flask), a lightweight web framework, to create a simple web interface and handle requests. Then, you’ll integrate an external API to capture website screenshots programmatically.

By the end of this tutorial, you’ll have learned how to:

- Build a basic Flask web app
- Accept user input through an HTML form
- Make HTTP requests to an external API
- Display images dynamically on a web page

This project is a great way to learn how APIs can extend the capabilities of your web applications, and how Python can easily handle tasks like image generation and display.

::: note Prerequisites

Before we start building the app, make sure you have a few basics covered:

**1. Python Installed**

You’ll need Python 3.9 or higher installed on your machine. You can check your version by running:

```sh
python --version
```

If you don’t have it, you can download it from [<VPIcon icon="fa-brands fa-python"/>python.org/downloads](https://python.org/downloads/).

**2. Basic Knowledge of Python and Flask**

You don’t need to be a Flask expert. Just have some familiarity with how to create routes and templates, and how to handle form data in Flask.

If you’re new to Flask, don’t worry – we’ll go step-by-step.

**3. Screenshot API Key**

We’ll be using the [<VPIcon icon="fas fa-globe"/>ScreenshotBase API](https://screenshotbase.com/) to capture website screenshots. It provides a simple REST endpoint that takes a URL and returns a screenshot image.

You can get a free API key by signing up on their website. Once you have the key, keep it handy, as we’ll use it when we integrate the API in the later steps.

**4. A Code Editor and Terminal**

You can use any editor you prefer, like VS Code, PyCharm, or even a simple text editor. Make sure your terminal or command prompt can run Python commands and install packages using `pip`.

:::

---

## Setting Up the Project

Let’s start by setting up a new Flask project from scratch.

### Step 1: Create a New Folder

Create a new folder for your project. You can name it `screenshot-generator`:

```sh
mkdir screenshot-generator
cd screenshot-generator
```

### Step 2: Create a Virtual Environment

A virtual environment helps keep your project dependencies isolated from other Python projects.

Run the following commands:

```sh
python -m venv venv
```

Then activate it:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

Once activated, you should see `(venv)` at the beginning of your terminal prompt.

### Step 3: Install Dependencies

We’ll need two packages for this project:

- **Flask** for building the web app
- **Requests** for making API calls to ScreenshotBase

Install them using pip:

```sh
pip install flask requests
```

### Step 4: Set Up the Project Structure

Inside your project folder, create the following files and folders:

```sh title="file structure"
screenshot-generator/
├── app.py
├── templates/
│   └── index.html
└── static/
```

Here’s what each part does:

- <VPIcon icon="fa-brands fa-python"/>`app.py`: main Python file that runs your Flask app
- <VPIcon icon="fas fa-folder-open"/>`templates/`: stores HTML templates
- <VPIcon icon="fas fa-folder-open"/>`static/`: stores images, CSS, and JavaScript files

### Step 5: Add a Basic Flask App

Open <VPIcon icon="fa-brands fa-python"/>`app.py` and add the following starter code:

```py title="app.py"
from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)
API_KEY = os.getenv("SCREENSHOTBASE_API_KEY")
SCREENSHOTBASE_BASE_ENDPOINT = "https://api.screenshotbase.com/v1/take"

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        url = request.form.get('url')
        # Placeholder: We’ll add the API call here in the next section
        return render_template('index.html', url=url)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

This sets up a minimal Flask application with one route (`/`). We’ll add the ScreenshotBase API call in the next section.

### Step 6: Create a Simple HTML Template

Now that we’ve written the Flask backend to handle the screenshot request, let’s create the frontend for our app.

Inside your project folder, create a new directory named <VPIcon icon="fas fa-folder-open"/>`templates`, and within it, add a file called <VPIcon icon="fa-brands fa-html5"/>`index.html`. Flask will automatically look for templates in this folder.

Here’s how the template should look:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Website Screenshot Generator</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous"
    />
    <style>
        body {
            padding-top: 2rem;
        }
        .screenshot-container {
            max-height: 80vh;
            overflow-y: auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1rem;
            background: #f8f9fa;
        }
    </style>
</head>
<body>
    <div class="container text-center">
        <h1 class="mb-4">Website Screenshot Generator</h1>
        <form method="POST" class="d-flex justify-content-center mb-4">
            <input 
                type="text" 
                name="url" 
                placeholder="Enter website URL" 
                class="form-control w-50 me-2"
                required
            >
            <button type="submit" class="btn btn-primary">Capture Screenshot</button>
        </form>

        {% if screenshot %}
            <h4>Screenshot Preview:</h4>
            <div class="screenshot-container mx-auto">
                <img src="{{ screenshot }}" alt="Website Screenshot" class="img-fluid rounded shadow">
            </div>
        {% elif request.method == 'POST' %}
            <div class="alert alert-danger mt-3">
                Sorry, something went wrong while capturing the screenshot. Please try again.
            </div>
        {% endif %}
    </div>
</body>
</html>
```

This HTML template uses Bootstrap to keep the design clean and responsive without much custom styling. The form at the top allows users to enter any website URL and submit it to the Flask app using the `POST` method. Once the app retrieves the screenshot URL from the API, it dynamically renders the image on the page.

The `img-fluid` class from Bootstrap ensures the screenshot scales properly across all screen sizes while maintaining its aspect ratio. Also, the `.screenshot-container` provides a scrollable area, which helps display full-page screenshots without shrinking them too much or breaking the layout.

Now your project is set up and ready to capture real screenshots using the ScreenshotBase API.

In the next section, we’ll write the logic to call the ScreenshotBase API and display the resulting screenshot dynamically in the browser.

---

## Integrating the ScreenshotBase API

Now that our Flask app is set up, let’s connect it to the ScreenshotBase API so we can generate real screenshots from any URL.

### Step 1: Understanding the API Endpoint

The ScreenshotBase API provides a simple endpoint that takes a website URL and returns a screenshot image.

A typical API call looks like this:

```sh
GET https://api.screenshotbase.com/v1/take
```

You send the target website URL as a query parameter (`url`) and include your API key in the request header as `apikey`.

Here’s the cURL example from their documentation:

```sh
curl -G https://api.screenshotbase.com/v1/take?url=https%3A%2F%2Fbbc.com \
-H "apikey: YOUR-API-KEY"
```

This request captures a screenshot of `https://bbc.com` and returns the screenshot image as the response.

### Step 2: Add the API Call in Flask

Let’s update our `home` route in <VPIcon icon="fa-brands fa-python"/>`app.py` to send a request to the ScreenshotBase API when a user submits a URL.

Here’s the updated version of <VPIcon icon="fa-brands fa-python"/>`app.py`:

```py title="app.py"
from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)
API_KEY = os.getenv("SCREENSHOTBASE_API_KEY")
SCREENSHOTBASE_BASE_ENDPOINT = "https://api.screenshotbase.com/v1/take"

@app.route('/', methods=['GET', 'POST'])
def home():
    screenshot_url = None

    if request.method == 'POST':
        target_url = request.form.get('url')

        params = {"url": target_url}
        headers = {"apikey": API_KEY}

        try:
            # Send GET request to ScreenshotBase API
            response = requests.get(SCREENSHOTBASE_BASE_ENDPOINT, params=params, headers=headers, timeout=30)
            response.raise_for_status()

            # Save the returned image
            image_path = os.path.join('static', 'screenshot.png')
            with open(image_path, 'wb') as f:
                f.write(response.content)

            screenshot_url = image_path

        except requests.exceptions.RequestException as e:
            print(f"Error capturing screenshot: {e}")

    return render_template('index.html', screenshot=screenshot_url)

if __name__ == '__main__':
    app.run(debug=True)
```

::: info Here’s what this code does:

1. Captures the user input (URL).
2. Sends a GET request to the `/v1/take` endpoint.
3. Passes your API key in the request header (`apikey`).
4. Saves the returned image to the <VPIcon icon="fas fa-folder-open"/>`static` folder.
5. Displays the screenshot on the page.

:::

### Step 3: Test Your App

Run the app again:

```sh
python app.py
```

Then open `http://127.0.0.1:5000` in your browser.

Enter a URL like:

```plaintext
https://github.com/ashutoshkrris
```

After submitting, you should see the screenshot of that website displayed below the form.

Your Flask app is now fully functional! It takes a URL, sends it to the ScreenshotBase API, and displays the resulting screenshot.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1761133080971/d0feb78c-09cb-4f01-b254-a56fca3a58c8.png)

In the next section, we’ll enhance the app by adding customization options like full-page screenshots, viewport settings, and delays. Later, we’ll explore the ScreenshotBase SDKs for popular languages like Python, Node.js, and PHP.

---

## Adding Customization Options

Right now, our app simply takes a screenshot of the given website URL using the default settings. However, most screenshot APIs (including the one we’re using) allow you to customize the output by passing additional parameters in the request.

The ScreenshotBase API offers several powerful customization options to help you tailor each screenshot to your needs:

- **Image format**: Choose from `png`, `jpg`, `gif`, or `webp`, depending on your image quality or compression requirements.
- **Full page capture**: Capture the entire scrollable webpage (`full_page=1`) or just the visible viewport (`full_page=0`).
- **Viewport dimensions**: Set the browser window size with `viewport_width` and `viewport_height` to simulate screenshots from desktop, tablet, or mobile screens.

These options make ScreenshotBase ideal for building automation tools, thumbnail generators, testing dashboards, and visual documentation systems. Let’s add these options to make our screenshot generator more flexible.

### Updating the Flask Code

Open your <VPIcon icon="fa-brands fa-python"/>`app.py` file and update the route that handles form submissions to include these optional parameters:

```py :collapsed-lines title="app.py"
from flask import Flask, render_template, request
import requests
import os

app = Flask(__name__)
API_KEY = os.getenv("SCREENSHOTBASE_API_KEY", "scr_live_9Qkn1gs01rivZqrFk7lusXPiqAUg85J86aU6bHvG")
SCREENSHOTBASE_BASE_ENDPOINT = "https://api.screenshotbase.com/v1/take"


@app.route('/', methods=['GET', 'POST'])
def home():
    screenshot_url = None

    if request.method == 'POST':
        target_url = request.form.get('url')
        format_ = request.form.get('format', 'png')
        full_page = request.form.get('full_page') == 'on'

        params = {
            "url": target_url,
            "format": format_,
            "full_page": int(full_page)
        }
        headers = {"apikey": API_KEY}

        try:
            # Send GET request to ScreenshotBase API
            response = requests.get(SCREENSHOTBASE_BASE_ENDPOINT, params=params, headers=headers, timeout=30)
            response.raise_for_status()

            # Save the returned image
            image_extension = format_ if format_ != 'jpeg' else 'jpg'
            image_path = os.path.join('static', f'screenshot.{image_extension}')
            with open(image_path, 'wb') as f:
                f.write(response.content)

            screenshot_url = image_path

        except requests.exceptions.RequestException as e:
            print(f"Error capturing screenshot: {e}")

    return render_template('index.html', screenshot=screenshot_url)


if __name__ == '__main__':
    app.run(debug=True)
```

### Updating the HTML Template

Next, let’s modify the form in our <VPIcon icon="fa-brands fa-html5"/>`index.html` to include the customization options:

```html :collapsed-lines title="index.html"
<form method="POST" class="d-flex flex-column justify-content-center mb-4">
  <!-- URL and Submit Button in One Row html title="index.html"
  <div class="input-group mb-4">
    <input
      type="text"
      name="url"
      placeholder="Enter website URL"
      class="form-control w-50 me-2"
      required
    />
    <button type="submit" class="btn btn-primary">Capture Screenshot</button>
  </div>

  <!-- Options in Two Columns -->
  <div class="row g-3">
    <!-- Full Page Checkbox -->
    <div class="col-md-6">
      <div class="form-check">
        <input
          type="checkbox"
          name="full_page"
          id="full_page"
          class="form-check-input"
        />
        <label class="form-check-label" for="full_page">
          Capture Full Page Screenshot
        </label>
      </div>
    </div>

    <!-- Format Dropdown -->
    <div class="col-md-6">
      <label for="format" class="form-label">Screenshot Format</label>
      <select class="form-select" name="format" id="format" required>
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="gif">GIF</option>
        <option value="webp">WEBP</option>
      </select>
    </div>

    <!-- Viewport Width -->
    <div class="col-md-6">
      <label for="viewport_width" class="form-label">Viewport Width</label>
      <input
        type="number"
        name="viewport_width"
        id="viewport_width"
        class="form-control"
        value="1280"
        min="320"
      />
    </div>

    <!-- Viewport Height -->
    <div class="col-md-6">
      <label for="viewport_height" class="form-label">Viewport Height</label>
      <input
        type="number"
        name="viewport_height"
        id="viewport_height"
        class="form-control"
        value="720"
        min="320"
      />
    </div>
  </div>
</form>
```

The updated form gives users control over how the screenshot is generated. The format dropdown lets them choose between PNG, JPG, GIF, or WEBP. The Full Page checkbox toggles whether the API captures the entire scrollable webpage or just the visible viewport. The viewport width and height fields define the browser window dimensions, which is useful if you want to simulate different device sizes or responsive layouts.

When the form is submitted, Flask reads these values and sends them as query parameters in the API request.

For example, a request to capture a full-page, 1920×1080 PNG screenshot of your site would look like this:

```plaintext
https://api.screenshotbase.com/v1/take?url=https%3A%2F%2Fgithub.com%2Fashutoshkrris&format=png&full_page=1&viewport_width=1920&viewport_height=1080
```

This flexibility makes it easy to fine-tune screenshots for different use cases – whether you’re generating thumbnails, testing responsiveness, or automating visual reports.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1761134646387/b9145271-303f-408e-ab53-444ea125849e.gif)

Note: If you prefer working with SDKs instead of direct API calls, ScreenshotBase also offers official SDKs for popular languages like Python, JavaScript, Ruby, PHP, and Go.

These SDKs provide a simpler and more convenient way to interact with the API, handling authentication and request formatting behind the scenes.

You can explore them in the [<VPIcon icon="fas fa-globe"/>ScreenshotBase SDK documentation](https://screenshotbase.com/docs/sdks).

---

## Wrapping Up

In this tutorial, you learned how to build a simple Flask application that captures website screenshots using a third-party API. We explored how to send requests, handle image responses, and add customization options like image format, full-page capture, and viewport size – all while keeping the project lightweight and easy to extend.

This small project demonstrates how web automation tasks, such as generating previews or visual reports, can be simplified using modern APIs. You can build upon this foundation to create batch screenshot tools, visual monitoring systems, or even integrate screenshots into larger web applications.

The key takeaway is understanding how to interact with external APIs, process responses, and design a clean interface for users. These are skills that are essential for backend and full-stack developers alike.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build a Website Screenshot Generator with Python and Flask",
  "desc": "Have you ever needed to take screenshots of websites automatically – maybe to track visual changes, include them in reports, or generate previews? Doing this manually can be time-consuming, especially if you need to capture multiple pages regularly. ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-website-screenshot-generator-with-python-and-flask.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
