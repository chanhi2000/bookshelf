---
lang: en-US
title: "How to Go From Hello World to Building Real World Applications"
description: "Article(s) > How to Go From Hello World to Building Real World Applications"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - JavaScript
  - CSS
  - Git
  - DevOps
  - Github
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - js
  - javascript
  - css
  - git
  - devops
  - github
  - gcp
  - google
  - google-cloud
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Go From Hello World to Building Real World Applications"
    - property: og:description
      content: "How to Go From Hello World to Building Real World Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-go-from-hello-world-to-building-real-world-applications/
prev: /programming/py-fastapi/articles/README.md
date: 2026-01-31
isOriginal: false
author:
  - name: Spruce Emmanuel
    url: https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769802056548/2b1b2ede-5f7f-423f-b6ee-19e0c0ac7b43.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "FastAPI > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-fastapi/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Git > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/git/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Go From Hello World to Building Real World Applications"
  desc="Many developers start learning programming by building simple projects like todo apps, calculators, and basic CRUD applications. These projects are useful at the beginning, as they help you understand how a programming language works and give you the..."
  url="https://freecodecamp.org/news/how-to-go-from-hello-world-to-building-real-world-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769802056548/2b1b2ede-5f7f-423f-b6ee-19e0c0ac7b43.png"/>

Many developers start learning programming by building simple projects like todo apps, calculators, and basic CRUD applications. These projects are useful at the beginning, as they help you understand how a programming language works and give you the confidence to start building things. But for many developers, progress stops there.

Real world applications aren’t just about showing data on a screen. They solve real problems, work with real users, and handle situations that don’t always go as planned. This is where many developers struggle.

When I review junior developers’ résumés, I notice a common pattern: the projects section is often filled with beginner apps that look very similar. In today’s job market, this is usually not enough. Employers want to see that you can build something useful, something people would actually use.

The goal of this article is to help you move past simple Hello World projects like todo apps, calculators, and basic CRUD applications. By the end, you’ll understand how to approach building real applications that solve real problems and feel closer to what is built in the real world.

You might be wondering why you should listen to me.

Over the last 10 years, I’ve spent a lot of time building, breaking, and rebuilding software. I have experimented, failed many times, and eventually built applications that thousands of people use every day. A few weeks ago, I launched one of my own SaaS products and watched real users use it at scale, with over a thousand active users during peak hours, without the system crashing.

I’m sharing this because I’ve been where you are now.

If you continue reading, you will:

- Learn from real experience building applications used by real users
- Learn what not to do, based on years of mistakes and lessons
- Learn what actually works and what helps you stand out as a junior developer
- Clear up common misconceptions that slow people down

This article is not about theory. It’s about building real things.

To drive this point home, we’ll build a real world application that solves a real problem and is used by real people. Along the way, you’ll learn how to come up with real application ideas, how to build them with simple tools, and how to serve them to many users.

If this sounds like something you’re up for, then let’s get started.

---

## You Probably Think You Don't Know Enough

Before we begin, I want to clear up the most common misconception beginners have.

Many developers believe they don’t know enough to start building real world applications. They think they need to learn more JavaScript, more Python, or another framework before they are ready. Some even think learning React is the final step that will suddenly make everything click.

This belief is very common, but it’s not true.

If you know how to write HTML, CSS, and a simple loop or function in any programming language, you already have most of what it takes to build a real world application. This tutorial is proof of that.

That’s why I am writing this article. Not to tell you to learn more first, but to show you how far you can go with what you already know.

---

## How to Find Real World Application Ideas

One question beginners ask a lot is, “What kind of apps should I build?”

This is rarely talked about, but it matters more than most people think.

A simple rule is this: build things that already exist.

Look at the apps you use every day, especially the simple ones. Tools that do one thing well. If you find yourself using an app often, that app is solving a real problem.

For example, people use background removers to clean up images. They use URL shorteners to share links. They use notes apps to save quick thoughts. None of these ideas are new, but they are real.

You don’t need to invent something original. You need to understand a problem and build a working solution for it.

When you replicate real tools, you naturally learn how real applications are structured. You also end up with projects that make sense on a résumé, because they solve problems people recognize.

That’s exactly what we are going to do in this tutorial.

---

## What Are We Going to Build?

I’ll tell you now, it is not going to be another Hello World application. We’re going to be building a background remover web application.

This is the kind of tool people actually use. Designers use it for images, content creators use it for thumbnails, and developers build similar features into real products. It works with real files, real data, and real results.

::: info

If you want to see the final result before we start building, you can try the working app here:

```component VPCard
{
  "title": "Background Remover",
  "desc": "Remove backgrounds instantly",
  "link": "https://iamspruce.github.io/background-remover//",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

![The background remover application we are about to build](https://cdn.hashnode.com/res/hashnode/image/upload/v1769502551999/c2bdf45f-8768-4dc8-a816-6fa9a05dc15b.png)

We’ll build this app using simple tools on purpose. Plain HTML, CSS, and JavaScript for the frontend, and Python for the backend. No heavy frameworks and no complicated setup.

Before we continue, let me clear up **another common misconception.**

Many developers believe that for an application to be taken seriously, it must be built with complex frameworks. In my experience building applications for clients around the world over the last 10 years, not a single client has ever asked me what framework I used.

They only cared about one thing: Did it work, and did it solve their problem?

Users won’t care how your app is built. They care that it works. If HTML, CSS, and JavaScript can solve the problem, there’s no reason to wait months just to learn a new framework.

Now that we understand *why* we’re building this app and *what* problem it solves, it’s time to start writing code.

::: note Prerequisites

Before we start writing code, let’s quickly talk about what you need.

This tutorial is not for absolute beginners, but it’s also not super advanced. If you’ve built small things before and you want to build something that actually feels real, you’re in the right place.

**What You Should Already Know**

You should be comfortable with:

- Basic HTML: You know what inputs, buttons, images, and divs do.
- Basic CSS: You can style a page and make it look presentable.
- Basic JavaScript: You know how to listen for a button click and send a request using `fetch`.

That’s enough to follow along.

You don’t need React or any other frontend framework.

**Backend Knowledge**

For the backend, you don’t need to be a Python expert.

You just need to understand that:

- Python can run a server
- A server can receive requests
- A server can send back responses

Everything else will be explained as we go.

**Tools You Need**

Make sure you have these installed:

- Python 3.9 or newer
- Git
- A code editor like VS Code
- A browser

No Docker knowledge or cloud experience required.

**GitHub Account (Important)**

We’ll deploy the backend directly from GitHub, so you’ll need a GitHub account.

If you’ve never pushed a project to GitHub or hosted one before, I’ve already written a [**beginner-friendly guide**](/freecodecamp.org/host-your-first-project-on-github.md) you can follow first.

Read that article, then come back here.

**A Quick Mindset Check**

This is not a copy-paste tutorial. You will see real errors. Things may break. That’s normal. That’s how real applications are built.

Now that we’re clear on what you need, let’s start writing code.

We’ll begin with the backend. This is an important decision, so let’s explain it properly.

:::

---

## Table of Contents

4. [Prerequisites](#heading-prerequisites)
5. [Step 1: Setting Up the Backend](#heading-step-1-setting-up-the-backend)
6. [Step 2: Adding Background Removal to the Backend](#heading-step-2-adding-background-removal-to-the-backend)
7. [Step 3: Building the Frontend](#heading-step-3-building-the-frontend)
8. [Step 4: Putting the Backend on the Internet](#heading-step-4-putting-the-backend-on-the-internet)
9. [Step 5: Making the Backend and Frontend Work Together CORS](#heading-step-5-making-the-backend-and-frontend-work-together-cors)
10. [Step 6: Putting the Frontend on the Internet](#heading-step-6-putting-the-frontend-on-the-internet)

---

## Step 1: Setting Up the Backend

### What Is a Backend and Why Do We Need One?

A backend is a program that runs on a server and does the heavy work for an application.

In our case, the heavy work is image processing. Removing a background from an image requires libraries that can’t run inside the browser. Browsers are designed for safety and user interaction, not for this kind of processing.

That’s why we need a backend.

The backend will:

- Receive an image from the user
- Remove the background
- Send the processed image back

The frontend will simply talk to this backend later.

### Keeping Things Simple on Purpose

Because this might be your first real project, we’re going to keep the backend as simple as possible.

- One programming language (Python)
- One backend file
- No complex folder structure
- No advanced concepts

This is intentional. Real world applications don’t have to start out complex. They typically start small and grow.

### Project Structure

Create a new folder called:

```sh title="file structure"
background-remover
```

Inside it, create a folder for the backend:

```sh title="file structure"
background-remover/
  backend/
```

Move into the backend folder:

```sh
cd background-remover/backend
```

Now create a virtual environment:

```sh
python -m venv env
```

A virtual environment keeps this project’s dependencies separate from everything else on your computer. This is standard practice and something you’ll see in real projects.

Now activate it:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```sh
env\Scripts\activate
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source env/bin/activate
```

:::

Now create a folder for your application code:

```sh
mkdir api
```

Your structure should now look like this:

```sh title="file structure"
background-remover/
  backend/
    env/
    api/
```

At this stage, nothing looks impressive yet. That’s normal.

### Installing FastAPI

We’ll use FastAPI to build the backend API.

Install it together with Uvicorn, which is the server that runs our app:

```sh
pip install fastapi uvicorn
```

FastAPI allows us to define endpoints clearly and with very little code, which is perfect for us.

### Creating the First Backend File

Inside the <VPIcon icon="fas fa-folder-open"/>`api` folder, create a file called <VPIcon icon="fa-brands fa-python"/>`main.py`.

Add the following code:

```py title="backend/api/main.py"
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}
```

Let’s pause and understand what this does.

- We created a FastAPI application
- We added a `/health` endpoint
- This endpoint simply returns a message

Before building real features, developers always confirm that their server actually runs. That is exactly what this endpoint is for.

### Running the Server

From inside the <VPIcon icon="fas fa-folder-open"/>`backend` folder, start the server:

```sh
uvicorn api.main:app --reload
```

Now open a new terminal and run:

```sh
curl http://localhost:8000/health
```

You should see:

```json title="output"
{"status":"ok"}
```

This is an important moment.

You now have:

- A running backend server
- A real HTTP endpoint
- A response coming from your own code

This is how real backend services start.

### Why We Did This First

At this point, you might wonder why we didn’t jump straight into background removal.

The reason is simple: if the server doesn’t run, nothing else matters.

By starting with a health endpoint, we removed uncertainty. We know the server works. Everything we add next is built on top of something we already know is working.

Now that the foundation is in place, we can move on to the real feature.

---

## Step 2: Adding Background Removal to the Backend

Before we write any code here, we need to clear up an important misconception.

### A Common Misconception About Machine Learning

When people hear “background removal,” they often think machine learning is too advanced for them.

In real world development, this is almost never how it works.

You aren’t expected to build machine learning models yourself. You use libraries created by others and focus on integrating them correctly.

That is exactly what we’re doing here.

### Installing the Background Removal Library

Install the required packages:

```sh
pip install rembg pillow onnxruntime
```

- `rembg` handles the background removal
- `pillow` helps us work with images

For our purposes here, you don’t need to understand how these libraries work internally. You only need to know how to use them.

### Adding the Background Removal Endpoint

Now update <VPIcon icon="fa-brands fa-python"/>`main.py` so it looks like this:

```py title="backend/api/main.py"
from fastapi import FastAPI, UploadFile, File
from rembg import remove
from PIL import Image
import io

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    output = remove(image)

    buffer = io.BytesIO()
    output.save(buffer, format="PNG")
    buffer.seek(0)

    return buffer.getvalue()
```

::: info Let’s explain this carefully.

- The endpoint accepts an uploaded image
- The image is read into memory
- The background is removed
- The result is saved as a PNG with transparency
- The image is returned to the client

:::

This endpoint is the core of our application.

### Testing the Endpoint With curl

Before building the frontend, we’ll test the backend directly.

Run this command:

```sh
curl -X POST \
-F "file=@person.jpg" \
http://localhost:8000/remove-bg \
--output result.png
```

Open <VPIcon icon="fas fa-file-image"/>`result.png`. If you see the background removed, then the backend is complete.

At this point, you have built a backend that:

- Accepts real user input
- Processes real data
- Returns a meaningful result

This is a real backend.

### Where We Are Now

Let’s pause and summarize:

- We set up a backend server
- We confirmed that it runs
- We added a real feature
- We tested it without a frontend

This is exactly how real developers work.

In the next section, we’ll build a simple frontend that talks to this backend and turns it into something users can interact with.

---

## Step 3: Building the Frontend (What the User Actually Sees)

At this point, our backend is working.

It can receive an image, remove the background, and send the result back. But right now, only developers can use it, because it requires terminal commands.

To make this useful to actual (non-technical) people, we need a frontend.

The frontend is simply the part of the application users see and interact with in their browser.

### Clearing a Common Misconception About Frontends

Many beginners think building a frontend means learning a framework first.

This is not true.

Frameworks help later, but they aren’t required to build real applications. Under the hood, every frontend still comes down to HTML, CSS, and JavaScript.

That’s why we are using plain HTML, CSS, and JavaScript here. No React, no build tools, no setup. Just the basics.

### What Our Frontend Will Do

Our frontend has one job. It will:

- Let the user select an image
- Send that image to the backend
- Receive the processed image
- Show it on the screen
- Allow the user to download it

That’s all.

If it does these things correctly, it’s a real frontend.

### Creating the Frontend

Go back to the root of your project and create three files:

```sh title="file structure"
index.html
styles.css
app.js
```

This simple setup is very common. Each file has a clear responsibility, which makes the code easier to understand.

### Writing the HTML Page

Open <VPIcon icon="fa-brands fa-html5"/>`index.html` and add the following:

```html tile="index.html"
<!DOCTYPE html>
<html>
  <head>
    <title>Background Remover</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Background Remover</h1>

    <input type="file" id="imageInput" />
    <button id="removeBtn">Remove Background</button>

    <div class="result">
      <img id="resultImage" />
    </div>

    <a id="downloadLink" download>Download Image</a>

    <script src="app.js"></script>
  </body>
</html>
```

Right now, this page won’t do anything interesting. That’s expected.

HTML only describes what should be on the page. The behavior comes from JavaScript, which we’ll add after we add some styling.

### Adding Some Basic Styling

Open <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` and add this:

```css title="styles.css"
body {
  font-family: sans-serif;
  max-width: 600px;
  margin: 40px auto;
}

button {
  margin-top: 10px;
}

.result {
  margin-top: 20px;
}

img {
  max-width: 100%;
}

#downloadLink {
  display: none;
  margin-top: 10px;
}
```

This is not about making things look fancy.

The goal here is simply to make the page readable and pleasant to use. Many real internal tools look no better than this. (And you can always improve the styling later if you want.)

### Connecting the Frontend to the Backend

Now we’ll write the JavaScript that makes everything work.

Open <VPIcon icon="fa-brands fa-js"/>`app.js` and add the following code:

```js
const imageInput = document.getElementById("imageInput");
const removeBtn = document.getElementById("removeBtn");
const resultImage = document.getElementById("resultImage");
const downloadLink = document.getElementById("downloadLink");

removeBtn.addEventListener("click", async () => {
  const file = imageInput.files[0];

  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/remove-bg", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  resultImage.src = imageUrl;
  downloadLink.href = imageUrl;
  downloadLink.style.display = "inline";
});
```

Let’s slow down and explain what’s happening here:

- We read the image selected by the user
- We wrap it in `FormData` so it can be sent to the backend
- We send it to our `/remove-bg` endpoint
- We receive the processed image back
- We display it and prepare it for download

This is the moment where the frontend and backend finally talk to each other.

### Running the Frontend With Live Server

Before testing, make sure your backend is still running.

Now, instead of opening `index.html` directly, use the **Live Server** extension in VS Code.

If you don’t have it installed, just open VS Code extensions, search for “Live Server”, and then install it. Then right click on `index.html` and click “Open with Live Server”.

This starts a small local server for the frontend.

Why does this matter?

Many browser features work better when files are served through a server instead of opened directly from the file system. Using Live Server also matches how real frontends are served.

### Testing the Full Application Locally

Now choose an image and click the button.

If everything is working:

- The image is sent to the backend
- The background is removed
- The result appears on the page
- The download link shows up

Take a moment here. You have just built:

- A backend that processes real data
- A frontend that talks to it
- A complete application running locally

This is already more than a “Hello World” project.

![The application running locally after connecting the frontend and backend and removing background from an image](https://cdn.hashnode.com/res/hashnode/image/upload/v1769503437045/6a984e58-cee9-4255-84aa-76ee26b805b3.png)

### Clearing One More Misconception

Some beginners look at this and think: “This feels too simple to be a real app.”

This is another misconception. Real applications aren’t defined by complexity. They’re defined by usefulness. If your app solves a real problem and people can use it, it’s a real application.

In the next section, we’ll take this exact app and put it on the internet so anyone can use it.

---

## Step 4: Putting the Backend on the Internet

Right now, your backend is running on your computer.

That means:

- It works only for you
- If you close your laptop, it stops
- If someone opens your frontend, it cannot reach your backend

To fix this, we need to run the backend on a computer that is **always online**.

This process is called **deployment**.

### A Simple Way to Think About Deployment

Deployment does **not** mean writing new code.

It simply means this: instead of running your backend on your laptop, you run it on another computer that never sleeps.

Everything we do next exists only to make that happen.

### Why We Aren’t Using Netlify or Vercel

You might be wondering why we aren’t using Netlify or Vercel. Those platforms are great, but they’re mainly for **frontends**.

They work best when your app is:

- Static HTML, CSS, and JavaScript
- A frontend framework like React or Vue
- Small serverless functions

Our backend is different. It’s a **Python server** that:

- Stays running
- Accepts image uploads
- Processes images
- Uses heavy native libraries for background removal

This kind of backend needs a **real server**, not a lightweight serverless function.

That’s why Netlify and Vercel aren’t a good fit here.

### Why We’re Using Cloud Run

Instead, we’re using **Cloud Run**.

Cloud Run lets us run real backend servers on Google’s infrastructure without managing servers ourselves.

We’re using it because:

- It supports full Python backends
- It deploys directly from GitHub
- It handles scaling and servers for us
- It works well with heavy workloads
- It’s beginner-friendly

Most importantly, it lets you deploy a **real backend** without learning cloud commands or CI/CD pipelines.

### Preparing the Backend for Cloud Run

Before deploying, we need to make sure our backend is ready.

#### Creating <VPIcon icon="fas fa-file-lines"/>`requirements.txt`

Inside the <VPIcon icon="fas fa-folder-open"/>`backend` folder, create a file called `requirements.txt`.

Add this:

```plaintext title="requirements.txt"
fastapi
uvicorn
rembg
pillow
onnxruntime
```

This file tells Cloud Run which Python libraries to install.

### Creating a GitHub Repository

Cloud Run deploys directly from GitHub, so our code must live there.

From the project root, run:

```sh
git init
git add .
git commit -m "Initial background remover project"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

This **single repository** will be used for both backend and frontend.

### Deploying the Backend on Cloud Run

Now open your browser and go to **Google Cloud Console**.

#### 1. Create a New Project

Open [<VPIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://console.cloud.google.com) and click New Project. Give it a name (for example: `background-remover`) and then click Create.

![Creating a new Google Cloud project](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749541636/778464de-2c95-4f7e-9505-9729a84f2001.png)

#### 2. Open Cloud Run

Use the search bar at the top and search for **Cloud Run.** Then open it.

![Cloud Run overview page](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749581066/9078ae2e-fa00-4dfa-be04-383d9702bb90.png)

Cloud Run will automatically enable the required APIs.

You will be asked to set up billing. Google gives you $300 free credit, which is more than enough for this tutorial.

#### 3. Start Creating the Service

Click Create Service and choose Deploy continuously from a repository.

![Creating a Cloud Run service from a repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749636809/348f720a-b1b1-46e4-9eab-48928adeb2f3.png)

#### 4. Connect Your GitHub Account

Select **GitHub** as the repository provider and authenticate your GitHub account. Then install Google Cloud Build on your GitHub account. Choose **only the repository** you want to deploy.

![Installing Google Cloud Build on GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749686780/89571b5e-0bd7-4127-82d2-b9445a5044e4.png)

This allows Google Cloud to build and deploy your code automatically.

#### 5. Select the Repository

Then choose the repository you just installed Cloud Build on and select the <VPIcon icon="fa-brands fa-code-branch"/>`main` branch.

![Selecting the GitHub repository](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749745522/a9f95c4b-7fd3-480d-bae1-7ae92bcdd52f.png)

#### 6. Configure the Build

Now comes the important part: building the context directory.

Set this to:

```sh
backend
```

This tells Cloud Run:

> “My backend code lives inside the <VPIcon icon="fas fa-folder-open"/>`backend` folder.”

For the entry command, enter:

```sh
uvicorn api.main:app --host 0.0.0.0 --port 8080
```

This is how Cloud Run starts your FastAPI server.

![Build configuration for the backend](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749801126/87676cce-3e75-4244-b32f-401f782d7c85.png)

#### 7. Configure Container Resources

Our backend runs a **background-removal model**, which is heavy.

So we must increase resources.

- Change memory from **512 MB → 2 GB**
- Set CPU to **4**

![Increasing memory and CPU](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749870471/a24e5d37-af21-48a6-b720-b6748d478b6d.png)

This ensures the model can load and run properly.

#### 8. Deploy

Now click **Create**.

Cloud Run will:

- Build your app
- Install dependencies
- Create a container
- Deploy it to the internet

You’ll see logs showing the build and deployment process.

![Cloud Build running](https://cdn.hashnode.com/res/hashnode/image/upload/v1769749916316/5eb276f6-01c1-413c-aeb7-13a8d34dbbe2.png)

This can take a few minutes. That’s normal.

### Checking That the Backend Is Live

Once deployment finishes, Cloud Run will show you a **public URL**.

Test it:

```sh
curl https://YOUR_CLOUD_RUN_URL/health
```

If you see:

```json title="output"
{"status":"ok"}
```

Your backend is officially live on the internet.

Pause here for a second.

You just deployed a real backend. Congratulations.

### Updating the Frontend to Use the Live Backend

Open <VPIcon icon="fa-brands fa-js"/>`app.js`.

```js title="app.js"
http://localhost:8000/remove-bg
// With:
https://YOUR_CLOUD_RUN_URL/remove-bg
```

Save the file and reload the frontend.

---

## Step 5: Making the Backend and Frontend Work Together

At this point, we have two things:

- A backend running on the internet
- A frontend running in the browser

Now we want them to talk to each other.

Open your frontend, select an image, and click the button. You’ll notice that it still doesn’t work. This is expected.

### What Is Happening Here?

Your frontend is running on one address, while your backend is running on another address.

Browsers are very strict about this. By default, a browser will block requests from one website to another unless the backend explicitly allows it. This is a security feature.

This rule is called **CORS**.

### Clearing a Common Misconception About CORS

When beginners see a CORS error, they often think something is broken.

Nothing is broken. CORS is simply the browser saying: “I need the backend to confirm that this frontend is allowed to talk to it.”

So all we need to do is tell the backend: “It’s okay for requests to come from my frontend.”

### Allowing Only Our Frontend (Not Everyone)

Instead of allowing requests from everywhere, we’ll allow requests only from our frontend. This is a good habit to learn early.

Open <VPIcon icon="fas fa-folder-open"/>`backend/api/`<VPIcon icon="fa-brands fa-python"/>`main.py`.

Add this import at the top:

```py title="backend/api/main.py"
from fastapi.middleware.cors import CORSMiddleware
```

Then, after creating the FastAPI app, add this:

```py title="backend/api/main.py"
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)
```

Why these URLs?

If you’re using the Live Server extension, your frontend is usually served on port `5500`. These are the addresses your browser is using locally.

We’re telling the backend: “Only accept requests from this frontend.”

That is exactly what we want.

### Redeploying the Backend

Any time you change backend code, you need to redeploy it.

Since our backend is deployed on Cloud Run and set up with automatic deploy, redeploying is simple, all you need to do is push your changes.

From the project root, run:

```sh
git add .
git commit -m "Add CORS configuration"
git push
```

Cloud Run will automatically detect the change and redeploy your backend.

Wait for the deployment to finish. Once it’s done, your backend will now allow requests from your local frontend.

### Testing Again

Reload your frontend in the browser.

Select an image and click the button. This time, it should work.

You just handled a real browser security rule that every production app runs into. That alone is a huge learning step.

---

## Step 6: Putting the Frontend on the Internet (GitHub Pages)

Right now, your frontend works only on your computer.

Just like the backend earlier, this means no one else can use it.

Let’s fix that.

### Why GitHub Pages?

Our frontend is:

- Just HTML, CSS, and JavaScript
- No backend code
- No build step

This makes it perfect for GitHub Pages. GitHub Pages can host static sites for free, and it’s very beginner friendly.

### Preparing the Frontend for Deployment

Make sure all your frontend files are inside the frontend folder:

```sh title="file structure"
frontend/
  index.html
  styles.css
  app.js
```

Open app.js and make sure the backend URL is the Cloud Run URL, not localhost.

```js
fetch("https://YOUR_CLOUD_RUN_URL/remove-bg", {
  method: "POST",
  body: formData,
});
```

Save the file.

### Pushing the Frontend to GitHub

We already created a GitHub repository earlier, so we’ll reuse it.

From the project root, run:

```sh
git add .
git commit -m "Add frontend and prepare for GitHub Pages"
git push
```

### Enabling GitHub Pages

1. Go to your repository on GitHub.
2. Open Settings.
3. Click Pages.

Under Source, select:

1. Branch: <VPIcon icon="fas fa-code-branch"/>`main`
2. Folder: /(root)

Save everything. After a few seconds, GitHub will give you a URL. This URL is now your frontend on the internet.

### Updating CORS for the Live Frontend

Now that the frontend is live, go back to `backend/api/`<VPIcon icon="fa-brands fa-python"/>`main.py`.

Replace the local origins with your GitHub Pages URL:

```py title="backend/api/main.py"
allow_origins=[
    "https://YOUR_GITHUB_USERNAME.github.io"
]
```

Commit and push the change:

```sh
git add .
git commit -m "Update CORS for GitHub Pages"
git push
```

Cloud Run will redeploy the backend automatically.

### Final Test

Open your GitHub Pages URL.

Upload an image, remove the background, and download the result.

Everything is now live.

---

## Where You Are Now

Let’s be very clear about what you just did.

You:

- Built a real backend
- Deployed it to the internet
- Built a frontend
- Deployed it to the internet
- Fixed real production issues
- Connected everything properly

This is not a demo project. This is a real application.

In the final section, we’ll wrap things up, talk about what you learned, and where you can go next.

---

## Final Thoughts: What You Just Built Matters

At this point, it is worth stopping and looking back at what you have actually done.

You didn’t just follow steps. You didn’t just copy code. You built a real application.

### Let’s Be Clear About What You Accomplished

You started with nothing more than basic tools and ideas.

By the end of this tutorial, you:

- Built a backend that processes real data
- Used a machine learning tool without fear or overthinking
- Exposed a backend to the internet
- Built a frontend with plain HTML, CSS, and JavaScript
- Connected the frontend and backend properly
- Deployed both parts so real users can access them

This is exactly how real applications are built, just at a smaller and more manageable scale.

### Why This Is No Longer a “Beginner Project”

Many projects are called beginner projects, but they stop at showing things on a screen.

This one does not.

Your app:

- Accepts real input
- Performs real work
- Runs on real servers
- Handles real browser rules
- Can be shared with anyone

That is the difference between learning syntax and building software.

### The Most Important Lesson in This Tutorial

The most important thing you should take away from this is not the project you built.

It is this: You didn’t need to “know more” before you started.

You learned by building. You figured things out as they appeared. You fixed problems when they showed up.

That is how experience is gained. No one has experience before building real applications. No one lacks experience after building many of them.

### What You Can Do Next

This project isn’t the end. It’s a starting point.

Here are a few ideas you can explore next, using what you already know:

- Improve the user interface
- Add loading states and better feedback
- Restrict image size or file types
- Add simple rate limiting
- Build another small tool that solves a real problem

You don’t need to jump to frameworks yet.

If you can build a few more projects like this, frameworks will make a lot more sense when you meet them.

### One Last Thought

If this was your first real project, you should be proud of yourself.

You moved past tutorials, built something useful, and put it on the internet. That’s the line many developers never cross.

Now that you have crossed it, the next one will be easier.
how-to-go-from-hello-world-to-building-real-world-applications
So keep building!

::: info Source Code and Live Demo

If you want to explore the full project or build on top of it, you can find everything here.

```component VPCard
{
  "title": "Background Remover",
  "desc": "Remove backgrounds instantly",
  "link": "https://iamspruce.github.io/background-remover//",
  "logo": "",
  "background": "rgba(244,245,255,0.2)"
}
```

<SiteInfo
  name="iamspruce/background-remover"
  desc="Remove Background from any image."
  url="https://github.com/iamspruce/background-remover/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/07bcf61fa4df344e63ccd4302fd3bfbfd97afe1c3358c55a261ab560c93cad27/iamspruce/background-remover"/>

:::

If you have questions, reach me on X at [`@sprucekhalifa` (<VPIcon icon="fa-brands fa-x-twitter" />`sprucekhalifa`)](https://x.com/sprucekhalifa). I write practical tech articles like this regularly.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Go From Hello World to Building Real World Applications",
  "desc": "Many developers start learning programming by building simple projects like todo apps, calculators, and basic CRUD applications. These projects are useful at the beginning, as they help you understand how a programming language works and give you the...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-go-from-hello-world-to-building-real-world-applications/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
