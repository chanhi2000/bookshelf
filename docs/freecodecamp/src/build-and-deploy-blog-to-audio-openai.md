---
lang: en-US
title: "How to Build and Deploy a Blog-to-Audio Service Using OpenAI"
description: "Article(s) > How to Build and Deploy a Blog-to-Audio Service Using OpenAI"
icon: iconfont icon-fastapi
category:
  - Python
  - FastAPI
  - DevOps
  - Sevalla
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - fastapi
  - py-fastapi
  - devops
  - sevalla
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy a Blog-to-Audio Service Using OpenAI"
    - property: og:description
      content: "How to Build and Deploy a Blog-to-Audio Service Using OpenAI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-blog-to-audio-openai.html
prev: /programming/py-fastapi/articles/README.md
date: 2026-01-14
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768359861591/69bc8279-f882-4af1-9375-5576f7043b48.png
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
  "title": "Sevalla > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/sevalla/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenAI > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/openai/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy a Blog-to-Audio Service Using OpenAI"
  desc="Turning written blog posts into audio is a simple way to reach more people. Many users prefer listening during travel or workouts. Others enjoy having both reading and listening options.  With OpenAI’s text-to-speech models, you can build a clean ser..."
  url="https://freecodecamp.org/news/build-and-deploy-blog-to-audio-openai"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768359861591/69bc8279-f882-4af1-9375-5576f7043b48.png"/>

Turning written blog posts into audio is a simple way to reach more people. Many users prefer listening during travel or workouts. Others enjoy having both reading and listening options.

With OpenAI’s [<VPIcon icon="iconfont icon-openai"/>text-to-speech](https://platform.openai.com/docs/guides/text-to-speech) models, you can build a clean service that takes a blog URL or pasted text and produces a natural-sounding audio file.

In this article, you’ll learn how to build this system end-to-end. You will learn how to fetch blog content, send it to OpenAI’s audio API, save the output as an MP3 file, and serve everything through a small [<VPIcon icon="iconfont icon-fastapi"/>FastAPI](https://fastapi.tiangolo.com/) app.

At the end, you’ll also build a minimal user interface and deploy it to Sevalla so that anyone can upload text and download audio without touching code.

---

## Understanding the Core Idea

A blog-to-audio service has only three important parts. The first part takes a blog link or text and cleans it. The second part sends the clean text to OpenAI’s text-to-speech model. The third part gives the final MP3 file back to the user.

OpenAI’s speech generation is simple to use. You send text, choose a voice, and get audio back. The quality is high and works well even for long posts. This means you do not need to worry about training models or tuning voices.

The only job left is to make the system easy to use. That is where FastAPI and a small HTML form help. They wrap your code into a web service so anyone can try it.

---

## How to Set Up Your Project

Create a folder for your project. Inside it, create a file called <VPIcon icon="fa-brands fa-python"/>`main.py`. You will also need a basic HTML file later.
 title="main.py"
Install the libraries you need with pip:

```sh
pip install fastapi uvicorn requests beautifulsoup4 python-multipart
```

FastAPI gives you a simple backend. Requests module helps download blog pages. [<VPIcon icon="iconfont icon-pypi"/>BeautifulSoup](https://pypi.org/project/beautifulsoup4/) helps remove HTML tags and extract readable text. Python-multipart helps upload form data.

You must also install the OpenAI client:

```sh
pip install openai
```

Make sure you have your OpenAI API key ready. Set it in your terminal before running the app:

```sh
export OPENAI_API_KEY="your-key"
```

On Windows, you can do:

```sh
setx OPENAI_API_KEY "your-key"
```

---

## How to Fetch and Clean Blog Content

To convert a blog into audio, you must first extract the main article text. You can fetch the page with requests and parse it with BeautifulSoup.

Below is a simple function that does this.

```py
import requests
from bs4 import BeautifulSoup

def extract_text_from_url(url: str) -> str:
    response = requests.get(url, timeout=10)
    html = response.text
    soup = BeautifulSoup(html, "html.parser")
    paragraphs = soup.find_all("p")
    text = " ".join(p.get_text(strip=True) for p in paragraphs)
    return text
```

Here is what happens step by step.

- The function downloads the page.
- BeautifulSoup reads the HTML and finds all paragraph tags.
- It pulls out the text in each paragraph and joins them into one long string.
- This gives you a clean version of the blog post without ads or layout code.

If the user pastes text instead of a URL, you can skip this part and use the text as it is.

---

## How to Send Text to OpenAI for Audio

OpenAI’s text-to-speech API makes this part of the work very easy. You send a message with text and select a voice such as Alloy or Verse. The API returns raw audio bytes. You can save these bytes as an MP3 file.

Here is a helper function to convert text into audio:

```py
from openai import OpenAI
client = OpenAI()

def text_to_audio(text: str, output_path: str):
    audio = client.audio.speech.create(
        model="gpt-4o-mini-tts",
        voice="alloy",
        input=text
    )
    with open(output_path, "wb") as f:
        f.write(audio.read())
```

This function calls the OpenAI client and passes the text, model name, and voice choice. The `.read()` method extracts the binary audio stream. Writing this to an MP3 file completes the process.

If the blog post is very long, you may want to limit text length or chunk the text and join the audio files later. But for most blogs, the model can handle the entire text in one request.

---

## How to Build a FastAPI Backend

Now you can wrap both steps into a simple FastAPI server. This server will accept either a URL or pasted text. It will convert the content into audio and return the MP3 file as a response.

Here is the full backend code:

```py
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
import uuid
import os

app = FastAPI()
@app.post("/convert")
def convert(url: str = Form(None), text: str = Form(None)):
    if not url and not text:
        return {"error": "Please provide a URL or text"}
    if url:
        try:
            text_content = extract_text_from_url(url)
        except Exception:
            return {"error": "Could not fetch the URL"}
    else:
        text_content = text
    file_id = uuid.uuid4().hex
    output_path = f"audio_{file_id}.mp3"
    text_to_audio(text_content, output_path)
    return FileResponse(output_path, media_type="audio/mpeg")
```

Here is how it works. The user sends form data with either `url` or `text`. The server checks which one exists.

If there is a URL, it extracts text with the earlier function. If there is no URL, it uses the provided text directly. A unique file name is created for every request. Then the audio file is generated and returned as an MP3 download.

You can run the server like this:

```sh
uvicorn main:app --reload
```

Open your browser at `http://localhost:8000`. You will not see the UI yet, but the API endpoint is working. You can test it using a tool like Postman or by building the front end next.

---

## How to Add a Simple User Interface

A service is much easier to use when it has a clean UI. Below is a simple HTML page that sends either a URL or text to your FastAPI backend. Save this file as <VPIcon icon="fa-brands fa-html5"/>`index.html` in the same folder:

```xml :collapsed-lines title="index.html"
<!DOCTYPE html>
<html>
<head>
    <title>Blog to Audio</title>
    <style>
        body { font-family: Arial, padding: 40px; max-width: 600px; margin: auto; }
        input, textarea { width: 100%; padding: 10px; margin-top: 10px; }
        button { padding: 12px 20px; margin-top: 20px; cursor: pointer; }
    </style>
</head>
<body>
    <h2>Convert Blog to Audio</h2>
    <form action="/convert" method="post">
        <label>Blog URL</label>
        <input type="text" name="url" placeholder="Enter a blog link">
<p>or paste text below</p>
        <textarea name="text" rows="10" placeholder="Paste blog text here"></textarea>
        <button type="submit">Convert to Audio</button>
    </form>
</body>
</html>
```

This page gives the user two options. They can type a URL or paste text. The form sends the data to `/convert` using a POST request. The response will be the MP3 file, so the browser will download it.

To serve the HTML file, add this route to your <VPIcon icon="fa-brands fa-python"/>`main.py`:

```py title="main.py"
from fastapi.responses import HTMLResponse

@app.get("/")
def home():
    with open("index.html", "r") as f:
        html = f.read()
    return HTMLResponse(html)
```

Now, when you visit the main URL, you will see a clean form.

![Blog to Audio UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191346855/7ac2b182-7c19-408b-8af9-5b696bad8cec.png)

When you submit a URL, the server will process your request and give you an audio file.

![Blog to Audio Result](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191378838/3fedbbba-0ae0-45a4-a0af-5565a78a0884.png)

Great. Our text to audio service is working. Now let’s get it into production.

---

## How to Deploy Your Service to Sevalla

You can choose any cloud provider, like AWS, DigitalOcean, or others, to host your service. I will be using Sevalla for this example.

[<VPIcon icon="iconfont icon-sevalla"/>Sevalla](https://sevalla.com/) is a developer-friendly PaaS provider. It offers application hosting, database, object storage, and static site hosting for your projects.

Every platform will charge you for creating a cloud resource. Sevalla comes with a $50 credit for us to use, so we won’t incur any costs for this example.

Let’s push this project to GitHub so that we can connect our repository to Sevalla. We can also enable auto-deployments so that any new change to the repository is automatically deployed.

You can also [fork my repository (<VPIcon icon="iconfont icon-github" />`manishmshiva/blog-to-audio`)](https://github.com/manishmshiva/blog-to-audio) from here.

[<VPIcon icon="iconfont icon-sevalla"/>Log in](https://app.sevalla.com/login) to Sevalla and click on Applications -> Create new application. You can see the option to link your GitHub repository to create a new application.

![Sevalla Create Application](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191422806/85b3398b-9be7-4956-be4e-05c72b5dd6ae.png)

Use the default settings. Click “Create application”. Now we have to add our OpenAI API key to the environment variables. Click on the “Environment variables” section once the application is created, and save the `OPENAI_API_KEY` value as an environment variable.

![Sevalla Environment Variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191454748/2c19f048-74e3-46d0-90e2-44128be19201.png)

Now we are ready to deploy our application. Click on “Deployments” and click “Deploy now”. It will take 2–3 minutes for the deployment to complete.

![Sevalla Deployment](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191493335/cb789b5e-ff51-4ffb-b398-3b1ccd6bc137.png)

Once done, click on “Visit app”. You will see the application served via a URL ending with `sevalla.app` . This is your new root URL. You can replace `localhost:8000` with this URL and start using it.

![Application UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1768191518487/591394e4-de93-43bf-ac5a-6492e45f1e60.png)

Congrats! Your blog-to-audio service is now live. You can extend this by adding other capabilities and pushing your code to GitHub. Sevalla will automatically deploy your application to production.

---

## Conclusion

You now know how to build a full blog-to-audio service using OpenAI. You learned how to fetch blog text, convert it into speech, and serve it with FastAPI. You also learned how to create a simple user interface, allowing people to try it with no setup.

With this foundation, you can turn any written content into smooth, natural audio. This can help creators reach a wider audience, enhance accessibility, and provide users with more ways to enjoy content.

::: info

Hope you enjoyed this article. Signup for my free newsletter [<VPIcon icon="fas fa-globe"/>TuringTalks.ai](https://turingtalks.ai/) for more hands-on tutorials on AI. You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://manishshivanandhan.com/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy a Blog-to-Audio Service Using OpenAI",
  "desc": "Turning written blog posts into audio is a simple way to reach more people. Many users prefer listening during travel or workouts. Others enjoy having both reading and listening options.  With OpenAI’s text-to-speech models, you can build a clean ser...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-blog-to-audio-openai.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
